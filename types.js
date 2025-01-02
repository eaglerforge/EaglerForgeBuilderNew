const VALUE_ENUMS = {
    FILE: "efb::val__file",
    IMG: "efb::val__img",
    ABSTRACT_HANDLER: "efb::handler/",
    ABSTRACT_ITEM: "efb::val__item",
    ABSTRACT_BLOCK: "efb::val__block",
    NEWLINE: "efb::lf"
}


const PRIMITIVES = {};


function getPrimitive(type) {
    var cloned = Object.assign({}, PRIMITIVES[type]);
    var tags = Object.assign({}, cloned.tags);
    cloned.tags = tags;
    Object.keys(cloned.tags).forEach(key => {
        if (Array.isArray(cloned.tags[key])) {
            cloned.tags[key] = cloned.tags[key][0];
        }
    });
    delete cloned.asJavaScript;
    delete cloned.getDependencies;
    cloned = structuredClone(cloned);
    return cloned;
}

window.addEventListener("load", ()=>{
    var addtype = document.querySelector("#addtype");
    Object.keys(PRIMITIVES).filter(x=>!PRIMITIVES[x].hidden).forEach(type => {
        var option = document.createElement("option");
        option.value = type;
        option.innerText = PRIMITIVES[type].name;
        addtype.appendChild(option);
    });
});