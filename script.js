import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

const addIncomeBtn = document.querySelector('.btn-income-add');
const nameIncomeInput = document.querySelector('.income-text');
const numberIncomeInput = document.querySelector('.income-number');
const incomeTotal = document.querySelector('.income-total-span');
const incomeDetails = document.querySelector('.income-details');
const addExpensesBtn = document.querySelector('.btn-expenses-add');
const remainingBudget = document.querySelector('.remaining-budget')
const nameExpensesInput = document.querySelector('.expenses-text');
const numberExpensesInput = document.querySelector('.expenses-number');
const expensesTotal = document.querySelector('.expenses-total-span');
const expensesDetails = document.querySelector('.expenses-details');

 
const incomeArr = [];
const expensesArr = [];



const showTotal = (item, array, total) => {
  array.push(item.amount);
  const sum = array.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  total.innerText = sum;
}

const toggleBtnClass = (btn) => {
  if (btn.classList.contains('hidden')) {
    return btn.classList.remove('hidden');
  } else {
    return btn.classList.add('hidden');
  }
}
const toggleAllButtons = (btn1, btn2, btn3, btn4) => {
  toggleBtnClass(btn1);
  toggleBtnClass(btn2)
  toggleBtnClass(btn3);
  toggleBtnClass(btn4);
}


const showIncome = (e) => {
  e.preventDefault()
  const numberVal = Number(numberIncomeInput.value);
  const nameVal = nameIncomeInput.value;
  let item = {
    name: nameVal,
    amount: numberVal,
    id: nanoid(10),
  };
  if (nameVal === '') {
    alert('No name provided');
    return false
  } if (numberVal <= 0) {
    alert("Please provide an income amount");
    return false
  } else {
    showTotal(item, incomeArr, incomeTotal);
    showDetails(item, incomeDetails, nameIncomeInput, numberIncomeInput, incomeArr, incomeTotal);
    showToSpent(incomeArr, expensesArr);
  }
}


addIncomeBtn.addEventListener('click', showIncome);

//EXPENSES
const showExpenses = (e) => {
  e.preventDefault()
  const numberVal = Number(numberExpensesInput.value);
  const nameVal = nameExpensesInput.value;
  let item = {
    name: nameVal,
    amount: numberVal,
    id: nanoid(10),
  };
  if (nameVal === '') {
    alert("Please provide an income amount");
    return false
  } if (numberVal <= 0) {
    alert("Please provide an income amount");
    return false
  } else {
    showTotal(item, expensesArr, expensesTotal);
    showDetails(item, expensesDetails, nameExpensesInput, numberExpensesInput, expensesArr, expensesTotal);
    showToSpent(incomeArr, expensesArr);
  }
  nameExpensesInput.value = '';
  numberExpensesInput.value = '';
}

addExpensesBtn.addEventListener('click', showExpenses);

const showToSpent = (arr1, arr2) => {
 const num1 = arr1.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
 const num2 = arr2.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  if (num1 === num2) {
    remainingBudget.textContent = `Your account balance is ZERO.`;
  } if (num1 < num2) {
    remainingBudget.textContent = `Your account balance is NEGATIVE. You exceeded your budget by ${num2 - num1} PLN.`
  } if (num1 > num2) {
    remainingBudget.textContent = `You can still spend ${num1 - num2} PLN`; 
  }
};

const showDetails = (item, details, firstInput, secondInput, firstArr, total) => {
  const newItem = details.appendChild(document.createElement('li'));
  const inputField = newItem.appendChild(document.createElement('div'))
  const content = newItem.appendChild(document.createElement('p'));
  content.textContent = `${firstInput.value} - ${secondInput.value}`;
  newItem.setAttribute('data-id', item.id);
  const editBtn = newItem.appendChild(document.createElement('button'));
  editBtn.textContent = 'Edit';
  editBtn.classList.add('btn');
  editBtn.classList.add('edit-btn');
  editBtn.setAttribute('data-id', item.id);
  const deleteBtn = newItem.appendChild(document.createElement('button'));
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('btn');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.setAttribute('data-id', item.id);
  const saveBtn = newItem.appendChild(document.createElement('button'));
  saveBtn.textContent = 'Save';
  saveBtn.classList.add('btn');
  saveBtn.classList.add('save-btn');
  saveBtn.setAttribute('data-id', item.id);
  saveBtn.classList.add('hidden');
  const cancelBtn = newItem.appendChild(document.createElement('button'));
  cancelBtn.textContent = 'Cancel';
  cancelBtn.classList.add('btn');
  cancelBtn.classList.add('cancel-btn');
  cancelBtn.setAttribute('data-id', item.id);
  cancelBtn.classList.add('hidden');

  const nameInput = inputField.appendChild(document.createElement('input'));
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('placeholder', `${item.name}`);
  nameInput.setAttribute('name', 'title');
  nameInput.style.backgroundColor = 'white';
  nameInput.classList.add('hidden');
  const numInput = inputField.appendChild(document.createElement('input'));
  numInput.setAttribute('type', 'number');
  numInput.setAttribute('placeholder', `${item.amount}`);
  numInput.setAttribute('name', 'amount');
  numInput.style.backgroundColor = 'white';
  numInput.classList.add('hidden');

  

  editBtn.addEventListener('click', () => {
    toggleAllButtons(editBtn, cancelBtn, saveBtn, deleteBtn);
    content.textContent = '';
    nameInput.classList.remove('hidden');
    numInput.classList.remove('hidden');
  })

  cancelBtn.addEventListener('click', () => {
    toggleAllButtons(editBtn, cancelBtn, saveBtn, deleteBtn);
    nameInput.classList.add('hidden');
    numInput.classList.add('hidden');
    content.textContent = `${item.name} - ${item.amount}`

  })

  deleteBtn.addEventListener('click', () => {
    const index = firstArr.indexOf(item.amount);
    if (index > -1) {
      firstArr.splice(index, 1);
    };
    newItem.remove();
    const sum = firstArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    total.innerText = sum;
    showToSpent(incomeArr, expensesArr);
  })

  saveBtn.addEventListener('click', () => {
    const changeItemValue = () => {
      if (nameInput.value === '' && numInput.value !== '') {
        if (numInput.value <= 0) {
          alert('Please enter a valid amount')
        } else {
          item.amount = Number(numInput.value);
        }
        content.textContent = `${item.name} - ${item.amount}`;
        nameInput.value = '';
        numInput.value = '';
      } if (nameInput.value !=='' && numInput.value === '') {
        item.name = nameInput.value;
        content.textContent = `${item.name} - ${item.amount}`
      } if (nameInput.value !=='' && numInput.value !== '') {
        item.name = nameInput.value
        item.amount = Number(numInput.value)
        content.textContent = `${item.name} - ${item.amount}`; 
    }}
    changeItemValue();
    toggleAllButtons(editBtn, cancelBtn, saveBtn, deleteBtn);
    nameInput.classList.add('hidden');
    numInput.classList.add('hidden');
    const index = firstArr.indexOf(item.amount);
      if (index >= -1) {
        firstArr.splice(index, 1, item.amount);
      };
      const sum = firstArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
      incomeTotal.innerText = sum;
      showToSpent(incomeArr, expensesArr);
  });

  nameIncomeInput.value = '';
  numberIncomeInput.value = '';
}


