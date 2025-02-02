function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon");

    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
    }
}

function hitungQuantity() {
    let pair = document.getElementById("pair").value;
    let modal = parseFloat(document.getElementById("modal").value);
    let entry = parseFloat(document.getElementById("entry").value);
    let tp = parseFloat(document.getElementById("tp").value);
    let sl = parseFloat(document.getElementById("sl").value);

    if (isNaN(modal) || isNaN(entry) || isNaN(tp) || isNaN(sl)) {
        document.getElementById("hasil").innerText = "Masukkan angka yang valid!";
        return;
    }

    let risk = modal * 0.03;
    let sl_percent = Math.abs((sl - entry) / entry) * 100;
    let leverage = sl_percent > 5 ? 3 : sl_percent >= 2 ? 7 : 12;
    let quantity = (risk * leverage) / (sl_percent / 100);

    let hasilText = `
        Pair: <b>${pair}</b><br>
        Quantity: <b>${quantity.toFixed(4)}</b> USDT <br>
        Entry: <b>${entry}</b><br>
        TP: <b>${tp}</b><br>
        SL: <b>${sl} (${sl_percent.toFixed(2)}%)</b><br>
        Leverage: <b>${leverage}x</b>
    `;

    document.getElementById("hasil").innerHTML = hasilText;

    simpanKeMemory(pair, modal, entry, tp, sl, quantity, leverage);
}

function simpanKeMemory(pair, modal, entry, tp, sl, quantity, leverage) {
    let memoryList = document.getElementById("memory-list");
    let now = new Date();
    let timeString = now.toLocaleTimeString();

    let newEntry = document.createElement("li");
    newEntry.innerHTML = `
        🕒 ${timeString} | <b>${pair}</b> - Modal: ${modal}, Entry: ${entry}, TP: ${tp}, SL: ${sl}, 
        <b>Qty: ${quantity.toFixed(4)}</b>, Lev: ${leverage}x
    `;
    
    memoryList.prepend(newEntry);
}

function toggleMemory() {
    let memoryContainer = document.getElementById("memory-container");
    memoryContainer.classList.toggle("show");
}

function saranLeverage(sl_percent, modal) {
    if (sl_percent > 5) {
        return 3;  // Risiko rendah
    } else if (sl_percent >= 2 && sl_percent <= 5) {
        return 7;  // Risiko sedang
    } else {
        return Math.min(12, Math.max(5, Math.floor(modal / 100)));  // Risiko tinggi tapi tetap aman
    }
}
