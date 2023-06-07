let testinput = document.querySelector(".checklist-item-input")
let textinput
let output = document.getElementById("test-output")
const addItemButton = document.getElementById("AddItemButton")
let checklistItem = (text) => {
   const parser = new DOMParser();
   const {body} = parser.parseFromString(`<section class="checklist-item">
   <p class= "checklist-item-text">`+ text + `</p>
   <button class="checkbox done"></button>
   <button class="checkbox delete"></button>   
 </section>`, "text/html")
    const element = body.querySelector('body>*');
    let removeButton = element.querySelector(".checkbox.delete")
    removeButton.addEventListener("click", () => {
        element.remove()
    })
    return element;
}
const checkliste = document.querySelector(".checkliste")
testinput.addEventListener("input", () => {
    textinput = testinput.value
})

addItemButton.addEventListener("click", (event) => {
    console.log(textinput)
   if (textinput) {checkliste.prepend(checklistItem(textinput))}
})
