PRIMITIVES["inspector"] = {
    name: "Inspector",
    uses: [],
    type: "inspector",
    hidden: true,
    tags: {
    },
    getDependencies: function () {
        return [];
    },
    asJavaScript: function () {
        return ``;
    }
}

console.log('flag2');
var inspectorFrame = document.createElement("iframe");
inspectorFrame.id = "inspector";
inspectorFrame.style.display = "none";
inspectorFrame.style.width = "100%";
inspectorFrame.style.height = "100%";
inspectorFrame.style.border = "0px";
inspectorFrame.style.pointerEvents = "none";
inspectorFrame.style.backgroundColor = "white";
inspectorFrame.allowFullscreen = true;
inspectorFrame.tabIndex = 0;
inspectorFrame.srcdoc = "<h3>Use the 'Run' button and select an EaglerForge build.</h3>";
inspectorFrame.addEventListener("mouseover", () => {
    inspectorFrame.focus();
});
function updateFullscreen(state) {
    if (state) {
        inspectorFrame.style.position = "fixed";
        inspectorFrame.style.top = "0px";
        inspectorFrame.style.left = "0px";
    } else {
        inspectorFrame.style.position = "relative";
        inspectorFrame.style.top = "unset";
        inspectorFrame.style.left = "unset";
    }
}

var propnav = document.getElementById("propnav");
propnav.appendChild(inspectorFrame);