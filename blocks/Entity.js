const ENTITY_NUMERICAL_PROPS = [
    ['x', '$posX'],
    ['y', '$posY'],
    ['z', '$posZ'],
    ['x velocity', '$motionX'],
    ['y velocity', '$motionY'],
    ['z velocity', '$motionZ'],
    ['yaw', '$rotationYaw'],
    ['pitch', '$rotationPitch'],
    ['fallDistance', '$fallDistance'],
    ['stepHeight', '$stepHeight'],
    ['age (ticks)', '$ticksExisted'],
    ['fire time (ticks)', '$fire'],
    ['chunk x', '$chunkCoordX'],
    ['chunk y', '$chunkCoordY'],
    ['chunk z', '$chunkCoordZ'],
    ['dimension', '$dimension'],
    ['collision reduction', "$entityCollisionReduction"]
];
const ENTITY_BOOLEAN_PROPS = [
    ['on ground', '$onGround'],
    ['collided horizontally', '$isCollidedHorizontally'],
    ['collided vertically', '$isCollidedVertically'],
    ['collided', '$isCollided'],
    ['is in web', '$isInWeb'],
    ['is outside border', '$isOutsideBorder'],
    ['is dead', '$isDead'],
    ['no clip', '$noClip'],
    ['in water', '$inWater'],
    ['is immune to fire', '$isImmuneToFire'],
    ['in portal', '$inPortal'],
    ['invulnerable', '$invulnerable']
];


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
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_set_position: entity_set_position });

javascript.javascriptGenerator.forBlock['entity_set_position'] = function () {
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const value_pos = javascript.javascriptGenerator.valueToCode(this, 'POS', javascript.Order.ATOMIC);
    const code = `var $$efb_vec3pos = ${value_pos};(${value_entity}).$setPositionAndUpdate($$efb_vec3pos.$xCoord,$$efb_vec3pos.$yCoord,$$efb_vec3pos.$zCoord)`;
    return code;
}


const entity_set_position_xyz = {
    init: function () {
        this.appendValueInput('ENTITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('set position of entity');
        this.appendValueInput('X')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('to X:');
        this.appendValueInput('Y')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('Y:');
        this.appendValueInput('Z')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('Z:');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Sets the position of the entity to a vector, and sends a packet.');
        this.setHelpUrl('');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_set_position_xyz: entity_set_position_xyz });

javascript.javascriptGenerator.forBlock['entity_set_position_xyz'] = function () {
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const value_X = javascript.javascriptGenerator.valueToCode(this, 'X', javascript.Order.ATOMIC);
    const value_Y = javascript.javascriptGenerator.valueToCode(this, 'Y', javascript.Order.ATOMIC);
    const value_Z = javascript.javascriptGenerator.valueToCode(this, 'Z', javascript.Order.ATOMIC);
    const code = `(${value_entity}).$setPositionAndUpdate(${value_X},${value_Y},${value_Z})`;
    return code;
}





const entity_get_prop = {
    init: function () {
        this.appendDummyInput('PROP')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(ENTITY_NUMERICAL_PROPS), 'PROP');
        this.appendValueInput('ENTITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('of entity');
        this.setInputsInline(true)
        this.setOutput(true, "Number");
        this.setTooltip('Gets a property of the entity. yaw and pitch are in radians, not degrees.');
        this.setHelpUrl('');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_get_prop: entity_get_prop });

javascript.javascriptGenerator.forBlock['entity_get_prop'] = function () {
    const dropdown_prop = this.getFieldValue('PROP');
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const code = `(${value_entity})["${dropdown_prop}"]`;
    return [code, javascript.Order.NONE];
}



const entity_set_prop = {
    init: function () {
        this.appendDummyInput('PROP')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('set')
            .appendField(new Blockly.FieldDropdown(ENTITY_NUMERICAL_PROPS), 'PROP');
        this.appendValueInput('ENTITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('of entity');
        this.appendValueInput('VALUE')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('Number')
            .appendField('to');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Sets a property of the entity. yaw and pitch are in radians, not degrees.');
        this.setHelpUrl('');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_set_prop: entity_set_prop });

javascript.javascriptGenerator.forBlock['entity_set_prop'] = function () {
    const dropdown_prop = this.getFieldValue('PROP');
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const value_value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);
    const code = `(${value_entity})["${dropdown_prop}"] = ${value_value}`;
    return code;
}




const entity_set_switch = {
    init: function () {
        this.appendDummyInput('PROP')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('set boolean')
            .appendField(new Blockly.FieldDropdown(ENTITY_BOOLEAN_PROPS), 'PROP');
        this.appendValueInput('ENTITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('of entity');
        this.appendValueInput('VALUE')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('Boolean')
            .appendField('to');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Sets a boolean property of the entity.');
        this.setHelpUrl('');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_set_switch: entity_set_switch });
javascript.javascriptGenerator.forBlock['entity_set_switch'] = function () {
    const dropdown_prop = this.getFieldValue('PROP');
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const value_value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);
    const code = `(${value_entity})["${dropdown_prop}"] = ((${value_value}) ? 1 : 0)`;
    return code;
}



const entity_get_switch = {
    init: function () {
        this.appendDummyInput('PROP')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(ENTITY_BOOLEAN_PROPS), 'PROP');
        this.appendValueInput('ENTITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('of entity');
        this.setInputsInline(true)
        this.setOutput(true, 'Boolean');
        this.setTooltip('Sets a boolean property of the entity.');
        this.setHelpUrl('');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_get_switch: entity_get_switch });
javascript.javascriptGenerator.forBlock['entity_get_switch'] = function () {
    const dropdown_prop = this.getFieldValue('PROP');
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const code = `((${value_entity})["${dropdown_prop}"] ? true : false)`;
    return [code, javascript.Order.NONE];
}