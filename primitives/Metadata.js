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
    getDependencies: function () {
        return [];
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