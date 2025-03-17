//TODO: quantityDropped, onBlockDestroyedByExplosion, onBlockActivated
PRIMITIVES["block_advanced"] = {
    name: "Advanced Block",
    uses: ["fixup_block_ids"],
    type: "block_advanced",
    tags: {
        id: "advanced_block",
        name: "Advanced Block",
        texture: VALUE_ENUMS.IMG,
        tickRatio: 10,
        material: ['rock', 'air', 'grass', 'ground', 'wood', 'iron', 'anvil', 'water', 'lava', 'leaves', 'plants', 'vine', 'sponge', 'cloth', 'fire', 'sand', 'circuits', 'carpet', 'glass', 'redstoneLight', 'tnt', 'coral', 'ice', 'packedIce', 'snow', 'craftedSnow', 'cactus', 'clay', 'gourd', 'dragonEgg', 'portal', 'cake', 'web', 'piston', 'barrier'],
        Constructor: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockConstructor",
        Break: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockBreak",
        Added: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockAdded",
        NeighborChange: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockNeighbourChange",
        Break: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockBreak",
        BrokenByPlayer: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockBrokenByPlayer",
        RandomTick: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockRandomTick",
        EntityCollided: VALUE_ENUMS.ABSTRACT_HANDLER + "BlockEntityCollision",
    },
    getDependencies: function () {
        return [];
    },
    asJavaScript: function () {
        var constructorHandler = getHandlerCode("BlockConstructor", this.tags.Constructor, []);
        var breakHandler = getHandlerCode("BlockBreak", this.tags.Break, ["$$world", "$$blockpos", "$$blockstate"]);
        var addedHandler = getHandlerCode("BlockAdded", this.tags.Added, ["$$world", "$$blockpos", "$$blockstate"]);
        var neighborHandler = getHandlerCode("BlockNeighbourChange", this.tags.NeighborChange, ["$$world", "$$blockpos", "$$blockstate"]);
        var brokenByPlayerHandler = getHandlerCode("BlockBrokenByPlayer", this.tags.BrokenByPlayer, ["$$world", "$$blockpos", "$$blockstate"]);
        var randomTickHandler = getHandlerCode("BlockRandomTick", this.tags.RandomTick, ["$$world", "$$blockpos", "$$blockstate", "$$random"]);
        var entityCollisionHandler = getHandlerCode("BlockEntityCollision", this.tags.EntityCollided, ["$$world", "$$blockpos", "$$entity"]);
        return `(function AdvancedBlockDatablock() {
    const $$blockTexture = "${this.tags.texture}";

    function $$ServersideBlocks() {
        var $$itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var $$blockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
        var $$iproperty = ModAPI.reflect.getClassById("net.minecraft.block.properties.IProperty").class;
        var $$makeBlockState = ModAPI.reflect.getClassById("net.minecraft.block.state.BlockState").constructors.find(x => x.length === 2);
        var $$blockSuper = ModAPI.reflect.getSuper($$blockClass, (x) => x.length === 2);

        var $$breakBlockMethod = $$blockClass.methods.breakBlock.method;
        var $$onBlockAddedMethod = $$blockClass.methods.onBlockAdded.method;
        var $$onNeighborBlockChangeMethod = $$blockClass.methods.onNeighborBlockChange.method;
        var $$onBlockDestroyedByPlayerMethod = $$blockClass.methods.onBlockDestroyedByPlayer.method;
        var $$randomTickMethod = $$blockClass.methods.randomTick.method;
        var $$entityCollisionMethod = $$blockClass.methods.onEntityCollidedWithBlock.method;

        var $$nmb_AdvancedBlock = function $$nmb_AdvancedBlock() {
            $$blockSuper(this, ModAPI.materials.${this.tags.material}.getRef());
            this.$defaultBlockState = this.$blockState.$getBaseState();
            ${constructorHandler.code};
        }
        ModAPI.reflect.prototypeStack($$blockClass, $$nmb_AdvancedBlock);
        $$nmb_AdvancedBlock.prototype.$isOpaqueCube = function () {
            return 1;
        }
        $$nmb_AdvancedBlock.prototype.$createBlockState = function () {
            return $$makeBlockState(this, ModAPI.array.object($$iproperty, 0));
        }
        $$nmb_AdvancedBlock.prototype.$breakBlock = function (${breakHandler.args.join(", ")}) {
            ${breakHandler.code};
            return $$breakBlockMethod(this, ${breakHandler.args.join(", ")});
        }
        $$nmb_AdvancedBlock.prototype.$onBlockAdded = function (${addedHandler.args.join(", ")}) {
            ${addedHandler.code};
            return $$onBlockAddedMethod(this, ${addedHandler.args.join(", ")});
        }
        $$nmb_AdvancedBlock.prototype.$onNeighborBlockChange = function (${neighborHandler.args.join(", ")}) {
            ${neighborHandler.code};
            return $$onNeighborBlockChangeMethod(this, ${neighborHandler.args.join(", ")});
        }
        $$nmb_AdvancedBlock.prototype.$onBlockDestroyedByPlayer = function (${brokenByPlayerHandler.args.join(", ")}) {
            ${brokenByPlayerHandler.code};
            return $$onBlockDestroyedByPlayerMethod(this, ${brokenByPlayerHandler.args.join(", ")});
        }
        $$nmb_AdvancedBlock.prototype.$randomTick = function (${randomTickHandler.args.join(", ")}) {
            ${randomTickHandler.code};
            return $$randomTickMethod(this, ${randomTickHandler.args.join(", ")});
        }
        $$nmb_AdvancedBlock.prototype.$tickRate = function () {
            return ${Math.max(1, Math.floor(this.tags.tickRatio || 10))};
        }
        $$nmb_AdvancedBlock.prototype.$onEntityCollidedWithBlock = function (${entityCollisionHandler.args.join(", ")}) {
            ${entityCollisionHandler.code};
            return $$entityCollisionMethod(this, ${entityCollisionHandler.args.join(", ")});
        }

        function $$internal_reg() {
            var $$cblock = (new $$nmb_AdvancedBlock()).$setUnlocalizedName(
                ModAPI.util.str("${this.tags.id}")
            );
            $$blockClass.staticMethods.registerBlock0.method(
                ModAPI.keygen.block("${this.tags.id}"),
                ModAPI.util.str("${this.tags.id}"),
                $$cblock
            );
            $$itemClass.staticMethods.registerItemBlock0.method($$cblock);
            efb2__fixupBlockIds();
            ModAPI.blocks["${this.tags.id}"] = $$cblock;
            
            return $$cblock;
        }

        if (ModAPI.materials) {
            return $$internal_reg();
        } else {
            ModAPI.addEventListener("bootstrap", $$internal_reg);
        }
    }
    ModAPI.dedicatedServer.appendCode($$ServersideBlocks);
    var $$cblock = $$ServersideBlocks();
    ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener("lib:asyncsink:registeritems", ($$renderItem)=>{
            $$renderItem.registerBlock($$cblock, ModAPI.util.str("${this.tags.id}"));
        });
        AsyncSink.L10N.set("tile.${this.tags.id}.name", "${this.tags.name}");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/block/${this.tags.id}.json", JSON.stringify(
            {
                "parent": "block/cube_all",
                "textures": {
                    "all": "blocks/${this.tags.id}"
                }
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/${this.tags.id}.json", JSON.stringify(
            {
                "parent": "block/${this.tags.id}",
                "display": {
                    "thirdperson": {
                        "rotation": [10, -45, 170],
                        "translation": [0, 1.5, -2.75],
                        "scale": [1, 1, 1] 
// set this back to 0.375 if it does not work
                    }
                }
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/blockstates/${this.tags.id}.json", JSON.stringify(
            {
                "variants": {
                    "normal": [
                        { "model": "${this.tags.id}" },
                    ]
                }
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/blocks/${this.tags.id}.png", await (await fetch(
            $$blockTexture
        )).arrayBuffer());
    });
})();`;
    }
}