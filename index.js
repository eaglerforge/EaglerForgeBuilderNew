globalThis.workspace = Blockly.inject('blockly', {
    collapse: true,
    comments: true,
    css: true,
    disable: true,
    renderer: 'zelos',
    scrollbars: true,
    sounds: true,
    theme: "dark",
    trashcan: true,
    readOnly: true,
    toolbox: document.querySelector("#toolbox")
});