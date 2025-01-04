
async function testFastifyEndpoint() {
    const url = "http://192.168.0.12:3000/api/users"; // Az API végpont URL-je
    
    // A kérés törzse (amit a szerver kezelni fog)
    const requestBody = {
        name: "John Doe",
        age: 30
    };

    try {
        const response = await fetch(url, {
            method: "POST", // HTTP POST metódus
            headers: {
                "Content-Type": "application/json" // A tartalom típusa JSON
            },
            body: JSON.stringify(requestBody) // JSON formátumú kérés törzs
        });

        // Ellenőrizd a válasz státuszkódját
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json(); // A válasz JSON feldolgozása
        console.log("Válasz a szervertől:", result); // Szerver válasz kiírása
    } catch (error) {
        console.error("Hiba történt a kérés során:", error);
    }
}

testFastifyEndpoint(); // Hívás futtatása


