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

var inspectorFrame = document.createElement("iframe");
inspectorFrame.id = "inspector";
inspectorFrame.style.position = "fixed";
inspectorFrame.style.border = "0";
inspectorFrame.style.display = "none";
inspectorFrame.style.pointerEvents = "none";
inspectorFrame.style.backgroundColor = "white";
inspectorFrame.allowFullscreen = true;
inspectorFrame.tabIndex = 0;
inspectorFrame.srcdoc = "<h3>Use the 'Run' button and select an EaglerForge build.</h3>";
inspectorFrame.addEventListener("mouseover", ()=>{
    inspectorFrame.focus();
});
var propnav = document.querySelector("#propnav");
function positionInspectorFrame() {
    if (document.querySelector("#fullscreen") && document.querySelector("#fullscreen").hasAttribute("fullscreen")) {
        inspectorFrame.style.top = "0px";
        inspectorFrame.style.left = "0px";
        inspectorFrame.style.width = "100%";
        inspectorFrame.style.height = "100%";
    } else {
        var aabb = propnav.getBoundingClientRect();
        inspectorFrame.style.top = aabb.top + "px";
        inspectorFrame.style.left = aabb.left + "px";
        inspectorFrame.style.width = aabb.width + "px";
        inspectorFrame.style.height = aabb.height + "px";
    }
}
positionInspectorFrame();
var inspectorFrameReposTimer = null;
document.body.appendChild(inspectorFrame);