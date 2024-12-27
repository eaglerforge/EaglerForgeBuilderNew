PRIMITIVES["command"] = {
    name: "Command",
    uses: [],
    type: "command",
    tags: {
        command: "/example_command",
        caseSensitive: false,
        playersOnly: true,
        CalledByPlayer: VALUE_ENUMS.ABSTRACT_HANDLER + "CommandCalledByPlayer",
        CalledByOther: VALUE_ENUMS.ABSTRACT_HANDLER + "CommandCalled",
    },
    asJavaScript: function () {
        var escaped = this.tags.Command.replaceAll("\"", "\\\"");
        var len = this.tags.Command.length;
        var callHandler = getHandlerCode("CommandCalled", this.tags.Called, ["$$args", "$$sender"]);
        var callPlayerHandler = getHandlerCode("CommandCalled", this.tags.CalledByPlayer, ["$$args", "$$sender", "$$player"]);
        return `
(function CommandDatablock() {
    PluginAPI.dedicatedServer.appendCode(function () {
        PluginAPI.addEventListener("processcommand", ($$event) => {
            if ($$event.command${this.tags.caseSensitive ? "" : ".toLowerCase()"}.startsWith("${escaped}")) {
                var $$arguments = $$event.command.substring(${len + 1}).trim().split(" ").filter(x=>!!x);
                var $$isPlayer = ModAPI.reflect.getClassById("net.minecraft.entity.player.EntityPlayerMP").instanceOf($$event.sender.getRef());
                if (
                    $$isPlayer
                ) {
                    (function (${callPlayerHandler.args.join(",")}) {${callPlayerHandler.code}})($$arguments, $$event.sender.getRef());
                }${this.tags.PlayersOnly ? "" : ` else {
                    (function (${callHandler.args.join(",")}) {${callHandler.code}})($$arguments, $$event.sender.getRef(), $$event.sender.getRef());
                }`}
                $$event.preventDefault = true;
            }
        });
    });
})();`;
    }
}