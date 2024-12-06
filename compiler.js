function toFunctionName(str) {
    return (/^[a-zA-Z_]/.test(str.replace(/[^a-zA-Z0-9_]/g, '')) ? '' : '_') + str.replace(/[^a-zA-Z0-9_]/g, '');
}

function  getCompiledCode() {
    var datablock_contents = "";
    let code = javascript.javascriptGenerator.workspaceToCode(workspace);
    if (code.length > 0) {
        return `
(function EFB2Mod() {
${code}
})();
`;
    } else {
        return '';
    }
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