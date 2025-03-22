registerHandler("CraftingRecipeModifyResult", "crafting recipe modify item", {
    "ITEMSTACK": "itemstack",
}, function () {
    this.setTooltip('Runs when registering the command to modify the output item. Does not expect a return value.');
    this.setHelpUrl('');
    this.setColour(15);
});