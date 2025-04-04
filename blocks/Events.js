const keyCodes = [
    ["ANY", ""],
    ["SPACE", "32"],
    ["UP ARROW", "38"],
    ["DOWN ARROW", "40"],
    ["LEFT ARROW", "37"],
    ["RIGHT ARROW", "39"],
    ["A", "65"],
    ["B", "66"],
    ["C", "67"],
    ["D", "68"],
    ["E", "69"],
    ["F", "70"],
    ["G", "71"],
    ["H", "72"],
    ["I", "73"],
    ["J", "74"],
    ["K", "75"],
    ["L", "76"],
    ["M", "77"],
    ["N", "78"],
    ["O", "79"],
    ["P", "80"],
    ["Q", "81"],
    ["R", "82"],
    ["S", "83"],
    ["T", "84"],
    ["U", "85"],
    ["V", "86"],
    ["W", "87"],
    ["X", "88"],
    ["Y", "89"],
    ["Z", "90"],
    ["0", "48"],
    ["1", "49"],
    ["2", "50"],
    ["3", "51"],
    ["4", "52"],
    ["5", "53"],
    ["6", "54"],
    ["7", "55"],
    ["8", "56"],
    ["9", "57"],
    ["F1", "112"],
    ["F2", "113"],
    ["F3", "114"],
    ["F4", "115"],
    ["F5", "116"],
    ["F6", "117"],
    ["F7", "118"],
    ["F8", "119"],
    ["F9", "120"],
    ["F10", "121"],
    ["F11", "122"],
    ["F12", "123"],
];

const events_onModLoads = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabel('when all mods finished loading'));
        this.appendStatementInput('CODE')
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField('do');
        this.setColour(55);
        this.setTooltip('Is executed when all mods finished loading.');
        this.setHelpUrl('');
    }
};

const events_onClientTick = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabel('each client tick'));
        this.appendStatementInput('CODE')
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField('do');
        this.setColour(55);
        this.setTooltip('Is executed on each client tick.');
        this.setHelpUrl('');
    }
};

const events_onClientFrame = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabel('each client frame'));
        this.appendStatementInput('CODE')
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField('do');
        this.setColour(55);
        this.setTooltip('Is executed on each client frame.');
        this.setHelpUrl('');
    }
};
/*
const events_onKeyPressed = {
    init: function() {
        this.appendDummyInput()
            .appendField('when')
            .appendField(new Blockly.FieldDropdown(keyCodes), 'KEYCODE')
            .appendField('key pressed');
        this.appendStatementInput('CODE')
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField('do');
        this.setColour(55);
        this.setTooltip('Is executed when a key is pressed.');
        this.setHelpUrl('');
    }
};

const events_onKeyReleased = {
    init: function() {
        this.appendDummyInput()
            .appendField('when')
            .appendField(new Blockly.FieldDropdown(keyCodes), 'KEYCODE')
            .appendField('key released');
        this.appendStatementInput('CODE')
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField('do');
        this.setColour(55);
        this.setTooltip('Is executed when a key is released.');
        this.setHelpUrl('');
    }
};
*/
const events_onscreenRender = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabel('On Screen Render'));
        this.appendStatementInput('CODE')
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField('do');
        this.setColour(55);
        this.setTooltip('Called each time the screen is rendering, both in the game screen and in the interface.');
        this.setHelpUrl('');
    }
};

const events_onGUIScreenRender = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabel('On Gui Screen Render'));
        this.appendStatementInput('CODE')
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField('do');
        this.setColour(55);
        this.setTooltip('Called each time the screen is rendering, but only in the interface (not in game)');
        this.setHelpUrl('');
    }
};

const events_onJoinWorld = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldLabel('when HOST joins world'));
        this.appendStatementInput('CODE')
            .setAlign(Blockly.inputs.Align.CENTRE)
            .appendField('do');
        this.setColour(55);
        this.setTooltip('Is executed when player joins a world, runs once.');
        this.setHelpUrl('');
    }
};
// Now define all blocks after the block definitions
Blockly.common.defineBlocks({
    events_onModLoads: events_onModLoads,
    events_onClientTick: events_onClientTick,
    events_onClientFrame: events_onClientFrame,
    //events_onKeyPressed: events_onKeyPressed,
    //events_onKeyReleased: events_onKeyReleased,
    events_onJoinWorld: events_onJoinWorld
});

// JavaScript generators for each event block
javascript.javascriptGenerator.forBlock['events_onJoinWorld'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CODE');
    const code = `
ModAPI.addEventListener("serverstart", () => { 
    ${statement} })`;
    return code;
}

javascript.javascriptGenerator.forBlock['events_onscreenRender'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CODE');
    const code = `
ModAPI.addEventListener("screenRender", () => { 
    ${statement} })`;
    return code;
}

javascript.javascriptGenerator.forBlock['events_onGUIScreenRender'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CODE');
    const code = `
ModAPI.addEventListener("GUIScreenRender", () => { 
    ${statement} })`;
    return code;
}

javascript.javascriptGenerator.forBlock['events_oninGameScreenRender'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CODE');
    const code = `
ModAPI.addEventListener("inGameScreenRender", () => { 
    ${statement} })`;
    return code;
}

javascript.javascriptGenerator.forBlock['events_onscreenChange'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CODE');
    const code = `
ModAPI.addEventListener("screenChange", () => { 
    ${statement} })`;
    return code;
}

javascript.javascriptGenerator.forBlock['events_onopenModManager'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CODE');
    const code = `
ModAPI.addEventListener("openModManager", () => { 
    ${statement} })`;
    return code;
}

javascript.javascriptGenerator.forBlock['events_onopenLANSharing'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CODE');
    const code = `
ModAPI.addEventListener("openLANSharing", () => { 
    ${statement} })`;
    return code;
}

javascript.javascriptGenerator.forBlock['events_onModLoads'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CODE');
    const code = `
ModAPI.addEventListener("load", () => { 
    ${statement} })`;
    return code;
}

javascript.javascriptGenerator.forBlock['events_onClientTick'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CODE');
    const code = `
ModAPI.addEventListener("update", () => { 
    ${statement} })`;
    return code;
}

javascript.javascriptGenerator.forBlock['events_onClientFrame'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CODE');
    const code = `
ModAPI.addEventListener("frame", () => { 
    ${statement} })`;
    return code;
}

javascript.javascriptGenerator.forBlock['events_onKeyPressed'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CODE');
    const keyCode = block.getFieldValue('KEYCODE');
    const code = `
window.addEventListener("keydown", event => {
    ${keyCode !== ""?"if (event.keyCode === '"+keyCode+"') {":""}
    ${statement}
    ${keyCode !== ""?"}":""}`;
    return code;
}

javascript.javascriptGenerator.forBlock['events_onKeyReleased'] = function(block, generator) {
    const statement = generator.statementToCode(block, 'CODE');
    const keyCode = block.getFieldValue('KEYCODE');
    const code = `
window.addEventListener("keyup", event => {
    ${keyCode !== ""?"if (event.keyCode === '"+keyCode+"') {":""}
    ${statement}
    ${keyCode !== ""?"}":""}`;
    return code;
}

