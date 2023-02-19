"use strict";

/////////////////THE MINIMILIST BACK APP/////////////////

//Test Data
const account1 = {
  owner: "Animesh Kumar",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2022-08-10T17:01:17.194Z",
    "2022-08-14T23:36:17.929Z",
    "2022-08-16T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: "Harshit Sharma",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2019-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

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
const balSubEl = document.querySelector(".bal-sub");
const timEl = document.querySelector(".tim");
const overlayEl = document.querySelector(".overlay");
const popupEl = document.querySelector(".popup");

//Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = function (date1, date2) {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  sideEl.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const typ = mov > 0 ? "deposit" : "withdrawl";

    const date = new Date(acc.movementsDates[i]);
    const dDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="list-item">
        <div class="stts">
          <p class="${typ}">${i + 1} ${typ.toUpperCase()}</p>
          <p class="t-date">${dDate}</p>
        </div>
        <p>${formattedMov}</p>
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
  balEl.textContent = formatCur(accs.balance, accs.locale, accs.currency);
};

const calcSummary = function (accs) {
  const incoming = accs.movements
    .filter(function (amt) {
      return amt > 0;
    })
    .reduce(function (itr, item) {
      return (itr = itr + item);
    }, 0);
  incomeEl.textContent = formatCur(incoming, accs.locale, accs.currency);

  const outt = accs.movements
    .filter(function (amt) {
      return amt < 0;
    })
    .reduce(function (itr, item) {
      return (itr = itr + item);
    }, 0);
  outEl.textContent = formatCur(outt, accs.locale, accs.currency);

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
  intEl.textContent = formatCur(interests, accs.locale, accs.currency);
};

const updateUI = function (acc) {
  displayMovements(acc);
  calcDisplayBal(acc);
  calcSummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    timEl.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      greetEl.textContent = `LogIn to continue.`;
      mainEl.style.opacity = 0;
    }
    time = time - 1;
  };
  let time = 180;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

const closePopup = () => {
  popupEl.classList.add("hid");
  overlayEl.classList.add("hid");
};

// Active Functions

userGen(accounts);

// Events

let currentUser, timer;

loginEl.addEventListener("click", function (e) {
  e.preventDefault();
  currentUser = accounts.find(function (acc) {
    return acc.userName === usrEl.value;
  });
  if (currentUser?.pin === Number(passEl.value)) {
    greetEl.textContent = `Welcome back, ${currentUser.owner.split(" ")[0]}`;
    mainEl.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    // const locale = navigator.language;

    balSubEl.textContent = `As of ${new Intl.DateTimeFormat(
      currentUser.locale,
      options
    ).format(now)}`;

    usrEl.value = passEl.value = "";
    passEl.blur();
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
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
    currentUser.movementsDates.push(new Date().toISOString());
    tName.movementsDates.push(new Date().toISOString());
    updateUI(currentUser);
    clearInterval(timer);
    timer = startLogOutTimer();
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
  const amount = Math.floor(loanAmtEl.value);
  if (
    amount > 0 &&
    currentUser.movements.some(function (mov) {
      return mov >= amount * 0.1;
    })
  ) {
    setTimeout(function () {
      currentUser.movements.push(amount);
      currentUser.movementsDates.push(new Date().toISOString());
      updateUI(currentUser);
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 3000);
  }
  loanAmtEl.value = "";
  loanAmtEl.blur();
});

let sorted = false;
sortBtnEl.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentUser, !sorted);
  sorted = !sorted;
});
