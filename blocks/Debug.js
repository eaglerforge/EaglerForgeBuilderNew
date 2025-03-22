const debug_log = {
    init: function () {
        this.appendValueInput('NAME')
            .appendField('log to console');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Logs the string/object provided to the console. ');
        this.setHelpUrl('');
        this.setColour(270);
    },
    libs: ["java_logger"]
};
Blockly.common.defineBlocks({ debug_log: debug_log });
javascript.javascriptGenerator.forBlock['debug_log'] = function () {
    const log = javascript.javascriptGenerator.valueToCode(this, 'NAME', javascript.Order.ATOMIC);
    const code = `efb2__jlog(${log});`;
    return code;
}

const debug_warn = {
    init: function () {
        this.appendValueInput('NAME')
            .appendField('warn to console');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Logs the string/object provided to the console as a warning. ');
        this.setHelpUrl('');
        this.setColour(270);
    },
    libs: ["java_logger"]
};
Blockly.common.defineBlocks({ debug_warn: debug_warn });
javascript.javascriptGenerator.forBlock['debug_warn'] = function () {
    const log = javascript.javascriptGenerator.valueToCode(this, 'NAME', javascript.Order.ATOMIC);
    const code = `efb2__jwarn(${log});`;
    return code;
}

const debug_err = {
    init: function () {
        this.appendValueInput('NAME')
            .appendField('error to console');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Logs the string/object provided to the console as an error. ');
        this.setHelpUrl('');
        this.setColour(270);
    },
    libs: ["java_logger"]
};
Blockly.common.defineBlocks({ debug_err: debug_err });
javascript.javascriptGenerator.forBlock['debug_err'] = function () {
    const log = javascript.javascriptGenerator.valueToCode(this, 'NAME', javascript.Order.ATOMIC);
    const code = `efb2__jerr(${log});`;
    return code;
}

const debug_debugger = {
    init: function () {
        this.appendDummyInput('NAME')
            .appendField('debugger');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('If devtools is open, pauses code execution at this position.');
        this.setHelpUrl('');
        this.setColour(270);
    }
};
Blockly.common.defineBlocks({ debug_debugger: debug_debugger });
javascript.javascriptGenerator.forBlock['debug_debugger'] = function () {
    const code = `debugger;`;
    return code;
}