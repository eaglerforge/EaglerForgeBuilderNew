const logic_a_or_b = {
    init: function () {
        this.appendValueInput('A')
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('B')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('otherwise');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('Uses the first value if it exists, otherwise uses the second value. (JavaScript ?? operator)');
        this.setHelpUrl('');
        this.setColour(210);
    }
};
Blockly.common.defineBlocks({ logic_a_or_b: logic_a_or_b });
javascript.javascriptGenerator.forBlock['logic_a_or_b'] = function () {
    const value_a = javascript.javascriptGenerator.valueToCode(this, 'A', javascript.Order.ATOMIC);
    const value_b = javascript.javascriptGenerator.valueToCode(this, 'B', javascript.Order.ATOMIC);
    const code = `((${value_a})??(${value_b}))`;
    return [code, javascript.Order.NONE];
}