PRIMITIVES["furnace_recipe"] = {
    name: "Furnace Recipe",
    uses: [],
    type: "recipe",
    tags: {
        input: VALUE_ENUMS.ABSTRACT_ITEM,   // item/block to smelt
        lf0: VALUE_ENUMS.NEWLINE,
        result: VALUE_ENUMS.ABSTRACT_ITEM,  // smelt result
        lf1: VALUE_ENUMS.NEWLINE,
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
        const tags = Object.assign({}, this.tags);
        Object.keys(tags).forEach(k => {
            tags[k] = (tags[k] === VALUE_ENUMS.ABSTRACT_ITEM) ? "item/air" : tags[k];
        });
        
        return "(function FurnaceRecipeDatablock() {\n" +
            "    async function $$registerFurnaceRecipe(isServer) {\n" +
            "        await new Promise((res, rej) => {\n" +
            "            if (!isServer) {\n" +
            "                res();\n" +
            "            } else {\n" +
            "                ModAPI.addEventListener('bootstrap', res);\n" +
            "            }\n" +
            "        });\n" +
            "        try {\n" +
            "            const FurnaceRecipesInstance = ModAPI.util.wrap(ModAPI.reflect.getClassByName('FurnaceRecipes').staticVariables.smeltingBase);\n" +
            "            function parseEntry(entry) {\n" +
            "                if (!entry || entry === 'item/air') return null;\n" +
            "                var type, id, meta = 0;\n" +
            "                if (entry.includes('@')) {\n" +
            "                    const parts = entry.split('@');\n" +
            "                    id = parts[0];\n" +
            "                    meta = parseInt(parts[1], 10) || 0;\n" +
            "                } else {\n" +
            "                    id = entry;\n" +
            "                }\n" +
            "                if (id.startsWith('block/')) {\n" +
            "                    type = 'block';\n" +
            "                    id = id.replace('block/', '');\n" +
            "                } else if (id.startsWith('item/')) {\n" +
            "                    type = 'item';\n" +
            "                    id = id.replace('item/', '');\n" +
            "                } else {\n" +
            "                    if (ModAPI.blocks && ModAPI.blocks[id]) type = 'block';\n" +
            "                    else if (ModAPI.items && ModAPI.items[id]) type = 'item';\n" +
            "                    else {\n" +
            "                        console.warn('Unknown item/block id: ' + entry);\n" +
            "                        return null;\n" +
            "                    }\n" +
            "                }\n" +
            "                return { type, id, meta };\n" +
            "            }\n" +
            "            var input = parseEntry('" + tags.input + "');\n" +
            "            var output = parseEntry('" + tags.result + "');\n" +
            "            if (!input || !output) {\n" +
            "                console.warn('Invalid furnace recipe: missing input or output');\n" +
            "                return;\n" +
            "            }\n" +
            "            var $$outputStack;\n" +
            "            if (output.type === 'block') {\n" +
            "                if (!ModAPI.blocks[output.id]) {\n" +
            "                    console.warn('Block not found: ' + output.id);\n" +
            "                    return;\n" +
            "                }\n" +
            "                $$outputStack = ModAPI.reflect.getClassById('net.minecraft.item.ItemStack').constructors[1](ModAPI.blocks[output.id].getRef(), " + tags.resultQuantity + ");\n" +
            "            } else {\n" +
            "                if (!ModAPI.items[output.id]) {\n" +
            "                    console.warn('Item not found: ' + output.id);\n" +
            "                    return;\n" +
            "                }\n" +
            "                $$outputStack = ModAPI.reflect.getClassById('net.minecraft.item.ItemStack').constructors[4](ModAPI.items[output.id].getRef(), " + tags.resultQuantity + ");\n" +
            "            }\n" +
            "            if (input.type === 'block') {\n" +
            "                if (!ModAPI.blocks[input.id]) {\n" +
            "                    console.warn('Input block not found: ' + input.id);\n" +
            "                    return;\n" +
            "                }\n" +
            "                FurnaceRecipesInstance.addSmeltingRecipeForBlock(ModAPI.blocks[input.id].getRef(), $$outputStack, " + tags.experience + ");\n" +
            "            } else {\n" +
            "                if (!ModAPI.items[input.id]) {\n" +
            "                    console.warn('Input item not found: ' + input.id);\n" +
            "                    return;\n" +
            "                }\n" +
            "                FurnaceRecipesInstance.addSmelting(ModAPI.items[input.id].getRef(), $$outputStack, " + tags.experience + ");\n" +
            "            }\n" +
            "            console.log('Registered furnace recipe: " + tags.input + " -> " + tags.result + "');\n" +
            "        } catch (e) {\n" +
            "            console.error('Error registering furnace recipe:', e);\n" +
            "        }\n" +
            "    }\n" +
            "    $$registerFurnaceRecipe();\n" +
            "    if (ModAPI.dedicatedServer && ModAPI.dedicatedServer.appendCode) {\n" +
            "        ModAPI.dedicatedServer.appendCode($$registerFurnaceRecipe);\n" +
            "    }\n" +
            "})();";
    }
}
