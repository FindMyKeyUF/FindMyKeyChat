// Lista över giltiga koder och meddelanden
const validCodes = {
    "123456": [],
    "ABCDEF": [],
    "987654": []
};

let currentUserRole = ""; // Roll: "finder" eller "owner"
let currentCode = ""; // Koden för den aktuella chatten

// Visa vald sektion
function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

// Logga in som nyckelhittare
function finderLogin() {
    const userCode = document.getElementById("user-code").value.trim();
    const errorElement = document.getElementById("code-error");

    // Kontrollera om koden är giltig
    if (validCodes[userCode]) {
        errorElement.textContent = "";
        currentUserRole = "finder";
        currentCode = userCode;
        loadChat(); // Ladda chattmeddelanden
        showSection("chat-section"); // Visa chattsektionen
    } else {
        errorElement.textContent = "Fel kod! Försök igen.";
    }
}

// Logga in som nyckelägare
function ownerLogin() {
    const ownerCode = document.getElementById("owner-code").value.trim();
    const errorElement = document.getElementById("owner-error");

    // Kontrollera om koden är giltig
    if (validCodes[ownerCode]) {
        errorElement.textContent = "";
        currentUserRole = "owner";
        currentCode = ownerCode;
        loadChat(); // Ladda chattmeddelanden
        showSection("chat-section"); // Visa chattsektionen
    } else {
        errorElement.textContent = "Fel kod! Försök igen.";
    }
}

// Ladda meddelanden för den aktuella koden från localStorage
function loadChat() {
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML = ""; // Rensa tidigare meddelanden

    // Hämtar meddelandena för den aktuella koden från localStorage
    const storedMessages = JSON.parse(localStorage.getItem(currentCode)) || [];
    
    // Lägg till meddelandena i chatten
    storedMessages.forEach(entry => {
        const messageElement = document.createElement("div");
        messageElement.textContent = `${entry.role === "finder" ? "Nyckelhittare" : "Nyckelägare"}: ${entry.message}`;
        messageElement.className = entry.role; // Lägg till klass för styling om nödvändigt
        chatMessages.appendChild(messageElement);
    });
}

// Skicka ett meddelande i chatten
function sendMessage() {
    const messageBox = document.getElementById("message");
    const chatMessages = document.getElementById("chat-messages");

    if (messageBox.value.trim() === "") {
        alert("Skriv ett meddelande först!");
        return;
    }

    const message = messageBox.value.trim();
    
    // Hämta de tidigare meddelandena från localStorage
    let storedMessages = JSON.parse(localStorage.getItem(currentCode)) || [];
    
    // Lägg till det nya meddelandet
    storedMessages.push({ role: currentUserRole, message }); 
    
    // Spara meddelandena tillbaka i localStorage
    localStorage.setItem(currentCode, JSON.stringify(storedMessages));

    // Uppdatera chatten
    loadChat();

    // Rensa textrutan
    messageBox.value = "";

    // Scrolla ner till senaste meddelandet
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
