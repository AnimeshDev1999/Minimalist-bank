"use strict";

/////////////////THE MINIMILIST BACK APP/////////////////

//Test Data
const account1 = {
  owner: "Animesh Kumar",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: "Harshit Sharma",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Amit Kumar Gautam",
  movements: [200, -200, 350, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Neha Patel",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//Elements

const sideEl = document.querySelector(".side");
const balEl = document.querySelector(".amt");
const incomeEl = document.querySelector(".income");
const outEl = document.querySelector(".outgoing");
const intEl = document.querySelector(".intrst");
const loginEl = document.querySelector(".ico-loginn");
const usrEl = document.querySelector(".usr");
const passEl = document.querySelector(".pass");
const greetEl = document.querySelector(".hed-main");
const mainEl = document.querySelector(".main-sec");
const transferEl = document.querySelector(".evn-t");
const amtTraEl = document.querySelector(".t-amt");
const toTraEl = document.querySelector(".t-name");
const delUsrEl = document.querySelector(".del-usr");
const delPinEl = document.querySelector(".del-pin");
const delBtnEl = document.querySelector(".del-btn");
const loanAmtEl = document.querySelector(".loan-amt");
const loanBtnEl = document.querySelector(".loan-btn");
const sortBtnEl = document.querySelector(".sortt");

//Functions

const displayMovements = function (movements, sort = false) {
  sideEl.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const typ = mov > 0 ? "deposit" : "withdrawl";

    const html = `
    <div class="list-item">
        <div class="stts">
          <p class="${typ}">${i + 1} ${typ.toUpperCase()}</p>
          <p>TODAY</p>
        </div>
        <p>${mov}$</p>
    </div>
    `;
    sideEl.insertAdjacentHTML("afterbegin", html);
  });
};

const userGen = function (arr) {
  for (const item of arr) {
    item.userName = item.owner
      .toLowerCase()
      .split(" ")
      .map(function (nam) {
        return nam[0];
      })
      .join("");
  }
};

const calcDisplayBal = function (accs) {
  accs.balance = accs.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  balEl.textContent = `$${accs.balance}`;
};

const calcSummary = function (accs) {
  const incoming = accs.movements
    .filter(function (amt) {
      return amt > 0;
    })
    .reduce(function (itr, item) {
      return (itr = itr + item);
    }, 0);
  incomeEl.textContent = `$${incoming}`;

  const outt = accs.movements
    .filter(function (amt) {
      return amt < 0;
    })
    .reduce(function (itr, item) {
      return (itr = itr + item);
    }, 0);
  outEl.textContent = `$${Math.abs(outt)}`;

  const interests = accs.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .map(function (dep) {
      return (dep * accs.interestRate) / 100;
    })
    .filter(function (valu) {
      return valu >= 1;
    })
    .reduce(function (acc, depp) {
      return (acc = acc + depp);
    }, 0);
  intEl.textContent = `$${interests}`;
};

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBal(acc);
  calcSummary(acc);
};

// Active Functions

userGen(accounts);

// Events

let currentUser;

loginEl.addEventListener("click", function (e) {
  e.preventDefault();
  currentUser = accounts.find(function (acc) {
    return acc.userName === usrEl.value;
  });
  if (currentUser?.pin === Number(passEl.value)) {
    greetEl.textContent = `Welcome back, ${currentUser.owner.split(" ")[0]}`;
    mainEl.style.opacity = 100;
    usrEl.value = passEl.value = "";
    passEl.blur();
    updateUI(currentUser);
  }
});

transferEl.addEventListener("click", function (e) {
  e.preventDefault();
  const tAmt = Number(amtTraEl.value);
  const tName = accounts.find(function (acc) {
    return acc.userName === toTraEl.value;
  });
  amtTraEl.value = toTraEl.value = "";
  if (
    tAmt > 0 &&
    tName &&
    currentUser.balance >= tAmt &&
    tName?.userName !== currentUser.userName
  ) {
    currentUser.movements.push(-tAmt);
    tName.movements.push(tAmt);
    updateUI(currentUser);
  }
});

delBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    delUsrEl.value === currentUser.userName &&
    Number(delPinEl.value) === currentUser.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      return acc.userName === currentUser.userName;
    });
    accounts.splice(index, 1);
    mainEl.style.opacity = 0;
    delUsrEl.value = delPinEl.value = "";
    greetEl.textContent = "LogIn to continue.";
  }
});

loanBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(loanAmtEl.value);
  if (
    amount > 0 &&
    currentUser.movements.some(function (mov) {
      return mov >= amount * 0.1;
    })
  ) {
    currentUser.movements.push(amount);
    updateUI(currentUser);
  }
  loanAmtEl.value = "";
});

let sorted = false;
sortBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentUser.movements, !sorted);
  sorted = !sorted;
});
