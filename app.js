const cities = [
  ["Atlanta", "Mercedes-Benz Stadium", "USA", "Eastern", "Major airport hub with strong match-day logistics and hotel-area searches."],
  ["Boston", "Gillette Stadium", "USA", "Eastern", "Historic visitor base where stadium transport planning matters."],
  ["Dallas", "AT&T Stadium", "USA", "Central", "Large stadium market with strong domestic travel planning demand."],
  ["Guadalajara", "Estadio Akron", "Mexico", "Central", "Mexico host city with food, culture and regional trip potential."],
  ["Houston", "NRG Stadium", "USA", "Central", "Heat, airport choices and stadium access shape the travel plan."],
  ["Kansas City", "Arrowhead Stadium", "USA", "Central", "Stadium-focused guide with hotel and transport comparisons."],
  ["Los Angeles", "SoFi Stadium", "USA", "Pacific", "Gateway city where traffic, airports and hotel location matter."],
  ["Mexico City", "Estadio Azteca", "Mexico", "Central", "Opening-match market with altitude, history and first-time visitor demand."],
  ["Miami", "Hard Rock Stadium", "USA", "Eastern", "Tourism-heavy city with beaches, weather and stadium transfer searches."],
  ["Monterrey", "Estadio BBVA", "Mexico", "Central", "Northern Mexico host city with heat and stadium access planning needs."],
  ["New York New Jersey", "MetLife Stadium", "USA", "Eastern", "Final host market with very high ticket, hotel and transport intent."],
  ["Philadelphia", "Lincoln Financial Field", "USA", "Eastern", "Compact visitor city with useful airport and stadium planning angles."],
  ["San Francisco Bay Area", "Levi's Stadium", "USA", "Pacific", "Multi-airport market where location choices affect match-day routes."],
  ["Seattle", "Lumen Field", "USA", "Pacific", "Downtown stadium access and mild summer travel make this a strong guide page."],
  ["Toronto", "BMO Field", "Canada", "Eastern", "Canada host city with downtown, waterfront and airport planning searches."],
  ["Vancouver", "BC Place", "Canada", "Pacific", "Scenic host city with downtown stadium access and itinerary demand."],
];

const cityPages = {
  "Atlanta": "atlanta.html",
  "Boston": "boston.html",
  "Dallas": "dallas.html",
  "Guadalajara": "guadalajara.html",
  "Houston": "houston.html",
  "Kansas City": "kansas-city.html",
  "Los Angeles": "los-angeles.html",
  "Mexico City": "mexico-city.html",
  "Miami": "miami.html",
  "Monterrey": "monterrey.html",
  "New York New Jersey": "new-york-new-jersey.html",
  "Philadelphia": "philadelphia.html",
  "San Francisco Bay Area": "san-francisco-bay-area.html",
  "Seattle": "seattle.html",
  "Toronto": "toronto.html",
  "Vancouver": "vancouver.html",
};

const matches = [
  {
    date: "2026-06-11T20:00:00-06:00",
    title: "Mexico v South Africa",
    round: "Group stage",
    city: "Mexico City",
    stadium: "Estadio Azteca",
  },
  {
    date: "2026-06-12T17:00:00-07:00",
    title: "USA v Paraguay",
    round: "Group stage",
    city: "Los Angeles",
    stadium: "SoFi Stadium",
  },
  {
    date: "2026-06-13T18:00:00-04:00",
    title: "Brazil v Morocco",
    round: "Group stage",
    city: "New York New Jersey",
    stadium: "MetLife Stadium",
  },
  {
    date: "2026-06-28T16:00:00-05:00",
    title: "Round of 32 match",
    round: "Round of 32",
    city: "Dallas",
    stadium: "AT&T Stadium",
  },
  {
    date: "2026-07-19T15:00:00-04:00",
    title: "Final",
    round: "Final",
    city: "New York New Jersey",
    stadium: "MetLife Stadium",
  },
];

const cityFilter = document.querySelector("#cityFilter");
const roundFilter = document.querySelector("#roundFilter");
const timeZoneFilter = document.querySelector("#timeZoneFilter");
const scheduleRows = document.querySelector("#scheduleRows");
const cityGrid = document.querySelector("#cityGrid");
const tripForm = document.querySelector("#tripForm");
const startRegion = document.querySelector("#startRegion");
const travelStyle = document.querySelector("#travelStyle");
const tripLength = document.querySelector("#tripLength");
const routeResult = document.querySelector("#routeResult");

cities.forEach(([city]) => {
  const option = document.createElement("option");
  option.value = city;
  option.textContent = city;
  cityFilter.append(option);
});

function formatDate(value, timeZone) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone,
  }).format(new Date(value));
}

function formatDay(value) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(value));
}

