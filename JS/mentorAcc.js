document.addEventListener('DOMContentLoaded', () => {

    // Prüfen, ob jemand eingeloggt ist
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
    console.log("Signed In User:", currentUser.username);
    document.getElementById('login-link').style.display = 'none'; // Login-Link ausblenden
    document.getElementById('logout-link').style.display = 'inline'; // Logout-Link anzeigen
    // Hier könntest du z.B. das Menü ändern:
    // document.getElementById('menu-bar').innerHTML += `<span>Hallo, ${currentUser.username}</span>`;
}
    
    // --- REGISTER LOGIK ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            console.log("Registration started...");

            const mentorUser = document.getElementById('username').value;
            const mail = document.getElementById('email').value;
            const mailConf = document.getElementById('email-Confirm').value;
            const pass = document.getElementById('password').value;


            if (mail !== mailConf) {
                alert("E-Mails are not the same!");
                return;
            }

            

            let mentorUsers = JSON.parse(localStorage.getItem('mentorUsers')) || [];
            
            // Kleiner Zusatz: Check ob Nutzername schon existiert
            if (mentorUsers.some(u => u.username === mentorUser)) {
                alert("Benutzername schon vergeben!");
                return;
            }

            const newMentorUser = { username: mentorUser, email: mail, password: pass };
            mentorUsers.push(newMentorUser);

            try {
                localStorage.setItem('mentorUsers', JSON.stringify(mentorUsers));
                console.log("Saved!", newMentorUser);
                alert("Registration successful!");
                window.location.href = 'mentorLogin.html';
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }
    // --- LOGIN LOGIK ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Verhindert das Neuladen der Seite

            const usernameInput = document.getElementById('username').value.toLowerCase();
            const passwordInput = document.getElementById('password').value;

            console.log("Login try:", usernameInput);

            // 1. Nutzerdaten aus dem LocalStorage abrufen
            const storedMentorUsers = JSON.parse(localStorage.getItem('mentorUsers')) || [];

            // 2. Prüfen, ob ein Nutzer mit diesen Daten existiert
            const userMentorFound = storedMentorUsers.find(u => 
                u.username.toLowerCase() === usernameInput.toLowerCase() && u.password === passwordInput
            );

            if (userMentorFound) {
                console.log("Login successful!");
                
                // 3. Den aktuell eingeloggten Nutzer speichern (für die Startseite)
                localStorage.setItem('currentUser', JSON.stringify([userMentorFound]));

                alert("Welcome back, " + userMentorFound.username + "!");

                // Weiterleitung zur Startseite (Pfad anpassen falls nötig)
                window.location.href = '../index.html'; 
            } else {
                console.warn("Login failed: User not found or wrong password.");
                alert("Username or password incorrect!");
            }
        });
    }

    // --- LOGOUT LOGIK ---
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault(); // Verhindert das Neuladen der Seite
            localStorage.removeItem('currentUser');
            alert("You have been logged out.");
            if (window.location.pathname.endsWith('index.html')) {
                window.location.reload();
            } else {
                window.location.href = '../index.html';
            }
        });
    }
});