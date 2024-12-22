function createAndDragVar(workspace, j, varId, parentBlock, inputOffset) {
    if (!parentBlock) {
        return;
    }
    var block = workspace.newBlock("variables_get");
    block.setFieldValue(varId, "VAR");
    block.initSvg();
    block.render();
    var startPos = Blockly.utils.Coordinate.sum(parentBlock.relativeCoords, inputOffset);
    block.moveTo(startPos);
    block.startDrag(startPos);
    j.preventDefault();
    j.stopImmediatePropagation();
    j.stopPropagation();
    var initialPixelsBB = block.getSvgRoot().getBoundingClientRect();
    var initialPixels = {
        x: initialPixelsBB.x + (initialPixelsBB.width / 2),
        y: initialPixelsBB.y + (initialPixelsBB.height / 2)
    }
    var moveHander = (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        var diff = Blockly.utils.Coordinate.difference(e, initialPixels);
        block.drag(Blockly.utils.Coordinate.sum(startPos, Blockly.dragging.Dragger.prototype.pixelsToWorkspaceUnits.apply({ workspace }, [diff])));
    };
    var upHandler = (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        block.endDrag();
        window.removeEventListener("pointermove", moveHander, true);
        window.removeEventListener("pointerup", upHandler, true);
    };
    window.addEventListener("pointermove", moveHander, true);
    window.addEventListener("pointerup", upHandler, true);
    return block;
}

const oldGetVariablesOfType = Blockly.Workspace.prototype.getVariablesOfType;
Blockly.Workspace.prototype.getVariablesOfType = function (type, bypass) {
    var ret = oldGetVariablesOfType.apply(this, [type]);
    if (bypass) {
        return ret;
    }
    return ret.filter(x => !x.name.startsWith("$_efb2_arg_"));
}
function patchVariableField(node) {
    var textOffset = parseFloat(node.querySelector(".blocklyDropdownText").getAttribute("x"));
    node.querySelectorAll("image").forEach(x => {
        if (x.hasAttribute("width")) {
            textOffset += parseFloat(x.getAttribute("width").replaceAll("px", "")) / 2 + 2;
        }
        x.remove();
    });
    node.style.cursor = "grab";
    node.querySelector(".blocklyDropdownText").setAttribute("x", textOffset);
}
Blockly.FieldEFB2Variable = class FieldEFB2Variable extends Blockly.FieldVariable {
    constructor(name) {
        super("$_efb2_arg_" + name)
    }
    getText() {
        return super.getText().replace("$_efb2_arg_", "");
    }
    render_() {
        super.render_();
        patchVariableField(this.fieldGroup_);
        this.fieldGroup_.addEventListener("pointerdown", (e) => {
            e.stopPropagation();
            e.preventDefault();
            e.stopImmediatePropagation();
            var fieldAABB = this.fieldGroup_.getBoundingClientRect();
            var blockAABB = this.fieldGroup_.closest("g.blocklyDraggable").getBoundingClientRect();
            var offset = Blockly.dragging.Dragger.prototype.pixelsToWorkspaceUnits.apply({ workspace }, [{ x: fieldAABB.x - blockAABB.x, y: fieldAABB.y - blockAABB.y }]);
            createAndDragVar(workspace, e, this.getVariable().id, workspace.getBlockById(this.fieldGroup_.closest("g.blocklyDraggable").getAttribute("data-id")), offset);
        }, true);
        this.fieldGroup_.querySelector("rect").style.fill = "rgb(153, 91, 165)";
    }
}
const oldGetText = Blockly.FieldVariable.prototype.getText;
Blockly.FieldVariable.prototype.getText = function (...args) {
    return oldGetText.apply(this, args).replace("$_efb2_arg_", "");
}
const oldBlockRender = Blockly.BlockSvg.prototype.renderEfficiently;
Blockly.BlockSvg.prototype.renderEfficiently = function (...args) {
    oldBlockRender.apply(this, args);
    if ((this.type === "variables_get") && (workspace.getVariableById(this.getFieldValue("VAR"))?.name?.startsWith("$_efb2_arg_"))) {
        patchVariableField(this.svgGroup);
        this.svgGroup.querySelector("path").setAttribute("fill", "rgb(153, 91, 165)");
        if (!this.svgGroup.$$patched) {
            this.svgGroup.$$patched = true;
            this.svgGroup.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();
                e.stopImmediatePropagation();
                document.querySelector('.blocklyDropDownDiv').style.display = "none";
            }, true);
            this.svgGroup.addEventListener("pointerdown", (e) => {
                setTimeout(() => {
                    [...document.querySelectorAll('.blocklyContextMenu div[role=menuitem]')].filter(x => x.querySelector(".blocklyMenuItemContent").innerText.toLowerCase().includes("create")).forEach(x => x.remove());
                }, 0);
            }, true);
        }
    }
}
function removeUnusedArgumentVariables() {
    if (workspace.isDragging()) return;
    var variables = workspace.getVariablesOfType("", true);
    variables.forEach(variable => {
        if (variable.name.startsWith("$_efb2_arg_") && workspace.getVariableUsesById(variable.id).length < 1) {
            workspace.deleteVariableById(variable.id);
        }
    });
}
//This part is your job to integrate after injecting your workspace
//workspace.addChangeListener(removeUnusedArgumentVariables);