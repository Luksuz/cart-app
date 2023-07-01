import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://cart-app-fff99-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const shoppingListRef = ref(db, 'shoppingList');
console.log(app)


const inputEl = document.getElementById('input-field');
const addButtonEl = document.getElementById('button');
const itemsEl = document.getElementById('items-list');


addButtonEl.addEventListener('click', () => {
    let inputValue = inputEl.value;
    push(shoppingListRef, inputValue);
});

function appendItemToDOM(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let newItem = document.createElement('li');
    newItem.textContent = itemValue;

    newItem.addEventListener('click', () => {
        remove(ref(db, 'shoppingList/' + itemID));
    })
    itemsEl.append(newItem)

}

function clearItemsfromDOM() {
    itemsEl.innerHTML = "";
}

onValue(shoppingListRef, (snapshot) => {
    if (snapshot.exists()) {
        const itemsArray = Object.entries(snapshot.val());

        clearItemsfromDOM();
        itemsArray.forEach((item) => {
            const currentItemID = item[0];
            const currentItemValue = item[1];
            appendItemToDOM(item)
        });
    }
    else {
        itemsEl.innerHTML = "Looks like the home has all the supplies!";
    }
   
});

