const handle_CommandCalled = {
    init: function () {
        this.appendDummyInput('ID')
            .appendField('Handler ID:')
            .appendField(new Blockly.FieldTextInput('command called by other 1'), 'ID');
        this.appendDummyInput('')
            .appendField('Command Called By Other Handler with:')
            .appendField(new Blockly.FieldEFB2Variable('argument list'), 'ARGS')
            .appendField(new Blockly.FieldEFB2Variable('command sender'), 'COMMAND_SENDER')
        this.appendStatementInput('CODE');
        this.setInputsInline(false)
        this.setTooltip('Runs when the command is called by a non-player.');
        this.setHelpUrl('');
        this.setColour(0);
    }
};
Blockly.common.defineBlocks({ handle_CommandCalled: handle_CommandCalled });

javascript.javascriptGenerator.forBlock['handle_CommandCalled'] = function () {
    const variable_args = javascript.javascriptGenerator.getVariableName(this.getFieldValue('ARGS'));
    const variable_cmdsender = javascript.javascriptGenerator.getVariableName(this.getFieldValue('COMMAND_SENDER'));
    const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
    return { code: statement, args: [variable_args, variable_cmdsender] };
}



const handle_CommandCalledByPlayer = {
    init: function () {
        this.appendDummyInput('ID')
            .appendField('Handler ID:')
            .appendField(new Blockly.FieldTextInput('command called by player 1'), 'ID');
        this.appendDummyInput('')
            .appendField('Command Called By Player Handler with:')
            .appendField(new Blockly.FieldEFB2Variable('argument list'), 'ARGS')
            .appendField(new Blockly.FieldEFB2Variable('player'), 'PLAYER')
            .appendField(new Blockly.FieldEFB2Variable('command sender'), 'COMMAND_SENDER')
        this.appendStatementInput('CODE');
        this.setInputsInline(false)
        this.setTooltip('Runs when the command is called by a player.');
        this.setHelpUrl('');
        this.setColour(0);
    }
};
Blockly.common.defineBlocks({ handle_CommandCalledByPlayer: handle_CommandCalledByPlayer });

javascript.javascriptGenerator.forBlock['handle_CommandCalledByPlayer'] = function () {
    const variable_args = javascript.javascriptGenerator.getVariableName(this.getFieldValue('ARGS'));
    const variable_player = javascript.javascriptGenerator.getVariableName(this.getFieldValue('PLAYER'));
    const variable_cmdsender = javascript.javascriptGenerator.getVariableName(this.getFieldValue('COMMAND_SENDER'));
    const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
    return { code: statement, args: [variable_args, variable_player, variable_cmdsender] };
}



const command_sendmessage = {
    libs: ["message_command_sender"],
    init: function () {
        this.appendValueInput('MESSAGE')
            .setCheck('String')
            .appendField('send message');
        this.appendValueInput('SENDER')
            .setCheck('String')
            .appendField('to command sender');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Sends a message to the specified command sender.');
        this.setHelpUrl('');
        this.setColour(0);
    }
};
Blockly.common.defineBlocks({ command_sendmessage: command_sendmessage });

javascript.javascriptGenerator.forBlock['command_sendmessage'] = function () {
    const value_message = javascript.javascriptGenerator.valueToCode(this, 'MESSAGE', javascript.Order.ATOMIC);
    const value_sender = javascript.javascriptGenerator.valueToCode(this, 'SENDER', javascript.Order.ATOMIC);
    const code = `efb2__messageCommandSender(${value_sender}, ${value_message});`;
    return code;
}



const command_get_position = {
    init: function () {
        this.appendValueInput('CMDSENDER')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get position of command sender');
        this.appendDummyInput('AS')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('as')
            .appendField(new Blockly.FieldDropdown([
                ['BlockPos', '$getPosition'],
                ['Vec3', '$getPositionVector']
            ]), 'AS');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('Gets the command sender\'s position object.');
        this.setHelpUrl('');
        this.setColour(0);
    }
};
Blockly.common.defineBlocks({ command_get_position: command_get_position });
javascript.javascriptGenerator.forBlock['command_get_position'] = function () {
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'CMDSENDER', javascript.Order.ATOMIC);
    const dropdown_as = this.getFieldValue('AS');
    const code = `(${value_entity})["${dropdown_as}"]()`;
    return [code, javascript.Order.NONE];
}



const command_get_world = {
    init: function () {
        this.appendValueInput('CMDSENDER')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get world of command sender');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('Gets the command sender\'s world object.');
        this.setHelpUrl('');
        this.setColour(0);
    }
};
Blockly.common.defineBlocks({ command_get_world: command_get_world });

javascript.javascriptGenerator.forBlock['command_get_world'] = function () {
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'CMDSENDER', javascript.Order.ATOMIC);
    const code = `(${value_entity}).$getEntityWorld()`;
    return [code, javascript.Order.NONE];
}




const command_get_entity = {
    init: function () {
        this.appendValueInput('CMDSENDER')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get command sender as entity');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('Gets the command sender as an entity. May be null.');
        this.setHelpUrl('');
        this.setColour(0);
    }
};
Blockly.common.defineBlocks({ command_get_entity: command_get_entity });

javascript.javascriptGenerator.forBlock['command_get_entity'] = function () {
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'CMDSENDER', javascript.Order.ATOMIC);
    const code = `(${value_entity}).$getCommandSenderEntity()`;
    return [code, javascript.Order.NONE];
}




const command_get_name = {
    init: function () {
        this.appendValueInput('CMDSENDER')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get name of command sender');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('Gets the command sender\'s name.');
        this.setHelpUrl('');
        this.setColour(0);
    }
};
Blockly.common.defineBlocks({ command_get_name: command_get_name });

javascript.javascriptGenerator.forBlock['command_get_name'] = function () {
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'CMDSENDER', javascript.Order.ATOMIC);
    const code = `ModAPI.util.ustr((${value_entity}).$getName())`;
    return [code, javascript.Order.NONE];
}