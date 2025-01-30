registerHandler("CommandCalled", "command called by other", {
    "ARGS": "argument list",
    "COMMAND_SENDER": "command sender",
}, function () {
    this.setTooltip('Runs when the command is called by a non-player.');
    this.setHelpUrl('');
    this.setColour(0);
});

registerHandler("CommandCalledByPlayer", "command called by player", {
    "ARGS": "argument list",
    "player": "player",
    "COMMAND_SENDER": "command sender",
}, function () {
    this.setTooltip('Runs when the command is called by a player.');
    this.setHelpUrl('');
    this.setColour(0);
});


const command_sendmessage = {
    libs: ["message_command_sender"],
    init: function () {
        this.appendValueInput('MESSAGE')
            .setCheck('String')
            .appendField('send message');
        this.appendValueInput('SENDER')
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