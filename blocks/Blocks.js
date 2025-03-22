registerHandler("BlockConstructor", "block constructor", {}, function () {
  this.setTooltip('Runs when the block type is initialised.\nNo return value expected.');
  this.setHelpUrl('');
  this.setColour(0);
});


const blocks_blockproperty = {
  init: function () {
    this.appendDummyInput('PROPERTY')
      .appendField('set block')
      .appendField(new Blockly.FieldDropdown([
        ['slipperiness', 'slipperiness'],
        ['light opacity', 'lightOpacity'],
        ['light value', 'lightValue'],
        ['blast resistance', 'blockResistance'],
        ['hardness', 'blockHardness']
      ]), 'PROPERTY');
    this.appendValueInput('VALUE')
      .setCheck('Number')
      .appendField('to');
    this.setInputsInline(true)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ blocks_blockproperty: blocks_blockproperty });
javascript.javascriptGenerator.forBlock['blocks_blockproperty'] = function () {
  const dropdown_property = this.getFieldValue('PROPERTY');
  const value_value = javascript.javascriptGenerator.valueToCode(this, 'VALUE', javascript.Order.ATOMIC);
  const code = `this["$${dropdown_property}"] = ${value_value};`;
  return code;
}



const blocks_blockswitch = {
  init: function () {
    this.appendDummyInput('PROPERTY')
      .appendField('set block')
      .appendField(new Blockly.FieldDropdown([
        ['full block', 'fullBlock'],
        ['translucent', 'translucent'],
        ['use neighbor brightness', 'useNeighborBrightness'],
        ['needs random tick', 'needsRandomTick']
      ]), 'PROPERTY');
    this.appendDummyInput('VALUE')
      .setAlign(Blockly.inputs.Align.CENTRE)
      .appendField('to')
      .appendField(new Blockly.FieldCheckbox('TRUE'), 'VALUE');
    this.setInputsInline(true)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ blocks_blockswitch: blocks_blockswitch });
javascript.javascriptGenerator.forBlock['blocks_blockswitch'] = function () {
  const dropdown_property = this.getFieldValue('PROPERTY');
  const checkbox_value = this.getFieldValue('VALUE') ? 1 : 0;
  const code = `this["$${dropdown_property}"] = ${checkbox_value};`;
  return code;
}

registerHandler("BlockBreak", "block break", {
  "WORLD": "world",
  "BLOCKPOS": "blockpos",
  "$$blockstate": null
}, function () {
  this.setTooltip('Runs when the block is removed from the world.\nNo return value expected.');
  this.setHelpUrl('');
  this.setColour(0);
});


registerHandler("BlockAdded", "block added", {
  "WORLD": "world",
  "BLOCKPOS": "blockpos",
  "$$blockstate": null
}, function () {
  this.setTooltip('Runs when the block is added to the world.\nNo return value expected.');
  this.setHelpUrl('');
  this.setColour(0);
});


registerHandler("BlockNeighbourChange", "block neighbor update", {
  "WORLD": "world",
  "BLOCKPOS": "blockpos",
  "$$blockstate": null
}, function () {
  this.setTooltip('Runs when a block\'s neighbor is changed.\nNo return value expected.');
  this.setHelpUrl('');
  this.setColour(0);
});

registerHandler("BlockBrokenByPlayer", "block broken by player", {
  "WORLD": "world",
  "BLOCKPOS": "blockpos",
  "$$blockstate": null
}, function () {
  this.setTooltip('Runs when a block is broken by a player.\nNo return value expected.');
  this.setHelpUrl('');
  this.setColour(0);
});

registerHandler("BlockRandomTick", "block random tick", {
  "WORLD": "world",
  "BLOCKPOS": "blockpos",
  "$$blockstate": null,
  "$$random": null
}, function () {
  this.setTooltip('Runs when a block is ticked.\nNo return value expected.');
  this.setHelpUrl('');
  this.setColour(0);
});


const blocks_block = {
  init: function () {
    this.appendDummyInput('BLOCK')
      .setAlign(Blockly.inputs.Align.RIGHT)
      .appendField('block')
      .appendField(new Blockly.FieldMinecraftItemInput(true, true), 'BLOCK');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setTooltip('Returns an Block instance (for comparisons)');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ blocks_block: blocks_block });
