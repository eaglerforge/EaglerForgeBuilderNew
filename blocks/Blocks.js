const handle_BlockConstructor = {
  init: function () {
    this.appendDummyInput('ID')
      .appendField('Handler ID:')
      .appendField(new Blockly.FieldTextInput('block constructor 1'), 'ID');
    this.appendDummyInput('')
      .setAlign(Blockly.inputs.Align.LEFT)
      .appendField('Block Constructor Handler');
    this.appendStatementInput('CODE');
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ handle_BlockConstructor: handle_BlockConstructor });

javascript.javascriptGenerator.forBlock['handle_BlockConstructor'] = function (block) {
  const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
  return {code: statement, args: []};
}


const blocks_blockproperty = {
  init: function () {
    this.appendDummyInput('PROPERTY')
      .appendField('set block')
      .appendField(new Blockly.FieldDropdown([
        ['slipperiness', 'slipperiness'],
        ['light opacity', 'lightOpacity'],
        ['light value', 'lightValue'],
        ['blast resistance', 'blockResistance'],
        ['hardness', 'blockHardness']
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
Blockly.common.defineBlocks({ blocks_blockproperty: blocks_blockproperty });
javascript.javascriptGenerator.forBlock['blocks_blockproperty'] = function () {
  const dropdown_property = this.getFieldValue('PROPERTY');
  const value_value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);
  const code = `this["$${dropdown_property}"] = ${value_value};`;
  return code;
}



const blocks_blockswitch = {
  init: function () {
    this.appendDummyInput('PROPERTY')
      .appendField('set block')
      .appendField(new Blockly.FieldDropdown([
        ['full block', 'fullBlock'],
        ['translucent', 'translucent'],
        ['use neighbor brightness', 'useNeighborBrightness'],
        ['needs random tick', 'blockHardness']
      ]), 'PROPERTY');
    this.appendDummyInput('VALUE')
      .setAlign(Blockly.inputs.Align.CENTRE)
      .appendField('to')
      .appendField(new Blockly.FieldCheckbox('TRUE'), 'VALUE');
    this.setInputsInline(true)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ blocks_blockswitch: blocks_blockswitch });
javascript.javascriptGenerator.forBlock['blocks_blockswitch'] = function () {
  const dropdown_property = this.getFieldValue('PROPERTY');
  const checkbox_value = this.getFieldValue('VALUE') ? 1 : 0;
  const code = `this["$${dropdown_property}"] = ${checkbox_value};`;
  return code;
}


const handle_BlockBreak = {
  init: function () {
    this.appendDummyInput('ID')
      .appendField('Handler ID:')
      .appendField(new Blockly.FieldTextInput('block break 1'), 'ID');
    this.appendDummyInput('')
      .appendField('Block Break Handler with:')
      .appendField(new Blockly.FieldVariable('world'), 'WORLD')
      .appendField(new Blockly.FieldVariable('position'), 'BLOCKPOS');
    this.appendStatementInput('CODE');
    this.setInputsInline(false)
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ handle_BlockBreak: handle_BlockBreak });

javascript.javascriptGenerator.forBlock['handle_BlockBreak'] = function () {
  const variable_world = javascript.javascriptGenerator.getVariableName(this.getFieldValue('WORLD'));
  const variable_blockpos = javascript.javascriptGenerator.getVariableName(this.getFieldValue('BLOCKPOS'));
  const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
  return { code: statement, args: [variable_world, variable_blockpos, "$blockstate"] };
}