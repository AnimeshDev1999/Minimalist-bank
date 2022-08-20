# The Minimalist Bank (M-Bank) (Webapp)

The Minimalist Bank (M-Bank) is a powerful javascript based web application and a solo project built down from scratch to showcase the power of **javascript's data structures** and the **DOM manipulation**.

The M-Bank web app is the part of the connected project website for the same which is under development. the M-Bank web app will be added to the M-bank commercial website (which is yet another project to showcase the power of **DOM manipulation**) as an option for the users if they wish to try out the app.

## How to use ?

The app, for now has two dummy accounts that you can use to play around and explore the functionality (check the features section below)

    Account 1 :
        User id : ak
        User PIN : 1111

    Account 2 :
        User id : hs
        User PIN : 2222

## Features

The M-Bank app contains the following features :

- Dynamic UI components

  - Login greeting with name
  - Real time transaction track
  - Inactivity timer
  - Working transfers
  - Working loan requests
  - Transaction sorting
  - Auto logout on inactivity
  - "As of" shows the updated date
  - Working account deletion
  - Transactions up to a week will show "Days ago" or "Today"

- Other features :

  - The loan can only be granted if account have at lest one positive transaction and loan amount is determined on the percentage of the biggest transaction

  - Interest rates may be different for different users

  - Different accounts may have different currency and display format

## The account objects for geeks

    Account Object 1 :
        account1 = {
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
        userName: "ak",
        balance: 3840,
        };

    Account Object 2 :
        account2 = {
        owner: "Harshit Sharma",
        movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
        interestRate: 1.5,
        pin: 2222,
        movementsDates: [
            "2019-11-18T21:31:17.178Z",
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
        userName: "hs",
        balance: 11720,
        };

## Technologies used

The website was made 100% from scratch on VS-Code by me. Creation of website includes the following languages :

- HTML5
- CSS3
- Javascript (ES6+)

## Resources used

The resources used in the making of the website are from the following sources :

- Fonts : Poppins from google fonts
- Logo : Squarespace logo maker
