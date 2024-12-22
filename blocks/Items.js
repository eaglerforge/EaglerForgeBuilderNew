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
        this.setHelpUrl('');
        this.setColour(225);
    }
};
Blockly.common.defineBlocks({ items_creativetab: items_creativetab });
javascript.javascriptGenerator.forBlock['items_creativetab'] = function () {
    const dropdown_tab = this.getFieldValue('TAB');
    const code = `this.$setCreativeTab(ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.${dropdown_tab});`;
    return code;
}



const items_setrarity = {
    init: function () {
        this.appendValueInput('SIZE')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('Number')
            .appendField('set max stack size to');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Sets an items max stack size.');
        this.setHelpUrl('');
        this.setColour(225);
    }
};
Blockly.common.defineBlocks({ items_setrarity: items_setrarity });
javascript.javascriptGenerator.forBlock['items_setrarity'] = function () {
    const value_size = generator.valueToCode(block, 'SIZE', javascript.Order.ATOMIC);
    const code = `this.$maxStackSize = (${value_size});`;
    return code;
}


const handle_ItemConstructor = {
    init: function () {
        this.appendDummyInput('ID')
            .appendField('Handler ID:')
            .appendField(new Blockly.FieldTextInput('item constructor 1'), 'ID');
        this.appendDummyInput('')
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField('Item Constructor Handler');
        this.appendStatementInput('CODE');
        this.setTooltip('Runs when the item type is initialised.\nNo return value expected.');
        this.setHelpUrl('');
        this.setColour(225);
    }
};
Blockly.common.defineBlocks({ handle_ItemConstructor: handle_ItemConstructor });

javascript.javascriptGenerator.forBlock['handle_ItemConstructor'] = function () {
    const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
    return { code: statement, args: [] };
}



const handle_ItemRightClick = {
    init: function () {
        this.appendDummyInput('ID')
            .appendField('Handler ID:')
            .appendField(new Blockly.FieldTextInput('item right click 1'), 'ID');
        this.appendDummyInput('')
            .appendField('Item Right Click Handler with:')
            .appendField(new Blockly.FieldEFB2Variable('itemstack'), 'ITEM_STACK')
            .appendField(new Blockly.FieldEFB2Variable('world'), 'WORLD')
            .appendField(new Blockly.FieldEFB2Variable('player'), 'PLAYER');
        this.appendStatementInput('CODE');
        this.setInputsInline(false)
        this.setTooltip('Runs when the item is right-clicked.\nNo return value expected.');
        this.setHelpUrl('');
        this.setColour(225);
    }
};
Blockly.common.defineBlocks({ handle_ItemRightClick: handle_ItemRightClick });

javascript.javascriptGenerator.forBlock['handle_ItemRightClick'] = function () {
    const variable_itemstack = javascript.javascriptGenerator.getVariableName(this.getFieldValue('ITEM_STACK'));
    const variable_world = javascript.javascriptGenerator.getVariableName(this.getFieldValue('WORLD'));
    const variable_blockpos = javascript.javascriptGenerator.getVariableName(this.getFieldValue('BLOCKPOS'));
    const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
    return { code: statement, args: [variable_itemstack, variable_world, variable_blockpos] };
}