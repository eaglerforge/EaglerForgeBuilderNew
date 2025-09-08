//TODO: quantityDropped, onBlockDestroyedByExplosion, onBlockActivated
PRIMITIVES["recipe"] = {
    name: "Crafting Recipe",
    uses: [],
    type: "recipe",
    tags: {
        slot0: VALUE_ENUMS.ABSTRACT_ITEM,
        slot1: VALUE_ENUMS.ABSTRACT_ITEM,
        slot2: VALUE_ENUMS.ABSTRACT_ITEM,
        lf0: VALUE_ENUMS.NEWLINE,
        slot3: VALUE_ENUMS.ABSTRACT_ITEM,
        slot4: VALUE_ENUMS.ABSTRACT_ITEM,
        slot5: VALUE_ENUMS.ABSTRACT_ITEM,
        lf1: VALUE_ENUMS.NEWLINE,
        slot6: VALUE_ENUMS.ABSTRACT_ITEM,
        slot7: VALUE_ENUMS.ABSTRACT_ITEM,
        slot8: VALUE_ENUMS.ABSTRACT_ITEM,
        lf2: VALUE_ENUMS.NEWLINE,
        lf3: VALUE_ENUMS.NEWLINE,
        resultQuantity: 1,
        result: VALUE_ENUMS.ABSTRACT_ITEM,
        lf4: VALUE_ENUMS.NEWLINE,
        ModifyResult: VALUE_ENUMS.ABSTRACT_HANDLER + "CraftingRecipeModifyResult",
    },
    getDependencies: function () {
        const matchesList = new Set([].bake().dynamicConcat("block_advanced", "id", (x) => {
            return "block/" + x + "@0"
        }).dynamicConcat("item", "id", (x) => {
            return "item/" + x
        }).calculate());
        const possibleDepsList = new Set([
            this.tags.slot0,
            this.tags.slot1,
            this.tags.slot2,
            this.tags.slot3,
            this.tags.slot4,
            this.tags.slot5,
            this.tags.slot6,
            this.tags.slot7,
            this.tags.slot8,
            this.tags.result
        ]);
        const deps = [...matchesList.intersection(possibleDepsList)].map(x => {
            if (x.startsWith("block/")) {
                x = x.replace("block/", "").split("@");
                x = x[0];
                return state.nodes.find(y => (y.type === "block_advanced") && (y.tags.id === x))
            } else {
                x = x.replace("item/", "");
                return state.nodes.find(y => (y.type === "item") && (y.tags.id === x))
            }
        });
        return deps;
    },
    asJavaScript: function () {
        Object.keys(this.tags).forEach(k => {
            this.tags[k] = (this.tags[k] === VALUE_ENUMS.ABSTRACT_ITEM) ? "item/air" : this.tags[k];
        });
        const grid = [
            [this.tags.slot0, this.tags.slot1, this.tags.slot2],
            [this.tags.slot3, this.tags.slot4, this.tags.slot5],
            [this.tags.slot6, this.tags.slot7, this.tags.slot8]
        ];
        var minX = 2;
        var minY = 2;
        var maxX = 0;
        var maxY = 0;
        for (let y = 0; y < grid.length; y++) {
            const row = grid[y];
            for (let x = 0; x < row.length; x++) {
                const cell = row[x];
                if (cell === "item/air") {
                    continue;
                }
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }
        minX = Math.min(minX, maxX);
        minY = Math.min(minY, maxY);
        maxX = Math.max(maxX, minX);
        maxY = Math.max(maxY, minY);
        const newGrid = (new Array((maxY + 1) - minY)).fill([]).map(() => (new Array((maxX + 1) - minX)).fill("item/air"));
        for (let x = minX; x < (maxX + 1); x++) {
            for (let y = minY; y < (maxY + 1); y++) {
                newGrid[y - minY][x - minX] = grid[y][x];
            }
        }
        const uniqueTypesMap = Object.fromEntries([...new Set(newGrid.flat())].filter(x => x !== "item/air").map((x, i) => {
            return [x, String.fromCharCode(65 + i)];
        }));
        const uniqueTypesMapReverse = Object.fromEntries([...new Set(newGrid.flat())].filter(x => x !== "item/air").map((x, i) => {
            return [String.fromCharCode(65 + i), x];
        }));
        var legendStr = "";
        const ks = Object.keys(uniqueTypesMapReverse);
        ks.forEach((k, i) => {
            if (flags.target === "1_12") {
                legendStr += `"${k}": {
                item: "minecraft:${uniqueTypesMapReverse[k].split("/")[1].split("@")[0]}",
                ${uniqueTypesMapReverse[k].includes("@") ? `data: ${parseInt(uniqueTypesMapReverse[k].split("/")[1].split("@")[1]) || 0}` : ""}
            }${ks.length === (i+1) ? "" : ","}`
            } else {
                legendStr += `"${k}": {
                type: "${uniqueTypesMapReverse[k].split("/")[0]}",
                id: "${uniqueTypesMapReverse[k].split("/")[1].split("@")[0]}",
                ${uniqueTypesMapReverse[k].includes("@") ? `meta: ${parseInt(uniqueTypesMapReverse[k].split("/")[1].split("@")[1]) || 0}` : ""}
            }${ks.length === (i+1) ? "" : ","}`
            }
        });
        var $$recipePattern = "";
        for (let y = 0; y < newGrid.length; y++) {
            const row = newGrid[y];
            $$recipePattern += '"';
            for (let x = 0; x < row.length; x++) {
                const cell = row[x];
                $$recipePattern += `${cell === "item/air" ? " " : uniqueTypesMap[cell]}`
            }
            $$recipePattern += '"';
            $$recipePattern += ",";
        }
        var modifyResultHandler = getHandlerCode("CraftingRecipeModifyResult", this.tags.ModifyResult, ["$$itemstack"]);
        if (flags.target === "1_12") {
            return `(function CraftingRecipeDatablock112() {

    async function registerRecipe(isServer) {
        if (isServer) {
            await new Promise((res, rej) => {
                ModAPI.addEventListener("bootstrap", res);
            });
        }
        const parseJson = ModAPI.reflect.getClassByName("JSONObject").constructors.findLast(x => x.length === 1);
        const CraftingManager = ModAPI.reflect.getClassByName("CraftingManager");
        const CraftingManagerMethods = CraftingManager.staticMethods;
        const jsonData = parseJson(ModAPI.util.str(\`{
            "type": "crafting_shaped", ${/*/or crafting_shapeless/*/""}
            "pattern": [
    ${$$recipePattern}
  ],
  "key": {
    ${legendStr}
  },
  "result": {
    "item": "minecraft:${this.tags.result.split("/")[1].split("@")[0]}",
    "data": ${this.tags.result.split("/")[1].split("@")[1] || "0"},
    "count": ${this.tags.resultQuantity}
  }
            }\`.trim()));
        const recipeObj = CraftingManagerMethods.func_193376_a.method(jsonData); //convert json to an IRecipe
        CraftingManagerMethods.func_193379_a.method(ModAPI.util.str("coolrecipeid"), recipeObj); //register recipe under resource location
    }

    ModAPI.dedicatedServer.appendCode(registerRecipe);
    registerRecipe(false);
})();
`;
        } else {
            return `(function CraftingRecipeDatablock() {
    function $$registerRecipe() {
        function $$internalRegister() {
            const $$scoped_efb_globals = {};
            var $$ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
            function $$ToChar(char) {
                return ModAPI.reflect.getClassById("java.lang.Character").staticMethods.valueOf.method(char[0].charCodeAt(0));
            }
            var $$resultItemArg = "${this.tags.result.replace("item/air", "block/air")}";
            var $$recipeLegend = {
                ${legendStr}
            };
            var $$recipePattern = [
                ${$$recipePattern}
            ];
            var $$itemStackFromBlockWithMeta = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[2];
            var $$itemStackFromItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[4];
            var $$recipeInternal = [];
            Object.keys($$recipeLegend).forEach(($$key) => {
                $$recipeInternal.push($$ToChar($$key));
                var $$ingredient = ($$recipeLegend[$$key].type === "block" ? $$itemStackFromBlockWithMeta(ModAPI.blocks[$$recipeLegend[$$key].id].getRef(),1,$$recipeLegend[$$key].meta) : ModAPI.items[$$recipeLegend[$$key].id].getRef());
                $$recipeInternal.push($$ingredient);
            });

            var $$recipeContents = $$recipePattern.map(row => ModAPI.util.str(row));
            var $$recipe = ModAPI.util.makeArray($$ObjectClass, $$recipeContents.concat($$recipeInternal));

            var $$resultItem = $$resultItemArg.startsWith("block/") ?
                ($$itemStackFromBlockWithMeta(ModAPI.blocks[$$resultItemArg.replace("block/", "").split("@")[0]].getRef(),${this.tags.resultQuantity},$$resultItemArg.replace("block/", "").split("@")[1] || 0))
                : ($$itemStackFromItem(ModAPI.items[$$resultItemArg.replace("item/", "")].getRef(), ${this.tags.resultQuantity}));
            
            (function (${modifyResultHandler.args.join(",")}) {${modifyResultHandler.code}})($$resultItem);
            
            var $$craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager").staticMethods.getInstance.method();
            ModAPI.hooks.methods.nmic_CraftingManager_addRecipe($$craftingManager, $$resultItem, $$recipe);
            
        }

        if (ModAPI.items) {
            $$internalRegister();
        } else {
            ModAPI.addEventListener("bootstrap", $$internalRegister);
        }
    }
    ModAPI.dedicatedServer.appendCode($$registerRecipe);
    $$registerRecipe();
})();`;
        }
    }
}