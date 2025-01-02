PRIMITIVES["icon"] = {
    name: "Icon",
    uses: [],
    type: "icon",
    tags: {
        Icon: VALUE_ENUMS.IMG,
    },
    getDependencies: function () {
        return [];
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