const local_this = {
    init: function () {
        this.appendDummyInput('NAME')
            .appendField('this');
        this.setInputsInline(false)
        this.setOutput(true, null);
        this.setTooltip('The object the handler is running on.');
        this.setHelpUrl('');
        this.setColour(330);
    }
};
Blockly.common.defineBlocks({ local_this: local_this });
javascript.javascriptGenerator.forBlock['local_this'] = function () {
    return 'this';
}

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


const proc_returnbool = {
    init: function () {
        this.appendValueInput('VALUE').setCheck('Boolean')
            .appendField('return boolean');
        this.setInputsInline(false)
        this.setPreviousStatement(true, null);
        this.setNextStatement(false, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(195);
    }
};
Blockly.common.defineBlocks({ proc_returnbool: proc_returnbool });

javascript.javascriptGenerator.forBlock['proc_returnbool'] = function () {
    const value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);
    const code = `return (${value}) ? 1 : 0;`;
    return code;
}
