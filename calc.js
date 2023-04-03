const display = document.querySelector('.display');
console.log(display.textContent);

const num = document.querySelectorAll('.num');
num.forEach((num) => {
  num.addEventListener('click', () => {
    display.textContent += num.textContent;
  })
});

const op = document.querySelectorAll('.op');
op.forEach((op) => {
  op.addEventListener('click', () => {
    display.textContent += op.textContent;
  })
});

const del = document.querySelector('#delete');
del.addEventListener('click', () => {
  display.textContent = '';
})
