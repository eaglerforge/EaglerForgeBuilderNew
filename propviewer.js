function editObject(obj, datablock) {
    var propnav = document.querySelector("#propnav");
    propnav.innerHTML = "";

    var nameField = document.createElement("input");
    nameField.placeholder = "Datablock Name";
    nameField.type = "text";
    nameField.value = obj.name;
    nameField.addEventListener("input", ()=>{
        obj.name = nameField.value;
        datablock.loadData(obj);
    });
    propnav.appendChild(nameField);

    propnav.appendChild(document.createElement("br"));
    propnav.appendChild(document.createElement("br"));

    var keys = Object.keys(obj.tags);
    keys.forEach(k => {
        var label = document.createElement("label");
        label.innerText = k + ": ";
        propnav.appendChild(label);

        var input = document.createElement("input");
        var val = obj.tags[k];
        if (val === VALUE_ENUMS.FILE) {
            input.type = "file";
        }
        if (typeof val === "number") {
            input.type = "number";
        }
        if (typeof val === "string") {
            input.type = "text";
        }

        input.value = obj.tags[k];

        input.addEventListener("input", ()=>{
            obj.tags[k] = input.value;
            datablock.loadData(obj);
        });

        propnav.appendChild(input);

        propnav.appendChild(document.createElement("br"));
    });
}