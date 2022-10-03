const addBtn = document.querySelector('.btn-add');


const showIncome = (e) => {
  let nameInput = document.querySelector('.income-text-field');
  let numberInput = document.querySelector('.income-number-field');
  let nameVal = nameInput.value;
  let numberVal = numberInput.value;
  console.log(nameVal, numberVal);
  e.preventDefault();
}

addBtn.addEventListener('click', showIncome);







