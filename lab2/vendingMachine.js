
const inventory = [
    { id: 1, name: "Cola", price: 1.50, stock: 5 },
    { id: 2, name: "Chips", price: 1.25, stock: 10 },
    { id: 3, name: "Chocolate", price: 2.00, stock: 7 },
    { id: 4, name: "Water", price: 1.00, stock: 12 },
    { id: 5, name: "Gummy Bears", price: 1.75, stock: 0 }
];

let userWallet = 10;
function displayInventory() {
    console.log("--- Vending Machine Inventory ---");
    inventory.forEach(item => {
    
        console.log(`ID: ${item.id} | Name: ${item.name} | Price: $${item.price.toFixed(2)} | Stock: ${item.stock}`);
    });
    console.log("-------------------------------");
}

console.log("Welcome! Here is what we have:");
displayInventory();

/*
function vend(itemId, moneyInserted) {
    const selectedItem = inventory.find(item => item.id === itemId);

    if (!selectedItem) {
        console.log("Error: Invalid selection. Please choose a valid ID.");
        return;
    }

    if (selectedItem.stock === 0) {
        console.log("Error: Sorry, this item is out of stock.");
        return;
    }

    if (moneyInserted < selectedItem.price) {
        console.log(`Error: Insufficient funds. You inserted $${moneyInserted.toFixed(2)}, but the item costs $${selectedItem.price.toFixed(2)}.`);
        return;
    }

    const change = moneyInserted - selectedItem.price;
    selectedItem.stock--;
    userWallet = userWallet - moneyInserted + change;

    console.log(`Vending... You got a ${selectedItem.name}!`);
    console.log(`Here is your change: $${change.toFixed(2)}`);
}
*/

// BU KISIMDA TEST EDECEGİZ
/*
console.log("\n--- Starting Transactions ---");
vend(1, 2.00); 
vend(2, 1.00); 
vend(99, 5.00);
vend(5, 2.00); 

console.log("\n--- Final State ---");
displayInventory();
console.log(`Final user wallet: $${userWallet.toFixed(2)}`);
*/

// BU KISIM GECİKMELİ OLAN KISIM - Asenkron `vend` Fonksiyonu
function vend(itemId, moneyInserted, callback) {
    console.log("...processing your request...");

    setTimeout(() => {
        const selectedItem = inventory.find(item => item.id === itemId);

        if (!selectedItem) {
            return callback(new Error("Invalid selection. Please choose a valid ID."), null);
        }

        if (selectedItem.stock === 0) {
            return callback(new Error("Sorry, this item is out of stock."), null);
        }

        if (moneyInserted < selectedItem.price) {
            return callback(new Error(`Insufficient funds. You inserted $${moneyInserted.toFixed(2)}, but the item costs $${selectedItem.price.toFixed(2)}.`), null);
        }

        const change = moneyInserted - selectedItem.price;
        selectedItem.stock--;
        userWallet = userWallet - moneyInserted + change;

        const result = {
            item: selectedItem,
            change: change
        };

        callback(null, result);
    }, 1000); 
}
function handleVendResult(error, result) {
    if (error) {
        console.error("VENDING ERROR: " + error.message);
    } else {
        console.log(`SUCCESS! You got a ${result.item.name}.`);
        console.log(`Your change is $${result.change.toFixed(2)}`);
    }

    console.log("\n--- Machine's Final State ---");
    displayInventory();
    console.log(`Final user wallet: $${userWallet.toFixed(2)}`);
}

// bu ksııdma gecikemlinin test kısmı 
console.log("\n--- Starting Asynchronous Transaction ---");

vend(2, 5.00, handleVendResult);

console.log("...waiting for the machine..."); 

///////////////////////////////////////////////
// --- CHALLENGE TASKS ---

// stok
function restockItem(itemId, quantity, callback) {
    console.log(`\n...restocking item ${itemId} with ${quantity} units...`);
    
    setTimeout(() => {
        const itemToRestock = inventory.find(item => item.id === itemId);

        if (!itemToRestock) {
            return callback(new Error(`Item with ID ${itemId} not found.`));
        }

        itemToRestock.stock += quantity;
        
        callback(null, itemToRestock);
    }, 1500);
}

function handleRestockResult(error, item) {
    if (error) {
        console.error("RESTOCK ERROR: " + error.message);
    } else {
        console.log(`SUCCESS! Item "${item.name}" has been restocked. New stock is ${item.stock}.`);
    }
    console.log("\n--- Inventory After Restock ---");
    displayInventory();
}

//CHALLENGE TEST BÖLÜMÜ 
// Önce envanterin ilk halı
console.log("--- Initial state before challenges ---");
displayInventory();

restockItem(5, 10, handleRestockResult);

function buyMultiple(itemsArray) {
    console.log("\n--- Attempting to buy multiple items:", itemsArray, "---");
    const totalCost = itemsArray.reduce((currentTotal, itemId) => {
        const item = inventory.find(i => i.id === itemId);
        return item ? currentTotal + item.price : currentTotal;
    }, 0); 

    console.log(`Calculated Total Cost: $${totalCost.toFixed(2)}`);

    if (totalCost > userWallet) {
        console.error("BULK BUY ERROR: Insufficient funds for this bulk purchase.");
        return;
    }
    

    userWallet -= totalCost; 
    itemsArray.forEach(itemId => {
        const item = inventory.find(i => i.id === itemId);
        if (item) item.stock--; 
    });

    console.log("SUCCESS! Bulk purchase completed.");
}

buyMultiple([1, 4, 3]);

console.log("\n--- Final State After All Operations ---");
displayInventory();
console.log(`Final user wallet: $${userWallet.toFixed(2)}`);

function applyDiscount(discountPercentage) {
    console.log(`\n--- Applying a ${discountPercentage}% discount... ---`);
    

    const discountedInventory = inventory.map(item => {
        const discountedPrice = item.price * (1 - discountPercentage / 100);
        return {
            ...item, 
            price: discountedPrice 
        };
    });

    return discountedInventory;
}

const discountedList = applyDiscount(20);
console.log("Discounted Prices List:");
discountedList.forEach(item => {
    console.log(`Name: ${item.name} | Discounted Price: $${item.price.toFixed(2)}`);
});

console.log("\nOriginal Inventory (Unchanged):");
displayInventory(); 