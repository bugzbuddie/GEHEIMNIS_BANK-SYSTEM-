/*class Account {
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
}*/

const user = localStorage.getItem("USER_DATA");
const user_ = JSON.parse(user);

class Balance {
  constructor({FIRSTNAME, LASTNAME, ABOUT_SELF,
    ACCOUNT_BALANCE, SAVINGS,
    ID, BIRTHDATE,
    ACCOUNT_CREATED
  }) {
    this.FIRSTNAME = FIRSTNAME;
    this.LASTNAME = LASTNAME;
    this.ABOUT_SELF = ABOUT_SELF;
    this.BALANCE = ACCOUNT_BALANCE;
    this.SAVINGS = SAVINGS;
    this.ID = ID;
    this.BIRTHDATE = BIRTHDATE;
    this.ACCOUNT_CREATED = ACCOUNT_CREATED;
  }
  
  init() {
    var months = ["January", "February", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date_string = user_.BIRTHDATE;
    var date_split = date_string.split("-");
    
    var SAVINGS_BUTTON = document.getElementById("SAVINGS");
    
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
          dollarDecimal = decimalPart.slice(0, 2);
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
          savingsDecimal = savingsPart2.slice(0, 2);
        }
           
      var savingsInteger = savingsPart1.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      var savings = savingsInteger + (savingsDecimal ? "." + savingsDecimal : "");
      //var savings = "100,000";
        if (user_.SAVINGS > 10000) {
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
    
    if (user_) {
      USER_NAME.innerHTML = this.FIRSTNAME + "&nbsp;" + this.LASTNAME;
      PESO_BALANCE.innerText = balanceValue ? balanceValue : "0.00";
      DOLLAR_BALANCE.innerText = dollarBalanceValue ? dollarBalanceValue : "0.00";
      SAVINGS.innerHTML = '<i class="fa-solid fa-peso-sign"></i>' + (total_savings ? total_savings + savings_info_ic : "0.00");
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


const balance = new Balance(user_);

balance.init();