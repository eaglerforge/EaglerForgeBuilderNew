const VALUE_ENUMS = {
    FILE: "efb::val__file",
    IMG: "efb::val__img"
}


const PRIMITIVES = {};

PRIMITIVES["metadata"] = {
    name: "Metadata",
    type: "metadata",
    tags: {
        Title: "My Awesome Mod",
        Version: "",
        Description: "Does literally nothing",
        Credits: "By me"
    }
}

PRIMITIVES["icon"] = {
    name: "Icon",
    type: "icon",
    tags: {
        Icon: VALUE_ENUMS.IMG,
    }
}

function getPrimitive(type) {
    var cloned = structuredClone(PRIMITIVES[type]);
    delete cloned.asJavaScript;
    return cloned;
}

window.addEventListener("load", ()=>{
    var addtype = document.querySelector("#addtype");
    Object.keys(PRIMITIVES).forEach(type => {
        var option = document.createElement("option");
        option.value = type;
        option.innerText = PRIMITIVES[type].name;
        addtype.appendChild(option);
    });
});