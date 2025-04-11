function updateLDRStatus() {
    const ldrValueElement = document.getElementById("ldrValue");
    ldrValueElement.className = "loading"; 

    GetData().then(data => {
        if (data && data.ldr !== null) {
            const ldrValue = data.ldr;
            ldrValueElement.textContent = `Lichtintensiteit: ${ldrValue}`;
            ldrValueElement.className = ""; 
        } else {
            console.error("Kon geen LDR-gegevens ophalen.");
            ldrValueElement.textContent = "LDR-status niet beschikbaar.";
            ldrValueElement.className = "error"; 
        }
    }).catch(error => {
        console.error("Fout bij het ophalen van LDR-gegevens:", error);
        ldrValueElement.textContent = "Fout bij ophalen.";
        ldrValueElement.className = "error"; 
    });
}

setInterval(updateLDRStatus, 1000);
updateLDRStatus();