const proc_return = {
    init: function () {
        this.appendDummyInput('NAME')
            .appendField('return');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(false, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(195);
    }
};
Blockly.common.defineBlocks({ proc_return: proc_return });
javascript.javascriptGenerator.forBlock['proc_return'] = function () {
    return 'return;';
}


const proc_returnvalue = {
    init: function () {
        this.appendValueInput('VALUE')
            .appendField('return value');
        this.setInputsInline(false)
        this.setPreviousStatement(true, null);
        this.setNextStatement(false, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(195);
    }
};
Blockly.common.defineBlocks({ proc_returnvalue: proc_returnvalue });



javascript.javascriptGenerator.forBlock['proc_returnvalue'] = function () {
    const value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);
    const code = 'return ' + value + ';';
    return code;
}