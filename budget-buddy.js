// This Class is used to create a template for the user expenses for each category and will also calculate the total expense and amount left in weekly budget.

class spending {
	constructor() {
		this.entSpending = []; //empty array to place entertainment spending
		this.foodSpending = []; //empty array to place food spending
		this.billsSpending = []; //empty array to place bills spending
		this.clothingSpending = []; //empty array to place clothing spending
	}
	// function to return sum of each category
	getSpending(selectedItem) {
		function addFun(a, b) {
			return a + b;
		}
		let sum;
		switch (selectedItem) {
			case 'ent':
				let entEl = document.querySelector('#entertainment');
				sum = this.entSpending.reduce(addFun, 0);
				entEl.textContent = `$${sum}`;
				return sum;

			case 'clothing':
				let clothingEl = document.querySelector('#clothing');
				sum = this.clothingSpending.reduce(addFun, 0);
				clothingEl.textContent = `$${sum}`;
				return sum;

			case 'bills':
				let billsEl = document.querySelector('#bills');
				sum = this.billsSpending.reduce(addFun, 0);
				billsEl.textContent = `$${sum}`;
				return sum;

			case 'food':
				let foodEl = document.querySelector('#food');
				sum = this.foodSpending.reduce(addFun, 0);
				foodEl.textContent = `$${sum}`;
				return sum;
		}
	}
	//method to get total for amount spent
	getTotalSpending() {
		let totalEl = document.querySelector('#expense-amount');
		let totalSpending =
			this.getSpending('ent') +
			this.getSpending('clothing') +
			this.getSpending('bills') +
			this.getSpending('food');
		totalEl.textContent = `$${totalSpending}`;
		return totalSpending;
	}
	// method to take weekly budget minus spending and to get what is left in the budget
	getAmountLeft() {
		let budget = document.querySelector('#weekly-budget').value;
		let remainingEl = document.querySelector('#bank-amount');
		let amountLeft = budget - this.getTotalSpending();
		remainingEl.textContent = `$${amountLeft}`;
		return amountLeft;
	}
}

// HTML Element of the nameInput of user to update h1 header with customer name.
let nameInput = document.querySelector('#name');

// Creating an object of new user
let User = new spending();

// add is the button element that submits new expense
let expense = document.querySelector('#expense');
let nameBudget = document.querySelector('#add-name-budget');

// selectItems is the dropDown Element that selects the category item element
let selectItems = document.querySelector('#categories-select');

// This warning should show a warning on the webpage if there is invalid action by user.
let nameBudgetWarning = document.querySelector('#name-budget-warning');
let categoryWarning = document.querySelector('#category-warning');

//weekly budget to use everywhere
let weeklyBudget = document.querySelector('#weekly-budget');

// This function will add the name entered by user in the page h1 element and budget into span below.
// Also checks if input was entered into name and budget inputs
// If the budget changes it will update the document

function addName(event) {
	event.preventDefault();
	let nameChange = nameInput.value;
	let weeklyBudgetValue = Number(weeklyBudget.value);
	let heading = document.querySelector('#greeting');
	let budgetEl = document.querySelector('#starting-budget');

	if (nameChange === '') {
		nameInput.classList.toggle('warning');
		nameInput.placeholder = 'Please enter your name';
		// error message goes away after 5 secs
		setTimeout(function() {
			nameInput.classList.toggle('warning');
			nameInput.placeholder = 'Enter your name';
		}, 5000);
	} else if (weeklyBudgetValue === '' || weeklyBudgetValue < 1 || isNaN(weeklyBudgetValue)) {
		weeklyBudget.classList.toggle('warning');
		weeklyBudget.value = 'Please enter a valid amount';
		// error message goes away after 5 secs
		setTimeout(function() {
			weeklyBudget.classList.toggle('warning');
			weeklyBudget.value = '';
			// weeklyBudget.placeholder = 'Enter your weekly budget';
		}, 5000);
	} else {
		nameBudgetWarning.textContent = '';
		heading.textContent = `Hello, ${nameChange}`;
		budgetEl.textContent = `Weekly Budget $${User.getAmountLeft()}`;
	}
}

//  function to get the total amount from all categories

function main(event) {
	event.preventDefault();
	// amount variable will store the amount entered as an expense
	let amountWarn = document.querySelector('.warn');
	let amountInput = document.querySelector('#amount');

	let amount = Number(amountInput.value);

	// selectedItem will store the category entered with expense amount.
	let selectedItem = selectItems.options[selectItems.selectedIndex].value;

	// If the amount entered is less than 1 or not a number it will not add or get the total.
	// Below conditional statement will check category then adds the amount expensed in in respected category
	// Also Once a new amount is added in respected category below will return new total expense of same respected category
	// It will also return the total spending across all categories.

	if (amount < 1 || isNaN(amount)) {
		amountWarn.classList.toggle('warning');
		amountWarn.innerHTML = 'Please enter a number greater than zero';
		// error message goes away after 5 secs
		setTimeout(function() {
			amountWarn.classList.toggle('warning');
			amountWarn.innerHTML = '';
		}, 5000);
	} else if (amount > User.getAmountLeft()) {
		amountWarn.classList.toggle('warning');
		amountWarn.innerHTML = 'You have insufficient funds for this purchase';
		// error message goes away after 5 secs
		setTimeout(function() {
			amountWarn.classList.toggle('warning');
			amountWarn.innerHTML = '';
		}, 5000);
	} else if (selectedItem === 'food') {
		categoryWarning.textContent = '';
		User.foodSpending.push(amount);
		User.getSpending(selectedItem);
		User.getTotalSpending();
		User.getAmountLeft();
	} else if (selectedItem === 'bills') {
		categoryWarning.textContent = '';
		User.billsSpending.push(amount);
		User.getSpending(selectedItem);
		User.getTotalSpending();
		User.getAmountLeft();
	} else if (selectedItem === 'ent') {
		categoryWarning.textContent = '';
		User.entSpending.push(amount);
		User.getSpending(selectedItem);
		User.getTotalSpending();
		User.getAmountLeft();
	} else if (selectedItem === 'clothing') {
		categoryWarning.textContent = '';
		User.clothingSpending.push(amount);
		User.getSpending(selectedItem);
		User.getTotalSpending();
		User.getAmountLeft();
	}
	amountInput.value = '';
}

// Adding an event Listener to trigger every time a user is adding new expense.
nameBudget.addEventListener('click', addName, false);
expense.addEventListener('click', main, false);