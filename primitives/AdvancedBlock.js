PRIMITIVES["block_advanced"] = {
    name: "Advanced Block",
    uses: ["fixup_block_ids", "str2ab"],
    type: "block_advanced",
    tags: {
        id: "advanced_block",
        name: "Advanced Block",
        texture: VALUE_ENUMS.IMG, // main texture
        modelJSON: VALUE_ENUMS.IMG, // optional uploaded block JSON
        extraTextures: [], // optional additional textures for the model
        animatedSpritesheetTexture: false,
        animatedTextureFrameDuration: 1,
        animatedTextureInterpolate: false,
        tickRatio: 10,
        material: [
            'rock','air','grass','ground','wood','iron','anvil','water','lava','leaves','plants',
            'vine','sponge','cloth','fire','sand','circuits','carpet','glass','redstoneLight',
            'tnt','coral','ice','packedIce','snow','craftedSnow','cactus','clay','gourd',
            'dragonEgg','portal','cake','web','piston','barrier'
        ],
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

        // Handlers
        var constructorHandler = getHandlerCode("BlockConstructor", this.tags.Constructor, []);
        var breakHandler = getHandlerCode("BlockBreak", this.tags.Break, ["$$world","$$blockpos","$$blockstate"]);
        var addedHandler = getHandlerCode("BlockAdded", this.tags.Added, ["$$world","$$blockpos","$$blockstate"]);
        var neighborHandler = getHandlerCode("BlockNeighbourChange", this.tags.NeighborChange, ["$$world","$$blockpos","$$blockstate"], {
            "1_8": function(args, code){
                return `var $$onNeighborBlockChangeMethod = $$blockClass.methods.onNeighborBlockChange.method;
$$nmb_AdvancedBlock.prototype.$onNeighborBlockChange = function(${args.join(", ")}){ ${code}; return $$onNeighborBlockChangeMethod(this, ${args.join(", ")}); }`
            },
            "1_12": function(args, code){
                const copy = [...args];
                copy[0]=args[1]; copy[1]=args[2]; copy[2]=args[0];
                return `var $$onNeighborBlockChangeMethod = $$blockClass.methods.neighborChanged.method;
$$nmb_AdvancedBlock.prototype.$neighborChanged = function(${copy.join(", ")}){ ${code}; return $$onNeighborBlockChangeMethod(this, ${copy.join(", ")}); }`
            }
        });
        var brokenByPlayerHandler = getHandlerCode("BlockBrokenByPlayer", this.tags.BrokenByPlayer, ["$$world","$$blockpos","$$blockstate"]);
        var randomTickHandler = getHandlerCode("BlockRandomTick", this.tags.RandomTick, ["$$world","$$blockpos","$$blockstate","$$random"]);
        var entityCollisionHandler = getHandlerCode("BlockEntityCollision", this.tags.EntityCollided, ["$$world","$$blockpos","$$entity"], {
            "1_8": function(args, code){
                return `var $$entityCollisionMethod = $$blockClass.methods.onEntityCollidedWithBlock.method;
$$nmb_AdvancedBlock.prototype.$onEntityCollidedWithBlock = function(${args.join(", ")}){ ${code}; return $$entityCollisionMethod(this, ${args.join(", ")}); };`
            },
            "1_12": function(args, code){
                const argList = `${args.slice(0,2).join(", ")},$$blockstate,${args[2]}`;
                return `var $$entityCollisionMethod = $$blockClass.methods.onEntityCollidedWithBlock.method;
$$nmb_AdvancedBlock.prototype.$onEntityCollidedWithBlock = function(${argList}){ ${code}; return $$entityCollisionMethod(this, ${argList}); };`
            }
        });
        var getDroppedItemHandler = getHandlerCode("BlockGetDroppedItem", this.tags.GetDroppedItem, ["$$blockstate","$$random","$$forture"]);
        var quantityDroppedHandler = getHandlerCode("BlockQuantityDropped", this.tags.QuantityDropped, ["$$random","$$fortune"]);

        var animationCode = AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/textures/blocks/${this.tags.id}.png.mcmeta`, 
            efb2__str2ab(
                JSON.stringify({
                    "animation":{
                        "frametime":Math.max(1,Math.round(this.tags.animatedTextureFrameDuration))||1,
                        "interpolate":this.tags.animatedTextureInterpolate
                    }
                })
            )
        );

        return (function AdvancedBlockDatablock(){

            const $$blockTexture = "${this.tags.texture}";
            const $$blockModelJSON = "${this.tags.modelJSON}";
            const $$extraTextures = ${JSON.stringify(this.tags.extraTextures||[])};
            const blockId = "${this.tags.id}";
            const blockName = "${this.tags.name}";

            function $$ServersideBlocks(){
                const $$scoped_efb_globals = {};
                var $$itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
                var $$blockClass = ModAPI.reflect.getClassById("net.minecraft.block.Block");
                var $$iproperty = ModAPI.reflect.getClassById("net.minecraft.block.properties.IProperty").class;
                var $$makeBlockState = ModAPI.reflect.getClassById("${flags.target==="1_12"?"net.minecraft.block.state.BlockStateContainer":"net.minecraft.block.state.BlockState"}").constructors.find(x=>x.length===2);
                var $$blockSuper = ModAPI.reflect.getSuper($$blockClass,(x)=>x.length===2);
                var $$breakBlockMethod = $$blockClass.methods.breakBlock.method;
                var $$onBlockAddedMethod = $$blockClass.methods.onBlockAdded.method;
                var $$onBlockDestroyedByPlayerMethod = $$blockClass.methods.onBlockDestroyedByPlayer.method;
                var $$randomTickMethod = $$blockClass.methods.randomTick.method;
                var $$getDroppedItem = $$blockClass.methods.getItemDropped.method;
                var $$quantityDropped = $$blockClass.methods.quantityDropped.method;

                var $$nmb_AdvancedBlock = function $$nmb_AdvancedBlock(){
                    $$blockSuper(this, ModAPI.materials.${this.tags.material}.getRef());
                    ${flags.target==="1_12"?"//":""}this.$defaultBlockState=this.$blockState.$getBaseState();
                    ${constructorHandler.code};
                };

                ModAPI.reflect.prototypeStack($$blockClass, $$nmb_AdvancedBlock);

                $$nmb_AdvancedBlock.prototype.$isOpaqueCube=function(){return 1;}
                $$nmb_AdvancedBlock.prototype.$createBlockState=function(){ return $$makeBlockState(this, ModAPI.array.object($$iproperty,0)); }

                $$nmb_AdvancedBlock.prototype.$breakBlock=function(${breakHandler.args.join(", ")}){
                    ${breakHandler.code}; return $$breakBlockMethod(this, ${breakHandler.args.join(", ")});
                }
                $$nmb_AdvancedBlock.prototype.$onBlockAdded=function(${addedHandler.args.join(", ")}){
                    ${addedHandler.code}; return $$onBlockAddedMethod(this, ${addedHandler.args.join(", ")});
                }

                ${neighborHandler}

                $$nmb_AdvancedBlock.prototype.$onBlockDestroyedByPlayer=function(${brokenByPlayerHandler.args.join(", ")}){
                    ${brokenByPlayerHandler.code}; return $$onBlockDestroyedByPlayerMethod(this, ${brokenByPlayerHandler.args.join(", ")});
                }

                $$nmb_AdvancedBlock.prototype.$randomTick=function(${randomTickHandler.args.join(", ")}){
                    ${randomTickHandler.code}; return $$randomTickMethod(this, ${randomTickHandler.args.join(", ")});
                }

                $$nmb_AdvancedBlock.prototype.$tickRate=function(){
                    return ${Math.max(1, Math.floor(this.tags.tickRatio||10))};
                }

                ${entityCollisionHandler}

                $$nmb_AdvancedBlock.prototype.$getItemDropped=function(${getDroppedItemHandler.args.join(", ")}){
                    ${getDroppedItemHandler.code}; return $$getDroppedItem(this, ${getDroppedItemHandler.args.join(", ")});
                }

                $$nmb_AdvancedBlock.prototype.$quantityDropped=function(${quantityDroppedHandler.args.join(", ")}){
                    ${quantityDroppedHandler.code}; return $$quantityDropped(this, ${quantityDroppedHandler.args.join(", ")});
                }

                $$nmb_AdvancedBlock.prototype.$quantityDroppedWithBonus=function(${quantityDroppedHandler.args.reverse().join(", ")}){
                    ${quantityDroppedHandler.code}; return $$quantityDropped(this, ${quantityDroppedHandler.args.reverse().join(", ")});
                }

                // === Internal registration ===
                function $$internal_reg(){
                    var $$cblock = (new $$nmb_AdvancedBlock()).$setUnlocalizedName(
                        ModAPI.util.str(blockId)
                    );
                    $$blockClass.staticMethods.registerBlock0.method(
                        ModAPI.keygen.block(blockId),
                        ModAPI.util.str(blockId),
                        $$cblock
                    );
                    $$itemClass.staticMethods.registerItemBlock0.method($$cblock);
                    efb2__fixupBlockIds();
                    ModAPI.blocks[blockId] = $$cblock;
                    
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

            // === AsyncSink registration with robust fetch ===
            ModAPI.addEventListener("lib:asyncsink", async () => {
                ModAPI.addEventListener("lib:asyncsink:registeritems", ($$renderItem)=>{
                    $$renderItem.registerBlock($$cblock, ModAPI.util.str(blockId));
                });

                AsyncSink.L10N.set(`tile.${blockId}.name`, blockName);

                try {
                    if(!$$blockModelJSON){
                        AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/textures/blocks/${blockId}.png`, await (await fetch($$blockTexture)).arrayBuffer());
                        AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/models/block/${blockId}.json`, JSON.stringify(
                            { "parent": "block/cube_all", "textures": { "all": `blocks/${blockId}` } }
                        ));
                    } else {
                        try{
                            let jsonText = await (await fetch($$blockModelJSON)).text();
                            AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/models/block/${blockId}.json`, jsonText);
                        } catch(e){ console.warn("Failed to load block model JSON:", e); }

                        for(let tex of $$extraTextures){
                            try{
                                AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/textures/blocks/${tex.name}.png`, await (await fetch(tex.src)).arrayBuffer());
                            } catch(e){ console.warn("Failed to load extra texture:", tex.name, e); }
                        }
                    }

                    AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/models/item/${blockId}.json`, JSON.stringify({
                        "parent": `block/${blockId}`,
                        "display": {
                            "thirdperson": {
                                "rotation": [10, -45, 170],
                                "translation": [0, 1.5, -2.75],
                                "scale": [0.375,0.375,0.375]
                            }
                        }
                    }));

                    AsyncSink.setFile(`resourcepacks/AsyncSinkLib/assets/minecraft/blockstates/${blockId}.json`, JSON.stringify(
                        { "variants": { "normal":[ { "model": blockId } ] } }
                    ));

                    if(${this.tags.animatedSpritesheetTexture}){
                        ${animationCode};
                    }

                } catch(e){ console.error("Block registration failed for "+blockId, e); }
            });

        })();
    }
};
