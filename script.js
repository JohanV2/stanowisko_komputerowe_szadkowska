//pobranie inputów
const category = document.querySelector("#category")
const name = document.querySelector(".name")
const desc = document.querySelector("#desc")
const price = document.querySelector(".price")
const amount = document.querySelector(".amount")
//pobranie pól
const listArea = document.querySelector(".list_area")
const positionArea = document.querySelector(".position_area")
//pobranie przycisków
const addBtn = document.querySelector(".add_btn")
const clearBtn = document.querySelector(".clear_btn")
const deleteAllBtn = document.querySelector(".delete_all_btn")
const deleteBtn = document.getElementsByClassName("delete_btn")
const editBtn = document.getElementsByClassName("edit_btn")
const acceptBtn = document.querySelector(".accept_changes_btn")
// const normalBtns = document.querySelectorAll(".normal")
//dodatkowe zmienne
let positionID = 0
let idToEdit;
let categoryValue;
let selectedValue;

//funkcje
const addPosition = () => {
    if (category.options[category.selectedIndex].value === "0") {
        alert("Wybierz kategorię!")
    }
    else if (name.value === "") {
        alert("Wprowadź nazwę produktu!")
    }
    else if (price.value === "") {
        alert("Wprowadź cenę produktu!")
    }
    else {
        createPosition()
        clearInputs()
    }
}
const createPosition = () => {
    const newPosition = document.createElement("div")
    newPosition.setAttribute("id", positionID)
    newPosition.classList.add("position")
    newPosition.innerHTML = `
        <p class="pos_category">${categoryValue}</p>
        <p class="pos_name">${name.value}</p>
        <p class="pos_desc">${desc.value}</p>
        <p class="pos_price">${price.value}</p>
        <p class="pos_amount">${amount.value}</p>
        <button class="delete_btn" onClick = "deletePosition(${positionID})">X</button>
        <button class="edit_btn" onClick = "editPosition(${positionID})">e</button>

    `
    positionArea.appendChild(newPosition)
    positionID++ //zmienia ID każdej kolejnej pozycji
}
const setCategory = () => {
    categoryValue = category.options[category.selectedIndex].text
    selectedValue = category.value
    console.log(selectedValue)
}
const clearInputs = () => {
    category.selectedIndex = 0
    name.value = ""
    desc.value = ""
    price.value = ""
    amount.value = "1"
    console.log(`${idToEdit} poza funkcją`)
}
const deleteAll = () => {
    positionArea.textContent = ""
}
const deletePosition = (positionID) => {
    const positionNotWanted = document.getElementById(positionID)
    positionArea.removeChild(positionNotWanted)
}

const editPosition = (positionID) => {
    let positionToEdit = document.getElementById(positionID)
    idToEdit = positionToEdit.getAttribute("id")
    //category
    const categoryToEdit = positionToEdit.querySelector(".pos_category")
    categoryValue = categoryToEdit.textContent
    category.value = selectedValue
    // category.options[category.selectedIndex].text = categoryValue

    //name
    const nameToEdit = positionToEdit.querySelector(".pos_name")
    name.value = nameToEdit.textContent
    //desc
    const descToEdit = positionToEdit.querySelector(".pos_desc")
    desc.value = descToEdit.textContent
    //price
    const priceToEdit = positionToEdit.querySelector(".pos_price")
    price.value = priceToEdit.textContent
    //amount
    const amountToEdit = positionToEdit.querySelector(".pos_amount")
    amount.value = amountToEdit.textContent
}
const acceptChanges = () => {
    //category
    const categoryToEdit = document.getElementById(idToEdit)
    const categoryChanged = categoryToEdit.querySelector(".pos_category")
    categoryChanged.textContent = categoryValue
    category.options[category.selectedIndex].text = categoryValue
    //name
    const nameToEdit = document.getElementById(idToEdit)
    const nameChanged = nameToEdit.querySelector(".pos_name")
    nameChanged.textContent = name.value
    //desc
    const descToEdit = document.getElementById(idToEdit)
    const descChanged = descToEdit.querySelector(".pos_desc")
    descChanged.textContent = desc.value
    //price
    const priceToEdit = document.getElementById(idToEdit)
    const priceChanged = priceToEdit.querySelector(".pos_price")
    priceChanged.textContent = price.value
    //amount
    const amountToEdit = document.getElementById(idToEdit)
    const amountChanged = amountToEdit.querySelector(".pos_amount")
    amountChanged.textContent = amount.value

    clearInputs()
}

addBtn.addEventListener("click", addPosition)
clearBtn.addEventListener("click", clearInputs)
deleteAllBtn.addEventListener("click", deleteAll)
acceptBtn.addEventListener("click", acceptChanges)
