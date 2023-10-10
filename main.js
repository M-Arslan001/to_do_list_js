const adduserbtn = document.getElementById("adduser");
const btnText = adduserbtn.innerText;

const adduserTextfield = document.getElementById("username");

const recordDisplay = document.getElementById("re-display");

let userArray = [];

let edit_id = null;

let obj = localStorage.getItem("users");

if (obj != null) {
  userArray = JSON.parse(obj);
}
displayInfo();

function handleUserInput() {
  const name = adduserTextfield.value.trim();

  if (name === "") {
    alert("Please Enter The Name");
    return;
  }
  if (edit_id != null) {
    userArray.splice(edit_id, 1, { name: name });
    edit_id = null;
    //edit
  } else {
    userArray.push({ name: name }); ///this is for to store the object in array
    //insert
  }

  saveInfo(userArray);
  adduserTextfield.value = "";

  displayInfo();

  adduserbtn.innerText = btnText;
}

function saveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem("users", str);
}

function displayInfo() {
  let statement = "";
  userArray.forEach((user, i) => {
    statement += `<tr>
 <th scope="row">${i + 1}</th>
 <td>${user.name}</td>
 <td> <i class=" btn fa-regular fa-pen-to-square btn-info  mx-2" onclick='editInfo(${i})'></i> <i
         class=" btn fa-solid fa-trash-can btn-danger" onclick='deleteInfo(${i})'></i></td>

</tr>`;
  });
  recordDisplay.innerHTML = statement;
}

function editInfo(id) {
  edit_id = id;
  adduserTextfield.value = userArray[id].name;
  adduserbtn.innerText = "save change";
}

function deleteInfo(id) {
  userArray.splice(id, 1);
  saveInfo(userArray);
  displayInfo();
}

// Event listener for enter key press
adduserTextfield.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleUserInput();
  }
});
// Event listener for button click
adduserbtn.addEventListener("click", () => {
  handleUserInput();
});
