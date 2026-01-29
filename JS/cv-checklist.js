document.addEventListener('DOMContentLoaded', () => {
        const checkboxes = document.querySelectorAll('.cv-check');
        const progressBar = document.getElementById('progress-bar');
        const headerTitle = document.querySelector('.textBox p');

        // 1. Wer ist eingeloggt?
        const currentUserRaw = localStorage.getItem('currentUser');
        let username = null; // Standardmäßig kein User

        if (currentUserRaw) {
            try {
                const userObj = JSON.parse(currentUserRaw);
                // Berücksichtigt dein Array-Format [{...}]
                username = (Array.isArray(userObj) ? userObj[0].username : userObj.username);
            } catch (e) {
                username = null;
            }
        }

        // Titel und Speicher-Key festlegen
        let storageKey = null;
        if (username) {
            storageKey = `checklist_data_${username}`;
            if (headerTitle) headerTitle.innerText = `Checkliste for ${username}: Your progress is saved.`;
        } else {
            if (headerTitle) headerTitle.innerText = "Guest Mode: Your checkboxes are not permanently saved.";
        }

        // 2. Daten laden (nur wenn eingeloggt)
        if (storageKey) {
            const savedChecks = JSON.parse(localStorage.getItem(storageKey)) || {};
            checkboxes.forEach(cb => {
                if (savedChecks[cb.id]) {
                    cb.checked = true;
                }
            });
        }

        // 3. Event-Listener für Änderungen
        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                if (storageKey) {
                    saveStatus(); // Speichern nur wenn eingeloggt
                }
                updateProgress(); // Fortschrittsbalken immer aktualisieren
            });
        });

        function saveStatus() {
            const status = {};
            checkboxes.forEach(cb => {
                status[cb.id] = cb.checked;
            });
            localStorage.setItem(storageKey, JSON.stringify(status));
            console.log("Saved for " + username);
        }

        function updateProgress() {
            const total = checkboxes.length;
            const checked = document.querySelectorAll('.cv-check:checked').length;
            const percentage = total > 0 ? (checked / total) * 100 : 0;
            if (progressBar) progressBar.style.width = percentage + '%';
        }

        // Initialen Fortschritt anzeigen
        updateProgress();
    });