javascript.javascriptGenerator.forBlock['blocks_block'] = function () {
  const block_primitive = this.getFieldValue('BLOCK');
  const object = {
    id: block_primitive.split("/")[1].split("@")[0]
  }
  return [`(ModAPI.blocks["${object.id}"]?.getRef() || null)`, javascript.Order.NONE];
}


const blocks_boundingbox = {
  init: function () {
    this.appendDummyInput('MIN')
      .setAlign(Blockly.inputs.Align.RIGHT)
      .appendField('Set block bounds to min:')
      .appendField(new Blockly.FieldNumber(0), 'MINX')
      .appendField(new Blockly.FieldNumber(0), 'MINY')
      .appendField(new Blockly.FieldNumber(0), 'MINZ');
    this.appendDummyInput('MAX')
      .setAlign(Blockly.inputs.Align.RIGHT)
      .appendField('max:')
      .appendField(new Blockly.FieldNumber(1), 'MAXX')
      .appendField(new Blockly.FieldNumber(1), 'MAXY')
      .appendField(new Blockly.FieldNumber(1), 'MAXZ');
    this.setInputsInline(false)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Sets the block\'s bounding box');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ blocks_boundingbox: blocks_boundingbox });
javascript.javascriptGenerator.forBlock['blocks_boundingbox'] = function () {
  const number_minx = this.getFieldValue('MINX');
  const number_miny = this.getFieldValue('MINY');
  const number_minz = this.getFieldValue('MINZ');
  const number_maxx = this.getFieldValue('MAXX');
  const number_maxy = this.getFieldValue('MAXY');
  const number_maxz = this.getFieldValue('MAXZ');
  const code = `this.$setBlockBounds(${number_minx}, ${number_miny}, ${number_minz}, ${number_maxx}, ${number_maxy}, ${number_maxz});`;
  return code;
}



const blocks_creativetab = {
  init: function () {
    this.appendDummyInput('TAB')
      .setAlign(Blockly.inputs.Align.RIGHT)
      .appendField('Set block creative tab to')
      .appendField(new Blockly.FieldDropdown([
        ["tabBlock", "tabBlock"],
        ["tabDecorations", "tabDecorations"],
        ["tabRedstone", "tabRedstone"],
        ["tabTransport", "tabTransport"],
        ["tabMisc", "tabMisc"],
        ["tabAllSearch", "tabAllSearch"],
        ["tabFood", "tabFood"],
        ["tabTools", "tabTools"],
        ["tabCombat", "tabCombat"],
        ["tabBrewing", "tabBrewing"],
        ["tabMaterials", "tabMaterials"],
        ["tabInventory", "tabInventory"]
      ]), 'TAB');
    this.setInputsInline(false)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Set the creative tab of the block');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ blocks_creativetab: blocks_creativetab });
javascript.javascriptGenerator.forBlock['blocks_creativetab'] = function () {
  const dropdown_tab = this.getFieldValue('TAB');
  const code = `this.$setCreativeTab(ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.${dropdown_tab});`;
  return code;
}

registerHandler("BlockEntityCollision", "block entity collision", {
  "WORLD": "world",
  "BLOCKPOS": "blockpos",
  "ENTITY": "entity",
}, function () {
  this.setTooltip('Runs when an entity collides with the block.');
  this.setHelpUrl('');
  this.setColour(0);
});

registerHandler("BlockGetDroppedItem", "block get dropped item", {
  "$$blockstate": null,
  "$$random": null,
  "FORTURE": "forture",
}, function () {
  this.setTooltip('Runs when a block is broken to get the dropped item.\nItem return value expected.');
  this.setHelpUrl('');
  this.setColour(0);
});

registerHandler("BlockQuantityDropped", "block get dropped quantity", {
  "FORTURE": "forture",
  "$$random": null,
}, function () {
  this.setTooltip('Runs when a block is broken to get the dropped quantity.\nInteger return value expected.');
  this.setHelpUrl('');
  this.setColour(0);
});