//getting inputs
const category = document.querySelector("#category")
const name = document.querySelector(".name")
const desc = document.querySelector("#desc")
const price = document.querySelector(".price")
const amount = document.querySelector(".amount")
//getting fields
const positionArea = document.querySelector(".position_area")
//getting buttons
const addBtn = document.querySelector(".add_btn")
const clearBtn = document.querySelector(".clear_btn")
const deleteAllBtn = document.querySelector(".delete_all_btn")
const deleteBtn = document.getElementsByClassName("delete_btn")
const editBtn = document.getElementsByClassName("edit_btn")
const acceptBtn = document.querySelector(".accept_changes_btn")
const discardBtn = document.querySelector(".discard_changes_btn")
const normalBtns = document.querySelectorAll(".normal")
const specialBtns = document.querySelectorAll(".special")
//additional variables
let positionID = 0
let idToEdit = 1;
let categoryValue;
let selectedValue;
//price-showing variables
let totalPrice = 0;
let editedPrice = 0;
let totalAmount = 0;
let editedAmount = 0;

//functions
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
    const newPosition = document.createElement("tr")
    newPosition.setAttribute("id", positionID)
    newPosition.classList.add("position")
    newPosition.innerHTML = `            
                <td class = "pos_category">${categoryValue}</th>
                <td class = "pos_name">${name.value}</td>
                <td class = "pos_desc">${desc.value}</td>
                <td class = "pos_amount">${amount.value}</td>
                <td class = "pos_price">${price.value}</td>
                <td>
                    <button class="edit_btn" onClick="editPosition(${positionID})"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete_btn" onClick="deletePosition(${positionID})"><i class="fa-solid fa-trash"></i></button>
                </td>            
    `
    positionArea.appendChild(newPosition)
    positionID++ //zmienia ID każdej kolejnej pozycji
    totalPrice = totalPrice + Number(price.value) * Number(amount.value)
    totalAmount = totalAmount + Number(amount.value)
    showPriceAndAmount()
}
const setCategory = () => {
    categoryValue = category.options[category.selectedIndex].text
    selectedValue = category.value
}
const clearInputs = () => {
    category.selectedIndex = 0
    name.value = ""
    desc.value = ""
    price.value = ""
    amount.value = "1"
}
const deleteAll = () => {
    positionArea.textContent = ""
    totalPrice = 0 //price correction
    totalAmount = 0 //amount corrcetion
    showPriceAndAmount()
}
const deletePosition = (positionID) => {
    const positionNotWanted = document.getElementById(positionID)
    positionArea.removeChild(positionNotWanted)
    // price correction
    const deletedPrice = positionNotWanted.querySelector(".pos_price")
    const deletedAmount = positionNotWanted.querySelector(".pos_amount")
    totalPrice = totalPrice - Number(deletedPrice.textContent) * Number(deletedAmount.textContent);
    totalAmount = totalAmount - Number(deletedAmount.textContent);
    showPriceAndAmount()
}
const hideButtons = () => {
    for (let i = 0; i < normalBtns.length; i++) {
        normalBtns[i].classList.toggle("hidden")
    }
    for (let i = 0; i < specialBtns.length; i++) {
        specialBtns[i].classList.toggle("hidden")
    }
}
const editPosition = (positionID) => {
    let positionToEdit = document.getElementById(positionID)
    idToEdit = positionToEdit.getAttribute("id")
    //category
    const categoryToEdit = positionToEdit.querySelector(".pos_category")
    categoryValue = categoryToEdit.textContent
    category.value = selectedValue
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
    //price correction
    editedPrice = Number(price.value)
    editedAmount = Number(amount.value)
    hideButtons()
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
    //price correction
    totalPrice = totalPrice - (editedPrice * editedAmount) + Number(priceChanged.textContent) * Number(amountChanged.textContent)
    console.log(totalPrice)
    totalAmount = totalAmount - editedAmount + Number(amountChanged.textContent)
    console.log(totalPrice)
    clearInputs()
    hideButtons()
    showPriceAndAmount()
}
const showPriceAndAmount = () => {
    document.getElementById("showedPrice").innerHTML = totalPrice;
    document.getElementById("showedAmount").innerHTML = totalAmount;
}

showPriceAndAmount()
addBtn.addEventListener("click", addPosition)
clearBtn.addEventListener("click", clearInputs)
deleteAllBtn.addEventListener("click", deleteAll)
acceptBtn.addEventListener("click", acceptChanges)
discardBtn.addEventListener("click", hideButtons)
discardBtn.addEventListener("click", clearInputs)