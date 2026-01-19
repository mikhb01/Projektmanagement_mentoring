document.addEventListener('DOMContentLoaded', () => {

    // Prüfen, ob jemand eingeloggt ist
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser && currentUser.length > 0) {
    const user = currentUser[0];

    console.log("Signed In User:", user.username);
    document.getElementById('login-link').style.display = 'none'; // Login-Link ausblenden
    document.getElementById('logout-link').style.display = 'inline'; // Logout-Link anzeigen
    document.getElementById('form-link').style.display = 'inline'; // Form-Link anzeigen

    const isAdmin = user.username.toLowerCase() === 'admin';
        const adminLink = document.getElementById('admin-corner');

        if (isAdmin) {
            console.log("User is Admin.");
            if (adminLink) adminLink.style.display = 'inline'; // Admin-Link im Menü anzeigen
        } else {
            // SICHERHEIT: Wenn ein Nicht-Admin auf der admin.html landet, sofort umleiten
            if (window.location.pathname.includes('admin.html')) {
                alert("Zugriff verweigert! Nur für Admins.");
                window.location.href = '../index.html';
            }
        }
    
    const mentors = JSON.parse(localStorage.getItem('mentorUsers')) || [];
    const isMentor = mentors.some(m => m.username === user.username);

    if (isMentor) {
        console.log("User is a mentor.");
        document.getElementById('winder-link').style.display = 'none'; // Mentor-Link anzeigen
        document.getElementById('form-link').style.display = 'none'; // Questionaire-Link ausblenden
        }
    

}

    // --- MENTOR SWIPING LOGIK ---
    const likeBtn = document.getElementById('like');
    const dislikeBtn = document.getElementById('dislike');

    // WICHTIG: Nur wenn die Buttons existieren (Index-Seite), wird die Logik geladen
    if (likeBtn && dislikeBtn) {
        function swipe(direction) {
            const cards = document.querySelectorAll('.swipe-card');
            if (cards.length === 1) {
                document.getElementById('mentorBoxes').style.display = 'none';
                document.getElementById('result').style.display = 'block';
            } ;

            const topCard = cards[cards.length - 1]; 
            
            if (direction === 'right') {
                window.location.href = `mentors/mentor${topCard.getAttribute('data-mentor')}.html`;
            } else {
                topCard.style.transform = 'translateX(-200px) rotate(-30deg)';
            }
            
            topCard.style.opacity = '0';

            setTimeout(() => {
                topCard.remove();
            }, 500);
        }

        likeBtn.addEventListener('click', () => swipe('right'));
        dislikeBtn.addEventListener('click', () => swipe('left'));
        console.log("Swiping-Logic loaded.");
    }

    // --- REGISTER LOGIK ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            console.log("Registration started...");

            const user = document.getElementById('username').value;
            const mail = document.getElementById('email').value;
            const mailConf = document.getElementById('email-Confirm').value;
            const pass = document.getElementById('password').value;
            const validEndingsRegex = /@stud.hs-bremen.de$/g;
            const found = mail.match(validEndingsRegex);

            if (!found) {
                alert("Please use your university email (@stud.hs-bremen.de)!");
                return;
            }

            if (mail !== mailConf) {
                alert("E-Mails are not the same!");
                return;
            }

            

            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Kleiner Zusatz: Check ob Nutzername schon existiert
            if (users.some(u => u.username === user)) {
                alert("Benutzername schon vergeben!");
                return;
            }

            const newUser = { username: user, email: mail, password: pass };
            users.push(newUser);

            try {
                localStorage.setItem('users', JSON.stringify(users));
                console.log("Saved!", newUser);
                alert("Registration successful!");
                window.location.href = 'login.html';
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
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

            // 2. Prüfen, ob ein Nutzer mit diesen Daten existiert
            const userFound = storedUsers.find(u => 
                u.username.toLowerCase() === usernameInput.toLowerCase() && u.password === passwordInput
            );

            if (userFound) {
                console.log("Login successful!");
                
                // 3. Den aktuell eingeloggten Nutzer speichern (für die Startseite)
                localStorage.setItem('currentUser', JSON.stringify([userFound]));
                
                alert("Welcome back, " + userFound.username + "!");
                
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
            } else if (window.location.pathname.includes('mentors/')) {
                window.location.href = '../../index.html';
            } else {
                window.location.href = '../index.html';
            }
        });
    }
});