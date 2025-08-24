PRIMITIVES["furnace_recipe"] = {
    name: "Furnace Recipe",
    uses: [],
    type: "recipe",
    tags: {
        input: VALUE_ENUMS.ABSTRACT_ITEM,   // item/block to smelt
        result: VALUE_ENUMS.ABSTRACT_ITEM,  // smelt result
        resultQuantity: 1,                  // output count
        experience: 0.1,                    // xp gained
    },
    getDependencies: function () {
        const deps = [];
        [this.tags.input, this.tags.result].forEach(entry => {
            if (!entry || entry === "item/air") return;
            if (entry.startsWith("block/")) {
                let id = entry.replace("block/", "").split("@")[0];
                deps.push(state.nodes.find(y => y.type === "block_advanced" && y.tags.id === id));
            } else if (entry.startsWith("item/")) {
                let id = entry.replace("item/", "").split("@")[0];
                deps.push(state.nodes.find(y => y.type === "item" && y.tags.id === id));
            }
        });
        return deps;
    },
    asJavaScript: function () {
        Object.keys(this.tags).forEach(k => {
            this.tags[k] = (this.tags[k] === VALUE_ENUMS.ABSTRACT_ITEM) ? "item/air" : this.tags[k];
        });

        return `(function FurnaceRecipeDatablock() {
    function $$registerFurnaceRecipe() {
        function $$internalRegister() {
            const ItemStackCtorFromBlock = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[1];
            const ItemStackCtorFromItem  = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];
            const FurnaceRecipesInstance = ModAPI.util.wrap(ModAPI.reflect.getClassByName("FurnaceRecipes").staticVariables.smeltingBase);

            function parseEntry(entry) {
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
                    if (ModAPI.blocks[id]) type = "block";
                    else if (ModAPI.items[id]) type = "item";
                    else throw new Error("Unknown item/block id: " + entry);
                }
                return { type, id, meta };
            }

            var input  = parseEntry("${this.tags.input}");
            var output = parseEntry("${this.tags.result}");

            var $$outputStack = output.type === "block"
                ? ItemStackCtorFromBlock(ModAPI.blocks[output.id].getRef(), ${this.tags.resultQuantity})
                : ItemStackCtorFromItem(ModAPI.items[output.id].getRef(), ${this.tags.resultQuantity});

            if (input.type === "block") {
                FurnaceRecipesInstance.addSmeltingRecipeForBlock(ModAPI.blocks[input.id].getRef(), $$outputStack, ${this.tags.experience});
            } else {
                FurnaceRecipesInstance.addSmelting(ModAPI.items[input.id].getRef(), $$outputStack, ${this.tags.experience});
            }
        }

        if (ModAPI.items && ModAPI.blocks) {
            $$internalRegister();
        } else {
            ModAPI.addEventListener("bootstrap", $$internalRegister);
        }
    }
    ModAPI.dedicatedServer.appendCode($$registerFurnaceRecipe);
    $$registerFurnaceRecipe();
})();`;
    }
}
