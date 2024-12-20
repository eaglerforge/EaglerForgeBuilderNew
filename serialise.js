function serialise() {
    return JSON.stringify(
        Object.assign(state,
            {
                blockly: Blockly.serialization.workspaces.save(workspace)
            }
        )
    )
}
function deserialise(data) {
    var data = JSON.parse(data);
    try {
        Blockly.serialization.workspaces.load(data.blockly || {}, workspace);
    } catch (error) {
        
    }
    globalThis.state = data;
    data.nodes.forEach(node => {
        var prim = getPrimitive(node.type);
        node.tags = Object.assign(prim.tags, node.tags); //load new tags
    });
    reloadUI();
}
function fileRead(handler) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.efb2';
    input.onchange = event => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = () => {
            handler(reader.result);
        };
        
        reader.readAsText(file);
    };

    input.click();
}
function fileSave(text, fname) {
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fname || 'mod.efb2';
    a.click();
    URL.revokeObjectURL(a.href);
}
window.addEventListener("load", ()=>{
    document.querySelector("#load").addEventListener("click", ()=>{fileRead(deserialise)});
    document.querySelector("#save").addEventListener("click", ()=>{fileSave(serialise())});
});