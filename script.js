let huidigeStap = 1; // standaardwaarde
const totaalStappen = document.querySelectorAll('.stap').length;

// 👇 Laad bewaarde stap (indien aanwezig)
if (localStorage.getItem('huidigeStap')) {
    huidigeStap = parseInt(localStorage.getItem('huidigeStap'));
}

// 👉 Toon juiste stap
function updateStap() {
    // Verberg alle stappen
    document.querySelectorAll('.stap').forEach((stap) => {
        stap.classList.remove("active");
    });

    // Toon de juiste stap
    document.getElementById(`stap${huidigeStap}`).classList.add("active");

    // Schakel knoppen in of uit
    document.getElementById("vorigeBtn").disabled = (huidigeStap === 1);
    document.getElementById("volgendeBtn").disabled = (huidigeStap === totaalStappen);

    // 💾 Bewaar huidige stap
    localStorage.setItem('huidigeStap', huidigeStap);

      // Update voortgangstekst en balk
  const voortgangTekst = document.getElementById("voortgang-tekst");
  const voortgangVulling = document.getElementById("voortgang-vulling");
  voortgangTekst.textContent = `Stap ${huidigeStap} van ${totaalStappen}`;

  const percentage = (huidigeStap / totaalStappen) * 100;
  voortgangVulling.style.width = `${percentage}%`;

}

function volgendeStap() {
    if (huidigeStap < totaalStappen) {
        huidigeStap++;
        updateStap();
    }
}

function vorigeStap() {
    if (huidigeStap > 1) {
        huidigeStap--;
        updateStap();
    }
}

// 🌙 Thema-wissel
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.querySelector(".theme-toggle").innerText = isDark ? "☀️ Licht Thema" : "🌙 Donker Thema";
}

// ✅ Bij laden van de pagina
window.onload = function () {
    // Laad thema
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        document.querySelector(".theme-toggle").innerText = "☀️ Licht Thema";
    }
    updateStap(); // Laad juiste stap
};

function resetHandleiding() {
    huidigeStap = 1;
    updateStap();
}

function terug() {
    // Optioneel: reset localStorage voor deze handleiding
    localStorage.removeItem('huidigeStap');
    window.location.href = "index.html";
}

function terugNaarIndex() {
    // Optioneel: reset localStorage voor deze handleiding
    localStorage.removeItem('huidigeStap');
    window.location.href = "../index.html";
}

