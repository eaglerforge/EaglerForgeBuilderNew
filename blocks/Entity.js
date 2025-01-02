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
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/Entity.html');
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
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/Entity.html');
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
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/Entity.html');
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
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/Entity.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_set_prop: entity_set_prop });

javascript.javascriptGenerator.forBlock['entity_set_prop'] = function () {
    const dropdown_prop = this.getFieldValue('PROP');
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const value_value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);
    const code = `(${value_entity})["${dropdown_prop}"] = ${value_value};`;
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
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/Entity.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_set_switch: entity_set_switch });
javascript.javascriptGenerator.forBlock['entity_set_switch'] = function () {
    const dropdown_prop = this.getFieldValue('PROP');
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const value_value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);
    const code = `(${value_entity})["${dropdown_prop}"] = ((${value_value}) ? 1 : 0);`;
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
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/Entity.html');
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



const entity_get_world = {
    init: function () {
        this.appendValueInput('ENTITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get world of entity');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('Gets the entity\'s world object.');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/Entity.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_get_world: entity_get_world });

javascript.javascriptGenerator.forBlock['entity_get_world'] = function () {
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const code = `(${value_entity}).$worldObj`;
    return [code, javascript.Order.NONE];
}



const entity_get_position = {
    init: function () {
        this.appendValueInput('ENTITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get position of entity');
        this.appendDummyInput('AS')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('as')
            .appendField(new Blockly.FieldDropdown([
                ['BlockPos', '$getPosition'],
                ['Vec3', '$getPositionVector']
            ]), 'AS');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('Gets the entity\'s position object.');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/Entity.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_get_position: entity_get_position });
javascript.javascriptGenerator.forBlock['entity_get_position'] = function () {
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const dropdown_as = this.getFieldValue('AS');
    const code = `(${value_entity})["${dropdown_as}"]()`;
    return [code, javascript.Order.NONE];
}



const entity_distance = {
    init: function () {
        this.appendValueInput('A')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('distance from entity');
        this.appendValueInput('B')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('to entity');
        this.setInputsInline(true)
        this.setOutput(true, 'Number');
        this.setTooltip('Get the distance between two entities');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/Entity.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_distance: entity_distance });
javascript.javascriptGenerator.forBlock['entity_distance'] = function () {
    const value_a = javascript.javascriptGenerator.valueToCode(this, 'A', javascript.Order.ATOMIC);
    const value_b = javascript.javascriptGenerator.valueToCode(this, 'B', javascript.Order.ATOMIC);
    const code = `(${value_a}).$getDistanceToEntity(${value_b})`;
    return [code, javascript.Order.NONE];
}



const entity_distance_vec3 = {
    init: function () {
        this.appendValueInput('A')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('distance from entity');
        this.appendValueInput('B')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('to Vec3');
        this.setInputsInline(true)
        this.setOutput(true, 'Number');
        this.setTooltip('Get the distance from an entity to a Vec3 position');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/Entity.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_distance_vec3: entity_distance_vec3 });

javascript.javascriptGenerator.forBlock['entity_distance_vec3'] = function () {
    const value_a = javascript.javascriptGenerator.valueToCode(this, 'A', javascript.Order.ATOMIC);
    const value_b = javascript.javascriptGenerator.valueToCode(this, 'B', javascript.Order.ATOMIC);
    const code = `(($$efb2_arg_a, $$efb2_arg_b)=>$$efb2_arg_a.$getDistance($$efb2_arg_b.$x,$$efb2_arg_b.$y,$$efb2_arg_b.$z))(${value_a}, ${value_b})`;
    return [code, javascript.Order.NONE];
}



const entity_get_lookvec = {
    init: function () {
        this.appendValueInput('ENTITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get look vector of entity');
        this.setInputsInline(true)
        this.setOutput(true, 'Number');
        this.setTooltip('Gets an entity\'s look vector (Vec3)');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/Entity.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_get_lookvec: entity_get_lookvec });

javascript.javascriptGenerator.forBlock['entity_get_lookvec'] = function () {
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const code = `(${value_entity}).$getLook(1)`;
    return [code, javascript.Order.NONE];
}



const entity_get_eye_pos = {
    init: function () {
        this.appendValueInput('ENTITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get eye position vector of entity');
        this.setInputsInline(true)
        this.setOutput(true, 'Number');
        this.setTooltip('Gets an entity\'s eye position (Vec3)');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/Entity.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_get_eye_pos: entity_get_eye_pos });
javascript.javascriptGenerator.forBlock['entity_get_eye_pos'] = function () {
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const code = `(${value_entity}).$getPositionEyes(1)`;
    return [code, javascript.Order.NONE];
}




const entity_raytrace = {
    init: function () {
        this.appendValueInput('ENTITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('hit position from ray cast with entity');
        this.appendValueInput('DIST')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('Number')
            .appendField('with max distance');
        this.setInputsInline(false)
        this.setOutput(true, 'Number');
        this.setTooltip('Cast a ray from an entity and return the hit position as a Vec3.');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/Entity.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_raytrace: entity_raytrace });

javascript.javascriptGenerator.forBlock['entity_raytrace'] = function () {
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const value_dist = javascript.javascriptGenerator.valueToCode(this, 'DIST', javascript.Order.ATOMIC);
    const code = `(${value_entity}).$rayTrace((${value_dist}), 1).$hitVec`;
    return [code, javascript.Order.NONE];
}



const entity_setdead = {
    init: function () {
        this.appendValueInput('ENTITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('set entity to dead');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Sets an entity\'s state to \'dead\'');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/Entity.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ entity_setdead: entity_setdead });
javascript.javascriptGenerator.forBlock['entity_setdead'] = function () {
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const code = `(${value_entity}).$setDead();`;
    return code;
}