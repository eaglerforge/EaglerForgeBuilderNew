// TODO: quantityDropped, onBlockDestroyedByExplosion, onBlockActivated
PRIMITIVES["block_advanced"] = {
    name: "Advanced Block",
    uses: ["fixup_block_ids", "str2ab"],
    type: "block_advanced",
    tags: {
        id: "advanced_block",
        name: "Advanced Block",
        texture: VALUE_ENUMS.IMG,
        uploadedModel: null, // optional uploaded JSON model
        uploadedTextures: [], // optional array [{key, outName, b64}]
        animatedSpritesheetTexture: false,
        animatedTextureFrameDuration: 1,
        animatedTextureInterpolate: false,
        tickRatio: 10,
        material: ['rock', 'air', 'grass', 'ground', 'wood', 'iron', 'anvil', 'water', 'lava', 'leaves', 'plants', 'vine', 'sponge', 'cloth', 'fire', 'sand', 'circuits', 'carpet', 'glass', 'redstoneLight', 'tnt', 'coral', 'ice', 'packedIce', 'snow', 'craftedSnow', 'cactus', 'clay', 'gourd', 'dragonEgg', 'portal', 'cake', 'web', 'piston', 'barrier'],
        Constructor: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockConstructor",
        Break: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockBreak",
        Added: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockAdded",
        NeighborChange: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockNeighbourChange",
        BrokenByPlayer: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockBrokenByPlayer",
        RandomTick: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockRandomTick",
        EntityCollided: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockEntityCollision",
        GetDroppedItem: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockGetDroppedItem",
        QuantityDropped: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockQuantityDropped",
    },
    getDependencies: function () { return []; },
    asJavaScript: function () {
        var constructorHandler = getHandlerCode("BlockConstructor", this.tags.Constructor, []);
        var breakHandler = getHandlerCode("BlockBreak", this.tags.Break, ["$$world", "$$blockpos", "$$blockstate"]);
        var addedHandler = getHandlerCode("BlockAdded", this.tags.Added, ["$$world", "$$blockpos", "$$blockstate"]);
        var neighborHandler = getHandlerCode("BlockNeighbourChange", this.tags.NeighborChange, ["$$world", "$$blockpos", "$$blockstate"], {
            "1_8": function (args, code) {
                return `
                var $$onNeighborBlockChangeMethod = $$blockClass.methods.onNeighborBlockChange.method;
                $$nmb_AdvancedBlock.prototype.$onNeighborBlockChange = function (${args.join(", ")}) {
                    ${code};
                    return $$onNeighborBlockChangeMethod(this, ${args.join(", ")});
                }
                `;
            },
            "1_12": function (args, code) {
                const copy = [...args];
                copy[0] = args[1]; copy[1] = args[2]; copy[2] = args[0];
                return `
                var $$onNeighborBlockChangeMethod = $$blockClass.methods.neighborChanged.method;
                $$nmb_AdvancedBlock.prototype.$neighborChanged = function (${copy.join(", ")}) {
                    ${code};
                    return $$onNeighborBlockChangeMethod(this, ${copy.join(", ")});
                }
                `;
            }
        });
        var brokenByPlayerHandler = getHandlerCode("BlockBrokenByPlayer", this.tags.BrokenByPlayer, ["$$world", "$$blockpos", "$$blockstate"]);
        var randomTickHandler = getHandlerCode("BlockRandomTick", this.tags.RandomTick, ["$$world", "$$blockpos", "$$blockstate", "$$random"]);
        var entityCollisionHandler = getHandlerCode("BlockEntityCollision", this.tags.EntityCollided, ["$$world", "$$blockpos", "$$entity"], {
            "1_8": function (args, code) {
                return `
                var $$entityCollisionMethod = $$blockClass.methods.onEntityCollidedWithBlock.method;
                $$nmb_AdvancedBlock.prototype.$onEntityCollidedWithBlock = function (${args.join(", ")}) {
                    ${code};
                    return $$entityCollisionMethod(this, ${args.join(", ")});
                }`;
            },
            "1_12": function (args, code) {
                const argList = `${args.slice(0,2).join(", ")},$$blockstate,${args[2]}`;
                return `
                var $$entityCollisionMethod = $$blockClass.methods.onEntityCollidedWithBlock.method;
                $$nmb_AdvancedBlock.prototype.$onEntityCollidedWithBlock = function (${argList}) {
                    ${code};
                    return $$entityCollisionMethod(this, ${argList});
                }`;
            }
        });
        var getDroppedItemHandler = getHandlerCode("BlockGetDroppedItem", this.tags.GetDroppedItem, ["$$blockstate", "$$random", "$$forture"]);
        var quantityDroppedHandler = getHandlerCode("BlockQuantityDropped", this.tags.QuantityDropped, ["$$random", "$$fortune"]);

        var animationCode = `
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/blocks/${this.tags.id}.png.mcmeta", efb2__str2ab(
\`{
    "animation": {
        "frametime": ${Math.max(1, Math.round(this.tags.animatedTextureFrameDuration)) || 1},
        "interpolate": ${this.tags.animatedTextureInterpolate}
    }
}\`));
        `;

        return `(function AdvancedBlockDatablock() {
    const $$blockTexture = "${this.tags.texture}";
    function $$ServersideBlocks() { /* all handlers remain unchanged */ }
    ModAPI.dedicatedServer.appendCode($$ServersideBlocks);
    var $$cblock = $$ServersideBlocks();

    ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener("lib:asyncsink:registeritems", ($$renderItem)=>{
            $$renderItem.registerBlock($$cblock, ModAPI.util.str("${this.tags.id}"));
        });
        AsyncSink.L10N.set("tile.${this.tags.id}.name", "${this.tags.name}");

        // ===== CHANGED PART: custom model & textures =====
        if (this.tags.uploadedModel) {
            AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/block/${this.tags.id}.json", efb2__str2ab(JSON.stringify(this.tags.uploadedModel)));
        } else {
            AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/block/${this.tags.id}.json", efb2__str2ab(JSON.stringify({
                parent: "block/cube_all",
                textures: { all: "blocks/${this.tags.id}" }
            })));
        }

        if (this.tags.uploadedTextures && this.tags.uploadedTextures.length) {
            for (const tex of this.tags.uploadedTextures) {
                AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/blocks/" + tex.outName + ".png", __b64toAB(tex.b64));
            }
        } else {
            AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/blocks/${this.tags.id}.png", await (await fetch($$blockTexture)).arrayBuffer());
        }
        ${this.tags.animatedSpritesheetTexture ? animationCode : ""}

        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/${this.tags.id}.json", JSON.stringify({
            parent: "block/${this.tags.id}",
            display: { thirdperson: { rotation:[10,-45,170], translation:[0,1.5,-2.75], scale:[0.375,0.375,0.375] } }
        }));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/blockstates/${this.tags.id}.json", JSON.stringify({ variants: { normal:[{model:"${this.tags.id}"}] } }));
    });
})();`;
    }
}
