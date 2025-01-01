//TODO: quantityDropped, onBlockDestroyedByExplosion, onBlockActivated
PRIMITIVES["recipe"] = {
    name: "Crafting Recipe",
    uses: ["fixup_block_ids"],
    type: "recipe",
    tags: {
        slot0: VALUE_ENUMS.ABSTRACT_ITEM,
        slot1: VALUE_ENUMS.ABSTRACT_ITEM,
        slot2: VALUE_ENUMS.ABSTRACT_ITEM,
        lf0: VALUE_ENUMS.NEWLINE,
        slot3: VALUE_ENUMS.ABSTRACT_ITEM,
        slot4: VALUE_ENUMS.ABSTRACT_ITEM,
        slot5: VALUE_ENUMS.ABSTRACT_ITEM,
        lf1: VALUE_ENUMS.NEWLINE,
        slot6: VALUE_ENUMS.ABSTRACT_ITEM,
        slot7: VALUE_ENUMS.ABSTRACT_ITEM,
        slot8: VALUE_ENUMS.ABSTRACT_ITEM
    },
    asJavaScript: function () {
        return "";
    }
}