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
        dimensionId: 0  // 0 = Overworld, -1 = Nether, 1 = End
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
        var blockMeta = parseInt(this.tags.oreBlock.replaceAll("block/", "").split("@")[0]) || 0;
        var salt = "XXXXXX".split("").map(x => Math.floor(Math.random() * 10)).join("");
        return `(function OreGenerationDatablock() {
    ModAPI.dedicatedServer.appendCode(()=>{
        const WorldGenMineable = ModAPI.reflect.getClassById("net.minecraft.world.gen.feature.WorldGenMinable").constructors.find(x=>x.length===3);
        const BiomeDecorator_decorate = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "decorate");
        const oldDecorate = ModAPI.hooks.methods[BiomeDecorator_decorate];
        ModAPI.hooks.methods[BiomeDecorator_decorate] = function ($this, $world, $random, $biomeGenBase, $blockpos) {
            if (!$this.$currentWorld) {
                // Determine which block to replace based on dimension
                let targetBlock;
                const dimensionId = ${this.tags.dimensionId};
                if (dimensionId === -1) {
                    targetBlock = ModAPI.blocks.netherrack.getDefaultState().getRef(); // Nether
                } else if (dimensionId === 1) {
                    targetBlock = ModAPI.blocks.end_stone.getDefaultState().getRef(); // End
                } else {
                    targetBlock = ModAPI.blocks.stone.getDefaultState().getRef(); // Overworld
                }
                $this[\`$efb2__${blockId + blockMeta}_${salt}_BlockGen\`] = WorldGenMineable(ModAPI.blocks[\`${blockId}\`].getStateFromMeta(${blockMeta}).getRef(), ${this.tags.veinSize}, targetBlock);
            }
            return oldDecorate.apply(this, [$this, $world, $random, $biomeGenBase, $blockpos]);
        }
        const BiomeDecorator_generateOres = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "generateOres");
        const oldGenerateOres = ModAPI.hooks.methods[BiomeDecorator_generateOres];
        ModAPI.hooks.methods[BiomeDecorator_generateOres] = function ($this) {
            // Check if we're in the correct dimension
            const dimensionId = $this.field_180294_c.field_73011_w.field_76574_g; // world.provider.dimensionId
            if (dimensionId === ${this.tags.dimensionId}) {
                $this.$genStandardOre1(${this.tags.veinCount}, $this[\`$efb2__${blockId + blockMeta}_${salt}_BlockGen\`] || null, ${this.tags.minGenerationHeight}, ${this.tags.maxGenerationHeight});
            }
            return oldGenerateOres.apply(this, [$this]);
        }
    });
})();`;
    }
}
