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

// const toggleBtnClass = (btn) => {
//   if (btn.classList.contains('hidden')) {
//     return btn.classList.remove('hidden');
//   } else {
//     return btn.classList.add('hidden');
//   }
// }
// const toggleAllButtons = (btn1, btn2, btn3, btn4) => {
//   toggleBtnClass(btn1);
//   toggleBtnClass(btn2)
//   toggleBtnClass(btn3);
//   toggleBtnClass(btn4);
// }

const toggleClass = (element) => {
  if (element.classList.contains('hidden')) {
    return element.classList.remove('hidden');
  } else {
    return element.classList.add('hidden');
  }
}
const toggleAllButtons = (btn1, btn2, btn3, btn4) => {
  toggleClass(btn1);
  toggleClass(btn2)
  toggleClass(btn3);
  toggleClass(btn4);
}

const inputToggle = (input1, input2) => {
  toggleClass(input1);
  toggleClass(input2);
}

const showIncomeDetails = (item) => {
  const newIncome = incomeDetails.appendChild(document.createElement('li'));
  const inputField = newIncome.appendChild(document.createElement('div'))
  const content = newIncome.appendChild(document.createElement('p'));
  content.textContent = `${nameIncomeInput.value} - ${numberIncomeInput.value}`;
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
    inputToggle(nameInput, numInput);
  })

  cancelBtn.addEventListener('click', () => {
    toggleAllButtons(editBtn, cancelBtn, saveBtn, deleteBtn);
    inputToggle(nameInput, numInput);
    content.textContent = `${item.name} - ${item.amount}`

  })

  deleteBtn.addEventListener('click', () => {
    const index = incomeArr.indexOf(item.amount);
    if (index > -1) {
      incomeArr.splice(index, 1);
    };
    newIncome.remove();
    const sum = incomeArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    incomeTotal.innerText = sum;
    showToSpent(incomeArr, expensesArr);
  })

  saveBtn.addEventListener('click', () => {
    const changeItemValue = () => {
      if (nameInput.value === '' && numInput.value !== '') {
        item.amount = Number(numInput.value);
        content.textContent = `${item.name} - ${item.amount}`;
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
    inputToggle(nameInput, numInput);
    const index = incomeArr.indexOf(item.amount);
      if (index >= -1) {
        incomeArr.splice(index, 1, item.amount);
      };
      const sum = incomeArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
      incomeTotal.innerText = sum;
      showToSpent(incomeArr, expensesArr);
  });

  nameIncomeInput.value = '';
  numberIncomeInput.value = '';
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
    alert("Please provide an income name");
    return false
  } if (numberVal === '' || numberVal === 0) {
    alert("Please provide an income amount");
    return false
  } else {
    showTotal(item, incomeArr, incomeTotal);
    showIncomeDetails(item);
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
  showTotal(item, expensesArr, expensesTotal);
  showExpensesDetails(item);
  showToSpent(incomeArr, expensesArr);
}

const showExpensesDetails = (item) => {
  const newExpenses = expensesDetails.appendChild(document.createElement('li'));
  const content = newExpenses.appendChild(document.createElement('p'))
  const inputField = newExpenses.appendChild(document.createElement('div'))
  content.textContent = `${nameExpensesInput.value} - ${numberExpensesInput.value}`;
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

   nameExpensesInput.value = '';
   numberExpensesInput.value = '';

  editBtn.addEventListener('click', () => {
    toggleAllButtons(editBtn, cancelBtn, saveBtn, deleteBtn);
    content.textContent = '';
    inputToggle(nameInput, numInput);
  })

  cancelBtn.addEventListener('click', () => {
    toggleAllButtons(editBtn, cancelBtn, saveBtn, deleteBtn);
    inputToggle(nameInput, numInput);
    content.textContent = `${item.name} - ${item.amount}`;
  
  })

  deleteBtn.addEventListener('click', () => {
    const index = expensesArr.indexOf(item.amount);
    if (index >= -1) {
      expensesArr.splice(index, 1);
    };
    newExpenses.remove();
    const sum = expensesArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    expensesTotal.innerText = sum;
    showToSpent(incomeArr, expensesArr);
  })

  saveBtn.addEventListener('click', () => {
    const changeItemValue = () => {
      if (nameInput.value === '' && numInput.value !== '') {
        item.amount = Number(numInput.value);
        content.textContent = `${item.name} - ${item.amount}`;
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
    inputToggle(nameInput, numInput);
    const index = expensesArr.indexOf(item.amount);
    if (index >= -1) {
      expensesArr.splice(index, 1, Number(numInput.value));
    };
    const sum = expensesArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    expensesTotal.innerText = sum;
    showToSpent(incomeArr, expensesArr);
  })
  
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