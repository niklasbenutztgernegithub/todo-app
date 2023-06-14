const input = document.querySelector(".checklist-item-input");
const addItemButton = document.getElementById("AddItemButton");
const checklistDone = document.getElementById("checklist-done");
const checklistEmpty = document.querySelector(".checklist-item.empty");
const checkliste = document.querySelector(".checklist-todo");
let textinput;


// hides/shows the "wow such empty" container

const wowSuchEmpty = () => {
    if (checklistDone.children.length > 0) {
        checklistEmpty.style.display = "none";
    } else { checklistEmpty.removeAttribute("style"); }
};


// generates a checklist item 

const checklistItem = (text) => {
    const parser = new DOMParser();
    const { body } = parser.parseFromString(`<section class="checklist-item">
   <p class= "checklist-item-text">`+ text + `</p>
   <button class="checkbox done"></button>
   <button class="checkbox delete"></button>   
 </section>`, "text/html");
    const element = body.querySelector('body>*');
    let removeButton = element.querySelector(".checkbox.delete");

    // remove the checklist element 
    removeButton.addEventListener("click", () => {
        if (confirm("Möchtest du folgende Notiz löschen?: " + text)) {
            element.remove();
            wowSuchEmpty();
        }
    });


    // destroys and recreates the element

    let doneButton = element.querySelector(".checkbox.done");
    doneButton.addEventListener("click", () => {
        element.remove();
        element.classList.add("undo");
        checklistDone.prepend(element);
        wowSuchEmpty();
    });
    return element;
};

input.addEventListener("input", () => {
    textinput = input.value;
});

addItemButton.addEventListener("click", (event) => {
    if (textinput) checkliste.prepend(checklistItem(textinput));
});
