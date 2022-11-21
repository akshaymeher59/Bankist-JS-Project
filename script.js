'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>

<div class="movements__value">${mov}</div>
</div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};








const calcDisplayBalance = function (acc) {
  
   acc.balance=acc.movements.reduce((acc,val)=> acc+val,0);
  labelBalance.textContent=`${acc.balance} EUR`;

}




const calcDisplaySummary=function(acc){
         const incomes= acc.movements
         .filter(mov=> mov>0) 
         .reduce((acc,mov)=>mov+acc,0 );

         labelSumIn.textContent=`${incomes} $`;

         const out= acc.movements
         .filter(mov=> mov<0)
         .reduce((acc,mov)=>mov+acc,0 );
         labelSumOut.textContent=`${Math.abs(out)} $`

         const interest = acc.movements.filter(function(mov){
            return mov>0;
         }).map(deposit=> (deposit * 1.2)/100)
         .reduce((acc,int)=> acc + int,0);
         labelSumInterest.textContent= `${interest} $`;
}












const createUserName=function(accs){
   accs.forEach(function(acc)
   {
            acc.userName=acc.owner.toLowerCase().split(' ').map(function(user){
              return user[0];
             }).join("");
   })
}

createUserName(accounts);


const updateUi= function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
}





let currentAccounts;
btnLogin.addEventListener('click',function(e){
  e.preventDefault();

   currentAccounts=accounts.find(acc=>acc.userName==inputLoginUsername.value);
  
  if(currentAccounts?.pin===Number(inputLoginPin.value)){
    // 
    inputLoginUsername.value=inputLoginPin.value="";
    // inputLoginPin.blur();
    // inputLoginUsername.ariaPlaceholder="user";
    labelWelcome.textContent=`Welcome Back ${currentAccounts.owner.split(" ")[0]}`;

    containerApp.style.opacity=100;

    // displayMovements(currentAccounts.movements);
    // calcDisplayBalance(currentAccounts);
    // calcDisplaySummary(currentAccounts);
     updateUi(currentAccounts);
  
  } else {
    alert("Incorrect Username Or Password");
  }
  
});

// btnTransfer.addEventListener('click',function(e){
//   e.preventDefault();
//   const amount= Number(inputTransferAmount.value);

//   const receiverAcc = accounts.find(acc=> acc.userName=== inputTransferTo.value);

//   console.log(amount, receiverAcc);
  
// });




btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  // let currentAccounts =''
  let user = inputTransferTo.value;
  let amt = Number(inputTransferAmount.value);
 let receiverAcc= accounts.find((acc) => {
   return acc.userName == user;
 })
  
  if (amt > 0 && receiverAcc && currentAccounts.balance >= amt && receiverAcc?.userName!== currentAccounts.userName) {
    // alert('User present');
    currentAccounts.movements.push(-amt);
    receiverAcc.movements.push(amt);
    updateUi(currentAccounts);
  } else {
    alert('User not present');
  }
  // inputTransferAmount.value
})





btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const lAmount = Number(inputLoanAmount.value);
  let per = lAmount * (10 / 100);
  if (currentAccounts.movements.some(mov => mov > per)) {
    currentAccounts.movements.push(lAmount);
    updateUi(currentAccounts);
  }
})







btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // inputCloseUsername.value

  

  if (currentAccounts.userName === inputCloseUsername.value && currentAccounts.pin === Number(inputClosePin.value)) {
    let index = accounts.findIndex((acc) => {
      return acc.userName === currentAccounts.userName;
    });
  // console.log(index);
    accounts.splice(index, 1);// it removes the given index 
    // console.log(accounts);
    //  updateUi(currentAccounts);
    containerApp.style.opacity = 0;
     setTimeout(() => {
       alert('Account deleted successfully.');
     }, 1000);
  }
 
  // alert('Account deleted successfully.');
  inputCloseUsername.value = inputClosePin.value = '';
  
})















 




















// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];




/////////////////////////////////////////////////
