// https://api.openweathermap.org/data/2.5/weather?q=surat&appid=b4c426c91009e3429c4af53c61fd6e9c&units=metric

const shoat = (data) => {
    // let temp = `<input type="text" placeholder="Your City:" id="search">
    //     <h1 class="city">${data.name}</h1>
    //     <div class="weather-icon">🌤️</div>
    //     <h2 class="temperature">${data.main.temp}°C</h2>
    //     <p class="description">Partly Cloudy</p>
    // `
    document.querySelector(".city").innerHTML = `${data.name}  ${data.sys.country}`;
    document.querySelector(".speed").innerHTML = `💨${data.wind.speed}KM/h`;
    document.querySelector(".description").innerHTML = `${data.weather[0].description}`;
    document.getElementById("container").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".h-temp").innerHTML = `H : ${Math.round(data.main.temp_max)}°C`;
    document.querySelector(".l-temp").innerHTML = `L : ${Math.round(data.main.temp_min)}°C`;
};

const getheader = async (citrange) => {
    let req = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citrange}&appid=5e29241d39320db830911f1d7829631b&units=metric`);
    let res = await req.json()

    shoat(res)
}
const getWeatherByLocation = async (lat, long) => {
    let req = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5e29241d39320db830911f1d7829631b&units=metric`);
    let res = await req.json();
    console.log(res);

    shoat(res)
};
document.getElementById("search").addEventListener("keypress", (e) => {
    // e.target.value;
    // console.log(e);
    if (e.key == "Enter") {
        const citrange = e.target.value;
        console.log(citrange);
        // getWeatherByLocation(citrange);
        getheader(citrange)
    }
});

// locations

const GetLocation = () => {
    navigator.geolocation.getCurrentPosition((pes) => {
        console.log(pes);
        const lat = pes.coords.latitude;
        const long = pes.coords.longitude;
        console.log(lat, long)
        getWeatherByLocation(lat, long)

    })
}

GetLocation();
