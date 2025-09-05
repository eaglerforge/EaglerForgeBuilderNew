// Ore Generation System for EaglerForge 1.8.8
// Supports Overworld and Nether dimensions

PRIMITIVES["ore_generation"] = {
    name: "Ore Generation",
    type: "ore_generation",
    tags: {
        oreBlock: VALUE_ENUMS.ABSTRACT_BLOCK,
        lf0: VALUE_ENUMS.NEWLINE,
        
        // Overworld generation settings
        overworldEnabled: true,
        overworldVeinSize: 4,
        overworldVeinCount: 105,
        overworldMinHeight: 0,
        overworldMaxHeight: 256,
        
        lf1: VALUE_ENUMS.NEWLINE,
        
        // Nether generation settings
        netherEnabled: true,
        netherVeinSize: 8,
        netherVeinCount: 20,
        netherMinHeight: 10,
        netherMaxHeight: 117
    },
    
    getDependencies: function () {
        const matchesList = new Set([].bake().dynamicConcat("advanced_block", "id", (x) => {
            return "block/" + x + "@0"
        }).calculate());
        
        const possibleDepsList = new Set([
            this.tags.oreBlock
        ]);
        
        const deps = [...matchesList.intersection(possibleDepsList)].map(x => {
            x = x.replace("block/", "").split("@");
            x = x[0];
            return state.nodes.find(y => (y.type === "advanced_block") && (y.tags.id === x))
        });
        
        return deps;
    },
    
    asJavaScript: function () {
        var blockId = this.tags.oreBlock.replaceAll("block/", "").split("@")[0];
        var blockMeta = parseInt(this.tags.oreBlock.replaceAll("block/", "").split("@")[1]) || 0;
        var salt = "XXXXXX".split("").map(x => Math.floor(Math.random() * 10)).join("");
        
        return `(function OreGeneration() {
    ModAPI.dedicatedServer.appendCode(() => {
        // EaglerForge 1.8.8 compatible constructors
        const WorldGenMinable = ModAPI.reflect.getClassById("net.minecraft.world.gen.feature.WorldGenMinable").constructors.find(x => x.length === 2);
        const WorldGenGlowStone1 = ModAPI.reflect.getClassById("net.minecraft.world.gen.feature.WorldGenGlowStone1").constructors[0];
        
        // Get world provider dimension detection
        const World_provider = ModAPI.util.getFieldFromPackage("net.minecraft.world.World", "provider");
        const WorldProvider_getDimensionId = ModAPI.util.getMethodFromPackage("net.minecraft.world.WorldProvider", "getDimensionId");
        
        // Hook into BiomeDecorator.decorate to initialize generators per dimension
        const BiomeDecorator_decorate = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "decorate");
        const oldDecorate = ModAPI.hooks.methods[BiomeDecorator_decorate] || BiomeDecorator_decorate;
        
        ModAPI.hooks.methods[BiomeDecorator_decorate] = function ($this, $world, $random, $biomeGenBase, $blockpos) {
            const dimensionId = $world[World_provider][WorldProvider_getDimensionId]();
            
            // Initialize generators based on dimension - only once per decorator instance
            if (!$this.$oreInitialized_${salt}) {
                $this.$oreInitialized_${salt} = true;
                
                ${this.tags.overworldEnabled ? `
                if (dimensionId === 0) { // Overworld
                    $this[\`$ore_${blockId}_${salt}_overworld\`] = WorldGenMinable(
                        ModAPI.blocks[\`${blockId}\`].getStateFromMeta(${blockMeta}).getRef(),
                        ${this.tags.overworldVeinSize}
                    );
                }` : ''}
                
                ${this.tags.netherEnabled ? `
                if (dimensionId === -1) { // Nether - use WorldGenGlowStone1 for nether generation
                    $this[\`$ore_${blockId}_${salt}_nether\`] = WorldGenGlowStone1();
                    $this[\`$ore_${blockId}_${salt}_nether_block\`] = ModAPI.blocks[\`${blockId}\`].getStateFromMeta(${blockMeta}).getRef();
                    $this[\`$ore_${blockId}_${salt}_nether_size\`] = ${this.tags.netherVeinSize};
                }` : ''}
            }
            
            return oldDecorate.apply ? oldDecorate.apply(this, [$this, $world, $random, $biomeGenBase, $blockpos]) : oldDecorate($this, $world, $random, $biomeGenBase, $blockpos);
        };
        
        // Hook into BiomeDecorator.generateOres for actual ore generation
        const BiomeDecorator_generateOres = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "generateOres");
        const oldGenerateOres = ModAPI.hooks.methods[BiomeDecorator_generateOres] || BiomeDecorator_generateOres;
        
        ModAPI.hooks.methods[BiomeDecorator_generateOres] = function ($this, $world, $random, $blockpos) {
            try {
                const dimensionId = $world[World_provider][WorldProvider_getDimensionId]();
                
                // Generate ores based on current dimension
                ${this.tags.overworldEnabled ? `
                if (dimensionId === 0 && $this[\`$ore_${blockId}_${salt}_overworld\`]) {
                    try {
                        $this.$genStandardOre1(${this.tags.overworldVeinCount}, $this[\`$ore_${blockId}_${salt}_overworld\`], ${this.tags.overworldMinHeight}, ${this.tags.overworldMaxHeight});
                    } catch (e) {
                        console.warn("Error generating overworld ore:", e);
                    }
                }` : ''}
                
                ${this.tags.netherEnabled ? `
                if (dimensionId === -1 && $this[\`$ore_${blockId}_${salt}_nether\`]) {
                    try {
                        // Use WorldGenGlowStone1 pattern for nether ores
                        for (let i = 0; i < ${this.tags.netherVeinCount}; i++) {
                            const x = $blockpos.getX() + $random.nextInt(16);
                            const y = ${this.tags.netherMinHeight} + $random.nextInt(${this.tags.netherMaxHeight - this.tags.netherMinHeight});
                            const z = $blockpos.getZ() + $random.nextInt(16);
                            const pos = new (ModAPI.reflect.getClassById("net.minecraft.util.BlockPos").constructors.find(c => c.length === 3))(x, y, z);
                            
                            // Custom nether generation using glowstone pattern
                            const generator = $this[\`$ore_${blockId}_${salt}_nether\`];
                            if (generator && generator.generate) {
                                // Override the block that gets generated
                                const originalGenerate = generator.generate;
                                generator.generate = function(world, random, blockPos) {
                                    // Place our ore block instead of glowstone
                                    const targetBlock = $this[\`$ore_${blockId}_${salt}_nether_block\`];
                                    if (world.getBlockState(blockPos).getBlock().toString().includes("air") || 
                                        world.getBlockState(blockPos).getBlock().toString().includes("netherrack")) {
                                        world.setBlockState(blockPos, targetBlock, 2);
                                        
                                        // Generate additional blocks in cluster (like glowstone does)
                                        for (let j = 0; j < $this[\`$ore_${blockId}_${salt}_nether_size\`]; j++) {
                                            const offsetX = random.nextInt(8) - random.nextInt(8);
                                            const offsetY = random.nextInt(4) - random.nextInt(4);
                                            const offsetZ = random.nextInt(8) - random.nextInt(8);
                                            const newPos = blockPos.add(offsetX, offsetY, offsetZ);
                                            
                                            if (world.getBlockState(newPos).getBlock().toString().includes("netherrack")) {
                                                world.setBlockState(newPos, targetBlock, 2);
                                            }
                                        }
                                    }
                                    return true;
                                };
                                generator.generate($world, $random, pos);
                            }
                        }
                    } catch (e) {
                        console.warn("Error generating nether ore:", e);
                    }
                }` : ''}
                
            } catch (e) {
                console.error("Error in ore generation:", e);
            }
            
            // Call original generateOres method
            return oldGenerateOres.apply ? oldGenerateOres.apply(this, [$this, $world, $random, $blockpos]) : oldGenerateOres($this, $world, $random, $blockpos);
        };
        
        console.log("EaglerForge Ore Generation initialized for ${blockId}");
        console.log("Enabled dimensions:", [
            ${this.tags.overworldEnabled ? '"Overworld"' : ''},
            ${this.tags.netherEnabled ? '"Nether"' : ''}
        ].filter(d => d).join(", "));
        
    });
})();`;
    }
};

// EaglerForge compatible legacy version (fixed)
PRIMITIVES["ore_generation"] = {
    name: "Ore Generation (Legacy)",
    type: "ore_generation", 
    tags: {
        oreBlock: VALUE_ENUMS.ABSTRACT_BLOCK,
        lf0: VALUE_ENUMS.NEWLINE,
        veinSize: 4,
        veinCount: 105,
        minGenerationHeight: 0,
        maxGenerationHeight: 256
    },
    getDependencies: function () {
        const matchesList = new Set([].bake().dynamicConcat("advanced_block", "id", (x) => {
            return "block/" + x + "@0"
        }).calculate());
        const possibleDepsList = new Set([
            this.tags.oreBlock
        ]);
        const deps = [...matchesList.intersection(possibleDepsList)].map(x => {
            x = x.replace("block/", "").split("@");
            x = x[0];
            return state.nodes.find(y => (y.type === "advanced_block") && (y.tags.id === x))
        });
        return deps;
    },
    asJavaScript: function () {
        var blockId = this.tags.oreBlock.replaceAll("block/", "").split("@")[0];
        var blockMeta = parseInt(this.tags.oreBlock.replaceAll("block/", "").split("@")[1]) || 0;
        var salt = "XXXXXX".split("").map(x => Math.floor(Math.random() * 10)).join("");
        
        return `(function OreGenerationDatablock() {
    ModAPI.dedicatedServer.appendCode(() => {
        // EaglerForge 1.8.8 uses 2-parameter WorldGenMinable constructor
        const WorldGenMinable = ModAPI.reflect.getClassById("net.minecraft.world.gen.feature.WorldGenMinable").constructors.find(x => x.length === 2);
        
        // Hook BiomeDecorator.decorate
        const BiomeDecorator_decorate = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "decorate");
        const oldDecorate = ModAPI.hooks.methods[BiomeDecorator_decorate] || BiomeDecorator_decorate;
        
        ModAPI.hooks.methods[BiomeDecorator_decorate] = function ($this, $world, $random, $biomeGenBase, $blockpos) {
            if (!$this.$currentWorld_${salt}) {
                $this.$currentWorld_${salt} = $world;
                $this[\`$efb2__${blockId + blockMeta}_${salt}_BlockGen\`] = WorldGenMinable(
                    ModAPI.blocks[\`${blockId}\`].getStateFromMeta(${blockMeta}).getRef(), 
                    ${this.tags.veinSize}
                );
            }
            return oldDecorate.apply ? oldDecorate.apply(this, [$this, $world, $random, $biomeGenBase, $blockpos]) : oldDecorate($this, $world, $random, $biomeGenBase, $blockpos);
        };
        
        // Hook BiomeDecorator.generateOres  
        const BiomeDecorator_generateOres = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "generateOres");
        const oldGenerateOres = ModAPI.hooks.methods[BiomeDecorator_generateOres] || BiomeDecorator_generateOres;
        
        ModAPI.hooks.methods[BiomeDecorator_generateOres] = function ($this, $world, $random, $blockpos) {
            if ($this[\`$efb2__${blockId + blockMeta}_${salt}_BlockGen\`]) {
                try {
                    $this.$genStandardOre1(${this.tags.veinCount}, $this[\`$efb2__${blockId + blockMeta}_${salt}_BlockGen\`], ${this.tags.minGenerationHeight}, ${this.tags.maxGenerationHeight});
                } catch (e) {
                    console.warn("Ore generation error:", e);
                }
            }
            return oldGenerateOres.apply ? oldGenerateOres.apply(this, [$this, $world, $random, $blockpos]) : oldGenerateOres($this, $world, $random, $blockpos);
        };
        
        console.log("EaglerForge ore generation initialized for ${blockId}");
    });
})();`;
    }
};
