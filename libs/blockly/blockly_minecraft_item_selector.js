Blockly.FieldMinecraftItemInput = class FieldMinecraftItemInput extends Blockly.FieldTextInput {
    constructor(blocksOnly, noMeta) {
        super("item/air");
        this.noMeta = noMeta;
        this.blocksOnly = blocksOnly;
        this.oldValue = this.getValue();
        this.size_.width = 64 + 12;
        this.size_.height = 64;
    }
    render_() {
        const wrapperElement = this.fieldGroup_;
        if (!wrapperElement.querySelector(".itemsel_foreignobject")) {
            this.appendPicker();
        } else if (this.oldValue !== this.getValue()) {
            wrapperElement.querySelector(".itemsel_foreignobject").remove();
            this.appendPicker();
        }
        if (wrapperElement.querySelector(".blocklyFieldRect")) {
            wrapperElement.querySelector(".blocklyFieldRect").remove();
        }
    }
    appendPicker() {
        const wrapperElement = this.fieldGroup_;
        const devWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        devWrapper.classList.add("itemsel_foreignobject");
        const self = this;
        var input = makeItemSelector(this.getValue(), this.blocksOnly, function () {
            self.setValue(input?.value || "item/air");
        },
        {
            width: "512px",
            height: "512px",
            top: "1rem",
            left: "4rem",
            noMeta: this.noMeta,
        });
        devWrapper.appendChild(input);
        devWrapper.setAttributeNS(null, "width", 1);
        devWrapper.setAttributeNS(null, "height", 1);
        devWrapper.style.overflow = "visible";
        devWrapper.style.userSelect = "none";
        wrapperElement.appendChild(devWrapper);
    }
}