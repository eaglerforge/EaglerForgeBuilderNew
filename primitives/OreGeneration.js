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
        
        // For Overworld generation
        if (${targetDimension} === 0) {
            const BiomeDecorator_decorate = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "decorate");
            const oldDecorate = ModAPI.hooks.methods[BiomeDecorator_decorate];
            ModAPI.hooks.methods[BiomeDecorator_decorate] = function ($this, $world, $random, $biomeGenBase, $blockpos) {
                if (!$this.$currentWorld) {
                    $this[\`$efb2__${blockId + blockMeta}_${salt}_BlockGen\`] = WorldGenMineable(ModAPI.blocks[\`${blockId}\`].getStateFromMeta(${blockMeta}).getRef(), ${this.tags.veinSize});
                }
                return oldDecorate.apply(this, [$this, $world, $random, $biomeGenBase, $blockpos]);
            }
            const BiomeDecorator_generateOres = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "generateOres");
            const oldGenerateOres = ModAPI.hooks.methods[BiomeDecorator_generateOres];
            ModAPI.hooks.methods[BiomeDecorator_generateOres] = function ($this) {
                $this.$genStandardOre1(${this.tags.veinCount}, $this[\`$efb2__${blockId + blockMeta}_${salt}_BlockGen\`] || null, ${this.tags.minGenerationHeight}, ${this.tags.maxGenerationHeight});
                return oldGenerateOres.apply(this, [$this]);
            }
        }
        
        // For Nether generation
        else if (${targetDimension} === -1) {
            const ChunkProviderHell_populate = ModAPI.util.getMethodFromPackage("net.minecraft.world.gen.ChunkProviderHell", "populate");
            const oldPopulate = ModAPI.hooks.methods[ChunkProviderHell_populate];
            ModAPI.hooks.methods[ChunkProviderHell_populate] = function ($this, $chunkProvider, $x, $z) {
                const result = oldPopulate.apply(this, [$this, $chunkProvider, $x, $z]);
                
                // Generate custom ore in nether
                const world = $chunkProvider.worldObj || $chunkProvider.world;
                const random = world.rand;
                const blockPos = ModAPI.reflect.getClassById("net.minecraft.util.BlockPos").constructors[0](($x << 4) + 8, 0, ($z << 4) + 8);
                
                const oreGen = WorldGenMineable(ModAPI.blocks[\`${blockId}\`].getStateFromMeta(${blockMeta}).getRef(), ${this.tags.veinSize});
                
                for (let i = 0; i < ${this.tags.veinCount}; i++) {
                    const genX = blockPos.getX() + random.nextInt(16);
                    const genY = random.nextInt(Math.max(1, ${this.tags.maxGenerationHeight} - ${this.tags.minGenerationHeight})) + ${this.tags.minGenerationHeight};
                    const genZ = blockPos.getZ() + random.nextInt(16);
                    const genPos = ModAPI.reflect.getClassById("net.minecraft.util.BlockPos").constructors[0](genX, genY, genZ);
                    oreGen.generate(world, random, genPos);
                }
                
                return result;
            }
        }
        
        // For End generation
        else if (${targetDimension} === 1) {
            const ChunkProviderEnd_populate = ModAPI.util.getMethodFromPackage("net.minecraft.world.gen.ChunkProviderEnd", "populate");
            const oldPopulateEnd = ModAPI.hooks.methods[ChunkProviderEnd_populate];
            ModAPI.hooks.methods[ChunkProviderEnd_populate] = function ($this, $chunkProvider, $x, $z) {
                const result = oldPopulateEnd.apply(this, [$this, $chunkProvider, $x, $z]);
                
                // Generate custom ore in end
                const world = $chunkProvider.worldObj || $chunkProvider.world;
                const random = world.rand;
                const blockPos = ModAPI.reflect.getClassById("net.minecraft.util.BlockPos").constructors[0](($x << 4) + 8, 0, ($z << 4) + 8);
                
                const oreGen = WorldGenMineable(ModAPI.blocks[\`${blockId}\`].getStateFromMeta(${blockMeta}).getRef(), ${this.tags.veinSize});
                
                for (let i = 0; i < ${this.tags.veinCount}; i++) {
                    const genX = blockPos.getX() + random.nextInt(16);
                    const genY = random.nextInt(Math.max(1, ${this.tags.maxGenerationHeight} - ${this.tags.minGenerationHeight})) + ${this.tags.minGenerationHeight};
                    const genZ = blockPos.getZ() + random.nextInt(16);
                    const genPos = ModAPI.reflect.getClassById("net.minecraft.util.BlockPos").constructors[0](genX, genY, genZ);
                    oreGen.generate(world, random, genPos);
                }
                
                return result;
            }
        }
    });
})();`;
    }
}
