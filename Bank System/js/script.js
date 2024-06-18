//Started
//Date: May 10, 2024 15:28
//Continued
//Date: May 25, 2024 14:15
//Ended
//Date: June 18, 2024 14:54

    (function() {
        
        const sideMenu = document.querySelector('aside');
        const menuBtn = document.getElementById('menu-btn');
        const closeBtn = document.getElementById('close-btn');
        const home = document.getElementById('home');
        const deposit = document.getElementById('deposit');
        const withdraw = document.getElementById('withdraw');
        const logout = document.getElementById('logout');
        
        const toggle_section = document.querySelector('.toggle');
        const sidebar_section = document.querySelector('.sidebar');
        
        if(menuBtn) {
            menuBtn.addEventListener('click', () => {
                sideMenu.classList.toggle('toggle'); 
            });
        }
        
            home.addEventListener('click', () => {
                home.classList.add('active');
                deposit.classList.remove('active');
                withdraw.classList.remove('active');
            })
        
            deposit.addEventListener('click', () => {
                deposit.classList.add('active');
                home.classList.remove('active');
                withdraw.classList.remove('active');
            })
        
            withdraw.addEventListener('click', () => {
                withdraw.classList.add('active');
                home.classList.remove('active');
                deposit.classList.remove('active')
            })
        
            logout.addEventListener('click', () => {
               logout.classList.add('active');
               home.classList.remove('active');
               deposit.classList.remove('active');
               withdraw.classList.remove('active');
            })
        
    })();
    
      function logout() {
            localStorage.removeItem("login");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("USER_DATA");
            window.location.replace("login.html");
      }