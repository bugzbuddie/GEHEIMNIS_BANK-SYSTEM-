class User {
  constructor({
    EMAIL, FIRSTNAME,
    LASTNAME, ABOUT_SELF,
    PASSWORD, BIRTHDATE,
    //ACCOUNT_BALANCE, SAVINGS,
    ID, ACCOUNT_CREATED
    }) {
    this.EMAIL = EMAIL;
    this.FIRSTNAME = FIRSTNAME;
    this.LASTNAME = LASTNAME;
    this.ABOUT_SELF = ABOUT_SELF;
    this.PASSWORD = PASSWORD;
    this.BIRTHDATE = BIRTHDATE;
    /*this.ACCOUNT_BALANCE = ACCOUNT_BALANCE;
    this.SAVINGS = SAVINGS;*/
    this.ID = ID;
    this.ACCOUNT_CREATED = ACCOUNT_CREATED;
  }
  
  //validate the EMAIL
  EMAIL_VALIDATION() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(this.EMAIL);
  }
  
  //validate the PASSWORD
  PASSWORD_VALIDATION() {
    return this.PASSWORD.length >= 6;
  }
  
}

class Signup {  
  constructor(signup_form, signup_alert) {
    this.FORM = document.getElementById(signup_form);
    this.ALERT = document.getElementById(signup_alert);
    this.FORM.addEventListener("submit", (e) => this.SUBMIT_FORM(e));
  }
  
  FORM_VALIDATION(USER) {
    if (!USER.EMAIL_VALIDATION()) {
      return "Invalid email";
    } else if (!isNaN(USER.FIRSTNAME) || USER.FIRSTNAME.length < 3 || !isNaN(USER.LASTNAME) || USER.LASTNAME.length < 3) {
      return "!Name=number or !Name<3";
    } else if (!USER.PASSWORD_VALIDATION()) {
      return "Password>=6";
    } else if (USER.BIRTHDATE === "") {
      return "!Birthday=empty";
    } else {
      return "valid";
    }
  }
  
  SUBMIT_FORM(e) {
    e.preventDefault();
    
    //const email2 = this.FORM.EMAIL;
    const email = this.FORM.email.value.trim();
    const firstname = this.FORM.firstname.value.trim();
    const lastname = this.FORM.lastname.value.trim();
    const password = this.FORM.password.value.trim();
    const about_self = this.FORM.about_self.value.trim();
    const birthdate = this.FORM.birthdate.value;
    
    const id = Math.random().toString(16).substring(2);
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    
    const userData = {
      EMAIL: email,
      FIRSTNAME: firstname,
      LASTNAME: lastname,
      ABOUT_SELF: about_self,
      PASSWORD: password,
      BIRTHDATE: birthdate,
      ID: id,
      ACCOUNT_CREATED: {
        month: month,
        date: day,
        year: year
      }
    };
    
    const USER = new User(userData);
    
    //let USER_FORM_DATA = USER;
    
    let USER_FORM = this.FORM_VALIDATION(USER);
    
      switch (USER_FORM) {
        case "valid":
        this.SHOW_ALERT("Account created");
        
        let USER_DATA = JSON.stringify(USER);
        localStorage.setItem(email, USER_DATA);
        
        window.location.replace("login.html");
        break;
        case "Invalid email ":
          this.SHOW_ALERT("Invalid email");
          break;
        case "!Name=number or !Name<3":
          this.SHOW_ALERT("Name must not be a number or less than three characters");
          break;
        case "Password>=6":
          this.SHOW_ALERT("Password must be longer than five characters");
          break;
        case "!Birthday=empty":
          this.SHOW_ALERT("Birthday must not be empty");
          break;
        default:
        this.SHOW_ALERT("Unexpected has occurred");
      }
  }
  
  SHOW_ALERT(ALERT_MESSAGE) {
    this.ALERT.innerText = ALERT_MESSAGE;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Signup("signup_form", "signup_alert");
})