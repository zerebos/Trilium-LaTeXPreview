/**
 * @type {import("trilium-pack").Config}
 */
module.exports = {
    output: "dist/Trilium-LaTeXPreview.zip",
    notes: {
        title: "LaTeX Preview",
        file: "src/widget.js",
        attributes: {
            "#widget": ""
        },
        children: [
            {type: "file", file: "lib/latex.min.js"},
            {file: "src/styles.css"}
        ]
    }
};