class UserLogin {
  constructor(EMAIL, PASSWORD) {
    this.EMAIL = EMAIL;
    this.PASSWORD = PASSWORD;
  }
}

class Login {
  constructor(login_form, login_alert) {
    this.LOGIN_FORM = document.getElementById(login_form);
    this.LOGIN_ALERT = document.getElementById(login_alert);
    this.LOGIN_FORM.addEventListener("submit", (ev) => this.SUBMIT_LOGIN_FORM(ev));
  }
  
  SUBMIT_LOGIN_FORM(ev) {
    ev.preventDefault();
    
    const email = this.LOGIN_FORM.email.value.trim();
    const password = this.LOGIN_FORM.password.value.trim();
    
    const LOGIN_DATA = localStorage.getItem(email);
    const LOGIN_USER_DATA = JSON.parse(LOGIN_DATA);
    
    let months = ["January", "February", "April", "May", "June"];
    
    if (LOGIN_DATA == null) {
      //if the email is incorrect then toggle SHOW_ALERT method
      this.SHOW_ALERT("Invalid email");
    } else if (email == LOGIN_USER_DATA.EMAIL && password == LOGIN_USER_DATA.PASSWORD) {
      //if the email and pasword is correct then toggle SHOW_ALERT method
      this.SHOW_ALERT("Login!!");
      
      window.location.replace("dashboard.html");
      
      var LOGGEDIN_DATA = {
        EMAIL:LOGIN_USER_DATA.EMAIL,
        FIRSTNAME: LOGIN_USER_DATA.FIRSTNAME,
        LASTNAME: LOGIN_USER_DATA.LASTNAME,
        ABOUT_SELF: LOGIN_USER_DATA.ABOUT_SELF,
        PASSWORD: LOGIN_USER_DATA.PASSWORD,
        BIRTHDATE: LOGIN_USER_DATA.BIRTHDATE,
        ACCOUNT_BALANCE: LOGIN_USER_DATA.ACCOUNT_BALANCE,
        SAVINGS: LOGIN_USER_DATA.SAVINGS,
        ID: LOGIN_USER_DATA.ID,
        ACCOUNT_CREATED: {
          month: LOGIN_USER_DATA.ACCOUNT_CREATED.month,
          date: LOGIN_USER_DATA.ACCOUNT_CREATED.date,
          year: LOGIN_USER_DATA.ACCOUNT_CREATED.year,
        }
      };
      
      var USER_DATA = JSON.stringify(LOGGEDIN_DATA);
      localStorage.setItem("USER_DATA", USER_DATA);
      
      //create a local storage for what acc is currently logged
      localStorage.setItem("login", email);
      //create a local storage if there is an account that is in logged
      localStorage.setItem("isLoggedIn", "true");
      
    } else {
    //if the password is incorrect the toggle SHOW_ALERT method
      this.SHOW_ALERT("Incorrect password");
    }
  }
  
  SHOW_ALERT(ALERT) {
    this.LOGIN_ALERT.innerHTML = ALERT;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Login("login_form", "login_alert");
})