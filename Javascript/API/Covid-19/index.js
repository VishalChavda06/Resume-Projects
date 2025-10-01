// make a main api=>
const API_BASE = "https://disease.sh/v3/covid-19";
const countrySelect = document.getElementById("countrySelect");
const loader = document.getElementById("loader");

// api cheak=>
const fetchData = async (endpoint) => {
    loader.style.display = "block";
    try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        Uimaker(data);
    } catch (error) {
        alert("Failed to fetch data: " + error.message);
    } finally {
        loader.style.display = "none";
    }
}
// make Uimaker=>
const Uimaker = (data) => {
    document.getElementById("cases").innerHTML = `Total Cases: ${data.cases.toLocaleString()}`;
    document.getElementById("deaths").innerHTML = `Total Deaths: ${data.deaths.toLocaleString()}`;
    document.getElementById("recovered").innerHTML = `Total Recovered: ${data.recovered.toLocaleString()}`;
}
// selected countries=>
const populateCountries = async () => {
    try {
        const res = await fetch(`${API_BASE}/countries`);
        const countries = await res.json();
        countries.forEach((country) => {
            const option = document.createElement("option");
            option.value = country.country;
            option.textContent = country.country;
            countrySelect.appendChild(option);
        });
    } catch (error) {
        alert("Error loading countries.");
    }
}
// btn countries=>
countrySelect.addEventListener("change", () => {
    const selected = countrySelect.value;
    const endpoint = selected === "global"
        ? `${API_BASE}/all`
        : `${API_BASE}/countries/${selected}`;
    fetchData(endpoint);
});

// loader=>
fetchData(`${API_BASE}/all`);
populateCountries();