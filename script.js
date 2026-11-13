const PLANET_URL = "./Searchplanet.JSON";

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("planetSearch");
const searchStatus = document.getElementById("searchStatus");
const planetDetails = document.getElementById("planetDetails");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

let planets = [];
let planetsLoaded = false;

function showNoResults() {
  searchStatus.textContent = "No results";
  planetDetails.innerHTML = `
    <div class="no-results">
      <h2>No results found!</h2>
      <p>
        We couldn't find any planet matching your search.
        Please double-check the name and try again.
      </p>
    </div>
  `;
}

function showPlanet(planet) {
  searchStatus.textContent = "";

  const mass = Number(planet.mass).toLocaleString("en-US", {
    maximumSignificantDigits: 6
  });

  planetDetails.innerHTML = `
    <article class="planet-card">
      <img
        class="planet-image"
        src="${planet.image}"
        alt="${planet.name}"
      >

      <div class="planet-content">
        <h1>${planet.name}</h1>
        <p class="planet-type">${planet.type}</p>
        <p class="planet-description">${planet.description}</p>

        <div class="planet-stats">
          <div>
            <span class="stat-label">Gravity</span>
            <span class="stat-value">${planet.gravity}</span>
          </div>
          <div>
            <span class="stat-label">Mass</span>
            <span class="stat-value">${mass}</span>
          </div>
          <div>
            <span class="stat-label">Period</span>
            <span class="stat-value">${planet.period}</span>
          </div>
        </div>

        <div class="planet-extra">
          <div class="extra-item">
            <span aria-hidden="true">🌡</span>
            <span>${planet.temperature}</span>
          </div>
          <div class="extra-item">
            <span aria-hidden="true">🌙</span>
            <span>${planet.moons}</span>
          </div>
          <div class="extra-item">
            <span aria-hidden="true">🌍</span>
            <span>${planet.diameter.toLocaleString("en-US")}</span>
          </div>
          <div class="extra-item">
            <span aria-hidden="true">☼</span>
            <span>${planet.distanceFromSun.toLocaleString("en-US")}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}

function searchPlanet(event) {
  event.preventDefault();

  if (!planetsLoaded) {
    searchStatus.textContent = "Planet data is still loading.";
    return;
  }

  const query = searchInput.value.trim().toLowerCase();
  const planet = planets.find(item => item.name.toLowerCase() === query);

  if (planet) {
    showPlanet(planet);
  } else {
    showNoResults();
  }
}

function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeLabel.textContent = isDark ? "LIGHT" : "DARK";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
}

searchForm.addEventListener("submit", searchPlanet);

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("planet-theme");
} catch (error) {
  console.warn("Could not read the saved theme preference.", error);
}

setTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");
  setTheme(isDark);

  try {
    localStorage.setItem("planet-theme", isDark ? "dark" : "light");
  } catch (error) {
    console.warn("Could not save the theme preference.", error);
  }
});

async function loadPlanets() {
  try {
    const response = await fetch(PLANET_URL);
    if (!response.ok) {
      throw new Error(`Unable to load planet data (${response.status}).`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("The planet data format is incorrect.");
    }

    planets = data;
    planetsLoaded = true;

    const earth = planets.find(
      planet => planet.name.toLowerCase() === "earth"
    );
    if (earth) {
      showPlanet(earth);
    }
  } catch (error) {
    console.error(error);
    searchStatus.textContent = "Unable to load planet data.";
    planetDetails.innerHTML = `
      <div class="error-card">
        <h2>Unable to load planet data</h2>
        <p>Please check your connection and try again.</p>
      </div>
    `;
  }
}

loadPlanets();
