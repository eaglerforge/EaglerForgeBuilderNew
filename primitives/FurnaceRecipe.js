PRIMITIVES["furnace_recipe"] = {
    name: "Furnace Recipe",
    uses: [],
    type: "recipe",
    tags: {
        input: VALUE_ENUMS.ABSTRACT_ITEM,   // item/block to smelt
        lf0: VALUE_ENUMS.NEWLINE,
        lf1: VALUE_ENUMS.NEWLINE,
        result: VALUE_ENUMS.ABSTRACT_ITEM,  // smelt result
        lf2: VALUE_ENUMS.NEWLINE,
        resultQuantity: 1,                  // output count
        lf3: VALUE_ENUMS.NEWLINE,
        experience: 0.1,                    // xp gained
    },
    getDependencies: function () {
        const deps = [];
        [this.tags.input, this.tags.result].forEach(entry => {
            if (!entry || entry === "item/air") return;
            if (entry.startsWith("block/")) {
                let id = entry.replace("block/", "").split("@")[0];
                const dep = state.nodes.find(y => y.type === "block_advanced" && y.tags.id === id);
                if (dep) deps.push(dep);
            } else if (entry.startsWith("item/")) {
                let id = entry.replace("item/", "").split("@")[0];
                const dep = state.nodes.find(y => y.type === "item" && y.tags.id === id);
                if (dep) deps.push(dep);
            }
        });
        return deps;
    },
    asJavaScript: function () {
        // Create a copy of tags to avoid modifying the original
        const tags = { ...this.tags };
        Object.keys(tags).forEach(k => {
            tags[k] = (tags[k] === VALUE_ENUMS.ABSTRACT_ITEM) ? "item/air" : tags[k];
        });
        
        return `(function FurnaceRecipeDatablock() {
    async function $$registerFurnaceRecipe(isServer) {
        await new Promise((res, rej) => {
            if (!isServer) {
                res();
            } else {
                ModAPI.addEventListener("bootstrap", res);
            }
        });

        try {
            const FurnaceRecipesInstance = ModAPI.util.wrap(ModAPI.reflect.getClassByName("FurnaceRecipes").staticVariables.smeltingBase);

            function parseEntry(entry) {
                if (!entry || entry === "item/air") return null;
                
                var type, id, meta = 0;
                if (entry.includes("@")) {
                    const parts = entry.split("@");
                    id = parts[0];
                    meta = parseInt(parts[1], 10) || 0;
                } else {
                    id = entry;
                }
                
                if (id.startsWith("block/")) {
                    type = "block";
                    id = id.replace("block/", "");
                } else if (id.startsWith("item/")) {
                    type = "item";
                    id = id.replace("item/", "");
                } else {
                    if (ModAPI.blocks && ModAPI.blocks[id]) type = "block";
                    else if (ModAPI.items && ModAPI.items[id]) type = "item";
                    else {
                        console.warn("Unknown item/block id: " + entry);
                        return null;
                    }
                }
                return { type, id, meta };
            }

            var input = parseEntry("${tags.input}");
            var output = parseEntry("${tags.result}");
            
            if (!input || !output) {
                console.warn("Invalid furnace recipe: missing input or output");
                return;
            }

            var $$outputStack;
            if (output.type === "block") {
                if (!ModAPI.blocks[output.id]) {
                    console.warn("Block not found: " + output.id);
                    return;
                }
                $$outputStack = ModAPI.reflect.getClassById(
