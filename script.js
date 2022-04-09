//getting inputs
const id = document.querySelector(".id")
const category = document.querySelector("#category")
const name = document.querySelector(".name")
const desc = document.querySelector("#desc")
const price = document.querySelector(".price")
const amount = document.querySelector(".amount")
const categoryInput = document.querySelector(".add_category_input")
const filterNameInput = document.getElementById("filter_name_input")

//getting fields
const positionArea = document.querySelector(".position_area")
const navArea = document.querySelector(".nav_area")
const middle = document.querySelector(".middle")
//getting buttons
const addBtn = document.querySelector(".add_btn")
const clearBtn = document.querySelector(".clear_btn")
const deleteAllBtn = document.querySelector(".delete_all_btn")
const addCategoryBtn = document.querySelector(".add_category_btn")
const discardCategoryBtn = document.querySelector(".discard_category_btn")
const deleteBtn = document.getElementsByClassName("delete_btn")
const editBtn = document.getElementsByClassName("edit_btn")
const acceptBtn = document.querySelector(".accept_changes_btn")
const discardBtn = document.querySelector(".discard_changes_btn")
const normalBtns = document.querySelectorAll(".normal")
const specialBtns = document.querySelectorAll(".special")
const createCategoryBtn = document.querySelector(".create_category_btn")
const clearFiltersBtn = document.querySelector(".clear_filters_btn")
//filter category
const divFilter = document.querySelector(".filter_category_div")
const filterCategoryInput = category.cloneNode(true)
filterCategoryInput.id = "filter_category_input"
filterCategoryInput.setAttribute("onchange", "filterCategory()")
divFilter.appendChild(filterCategoryInput)
//additional variables
let positionID = 1;
let idToEdit, categoryValue, selectedValue, selectId, row;
//price-showing variables
let totalPrice = 0;
let editedPrice = 0;
let totalAmount = 0;
let editedAmount = 0;

//functions

