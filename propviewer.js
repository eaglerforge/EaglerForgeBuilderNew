function editObject(obj, datablock) {
    var propnav = document.querySelector("#propnav");
    propnav.innerHTML = "";

    var nameField = document.createElement("input");
    nameField.placeholder = "Datablock Name";
    nameField.type = "text";
    nameField.value = obj.name;
    nameField.addEventListener("input", () => {
        obj.name = nameField.value || "No name";
        datablock.querySelector("h4").innerText = obj.name;
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
        if (typeof val === "number") {
            input.type = "number";
        }
        if (typeof val === "string") {
            input.type = "text";
        }

        input.value = obj.tags[k];

        if (val === VALUE_ENUMS.FILE) {
            input.type = "file";
        }

        if (val === VALUE_ENUMS.IMG) {
            input.type = "file";
            input.accept = "image/*";
        }
        console.log(obj);
        if (PRIMITIVES[obj.type].tags[k].startsWith(VALUE_ENUMS.ABSTRACT_HANDLER)) {
            input = document.createElement("select");
            var handlers = ["None"].concat(getHandlers(PRIMITIVES[obj.type].tags[k].replace(VALUE_ENUMS.ABSTRACT_HANDLER, '')));
            handlers.forEach(opt => {
                var option = document.createElement("option");
                option.value = opt;
                option.innerText = opt;
                if (opt === obj.tags[k]) {
                    option.selected = true;
                }
                input.appendChild(option);
            });
            input.classList.add("handler_select");
            input.updateHandlerList = function () {
                var val = input.value;
                input.innerHTML = "";
                var handlers = ["None"].concat(getHandlers(PRIMITIVES[obj.type].tags[k].replace(VALUE_ENUMS.ABSTRACT_HANDLER, '')));
                handlers.forEach(opt => {
                    var option = document.createElement("option");
                    option.value = opt;
                    option.innerText = opt;
                    if (opt === val) {
                        option.selected = true;
                    }
                    input.appendChild(option);
                });
            }
        }

        input.addEventListener("input", () => {
            if (input.type === "file" && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    obj.tags[k] = e.target.result;
                    editObject(obj, datablock);
                };
                reader.readAsDataURL(input.files[0]);
            } else {
                obj.tags[k] = input.value;
            }
        });

        propnav.appendChild(input);

        propnav.appendChild(document.createElement("br"));
    });
}