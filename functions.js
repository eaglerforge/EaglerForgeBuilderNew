const codeGrabberRegex = /(?<=function \(\) {)[\s\S]+(?=}$)/gm; //regex to get the contents of a stringified function
const FUNCTIONS = {};

FUNCTIONS["fixup_block_ids"] = {
    identifier: "fixup_block_ids",
    //Very important that there is no name and a whitespace before and after the parantheses
    code: function () {
        function EFB2__defineFixupGlobal() {
            globalThis.efb2__fixupBlockIds = function efb2__fixupBlockIds() {
                var blockRegistry = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.block.Block").staticVariables.blockRegistry).getCorrective();
                var BLOCK_STATE_IDS = ModAPI.util.wrap(ModAPI.reflect.getClassById("net.minecraft.block.Block").staticVariables.BLOCK_STATE_IDS).getCorrective();
                blockRegistry.registryObjects.hashTableKToV.forEach(entry => {
                    if (entry) {
                        var block = entry.value;
                        var validStates = block.getBlockState().getValidStates();
                        var stateArray = validStates.array || [validStates.element];
                        stateArray.forEach(iblockstate => {
                            var i = blockRegistry.getIDForObject(block.getRef()) << 4 | block.getMetaFromState(iblockstate.getRef());
                            BLOCK_STATE_IDS.put(iblockstate.getRef(), i);
                        });
                    }
                });
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineFixupGlobal);
        EFB2__defineFixupGlobal();
    },
};
function getFunctionCode(fn) {
    return fn.code.toString().match(codeGrabberRegex)?.[0] 
    || (()=>{console.error("Malformed function: ", fn); return "";})();
}