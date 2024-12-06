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
    Blockly.serialization.workspaces.load(data.blockly || {}, workspace);
    globalThis.state = data;
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