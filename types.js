const VALUE_ENUMS = {
    FILE: "efb::val__file",
    IMG: "efb::val__img",
    ABSTRACT_HANDLER: "efb::handler/"
}


const PRIMITIVES = {};

PRIMITIVES["metadata"] = {
    name: "Metadata",
    uses: [],
    type: "metadata",
    tags: {
        Title: "My Awesome Mod",
        Version: "v1.0",
        Description: "Does literally nothing",
        Credits: "By <author>"
    },
    asJavaScript: function () {
        return `
(function MetadataDatablock() {
    ModAPI.meta.title("${this.tags.Title.replaceAll('"', '')}");
    ModAPI.meta.version("${this.tags.Version.replaceAll('"', '')}");
    ModAPI.meta.description("${this.tags.Description.replaceAll('"', '')}");
    ModAPI.meta.credits("${this.tags.Credits.replaceAll('"', '')}");
})();`;
    }
}

PRIMITIVES["icon"] = {
    name: "Icon",
    uses: [],
    type: "icon",
    tags: {
        Icon: VALUE_ENUMS.IMG,
    },
    asJavaScript: function () {
        if (!this.tags.Icon || this.tags.Icon === VALUE_ENUMS.IMG) {
            return "";
        }
        return `
(function IconDatablock() {
    ModAPI.meta.icon("${this.tags.Icon}");
})();`;
    }
}

PRIMITIVES["block_advanced"] = {
    name: "Advanced Block",
    uses: ["fixup_block_ids"],
    type: "block_advanced",
    tags: {
        Constructor: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockConstructor",
    },
    asJavaScript: function () {
        var constructorHandler = javascript.javascriptGenerator.blockToCode(getHandler("BlockConstructor", this.tags.Constructor));
        return "";
    }
}

function getPrimitive(type) {
    var cloned = Object.assign({}, PRIMITIVES[type]);
    delete cloned.asJavaScript;
    cloned = structuredClone(cloned);
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