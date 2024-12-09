const world_explosion = {
    init: function () {
        this.appendValueInput('WORLD')
            .appendField('Spawn explosion in world:');
        this.appendValueInput('POS')
            .appendField('Position:');
        this.appendValueInput('STRENGTH')
            .setCheck('Number')
            .appendField('Strength:');
        this.appendValueInput('FIRE')
            .setCheck('Boolean')
            .appendField('Fire:');
        this.appendValueInput('SMOKE')
            .setCheck('Boolean')
            .appendField('Particles:');
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
            .appendField('Position:');
        this.appendValueInput('CMD')
            .setCheck('String')
            .appendField('Command:');
        this.setInputsInline(false)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(195);
    },
    libs: ["execute_command"]
};
Blockly.common.defineBlocks({ world_command: world_command });
javascript.javascriptGenerator.forBlock['world_command'] = function () {
    const value_world = javascript.javascriptGenerator.valueToCode(this, 'WORLD', javascript.Order.ATOMIC);
    const value_pos = javascript.javascriptGenerator.valueToCode(this, 'POS', javascript.Order.ATOMIC);
    const value_cmd = javascript.javascriptGenerator.valueToCode(this, 'CMD', javascript.Order.ATOMIC);
    const code = `efb2__executeCommand(${value_world}, ${value_pos}, ${value_cmd});`;
    return code;
}
