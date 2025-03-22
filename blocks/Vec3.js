const vec3_getxyz = {
    init: function () {
        this.appendDummyInput('TAB')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown([
                ['x', '$xCoord'],
                ['y', '$yCoord'],
                ['z', '$zCoord']
            ]), 'TAB');
        this.appendValueInput('VALUE')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('component of Vec3');
        this.setInputsInline(true)
        this.setOutput(true, "Number");
        this.setTooltip('Get a component of a Vec3');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/util/Vec3.html');
        this.setColour(270);
    }
};
Blockly.common.defineBlocks({ vec3_getxyz: vec3_getxyz });



javascript.javascriptGenerator.forBlock['vec3_getxyz'] = function () {
    const dropdown_tab = this.getFieldValue('TAB');
    const value_value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);

    const code = `(${value_value})["${dropdown_tab}"]`;
    return [code, javascript.Order.NONE];
}



const vec3_fromxyz = {
    init: function () {
        this.appendValueInput('X')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('Number')
            .appendField('Make Vec3 from  x:');
        this.appendValueInput('Y')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('Number')
            .appendField('y:');
        this.appendValueInput('Z')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('Number')
            .appendField('z:');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('Create a Vec3 from components');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/util/Vec3.html');
        this.setColour(270);
    },
    libs: ["construct_vec3"]
};
Blockly.common.defineBlocks({ vec3_fromxyz: vec3_fromxyz });

javascript.javascriptGenerator.forBlock['vec3_fromxyz'] = function () {
    const value_x = javascript.javascriptGenerator.valueToCode(this, 'X', javascript.Order.ATOMIC);
    const value_y = javascript.javascriptGenerator.valueToCode(this, 'Y', javascript.Order.ATOMIC);
    const value_z = javascript.javascriptGenerator.valueToCode(this, 'Z', javascript.Order.ATOMIC);

    const code = `efb2__makeVec3(${value_x},${value_y},${value_z})`;
    return [code, javascript.Order.NONE];
}


const vec3_dist = {
    init: function () {
        this.appendValueInput('X')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('distance from Vec3');
        this.appendValueInput('Y')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('to Vec3');
        this.setInputsInline(true)
        this.setOutput(true, "Number");
        this.setTooltip('Calculates the distance between two Vec3\'s.');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/util/Vec3.html');
        this.setColour(270);
    },
};
Blockly.common.defineBlocks({ vec3_dist: vec3_dist });

javascript.javascriptGenerator.forBlock['vec3_dist'] = function () {
    const value_x = javascript.javascriptGenerator.valueToCode(this, 'X', javascript.Order.ATOMIC);
    const value_y = javascript.javascriptGenerator.valueToCode(this, 'Y', javascript.Order.ATOMIC);

    const code = `(${value_x}).$distanceTo(${value_y})`;
    return [code, javascript.Order.NONE];
}