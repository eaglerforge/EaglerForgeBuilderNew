# EaglerForgeBuilderNew
## [Try it here](https://eaglerforge.github.io/EaglerForgeBuilderNew/)

This is a complete rewrite and redesign of @OeildeLynx31's [eaglerforge builder](https://eaglerforge-builder.vercel.app/) [(repo)](https://github.com/OeildeLynx31/eaglerforge-builder), a tool that allows you to easily develop [Eaglercraft](https://git.eaglercraft.rip/eaglercraft/eaglercraft-1.8/src/branch/main/README.md) mods using the EaglerForge modding API.

This rewrite brings a lot of new features and changes, such as moving to a higher-level system where you add modules which you then customise. (eg: add an item and then modify it's behaviour or texture.)\
You can use blocks to write custom event handlers, which you can select in your module.

### Changes
- Now using the new [EaglerForgeInjector](https://github.com/eaglerforge/EaglerForgeInjector/) API architecture rather than [Legacy](https://github.com/eaglerforge/EaglerForge-old)
- Mods are now no longer limited to being client-side only.
- You can now easily add blocks, items, commands and recipes.
- Dark mode
- Higher-level design