(function EagerForgeChest() {
    PRIMITIVES["chest"] = {
        name: "Chest",
        uses: [],
        type: "UI",
        tags: {
            slot0: VALUE_ENUMS.ABSTRACT_ITEM,
            slot1: VALUE_ENUMS.ABSTRACT_ITEM,
            slot2: VALUE_ENUMS.ABSTRACT_ITEM,
            slot3: VALUE_ENUMS.ABSTRACT_ITEM,
            slot4: VALUE_ENUMS.ABSTRACT_ITEM,
            slot5: VALUE_ENUMS.ABSTRACT_ITEM,
            slot6: VALUE_ENUMS.ABSTRACT_ITEM,
            slot7: VALUE_ENUMS.ABSTRACT_ITEM,
            slot8: VALUE_ENUMS.ABSTRACT_ITEM,
            lf0: VALUE_ENUMS.NEWLINE,
            slot9: VALUE_ENUMS.ABSTRACT_ITEM,
            slot10: VALUE_ENUMS.ABSTRACT_ITEM,
            slot11: VALUE_ENUMS.ABSTRACT_ITEM,
            slot12: VALUE_ENUMS.ABSTRACT_ITEM,
            slot13: VALUE_ENUMS.ABSTRACT_ITEM,
            slot14: VALUE_ENUMS.ABSTRACT_ITEM,
            slot15: VALUE_ENUMS.ABSTRACT_ITEM,
            slot16: VALUE_ENUMS.ABSTRACT_ITEM,
            slot17: VALUE_ENUMS.ABSTRACT_ITEM,
            lf1: VALUE_ENUMS.NEWLINE,
            slot18: VALUE_ENUMS.ABSTRACT_ITEM,
            slot19: VALUE_ENUMS.ABSTRACT_ITEM,
            slot20: VALUE_ENUMS.ABSTRACT_ITEM,
            slot21: VALUE_ENUMS.ABSTRACT_ITEM,
            slot22: VALUE_ENUMS.ABSTRACT_ITEM,
            slot23: VALUE_ENUMS.ABSTRACT_ITEM,
            slot24: VALUE_ENUMS.ABSTRACT_ITEM,
            slot25: VALUE_ENUMS.ABSTRACT_ITEM,
            slot26: VALUE_ENUMS.ABSTRACT_ITEM,
            slot27: VALUE_ENUMS.ABSTRACT_ITEM,
        },
        asJavaScript: function () {
            Object.keys(this.tags).forEach(k => {
                this.tags[k] = (this.tags[k] === VALUE_ENUMS.ABSTRACT_ITEM) ? "item/air" : this.tags[k];
            });

            return `(function ChestGUI() {
                ModAPI.addEventListener("bootstrap", function() {
                    var ChestGUI = ModAPI.reflect.getClassById("net.minecraft.inventory.ContainerChest").constructors[0];
                    var chest = ChestGUI(ModAPI.util.str("Chest"), 27);
                    ModAPI.items["custom_chest"] = chest;
                });
            })();`;
        }
    };
})();
