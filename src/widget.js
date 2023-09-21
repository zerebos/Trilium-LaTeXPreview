/**
 * This widget allows you to preview any LaTeX code note in real time.
 */
const TPL = `<div style="padding: 10px; border-left: 0px solid var(--main-border-color); height: 100%;">
<style></style>
<div id="latex-preview">
<latex-js id="latex-component" baseURL="https://cdn.jsdelivr.net/npm/latex.js@0.12.6/dist/"></latex-js>
</div>
</div>`;

/* global latexminjs:false */

function debounce(executor, delay) {
    let timeout;
    return function(...args) {
        const callback = () => {
            timeout = null;
            Reflect.apply(executor, null, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(callback, delay);
    };
}



customElements.define("latex-js", latexminjs.LaTeXJSComponent);
const createEl = c => `<latex-js baseURL="https://cdn.jsdelivr.net/npm/latex.js@0.12.6/dist/">${c}</latex-js>`;

class LatexPreviewWidget extends api.RightPanelWidget {
    get widgetTitle() {return "LaTeX Preview";}
    get parentWidget() {return "right-pane";}

    constructor() {
        super(...arguments);

        const refreshWithNote = async (note) => {
            const {content} = await note.getNoteComplement();
            const newElement = $(createEl(content))[0];
            this.$preview.children()[0].replaceWith(newElement);
        };

        this.refreshWithNote = debounce(refreshWithNote, 1000);
    }

    isEnabled() {
        return super.isEnabled()
            && this.note.type === "code"
            && this.note.mime
            && this.note.mime === "text/x-latex"
            && this.note.hasLabel("latexPreview");
    }

    async doRenderBody() {
        this.$body.html(TPL);
        this.$preview = this.$body.find("#latex-preview");
        this.$component = this.$body.find("#latex-component");
        await this.updateCss();
        return this.$body;
    }

    async entitiesReloadedEvent({loadResults}) {
        if (loadResults.isNoteContentReloaded(this.noteId)) {
            this.refresh();
        }
    }
    
    async noteSwitched() {
        if (!this.note) return;
        await this.updateCss();
        await this.refresh();

        if (!this.isEnabled()) return;
        const scrollSyncStatus = this.note.getLabelValue("latexScrollSync");
        const disableBoth = scrollSyncStatus === "none";
        const onlyLeft = scrollSyncStatus === "left";
        const onlyRight = scrollSyncStatus === "right";
        
        $("#center-pane .CodeMirror-scroll, #center-pane .component.scrolling-container").off(".latex");
        $("#right-pane").off(".latex");
        if (disableBoth) return;
        
        const isFullHeight = document.querySelector(".note-detail.full-height");
        const centerSelector = isFullHeight ? "#center-pane .CodeMirror-scroll" : "#center-pane .component.scrolling-container";
        const center = document.querySelector(centerSelector);
        const right = document.querySelector("#right-pane");
        if (!onlyRight) this.addSyncListener(center, right, !onlyLeft);
        if (!onlyLeft) this.addSyncListener(right, center, !onlyRight);
    }
    
    addSyncListener(target, other, shouldRestart = true) {
        const jTarget = $(target);
        jTarget.on("scroll.latex", (ev) => {
            $(other).off("scroll.latex");
            this.syncedScroll(ev.target, other);
            clearTimeout($.data(jTarget, "scrollTimer"));
            $.data(jTarget, "scrollTimer", setTimeout(() => {
                if (shouldRestart) this.addSyncListener(other, target, shouldRestart);
            }, 250));
        });
    }
    
    syncedScroll(target, other) {
        const max = target.scrollHeight - target.clientHeight;
        const current = target.scrollTop;
        const percent = current / max;
        const maxPane = other.scrollHeight - other.clientHeight;
        const newScroll = (percent * maxPane);
        other.scrollTop = newScroll;
    }
    
    async updateCss() {
        let accumulator = "";

        const globalChildren = await api.startNote.getChildNotes();
        const globalStyles = globalChildren.filter(n => n.mime == "text/css");
        for (const style of globalStyles) accumulator += await style.getContent();

        if (this.note && this.isEnabled()) {
            const localChildren = await this.note.getChildNotes();
            const localStyles = localChildren.filter(n => n.mime == "text/css");
            for (const style of localStyles) accumulator += await style.getContent();
        }

        this.$body.find("style").html(accumulator);
    }
}

module.exports = new LatexPreviewWidget();