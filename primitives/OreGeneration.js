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
        dimension: {
            type: "enum",
            default: 0,
            values: {
                "Overworld": 0,
                "Nether": -1,
                "End": 1
            }
        }
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
        var dimId = this.tags.dimension || 0; // default to Overworld

        return (function OreGenerationDatablock() {
            ModAPI.dedicatedServer.appendCode(() => {
                const WorldGenMinable = ModAPI.reflect.getClassById("net.minecraft.world.gen.feature.WorldGenMinable")
                    .constructors.find(x => x.length === 2);

                function makeGen() {
                    return WorldGenMinable(
                        ModAPI.blocks[blockId].getStateFromMeta(blockMeta).getRef(),
                        ${this.tags.veinSize}
                    );
                }

                // --- Overworld (BiomeDecorator) ---
                const BiomeDecorator_generateOres = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "generateOres");
                const oldGenerateOres = ModAPI.hooks.methods[BiomeDecorator_generateOres];
                ModAPI.hooks.methods[BiomeDecorator_generateOres] = function ($this) {
                    if ($this.currentWorld.provider.getDimensionId() === ${dimId}) {
                        $this.$genStandardOre1(
                            ${this.tags.veinCount},
                            makeGen(),
                            ${this.tags.minGenerationHeight},
                            ${this.tags.maxGenerationHeight}
                        );
                    }
                    return oldGenerateOres.apply(this, [$this]);
                };

                // --- Nether (ChunkProviderHell) ---
                const ChunkProviderHell_generate = ModAPI.util.getMethodFromPackage("net.minecraft.world.gen.ChunkProviderHell", "generate");
                const oldNetherGen = ModAPI.hooks.methods[ChunkProviderHell_generate];
                ModAPI.hooks.methods[ChunkProviderHell_generate] = function ($this, chunkX, chunkZ, chunkPrimer) {
                    let result = oldNetherGen.apply(this, [$this, chunkX, chunkZ, chunkPrimer]);

                    if ($this.worldObj.provider.getDimensionId() === ${dimId}) {
                        for (let i = 0; i < ${this.tags.veinCount}; i++) {
                            let x = chunkX * 16 + $this.hellRNG.nextInt(16);
                            let y = $this.hellRNG.nextInt(${this.tags.maxGenerationHeight});
                            let z = chunkZ * 16 + $this.hellRNG.nextInt(16);
                            makeGen().generate($this.worldObj, $this.hellRNG, new BlockPos(x, y, z));
                        }
                    }
                    return result;
                };

                // --- End (ChunkProviderEnd) ---
                const ChunkProviderEnd_generate = ModAPI.util.getMethodFromPackage("net.minecraft.world.gen.ChunkProviderEnd", "generate");
                const oldEndGen = ModAPI.hooks.methods[ChunkProviderEnd_generate];
                ModAPI.hooks.methods[ChunkProviderEnd_generate] = function ($this, chunkX, chunkZ, chunkPrimer) {
                    let result = oldEndGen.apply(this, [$this, chunkX, chunkZ, chunkPrimer]);

                    if ($this.worldObj.provider.getDimensionId() === ${dimId}) {
                        for (let i = 0; i < ${this.tags.veinCount}; i++) {
                            let x = chunkX * 16 + $this.endRNG.nextInt(16);
                            let y = $this.endRNG.nextInt(${this.tags.maxGenerationHeight});
                            let z = chunkZ * 16 + $this.endRNG.nextInt(16);
                            makeGen().generate($this.worldObj, $this.endRNG, new BlockPos(x, y, z));
                        }
                    }
                    return result;
                };
            });
        })();
    }
};
