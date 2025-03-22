const world_explosion = {
    init: function () {
        this.appendValueInput('WORLD')
            .appendField('Spawn explosion in world:');
        this.appendValueInput('POS')
            .appendField('BlockPos:');
        this.appendValueInput('STRENGTH')
            .setCheck('Number')
            .appendField('Strength:');
        this.appendValueInput('FIRE')
            .setCheck('Boolean')
            .appendField('Fire:');
        this.appendValueInput('SMOKE')
            .setCheck('Boolean')
            .appendField('Break Blocks:');
        this.setInputsInline(false)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(195);
    }
};
Blockly.common.defineBlocks({ world_explosion: world_explosion });
javascript.javascriptGenerator.forBlock['world_explosion'] = function () {
    const value_world = javascript.javascriptGenerator.valueToCode(this, 'WORLD', javascript.Order.ATOMIC);
    const value_pos = javascript.javascriptGenerator.valueToCode(this, 'POS', javascript.Order.ATOMIC);
    const value_strength = javascript.javascriptGenerator.valueToCode(this, 'STRENGTH', javascript.Order.ATOMIC);
    const value_fire = javascript.javascriptGenerator.valueToCode(this, 'FIRE', javascript.Order.ATOMIC);
    const value_smoke = javascript.javascriptGenerator.valueToCode(this, 'SMOKE', javascript.Order.ATOMIC);
    const code = `${value_world}.$newExplosion(null, ${value_pos}.$x, ${value_pos}.$y, ${value_pos}.$z, ${value_strength}, (${value_fire} ? 1 : 0), (${value_smoke} ? 1 : 0));`;
    return code;
}



const world_command = {
    init: function () {
        this.appendValueInput('WORLD')
            .appendField('Execute command in world');
        this.appendValueInput('POS')
            .appendField('BlockPos:');
        this.appendValueInput('CMD')
            .setCheck('String')
            .appendField('Command:');
        this.appendValueInput('FEEDBACK')
            .setCheck('Boolean')
            .appendField('Feedback:');
        this.setInputsInline(false)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('NOTICE: @selectors (probably) do NOT work');
        this.setHelpUrl('https://legacy.mcstacker.net/mcstacker1.10.php');
        this.setColour(195);
    },
    libs: ["execute_command"]
};
Blockly.common.defineBlocks({ world_command: world_command });
javascript.javascriptGenerator.forBlock['world_command'] = function () {
    const value_world = javascript.javascriptGenerator.valueToCode(this, 'WORLD', javascript.Order.ATOMIC);
    const value_pos = javascript.javascriptGenerator.valueToCode(this, 'POS', javascript.Order.ATOMIC);
    const value_cmd = javascript.javascriptGenerator.valueToCode(this, 'CMD', javascript.Order.ATOMIC);
    const value_feedback = javascript.javascriptGenerator.valueToCode(this, 'FEEDBACK', javascript.Order.ATOMIC);
    const code = `efb2__executeCommand(${value_world}, ${value_pos}, ${value_cmd}, ${value_feedback});`;
    return code;
}



const world_is_not_remote = {
    init: function () {
        this.appendValueInput('WORLD')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('world is on the server');
        this.setInputsInline(true)
        this.setOutput(true, 'Boolean');
        this.setTooltip('Check if the world is running on the server.');
        this.setHelpUrl('');
        this.setColour(195);
    }
};
Blockly.common.defineBlocks({ world_is_not_remote: world_is_not_remote });

javascript.javascriptGenerator.forBlock['world_is_not_remote'] = function () {
    const value_world = javascript.javascriptGenerator.valueToCode(this, 'WORLD', javascript.Order.ATOMIC);
    const code = `!(${value_world}).$isRemote`;
    return [code, javascript.Order.NONE];
}



const world_get_loaded_entities = {
    init: function () {
        this.appendValueInput('WORLD')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get list of entities in world');
        this.setInputsInline(true)
        this.setOutput(true, 'Array');
        this.setTooltip('Returns an array of entities in the world');
        this.setHelpUrl('');
        this.setColour(195);
    }
};
Blockly.common.defineBlocks({ world_get_loaded_entities: world_get_loaded_entities });

javascript.javascriptGenerator.forBlock['world_get_loaded_entities'] = function () {
    const value_world = javascript.javascriptGenerator.valueToCode(this, 'WORLD', javascript.Order.ATOMIC);
    const code = `(${value_world}).$loadedEntityList.$toArray1().data`;
    return [code, javascript.Order.NONE];
}



const world_get_player_entities = {
    init: function () {
        this.appendValueInput('WORLD')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get list of players in world');
        this.setInputsInline(true)
        this.setOutput(true, 'Array');
        this.setTooltip('Returns an array of player entities in the world');
        this.setHelpUrl('');
        this.setColour(195);
    }
};
Blockly.common.defineBlocks({ world_get_player_entities: world_get_player_entities });
javascript.javascriptGenerator.forBlock['world_get_player_entities'] = function () {
    const value_world = javascript.javascriptGenerator.valueToCode(this, 'WORLD', javascript.Order.ATOMIC);
    const code = `(${value_world}).$playerEntities.$toArray1().data`;
    return [code, javascript.Order.NONE];
}



const world_execute_command_as_entity = {
    libs: ["execute_command_as"],
    init: function () {
        this.appendValueInput('MESSAGE')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('String')
            .appendField('execute command');
        this.appendValueInput('SENDER')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('as')
            .appendField(new Blockly.FieldDropdown([
                ['command sender', 'command_sender'],
                ['entity', 'entity']
            ]), 'TYPE');
        this.appendValueInput('FEEDBACK')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('Boolean')
            .appendField('feedback');
        this.setInputsInline(false)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Executes a command as a command sender or entity.');
        this.setHelpUrl('https://legacy.mcstacker.net/mcstacker1.10.php');
        this.setColour(195);
    }
};
Blockly.common.defineBlocks({ world_execute_command_as_entity: world_execute_command_as_entity });
javascript.javascriptGenerator.forBlock['world_execute_command_as_entity'] = function () {
    const value_message = javascript.javascriptGenerator.valueToCode(this, 'MESSAGE', javascript.Order.ATOMIC);
    const value_sender = javascript.javascriptGenerator.valueToCode(this, 'SENDER', javascript.Order.ATOMIC);
    const value_feedback = javascript.javascriptGenerator.valueToCode(this, 'FEEDBACK', javascript.Order.ATOMIC);
    const code = `efb2__executeCommandAs(${value_sender}, ${value_message}, ${value_feedback});`;
    return code;
}


const world_get_player_by_name = {
    init: function () {
        this.appendValueInput('NAME')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get player by name')
            .setCheck('String');
        this.appendValueInput('WORLD')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('in world');
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip('Gets a player by his name. Can be null.');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/player/EntityPlayer.html');
        this.setColour(195);
    }
};
Blockly.common.defineBlocks({ world_get_player_by_name: world_get_player_by_name });

javascript.javascriptGenerator.forBlock['world_get_player_by_name'] = function () {
    const value_name = javascript.javascriptGenerator.valueToCode(this, 'NAME', javascript.Order.ATOMIC);
    const world = javascript.javascriptGenerator.valueToCode(this, 'WORLD', javascript.Order.ATOMIC);
    const code = `(${world}).$playerEntities.$array1.data.find((player) => player && player.$getName() && ModAPI.util.ustr(player.$getName()) === ${value_name})`;
    return [code, javascript.Order.NONE];
}
