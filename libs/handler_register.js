function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}
function registerHandler(id, l10n, map, post) {
    var key = "handle_" + id;
    const handler = {
        init: function () {
            this.appendDummyInput('ID')
                .appendField('Handler ID:')
                .appendField(new Blockly.FieldTextInput(l10n.toLowerCase().trim() + ' 1'), 'ID');
            var dummy = this.appendDummyInput('')
                .appendField(toTitleCase(l10n.trim()) + ' Handler' + ((Object.keys(map).length === 0) ? "" : " with:"));

            Object.keys(map).forEach(x=>{
                if (map[x] === null) {
                    return;
                }
                dummy.appendField(new Blockly.FieldEFB2Variable(map[x]), x)
            });
            
            this.appendStatementInput('CODE');
            this.setInputsInline(false)
            post.apply(this, []);
        }
    };
    const data = {};
    data[key] = handler;
    Blockly.common.defineBlocks(data);

    javascript.javascriptGenerator.forBlock[key] = function () {
        const variables = Object.keys(map).map(k => (map[k] === null) ? k : javascript.javascriptGenerator.getVariableName(this.getFieldValue(k)));
        const statement = javascript.javascriptGenerator.statementToCode(this, 'CODE');
        return { code: statement, args: variables };
    }
}