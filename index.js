var workspace = globalThis.workspace = Blockly.inject('blockly', {
    collapse: true,
    comments: true,
    css: true,
    disable: true,
    renderer: 'zelos',
    scrollbars: true,
    sounds: true,
    theme: "dark",
    trashcan: true,
    readOnly: false,
    toolbox: document.querySelector("#toolbox")
});
const VALUE_ENUMS = {
    FILE: "efb::val__file"
}
var state = globalThis.state = {
    nodes: [
        {
            type: "metadata",
            tags: {
                Title: "My Awesome Mod",
                Version: "",
                Description: "Does literally nothing",
                Credits: "By me"
            }
        },
        {
            type: "icon",
            tags: {
                Icon: VALUE_ENUMS.FILE,
            }
        }
    ]
};
function reloadUI() {
    document.querySelector("#propnav").innerHTML = "";
    document.querySelectorAll(".datablock").forEach(elem => {
        elem.remove()
    });
    document.querySelector("#search").value = "";
}