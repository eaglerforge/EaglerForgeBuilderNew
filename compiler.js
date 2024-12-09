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

function runMod() {
 alert(getCompiledCode())
}

document.querySelector("#export").addEventListener("click", exportMod);
document.querySelector("#run").addEventListener("click", runMod);