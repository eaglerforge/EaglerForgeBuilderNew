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