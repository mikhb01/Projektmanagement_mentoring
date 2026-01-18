document.addEventListener('DOMContentLoaded', function() {
        renderTable();
    });

    function renderTable() {
        const tableBody = document.getElementById('tableBody');
        const stats = document.getElementById('stats');
        tableBody.innerHTML = '';
        
        let count = 0;
        
        // Alle Keys im LocalStorage durchgehen
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            
            // Nur Keys verarbeiten, die mit survey_ beginnen
            if (key.startsWith('survey_')) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    count++;

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><strong>${data.submittedBy || 'Gast'}</strong></td>
                        <td>${data.name || '-'}</td>
                        <td>${data.email || '-'}</td>
                        <td>${data.age || '-'}</td>
                        <td>${data.profession || '-'}</td>
                        <td>${data.fav1 || '-'}</td>
                        <td>${new Date(data.timestamp).toLocaleString('de-DE')}</td>
                        <td><button class="delete-btn" onclick="deleteEntry('${key}')">Löschen</button></td>
                    `;
                    tableBody.appendChild(row);
                } catch (e) {
                    console.error("Fehler beim Laden von Key: " + key, e);
                }
            }
        }

        stats.innerText = `Anzahl der Einträge: ${count}`;
        
        if (count === 0) {
            tableBody.innerHTML = '<tr><td colspan="8" style="text-align:center;">Keine Einträge gefunden.</td></tr>';
        }
    }

    function deleteEntry(key) {
        if (confirm('Diesen Eintrag wirklich löschen?')) {
            localStorage.removeItem(key);
            renderTable(); // Tabelle neu zeichnen
        }
    }