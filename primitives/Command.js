PRIMITIVES["command"] = {
    name: "Command",
    uses: [],
    type: "command",
    tags: {
        command: "/example_command",
        caseSensitive: false,
        playersOnly: true,
        Called: VALUE_ENUMS.ABSTRACT_HANDLER + "CommandCalled",
        CalledByPlayer: VALUE_ENUMS.ABSTRACT_HANDLER + "CalledByPlayer",
    },
    asJavaScript: function () {
        var escaped = this.tags.Command.replaceAll("\"", "\\\"");
        var len = this.tags.Command.length;
        return `
(function CommandDatablock() {
    PluginAPI.dedicatedServer.appendCode(function () {
        PluginAPI.addEventListener("processcommand", ($$event) => {
            if ($$event.command.toLowerCase().startsWith("${escaped}")) {
                var message = $$event.command.substring(${len + 1});
                var isPlayer = ModAPI.reflect.getClassById("net.minecraft.entity.player.EntityPlayerMP").instanceOf(event.sender.getRef());
                if (
                    isPlayer
                ) {
                    $$event.sender.addChatMessage(ModAPI.reflect.getClassById("net.minecraft.util.ChatComponentText").constructors[0](ModAPI.util.str(message.toUpperCase())));
                }${this.tags.PlayersOnly ? "" : ` else {
                
                }`}
                $$event.preventDefault = true;
            }
        });
    });
})();`;
    }
}