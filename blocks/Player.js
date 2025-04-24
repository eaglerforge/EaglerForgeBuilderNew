const PLAYER_CAPABILITIES_BOOLEAN = [
    ["can fly", "allowFlying"],
    ["is flying", "isFlying"],
    ["disable damage", "disableDamage"],
    ["is in creative", "isCreativeMode"],
    ["is in spectator", "isSpectatorMode"],
    ["allow edit", "allowEdit"],
    ["is invulnerable", "invulnerable"],
];

const player_get_capability_boolean = {
    init: function () {
        this.appendDummyInput('CAPABILITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(PLAYER_CAPABILITIES_BOOLEAN), 'CAPABILITY');
        this.appendValueInput('PLAYER')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('capability of player');
        this.setInputsInline(true)
        this.setOutput(true, "Boolean");
        this.setTooltip('Gets a capability of a player.');
        this.setHelpUrl('https://eaglerforge.github.io/apidocs/globals/PlayerCapabilities.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ player_get_capability_boolean: player_get_capability_boolean });

javascript.javascriptGenerator.forBlock['player_get_capability_boolean'] = function () {
    const dropdown_capability = this.getFieldValue('CAPABILITY');
    const value_player = javascript.javascriptGenerator.valueToCode(this, 'PLAYER', javascript.Order.ATOMIC);
    let code;
    if (dropdown_capability === invulnerable) {
        code = `Boolean((${value_player}).$invulnerable)`;
    } else if (dropdown_capability === isSpectatorMode) {
        code = `Boolean((${value_player}).$isSpectator()`;
    } else {
        code = `Boolean((${value_player}).$capabilities["${dropdown_capability}"])`;
    }
    return [code, javascript.Order.NONE];
}


const PLAYER_CAPABILITIES_NUMBER = [
    ["walk speed", "walkSpeed0"],
    ["fly speed ", "flySpeed0"],
];

const player_get_capability_number = {
    init: function () {
        this.appendDummyInput('CAPABILITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(PLAYER_CAPABILITIES_NUMBER), 'CAPABILITY');
        this.appendValueInput('PLAYER')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('capability of player');
        this.setInputsInline(true)
        this.setOutput(true, "Number");
        this.setTooltip('Gets a capability of a player.');
        this.setHelpUrl('https://eaglerforge.github.io/apidocs/globals/PlayerCapabilities.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ player_get_capability_number: player_get_capability_number });

javascript.javascriptGenerator.forBlock['player_get_capability_number'] = function () {
    const dropdown_capability = this.getFieldValue('CAPABILITY');
    const value_player = javascript.javascriptGenerator.valueToCode(this, 'PLAYER', javascript.Order.ATOMIC);
    const code = `(${value_player}).$capabilities["$${dropdown_capability}"]`;
    return [code, javascript.Order.NONE];
}


const PLAYER_FOOD_STATS = [
    ["food exhaustion level", "foodExhaustionLevel"],
    ["food level ", "foodLevel0"],
    ["food saturation level", "foodSaturationLevel"],
];

const player_get_food_stats = {
    init: function () {
        this.appendDummyInput('STAT')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField( new Blockly.FieldDropdown(PLAYER_FOOD_STATS), 'STAT');
        this.appendValueInput('PLAYER')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('of player');
        this.setInputsInline(true)
        this.setOutput(true, "Number");
        this.setTooltip('Gets the food stats of a player.');
        this.setHelpUrl('https://eaglerforge.github.io/apidocs/globals/FoodStatsData.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ player_get_food_stats: player_get_food_stats });

javascript.javascriptGenerator.forBlock['player_get_food_stats'] = function () {
    const dropdown_stat = this.getFieldValue('STAT');
    const value_player = javascript.javascriptGenerator.valueToCode(this, 'PLAYER', javascript.Order.ATOMIC);
    const code = `(${value_player}).$foodStats["$${dropdown_stat}"]`;
    return [code, javascript.Order.NONE];
}

const PLAYER_XP_STATS = [
    ["experience", "experience"],
    ["experience level", "experienceLevel"],
    ["total experience", "experienceTotal"],
    ["experience points", "experiencePoints"]
];

const player_get_xp_stats = {
    init: function () {
        this.appendDummyInput('STAT')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField( new Blockly.FieldDropdown(PLAYER_XP_STATS), 'STAT');
        this.appendValueInput('PLAYER')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('of player');
        this.setInputsInline(true)
        this.setOutput(true, "Number");
        this.setTooltip('Gets the experience stats of a player.');
        this.setHelpUrl('https://eaglerforge.github.io/apidocs/globals/FoodStatsData.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ player_get_xp_stats: player_get_xp_stats });

javascript.javascriptGenerator.forBlock['player_get_xp_stats'] = function () {
    const dropdown_stat = this.getFieldValue('STAT');
    const value_player = javascript.javascriptGenerator.valueToCode(this, 'PLAYER', javascript.Order.ATOMIC);
    let code;
    if (dropdown_stat === "experiencePoints") {
        code = `${value_player}.$getExperiencePoints()`;
    } else {
        code = `${value_player}.` + "$" + `${dropdown_stat}`;
    }
    return [code, javascript.Order.NONE];
}


const PLAYER_ITEM_TYPE = [
    ["ItemStack", "ItemStack"],
    ["Item", "Item"],
];

const player_get_item_hand = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get held item of player');
        this.appendDummyInput()
            .appendField('as');
        this.appendDummyInput('TYPE')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(PLAYER_ITEM_TYPE), 'TYPE');
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip('Gets the item in the hand of a player.');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/player/EntityPlayer.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ player_get_item_hand: player_get_item_hand });

javascript.javascriptGenerator.forBlock['player_get_item_hand'] = function () {
    const dropdown_item_type = this.getFieldValue('TYPE');
    const value_player = javascript.javascriptGenerator.valueToCode(this, 'PLAYER', javascript.Order.ATOMIC);
    let code;
    if (dropdown_item_type === "Item") {
        code = `(${value_player}).$getHeldItem()?(${value_player}).$getHeldItem().$item:null`;
    } else {
        code = `(${value_player}).$getHeldItem()`;
    }
    return [code, javascript.Order.NONE];
}


const player_get_current_item_pos = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get held item index of player');
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setTooltip('Gets the selected item index of a player.');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/player/EntityPlayer.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ player_get_current_item_pos: player_get_current_item_pos });

javascript.javascriptGenerator.forBlock['player_get_current_item_pos'] = function () {
    const value_player = javascript.javascriptGenerator.valueToCode(this, 'PLAYER', javascript.Order.ATOMIC);
    const code = `(${value_player}.$inventory.$currentItem+1)`;
    return [code, javascript.Order.NONE];
}


const PLAYER_INVENTORY = [
    ["get main inventory", "main"],
    ["get armor inventory", "armor"],
    ["get enderchest inventory", "enderchest"],
];

const player_get_player_inventory = {
    init: function () {
        this.appendDummyInput('TYPE')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldDropdown(PLAYER_INVENTORY), 'TYPE');
        this.appendValueInput('PLAYER')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('of player');
        this.appendDummyInput()
            .appendField('as list');
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip('Gets the inventory of a player as list.');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/player/EntityPlayer.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ player_get_player_inventory: player_get_player_inventory });

javascript.javascriptGenerator.forBlock['player_get_player_inventory'] = function () {
    const dropdown_inventory = this.getFieldValue('TYPE');
    const value_player = javascript.javascriptGenerator.valueToCode(this, 'PLAYER', javascript.Order.ATOMIC);
    let code;
    if (dropdown_inventory === "main") {
        code = `(${value_player}).$inventory.$mainInventory.data`;
    } else if (dropdown_inventory === "armor") {
        code = `(${value_player}).$inventory.$armorInventory.data`;
    } else {
        code = `(${value_player}).$getInventoryEnderChest().$inventoryContents.data`
    }
    return [code, javascript.Order.NONE];
}

const player_is_entity_player = {
    init: function () {
        this.appendValueInput('ENTITY')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('is entity');
        this.appendDummyInput()
            .appendField('a player');
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setTooltip('Checks if an entity is a player or not');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/player/EntityPlayer.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ player_is_entity_player: player_is_entity_player });

javascript.javascriptGenerator.forBlock['player_is_entity_player'] = function () {
    const value_entity = javascript.javascriptGenerator.valueToCode(this, 'ENTITY', javascript.Order.ATOMIC);
    const code = `Boolean(Minecraft.$thePlayer.$isPlayer())`;
    return [code, javascript.Order.NONE];
}

const player_get_player_name = {
    init: function () {
        this.appendValueInput('PLAYER')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField('get the name of player');
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setTooltip('Gets the name a player.');
        this.setHelpUrl('https://nurmarvin.github.io/Minecraft-1.8-JavaDocs/net/minecraft/entity/player/EntityPlayer.html');
        this.setColour(30);
    }
};
Blockly.common.defineBlocks({ player_get_player_name: player_get_player_name });

javascript.javascriptGenerator.forBlock['player_get_player_name'] = function () {
    const value_player = javascript.javascriptGenerator.valueToCode(this, 'PLAYER', javascript.Order.ATOMIC);
    const code = `ModAPI.util.ustr((${value_player}).$getName())`;
    return [code, javascript.Order.NONE];
}
