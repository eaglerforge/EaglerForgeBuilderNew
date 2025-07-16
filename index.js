var workspace = globalThis.workspace = Blockly.inject('blockly', {
    collapse: true,
    comments: true,
    css: true,
    disable: true,
    renderer: 'zelos',
    scrollbars: true,
    sounds: true,
    theme: "dark",
    trashcan: true,
    readOnly: false,
    toolbox: document.querySelector("#toolbox"),
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
        pinch: true
    },
});
javascript.javascriptGenerator.addReservedWords("ModAPI", "PluginAPI", "window", "globalThis");
workspace.addChangeListener(removeUnusedArgumentVariables);
blocklyDeveloperTools();
const oldScrub = javascript.javascriptGenerator.scrub_;
var rippedCode = null; //Used to decompile function definitions later.
javascript.javascriptGenerator.scrub_ = function (...args) {
    rippedCode = args[1];
    return oldScrub.apply(this, args);
}
var handlers = {};
var handlerMapDict = {};
function getHandlers(type) {
    return handlers["handle_" + type] || [];
}
function getHandler(type, name) {
    return handlerMapDict["handle_" + type]?.[name] || null;
}
function depsgraph_search(blck, enounteredFunctions, usedVariableSet, procMap) {
    const FN_PROCCODES = ["procedures_callreturn", "procedures_callnoreturn"];
    const FN_DEFCODES = ["procedures_defreturn", "procedures_defnoreturn"];
    enounteredFunctions ||= new Set();
    usedVariableSet ||= new Set();
    procMap ||= Object.fromEntries(workspace.getAllBlocks().filter(x=>FN_DEFCODES.includes(x.type)).map(x=>[x.getProcedureDef()[0], x]));

    var descendants = blck.getDescendants(true);
    for (let i = 0; i < descendants.length; i++) {
        const descendant = descendants[i];
        if (FN_PROCCODES.includes(descendant.type) && !enounteredFunctions.has(descendant.getProcedureCall())) {
            var proccode = descendant.getProcedureCall();
            enounteredFunctions.add(proccode);
            depsgraph_search(procMap[proccode], enounteredFunctions, usedVariableSet, procMap);
            continue;
        }
        descendant.getVars().forEach(varId => {
            usedVariableSet.add(varId);
        });
    }

    return {
        usedVariableSet,
        enounteredFunctions,
        procMap
    }
}
function getProcedureCode(name, procMap) {
    javascript.javascriptGenerator.blockToCode(procMap[name]); //for some *stupid* reason, is hardcoded to always return null.
    return rippedCode;
}
function getHandlerCode(type, tag, defaultArgs, targetMapper) {
    var handler = getHandler(type, tag);
    if (!handler && targetMapper) {
        return "";
    }
    if (!handler) { return { code: "", args: defaultArgs } };
    var { usedVariableSet, enounteredFunctions, procMap } = depsgraph_search(handler);
    var generatedCode = javascript.javascriptGenerator.forBlock[handler.type].apply(handler, []);

    var variableCode = [...usedVariableSet].map(varId => { return javascript.javascriptGenerator.getVariableName(varId) }).join(",");
    variableCode = variableCode ? ("var " + variableCode + ";") : "";

    var procedureCode = [...enounteredFunctions].map(x => getProcedureCode(x, procMap)).join(";");

    generatedCode.code = variableCode + procedureCode + generatedCode.code;

    if (targetMapper) {
        const mappingFunction = Object.entries(targetMapper).filter(ent=>ent[0].split(",").includes(flags.target))[0]?.[1];
        if (!mappingFunction) {
            alert("Mapping function for handler " + type + " not defined! Please contact developers.");
            throw Error("Mapping fn not defined!");
        }
        return mappingFunction.apply(globalThis.__currentlyProcessingNode, [generatedCode.args, generatedCode.code]);
    };
    return generatedCode;
}
const supportedEvents = [
    Blockly.Events.BlockFieldIntermediateChange,
    Blockly.Events.BlockChange,
    Blockly.Events.BlockCreate,
    Blockly.Events.BlockDelete
];
function updateHandlers(e) {
    if (!supportedEvents.reduce((acc, x)=>acc||(e instanceof x))) {return}
    if (workspace.isDragging()) return;
    handlers = {};
    handlerMapDict = {};
    workspace.getAllBlocks().forEach(block => {
        var id = block.getFieldValue("ID");
        if (id === "None") {
            return;
        }
        if (!handlers[block.type]) {
            handlers[block.type] = [id];
            handlerMapDict[block.type] = Object.fromEntries([[id, block]]);
        } else {

            if (handlers[block.type].includes(id)) {
                return;
            }
            handlers[block.type].push(id);
            handlerMapDict[block.type][id] = block;
        }
    });
    document.querySelectorAll(".handler_select").forEach(x => {
        x.updateHandlerList(e instanceof Blockly.Events.BlockFieldIntermediateChange);
    });
}
workspace.addChangeListener(updateHandlers);
var state = globalThis.state = {
    nodes: [
        getPrimitive("metadata"),
        getPrimitive("icon"),
    ]
};
var inspector = getPrimitive("inspector");
function reloadUI(sel) {
    if (!state.nodes.includes(sel)) {
        sel = document.querySelector(".datablock.selected")?.datablock;
    }
    document.querySelector("#propnav").innerHTML = "";
    document.querySelectorAll(".datablock").forEach(elem => {
        elem.remove();
    });
    document.querySelector("#search").value = "";
    var datablockContainer = document.querySelector("#datablock_container");
    state.nodes.concat(inspector).forEach((node, index) => {
        var datablock = document.createElement("span");
        datablock.datablock = node;
        datablock.classList.add("datablock");
        datablock.setAttribute("data-dtype", node.type);

        if (node === sel) {
            datablock.classList.add("selected");
            editObject(node, datablock);
        }

        datablock.addEventListener("click", (e) => {
            document.querySelectorAll(".datablock.selected").forEach(x => x.classList.remove("selected"));
            datablock.classList.add("selected");
            editObject(node, datablock);
        });

        var h4 = document.createElement("h4");
        h4.innerText = node.name;
        datablock.appendChild(h4);

        datablock.appendChild(document.createElement("br"));

        var type = document.createElement("i");
        type.innerText = "Type: " + node.type;
        datablock.appendChild(type);

        datablock.appendChild(document.createElement("br"));
        datablock.appendChild(document.createElement("br"));

        var controls = document.createElement("div");
        controls.classList.add("controls");

        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            state.nodes.splice(index, 1);
            updateDynamics(false);
            reloadUI();
        });
        controls.appendChild(deleteButton);

        datablock.appendChild(controls);

        datablockContainer.appendChild(datablock);
    });
}
document.querySelector("#newdatablock").addEventListener("click", (e) => {
    state.nodes.push(getPrimitive(document.querySelector("#addtype").value));
    updateDynamics(false);
    reloadUI(document.querySelector(".datablock.selected")?.datablock);
});
reloadUI();