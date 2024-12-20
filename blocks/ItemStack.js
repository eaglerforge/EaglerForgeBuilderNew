const itemstack_stacksize = {
    init: function () {
        this.appendValueInput('ITEMSTACK')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get itemstack stack size');
        this.setInputsInline(true)
        this.setOutput(true, 'Number');
        this.setTooltip('Gets the stacksize of an ItemStack');
        this.setHelpUrl('');
        this.setColour(165);
    }
};
Blockly.common.defineBlocks({ itemstack_stacksize: itemstack_stacksize });

javascript.javascriptGenerator.forBlock['itemstack_stacksize'] = function () {
    const value_itemstack = javascript.javascriptGenerator.valueToCode(this, 'ITEMSTACK', javascript.Order.ATOMIC);
    const code = `(${value_itemstack}).$stackSize`;
    return [code, javascript.Order.NONE];
}



const itemstack_setstacksize = {
    init: function () {
        this.appendValueInput('ITEMSTACK')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('set itemstack stack size');
        this.appendValueInput('VALUE')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('Number')
            .appendField('to');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Sets the stacksize of an ItemStack');
        this.setHelpUrl('');
        this.setColour(165);
    }
};
Blockly.common.defineBlocks({ itemstack_setstacksize: itemstack_setstacksize });

javascript.javascriptGenerator.forBlock['itemstack_setstacksize'] = function () {
    const value_itemstack = javascript.javascriptGenerator.valueToCode(this, 'ITEMSTACK', javascript.Order.ATOMIC);
    const value_value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);
    const code = `(${value_itemstack}).$stackSize = (${value_value})`;
    return code;
}


const itemstack_displayname = {
    init: function () {
        this.appendValueInput('ITEMSTACK')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get itemstack display name');
        this.setInputsInline(true)
        this.setOutput(true, 'String');
        this.setTooltip('Gets the display name of an ItemStack');
        this.setHelpUrl('');
        this.setColour(165);
    }
};
Blockly.common.defineBlocks({ itemstack_displayname: itemstack_displayname });

javascript.javascriptGenerator.forBlock['itemstack_displayname'] = function () {
    const value_itemstack = javascript.javascriptGenerator.valueToCode(this, 'ITEMSTACK', javascript.Order.ATOMIC);
    const code = `ModAPI.util.ustr((${value_itemstack}).$getDisplayName())`;
    return [code, javascript.Order.NONE];
}


const itemstack_setdisplayname = {
    init: function () {
        this.appendValueInput('ITEMSTACK')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('set itemstack display name');
        this.appendValueInput('VALUE')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('Number')
            .appendField('to');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Sets the display name of an ItemStack');
        this.setHelpUrl('');
        this.setColour(165);
    }
};
Blockly.common.defineBlocks({ itemstack_setdisplayname: itemstack_setdisplayname });

javascript.javascriptGenerator.forBlock['itemstack_setdisplayname'] = function () {
    const value_itemstack = javascript.javascriptGenerator.valueToCode(this, 'ITEMSTACK', javascript.Order.ATOMIC);
    const value_value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);
    const code = `(${value_itemstack}).$setStackDisplayName(ModAPI.util.str(${value_value}))`;
    return code;
}


const itemstack_enchant = {
    init: function () {
        this.appendValueInput('ITEMSTACK')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('enchant itemstack');
        this.appendDummyInput('ENCHANTMENT')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('with enchantment')
            .appendField(new Blockly.FieldDropdown([
                ["protection", "protection"],
                ["fireProtection", "fireProtection"],
                ["featherFalling", "featherFalling"],
                ["blastProtection", "blastProtection"],
                ["projectileProtection", "projectileProtection"],
                ["respiration", "respiration"],
                ["aquaAffinity", "aquaAffinity"],
                ["thorns", "thorns"],
                ["depthStrider", "depthStrider"],
                ["sharpness", "sharpness"],
                ["smite", "smite"],
                ["baneOfArthropods", "baneOfArthropods"],
                ["knockback", "knockback"],
                ["fireAspect", "fireAspect"],
                ["looting", "looting"],
                ["efficiency", "efficiency"],
                ["silkTouch", "silkTouch"],
                ["unbreaking", "unbreaking"],
                ["fortune", "fortune"],
                ["power", "power"],
                ["punch", "punch"],
                ["flame", "flame"],
                ["infinity", "infinity"],
                ["luckOfTheSea", "luckOfTheSea"],
                ["lure", "lure"]
            ]), 'ENCHANTMENT');
        this.appendValueInput('LEVEL')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('Number')
            .appendField('at level');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Adds an enchantment to an ItemStack');
        this.setHelpUrl('');
        this.setColour(165);
    }
};
Blockly.common.defineBlocks({ itemstack_enchant: itemstack_enchant });

javascript.javascriptGenerator.forBlock['itemstack_enchant'] = function () {
    const value_itemstack = javascript.javascriptGenerator.valueToCode(this, 'ITEMSTACK', javascript.Order.ATOMIC);
    const dropdown_enchantment = this.getFieldValue('ENCHANTMENT');
    const value_level = javascript.javascriptGenerator.valueToCode(this, 'LEVEL', javascript.Order.ATOMIC);
    const code = `(${value_itemstack}).$addEnchantment(ModAPI.enchantments["${dropdown_enchantment}"], (${value_level}))`;
    return code;
}



const itemstack_repaircost = {
    init: function () {
        this.appendValueInput('ITEMSTACK')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get itemstack repair cost');
        this.setInputsInline(true)
        this.setOutput(true, 'Number');
        this.setTooltip('Gets the repair cost of an ItemStack');
        this.setHelpUrl('');
        this.setColour(165);
    }
};
Blockly.common.defineBlocks({ itemstack_repaircost: itemstack_repaircost });

javascript.javascriptGenerator.forBlock['itemstack_repaircost'] = function () {
    const value_itemstack = javascript.javascriptGenerator.valueToCode(this, 'ITEMSTACK', javascript.Order.ATOMIC);
    const code = `(${value_itemstack}).$getRepairCost()`;
    return [code, javascript.Order.NONE];
}



const itemstack_setrepaircost = {
    init: function () {
        this.appendValueInput('ITEMSTACK')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('set itemstack repair cost');
        this.appendValueInput('VALUE')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .setCheck('Number')
            .appendField('to');
        this.setInputsInline(true)
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Sets the repair cost of an ItemStack');
        this.setHelpUrl('');
        this.setColour(165);
    }
};
Blockly.common.defineBlocks({ itemstack_setrepaircost: itemstack_setrepaircost });

javascript.javascriptGenerator.forBlock['itemstack_setrepaircost'] = function () {
    const value_itemstack = javascript.javascriptGenerator.valueToCode(this, 'ITEMSTACK', javascript.Order.ATOMIC);
    const value_value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);
    const code = `(${value_itemstack}).$setRepairCost(${value_value})`;
    return code;
}