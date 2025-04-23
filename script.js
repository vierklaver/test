let huidigeStap = 1; // standaardwaarde
// const totaalStappen = document.querySelectorAll('.stap').length;

//Laad bewaarde stap (indien aanwezig)
if (localStorage.getItem('huidigeStap')) {
    huidigeStap = parseInt(localStorage.getItem('huidigeStap'));
}

//Toon juiste stap
function updateStap() {
    // Verberg alle stappen
    const stappen = document.querySelectorAll('#stappencontainer .stap');
    const totaalStappen = stappen.length;
  
    stappen.forEach((stap, index) => {
      stap.classList.remove("active");
      if (index === huidigeStap - 1) {
        stap.classList.add("active");
      }
    });

    // document.querySelectorAll('.stap').forEach((stap) => {
    //     stap.classList.remove("active");
    // });

    // //Toon de juiste stap
    // document.getElementById(`stap${huidigeStap}`).classList.add("active");

    //Schakel knoppen in of uit
    document.getElementById("vorigeBtn").disabled = (huidigeStap === 1);
    document.getElementById("volgendeBtn").disabled = (huidigeStap === totaalStappen);

    //Bewaar huidige stap
    localStorage.setItem('huidigeStap', huidigeStap);

      //Update voortgangstekst en balk
  const voortgangTekst = document.getElementById("voortgang-tekst");
  const voortgangVulling = document.getElementById("voortgang-vulling");
  voortgangTekst.textContent = `Stap ${huidigeStap} van ${totaalStappen}`;

  const percentage = (huidigeStap / totaalStappen) * 100;
  voortgangVulling.style.width = `${percentage}%`;

}

function volgendeStap() {
    const stappen = document.querySelectorAll('#stappencontainer .stap');
    if (huidigeStap < stappen.length) {
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

// Thema-wissel
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.querySelector(".theme-toggle").innerText = isDark ? "☀️ Licht Thema" : "🌙 Donker Thema";
}

// Bij laden van de pagina
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

function verwerkAntwoord(antwoord) {
    // Verberg alle vragen eerst
    document.querySelectorAll('.wissel-flow').forEach(div => {
      div.classList.remove('active');
    });
  
    // Toon juiste vraag of navigeer
    switch (antwoord) {
      case 'collega-ja':
        document.getElementById("vraag2").classList.add("active");
        break;
      case 'collega-nee':
        window.location.href = "wisselsysteem.html";
        break;
      case 'samendag-ja':
        window.location.href = "wisseldag.html";
        break;
      case 'samendag-nee':
        window.location.href = "wisseladag.html";
        break;
    }
  }
  
  function terugNaarVraag1() {
    document.querySelectorAll('.wissel-flow').forEach(div => {
      div.classList.remove('active');
    });
    document.getElementById("vraag1").classList.add("active");
  }

// Zoekfunctie
function filterOnderwerpen() {
  const input = document.getElementById("zoekveld").value.toLowerCase();
  const tegels = document.querySelectorAll(".tegel");

  tegels.forEach(tegel => {
    const tekst = tegel.innerText.toLowerCase();
    tegel.style.display = tekst.includes(input) ? "flex" : "none";
  });
}

//regelblok
// function verbergIntro() {
//   document.getElementById("regelcontainer").style.display = "none";
//   document.getElementById("stappencontainer").style.display = "block";

  function verbergIntro() {
    const intro = document.getElementById("regelcontainer");
    const stappen = document.getElementById("stappencontainer");
  
    // Voeg klasse toe voor inklappen
    intro.classList.add("hidden");
  
    // Wacht tot de animatie klaar is (500ms), dan pas tonen stappen
    setTimeout(() => {
      stappen.style.display = "block";
      updateStap();
    }, 500);
  }

  // Start eventueel met stap 1 actief:
  const eersteStap = document.querySelector(".stap");
  if (eersteStap) eersteStap.classList.add("active");

  // Als je werkt met voortgangsbalk:
  if (typeof updateStap === "function") updateStap();
