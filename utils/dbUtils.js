import { ref, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


export function deleteItem(itemID, element) {
    element.addEventListener('click', () => {
    remove(ref(db, 'shoppingList/' + itemID));
    });
}


