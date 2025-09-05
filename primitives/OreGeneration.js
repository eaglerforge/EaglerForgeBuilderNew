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
        overworldReplaceBlock: "block/stone@0",
        
        lf1: VALUE_ENUMS.NEWLINE,
        
        // Nether generation settings
        netherEnabled: false,
        netherVeinSize: 8,
        netherVeinCount: 20,
        netherMinHeight: 10,
        netherMaxHeight: 117,
        netherReplaceBlock: "block/netherrack@0",
        
        lf2: VALUE_ENUMS.NEWLINE,
        
        // End generation settings
        endEnabled: false,
        endVeinSize: 6,
        endVeinCount: 15,
        endMinHeight: 0,
        endMaxHeight: 128,
        endReplaceBlock: "block/end_stone@0",
        
        lf3: VALUE_ENUMS.NEWLINE,
        
        // Custom dimension settings
        customEnabled: false,
        customDimensionId: -1,
        customVeinSize: 5,
        customVeinCount: 30,
        customMinHeight: 0,
        customMaxHeight: 200,
        customReplaceBlock: "block/stone@0",
        
        lf4: VALUE_ENUMS.NEWLINE,
        
        // Advanced settings
        generateInVeins: true,
        generateScattered: false,
        scatteredChance: 0.1,
        biomeRestrictions: "",  // Comma-separated biome names, empty = all biomes
        heightVariation: 0.2    // 0-1, adds randomness to height distribution
    },
    
    getDependencies: function () {
        const matchesList = new Set([].bake().dynamicConcat("block_advanced", "id", (x) => {
            return "block/" + x + "@0"
        }).calculate());
        
        const possibleDepsList = new Set([
            this.tags.oreBlock,
            this.tags.overworldReplaceBlock,
            this.tags.netherReplaceBlock,
            this.tags.endReplaceBlock,
            this.tags.customReplaceBlock
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
        
        // Helper function to get replace block info
        const getReplaceBlockInfo = (blockString) => {
            const parts = blockString.replaceAll("block/", "").split("@");
            return {
                id: parts[0],
                meta: parseInt(parts[1]) || 0
            };
        };
        
        const overworldReplace = getReplaceBlockInfo(this.tags.overworldReplaceBlock);
        const netherReplace = getReplaceBlockInfo(this.tags.netherReplaceBlock);
        const endReplace = getReplaceBlockInfo(this.tags.endReplaceBlock);
        const customReplace = getReplaceBlockInfo(this.tags.customReplaceBlock);
        
        return `(function MultiDimensionalOreGeneration() {
    ModAPI.dedicatedServer.appendCode(() => {
        const WorldGenMineable = ModAPI.reflect.getClassById("net.minecraft.world.gen.feature.WorldGenMineable").constructors.find(x => x.length === 3);
        const WorldGenMineable2 = ModAPI.reflect.getClassById("net.minecraft.world.gen.feature.WorldGenMineable").constructors.find(x => x.length === 2);
        const World = ModAPI.reflect.getClassById("net.minecraft.world.World");
        const BlockPos = ModAPI.reflect.getClassById("net.minecraft.util.BlockPos");
        
        // Get dimension provider methods
        const WorldProvider_getDimensionId = ModAPI.util.getMethodFromPackage("net.minecraft.world.WorldProvider", "getDimensionId");
        const World_getWorldInfo = ModAPI.util.getMethodFromPackage("net.minecraft.world.World", "getWorldInfo");
        const World_provider = ModAPI.util.getFieldFromPackage("net.minecraft.world.World", "provider");
        
        // Biome restriction helper
        const biomeRestrictions = "${this.tags.biomeRestrictions}".split(",").map(s => s.trim()).filter(s => s.length > 0);
        const checkBiomeRestriction = (biome) => {
            if (biomeRestrictions.length === 0) return true;
            const biomeName = biome.biomeName || biome.toString();
            return biomeRestrictions.some(restriction => biomeName.includes(restriction));
        };
        
        // Height variation helper
        const applyHeightVariation = (random, minHeight, maxHeight, variation) => {
            if (variation <= 0) return { min: minHeight, max: maxHeight };
            const range = maxHeight - minHeight;
            const variationAmount = Math.floor(range * variation);
            const randomVariation = random.nextInt(variationAmount * 2) - variationAmount;
            return {
                min: Math.max(0, minHeight + randomVariation),
                max: Math.min(256, maxHeight + randomVariation)
            };
        };
        
        // Hook into BiomeDecorator.decorate to initialize generators
        const BiomeDecorator_decorate = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "decorate");
        const oldDecorate = ModAPI.hooks.methods[BiomeDecorator_decorate];
        
        ModAPI.hooks.methods[BiomeDecorator_decorate] = function ($this, $world, $random, $biomeGenBase, $blockpos) {
            if (!$this.$currentWorld) {
                const dimensionId = $world[World_provider][WorldProvider_getDimensionId]();
                
                // Initialize generators based on dimension
                ${this.tags.overworldEnabled ? `
                if (dimensionId === 0) { // Overworld
                    $this[\`$ore_${blockId}_${salt}_overworld\`] = WorldGenMineable(
                        ModAPI.blocks[\`${blockId}\`].getStateFromMeta(${blockMeta}).getRef(),
                        ${this.tags.overworldVeinSize},
                        ModAPI.blocks[\`${overworldReplace.id}\`].getStateFromMeta(${overworldReplace.meta}).getRef()
                    );
                }` : ''}
                
                ${this.tags.netherEnabled ? `
                if (dimensionId === -1) { // Nether
                    $this[\`$ore_${blockId}_${salt}_nether\`] = WorldGenMineable(
                        ModAPI.blocks[\`${blockId}\`].getStateFromMeta(${blockMeta}).getRef(),
                        ${this.tags.netherVeinSize},
                        ModAPI.blocks[\`${netherReplace.id}\`].getStateFromMeta(${netherReplace.meta}).getRef()
                    );
                }` : ''}
                
                ${this.tags.endEnabled ? `
                if (dimensionId === 1) { // End
                    $this[\`$ore_${blockId}_${salt}_end\`] = WorldGenMineable(
                        ModAPI.blocks[\`${blockId}\`].getStateFromMeta(${blockMeta}).getRef(),
                        ${this.tags.endVeinSize},
                        ModAPI.blocks[\`${endReplace.id}\`].getStateFromMeta(${endReplace.meta}).getRef()
                    );
                }` : ''}
                
                ${this.tags.customEnabled ? `
                if (dimensionId === ${this.tags.customDimensionId}) { // Custom dimension
                    $this[\`$ore_${blockId}_${salt}_custom\`] = WorldGenMineable(
                        ModAPI.blocks[\`${blockId}\`].getStateFromMeta(${blockMeta}).getRef(),
                        ${this.tags.customVeinSize},
                        ModAPI.blocks[\`${customReplace.id}\`].getStateFromMeta(${customReplace.meta}).getRef()
                    );
                }` : ''}
            }
            
            return oldDecorate.apply(this, [$this, $world, $random, $biomeGenBase, $blockpos]);
        };
        
        // Hook into BiomeDecorator.generateOres for actual generation
        const BiomeDecorator_generateOres = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "generateOres");
        const oldGenerateOres = ModAPI.hooks.methods[BiomeDecorator_generateOres];
        
        ModAPI.hooks.methods[BiomeDecorator_generateOres] = function ($this, $world, $random, $blockpos) {
            const dimensionId = $world[World_provider][WorldProvider_getDimensionId]();
            const currentBiome = $world.getBiome($blockpos);
            
            // Check biome restrictions
            if (!checkBiomeRestriction(currentBiome)) {
                return oldGenerateOres.apply(this, [$this, $world, $random, $blockpos]);
            }
            
            // Generate based on dimension
            ${this.tags.overworldEnabled ? `
            if (dimensionId === 0 && $this[\`$ore_${blockId}_${salt}_overworld\`]) {
                const heights = applyHeightVariation($random, ${this.tags.overworldMinHeight}, ${this.tags.overworldMaxHeight}, ${this.tags.heightVariation});
                
                ${this.tags.generateInVeins ? `
                // Generate in veins
                $this.$genStandardOre1(${this.tags.overworldVeinCount}, $this[\`$ore_${blockId}_${salt}_overworld\`], heights.min, heights.max);
                ` : ''}
                
                ${this.tags.generateScattered ? `
                // Generate scattered blocks
                for (let i = 0; i < Math.ceil(${this.tags.overworldVeinCount} * ${this.tags.scatteredChance}); i++) {
                    if ($random.nextFloat() < ${this.tags.scatteredChance}) {
                        const x = $blockpos.getX() + $random.nextInt(16);
                        const y = heights.min + $random.nextInt(heights.max - heights.min);
                        const z = $blockpos.getZ() + $random.nextInt(16);
                        const pos = new (BlockPos.constructors.find(c => c.length === 3))(x, y, z);
                        $this[\`$ore_${blockId}_${salt}_overworld\`].generate($world, $random, pos);
                    }
                }
                ` : ''}
            }` : ''}
            
            ${this.tags.netherEnabled ? `
            if (dimensionId === -1 && $this[\`$ore_${blockId}_${salt}_nether\`]) {
                const heights = applyHeightVariation($random, ${this.tags.netherMinHeight}, ${this.tags.netherMaxHeight}, ${this.tags.heightVariation});
                
                ${this.tags.generateInVeins ? `
                $this.$genStandardOre1(${this.tags.netherVeinCount}, $this[\`$ore_${blockId}_${salt}_nether\`], heights.min, heights.max);
                ` : ''}
                
                ${this.tags.generateScattered ? `
                for (let i = 0; i < Math.ceil(${this.tags.netherVeinCount} * ${this.tags.scatteredChance}); i++) {
                    if ($random.nextFloat() < ${this.tags.scatteredChance}) {
                        const x = $blockpos.getX() + $random.nextInt(16);
                        const y = heights.min + $random.nextInt(heights.max - heights.min);
                        const z = $blockpos.getZ() + $random.nextInt(16);
                        const pos = new (BlockPos.constructors.find(c => c.length === 3))(x, y, z);
                        $this[\`$ore_${blockId}_${salt}_nether\`].generate($world, $random, pos);
                    }
                }
                ` : ''}
            }` : ''}
            
            ${this.tags.endEnabled ? `
            if (dimensionId === 1 && $this[\`$ore_${blockId}_${salt}_end\`]) {
                const heights = applyHeightVariation($random, ${this.tags.endMinHeight}, ${this.tags.endMaxHeight}, ${this.tags.heightVariation});
                
                ${this.tags.generateInVeins ? `
                $this.$genStandardOre1(${this.tags.endVeinCount}, $this[\`$ore_${blockId}_${salt}_end\`], heights.min, heights.max);
                ` : ''}
                
                ${this.tags.generateScattered ? `
                for (let i = 0; i < Math.ceil(${this.tags.endVeinCount} * ${this.tags.scatteredChance}); i++) {
                    if ($random.nextFloat() < ${this.tags.scatteredChance}) {
                        const x = $blockpos.getX() + $random.nextInt(16);
                        const y = heights.min + $random.nextInt(heights.max - heights.min);
                        const z = $blockpos.getZ() + $random.nextInt(16);
                        const pos = new (BlockPos.constructors.find(c => c.length === 3))(x, y, z);
                        $this[\`$ore_${blockId}_${salt}_end\`].generate($world, $random, pos);
                    }
                }
                ` : ''}
            }` : ''}
            
            ${this.tags.customEnabled ? `
            if (dimensionId === ${this.tags.customDimensionId} && $this[\`$ore_${blockId}_${salt}_custom\`]) {
                const heights = applyHeightVariation($random, ${this.tags.customMinHeight}, ${this.tags.customMaxHeight}, ${this.tags.heightVariation});
                
                ${this.tags.generateInVeins ? `
                $this.$genStandardOre1(${this.tags.customVeinCount}, $this[\`$ore_${blockId}_${salt}_custom\`], heights.min, heights.max);
                ` : ''}
                
                ${this.tags.generateScattered ? `
                for (let i = 0; i < Math.ceil(${this.tags.customVeinCount} * ${this.tags.scatteredChance}); i++) {
                    if ($random.nextFloat() < ${this.tags.scatteredChance}) {
                        const x = $blockpos.getX() + $random.nextInt(16);
                        const y = heights.min + $random.nextInt(heights.max - heights.min);
                        const z = $blockpos.getZ() + $random.nextInt(16);
                        const pos = new (BlockPos.constructors.find(c => c.length === 3))(x, y, z);
                        $this[\`$ore_${blockId}_${salt}_custom\`].generate($world, $random, pos);
                    }
                }
                ` : ''}
            }` : ''}
            
            return oldGenerateOres.apply(this, [$this, $world, $random, $blockpos]);
        };
        
        console.log("Multi-dimensional ore generation system initialized for ${blockId}");
        console.log("Active dimensions:", {
            overworld: ${this.tags.overworldEnabled},
            nether: ${this.tags.netherEnabled},
            end: ${this.tags.endEnabled},
            custom: ${this.tags.customEnabled ? this.tags.customDimensionId : 'disabled'}
        });
    });
})();`;
    }
};
