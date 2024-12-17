const entity_set_position = {
    init: function () {
        this.appendValueInput('ENTITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('set position of entity');
        this.appendValueInput('POS')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('to Vec3');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Sets the position of the entity to a vector, and sends a packet.');
        this.setHelpUrl('');
        this.setColour(195);
    }
};
Blockly.common.defineBlocks({ entity_set_position: entity_set_position });

javascript.javascriptGenerator.forBlock['entity_set_position'] = function () {
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const value_pos = javascript.javascriptGenerator.valueToCode(this, 'POS', javascript.Order.ATOMIC);
    const code = `(${value_entity}).$setPositionAndUpdate((${value_pos}).$xCoord,(${value_pos}).$yCoord,(${value_pos}).$zCoord)`;
    return code;
}