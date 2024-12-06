function toFunctionName(str) {
    return (/^[a-zA-Z_]/.test(str.replace(/[^a-zA-Z0-9_]/g, '')) ? '' : '_') + str.replace(/[^a-zA-Z0-9_]/g, '');
}

function getCompiledCode() {
    javascript.javascriptGenerator.init(workspace);
    let datablock_contents = "";
    let modCode = javascript.javascriptGenerator.workspaceToCode(workspace);
    let metadata = PRIMITIVES["metadata"].asJavaScript();
    return `(function EFB2Mod() {
${metadata}
${datablock_contents}
${modCode}
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