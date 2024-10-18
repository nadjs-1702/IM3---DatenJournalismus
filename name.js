console.log ("hallo");
// Abrufen der Daten von der PHP-Datei
fetch('nameapi.php')  // Gib hier den Pfad zur PHP-Datei an
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let labels = [];
        let kapellbruecke_wifi = [];
        let kapellbruecke = [];
        let hertensteinstrasse = [];
        let schwanenplatz = [];
        let rathausquai = [];
        let loewendenkmal = [];

        // Wir nehmen an, dass du den ersten Eintrag für den Namen und den Zähler verwenden willst
        if (data.length > 0) {
            const firstItem = data[0];

            

           // Funktion, die die Daten von der API abruft und in die HTML-Elemente einfügt
function fetchVisitorData() {
    const apiUrl = 'https://portal.alfons.io/app/devicecounter/api/sensors?api_key=3ad08d9e67919877e4c9f364974ce07e36cbdc9e';
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Speichern der API-Daten in einem Array
            locationsData = data.data;

            // Den ersten Standort anzeigen
            if (locationsData.length > 0) {
                updateDisplay(0); // Zeige den ersten Standort an
            }
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der API-Daten:', error);
        });
}

// Funktion zum Aktualisieren der Anzeige basierend auf dem aktuellen Index
function updateDisplay(index) {
    if (locationsData.length === 0) return; // Wenn keine Daten geladen wurden, abbrechen

    const currentLocation = locationsData[index];
    document.getElementById('dynamic-name').innerText = currentLocation.name;
    document.getElementById('dynamic-counter').innerText = currentLocation.counter;

    // Dynamisches Bild und Text basierend auf dem Counter-Wert festlegen
    let imagePath = "img/Wolf_1.svg"; // Standardbild für counter <= 10
    let centeredText = ""; // Text, der angezeigt wird

    if (currentLocation.counter > 200) {
        imagePath = "img/Wolf_5.svg";
        centeredText = "Oh nein! So viele Besucher an " + currentLocation.name + "!";
    } else if (currentLocation.counter > 130) {
        imagePath = "img/Wolf_4.svg";
        centeredText = "Das wird eng an " + currentLocation.name + "!";
    } else if (currentLocation.counter > 50) {
        imagePath = "img/Wolf_3.svg";
        centeredText = "Einige Besucher an " + currentLocation.name + ", aber noch okay!";
    } else if (currentLocation.counter > 10) {
        imagePath = "img/Wolf_2.svg";
        centeredText = "Es ist gemütlich an " + currentLocation.name + "!";
    } else {
        centeredText = "Wenig los an " + currentLocation.name + " – ideal für einen Besuch!";
    }

    document.getElementById('dynamic-image').src = imagePath; // Bild aktualisieren
   
}

            
              // Beim Laden der Seite die Funktion ausführen
              window.onload = fetchVisitorData;
        }

        // Daten für das Diagramm verarbeiten
        data.forEach(function(item){
            if(item.name == "Kapellbrücke Wifi"){
                labels.push(item.timestamp);
                kapellbruecke_wifi.push(item.counter);
            }
            if(item.name == "Kapellbrücke"){
                kapellbruecke.push(item.counter);
            }
            if(item.name == "Hertensteinstrasse"){
                hertensteinstrasse.push(item.counter);
            }
            if(item.name == "Schwanenplatz"){
                schwanenplatz.push(item.counter);
            }
            if(item.name == "Rathausquai"){
                rathausquai.push(item.counter);
            }
            if(item.name == "Löwendenkmal"){
                loewendenkmal.push(item.counter);
            }
        });

        console.log(labels);

        // Konfiguration des Charts
        const config = {
            type: 'line',
            data: {
                labels: labels,  // Zeitstempel als X-Achse
                datasets: [{
                    label: 'Besucherzahlen am Schwanenplatz',
                    data: schwanenplatz,  // Counter als Y-Achse
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                    tension: 0.1,  // Sorgt für leicht geschwungene Linien
                },{
                    label: 'Besucherzahlen an der Kapellbrücke Wifi',
                    data: kapellbruecke_wifi,  // Counter als Y-Achse
                    borderColor: 'rgb(95, 139, 240)',
                    backgroundColor: 'rgba(95, 139, 240, 0.2)',
                    fill: true,
                    tension: 0.1,  // Sorgt für leicht geschwungene Linien
                },{
                    label: 'Besucherzahlen an der Kapellbrücke',
                    data: kapellbruecke,  // Counter als Y-Achse
                    borderColor: 'rgb(95, 240, 117)',
                    backgroundColor: 'rgba(95, 240, 117, 0.2)',
                    fill: true,
                    tension: 0.1,  // Sorgt für leicht geschwungene Linien
                },{
                    label: 'Besucherzahlen an der Hertensteinstrasse',
                    data: hertensteinstrasse,  // Counter als Y-Achse
                    borderColor: 'rgb(240, 225, 95)',
                    backgroundColor: 'rgba(240, 225, 95, 0.2)',
                    fill: true,
                    tension: 0.1,  // Sorgt für leicht geschwungene Linien
                },{
                    label: 'Besucherzahlen bei Rathausquai',
                    data: rathausquai,  // Counter als Y-Achse
                    borderColor: 'rgb(160, 95, 240)',
                    backgroundColor: 'rgba(160, 95, 240, 0.2)',
                    fill: true,
                    tension: 0.1,  // Sorgt für leicht geschwungene Linien
                },{
                    label: 'Besucherzahlen bei dem Löwendenkmal',
                    data: loewendenkmal,  // Counter als Y-Achse
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true, 
                    tension: 0.1,  // Sorgt für leicht geschwungene Linien
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Besucherzahlen in an verscheidenen Orten in Luzern über Zeit'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,  // Y-Achse beginnt bei 0
                        suggestedMin: 0,    // Min.-Wert auf der Y-Achse
                        suggestedMax: 800,  // Dynamischer Max.-Wert basierend auf den Daten
                    }
                },
                x: {
                    type: 'time',  // Zeitliche Darstellung auf der X-Achse
                    time: {
                        unit: 'day',  // Anzeigeeinheit (hier: Tag, kann je nach Bedarf geändert werden)
                    }
                }
            }
        };

        // Initialisierung des Charts
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, config);
    })
    .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
    // Funktion, die die Daten von der API abruft und in die HTML-Elemente einfügt
    let currentIndex = 0; // Startindex
    let locationsData = []; // Hier speichern wir die Daten von der API
    
    // Funktion zum Abrufen der Daten von der API
    function fetchVisitorData() {
        const apiUrl = 'https://portal.alfons.io/app/devicecounter/api/sensors?api_key=3ad08d9e67919877e4c9f364974ce07e36cbdc9e';
    
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Speichern der API-Daten in einem Array
                locationsData = data.data;
    
                // Den ersten Standort anzeigen
                if (locationsData.length > 0) {
                    updateDisplay(currentIndex); // Zeige den ersten Standort an
                }
            })
            .catch(error => {
                console.error('Fehler beim Abrufen der API-Daten:', error);
            });
    }
    
    // Funktion zum Aktualisieren der Anzeige basierend auf dem aktuellen Index
    function updateDisplay(index) {
        if (locationsData.length === 0) return; // Wenn keine Daten geladen wurden, abbrechen
    
        const currentLocation = locationsData[index];
        document.getElementById('dynamic-name').innerText = currentLocation.name;
        document.getElementById('dynamic-counter').innerText = currentLocation.counter;
    
        // Dynamisches Bild basierend auf dem Counter-Wert festlegen
        let imagePath = "img/Wolf_1.svg"; // Standardbild für counter <= 10
        if (currentLocation.counter > 200) {
            imagePath = "img/Wolf_5.svg";
        } else if (currentLocation.counter > 130) {
            imagePath = "img/Wolf_4.svg";
        } else if (currentLocation.counter > 50) {
            imagePath = "img/Wolf_3.svg";
        } else if (currentLocation.counter > 10) {
            imagePath = "img/Wolf_2.svg";
        }
        document.getElementById('dynamic-image').src = imagePath; // Bild aktualisieren
    }
    
    // Linker Pfeil - Vorheriger Standort
    document.querySelector('.left-arrow').addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : locationsData.length - 1; // Zum vorherigen Standort
        updateDisplay(currentIndex);
    });
    
    // Rechter Pfeil - Nächster Standort
    document.querySelector('.right-arrow').addEventListener('click', function() {
        currentIndex = (currentIndex < locationsData.length - 1) ? currentIndex + 1 : 0; // Zum nächsten Standort
        updateDisplay(currentIndex);
    });
    
    // Beim Laden der Seite die Funktion ausführen
    window.onload = fetchVisitorData;
    
