function getCompiledCode() {
    // Initialize the JavaScript generator with the workspace
    javascript.javascriptGenerator.init(workspace);

    let datablock_contents = "";
    let prereq_contents = "";
    let functionPrereqs = [];

    // Process nodes and their dependencies
    state.nodes.forEach(node => {
        delete node._deps;
        node._deps = PRIMITIVES[node.type].getDependencies.apply(node, []);
    });

    state.nodes.sort((a, b) => {
        const bDepends = b._deps.includes(a);
        const aDepends = a._deps.includes(b);
        if (bDepends && aDepends) {
            alert(`Failed to compile:\nCircular dependency between ${a.name} and ${b.name}`);
        }
        if (bDepends) return -1;
        if (aDepends) return 1;
        return 0;
    });

    state.nodes.forEach(node => {
        functionPrereqs = functionPrereqs.concat(PRIMITIVES[node.type].uses);
        datablock_contents += PRIMITIVES[node.type].asJavaScript.apply(node, []);
    });

    // Process all blocks in the workspace
    workspace.getAllBlocks().forEach(block => {
        functionPrereqs = functionPrereqs.concat(getBlockLibs(block));

        // Ensure blockToCode is called after init
        if (block.type.startsWith("event_")) {
            datablock_contents += javascript.javascriptGenerator.blockToCode(block);
        }
    });

    // Process function definitions
    Object.keys(javascript.javascriptGenerator.functionNames_).forEach(fn => {
        prereq_contents += javascript.javascriptGenerator.definitions_[fn];
    });

    // Deduplicate the list and fetch function code
    functionPrereqs = [...new Set(functionPrereqs)];
    functionPrereqs.forEach(fn => {
        prereq_contents += getFunctionCode(FUNCTIONS[fn]);
    });

    // Return the compiled code
    return `(function EFB2Mod() {
        ${prereq_contents}
        ${datablock_contents}
    })();
    `;
}

// Ensure init is called in other relevant functions as well
function someOtherFunction() {
    javascript.javascriptGenerator.init(workspace);
    // Other code that calls blockToCode
}
