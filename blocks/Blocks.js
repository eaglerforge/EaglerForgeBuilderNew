const handle_BlockConstructor = {
  init: function () {
    this.appendDummyInput('ID')
      .appendField('Handler ID:')
      .appendField(new Blockly.FieldTextInput('block constructor 1'), 'ID');
    this.appendDummyInput('')
      .setAlign(Blockly.inputs.Align.LEFT)
      .appendField('Block Constructor Handler');
    this.appendStatementInput('CODE');
    this.setTooltip('Runs when the block type is initialised.\nNo return value expected.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ handle_BlockConstructor: handle_BlockConstructor });

javascript.javascriptGenerator.forBlock['handle_BlockConstructor'] = function (block) {
  const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
  return { code: statement, args: [] };
}


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
        ['needs random tick', 'blockHardness']
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


const handle_BlockBreak = {
  init: function () {
    this.appendDummyInput('ID')
      .appendField('Handler ID:')
      .appendField(new Blockly.FieldTextInput('block break 1'), 'ID');
    this.appendDummyInput('')
      .appendField('Block Break Handler with:')
      .appendField(new Blockly.FieldVariable('world'), 'WORLD')
      .appendField(new Blockly.FieldVariable('position'), 'BLOCKPOS');
    this.appendStatementInput('CODE');
    this.setInputsInline(false)
    this.setTooltip('Runs when the block is removed from the world.\nNo return value expected.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ handle_BlockBreak: handle_BlockBreak });

javascript.javascriptGenerator.forBlock['handle_BlockBreak'] = function () {
  const variable_world = javascript.javascriptGenerator.getVariableName(this.getFieldValue('WORLD'));
  const variable_blockpos = javascript.javascriptGenerator.getVariableName(this.getFieldValue('BLOCKPOS'));
  const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
  return { code: statement, args: [variable_world, variable_blockpos, "$$blockstate"] };
}



const handle_BlockAdded = {
  init: function () {
    this.appendDummyInput('ID')
      .appendField('Handler ID:')
      .appendField(new Blockly.FieldTextInput('block added 1'), 'ID');
    this.appendDummyInput('')
      .appendField('Block Placed Handler with:')
      .appendField(new Blockly.FieldVariable('world'), 'WORLD')
      .appendField(new Blockly.FieldVariable('position'), 'BLOCKPOS');
    this.appendStatementInput('CODE');
    this.setInputsInline(false)
    this.setTooltip('Runs when the block is added to the world.\nNo return value expected.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ handle_BlockAdded: handle_BlockAdded });

javascript.javascriptGenerator.forBlock['handle_BlockAdded'] = function () {
  const variable_world = javascript.javascriptGenerator.getVariableName(this.getFieldValue('WORLD'));
  const variable_blockpos = javascript.javascriptGenerator.getVariableName(this.getFieldValue('BLOCKPOS'));
  const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
  return { code: statement, args: [variable_world, variable_blockpos, "$$blockstate"] };
}



const handle_BlockNeighbourChange = {
  init: function () {
    this.appendDummyInput('ID')
      .appendField('Handler ID:')
      .appendField(new Blockly.FieldTextInput('block neighbour update 1'), 'ID');
    this.appendDummyInput('')
      .appendField('Block Neighbour Changed Handler with:')
      .appendField(new Blockly.FieldVariable('world'), 'WORLD')
      .appendField(new Blockly.FieldVariable('position'), 'BLOCKPOS');
    this.appendStatementInput('CODE');
    this.setInputsInline(false)
    this.setTooltip('Runs when a block\'s neighbor is changed.\nNo return value expected.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ handle_BlockNeighbourChange: handle_BlockNeighbourChange });

javascript.javascriptGenerator.forBlock['handle_BlockNeighbourChange'] = function () {
  const variable_world = javascript.javascriptGenerator.getVariableName(this.getFieldValue('WORLD'));
  const variable_blockpos = javascript.javascriptGenerator.getVariableName(this.getFieldValue('BLOCKPOS'));
  const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
  return { code: statement, args: [variable_world, variable_blockpos, "$$blockstate"] };
}



const handle_BlockBrokenByPlayer = {
  init: function () {
    this.appendDummyInput('ID')
      .appendField('Handler ID:')
      .appendField(new Blockly.FieldTextInput('block broken by player 1'), 'ID');
    this.appendDummyInput('')
      .appendField('Block Broken By Player Handler with:')
      .appendField(new Blockly.FieldVariable('world'), 'WORLD')
      .appendField(new Blockly.FieldVariable('position'), 'BLOCKPOS');
    this.appendStatementInput('CODE');
    this.setInputsInline(false)
    this.setTooltip('Runs when a block is broken by a player.\nNo return value expected.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ handle_BlockBrokenByPlayer: handle_BlockBrokenByPlayer });

javascript.javascriptGenerator.forBlock['handle_BlockBrokenByPlayer'] = function () {
  const variable_world = javascript.javascriptGenerator.getVariableName(this.getFieldValue('WORLD'));
  const variable_blockpos = javascript.javascriptGenerator.getVariableName(this.getFieldValue('BLOCKPOS'));
  const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
  return { code: statement, args: [variable_world, variable_blockpos, "$$blockstate"] };
}


const handle_BlockUpdateTick = {
  init: function () {
    this.appendDummyInput('ID')
      .appendField('Handler ID:')
      .appendField(new Blockly.FieldTextInput('block update tick 1'), 'ID');
    this.appendDummyInput('')
      .appendField('Block Update Tick Handler with:')
      .appendField(new Blockly.FieldVariable('world'), 'WORLD')
      .appendField(new Blockly.FieldVariable('position'), 'BLOCKPOS');
    this.appendStatementInput('CODE');
    this.setInputsInline(false)
    this.setTooltip('Runs when a block is ticked.\nNo return value expected.');
    this.setHelpUrl('');
    this.setColour(0);
  }
};
Blockly.common.defineBlocks({ handle_BlockUpdateTick: handle_BlockUpdateTick });

javascript.javascriptGenerator.forBlock['handle_BlockUpdateTick'] = function () {
  const variable_world = javascript.javascriptGenerator.getVariableName(this.getFieldValue('WORLD'));
  const variable_blockpos = javascript.javascriptGenerator.getVariableName(this.getFieldValue('BLOCKPOS'));
  const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
  return { code: statement, args: [variable_world, variable_blockpos, "$$blockstate", "$$random"] };
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
  const number_minx = block.getFieldValue('MINX');
  const number_miny = block.getFieldValue('MINY');
  const number_minz = block.getFieldValue('MINZ');
  const number_maxx = block.getFieldValue('MAXX');
  const number_maxy = block.getFieldValue('MAXY');
  const number_maxz = block.getFieldValue('MAXZ');
  const code = `this.$setBlockBounds(${number_minx}, ${number_miny}, ${number_minz}, ${number_maxx}, ${number_maxy}, ${number_maxz})`;
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
javascript.javascriptGenerator.forBlock['blocks_creativetab'] = function() {
  const dropdown_tab = this.getFieldValue('TAB');
  const code = `this.$setCreativeTab(ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.${dropdown_tab});`;
  return code;
}