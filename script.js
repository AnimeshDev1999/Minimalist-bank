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

//Functions

const displayMovements = function (movements) {
  sideEl.innerHTML = "";
  movements.forEach(function (mov, i) {
    const typ = mov > 0 ? "deposit" : "withdrawl";

    const html = `
    <div class="list-item">
        <div class="stts">
          <p class="${typ}">${i + 1} ${typ.toUpperCase()}</p>
          <p>TODAY</p>
        </div>
        <p>$${mov}</p>
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

const calcDisplayBal = function (movements) {
  const balance = movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  balEl.textContent = `$${balance}`;
};

// Active Functions

// displayMovements(account1.movements);
// userGen(accounts);
// calcDisplayBal(account1.movements);
