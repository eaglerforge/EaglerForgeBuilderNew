const items_creativetab = {
    init: function () {
        this.appendDummyInput('TAB')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('Set item creative tab to')
            .appendField(new Blockly.FieldDropdown([
                ["tabBlock", "tabBlock"],
                ["tabDecorations", "tabDecorations"],
                ["tabRedstone", "tabRedstone"],
                ["tabTransport", "tabTransport"],
                ["tabMisc", "tabMisc"],
                ["tabAllSearch", "tabAllSearch"],
                ["tabFood", "tabFood"],
                ["tabTools", "tabTools"],
                ["tabCombat", "tabCombat"],
                ["tabBrewing", "tabBrewing"],
                ["tabMaterials", "tabMaterials"],
                ["tabInventory", "tabInventory"]
            ]), 'TAB');
        this.setInputsInline(false)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Set the creative tab of the item');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/item/Item.html');
        this.setColour(225);
    }
};
Blockly.common.defineBlocks({ items_creativetab: items_creativetab });
javascript.javascriptGenerator.forBlock['items_creativetab'] = function () {
    let dropdown_tab = this.getFieldValue('TAB');
    if (flags.target === "1_12") {
        dropdown_tab = dropdown_tab.replace("tab", "").toUpperCase();
    }
    const code = `this.$setCreativeTab(ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.${dropdown_tab});`;
    return code;
}

const items_item = {
    init: function () {
        this.appendDummyInput('ITEM')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('item')
            .appendField(new Blockly.FieldMinecraftItemInput(false, true), 'ITEM');
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setTooltip('Returns an Item instance (for comparisons)');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/item/Item.html');
        this.setColour(225);
    }
};
Blockly.common.defineBlocks({ items_item: items_item });
javascript.javascriptGenerator.forBlock['items_item'] = function () {
    const item_primitive = this.getFieldValue('ITEM');
    const object = {
        type: item_primitive.split("/")[0],
        id: item_primitive.split("/")[1].split("@")[0]
    }
    if (object.type === "item") {
        return [`(ModAPI.items["${object.id}"]?.getRef() || null)`, javascript.Order.NONE]
    } else {
        return [`ModAPI.util.getItemFromBlock(ModAPI.blocks["${object.id}"]?.getRef() || null)`, javascript.Order.NONE]
    }
}



const items_setmaxstacksize = {
    init: function () {
        this.appendValueInput('SIZE')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('Number')
            .appendField('set max stack size to');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Sets an items max stack size.');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/item/Item.html');
        this.setColour(225);
    }
};
Blockly.common.defineBlocks({ items_setmaxstacksize: items_setmaxstacksize });
javascript.javascriptGenerator.forBlock['items_setmaxstacksize'] = function () {
    const value_size = javascript.javascriptGenerator.valueToCode(this, 'SIZE', javascript.Order.ATOMIC);
    const code = `this.$maxStackSize = (${value_size});`;
    return code;
}


registerHandler("ItemConstructor", "item constructor", {}, function () {
    this.setTooltip('Runs when the item type is initialised.\nNo return value expected.');
    this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/item/Item.html');
    this.setColour(225);
});


registerHandler("ItemRightClick", "item right click", {
    "ITEM_STACK": "itemstack",
    "WORLD": "world",
    "PLAYER": "player"
}, function () {
    this.setTooltip('1.8: Runs when the item is right-clicked.\nThe itemstack argument is expected as a return value.\n\n1.12: Expects ActionResult containing the ItemStack. If \'SUCCESS\' is the mode selected, the stack size is automatically decreased. If no return value, UseItemOnRightClick determines wether or not SUCCESS or PASS is the enabled mode.');
    this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/item/Item.html');
    this.setColour(225);
});

registerHandler("ItemUsed", "item used", {
    "ITEM_STACK": "itemstack",
    "WORLD": "world",
    "PLAYER": "player"
}, function () {
    this.setTooltip('Runs when the item is used. Not called when the player stops using the item early.\nThe itemstack argument is expected as a return value.');
    this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/item/Item.html');
    this.setColour(225);
});

