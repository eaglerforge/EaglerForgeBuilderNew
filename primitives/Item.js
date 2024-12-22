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
        Constructor: VALUE_ENUMS.ABSTRACT_HANDLER + "ItemConstructor",
        RightClick: VALUE_ENUMS.ABSTRACT_HANDLER + "ItemRightClick",
    },
    asJavaScript: function () {
        var constructorHandler = getHandlerCode("ItemConstructor", this.tags.Constructor, []);
        var rightClickHandler = getHandlerCode("ItemConstructor", this.tags.Constructor, []);
        return `(function ItemDatablock() {
    const $$itemTexture = "${this.tags.texture}";

    function $$ServersideItem() {
        var $$itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
        var $$itemSuper = ModAPI.reflect.getSuper($$itemClass, (x) => x.length === 1);
        function $$CustomItem() {
            $$itemSuper(this);
            ${constructorHandler.code};
        }
        ModAPI.reflect.prototypeStack($$itemClass, $$CustomItem);
        $$CustomItem.prototype.$onItemRightClick = function (${rightClickHandler.args.join(", ")}) {
            ${rightClickHandler.code}
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
        ModAPI.addEventListener("custom:asyncsink_reloaded", ()=>{
            ModAPI.mc.renderItem.registerItem($$custom_item, ModAPI.util.str("${this.tags.id}"));
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