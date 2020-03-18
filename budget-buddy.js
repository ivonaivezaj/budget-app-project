// This function will add the name entered by user in the page h1 element and budget into span below. 
// Also checks if input was entered into name and budget inputs
// If the budget changes it will update the document

function addName() {
    let nameChange = nameInput.value;
    let weeklyBudgetValue = Number(weeklyBudget.value);
    let heading = document.querySelector("h1");
    let budgetEl = document.getElementById("span");

    if (nameChange === "") {
        hintEL.textContent = "Please enter your name first.";
    } else if (weeklyBudgetValue === "" || weeklyBudgetValue < 1 || isNaN(weeklyBudgetValue)) {
        hintEL.textContent = "Please enter your budget with a number bigger than 0";
    } else {
        hintEL.textContent = "";
        heading.textContent = `Hello, ${nameChange}`;
        budgetEl.textContent = `$${User.getAmountLeft()}`;
    }
}

// This Class is used to create a template for the user expenses for each category and 
// will also calculate the total expense and amount left in weekly budget. 

class spending {
    constructor() {
        this.entSpending = []; //empty array to place entertainment spending
        this.foodSpending = []; //empty array to place food spending
        this.billsSpending = []; //empty array to place bills spending
        this.clothingSpending = []; //empty array to place clothing spending
    }
    //methods to add spending for each amount and add it to assigned empty array
    addEntSpending(amount) {
        this.entSpending.push(amount);
    }

    addFoodSpending(amount) {
        this.foodSpending.push(amount);
    }

    addBillsSpending(amount) {
        this.billsSpending.push(amount);
    }

    addClothingSpending(amount) {
        this.clothingSpending.push(amount);
    }

    // function to return sum of each category
    getSpending(selectedItem) {
        function addFun(a, b) {
            return a + b;
        }
        let sum;
        switch (selectedItem) {
            case 'ent':
                let entEl = document.getElementById("entertainment");
                sum = this.entSpending.reduce(addFun, 0);
                entEl.textContent = `$${sum}`;
                return sum;
                break;
            case 'clothing':
                let clothingEl = document.getElementById("clothing");
                sum = this.clothingSpending.reduce(addFun, 0);
                clothingEl.textContent = `$${sum}`;
                return sum;
                break;
            case 'bills':
                let billsEl = document.getElementById("bills");
                sum = this.billsSpending.reduce(addFun, 0);
                billsEl.textContent = `$${sum}`;
                return sum;
                break;
            case 'food':
                let foodEl = document.getElementById("food");
                sum = this.foodSpending.reduce(addFun, 0);
                foodEl.textContent = `$${sum}`;
                return sum;
                break;
        }
    }
    //method to get total for amount spent 
    getTotalSpending() {
        let totalEl = document.getElementById("expense-amount");
        let totalSpending = this.getSpending('ent') + this.getSpending('clothing') + this.getSpending('bills') + this.getSpending('food');
        totalEl.textContent = totalSpending;
        return totalSpending;
    }
    // method to take weekly budget minus spending and get what is left in the budget
    getAmountLeft() {
        let budget = document.getElementById("weeklyBudget").value;
        let remainingEl = document.getElementById("bank-amount");
        let amountLeft = budget - this.getTotalSpending()
        remainingEl.textContent = amountLeft;
        return amountLeft;
    }

}


// HTML Element of the nameInput of user to update h1 header with customer name.
let nameInput = document.getElementById("name");

// Creating an object of new user
let User = new spending();

// add is the button element that submits new expense  
let add = document.getElementById("add");

// selectItems is the dropDown Element that selects the category item element
let selectItems = document.getElementById("category");

// This hint should show a hint on  the webpage if there is invalid action by user.  
let hintEL = document.getElementById("amountHint");

//weekly budget to use everywhere
let weeklyBudget = document.getElementById("weeklyBudget");


//  function to get the total amount from all categories

function main() {
    // amount variable will store the amount entered as an expense 
    let amountStr = document.getElementById("amount").value;
    let amount = Number(amountStr);

    // selectedItem will store the category entered with expense amount.
    let selectedItem = selectItems.options[selectItems.selectedIndex].value;


    // If the amount entered is less than 1 or not a number it will not add or get the total.
    // Below conditional statement will check category then adds the amount expensed in in respected category
    // Also Once a new amount is added in respected category below will return new total expense of same respected category
    // It will also return the total spending across all categories. 

    if (amount < 1 || isNaN(amount)) {
        hintEL.textContent = "Please Enter a number bigger than 0";
    } else if (amount > User.getAmountLeft()) {
        hintEL.textContent = "You don't have sufficient funds for this transaction"; //alert if insufficient funds
    } else if (selectedItem === 'food') {
        hintEL.textContent = "";
        User.addFoodSpending(amount);
        User.getSpending(selectedItem);
        User.getTotalSpending();
        User.getAmountLeft();
        warning();
    } else if (selectedItem === 'bills') {
        hintEL.textContent = "";
        User.addBillsSpending(amount);
        User.getSpending(selectedItem);
        User.getTotalSpending();
        User.getAmountLeft();
        warning();
    } else if (selectedItem === 'ent') {
        hintEL.textContent = "";
        User.addEntSpending(amount);
        User.getSpending(selectedItem);
        User.getTotalSpending();
        User.getAmountLeft();
        warning();
    } else if (selectedItem === 'clothing') {
        hintEL.textContent = "";
        User.addClothingSpending(amount);
        User.getSpending(selectedItem);
        User.getTotalSpending();
        User.getAmountLeft();
        warning();
    }
}
// Adding an event Listener to trigger every time a user is adding new expense.
add.addEventListener("click", main, false);