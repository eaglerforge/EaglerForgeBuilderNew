const attributes_set = {
    libs: ["attribute_map_set"],
    init: function () {
        this.appendValueInput('MAP')
            .appendField('set attribute map');
        this.appendDummyInput('KEY')
            .appendField('value')
            .appendField(new Blockly.FieldDropdown([
                ['max health', "generic.maxHealth"],
                ['knockback resistance', "generic.knockbackResistance"],
                ['movement speed', "generic.movementSpeed"],
                ['attack damage', "generic.attackDamage"]
            ]), 'KEY');
        this.appendValueInput('VALUE')
            .setCheck('Number')
            .appendField('to');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Set an attribute\'s value on the specified map.');
        this.setHelpUrl('');
        this.setColour(225);
    }
};
Blockly.common.defineBlocks({ attributes_set: attributes_set });


javascript.javascriptGenerator.forBlock['attributes_set'] = function () {
    const value_map = javascript.javascriptGenerator.valueToCode(this, 'MAP', javascript.Order.ATOMIC);
    const dropdown_key = this.getFieldValue('KEY');
    const value_value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);
    const code = `efb2__attrMapSet(${value_map}, "${dropdown_key}", ${value_value});`;
    return code;
}