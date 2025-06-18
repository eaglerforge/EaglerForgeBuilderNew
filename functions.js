Math.clamp = function clamp(x, min, max) {
    return Math.max(Math.min(x, max), min);
}

const codeGrabberRegex = /(?<=function \(\) {)[\s\S]+(?=}$)/gm; //regex to get the contents of a stringified function
const FUNCTIONS = {};

FUNCTIONS["fixup_block_ids"] = {
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

FUNCTIONS["execute_command"] = {
    //Very important that there is no name and a whitespace before and after the parantheses
    code: function () {
        function EFB2__defineExecCmdGlobal() {
            globalThis.efb2__executeCommand = function efb2__executeCommand($world, $blockpos, commandStr, feedback) {
                if ($world.$isRemote) {
                    return;
                }
                function x() {
                    ModAPI.reflect.getSuper(ModAPI.reflect.getClassByName("CommandBlockLogic"))(this);
                }
                ModAPI.reflect.prototypeStack(ModAPI.reflect.getClassByName("CommandBlockLogic"), x);
                var vector = ModAPI.reflect.getClassByName("Vec3").constructors[0]($blockpos.$x + 0.5, $blockpos.$y + 0.5, $blockpos.$z + 0.5);
                x.prototype.$getEntityWorld = () => { return $world };
                x.prototype.$getCommandSenderEntity = () => { return null };
                x.prototype.$updateCommand = () => { };
                x.prototype.$addChatMessage = (e) => { console.log(e) };
                x.prototype.$func_145757_a = () => { };
                x.prototype.$getPosition = () => { return $blockpos };
                x.prototype.$getPosition0 = () => { return $blockpos };
                x.prototype.$getPositionVector = () => { return vector };
                x.prototype.$func_145751_f = () => { return 0 };
                x.prototype.$sendCommandFeedback = () => { return feedback ? 1 : 0 }
                var cmd = new x();
                cmd.$setCommand(ModAPI.util.str(commandStr));

                const notifyOps0 = ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0;
                const notifyOps = ModAPI.hooks.methods.nmc_CommandBase_notifyOperators;

                if (!feedback) {
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0 = () => { };
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators = () => { };
                }

                try {
                    cmd.$trigger($world);
                } catch (error) {
                    console.error(error);
                }

                if (!feedback) {
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0 = notifyOps0;
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators = notifyOps;
                }
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineExecCmdGlobal);
        EFB2__defineExecCmdGlobal();
    },
};

FUNCTIONS["execute_command_as"] = {
    //Very important that there is no name and a whitespace before and after the parantheses
    code: function () {
        function EFB2__defineExecCmdAsGlobal() {
            var getServer = ModAPI.reflect.getClassById("net.minecraft.server.MinecraftServer").staticMethods.getServer?.method;
            globalThis.efb2__executeCommandAs = function efb2__executeCommandAs($commandsender, command, feedback) {
                var server = getServer ?
                    getServer() : //1.8
                    ModAPI.reflect.getClassById("net.minecraft.server.MinecraftServer").staticVariables.server; //1.12
                if (!server) { return };
                var commandManager = server.$commandManager;

                //lie a bit
                var x = $commandsender.$canCommandSenderUseCommand;
                $commandsender.$canCommandSenderUseCommand = () => 1;

                var y = $commandsender.$sendCommandFeedback;
                $commandsender.$sendCommandFeedback = feedback ? () => 1 : () => 0;

                const notifyOps0 = ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0;
                const notifyOps = ModAPI.hooks.methods.nmc_CommandBase_notifyOperators;
                const addChatMsg = $commandsender.$addChatMessage;

                if (!feedback) {
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0 = () => { };
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators = () => { };
                    $commandsender.$addChatMessage = () => { };
                }

                try {
                    commandManager.$executeCommand($commandsender, ModAPI.util.str(command));
                } catch (error) {
                    console.error(error);
                }

                if (!feedback) {
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators0 = notifyOps0;
                    ModAPI.hooks.methods.nmc_CommandBase_notifyOperators = notifyOps;
                    $commandsender.$addChatMessage = addChatMsg;
                }

                $commandsender.$canCommandSenderUseCommand = x;
                $commandsender.$sendCommandFeedback = y;
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineExecCmdAsGlobal);
        EFB2__defineExecCmdAsGlobal();
    },
};

FUNCTIONS["construct_vec3"] = {
    //Very important that there is no name and a whitespace before and after the parantheses
    code: function () {
        function EFB2__defineMakeVec3() {
            var mkVec3 = ModAPI.reflect.getClassById("net.minecraft.util.Vec3").constructors.find(x => x.length === 3);
            globalThis.efb2__makeVec3 = function efb2__makeVec3(x, y, z) {
                return mkVec3(x, y, z);
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineMakeVec3);
        EFB2__defineMakeVec3();
    },
};

FUNCTIONS["construct_blockpos"] = {
    //Very important that there is no name and a whitespace before and after the parantheses
    code: function () {
        function EFB2__defineMakeBlockPos() {
            var mkBlockPos = ModAPI.reflect.getClassById("net.minecraft.util.BlockPos").constructors.find(x => x.length === 3);
            globalThis.efb2__makeBlockPos = function efb2__makeBlockPos(x, y, z) {
                return mkBlockPos(x, y, z);
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineMakeBlockPos);
        EFB2__defineMakeBlockPos();
    },
};

FUNCTIONS["message_command_sender"] = {
    //Very important that there is no name and a whitespace before and after the parantheses
    code: function () {
        function EFB2__defineMessageCommandSender() {
            var chatComponentText = ModAPI.reflect.getClassById("net.minecraft.util.ChatComponentText").constructors[0];
            globalThis.efb2__messageCommandSender = function efb2__messageCommandSender(cmdSender, str) {
                return cmdSender.$addChatMessage(chatComponentText(ModAPI.util.str(str)));
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineMessageCommandSender);
        EFB2__defineMessageCommandSender();
    },
};

FUNCTIONS["java_logger"] = {
    //Very important that there is no name and a whitespace before and after the parantheses
    code: function () {
        function EFB2__defineJavaLogger() {
            var logger = ModAPI.reflect.getClassByName("LogManager").staticMethods.getLogger0.method();
            globalThis.efb2__jlog = function efb2__jlog(log) {
                if (typeof log === "string") {
                    logger.$info(ModAPI.util.str(log));
                } else {
                    console.log(log);
                }
            }
            globalThis.efb2__jwarn = function efb2__jwarn(log) {
                logger.$warn(ModAPI.util.str(log));
            }
            globalThis.efb2__jerr = function efb2__jerr(log) {
                logger.$error1(ModAPI.util.str(log));
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineJavaLogger);
        EFB2__defineJavaLogger();
    },
};

FUNCTIONS["str2ab"] = {
    //Very important that there is no name and a whitespace before and after the parantheses
    code: function () {
        function EFB2__defineStr2Ab() {
            globalThis.efb2__str2ab = function efb2__str2ab(str) {
                var buf = new ArrayBuffer(str.length);
                var bufView = new Uint8Array(buf);
                for (var i = 0, strLen = str.length; i < strLen; i++) {
                    bufView[i] = str.charCodeAt(i);
                }
                return buf;
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2__defineStr2Ab);
        EFB2__defineStr2Ab();
    },
}

FUNCTIONS["attribute_map_set"] = {
    code: function () {
        function EFB2_defineAttrMapSet() {
            const AttributeModifier = ModAPI.reflect.getClassByName("AttributeModifier").constructors.find(x => x.length === 4);
            const secretUUID = ModAPI.reflect.getClassByName("Item").staticVariables.itemModifierUUID;
            globalThis.efb2__attrMapSet = function efb2__attrMapSet(map, key, value) {
                map.$put(ModAPI.util.str(key), AttributeModifier(secretUUID, ModAPI.util.str("Tool modifier"), value, 0));
            }
        }
        ModAPI.dedicatedServer.appendCode(EFB2_defineAttrMapSet);
        EFB2_defineAttrMapSet();
    }
}

function getFunctionCode(fn) {
    if (!fn) return "";
    return fn.code.toString().match(codeGrabberRegex)?.[0]
        || (() => { console.error("Malformed function: ", fn); return ""; })();
}