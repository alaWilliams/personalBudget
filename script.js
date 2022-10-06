import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

const addIncomeBtn = document.querySelector('.btn-income-add');
const nameIncomeInput = document.querySelector('.income-text');
const numberIncomeInput = document.querySelector('.income-number');
const incomeTotal = document.querySelector('.income-total');
const incomeDetails = document.querySelector('.income-details');
const addExpensesBtn = document.querySelector('.btn-expenses-add');
const remainingBudget = document.querySelector('.remaining-budget-span')
const nameExpensesInput = document.querySelector('.expenses-text');
const numberExpensesInput = document.querySelector('.expenses-number');
const expensesTotal = document.querySelector('.expenses-total');
const expensesDetails = document.querySelector('.expenses-details');


const toSpent = [];
const incomeArr = [];
const expensesArr = [];

const numberVal = Number(numberIncomeInput.value);
const nameVal = nameIncomeInput.value;


const showIncome = (e) => {
  e.preventDefault()
  const numberVal = Number(numberIncomeInput.value);
  const nameVal = nameIncomeInput.value;
  let item = {
    name: nameVal,
    amount: numberVal,
    id: nanoid(10),
  };
  showTotalIncome(item);
  showIncomeDetails(item);
  ;
}

const showTotalIncome = (item) => {
  incomeArr.push(item.amount);
  const sum = incomeArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  incomeTotal.innerHTML = `Income total: ${sum}`;
}

const showIncomeDetails = (item) => {
  const newIncome = incomeDetails.appendChild(document.createElement('li'));
  newIncome.textContent = `${nameIncomeInput.value} - ${numberIncomeInput.value}`;
  newIncome.setAttribute('data-id', item.id);
  const editBtn = newIncome.appendChild(document.createElement('button'));
  editBtn.textContent = 'Edit';
  editBtn.classList.add('btn');
  editBtn.classList.add('edit-btn');
  editBtn.setAttribute('data-id', item.id);
  const deleteBtn = newIncome.appendChild(document.createElement('button'));
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('btn');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.setAttribute('data-id', item.id);
  const saveBtn = newIncome.appendChild(document.createElement('button'));
  saveBtn.textContent = 'Save';
  saveBtn.classList.add('btn');
  saveBtn.classList.add('save-btn');
  saveBtn.setAttribute('data-id', item.id);
  saveBtn.classList.add('hidden');
  const cancelBtn = newIncome.appendChild(document.createElement('button'));
  cancelBtn.textContent = 'Cancel';
  cancelBtn.classList.add('btn');
  cancelBtn.classList.add('cancel-btn');
  cancelBtn.setAttribute('data-id', item.id);
  cancelBtn.classList.add('hidden');

   nameIncomeInput.value = '';
   numberIncomeInput.value = '';

  editBtn.addEventListener('click', () => {
    editBtn.classList.add('hidden');
    cancelBtn.classList.remove('hidden');
    saveBtn.classList.remove('hidden');
    deleteBtn.classList.add('hidden');
    newIncome.setAttribute("contenteditable", "true");
    newIncome.style.backgroundColor = "white";
    newIncome.style.border = "1px solid red"
  })

  cancelBtn.addEventListener('click', () => {
    cancelBtn.classList.add('hidden');
    editBtn.classList.remove('hidden');
    saveBtn.classList.add('hidden');
    deleteBtn.classList.remove('hidden');
    newIncome.style.border = "none";
    newIncome.style.backgroundColor = "#939597";

  })

  deleteBtn.addEventListener('click', () => {
    console.log(incomeArr);
    // console.log(item.amount);
    // incomeArr.pop(incomeArr.forEach(element => element === item.amount));
    newIncome.remove();
  })
  saveBtn.addEventListener('click', () => {
   //console.log(item);
   
  })
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
  showTotalExpenses(item);
  showExpensesDetails(item);
  ;
}

const showTotalExpenses = (item) => {
  expensesArr.push(item.amount);
  const sum = expensesArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  expensesTotal.innerHTML = `Expenses total: ${sum}`;
}

const showExpensesDetails = (item) => {
  const newExpenses = expensesDetails.appendChild(document.createElement('li'));
  newExpenses.textContent = `${nameExpensesInput.value} - ${numberExpensesInput.value}`;
  newExpenses.setAttribute('data-id', item.id);
  const editBtn = newExpenses.appendChild(document.createElement('button'));
  editBtn.textContent = 'Edit';
  editBtn.classList.add('btn');
  editBtn.classList.add('edit-btn');
  editBtn.setAttribute('data-id', item.id);
  const deleteBtn = newExpenses.appendChild(document.createElement('button'));
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('btn');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.setAttribute('data-id', item.id);
  const saveBtn = newExpenses.appendChild(document.createElement('button'));
  saveBtn.textContent = 'Save';
  saveBtn.classList.add('btn');
  saveBtn.classList.add('save-btn');
  saveBtn.setAttribute('data-id', item.id);
  saveBtn.classList.add('hidden');
  const cancelBtn = newExpenses.appendChild(document.createElement('button'));
  cancelBtn.textContent = 'Cancel';
  cancelBtn.classList.add('btn');
  cancelBtn.classList.add('cancel-btn');
  cancelBtn.setAttribute('data-id', item.id);
  cancelBtn.classList.add('hidden');

   nameExpensesInput.value = '';
   numberExpensesInput.value = '';

  editBtn.addEventListener('click', () => {
    editBtn.classList.add('hidden');
    cancelBtn.classList.remove('hidden');
    saveBtn.classList.remove('hidden');
    deleteBtn.classList.add('hidden');
    newExpenses.setAttribute("contenteditable", "true");
    newExpenses.style.backgroundColor = "white";
    newExpenses.style.border = "1px solid red"
  })

  cancelBtn.addEventListener('click', () => {
    cancelBtn.classList.add('hidden');
    editBtn.classList.remove('hidden');
    saveBtn.classList.add('hidden');
    deleteBtn.classList.remove('hidden');
    newExpenses.style.border = "none";
    newExpenses.style.backgroundColor = "#939597";

  })

  deleteBtn.addEventListener('click', () => {
    console.log(incomeArr);
    // console.log(item.amount);
    // incomeArr.pop(incomeArr.forEach(element => element === item.amount));
    newExpenses.remove();
  })
  saveBtn.addEventListener('click', () => {
   //console.log(item);
   
  })
}

addExpensesBtn.addEventListener('click', showExpenses);

const showToSpent = () => {
  
}