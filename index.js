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
var handlers = {};
function getHandlers() {
    return handlers;
}
const supportedEvents = new Set([
    Blockly.Events.BLOCK_CHANGE,
    Blockly.Events.BLOCK_CREATE,
    Blockly.Events.BLOCK_DELETE
]);
function updateHandlers(event) {
    if (workspace.isDragging()) return;
    if (!supportedEvents.has(event.type)) return;
    handlers = {};
    workspace.getAllBlocks().forEach(block => {
        if (!handlers[block.type]) {
            handlers[block.type] = [block.getFieldValue("ID")];
        } else {
            var id = block.getFieldValue("ID");
            if (handlers[block.type].includes(id)) {
                return block.dispose(true);
            }
            handlers[block.type].push();
        }
    });
}
workspace.addChangeListener(updateHandlers);
var state = globalThis.state = {
    nodes: [
        getPrimitive("metadata"),
        getPrimitive("icon"),
    ]
};
function updatePropsUI() {

}
function reloadUI(sel) {
    if (!state.nodes.includes(sel)) {
        sel = null;
    }
    document.querySelector("#propnav").innerHTML = "";
    document.querySelectorAll(".datablock").forEach(elem => {
        elem.remove()
    });
    document.querySelector("#search").value = "";
    var datablockContainer = document.querySelector("#datablock_container");
    state.nodes.forEach((node, index) => {
        var datablock = document.createElement("span");
        datablock.datablock = node;
        datablock.classList.add("datablock");

        if (node === sel) {
            datablock.classList.add("selected");
        }

        datablock.addEventListener("click", (e) => {
            document.querySelectorAll(".datablock.selected").forEach(x => x.classList.remove("selected"));
            datablock.classList.add("selected");
            editObject(node, datablock);
        });

        var h4 = document.createElement("h4");
        h4.innerText = node.name;
        datablock.appendChild(h4);

        datablock.appendChild(document.createElement("br"));

        var type = document.createElement("i");
        type.innerText = "Type: " + node.type;
        datablock.appendChild(type);

        datablock.appendChild(document.createElement("br"));
        datablock.appendChild(document.createElement("br"));

        var controls = document.createElement("div");
        controls.classList.add("controls");

        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            state.nodes.splice(index, 1);
            reloadUI();
        });
        controls.appendChild(deleteButton);

        datablock.appendChild(controls);

        datablockContainer.appendChild(datablock);
    });
}
document.querySelector("#newdatablock").addEventListener("click", (e) => {
    state.nodes.push(getPrimitive(document.querySelector("#addtype").value));
    reloadUI(document.querySelector(".datablock.selected")?.datablock);
});
reloadUI();