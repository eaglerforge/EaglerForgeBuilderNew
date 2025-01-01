Array.prototype.bake = function () {
    this.originalState = structuredClone(this);
    this.modifiers = [];
    this.useDynamic = true;
    return this;
}
Array.prototype.calculate = function () {
    this.splice(0, this.length, ...this.originalState);
    this.modifiers.forEach(x=>x.apply(this, []));
    return this;
}
Array.prototype.dynamicConcat = function (datablockType, propname, interim) {
    interim ||= (x)=>x;
    this.modifiers.push(function () {
        this.push(...state.nodes.filter(x=>x.type === datablockType).map(x=>interim(x.tags[propname])));
    });
    return this;
}