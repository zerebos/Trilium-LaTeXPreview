# Trilium-LaTeXPreview
A widget for [Trilium Notes](https://github.com/zadam/trilium) for live previewing LaTeX files with support for sync scroll.

## Preview
<!-- https://raw.githubusercontent.com/rauenzi/Trilium-LaTeXPreview/blob/main/LICENSE -->
https://github.com/zadam/trilium/assets/6865942/0a365540-3a0b-45bf-ace3-a6af9a64a97a


## Features

- Preview LaTeX notes in real time
- Global and per-note styles
- Syncable scrollbars


## Installation

1. Download the `zip` file from the [latest release](https://github.com/rauenzi/Trilium-LaTeXPreview/releases/latest) on GitHub.
1. Import the zip into Trilium, but make sure you uncheck `Safe Import`!
1. (optional) Create one (or more) child code notes of `CSS` type and fill it with any global LaTeX styles.


## Usage

Create a code note with LaTeX type. Then, to make a note previewable, simply add the `#latexPreview` attribute to it. (You may have to switch notes afterward for the preview to appear.)

After that, just start writing in LaTeX on the code editor side. You'll see the preview update with you as you go. By default, it waits about a second before updating the preview in order to reduce performance overhead.

If you're going to add any styles to the note, it can be annoying to see the preview cards at the bottom. You can hide those by adding the `#hideChildrenOverview` native to Trilium.


### Scroll Sync

By default, LaTeXPreview will try to keep the scroll bars in sync no matter which side you are scrolling. The widget is not perfect at keeping them exactly at the same place contextually because the rendering can be so different.

#### Disabling

You can disable the sync entirely by adding the `#latexScrollSync` attribute with `none` as the value. You can also disable each side separately with `left` or `right`. For instance, if you want the preview to automatically scroll as you scroll the source, but not the other way around, then use `#latexScrollSync=left`.

### Styling

Both the global and local styles are picked up and reapplied on note switch, so no need to keep reloading if you are tinkering with your styles!

#### Global
As mentioned in the [installation](#installation) section, any `CSS` note that is a child to the widget code will automatically be picked up and applied.

#### Local
Local styles are specific to the LaTeX note. Just make a `CSS` note as a child of the LaTeX note and it'll be picked up!


## Links

Check out my other Trilium-based projects:
- [Trilium Markdown Preview](https://github.com/rauenzi/Trilium-MarkdownPreview/)
- [Trilium Breadcrumbs](https://github.com/rauenzi/Trilium-Breadcrumbs)
- [Trilium SingleFile](https://github.com/rauenzi/Trilium-SingleFile/)
- [@types/trilium](https://github.com/rauenzi/trilium-types/)
- [trilium-etapi](https://github.com/rauenzi/trilium-etapi/)
- [trilium-pack](https://github.com/rauenzi/trilium-pack/)

Want more? Be sure to check out the [Awesome Trilium](https://github.com/Nriver/awesome-trilium) list!