function renderSchedule() {
  const selectedCity = cityFilter.value;
  const selectedRound = roundFilter.value;
  const selectedTimeZone = timeZoneFilter.value;

  const filtered = matches.filter((match) => {
    const cityMatch = selectedCity === "all" || match.city === selectedCity;
    const roundMatch = selectedRound === "all" || match.round === selectedRound;
    return cityMatch && roundMatch;
  });

  scheduleRows.innerHTML = "";

  filtered.forEach((match) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${formatDay(match.date)}</td>
      <td><strong>${match.title}</strong></td>
      <td>${match.round}</td>
      <td>${match.city}</td>
      <td>${match.stadium}</td>
      <td>${formatDate(match.date, selectedTimeZone)}</td>
    `;
    scheduleRows.append(row);
  });
}

function renderCities() {
  cityGrid.innerHTML = "";

  cities.forEach(([city, stadium, country, zone, summary]) => {
    const card = document.createElement("article");
    card.className = "city-card";
    const page = cityPages[city];
    card.innerHTML = `
      <h3><a href="${page}">${city}</a></h3>
      <p>${summary}</p>
      <dl>
        <div><dt>Stadium</dt><dd>${stadium}</dd></div>
        <div><dt>Country</dt><dd>${country}</dd></div>
        <div><dt>Time zone</dt><dd>${zone}</dd></div>
      </dl>
      <a class="text-link" href="${page}">Open city guide</a>
    `;
    cityGrid.append(card);
  });
}

const routePlans = {
  "west-balanced-5": {
    route: "Los Angeles -> San Francisco Bay Area",
    summary: "A compact West Coast route with fewer flight hops and strong stadium access planning.",
    ticket: "Group stage",
    hotel: "Medium",
    flight: "Lower",
  },
  "west-balanced-9": {
    route: "Los Angeles -> Dallas -> New York New Jersey",
    summary: "Balanced route with a western gateway, one central match stop and the final host market.",
    ticket: "Group + Final",
    hotel: "High",
    flight: "Medium-high",
  },
  "west-balanced-14": {
    route: "Los Angeles -> Seattle -> Dallas -> New York New Jersey",
    summary: "A longer route for fans who want multiple regions while keeping the direction mostly west to east.",
    ticket: "Multi-city",
    hotel: "High",
    flight: "High",
  },
  "east-budget-5": {
    route: "New York New Jersey -> Philadelphia",
    summary: "Short-distance route that reduces flights and keeps hotel changes manageable.",
    ticket: "Final market",
    hotel: "Very high",
    flight: "Lower",
  },
  "east-budget-9": {
    route: "Boston -> New York New Jersey -> Philadelphia",
    summary: "A northeast cluster plan for fans trying to avoid expensive cross-country travel.",
    ticket: "Cluster matches",
    hotel: "High",
    flight: "Lower",
  },
  "mexico-budget-9": {
    route: "Mexico City -> Guadalajara -> Monterrey",
    summary: "Mexico-first route with strong culture, opening-match demand and fewer international hops.",
    ticket: "Mexico matches",
    hotel: "Medium-high",
    flight: "Medium",
  },
  default: {
    route: "Los Angeles -> Dallas -> New York New Jersey",
    summary: "Balanced route with one western gateway, one central match stop and the final host market.",
    ticket: "Group + Final",
    hotel: "High",
    flight: "Medium-high",
  },
};

function buildRoutePlan() {
  const region = startRegion.value;
  const style = travelStyle.value;
  const length = tripLength.value;
  const key = `${region}-${style}-${length}`;
  const clusterKey = `${region}-budget-${length}`;
  const balancedKey = `${region}-balanced-${length}`;
  let plan = routePlans[key] || routePlans[clusterKey] || routePlans[balancedKey] || routePlans.default;

  if (style === "matches" && length !== "5") {
    plan = {
      route: region === "mexico" ? "Mexico City -> Dallas -> Miami -> New York New Jersey" : "Los Angeles -> Dallas -> Miami -> New York New Jersey",
      summary: "Higher-energy route for fans who want more match options and accept extra flights.",
      ticket: "More matches",
      hotel: "High",
      flight: "High",
    };
  }

  if (style === "comfort") {
    plan = {
      route: region === "east" ? "New York New Jersey base + Philadelphia day trip" : "Los Angeles base + Bay Area add-on",
      summary: "Comfort route with fewer hotel changes and more recovery time between match days.",
      ticket: "One base city",
      hotel: "Medium-high",
      flight: "Lower",
    };
  }

  routeResult.innerHTML = `
    <span>Suggested route</span>
    <h3>${plan.route}</h3>
    <p>${plan.summary}</p>
    <dl>
      <div><dt>Ticket focus</dt><dd>${plan.ticket}</dd></div>
      <div><dt>Hotel heat</dt><dd>${plan.hotel}</dd></div>
      <div><dt>Flight pressure</dt><dd>${plan.flight}</dd></div>
    </dl>
  `;
}

[cityFilter, roundFilter, timeZoneFilter].forEach((element) => {
  element.addEventListener("change", renderSchedule);
});

tripForm.addEventListener("submit", (event) => {
  event.preventDefault();
  buildRoutePlan();
});

renderSchedule();
renderCities();
buildRoutePlan();
