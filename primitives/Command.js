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
    getDependencies: function () {
        return [];
    },
    asJavaScript: function () {
        var escaped = this.tags.command.replaceAll("\"", "\\\"");
        var len = this.tags.command.length;
        var callHandler = getHandlerCode("CommandCalled", this.tags.CalledByOther, ["$$args", "$$sender"]);
        var callPlayerHandler = getHandlerCode("CommandCalledByPlayer", this.tags.CalledByPlayer, ["$$args", "$$sender", "$$player"]);
        return `
(function CommandDatablock() {
    PluginAPI.dedicatedServer.appendCode(function () {
        const $$scoped_efb_globals = {};
        PluginAPI.addEventListener("processcommand", ($$event) => {
            if ($$event.command${this.tags.caseSensitive ? "" : ".toLowerCase()"}.startsWith("${escaped}")) {
                var $$arguments = $$event.command.substring(${len + 1}).trim().split(" ").filter(x=>!!x);
                var $$isPlayer = ModAPI.reflect.getClassById("net.minecraft.entity.player.EntityPlayerMP").instanceOf($$event.sender.getRef());
                if (
                    $$isPlayer
                ) {
                    (function (${callPlayerHandler.args.join(",")}) {${callPlayerHandler.code}})($$arguments, $$event.sender.getRef(), $$event.sender.getRef());
                }${this.tags.playersOnly ? "" : ` else {
                    (function (${callHandler.args.join(",")}) {${callHandler.code}})($$arguments, $$event.sender.getRef());
                }`}
                $$event.preventDefault = true;
            }
        });
    });
})();`;
    }
}
