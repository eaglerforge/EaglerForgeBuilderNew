const handle_CraftingRecipeModifyResult = {
    init: function () {
        this.appendDummyInput('ID')
            .appendField('Handler ID:')
            .appendField(new Blockly.FieldTextInput('crafting recipe modify item 1'), 'ID');
        this.appendDummyInput('')
            .appendField('Crafting Recipe Modify Item Handler with:')
            .appendField(new Blockly.FieldEFB2Variable('itemstack'), 'ITEMSTACK')
        this.appendStatementInput('CODE');
        this.setInputsInline(false)
        this.setTooltip('Runs when registering the command to modify the output item. Does not expect a return value.');
        this.setHelpUrl('');
        this.setColour(15);
    }
};
Blockly.common.defineBlocks({ handle_CraftingRecipeModifyResult: handle_CraftingRecipeModifyResult });

javascript.javascriptGenerator.forBlock['handle_CraftingRecipeModifyResult'] = function () {
    const variable_itemstack = javascript.javascriptGenerator.getVariableName(this.getFieldValue('ITEMSTACK'));
    const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
    return { code: statement, args: [variable_itemstack] };
}