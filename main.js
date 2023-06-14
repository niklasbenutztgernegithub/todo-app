let input = document.querySelector(".checklist-item-input")
let textinput;
const addItemButton = document.getElementById("AddItemButton")
const checklistDone = document.getElementById("checklist-done")
const checklistEmpty = document.querySelector(".checklist-item.empty")
let wowSuchEmpty = () => {
    if (checklistDone.children.length > 0) {
checklistEmpty.style.display = "none";

    } else {
        checklistEmpty.removeAttribute("style")
    };
};
let checklistItem = (text) => {
    const parser = new DOMParser();
    const { body } = parser.parseFromString(`<section class="checklist-item">
   <p class= "checklist-item-text">`+ text + `</p>
   <button class="checkbox done"></button>
   <button class="checkbox delete"></button>   
 </section>`, "text/html")
    const element = body.querySelector('body>*');
    let removeButton = element.querySelector(".checkbox.delete")
    removeButton.addEventListener("click", () => {
        if (confirm("Möchtest du folgende Notiz löschen?: " + text)) {
            element.remove()
            wowSuchEmpty()
        }
        
    }) // destroys and recreates the element
    let doneButton = element.querySelector(".checkbox.done")
    doneButton.addEventListener("click", () => {
        element.remove()
        element.classList.add("undo")
        checklistDone.prepend(element)
        wowSuchEmpty()

    })
    return element;
}

const checkliste = document.querySelector(".checklist-todo")
input.addEventListener("input", () => {
    textinput = input.value
})
addItemButton.addEventListener("click", (event) => {
    if (textinput) { checkliste.prepend(checklistItem(textinput)) }
})

