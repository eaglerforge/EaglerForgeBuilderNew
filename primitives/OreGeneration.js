//TODO: quantityDropped, onBlockDestroyedByExplosion, onBlockActivated
PRIMITIVES["ore_generation"] = {
    name: "Ore Generation",
    type: "ore_generation",
    tags: {
        oreBlock: VALUE_ENUMS.ABSTRACT_BLOCK,
        lf0: VALUE_ENUMS.NEWLINE,
        veinSize: 4,
        veinCount: 105,
        minGenerationHeight: 0,
        maxGenerationHeight: 256,
        // New dimension control - 0 = Overworld, -1 = Nether, 1 = End
        dimension: 0
    },
    getDependencies: function () {
        const matchesList = new Set([].bake().dynamicConcat("block_advanced", "id", (x) => {
            return "block/" + x + "@0"
        }).calculate());
        const possibleDepsList = new Set([
            this.tags.oreBlock
        ]);
        const deps = [...matchesList.intersection(possibleDepsList)].map(x => {
            x = x.replace("block/", "").split("@");
            x = x[0];
            return state.nodes.find(y => (y.type === "block_advanced") && (y.tags.id === x))
        });
        return deps;
    },
    asJavaScript: function () {
        var blockId = this.tags.oreBlock.replaceAll("block/", "").split("@")[0];
        var blockMeta = parseInt(this.tags.oreBlock.replaceAll("block/", "").split("@")[1]) || 0;
        var salt = "XXXXXX".split("").map(x => Math.floor(Math.random() * 10)).join("");
        var targetDimension = this.tags.dimension;
        
        return `(function OreGenerationDatablock() {
    ModAPI.dedicatedServer.appendCode(()=>{
        const WorldGenMineable = ModAPI.reflect.getClassById("net.minecraft.world.gen.feature.WorldGenMineable").constructors.find(x=>x.length===2);
        
        // Universal approach - hook into chunk decoration
        const BiomeDecorator_decorate = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "decorate");
        const oldDecorate = ModAPI.hooks.methods[BiomeDecorator_decorate];
        ModAPI.hooks.methods[BiomeDecorator_decorate] = function ($this, $world, $random, $biomeGenBase, $blockpos) {
            // Check dimension
            const dimensionId = $world.provider ? $world.provider.getDimensionId() : ($world.worldInfo ? $world.worldInfo.getDimension() : 0);
            
            if (dimensionId === ${targetDimension}) {
                if (!$this[\`$efb2__${blockId + blockMeta}_${salt}_BlockGen\`]) {
                    $this[\`$efb2__${blockId + blockMeta}_${salt}_BlockGen\`] = WorldGenMineable(ModAPI.blocks[\`${blockId}\`].getStateFromMeta(${blockMeta}).getRef(), ${this.tags.veinSize});
                }
            }
            return oldDecorate.apply(this, [$this, $world, $random, $biomeGenBase, $blockpos]);
        }
        
        const BiomeDecorator_generateOres = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "generateOres");
        const oldGenerateOres = ModAPI.hooks.methods[BiomeDecorator_generateOres];
        ModAPI.hooks.methods[BiomeDecorator_generateOres] = function ($this) {
            // Generate ores if we have the generator for this dimension
            if ($this[\`$efb2__${blockId + blockMeta}_${salt}_BlockGen\`]) {
                $this.$genStandardOre1(${this.tags.veinCount}, $this[\`$efb2__${blockId + blockMeta}_${salt}_BlockGen\`], ${this.tags.minGenerationHeight}, ${this.tags.maxGenerationHeight});
            }
            return oldGenerateOres.apply(this, [$this]);
        }
        
        // Additional fallback - try to hook chunk population directly
        if (${targetDimension} !== 0) {
            try {
                // Try to find and hook the populate method from any chunk provider
                const IChunkProvider_populate = ModAPI.util.getMethodFromPackage("net.minecraft.world.chunk.IChunkProvider", "populate");
                if (IChunkProvider_populate) {
                    const oldPopulate = ModAPI.hooks.methods[IChunkProvider_populate];
                    ModAPI.hooks.methods[IChunkProvider_populate] = function ($this, $chunkProvider, $x, $z) {
                        const result = oldPopulate ? oldPopulate.apply(this, [$this, $chunkProvider, $x, $z]) : undefined;
                        
                        // Get the world
                        const world = $chunkProvider.worldObj || $chunkProvider.world || $this.worldObj || $this.world;
                        if (world) {
                            const dimensionId = world.provider ? world.provider.getDimensionId() : (world.worldInfo ? world.worldInfo.getDimension() : 0);
                            
                            if (dimensionId === ${targetDimension}) {
                                const random = world.rand || world.random;
                                if (random) {
                                    const oreGen = WorldGenMineable(ModAPI.blocks[\`${blockId}\`].getStateFromMeta(${blockMeta}).getRef(), ${this.tags.veinSize});
                                    
                                    for (let i = 0; i < ${this.tags.veinCount}; i++) {
                                        const genX = ($x << 4) + random.nextInt(16);
                                        const genY = random.nextInt(Math.max(1, ${this.tags.maxGenerationHeight} - ${this.tags.minGenerationHeight})) + ${this.tags.minGenerationHeight};
                                        const genZ = ($z << 4) + random.nextInt(16);
                                        
                                        try {
                                            const genPos = ModAPI.reflect.getClassById("net.minecraft.util.BlockPos").constructors[0](genX, genY, genZ);
                                            oreGen.generate(world, random, genPos);
                                        } catch (e) {
                                            // Fallback - try direct block placement
                                            const blockState = ModAPI.blocks[\`${blockId}\`].getStateFromMeta(${blockMeta});
                                            world.setBlockState(genX, genY, genZ, blockState);
                                        }
                                    }
                                }
                            }
                        }
                        
                        return result;
                    }
                }
            } catch (e) {
                console.log("Could not hook IChunkProvider.populate:", e);
            }
        }
    });
})();`;
    }
}
