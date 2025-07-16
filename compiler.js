function toFunctionName(str) {
    return (/^[a-zA-Z_]/.test(str.replace(/[^a-zA-Z0-9_]/g, '')) ? '' : '_') + str.replace(/[^a-zA-Z0-9_]/g, '');
}

const flags = {};
Object.defineProperty(flags, "target", {
    get: ()=>document.querySelector("#compiler_target").value,
    set: ()=>{}
});

function getCompiledCode() {
    javascript.javascriptGenerator.init(workspace);
    const watermark = `// Built in EFBN targetting ${flags.target}
// https://github.com/eaglerforge/EaglerForgeBuilderNew
`;
    let datablock_contents = "";
    var prereq_contents = watermark;
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
        globalThis.__currentlyProcessingNode = node;
        datablock_contents += PRIMITIVES[node.type].asJavaScript.apply(node, []);
    });
    workspace.getAllBlocks().forEach(block => {
        functionPrereqs = functionPrereqs.concat(getBlockLibs(block));
    });
    // Adding event blocks compilation
    workspace.getTopBlocks(true).forEach(block => {
        if (block.type.startsWith("events_")) {
            datablock_contents += javascript.javascriptGenerator.blockToCode(block);
        }
    });
    Object.keys(javascript.javascriptGenerator.functionNames_).forEach(fn => {
        prereq_contents += javascript.javascriptGenerator.definitions_[fn];
    });
    functionPrereqs = [...new Set(functionPrereqs)]; //dedupe the list
    functionPrereqs.forEach(fn => {
        prereq_contents += getFunctionCode(FUNCTIONS[fn]);
    });

    //let modCode = javascript.javascriptGenerator.workspaceToCode(workspace);

    return `(function EFB2Mod() {
    const $$scoped_efb_globals = {};
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
    return new Promise((res, rej) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = ".html";
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (!reader.result.includes("__eaglerforgeinjector_installation_flag__")) {
                    if (window.confirm("This file is not a EaglerForgeInjector build, or is too old.\nOpen the EaglerForgeInjector page?")) {
                        window.open("https://eaglerforge.github.io/EaglerForgeInjector");
                    }
                    
                    return rej();
                }
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
    insp.srcdoc = efiBuild + `<script>eaglercraftXOpts.noInitialModGui = false; eaglercraftXOpts.Mods = ["${url}"];</script>`;
    if (document.querySelector(".datablock[data-dtype=inspector]")) {
        document.querySelector(".datablock[data-dtype=inspector]").click();
    }
}

document.querySelector("#export").addEventListener("click", exportMod);
document.querySelector("#run").addEventListener("click", runMod);
