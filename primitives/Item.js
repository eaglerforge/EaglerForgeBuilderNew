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
    },
    getDependencies: function () {
        return [];
    },
    asJavaScript: function () {
        var constructorHandler = getHandlerCode("ItemConstructor", this.tags.Constructor, []);
        var rightClickHandler = getHandlerCode("ItemRightClick", this.tags.RightClick, ["$$itemstack", "$$world", "$$player"]);
        var usedHandler = getHandlerCode("ItemUsed", this.tags.Used, ["$$itemstack", "$$world", "$$player"]);
        var tickedHandler = getHandlerCode("ItemTicked", this.tags.Tick, ["$$itemstack", "$$world", "$$player", "$$hotbar_slot", "$$is_held"]);
        var blockUseHandler = getHandlerCode("ItemBlockUse", this.tags.UsedOnBlock, ["$$itemstack", "$$player", "$$world", "$$blockpos"]);
        var craftedHandler = getHandlerCode("ItemCrafted", this.tags.Crafted, ["$$itemstack", "$$world", "$$player"]);
        var blockBrokenHandler = getHandlerCode("ItemBlockBroken", this.tags.BlockBroken, ["$$itemstack", "$$world", "$$block", "$$blockpos", "$$entity"]);
        return `(function ItemDatablock() {
    const $$itemTexture = "${this.tags.texture}";

    function $$ServersideItem() {
        var $$itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var $$itemSuper = ModAPI.reflect.getSuper($$itemClass, (x) => x.length === 1);
        var $$itemUseAnimation = ModAPI.reflect.getClassById("net.minecraft.item.EnumAction").staticVariables["${this.tags.itemUseAnimation}"];
        function $$CustomItem() {
            $$itemSuper(this);
            ${constructorHandler.code};
        }
        ModAPI.reflect.prototypeStack($$itemClass, $$CustomItem);
        $$CustomItem.prototype.$onItemRightClick = function (${rightClickHandler.args.join(", ")}) {
            ${this.tags.useItemOnRightClick ?
                `(${rightClickHandler.args[2]}).$setItemInUse(${rightClickHandler.args[0]},${this.tags.useDurationTicks});`
                : ""}
            ${rightClickHandler.code};
            return (${rightClickHandler.args[0]});
        }
        $$CustomItem.prototype.$getMaxItemUseDuration = function () {
            return ${this.tags.useDurationTicks};
        }
        $$CustomItem.prototype.$getItemUseAction = function () {
            return $$itemUseAnimation;
        }
        $$CustomItem.prototype.$onItemUseFinish = function (${usedHandler.args.join(", ")}) {
            ${usedHandler.code};
            return (${usedHandler.args[0]});
        }
        $$CustomItem.prototype.$onUpdate = function (${tickedHandler.args.join(", ")}) {
            ${tickedHandler.args[4]} = (${tickedHandler.args[4]}) ? true : false;
            ${tickedHandler.code};
            return (${tickedHandler.args[0]});
        }
        $$CustomItem.prototype.$onItemUse0 = function (${blockUseHandler.args.join(", ")}) {
            ${blockUseHandler.code};
            return 0;
        }
        $$CustomItem.prototype.$onCreated = function (${craftedHandler.args.join(", ")}) {
            ${craftedHandler.code};
        }
        $$CustomItem.prototype.$onBlockDestroyed = function (${blockBrokenHandler.args.join(", ")}) {
            ${blockBrokenHandler.code};
            return 0;
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
                "display": {
                    "thirdperson": {
                        "rotation": [ -90, 0, 0 ],
                        "translation": [ 0, 1, -3 ],
                        "scale": [ ${this.tags.thirdPersonScale}, ${this.tags.thirdPersonScale}, ${this.tags.thirdPersonScale} ]
                    },
                    "firstperson": {
                        "rotation": [ 0, -135, 25 ],
                        "translation": [ 0, 4, 2 ],
                        "scale": [ ${this.tags.firstPersonScale}, ${this.tags.firstPersonScale}, ${this.tags.firstPersonScale} ]
                    }
                }
            }
        ));
        AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/${this.tags.id}.png", await (await fetch(
            $$itemTexture
        )).arrayBuffer());
    });
})();`;
    }
}