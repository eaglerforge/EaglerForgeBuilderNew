PRIMITIVES["structure"] = {
    name: "Structure",
    type: "structure",
    tags: {
        litematicaFile: VALUE_ENUMS.FILE, // Use file upload system like Icon
        spawnOnBlock: VALUE_ENUMS.ABSTRACT_BLOCK,
        foundationBlock: VALUE_ENUMS.ABSTRACT_BLOCK,
        spawnChance: 5,
        dimensionId: 0,
        blockMapping0: VALUE_ENUMS.ABSTRACT_BLOCK,
        blockMapping1: VALUE_ENUMS.ABSTRACT_BLOCK,
        blockMapping2: VALUE_ENUMS.ABSTRACT_BLOCK,
        blockMapping3: VALUE_ENUMS.ABSTRACT_BLOCK,
        blockMapping4: VALUE_ENUMS.ABSTRACT_BLOCK,
        blockMapping5: VALUE_ENUMS.ABSTRACT_BLOCK,
        blockMapping6: VALUE_ENUMS.ABSTRACT_BLOCK,
        blockMapping7: VALUE_ENUMS.ABSTRACT_BLOCK,
        blockMapping8: VALUE_ENUMS.ABSTRACT_BLOCK,
        blockMapping9: VALUE_ENUMS.ABSTRACT_BLOCK
    },
    getDependencies: function () {
        const possibleDepsList = [
            this.tags.spawnOnBlock,
            this.tags.foundationBlock,
            this.tags.blockMapping0,
            this.tags.blockMapping1,
            this.tags.blockMapping2,
            this.tags.blockMapping3,
            this.tags.blockMapping4,
            this.tags.blockMapping5,
            this.tags.blockMapping6,
            this.tags.blockMapping7,
            this.tags.blockMapping8,
            this.tags.blockMapping9
        ].filter(x => x && x !== "");

        return possibleDepsList.map(id => state.nodes.find(y => y.tags.id === id)).filter(Boolean);
    },
    asJavaScript: function () {
        if (!this.tags.litematicaFile || this.tags.litematicaFile === VALUE_ENUMS.FILE) {
            return ""; // No file uploaded
        }

        const spawnOnBlockId = this.tags.spawnOnBlock.replaceAll("block/", "").split("@")[0];
        const foundationBlockId = this.tags.foundationBlock.replaceAll("block/", "").split("@")[0];

        return `
(function LitematicaStructureGenerator() {
    ModAPI.dedicatedServer.appendCode(()=>{
        const BlockPos = ModAPI.reflect.getClassById("net.minecraft.util.BlockPos");

        // Reference uploaded Litematica file
        const litematicaFile = "${this.tags.litematicaFile}";

        async function parseLitematicaFile(filePath) {
            // Load file via ModAPI or environment-specific file loader
            const response = await fetch(filePath);
            const arrayBuffer = await response.arrayBuffer();
            const data = new Uint8Array(arrayBuffer);

            // Simple parsing to extract block palette (replace with your detailed parser)
            const textDecoder = new TextDecoder('utf-8');
            let content = textDecoder.decode(data);
            const blockRegex = /minecraft:([a-z_]+)/g;
            let match;
            const blocksSet = new Set();
            while ((match = blockRegex.exec(content)) !== null) blocksSet.add('minecraft:' + match[1]);
            const palette = Array.from(blocksSet);
            return { palette, size: { x: 7, y: 4, z: 7 }, blocks: [] }; // placeholder blocks
        }

        parseLitematicaFile(litematicaFile).then(structureData => {
            if (!structureData) return;

            function generateLitematicaStructure(world, random, blockpos) {
                const startX = blockpos.func_177958_n();
                const startY = blockpos.func_177956_o();
                const startZ = blockpos.func_177952_p();

                // Place foundation
                for (let x = 0; x < structureData.size.x; x++) {
                    for (let z = 0; z < structureData.size.z; z++) {
                        const foundationPos = BlockPos(startX + x, startY - 1, startZ + z);
                        const belowFoundation = BlockPos(startX + x, startY - 2, startZ + z);
                        if (world.func_180495_p(foundationPos).func_177230_c() === ModAPI.blocks.air) {
                            world.func_180501_a(foundationPos, ModAPI.blocks["${foundationBlockId}"].getDefaultState(), 2);
                        }
                        if (world.func_180495_p(belowFoundation).func_177230_c() === ModAPI.blocks.air) {
                            world.func_180501_a(belowFoundation, ModAPI.blocks["${foundationBlockId}"].getDefaultState(), 2);
                        }
                    }
                }

                // Structure blocks placement would go here
            }

            const BiomeDecorator_decorate = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "decorate");
            const oldDecorate = ModAPI.hooks.methods[BiomeDecorator_decorate];

            ModAPI.hooks.methods[BiomeDecorator_decorate] = function($this, $world, $random, $biomeGenBase, $blockpos) {
                if ($world.field_73011_w.field_76574_g === ${this.tags.dimensionId}) {
                    if ($random.nextInt(100) < ${this.tags.spawnChance}) {
                        const chunkX = $blockpos.func_177958_n();
                        const chunkZ = $blockpos.func_177952_p();
                        const spawnX = chunkX + $random.nextInt(16 - structureData.size.x);
                        const spawnZ = chunkZ + $random.nextInt(16 - structureData.size.z);

                        let spawnY = -1;
                        for (let y = 100; y >= 1; y--) {
                            const checkPos = BlockPos(spawnX, y, spawnZ);
                            if ($world.func_180495_p(checkPos).func_177230_c() === ModAPI.blocks["${spawnOnBlockId}"]) {
                                const airPos = BlockPos(spawnX, y + 1, spawnZ);
                                if ($world.func_180495_p(airPos).func_177230_c() === ModAPI.blocks.air) {
                                    spawnY = y + 1;
                                    break;
                                }
                            }
                        }

                        if (spawnY > 0) generateLitematicaStructure($world, $random, BlockPos(spawnX, spawnY, spawnZ));
                    }
                }
                return oldDecorate.apply(this, [$this, $world, $random, $biomeGenBase, $blockpos]);
            };
        });
    });
})();`;
    }
};
