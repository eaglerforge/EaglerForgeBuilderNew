const blockpos_getxyz = {
    init: function () {
        this.appendDummyInput('TAB')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown([
                ['x', '$x'],
                ['y', '$y'],
                ['z', '$z']
            ]), 'TAB');
        this.appendValueInput('VALUE')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('component of BlockPos');
        this.setInputsInline(true)
        this.setOutput(true, "Number");
        this.setTooltip('Get a component of a block pos');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/util/BlockPos.html');
        this.setColour(270);
    }
};
Blockly.common.defineBlocks({ blockpos_getxyz: blockpos_getxyz });



javascript.javascriptGenerator.forBlock['blockpos_getxyz'] = function () {
    const dropdown_tab = this.getFieldValue('TAB');
    const value_value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);

    const code = `(${value_value})["${dropdown_tab}"]`;
    return [code, javascript.Order.NONE];
}



const blockpos_fromxyz = {
    init: function () {
        this.appendValueInput('X')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('Number')
            .appendField('Make BlockPos from x:');
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
        this.setTooltip('Create a BlockPos from components');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/util/BlockPos.html');
        this.setColour(270);
    },
    libs: ["construct_blockpos"]
};
Blockly.common.defineBlocks({ blockpos_fromxyz: blockpos_fromxyz });

javascript.javascriptGenerator.forBlock['blockpos_fromxyz'] = function () {
    const value_x = javascript.javascriptGenerator.valueToCode(this, 'X', javascript.Order.ATOMIC);
    const value_y = javascript.javascriptGenerator.valueToCode(this, 'Y', javascript.Order.ATOMIC);
    const value_z = javascript.javascriptGenerator.valueToCode(this, 'Z', javascript.Order.ATOMIC);

    const code = `efb2__makeBlockPos(Math.floor(${value_x}),Math.floor(${value_y}),Math.floor(${value_z}))`;
    return [code, javascript.Order.NONE];
}