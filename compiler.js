function compile() {
    var baseCode = javascript.javascriptGenerator.workspaceToCode(workspace);
    var output = 
`
(function EFB2Mod() {
${baseCode};
})();
`;
    fileSave(output, "mod.js");
}
document.querySelector("#compile").addEventListener("click", compile);