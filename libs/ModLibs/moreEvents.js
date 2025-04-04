const MoreEvents = {

    ModAPI.events.newEvent("screenRender"); // Called each time the screen is rendering, both in the game screen and in the interface
    ModAPI.events.newEvent("GUIScreenRender"); // Called each time the screen is rendering, but only in the interface (not in game)
    ModAPI.events.newEvent("inGameScreenRender"); // Called each time the screen is rendering, but only in game (not in the interface)
    ModAPI.events.newEvent("screenChange"); // Called when the screen changes, you can use event.previousScreenName
    // For all these events, you can use event.screen to get the current screen, and event.screenName to get its name.

    ModAPI.events.newEvent("openModManager"); // Called when the mod manager interface is opened
    ModAPI.events.newEvent("refreshModManager"); // Called when the mod manager interface is updated
    ModAPI.events.newEvent("closeModManager"); // Called when the mod manager interface is closed
    // For all these events, you can use event.modList to obtain the loaded mods list with all their metadatas

    ModAPI.events.newEvent("openLANSharing"); // Called when the client starts sharing his world using LAN, use event.code to get the access code, event.URL to get the relay URL, and event.world to get the client-side world
    ModAPI.events.newEvent("closeLANSharing"); // Called when the client stops sharing his world using LAN

    ModAPI.events.newEvent("crash"); // Called when the client crashes, use event.crashReport to get the crash report

    ModAPI.events.newEvent("tick"); // Called each client world tick

    ModAPI.events.newEvent("settingsUpdate"); // Called when the settings are updated and saved

    ModAPI.events.newEvent("playerPosChange"); // Called when the player moves, use event.player to get the player, and event.posX posY posZ to get its position

    ModAPI.events.newEvent("rightClick"); // Called when the right button of the mouse is clicked, only in game
    /* For these two events, you can use :
        event.heldItem to get the item in hand
        event.entity to get the pointed entity, if existing
        event.block to get the pointed block, if not there is not block it's an air block
        event.blockPos to get the pointed block position
    */

    ModAPI.events.newEvent("profileUpdate"); // Called when the profile is updated

    let methodName1 = ModAPI.hooks._classMap.nmcg_GuiScreen.methods.drawScreen.methodName;
    const originalMethod1 = ModAPI.hooks.methods[methodName1];
    ModAPI.hooks.methods[methodName1] = function(...args) {
        let x = originalMethod1.apply(this, args);

        ModAPI.events.callEvent("screenRender", {
            screen: Minecraft.$currentScreen,
            screenName: ModAPI.util.ustr(Minecraft.$currentScreen.$getClass().$getSimpleName()),
        });
        ModAPI.events.callEvent("GUIScreenRender", {
            screen: Minecraft.$currentScreen,
            screenName: ModAPI.util.ustr(Minecraft.$currentScreen.$getClass().$getSimpleName()),
        });

        return x;
    }

    let methodName2 = ModAPI.hooks._classMap.nmcg_GuiIngame.methods.func_181551_a.methodName
    const originalMethod2 = ModAPI.hooks.methods[methodName2];
    ModAPI.hooks.methods[methodName2] = function(...args) {
        let x = originalMethod2.apply(this, args)

        ModAPI.events.callEvent("screenRender", {
            screen: Minecraft.$ingameGUI,
            screenName: 'GuiIngame',
        });

        ModAPI.events.callEvent("inGameScreenRender", {
            screen: Minecraft.$ingameGUI,
            screenName: 'GuiIngame',
        });

        return x;
    }

    let previousScreenName = null;
    ModAPI.addEventListener("screenRender", (event) => {
        if (previousScreenName !== event.screenName) {
            ModAPI.events.callEvent("screenChange", {
                screen: Minecraft.$ingameGUI,
                screenName: event.screenName,
                previousScreenName: previousScreenName,
            });
            previousScreenName = event.screenName;
        }
    })

    const originalMethod3 = modapi_displayModGui;
    let modManagerOpened = false;
    modapi_displayModGui = function(...args) {
        let x = originalMethod3.apply(this, args);
        if (modManagerOpened) { // check if the mod manager was already opened
            ModAPI.events.callEvent("refreshModManager", {
                modList: function() {
                    let modList = [];
                    let modIdList = Object.keys(ModAPI.meta._titleMap);
                    modIdList.forEach(id => {
                        modList.push({
                            "title": ModAPI.meta._titleMap[id],
                            "icon": ModAPI.meta._iconMap[id],
                            "desciption": ModAPI.meta._descriptionMap[id],
                            "developer": ModAPI.meta._developerMap[id],
                            "version": ModAPI.meta._versionMap[id],
                            "metaID": id,
                        });
                    });
                    return modList;
                }
            });
        } else {
            ModAPI.events.callEvent("openModManager", {
                modList: function() {
                    let modList = [];
                    let modIdList = Object.keys(ModAPI.meta._titleMap);
                    modIdList.forEach(id => {
                        modList.push({
                            "title": ModAPI.meta._titleMap[id],
                            "icon": ModAPI.meta._iconMap[id],
                            "desciption": ModAPI.meta._descriptionMap[id],
                            "developer": ModAPI.meta._developerMap[id],
                            "version": ModAPI.meta._versionMap[id],
                            "metaID": id,
                        });
                    });
                    return modList;
                }
            });
        }
        modManagerOpened = true;
        document.getElementsByClassName('_doneButton')[0].addEventListener('click', function() {
            modManagerOpened = false
            ModAPI.events.callEvent("closeModManager", {
                modList: function() {
                    let modList = [];
                    let modIdList = Object.keys(ModAPI.meta._titleMap);
                    modIdList.forEach(id => {
                        modList.push({
                            "title": ModAPI.meta._titleMap[id],
                            "icon": ModAPI.meta._iconMap[id],
                            "desciption": ModAPI.meta._descriptionMap[id],
                            "developer": ModAPI.meta._developerMap[id],
                            "version": ModAPI.meta._versionMap[id],
                            "metaID": id,
                        });
                    });
                    return modList;
                }
            });
        })
        return x;
    }

    let lastLANState = 0;
    const originalMethod4 = ModAPI.hooks.methods.nlevsl_LANServerController_isHostingLAN;
    ModAPI.hooks.methods.nlevsl_LANServerController_isHostingLAN = function(...args) {
        let x = originalMethod4.apply(this, args);
        if (lastLANState !== x) {
            if (x === 0) {
                ModAPI.events.callEvent("openLANSharing", {
                    "code": ModAPI.util.ustr(ModAPI.hooks.methods.nlevsl_LANServerController_getCurrentCode()),
                    "URL": ModAPI.util.ustr(ModAPI.hooks.methods.nlevsl_LANServerController_getCurrentURI()),
                    "world": Minecraft.$theWorld,
                });
            } else {
                ModAPI.events.callEvent("closeLANSharing");
            }
            lastLANState = x;
        }
        return x;
    }

    const originalMethod5 = ModAPI.hooks.methods.nmc_CrashReport_makeCrashReport;
    ModAPI.hooks.methods.nmc_CrashReport_makeCrashReport = function(...args) {
        let x = originalMethod5.apply(this, args);
        ModAPI.events.callEvent("crash", {
            "crashReport": x,
        });
        return x
    }

    const originalMethod6 = ModAPI.hooks.methods.nmcm_WorldClient_tick;
    ModAPI.hooks.methods.nmcm_WorldClient_tick = function(...args) {
        let x = originalMethod6.apply(this, args);
        ModAPI.events.callEvent("tick");
        return x
    }

    const originalMethod7 = ModAPI.hooks.methods.nmce_EntityPlayerSP_onUpdate;
    let lastPlayerPos = [];
    ModAPI.hooks.methods.nmce_EntityPlayerSP_onUpdate = function(...args) {
        let x = originalMethod7.apply(this, args);
        let newPlayerPos = [args[0].$posX, args[0].$posY, args[0].$posZ];
        if (newPlayerPos[0] !== lastPlayerPos[0] || newPlayerPos[1] !== lastPlayerPos[1] || newPlayerPos[2] !== lastPlayerPos[2]) {
            ModAPI.events.callEvent("playerPosChange", {
                "player": args[0],
                "posX": args[1],
                "posY": args[2],
                "posZ": args[3],
            });
            lastPlayerPos = newPlayerPos;
        }
        return x
    }

    const originalMethod8 = ModAPI.hooks.methods.nmc_Minecraft_rightClickMouse;
    ModAPI.hooks.methods.nmc_Minecraft_rightClickMouse = function(...args) {
        let x = originalMethod8.apply(this, args);
        ModAPI.events.callEvent("rightClick", {
            "heldItem": Minecraft.$thePlayer.$getHeldItem(),
            "entity": Minecraft.$objectMouseOver.$entityHit,
            "block": Minecraft.$theWorld.$getBlockState(Minecraft.$objectMouseOver.$getBlockPos()).$block,
            "blockPos": Minecraft.$objectMouseOver.$getBlockPos(),
        });
        return x
    }



    const originalMethod10 = ModAPI.hooks.methods.nlevp_EaglerProfile_save;
    ModAPI.hooks.methods.nlevp_EaglerProfile_save = function(...args) {
        let x = originalMethod10.apply(this, args);
        ModAPI.events.callEvent("profileUpdate", {
            name: ModAPI.util.ustr(ModAPI.hooks._classMap.nlevp_EaglerProfile.staticMethods.getName.method()),
        });
        return x
    }
};

/* Example:

    ModAPI.addEventListener("screenRender", (event) => {
        event.screen.$drawString(Minecraft.$fontRendererObj, ModAPI.util.str('You are on the screen with name: '+event.screenName), 0, 0, 16777215);
    });

*/
