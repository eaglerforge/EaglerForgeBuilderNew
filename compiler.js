function toFunctionName(str) {
    return (/^[a-zA-Z_]/.test(str.replace(/[^a-zA-Z0-9_]/g, '')) ? '' : '_') + str.replace(/[^a-zA-Z0-9_]/g, '');
}

function  getCompiledCode() {
    var datablock_contents = "";
    return `(function EFB2Mod() {
${datablock_contents};
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