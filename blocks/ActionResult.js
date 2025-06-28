const enumaction = {
    init: function () {
        this.appendDummyInput('VAR')
            .appendField('[1.12] EnumAction')
            .appendField(new Blockly.FieldDropdown([
                ['PASS', 'PASS'],
                ['SUCCESS', 'SUCCESS'],
                ['FAIL', 'FAIL']
            ]), 'NAME');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('Creates an EnumAction for 1.12 handlers.');
        this.setHelpUrl('');
        this.setColour(120);
    }
};
Blockly.common.defineBlocks({ enumaction: enumaction });

javascript.javascriptGenerator.forBlock['enumaction'] = function () {
    const enumaction = this.getFieldValue('NAME');


    return [`(ModAPI.reflect.getClassByName("EnumActionResult").staticVariables.${enumaction})`, javascript.Order.NONE]
}


const actionresult = {
    init: function () {
        this.appendValueInput('OBJ')
            .appendField('[1.12] ActionResult of');
        this.appendDummyInput('VAR')
            .appendField('mode:')
            .appendField(new Blockly.FieldDropdown([
                ['PASS', 'PASS'],
                ['SUCCESS', 'SUCCESS'],
                ['FAIL', 'FAIL']
            ]), 'NAME');
        this.setInputsInline(true)
        this.setOutput(true, null);
        this.setTooltip('Checks if a global is defined.');
        this.setHelpUrl('');
        this.setColour(120);
    }
};
Blockly.common.defineBlocks({ actionresult: actionresult });
javascript.javascriptGenerator.forBlock['actionresult'] = function () {
    const object = generator.valueToCode(block, 'OBJ', javascript.Order.ATOMIC);
    const mode = block.getFieldValue('NAME');

    return [`(ModAPI.reflect.getClassByName("ActionResult").constructors[0](ModAPI.reflect.getClassByName("EnumActionResult").staticVariables.${mode}, ${object}))`, javascript.Order.NONE];
}