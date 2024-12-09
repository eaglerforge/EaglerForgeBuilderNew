const BLOCK_LIBMAP = {};
var oldDefineBlocks = Blockly.common.defineBlocks;
Blockly.common.defineBlocks = function (blockMap) {
    var types = Object.keys(blockMap);
    types.forEach(type => {
        BLOCK_LIBMAP[type] = (blockMap[type].libs || []);
    });
    return oldDefineBlocks.apply(this, [blockMap]);
}
function getBlockLibs(block) {
    return BLOCK_LIBMAP[block.type] || [];
}
function getBlockLibsByType(blockType) {
    return BLOCK_LIBMAP[blockType] || [];
}