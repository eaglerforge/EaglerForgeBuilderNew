const handle_BlockConstructor = {
    init: function () {
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
    console.log(block);
    console.log(this);
    const statement = generator.statementToCode(block, 'CODE');
    return statement;
}