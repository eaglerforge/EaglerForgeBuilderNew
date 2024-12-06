javascript.javascriptGenerator.init(workspace);
function toFunctionName(str) {
    return (/^[a-zA-Z_]/.test(str.replace(/[^a-zA-Z0-9_]/g, '')) ? '' : '_') + str.replace(/[^a-zA-Z0-9_]/g, '');
}
function compile() {
    var datablock_contents = "";
    
    var output = 
`
(function EFB2Mod() {
${baseCode};
})();
`;
    fileSave(output, "mod.js");
}
document.querySelector("#compile").addEventListener("click", compile);