const addCategory = () => {
    const newCategoryInput = document.querySelector(".add_category_input").value
    if (newCategoryInput !== "") {
        let newCategory = document.createElement("option")
        newCategory.setAttribute("value", "1")
        newCategory.innerText = `${newCategoryInput}`
        category.appendChild(newCategory)
        categoryInput.value = ""
        //clone to category filter
        let newCategoryClone = newCategory.cloneNode(true)
        filterCategoryInput.appendChild(newCategoryClone)
    }
}
const discardCategory = () => {
    categoryInput.value = ""
}
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
    newPosition.setAttribute("draggable", "true")
    newPosition.setAttribute("ondragstart", "dragstart()")
    newPosition.setAttribute("ondragover", "dragover()")
    newPosition.classList.add("position")
    selectId = category.selectedIndex
    newPosition.innerHTML = `        
                <td class = "id_category">${positionID}</th>       
                <td class = "pos_category">${categoryValue}</th>
                <td class = "pos_name">${name.value}</td>
                <td class = "pos_desc">${desc.value}</td>
                <td class = "pos_amount">${amount.value}</td>
                <td class = "pos_price">${price.value}</td>
                <td class = "pos_btns">
                    <button class="edit_btn" onClick="editPosition(${positionID})" title="edytuj pozycję"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete_btn" onClick="deletePosition(${positionID})" title="usuń pozycję"><i class="fa-solid fa-trash"></i></button>
                </td>
                <td class = "select_id hidden">${selectId}</td>        
    `
    positionArea.appendChild(newPosition)
    positionID++ //zmienia ID każdej kolejnej pozycji
    totalPrice = totalPrice + Number(price.value) * Number(amount.value)
    // totalAmount = totalAmount + Number(amount.value)
    totalAmount += 1
    showPriceAndAmount()
    showNoPosMsg()
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
    showNoPosMsg()

}
const deletePosition = (positionID) => {
    const positionNotWanted = document.getElementById(positionID)
    positionArea.removeChild(positionNotWanted)
    // price correction
    const deletedPrice = positionNotWanted.querySelector(".pos_price")
    const deletedAmount = positionNotWanted.querySelector(".pos_amount")
    totalPrice = totalPrice - Number(deletedPrice.textContent) * Number(deletedAmount.textContent);
    // totalAmount = totalAmount - Number(deletedAmount.textContent);
    totalAmount--
    showPriceAndAmount()
    showNoPosMsg()
    hideButtonsWhileDelete()
    clearInputs()
}
const hideButtons = () => {
    for (let i = 0; i < normalBtns.length; i++) {
        normalBtns[i].classList.toggle("hidden")
    }
    for (let i = 0; i < specialBtns.length; i++) {
        specialBtns[i].classList.toggle("hidden")
    }
}
const hideButtonsWhileDelete = () => {
    for (let i = 0; i < specialBtns.length; i++) {
        specialBtns[i].classList.add("hidden")
    }
}
const toggleCategoryCreate = () => {
    categoryInput.classList.toggle("hidden")
    addCategoryBtn.classList.toggle("hidden")
    createCategoryBtn.classList.toggle("hidden")
    discardCategoryBtn.classList.toggle("hidden")
    navArea.classList.toggle("hidden")
    middle.classList.toggle("hidden")
    addBtn.classList.toggle("hidden")
    clearBtn.classList.toggle("hidden")
    deleteAllBtn.classList.toggle("hidden")
    let editBtns = document.getElementsByClassName("edit_btn")
    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].classList.toggle("hidden")
    }
    let deleteBtns = document.getElementsByClassName("delete_btn")

    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].classList.toggle("hidden")
    }





}
const editPosition = (positionID) => {
    let positionToEdit = document.getElementById(positionID)
    idToEdit = positionToEdit.getAttribute("id")

    //category
    const categoryToEdit = positionToEdit.querySelector(".pos_category")
    categoryValue = categoryToEdit.textContent

    let categoryId = positionToEdit.querySelector(".select_id")
    selectId = categoryId.textContent
    category.selectedIndex = selectId

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
    totalAmount = totalAmount - editedAmount + Number(amountChanged.textContent)
    clearInputs()
    hideButtons()
    showPriceAndAmount()
    showNoPosMsg()
}
const showPriceAndAmount = () => {
    document.getElementById("showedPrice").innerHTML = totalPrice.toFixed(2);
    document.getElementById("showedAmount").innerHTML = totalAmount;
}
const showNoPosMsg = () => {
    const noPosMsg = document.getElementById("no_positions_msg")
    if (totalAmount == 0) {
        noPosMsg.classList.remove("hidden")
    }
    else {
        noPosMsg.classList.add("hidden")
    }
}
function dragstart() {
    row = event.target;
}
function dragover() {
    var e = event;
    e.preventDefault();
    let children = Array.from(e.target.parentNode.parentNode.children);
    if (children.indexOf(e.target.parentNode) > children.indexOf(row))
        e.target.parentNode.after(row);
    else
        e.target.parentNode.before(row);
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0
    table = document.getElementById("table_id")
    switching = true
    dir = "asc"
    while (switching) {
        switching = false
        rows = table.rows
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false
            x = rows[i].getElementsByTagName("td")[n]
            y = rows[i + 1].getElementsByTagName("td")[n]
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true
                    break
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true
                    break
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
            switching = true
            switchcount++
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc"
                switching = true
            }
        }
    }
}
function filterName() {
    var filter, table, tr, td, txtValue
    filter = filterNameInput.value.toUpperCase()
    table = document.getElementById("table_id")
    tr = table.getElementsByClassName("position")

    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2]
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ""
            } else {
                tr[i].style.display = "none"
            }
        }
    }
}
function filterCategory() {
    var select, filter, table, tr, td, txtValue, categoryValueFilter, selectedValueFilter
    select = document.getElementById("filter_category_input")

    categoryValueFilter = filterCategoryInput.options[filterCategoryInput.selectedIndex].text
    selectedValueFilter = filterCategoryInput.value

    filter = categoryValueFilter.toUpperCase()
    table = document.getElementById("table_id")
    tr = table.getElementsByClassName("position")

    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ""
            } else {
                tr[i].style.display = "none"
            }
        }
    }
}
const clearFilters = () => {

    var filter, tr, td, txtValue

    table = document.getElementById("table_id")
    tr = table.getElementsByClassName("position")
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")
        tr[i].style.display = ""
    }

    filterCategoryInput.selectedIndex = 0
    filterNameInput.value = ""

}
/////////////////////////////////////////////////
showNoPosMsg()
showPriceAndAmount()
filterCategory()
addBtn.addEventListener("click", addPosition)
clearBtn.addEventListener("click", clearInputs)
deleteAllBtn.addEventListener("click", deleteAll)
acceptBtn.addEventListener("click", acceptChanges)
discardBtn.addEventListener("click", hideButtons)
discardBtn.addEventListener("click", clearInputs)
addCategoryBtn.addEventListener("click", addCategory)
addCategoryBtn.addEventListener("click", toggleCategoryCreate)
createCategoryBtn.addEventListener("click", toggleCategoryCreate)
discardCategoryBtn.addEventListener("click", discardCategory)
discardCategoryBtn.addEventListener("click", toggleCategoryCreate)
clearFiltersBtn.addEventListener("click", clearFilters)
