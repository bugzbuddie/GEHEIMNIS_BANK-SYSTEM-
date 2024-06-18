class DataAccount {
  constructor(config) {
    this.ELEMENT = config.ELEMENT;
    this.USER_NAME = config.ELEMENT.getElementById(USER_NAME);
    this.ABOUT_SELF = config.ELEMENT.getElementById(ABOUT_SELF);
    this.PESO_BALANCE = config.ELEMENT.getElementById(PESO_BALANCE);
    this.DOLLAR_BALANCE = config.ELEMENT.getElementById(DOLLAR_BALANCE);
    this.SAVINGS = config.ELEMENT.getElementById(SAVINGS);
    this.SAVINGS_PERCENTAGE = config.ELEMENT.getElementById(SAVINGS_PERCENTAGE);
    this.USER_ID = config.ELEMENT.getElementById(USER_ID);
    this.USER_BIRTHDATE = config.ELEMENT.getElementById(USER_BIRTHDATE);
    this.ACCOUNT_CREATED = config.ELEMENT.getElementById(ACCOUNT_CREATED);
  }
}

const ACCOUNT_DATA = localStorage.getItem("USER_DATA");
const ACCOUNT = JSON.parse(ACCOUNT_DATA);
const FOR_TRANSACTIONS = JSON.parse(localStorage.getItem(ACCOUNT.EMAIL));

class Bank extends DataAccount {
  constructor({/*FIRSTNAME, LASTNAME, ABOUT_SELF,
    ACCOUNT_BALANCE, SAVINGS,
    ID, BIRTHDATE,
    ACCOUNT_CREATED*/
    ACCOUNT, ELEMENT
  }) {
    super({ELEMENT});
    
    this.FIRSTNAME = ACCOUNT.FIRSTNAME;
    this.LASTNAME = ACCOUNT.LASTNAME;
    this.ABOUT_SELF = ACCOUNT.ABOUT_SELF;
    this.BALANCE = ACCOUNT.ACCOUNT_BALANCE;
    this.SAVINGS = ACCOUNT.SAVINGS;
    this.ID = ACCOUNT.ID;
    this.BIRTHDATE = ACCOUNT.BIRTHDATE;
    this.ACCOUNT_CREATED = ACCOUNT.ACCOUNT_CREATED;
    this.DEPOSIT_ERROR = ELEMENT.getElementById(DEPOSIT_ERROR);
  }
  
