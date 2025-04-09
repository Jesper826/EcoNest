function updateLDRStatus() {
    const ldrValueElement = document.getElementById("ldrValue");
    ldrValueElement.className = "loading"; // Voeg de 'loading'-klasse toe

    GetData().then(data => {
        if (data && data.ldr !== null) {
            const ldrValue = data.ldr; // Haal de LDR-waarde op uit de JSON
            ldrValueElement.textContent = `Lichtintensiteit: ${ldrValue}`;
            ldrValueElement.className = ""; // Verwijder de 'loading'-klasse
        } else {
            console.error("Kon geen LDR-gegevens ophalen.");
            ldrValueElement.textContent = "LDR-status niet beschikbaar.";
            ldrValueElement.className = "error"; // Voeg de 'error'-klasse toe
        }
    }).catch(error => {
        console.error("Fout bij het ophalen van LDR-gegevens:", error);
        ldrValueElement.textContent = "Fout bij ophalen.";
        ldrValueElement.className = "error"; // Voeg de 'error'-klasse toe
    });
}

// Update de LDR-status elke seconde
setInterval(updateLDRStatus, 1000);
updateLDRStatus();