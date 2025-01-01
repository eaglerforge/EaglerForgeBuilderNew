var arrayList = ModAPI.reflect.getClassByName("ArrayList").constructors[0]();
var vs = Object.values(ModAPI.blocks);
var vsRaw = Object.values(ModAPI.blocks).map(x=>x.getRef());
var ks = Object.keys(ModAPI.blocks);
vs.forEach(x=>{
    var itemblock = ModAPI.util.getItemFromBlock(x.getRef());
    x.getSubBlocks(itemblock, null, arrayList);
});

arrayList = ModAPI.util.wrap(arrayList).getCorrective();
var out = [];
arrayList.array.forEach((x)=>{
    try{
        var l10n = ModAPI.util.ustr(x?.getUnlocalizedName()?.getRef() ?? ModAPI.util.str("")).slice("5").split(".");
        out.push({
            name: l10n[l10n.length - 1],
            meta: x.itemDamage,
            id: ks[vsRaw.indexOf(ModAPI.util.getBlockFromItem(x.item.getRef()))],
            type: "block"
        });
    } catch(e) {

    }
    
});