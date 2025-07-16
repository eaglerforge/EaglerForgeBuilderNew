PRIMITIVES["item"] = {
    name: "Item",
    uses: [],
    type: "item",
    tags: {
        id: "custom_item",
        name: "Custom Item",
        texture: VALUE_ENUMS.IMG,
        firstPersonScale: 1.7,
        thirdPersonScale: 0.55,
        useDurationTicks: 32,
        useItemOnRightClick: true,
        itemUseAnimation: ["NONE", "EAT", "DRINK", "BLOCK", "BOW"],
        Constructor: VALUE_ENUMS.ABSTRACT_HANDLER + "ItemConstructor",
        RightClick: VALUE_ENUMS.ABSTRACT_HANDLER + "ItemRightClick",
        Used: VALUE_ENUMS.ABSTRACT_HANDLER + "ItemUsed",
        Tick: VALUE_ENUMS.ABSTRACT_HANDLER + "ItemTicked",
        UsedOnBlock: VALUE_ENUMS.ABSTRACT_HANDLER + "ItemBlockUse",
        Crafted: VALUE_ENUMS.ABSTRACT_HANDLER + "ItemCrafted",
        BlockBroken: VALUE_ENUMS.ABSTRACT_HANDLER + "ItemBlockBroken",
        GetAttributes: VALUE_ENUMS.ABSTRACT_HANDLER + "ItemGetAttributes",
        GetEfficiency: VALUE_ENUMS.ABSTRACT_HANDLER + "ItemGetEfficiency",
    },
    getDependencies: function () {
        return [];
    },
    asJavaScript: function () {
        const firstPersonScale = this.tags.firstPersonScale / (flags.target === "1_12" ? 1.7 : 1);
        const thirdPersonScale = this.tags.thirdPersonScale / (flags.target === "1_12" ? 0.55 : 1);
        var constructorHandler = getHandlerCode("ItemConstructor", this.tags.Constructor, []);
        var rightClickHandler = getHandlerCode("ItemRightClick", this.tags.RightClick, ["$$itemstack", "$$world", "$$player"], {
            "1_8": function (argNames, code) {
                return `
                $$CustomItem.prototype.$onItemRightClick = function (${argNames.join(", ")}) {
                    ${this.tags.useItemOnRightClick ?
                        `(${argNames[2]}).$setItemInUse(${argNames[0]},${this.tags.useDurationTicks});`
                        : ""}
                    ${code};
                    return (${argNames[0]});
                }
                `
            },
            "1_12": function (argNames, code) {
                return `
                var $$ResultEnum = ModAPI.reflect.getClassByName("EnumActionResult").staticVariables;
                var $$ActionResult = ModAPI.reflect.getClassByName("ActionResult").constructors[0];
                $$CustomItem.prototype.$onItemRightClick = function (${argNames.slice(1, 3).join(", ")},$handEnum,$unused) {
                    var ${argNames[0]} = (${argNames[2]}).$getHeldItem($handEnum);
                    ${this.tags.useItemOnRightClick ?
                        `
                        (${argNames[2]}).$setActiveHand($handEnum);
                        `
                        : ""}
                    ${code};
                    return ($$ActionResult(${this.tags.useItemOnRightClick ? "$$ResultEnum.SUCCESS" : "$$ResultEnum.PASS"}, ${argNames[0]}));
                }
                `
            }
        });
        var blockUseHandler = getHandlerCode("ItemBlockUse", this.tags.UsedOnBlock, ["$$itemstack", "$$player", "$$world", "$$blockpos"], {
            "1_8": function (args, code) {
                return `
                $$CustomItem.prototype.$onItemUse0 = function (${args.join(", ")}) {
                    ${code};
                    return 0;
                }
                `
            },
            "1_12": function (args, code) {
                return `
                var $$ResultEnum = ModAPI.reflect.getClassByName("EnumActionResult").staticVariables;
                $$CustomItem.prototype.$onItemUse = function (${args.join(", ")}) {
                    ${code};
                    return $$ResultEnum.PASS;
                }
                `
            }
        });
        var usedHandler = getHandlerCode("ItemUsed", this.tags.Used, ["$$itemstack", "$$world", "$$player"]);
        var tickedHandler = getHandlerCode("ItemTicked", this.tags.Tick, ["$$itemstack", "$$world", "$$player", "$$hotbar_slot", "$$is_held"]);
        var craftedHandler = getHandlerCode("ItemCrafted", this.tags.Crafted, ["$$itemstack", "$$world", "$$player"]);
        var blockBrokenHandler = getHandlerCode("ItemBlockBroken", this.tags.BlockBroken, ["$$itemstack", "$$world", "$$block", "$$blockpos", "$$entity"]);
        var getAttributes = getHandlerCode("ItemGetAttributes", this.tags.GetAttributes, ["$$attributemap"]);
        var getEfficiency = getHandlerCode("ItemGetEfficiency", this.tags.GetEfficiency, ["$$itemstack", "$$block"]);

        const transforms = flags.target === "1_12"
            ? {
                "thirdperson_righthand": {
                    "rotation": [0, -90, 55],
                    "translation": [0, 4.0, 0.5],
                    "scale": [0.85 * thirdPersonScale, 0.85 * thirdPersonScale, 0.85 * thirdPersonScale]
                },
                "thirdperson_lefthand": {
                    "rotation": [0, 90, -55],
                    "translation": [0, 4.0, 0.5],
                    "scale": [0.85 * thirdPersonScale, 0.85 * thirdPersonScale, 0.85 * thirdPersonScale]
                },
                "firstperson_righthand": {
                    "rotation": [0, -90, 25],
                    "translation": [1.13, 3.2, 1.13],
                    "scale": [0.68 * firstPersonScale, 0.68 * firstPersonScale, 0.68 * firstPersonScale]
                },
                "firstperson_lefthand": {
                    "rotation": [0, 90, -25],
                    "translation": [1.13, 3.2, 1.13],
                    "scale": [0.68 * firstPersonScale, 0.68 * firstPersonScale, 0.68 * firstPersonScale]
                }
            }
            : {
                "thirdperson": {
                    "rotation": [-90, 0, 0],
                    "translation": [0, 1, -3],
                    "scale": [thirdPersonScale, thirdPersonScale, thirdPersonScale]
                },
                "firstperson": {
                    "rotation": [0, -135, 25],
                    "translation": [0, 4, 2],
                    "scale": [firstPersonScale, firstPersonScale, firstPersonScale]
                }
            };

        return `(function ItemDatablock() {
    const $$itemTexture = "${this.tags.texture}";

    function $$ServersideItem() {
        const $$scoped_efb_globals = {};
        var $$itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var $$itemSuper = ModAPI.reflect.getSuper($$itemClass, (x) => x.length === 1);
        var $$itemUseAnimation = ModAPI.reflect.getClassById("net.minecraft.item.EnumAction").staticVariables["${this.tags.itemUseAnimation}"];
        var $$itemGetAttributes = ModAPI.reflect.getClassById("net.minecraft.item.Item").methods.getItemAttributeModifiers.method;
        
        function $$CustomItem() {
            $$itemSuper(this);
            ${constructorHandler.code};
        }
        ModAPI.reflect.prototypeStack($$itemClass, $$CustomItem);
        ${rightClickHandler}
        $$CustomItem.prototype.$getMaxItemUseDuration = function () { //1.12 works
            return ${this.tags.useDurationTicks};
        }
        $$CustomItem.prototype.$getItemUseAction = function () { //1.12 works
            return $$itemUseAnimation;
        }
        $$CustomItem.prototype.$onItemUseFinish = function (${usedHandler.args.join(", ")}) { //1.12 works
            ${usedHandler.code};
            return (${usedHandler.args[0]});
        }
        $$CustomItem.prototype.$onUpdate = function (${tickedHandler.args.join(", ")}) { //1.12 works
            ${tickedHandler.args[4]} = (${tickedHandler.args[4]}) ? true : false;
            ${tickedHandler.code};
            return (${tickedHandler.args[0]});
        }
        
        ${blockUseHandler}

        $$CustomItem.prototype.$onCreated = function (${craftedHandler.args.join(", ")}) { //1.12 works
            ${craftedHandler.code};
        }
        $$CustomItem.prototype.$onBlockDestroyed = function (${blockBrokenHandler.args.join(", ")}) {
            ${blockBrokenHandler.code};
            return 0;
        }
        $$CustomItem.prototype.$getItemAttributeModifiers = function () { //1.12 works i think
            var ${getAttributes.args[0]} = $$itemGetAttributes.apply(this, []);
            ${getAttributes.code};
            return ${getAttributes.args[0]};
        }
        $$CustomItem.prototype.$getStrVsBlock = function (${getEfficiency.args.join(", ")}) {
            ${getEfficiency.code};
            return 1.0;
        }
        function $$internal_reg() {
            var $$custom_item = (new $$CustomItem()).$setUnlocalizedName(
                ModAPI.util.str("${this.tags.id}")
            );
            $$itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("${this.tags.id}"), ModAPI.util.str("${this.tags.id}"), $$custom_item);
            ModAPI.items["${this.tags.id}"] = $$custom_item;
            return $$custom_item;
        }
        if (ModAPI.items) {
            return $$internal_reg();
        } else {
            ModAPI.addEventListener("bootstrap", $$internal_reg);
        }
    }

    ModAPI.dedicatedServer.appendCode($$ServersideItem); 
    var $$custom_item = $$ServersideItem();

    ModAPI.addEventListener("lib:asyncsink", async () => {
        ModAPI.addEventListener("lib:asyncsink:registeritems", ($$renderItem)=>{
            $$renderItem.registerItem($$custom_item, ModAPI.util.str("${this.tags.id}"));
        });
        AsyncSink.L10N.set("item.${this.tags.id}.name", "${this.tags.name}");
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/${this.tags.id}.json", JSON.stringify(
            {
                "parent": "builtin/generated",
                "textures": {
                    "layer0": "items/${this.tags.id}"
                },
                "display": ${JSON.stringify(transforms)}
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/${this.tags.id}.png", await (await fetch(
            $$itemTexture
        )).arrayBuffer());
    });
})();`;
    }
}