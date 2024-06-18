  const USER = JSON.parse(localStorage.getItem("USER_DATA"));
    
  class Profile {
    constructor(config) {
      this.FIRSTNAME = config.FIRSTNAME;
      this.LASTNAME = config.LASTNAME;
      this.USER_ID = config.ID;
      this.BIRTHDATE = config.BIRTHDATE;
      this.ACCOUNT_CREATED = config.ACCOUNT_CREATED;
      this.ABOUT_SELF = config.ABOUT_SELF;
      this.BALANCE = config.ACCOUNT_BALANCE;
      this.SAVINGS = config.SAVINGS;
    }
      
    EDIT_FORM() {
      var FIRSTNAME = document.getElementById("firstname");
      var LASTNAME = document.getElementById("lastname");
      var ABOUT_SELF = document.getElementById("about-self");
        
      var WINDOW_SAVE = document.getElementById("window-save");
      var WINDOW_ALERT = document.getElementById("window-error");
        
      var NUMBER_BUT_CHARACTERS = /\d/;
      var SPECIAL_CHARACTERS = /[!@#$%^&=*(),.?":{}|<>£€¢₹¥₱°~`•√π÷×§∆«≤‹⟨⟩»≥›©®™✓[\]\\]/;
      var SHORT_SPECIAL_CHARACTERS = /[()[\]{}]/;
        
      WINDOW_SAVE.addEventListener("click", () => {
        if (FIRSTNAME.value !== this.FIRSTNAME || LASTNAME.value !== this.LASTNAME) {
          if (FIRSTNAME.value.length < 3 || LASTNAME.value.length < 3) {
            WINDOW_ALERT.innerHTML = "Name must consist of three characters or more";
          } else if (NUMBER_BUT_CHARACTERS.test(FIRSTNAME.value) || NUMBER_BUT_CHARACTERS.test(LASTNAME.value)) {
            WINDOW_ALERT.innerHTML = "Name must not consist of numbers";
          } else if (SPECIAL_CHARACTERS.test(FIRSTNAME.value) || SPECIAL_CHARACTERS.test(LASTNAME.value)) {
            WINDOW_ALERT.innerHTML = "Name must not contain a symbol"
          } else if (SHORT_SPECIAL_CHARACTERS.test(ABOUT_SELF.value)) {
            WINDOW_ALERT.innerHTML = "About must not associated with (), [], {}";
          } else {
            var TABLE = {
              EMAIL: USER.EMAIL,
              FIRSTNAME: FIRSTNAME.value.trim(),
              LASTNAME: LASTNAME.value.trim(),
              ABOUT_SELF: ABOUT_SELF.value.trim(),
              PASSWORD: USER.PASSWORD,
              BIRTHDATE: this.BIRTHDATE,
              ID: this.USER_ID,
              ACCOUNT_CREATED: this.ACCOUNT_CREATED,
              BALANCE: USER.ACCOUNT_BALANCE,
              TRANSACTIONS: USER.TRANSACTIONS,
            };
              
            localStorage.setItem("USER_DATA", JSON.stringify(TABLE));
            localStorage.setItem(USER.EMAIL, JSON.stringify(TABLE));
              
            WINDOW_ALERT.innerHTML = "Saved!";
            setTimeout(() => {
              window.location.reload()
            }, 1500);
          };
        } else {
          if (SHORT_SPECIAL_CHARACTERS.test(ABOUT_SELF.value)) {
            WINDOW_ALERT.innerHTML = "About must not associated with (), [], {}";
          } else {
            var TABLE = {
              EMAIL: USER.EMAIL,
              FIRSTNAME: FIRSTNAME.value.trim(),
              LASTNAME: LASTNAME.value.trim(),
              ABOUT_SELF: ABOUT_SELF.value.trim(),
              PASSWORD: USER.PASSWORD,
              BIRTHDATE: this.BIRTHDATE,
              ID: this.USER_ID,
              ACCOUNT_CREATED: this.ACCOUNT_CREATED,
              BALANCE: USER.ACCOUNT_BALANCE,
              TRANSACTIONS: USER.TRANSACTIONS,
            };
              
            localStorage.setItem("USER_DATA", JSON.stringify(TABLE));
            localStorage.setItem(USER.EMAIL, JSON.stringify(TABLE));
              
            WINDOW_ALERT.innerHTML = "Saved!";
            setTimeout(() => {
              window.location.reload()
            }, 1500);
          }
        }
      });
    };
      
    init() {
      this.EDIT_FORM();
      const FIRSTNAME = document.getElementById("firstname");
      const LASTNAME = document.getElementById("lastname");
      const USER_ID = document.getElementById("user-id");
      const BIRTHDATE = document.getElementById("profile-birthdate");
      const ACCOUNT_CREATED = document.getElementById("profile-account-created");
      const ABOUT_SELF = document.getElementById("about-self");
      const PESO_BALANCE = document.getElementById("profile-peso-balance");
      const DOLLAR_BALANCE = document.getElementById("profile-dollar-balance");
      const SAVINGS = document.getElementById("info-savings-text");
      const SAVINGS_PERCENTAGE = document.getElementById("piggy-indicator");
      const PIGGY_FILL = document.getElementById("piggy-fill");
      const SAVINGS_LIMIT = document.getElementById("profile-savings-limit");
        
      const PROFILE_HEADER = document.querySelector(".header-prp");
        
      const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const BIRTHDATE_SPLIT = this.BIRTHDATE.split("-");
        
      const WINDOW_WRAPPER = document.getElementById("window-wrapper");
      const WINDOW_CLOSE = document.getElementById("window-close");
      const WINDOW_MINIMIZE = document.getElementById("window-minimize");
      const WINDOW_SAVE = document.getElementById("window-save");
      const WINDOW_ALERT = document.getElementById("window-error");
        
      const EDIT_NAME_FORM = document.getElementById("edit-name-form");
        
      if (this.BALANCE) {
        var balanceString = this.BALANCE.toString();
        var balanceSplit = balanceString.split(".");
        var integerPart = balanceSplit[0];
        var decimalPart = balanceSplit[1] || ""
        var balanceInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
          if (decimalPart) {
            var balanceDecimal = decimalPart.slice(0, 2);
            var balanceValue = balanceInteger + "." + balanceDecimal;
          } else {
            var balanceValue = balanceInteger;
          }
            
        var dollarBalance = 0.017343597;
        var pesoIntoDollar = this.BALANCE * dollarBalance;
        var dollarString = pesoIntoDollar.toString();
        var dollarSplit = dollarString.split(".");
        var dollarInteger = dollarSplit[0];
        var dollarDecimal = dollarSplit[1];
          
          if (dollarDecimal) {
            var decimalDollar = dollarDecimal.slice(0, 2);
          }
          
        var integerDollar = dollarInteger.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var dollarBalanceValue = integerDollar + (decimalDollar ? "." + decimalDollar : "");
      }
        
      if (this.SAVINGS) {
        var savingString = this.SAVINGS.toString();
        var savingSplit = savingString.split(".");
        var savingsIntegerPart = savingSplit[0];
        var savingsDecimalPart = savingSplit[1];
          if (savingsDecimalPart) {
            var savingsDecimal = savingsDecimalPart.slice(0, 2);
          }
        var savingsInteger = savingsIntegerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var savings = savingsInteger + (savingsDecimal ? "." + savingsDecimal : "");
          if (this.SAVINGS > 10000) {
            var total_savings = "10,000";
            SAVINGS_LIMIT.style.display = "flex";
          } else {
            var total_savings = savings;
          }
          
        var totalSavingsValue = 10000;
        var savingsPercentage = 100;
        var partialSavings = (this.SAVINGS / totalSavingsValue * savingsPercentage).toFixed(2);
          if (partialSavings > savingsPercentage) {
            var totalSavings = savingsPercentage;
          } else {
            var totalSavings = partialSavings;
          }
        var FIXED_PERCENT = 198;
        var PERCENT_INDICATOR = totalSavings * 2;
        var PARTIAL_PERCENT = FIXED_PERCENT - PERCENT_INDICATOR;
          if (PARTIAL_PERCENT < 0) {
            var TOTAL_PERCENT = "0";
          } else {
            var TOTAL_PERCENT = PARTIAL_PERCENT;
          }
      };
        
      FIRSTNAME.value = this.FIRSTNAME;
      LASTNAME.value = this.LASTNAME;
      USER_ID.innerHTML = "#uid-" + this.USER_ID;
      BIRTHDATE.innerHTML = MONTHS[BIRTHDATE_SPLIT[1] - 1] + "&nbsp;" + BIRTHDATE_SPLIT[2] + ",&nbsp;" + BIRTHDATE_SPLIT[0];
      ACCOUNT_CREATED.innerHTML = MONTHS[this.ACCOUNT_CREATED.month - 1] + "&nbsp;" + this.ACCOUNT_CREATED.date + ",&nbsp;" + this.ACCOUNT_CREATED.year;
      ABOUT_SELF.value = this.ABOUT_SELF;
      PESO_BALANCE.innerText = this.BALANCE ? balanceValue : "0.00";
      DOLLAR_BALANCE.innerText = dollarBalanceValue ? dollarBalanceValue : "0.00";
      SAVINGS.innerText = "₱" + (total_savings ? total_savings: "0.00");
      SAVINGS_PERCENTAGE.innerText = (totalSavings ? totalSavings + "%" : "0.00");
      PIGGY_FILL.setAttribute("y2", (TOTAL_PERCENT ? TOTAL_PERCENT : "198") + "%");
        
      PROFILE_HEADER.addEventListener("click", () => {
        WINDOW_WRAPPER.style.display = "block";
      });
        
      WINDOW_CLOSE.addEventListener("click", () => {
        FIRSTNAME.value = this.FIRSTNAME;
        LASTNAME.value = this.LASTNAME;
        ABOUT_SELF.value = this.ABOUT_SELF;
        WINDOW_WRAPPER.style.display = "none";
        WINDOW_ALERT.innerHTML = "";
      });
        
      WINDOW_MINIMIZE.addEventListener("click", () => {
        WINDOW_WRAPPER.style.display = "none";
        WINDOW_ALERT.innerHTML = "";
      });
    };
  };
    
  const profile = new Profile(USER);
    
  profile.init();