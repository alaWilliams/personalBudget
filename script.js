import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

const addBtn = document.querySelector('.btn-add');
const nameInput = document.querySelector('.income-text');
const numberInput = document.querySelector('.income-number');
const incomeTotal = document.querySelector('.income-total');
const incomeDetails = document.querySelector('.income-details')


const toSpent = [];
const incomeArr = [];
const expensesArr = [];

const numberVal = Number(numberInput.value);
const nameVal = nameInput.value;


const showIncome = (e) => {
  e.preventDefault()
  const numberVal = Number(numberInput.value);
  const nameVal = nameInput.value;
  let item = {
    name: nameVal,
    amount: numberVal,
    id: nanoid(10),
  };
  showTotalIncome(item);
  showDetails(item);
  ;
}

const showTotalIncome = (item) => {
  incomeArr.push(item.amount);
  const sum = incomeArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  incomeTotal.innerHTML = `Income total: ${sum}`;
}

const showDetails = (item) => {
  const newIncome = incomeDetails.appendChild(document.createElement('li'));
  newIncome.textContent = `${nameInput.value} - ${numberInput.value}`;
  newIncome.setAttribute('data-id', item.id);
  //addButtons()
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

  editBtn.addEventListener('click', () => {
    if (btn.classList.contains('hidden')) {
      btn.classList.remove('hidden');
    }
    else btn.classList.add('hidden');
  })
}

addBtn.addEventListener('click', showIncome);


// const toggleButtonClass = (btn) => {
//   if (btn.classList.contains('hidden')) {
//     btn.classList.remove('hidden');
//   }
//   else btn.classList.add('hidden');
// }