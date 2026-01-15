document.addEventListener('DOMContentLoaded', () => {

    // Prüfen, ob jemand eingeloggt ist
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
    console.log("Signed In User:", currentUser.username);
    // Hier könntest du z.B. das Menü ändern:
    // document.getElementById('menu-bar').innerHTML += `<span>Hallo, ${currentUser.username}</span>`;
}
    
    // --- MENTOR SWIPING LOGIK ---
    const likeBtn = document.getElementById('like');
    const dislikeBtn = document.getElementById('dislike');

    // WICHTIG: Nur wenn die Buttons existieren (Index-Seite), wird die Logik geladen
    if (likeBtn && dislikeBtn) {
        function swipe(direction) {
            const cards = document.querySelectorAll('.swipe-card');
            if (cards.length === 0) return;

            const topCard = cards[cards.length - 1]; 
            
            if (direction === 'right') {
                topCard.style.transform = 'translateX(200px) rotate(30deg)';
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

            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;

            console.log("Login try:", usernameInput);

            // 1. Nutzerdaten aus dem LocalStorage abrufen
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

            // 2. Prüfen, ob ein Nutzer mit diesen Daten existiert
            const userFound = storedUsers.find(u => 
                u.username === usernameInput && u.password === passwordInput
            );

            if (userFound) {
                console.log("Login successful!");
                
                // 3. Den aktuell eingeloggten Nutzer speichern (für die Startseite)
                localStorage.setItem('currentUser', JSON.stringify(userFound));
                
                alert("Welcome back, " + userFound.username + "!");
                
                // Weiterleitung zur Startseite (Pfad anpassen falls nötig)
                window.location.href = '../index.html'; 
            } else {
                console.warn("Login failed: User not found or wrong password.");
                alert("Username or password incorrect!");
            }
        });
    }
});