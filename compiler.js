function toFunctionName(str) {
    return (/^[a-zA-Z_]/.test(str.replace(/[^a-zA-Z0-9_]/g, '')) ? '' : '_') + str.replace(/[^a-zA-Z0-9_]/g, '');
}

function getCompiledCode() {
    javascript.javascriptGenerator.init(workspace);
    let datablock_contents = "";
    var prereq_contents = "";
    let functionPrereqs = [];
    state.nodes.forEach(node => {
        functionPrereqs = functionPrereqs.concat(PRIMITIVES[node.type].uses);
        datablock_contents += PRIMITIVES[node.type].asJavaScript.apply(node, []);
    });
    workspace.getAllBlocks().forEach(block => {
        functionPrereqs = functionPrereqs.concat(getBlockLibs(block));
    });
    functionPrereqs = [...new Set(functionPrereqs)]; //dedupe the list
    functionPrereqs.forEach(fn => {
        prereq_contents += getFunctionCode(FUNCTIONS[fn]);
    });

    //let modCode = javascript.javascriptGenerator.workspaceToCode(workspace);

    return `(function EFB2Mod() {
${prereq_contents}
${datablock_contents}
})();
`;
}

function exportMod() {
    let output = getCompiledCode()
    fileSave(output, "mod.js");
}
var efiBuild = null;
function getEfiBuild() {
    return new Promise((res,rej)=>{
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = ".html";
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                //efiBuild = URL.createObjectURL(new Blob([reader.result], { type: "text/html" }));
                efiBuild = reader.result;
                res();
            };
            reader.readAsText(file);
        });
        fileInput.click();
    });
}
async function runMod() {
    var url = "data:text/javascript," + encodeURIComponent(getCompiledCode());
    if (!efiBuild) {
        await getEfiBuild();
    }
    var insp = document.querySelector("#inspector");
    insp.srcdoc = efiBuild + `<script>eaglercraftXOpts.noInitialModGui = true; eaglercraftXOpts.Mods = ["${url}"];</script>`;
    if (document.querySelector(".datablock[data-dtype=inspector]")) {
        document.querySelector(".datablock[data-dtype=inspector]").click();
    }
}

document.querySelector("#export").addEventListener("click", exportMod);
document.querySelector("#run").addEventListener("click", runMod);