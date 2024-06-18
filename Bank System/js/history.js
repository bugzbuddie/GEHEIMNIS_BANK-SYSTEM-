  let transactions = JSON.parse(localStorage.getItem("USER_DATA"))// || [];
  const USER_DATA = JSON.parse(localStorage.getItem(transactions.EMAIL));
    
  history();
    
  function history() {
    var table = document.createElement("table");
      if (USER_DATA.TRANSACTIONS) {  
        for (let i = 0; i < USER_DATA.TRANSACTIONS.length; i++) {
          var row = table.insertRow();
            
            if (USER_DATA.TRANSACTIONS[i].THROUGH === "withdraw") {
              var DATE = `<span style="color:red">${USER_DATA.TRANSACTIONS[i].DATE}</span>`
              var AMOUNT = `<span style="color:red">${USER_DATA.TRANSACTIONS[i].AMOUNT}</span>`
              var THROUGH = `<span style="color:red">${USER_DATA.TRANSACTIONS[i].THROUGH}</span>`;
            } else {
              var DATE = USER_DATA.TRANSACTIONS[i].DATE;
              var AMOUNT = USER_DATA.TRANSACTIONS[i].AMOUNT;
              var THROUGH = USER_DATA.TRANSACTIONS[i].THROUGH;
            }
            
          row.insertCell().innerHTML = DATE;
          row.insertCell().innerHTML = AMOUNT;
          row.insertCell().innerHTML = THROUGH;
        }
      }
    
    var headers = ["date", "amount", "through"];
    var theader = table.createTHead();
    var thead = theader.insertRow();
      
      for (let j = 0; j < headers.length; j++) {
        thead.insertCell().innerHTML = headers[j];
      }
      
    if (USER_DATA.TRANSACTIONS) {
      document.getElementById("history").append(table);
    } else {
      document.getElementById("history").innerHTML = "<span class='history_text'>There's nothing to show yet.</span>"
    }
    
  }
  //console.table(USER_DATA.TRANSACTIONS)