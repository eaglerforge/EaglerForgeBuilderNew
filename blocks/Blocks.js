const handle_BlockConstructor = {
  init: function() {
    this.appendDummyInput('ID')
      .appendField('Handler ID:')
      .appendField(new Blockly.FieldTextInput('block constructor 1'), 'ID');
    this.appendStatementInput('CODE')
      .setAlign(Blockly.inputs.Align.CENTRE)
      .appendField('Block Constructor Handler');
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ handle_BlockConstructor: handle_BlockConstructor });

javascript.javascriptGenerator.forBlock['handle_BlockConstructor'] = function (block) {
  const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
  return statement;
}


const blocks_blockproperty = {
  init: function() {
    this.appendDummyInput('PROPERTY')
      .appendField('set block')
      .appendField(new Blockly.FieldDropdown([
          ['slipperiness', 'slipperiness'],
          ['light opacity', 'lightOpacity'],
          ['light value', 'lightValue'],
          ['blast resistance', 'blockResistance'],
          ['block hardness', 'blockHardness']
        ]), 'PROPERTY');
    this.appendValueInput('VALUE')
    .setCheck('Number')
      .appendField('to');
    this.setInputsInline(true)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({blocks_blockproperty: blocks_blockproperty});
javascript.javascriptGenerator.forBlock['blocks_blockproperty'] = function() {

  const dropdown_property = this.getFieldValue('PROPERTY');
  const value_value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);

  // TODO: Assemble javascript into the code variable.
  const code = `this[$${dropdown_property}] = ${value_value};`;
  return code;
}