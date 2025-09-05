PRIMITIVES["structure"] = {
    name: "Structure",
    type: "structure",
    tags: {
        litematicaFile: "", // File upload will be handled by existing file upload system
        lf0: VALUE_ENUMS.NEWLINE,
        spawnOnBlock: VALUE_ENUMS.ABSTRACT_BLOCK, // Uses existing block selection
        foundationBlock: VALUE_ENUMS.ABSTRACT_BLOCK, // Uses existing block selection
        spawnChance: 5, // Percentage chance per chunk
        dimensionId: 0, // 0 = Overworld, -1 = Nether, 1 = End
        // Block mappings will be dynamically added after file parse
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
        const matchesList = new Set([].bake().dynamicConcat("advanced_block", "id", (x) => {
            return "block/" + x + "@0"
        }).calculate());
        const possibleDepsList = new Set([
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
        ].filter(x => x && x !== ""));
        const deps = [...matchesList.intersection(possibleDepsList)].map(x => {
            x = x.replace("block/", "").split("@");
            x = x[0];
            return state.nodes.find(y => (y.type === "advanced_block") && (y.tags.id === x))
        });
        return deps;
    },
    asJavaScript: function () {
        var spawnOnBlockId = this.tags.spawnOnBlock.replaceAll("block/", "").split("@")[0];
        var foundationBlockId = this.tags.foundationBlock.replaceAll("block/", "").split("@")[0];
        var salt = "XXXXXX".split("").map(x => Math.floor(Math.random() * 10)).join("");
        
        return `(function LitematicaStructureGenerator() {
    ModAPI.dedicatedServer.appendCode(()=>{
        const BlockPos = ModAPI.reflect.getClassById("net.minecraft.util.BlockPos");
        
        // Structure data - this would be populated from the uploaded Litematica file
        let structureData = null;
        
        // Convert Litematica block names to Minecraft block IDs
        function convertBlockName(litematicaName) {
            // Remove minecraft: prefix if present
            let blockName = litematicaName.replace('minecraft:', '');
            
            // Handle common block name differences between versions
            const blockMapping = {
                'oak_planks': 'planks',
                'oak_log': 'log',
                'oak_leaves': 'leaves',
                'stone_bricks': 'stonebrick',
                'cobblestone_stairs': 'stone_stairs',
                'oak_stairs': 'oak_stairs',
                'spruce_planks': 'planks',
                'birch_planks': 'planks',
                'jungle_planks': 'planks',
                'acacia_planks': 'planks',
                'dark_oak_planks': 'planks',
                'white_wool': 'wool',
                'iron_door': 'iron_door',
                'wooden_door': 'wooden_door'
            };
            
            // Use mapping if available, otherwise use the original name
            blockName = blockMapping[blockName] || blockName;
            
            // Check if the block exists in ModAPI.blocks
            if (ModAPI.blocks[blockName]) {
                return blockName;
            }
            
            // Fallback to stone if block doesn't exist
            console.warn('Block not found: ' + litematicaName + ', using stone instead');
            return 'stone';
        }
        
        // Parse Litematica file function
        async function parseLitematicaFile(fileData) {
            try {
                // Enhanced NBT-like parsing for Litematica files
                const parseNBT = (data) => {
                    const textDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
                    let content = '';
                    
                    // Extract readable strings that might contain block names
                    for (let i = 0; i < data.length - 10; i++) {
                        try {
                            const slice = data.slice(i, i + 100);
                            const decoded = textDecoder.decode(slice);
                            if (decoded.includes('minecraft:') || decoded.includes('block')) {
                                content += decoded + ' ';
                            }
                        } catch (e) {
                            // Continue on decode errors
                        }
                    }
                    
                    // Extract block palette
                    const blockRegex = /minecraft:([a-z_]+)/g;
                    let match;
                    const foundBlocks = new Set();
                    
                    while ((match = blockRegex.exec(content)) !== null) {
                        foundBlocks.add('minecraft:' + match[1]);
                    }
                    
                    let palette = Array.from(foundBlocks);
                    if (palette.length === 0) {
                        // Fallback structure if parsing fails
                        palette = ['minecraft:stone', 'minecraft:air', 'minecraft:cobblestone', 'minecraft:oak_planks'];
                    }
                    
                    // Convert palette to Minecraft block names and create mapping
                    const convertedPalette = palette.map(blockName => convertBlockName(blockName));
                    
                    // Create a simple house structure as example
                    const size = { x: 7, y: 4, z: 7 };
                    const totalBlocks = size.x * size.y * size.z;
                    const blocks = new Array(totalBlocks);
                    
                    // Generate a simple house structure using the actual blocks from palette
                    for (let y = 0; y < size.y; y++) {
                        for (let z = 0; z < size.z; z++) {
                            for (let x = 0; x < size.x; x++) {
                                const index = y * (size.x * size.z) + z * size.x + x;
                                
                                if (y === 0) {
                                    // Floor - use first solid block from palette
                                    blocks[index] = convertedPalette.findIndex(b => b !== 'air') || 0;
                                } else if (y === size.y - 1) {
                                    // Roof - use first solid block from palette
                                    blocks[index] = convertedPalette.findIndex(b => b !== 'air') || 0;
                                } else if (x === 0 || x === size.x - 1 || z === 0 || z === size.z - 1) {
                                    // Walls with door
                                    if (x === 3 && z === 0 && y === 1) {
                                        blocks[index] = convertedPalette.indexOf('air') >= 0 ? convertedPalette.indexOf('air') : 1;
                                    } else {
                                        // Use second solid block if available, otherwise first
                                        const solidBlocks = convertedPalette.filter(b => b !== 'air');
                                        blocks[index] = convertedPalette.indexOf(solidBlocks[1] || solidBlocks[0]);
                                    }
                                } else {
                                    // Interior - use air
                                    blocks[index] = convertedPalette.indexOf('air') >= 0 ? convertedPalette.indexOf('air') : 1;
                                }
                            }
                        }
                    }
                    
                    return {
                        size: size,
                        palette: convertedPalette,
                        blocks: blocks
                    };
                };
                
                return parseNBT(fileData);
            } catch (error) {
                console.error('Error parsing Litematica file:', error);
                return null;
            }
        }
        
        // Initialize with example structure (in real use, this would be loaded from file)
        structureData = {
            size: { x: 7, y: 4, z: 7 },
            palette: ['stone', 'air', 'cobblestone', 'planks', 'glass'],
            blocks: [
                // Floor layer (y=0)
                0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0,
                // Wall layer 1 (y=1)
                2,2,2,2,2,2,2, 2,1,1,1,1,1,2, 2,1,1,1,1,1,2, 2,1,1,1,1,1,2, 2,1,1,1,1,1,2, 2,1,1,1,1,1,2, 2,2,2,1,2,2,2,
                // Wall layer 2 (y=2)  
                2,4,4,4,4,4,2, 2,1,1,1,1,1,2, 2,1,1,1,1,1,2, 2,1,1,1,1,1,2, 2,1,1,1,1,1,2, 2,4,4,4,4,4,2, 2,2,2,2,2,2,2,
                // Roof layer (y=3)
                0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0, 0,0,0,0,0,0,0
            ]
        };
        
        function generateLitematicaStructure(world, random, blockpos) {
            if (!structureData) return false;
            
            const startX = blockpos.func_177958_n(); // getX()
            const startY = blockpos.func_177956_o(); // getY()
            const startZ = blockpos.func_177952_p(); // getZ()
            
            // Build foundation and fill gaps
            for (let x = 0; x < structureData.size.x; x++) {
                for (let z = 0; z < structureData.size.z; z++) {
                    const foundationPos = BlockPos(startX + x, startY - 1, startZ + z);
                    const belowFoundation = BlockPos(startX + x, startY - 2, startZ + z);
                    
                    // Check if foundation needs support
                    const foundationState = world.func_180495_p(foundationPos); // getBlockState
                    const belowState = world.func_180495_p(belowFoundation); // getBlockState
                    
                    if (foundationState.func_177230_c() === ModAPI.blocks.air) { // getBlock()
                        world.func_180501_a(foundationPos, ModAPI.blocks["${foundationBlockId}"].getDefaultState(), 2);
                    }
                    
                    if (belowState.func_177230_c() === ModAPI.blocks.air) { // getBlock()
                        world.func_180501_a(belowFoundation, ModAPI.blocks["${foundationBlockId}"].getDefaultState(), 2);
                    }
                }
            }
            
            // Place structure blocks using the palette directly
            for (let y = 0; y < structureData.size.y; y++) {
                for (let z = 0; z < structureData.size.z; z++) {
                    for (let x = 0; x < structureData.size.x; x++) {
                        const blockIndex = y * (structureData.size.x * structureData.size.z) + z * structureData.size.x + x;
                        const paletteIndex = structureData.blocks[blockIndex] || 0;
                        
                        // Get block directly from palette
                        const blockName = structureData.palette[paletteIndex] || 'stone';
                        
                        const blockPos = BlockPos(startX + x, startY + y, startZ + z);
                        
                        // Place the block from structure palette
                        if (ModAPI.blocks[blockName]) {
                            const blockState = ModAPI.blocks[blockName].getDefaultState();
                            world.func_180501_a(blockPos, blockState, 2); // setBlockState
                        } else {
                            // Fallback to stone if block doesn't exist
                            const blockState = ModAPI.blocks.stone.getDefaultState();
                            world.func_180501_a(blockPos, blockState, 2);
                        }
                    }
                }
            }
            
            return true;
        }
        
        // Hook into BiomeDecorator
        const BiomeDecorator_decorate = ModAPI.util.getMethodFromPackage("net.minecraft.world.biome.BiomeDecorator", "decorate");
        const oldDecorate = ModAPI.hooks.methods[BiomeDecorator_decorate];
        
        ModAPI.hooks.methods[BiomeDecorator_decorate] = function ($this, $world, $random, $biomeGenBase, $blockpos) {
            // Check dimension
            const dimensionId = $world.field_73011_w.field_76574_g; // world.provider.dimensionId
            if (dimensionId === ${this.tags.dimensionId}) {
                if ($random.nextInt(100) < ${this.tags.spawnChance}) {
                    // Find suitable spawn location
                    const chunkX = $blockpos.func_177958_n(); // getX()
                    const chunkZ = $blockpos.func_177952_p(); // getZ()
                    
                    const spawnX = chunkX + $random.nextInt(16 - (structureData ? structureData.size.x : 7));
                    const spawnZ = chunkZ + $random.nextInt(16 - (structureData ? structureData.size.z : 7));
                    
                    // Find spawn surface - look for the specified block type
                    let spawnY = -1;
                    for (let y = 100; y >= 1; y--) {
                        const checkPos = BlockPos(spawnX, y, spawnZ);
                        const blockState = $world.func_180495_p(checkPos); // getBlockState
                        const block = blockState.func_177230_c(); // getBlock()
                        
                        if (block === ModAPI.blocks["${spawnOnBlockId}"]) {
                            const airPos = BlockPos(spawnX, y + 1, spawnZ);
                            const airState = $world.func_180495_p(airPos); // getBlockState
                            if (airState.func_177230_c() === ModAPI.blocks.air) {
                                spawnY = y + 1;
                                break;
                            }
                        }
                    }
                    
                    if (spawnY > 0) {
                        const structurePos = BlockPos(spawnX, spawnY, spawnZ);
                        generateLitematicaStructure($world, $random, structurePos);
                    }
                }
            }
            
            return oldDecorate.apply(this, [$this, $world, $random, $biomeGenBase, $blockpos]);
        };
    });
})();`;
    }
}
