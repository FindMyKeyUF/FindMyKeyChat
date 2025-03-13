let currentUserRole = "";
let currentCode = "";

function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

function finderLogin() {
    const userCode = document.getElementById("user-code").value.trim();
    if (userCode) {
        currentUserRole = "finder";
        currentCode = userCode;
        loadChat();
        showSection("chat-section");
    }
}

function ownerLogin() {
    const ownerCode = document.getElementById("owner-code").value.trim();
    if (ownerCode) {
        currentUserRole = "owner";
        currentCode = ownerCode;
        loadChat();
        showSection("chat-section");
    }
}

function loadChat() {
    fetch("https://findmykey-platform.onrender.com/messages/${currentCode}")
        .then(response => response.json())
        .then(messages => {
            const chatMessages = document.getElementById("chat-messages");
            chatMessages.innerHTML = "";

            messages.forEach(entry => {
                const messageElement = document.createElement("div");
                messageElement.textContent = `${entry.role === "finder" ? "Nyckelhittare" : "Nyckelägare"}: ${entry.message}`;
                chatMessages.appendChild(messageElement);
            });
        });
}

function sendMessage() {
    const messageBox = document.getElementById("message");
    if (messageBox.value.trim() === "") return;

    fetch(`https://findmykey-platform.onrender.com/messages/${currentCode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: currentUserRole, message: messageBox.value.trim() })
    })
    .then(() => {
        messageBox.value = "";
        loadChat();
    });
}
