const input = document.querySelector(".checklist-item-input");
const addItemButton = document.getElementById("AddItemButton");
const checklistDone = document.getElementById("checklist-done");
const checklistEmpty = document.querySelector(".checklist-item.empty");
const checkliste = document.querySelector(".checklist-todo");
let textinput;

// Read and write JSON objects to localStorage
const local = (key, value = null) => {
    //if value parameter is set, write value to local storage
    if (value != null) return localStorage[key] = JSON.stringify(value);

    //return local storage key values if set
    return localStorage?.[key] ? JSON.parse(localStorage[key]) : null;
};


const checklistItem = (text, time = Date.now()) => {
    const parser = new DOMParser();
    const { body } = parser.parseFromString(`<section id="${time}" class="checklist-item">
   <p class= "checklist-item-text">`+ text + `</p>
   <button class="checkbox done"></button>
   <button class="checkbox delete"></button>   
 </section>`, "text/html");
    const element = body.querySelector('body>*');

    // remove the checklist element on click

    let removeButton = element.querySelector(".checkbox.delete");
    removeButton.addEventListener("click", () => {
        if (confirm("Möchtest du folgende Notiz löschen?: " + text)) {
            element.remove();
            wowSuchEmpty();

            const arrayVampire = local("toDos")
            const filteredArray = arrayVampire.filter((item) => item.time != time)
            local("toDos", filteredArray);
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

// hides/shows the "wow such empty" container if no items are present

    const wowSuchEmpty = () => {
        if (checklistDone.children.length > 0) {
            checklistEmpty.style.display = "none";
        } else { checklistEmpty.removeAttribute("style"); }
    };
    
// Creates a new local storage component when there isnt one
if (!local("toDos")) local("toDos", []);

// updates the checklist if there are elements found in storage
if (local("toDos")) {
  for (const toDo of local("toDos")) {
    checkliste.prepend(checklistItem(toDo.text, toDo.time));

  }
}

// gets the input value
input.addEventListener("input", () => {
    textinput = input.value;
});

// handles the logic to add an item to the checklist
addItemButton.addEventListener("click", (event) => {
    if (textinput) {

        //adds the text from input into a new checklistItem
        const item = checklistItem(textinput)
        checkliste.prepend(item);

        // saves the textinput and time stamp into local storage
        let array = local('toDos');
        array.push({
            text: textinput,
            time: item.id
        });
        local('toDos', array);
        
        // resets the input field
        input.value = null;
    }

});
