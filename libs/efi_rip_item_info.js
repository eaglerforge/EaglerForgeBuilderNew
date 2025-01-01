var out = [{"id": "air", "type": "item"}].concat(Object.keys(ModAPI.items).map(x=>{return {
    id: x,
    type: "item"
}}));