registerHandler("ItemTicked", "item ticked", {
    "ITEM_STACK": "itemstack",
    "WORLD": "world",
    "PLAYER": "player",
    "SLOT_INDEX": "slot index",
    "IS_ITEM_HELD": "item held?"
}, function () {
    this.setTooltip('Runs every tick when the item is in a player\'s inventory.\nThe itemstack argument is expected as a return value.\n`slot index` is a number representing inventory location, `is held` is a boolean.');
    this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/item/Item.html');
    this.setColour(225);
});

registerHandler("ItemBlockUse", "item block use", {
    "ITEM_STACK": "itemstack",
    "PLAYER": "player",
    "WORLD": "world",
    "BLOCKPOS": "blockpos",
}, function () {
    this.setTooltip('1.8: Runs when the item is used on a block.\nA boolean is expected as a return value.\n\n1.12: EnumActionResult Expected as return value.');
    this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/item/Item.html');
    this.setColour(225);
});

registerHandler("ItemCrafted", "item crafted", {
    "ITEM_STACK": "itemstack",
    "WORLD": "world",
    "PLAYER": "player",
}, function () {
    this.setTooltip('Runs when the item is crafted or smelted.\nNo return value is expected.');
    this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/item/Item.html');
    this.setColour(225);
});

registerHandler("ItemBlockBroken", "item block broken", {
    "ITEM_STACK": "itemstack",
    "WORLD": "world",
    "BLOCK": "block",
    "BLOCKPOS": "blockpos",
    "ENTITY": "entity",
}, function () {
    this.setTooltip('Runs when a block is broken with this item.\nA boolean is expected as a return value.');
    this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/item/Item.html');
    this.setColour(225);
});

registerHandler("ItemGetAttributes", "item get attributes", { "ATTRIBUTEMAP": "attribute map" }, function () {
    this.setTooltip('Runs when an item\'s attributes are calculated.\nAn AttributeMap is expected as a return value, but is automatically returned.');
    this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/item/Item.html');
    this.setColour(225);
});

registerHandler("ItemGetEfficiency", "item get efficiency vs block", { "ITEMSTACK": "itemstack", "BLOCK": "block" }, function () {
    this.setTooltip('Runs to get the item\'s strength when breaking a block.\nA number is expected as an output. Default response is 1.0');
    this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/item/Item.html');
    this.setColour(225);
});

const items_get_applicable_blocks = {
    init: function () {
        this.appendDummyInput('GROUP')
            .appendField('get applicable blocks of')
            .appendField(new Blockly.FieldDropdown([
                ['ItemAxe', 'ItemAxe'],
                ['ItemPickaxe', 'ItemPickaxe'],
                ['ItemSpade', 'ItemSpade']
            ]), 'GROUP');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('Returns an array of blocks that the item group is effective on.');
        this.setHelpUrl('');
        this.setColour(225);
    }
};
Blockly.common.defineBlocks({ items_get_applicable_blocks: items_get_applicable_blocks });
javascript.javascriptGenerator.forBlock['items_get_applicable_blocks'] = function () {
    const dropdown_group = this.getFieldValue('GROUP');
    const code = `(ModAPI.reflect.getClassByName("${dropdown_group}").staticVariables.EFFECTIVE_ON?.$backingMap?.$elementData?.data?.filter(x => !!x)?.map(x => x.$key) || [])`;
    return [code, javascript.Order.NONE];
}

const items_currentitem = {
    init: function () {
        this.appendDummyInput('ITEM')
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField('current item')
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setTooltip('The current Item that the handler is executing on.');
        this.setHelpUrl('');
        this.setColour(225);
    }
};
Blockly.common.defineBlocks({ items_currentitem: items_currentitem });
javascript.javascriptGenerator.forBlock['items_currentitem'] = function () {
    return [`$$CustomItem`, javascript.Order.NONE];
}