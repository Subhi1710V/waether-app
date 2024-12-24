let weather_form = document.querySelector(".weather_form");
let city = document.querySelector("#City");
let card = document.querySelector(".card");
let apikey = "c0254071f858c5cd6f57b980bd4c66ab";
weather_form.addEventListener("submit", async buttons => {
    buttons.preventDefault();
    let cityinput = city.value;
    if (cityinput) {
        try {
            let weather = await getweatherdata(cityinput);
            weatherinfo(weather);
        }
        catch (error) {

            console.error(error);
            errordisplay(error);
        }

    }
    else {
        errordisplay("Enter a valid city");
    }

})
async function getweatherdata(city) {
    let urlapi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(urlapi);
    if (!response.ok) {
        throw new error("Can't fetch data");
    }
    return await response.json();
}
function weatherinfo(info) {
    console.log(info);
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = info;
    card.textContent = "";
    card.style.display = "flex";
    let citydisplay = document.createElement("h1");
    let tempdisplay = document.createElement("p");
    let humiditydisplay = document.createElement("p");
    let descdisplay = document.createElement("p");
    let emojidisplay = document.createElement("p");

    citydisplay.textContent = city;
    tempdisplay.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(1) + "\u00B0" + "F"}`;
    humiditydisplay.textContent = `Humidity:${humidity}`;
    descdisplay.textContent = description;
    emojidisplay.textContent = getemoji(id);

    tempdisplay.classList.add("temperature");
    humiditydisplay.classList.add("humid");
    descdisplay.classList.add("nature");
    emojidisplay.classList.add("emoji");

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(emojidisplay);

}
function getemoji(weatherid) {
    switch (true) {
        case (weatherid >= 200 && weatherid < 300):
            return "⛈️"
        
        case (weatherid >= 300 && weatherid < 400):
            return "🌧️"
        
        case (weatherid >= 400 && weatherid < 500):
            return "🌦️"
        case (weatherid >= 500 && weatherid < 600):
            return "❄️"
        case (weatherid >= 600 && weatherid < 700):
            return "🌫️"
        case (weatherid===800):
            return "🌞"
        case (weatherid >= 801 && weatherid < 810):
            return "☁️"
        default:
            return  "🤔"
        
        
    }

}
function errordisplay(error) {
    console.log("error dispalyed")
    let errormsg = document.createElement("p");
    errormsg.textContent = error;
    errormsg.classList.add("errormsg");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errormsg);

}