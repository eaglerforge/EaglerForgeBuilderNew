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
const proc_wait = {
    init: function () {
        this.appendValueInput('VALUE')
            .appendField('synchronous wait');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Waits set amount of time. Synchronous: (no frames or otehr code can be run while this is waiting)');
        this.setHelpUrl('');
        this.setColour(255);
    }
};
Blockly.common.defineBlocks({ proc_wait: proc_wait });

javascript.javascriptGenerator.forBlock['proc_wait'] = function () {
    const value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);
    const code = `
        var start = Date.now();
        var current = start;
        while (current - start < (${value} * 1000)) {
            current = Date.now();
        };
     `;
    return code;
}
const comment = {
    init: function () {
        this.appendDummyInput('VALUE')
            .appendField('comment ')
            .appendField(new Blockly.FieldTextInput('x'), 'VALUE');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Adds a comment');
        this.setHelpUrl('');
        this.setColour(255);
    }
};
Blockly.common.defineBlocks({ comment: comment });

javascript.javascriptGenerator.forBlock['comment'] = function () {
    const value = this.getFieldValue('VALUE');
    const code = `
       // ${value}
     `;
    return code;
}

const proc_asyncrun = {
    init: function () {
        this.appendValueInput('DELAY')
            .setCheck('Number')
            .appendField('in');
        this.appendDummyInput('NIL')
            .appendField('seconds, run:');
        this.appendStatementInput('CODE');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Asynchronous wait. Runs code in a set amount of time. Other code can still run.');
        this.setHelpUrl('');
        this.setColour(255);
    }
};
Blockly.common.defineBlocks({ proc_asyncrun: proc_asyncrun });

javascript.javascriptGenerator.forBlock['proc_asyncrun'] = function () {
    // TODO: change Order.ATOMIC to the correct operator precedence strength
    const value_delay = javascript.javascriptGenerator.valueToCode(this, 'DELAY', javascript.Order.ATOMIC);

    const statement_code = javascript.javascriptGenerator.statementToCode(this, 'CODE');


    const code = `setTimeout(()=>{
        ModAPI.promisify(()=>{
            ${statement_code};
        })();
    }, ${parseFloat(value_delay) * 1000});`;
    return code;
}

const list_includes = {
    init: function () {
        this.appendValueInput('LIST')
            .setCheck('Array')
            .appendField('list');
        this.appendValueInput('VALUE')
            .appendField('includes');
        this.setInputsInline(true)
        this.setOutput(true, 'Boolean');
        this.setTooltip('Checks if a list contains an item.');
        this.setHelpUrl('');
        this.setColour(255);
    }
};
Blockly.common.defineBlocks({ list_includes: list_includes });

javascript.javascriptGenerator.forBlock['list_includes'] = function () {
    const value_list = javascript.javascriptGenerator.valueToCode(this, 'LIST', javascript.Order.ATOMIC);
    const value_value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);
    const code = `${value_list}.includes(${value_value})`;
    return [code, javascript.Order.NONE];
}

const globals_set = {
    init: function () {
        this.appendDummyInput('VAR')
            .appendField('global ')
            .appendField(new Blockly.FieldTextInput('x'), 'VAR');
        this.appendValueInput('VAL')
            .appendField('=');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Sets a global variable.');
        this.setHelpUrl('');
        this.setColour(150);
    }
};
Blockly.common.defineBlocks({ globals_set: globals_set });
javascript.javascriptGenerator.forBlock['globals_set'] = function () {
    const text_var = this.getFieldValue('VAR');
    const value_val = javascript.javascriptGenerator.valueToCode(this, 'VAL', javascript.Order.ATOMIC);
    const code = `$$scoped_efb_globals["${text_var}"] = ${value_val};`;
    return code;
}

const globals_get = {
    init: function () {
        this.appendDummyInput('VAR')
            .appendField('global ')
            .appendField(new Blockly.FieldTextInput('x'), 'VAR');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('Gets a global variable.');
        this.setHelpUrl('');
        this.setColour(150);
    }
};
Blockly.common.defineBlocks({ globals_get: globals_get });


javascript.javascriptGenerator.forBlock['globals_get'] = function () {
    const text_var = this.getFieldValue('VAR');
    const code = `$$scoped_efb_globals["${text_var}"]`;
    return [code, javascript.Order.NONE];
}

const globals_delete = {
    init: function () {
        this.appendDummyInput('VAR')
            .appendField('delete global')
            .appendField(new Blockly.FieldTextInput('x'), 'VAR');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Deletes a global variable.');
        this.setHelpUrl('');
        this.setColour(150);
    }
};
Blockly.common.defineBlocks({ globals_delete: globals_delete });


javascript.javascriptGenerator.forBlock['globals_delete'] = function () {
    const text_var = this.getFieldValue('VAR');
    const code = `delete $$scoped_efb_globals["${text_var}"];`;
    return code;
}

const globals_exists = {
    init: function () {
        this.appendDummyInput('VAR')
            .appendField('global exists')
            .appendField(new Blockly.FieldTextInput('x'), 'VAR');
        this.setInputsInline(true)
        this.setOutput(true, 'Boolean');
        this.setTooltip('Checks if a global is defined.');
        this.setHelpUrl('');
        this.setColour(150);
    }
};
Blockly.common.defineBlocks({ globals_exists: globals_exists });


javascript.javascriptGenerator.forBlock['globals_exists'] = function () {
    const text_var = this.getFieldValue('VAR');
    const code = `("${text_var}" in $$scoped_efb_globals)`;
    return [code, javascript.Order.NONE];
}
