function getCompiledCode() {
    javascript.javascriptGenerator.init(workspace);
    let datablock_contents = "";
    var prereq_contents = "";
    let functionPrereqs = [];
    state.nodes.forEach(node => {
        delete node._deps;
        node._deps = PRIMITIVES[node.type].getDependencies.apply(node, []);
    });
    state.nodes.sort((a, b) => {
        var bDepends = b._deps.includes(a);
        var aDepends = a._deps.includes(b);
        if (bDepends && aDepends) {
            alert(`Failed to compile:\nCircular dependency between ${a.name} and ${b.name}`);
        }
        if (bDepends) {
            return -1;
        }
        if (aDepends) {
            return 1;
        }
        return 0;
    });
    state.nodes.forEach(node => {
        functionPrereqs = functionPrereqs.concat(PRIMITIVES[node.type].uses);
        datablock_contents += PRIMITIVES[node.type].asJavaScript.apply(node, []);
    });
    workspace.getAllBlocks().forEach(block => {
        functionPrereqs = functionPrereqs.concat(getBlockLibs(block));
        
        // Add processing for event blocks
        if (block.type.startsWith("event_")) {
            datablock_contents += javascript.javascriptGenerator.blockToCode(block);
        }
    });
    Object.keys(javascript.javascriptGenerator.functionNames_).forEach(fn => {
        prereq_contents += javascript.javascriptGenerator.definitions_[fn];
    });
    functionPrereqs = [...new Set(functionPrereqs)]; // Deduplicate the list
    functionPrereqs.forEach(fn => {
        prereq_contents += getFunctionCode(FUNCTIONS[fn]);
    });

    return `(function EFB2Mod() {

    ${prereq_contents}
    ${datablock_contents}
    

});
    `;
}