  init() {
    var months = ["January", "February", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date_string = ACCOUNT.BIRTHDATE;
    var date_split = date_string.split("-");
    
    if (this.BALANCE) {
      var balanceString = this.BALANCE.toString();
      var balanceSplit = balanceString.split(".");
          
      var balanceIntegerPart = balanceSplit[0];
      var balanceDecimalPart = balanceSplit[1] || "";
          
      var balanceInteger = balanceIntegerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (balanceDecimalPart) {
          var balanceDecimal = balanceDecimalPart.slice(0, 2);
          var balanceValue = balanceInteger + "." + balanceDecimal;
        } else {
          var balanceValue = balanceInteger;
        }
          
      var dollarBalance = 0.017343597;
      var pesoIntoDollar = dollarBalance * this.BALANCE;
          
      var numberString = pesoIntoDollar.toString();
      var split = numberString.split(".");
      var integerPart = split[0];
      var decimalPart = split[1];
      var dollarDecimal = ""; // initialize to empty string
        if (decimalPart) {
          dollarDecimal = decimalPart.slice(0, 1);
        };
      
      //var decimal = decimalPart.slice(0, 2);
      var integer = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var dollarBalanceValue = integer + (dollarDecimal ? "." + dollarDecimal : "");
    }
    
    if (this.SAVINGS) {
      var savingString = this.SAVINGS.toString();
      var savingsplit = savingString.split(".");
      var savingsPart1 = savingsplit[0]; //integer
      var savingsPart2 = savingsplit[1]; //decimal
                
      var savingsDecimal = ""; // initialize to empty string
        if (savingsPart2) {
          savingsDecimal = savingsPart2.slice(0, 1);
        }
           
      var savingsInteger = savingsPart1.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var savings = savingsInteger + (savingsDecimal ? "." + savingsDecimal : "");
        if (ACCOUNT.SAVINGS > 10000) {
          var total_savings = "10,000";
          var savings_info_ic = '&nbsp;<i style="color:red;font-size:16px;transform:translateY(-2px);" class="fa-solid fa-circle-info"></i>';
        } else {
          var total_savings = savings;
          var savings_info_ic = "";
        }
          
      var totalSavingsValue = 10000;
      var savingsPercentage = 100;
      var partialSavings = (this.SAVINGS / totalSavingsValue * savingsPercentage).toFixed(2);
        if (partialSavings > 100) {
          var totalSavings = 100;
        } else {
          var totalSavings = partialSavings;
        }
     }
     
    if (ACCOUNT) {
      USER_NAME.innerHTML = this.FIRSTNAME + "&nbsp;" + this.LASTNAME;
      PESO_BALANCE.innerText = balanceValue ? balanceValue : "0.00";
      DOLLAR_BALANCE.innerText = dollarBalanceValue ? dollarBalanceValue : "0.00";
      SAVINGS.innerHTML = '<i class="fa-solid fa-peso-sign"></i>' + (savings ? total_savings + savings_info_ic : "0");
      SAVINGS_PERCENTAGE.innerText = (totalSavings ? totalSavings : "0.00") + "%";
      PERCENTAGE_CIRCLE.style.strokeDasharray = totalSavings + "," + "100";
      USER_ID.innerText = "#uid-" + this.ID;
      USER_BIRTHDATE.innerHTML = months[date_split[1] - 2] + "&nbsp;" + date_split[2] + ",&nbsp;" + date_split[0];
      ACCOUNT_CREATED.innerHTML = `${months[this.ACCOUNT_CREATED.month - 2]}&nbsp;${this.ACCOUNT_CREATED.date},&nbsp;${this.ACCOUNT_CREATED.year}`;
      
        if (this.ABOUT_SELF === "") {
          ABOUT_SELF.innerHTML = "<b>[This user was too lazy to put something here]</b>";
        } else {
          ABOUT_SELF.innerHTML = this.ABOUT_SELF;
        }
    }
  }
}

(function () {
  const bank = new Bank({ ACCOUNT, ELEMENT: document });
  bank.init();
  
  var DEPOSIT_BUTTON = document.getElementById("deposit-btn");
  
  DEPOSIT_BUTTON.disabled = false;
  
  var WIDTH = 0;
  var PROCESS = document.getElementById("deposit-process");
  var PROGRESS = document.getElementById("progress");
  var PROGRESS_BAR = document.getElementById("progress-bar");
  var PROGRESS_INDICATOR = document.getElementById("indicator");
  
  DEPOSIT_BUTTON.addEventListener("click", () => {
    const AMOUNT = document.getElementById("deposit-balance").value;
    const AMOUNT_OR_VALUE = parseFloat(AMOUNT);
    const CARD = document.querySelector('input[name="radio-group"]:checked');
    let BALANCE = parseFloat(ACCOUNT.ACCOUNT_BALANCE);
    
    var months = ["January", "February", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var DATE = new Date();
    let TRANSACTIONS_ARRAY = FOR_TRANSACTIONS.TRANSACTIONS || [];
    var AMOUNT_STRING = AMOUNT_OR_VALUE.toString();
    var AMOUNT_SPLIT = AMOUNT_STRING.split(".");
    var AMOUNT_INTEGER = AMOUNT_SPLIT[0];
    var AMOUNT_DECIMAL = AMOUNT_SPLIT[1];
    var AMOUNT_VALUE = AMOUNT_INTEGER.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (AMOUNT_DECIMAL) {
        var AMOUNT_WITH_DECIMAL = AMOUNT_DECIMAL.slice(0, 2);
        var TRANSAC_AMOUNT = AMOUNT_VALUE + "." + AMOUNT_WITH_DECIMAL;
      } else {
        var TRANSAC_AMOUNT = AMOUNT_VALUE;
      }
      
    if (!CARD) {
      this.DEPOSIT_ERROR.innerText = "You must choose a card";
    } else if (AMOUNT < 10) {
      this.DEPOSIT_ERROR.innerText = "Amount must be greater than or equal to 10";
    } else if (AMOUNT > 1000000) {
      this.DEPOSIT_ERROR.innerText = "Amount must not be greater than 50,000";
    } else {
      DEPOSIT_BUTTON.disabled = true;
      this.DEPOSIT_ERROR.innerText = "";
      
      var TOTAL_BALANCE = BALANCE + AMOUNT_OR_VALUE;
      
      var LOADING_BAR = setInterval(PROGRESS_LOADING_BAR, 100);
      
      TRANSACTIONS_ARRAY.unshift({
        ID: ACCOUNT.ID,
        DATE: months[DATE.getMonth() - 1] + " " + DATE.getDate() + ", " + DATE.getFullYear(),
        AMOUNT: "₱" + TRANSAC_AMOUNT,
        THROUGH: "deposit",
      });
      
      var _DATA = {
        EMAIL: ACCOUNT.EMAIL,
        FIRSTNAME: ACCOUNT.FIRSTNAME,
        LASTNAME: ACCOUNT.LASTNAME,
        ABOUT_SELF: ACCOUNT.ABOUT_SELF,
        PASSWORD: ACCOUNT.PASSWORD,
        BIRTHDATE: ACCOUNT.BIRTHDATE,
        ACCOUNT_BALANCE: BALANCE ? TOTAL_BALANCE : AMOUNT_OR_VALUE,
        SAVINGS: SAVINGS ? TOTAL_BALANCE * 0.1 / 5 : AMOUNT_OR_VALUE * 0.1 / 5,
        ID: ACCOUNT.ID,
        ACCOUNT_CREATED: {
          month: ACCOUNT.ACCOUNT_CREATED.month,
          date: ACCOUNT.ACCOUNT_CREATED.date,
          year: ACCOUNT.ACCOUNT_CREATED.year,
        },
        TRANSACTIONS: TRANSACTIONS_ARRAY,
      }
        
      localStorage.setItem("USER_DATA", JSON.stringify(_DATA));
      localStorage.setItem(ACCOUNT.EMAIL, JSON.stringify(_DATA));
        
    }
  });
  
  function PROGRESS_LOADING_BAR() {
    if (WIDTH >= 100) {
      clearInterval();
      PROGRESS.style.display = "none";
      PROCESS.innerText = "Successful!!";
      setTimeout(() => {
        window.location.replace("dashboard.html");
      }, 1000);
    } else {
      PROGRESS.style.display = "block";
      WIDTH++;
      PROGRESS_BAR.style.width = WIDTH + "%";
      PROGRESS_INDICATOR.innerText = WIDTH + "%";
    }
  }
  
})();