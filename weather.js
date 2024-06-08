const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
  const APIKey = "9e159efdcc0f21205c48fc275d4a01d5";
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then(response => response.json())
    .then(json => {
      if (json.cod == '404') {
        cityHide.textContent = city;
        container.style.height = '400px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
      }

      container.style.height = '555px';
      weatherBox.classList.add('active');
      weatherDetails.classList.add('active');
      error404.classList.remove('active');

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-details .humidity span");
      const wind = document.querySelector(".weather-details .wind span");

      if (cityHide.textContent == city) {
        return;
      }
      else {
        cityHide.textContent = city;

        container.style.height = '555px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(()=>{
          container.classList.removes('active');
        },2500);
      
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "https://res.cloudinary.com/dgccnrp7w/image/upload/v1717828127/sun_l3uwkm.png";
          break;

        case "Rain":
          image.src = "https://res.cloudinary.com/dgccnrp7w/image/upload/v1717828336/rain_p422zy.png";
          break;

        case "Snow":
          image.src = "https://res.cloudinary.com/dgccnrp7w/image/upload/v1717828278/snow_evanfj.png";
          break;
        case "Clouds":
          image.src = "https://res.cloudinary.com/dgccnrp7w/image/upload/v1717827726/cloud_xpqbuf.png";
          break;

        case "Mist":
          image.src = "https://res.cloudinary.com/dgccnrp7w/image/upload/v1717827894/mist_jx79vd.png";
          break;

        case "Haze":
          image.src = "https://res.cloudinary.com/dgccnrp7w/image/upload/v1717827988/haze_glmqoe.png";
          break;

        default:
          image.src = "https://res.cloudinary.com/dgccnrp7w/image/upload/v1717827726/cloud_xpqbuf.png";
          break;
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>&#8451</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

      const infoWeather=document.querySelector('.info-weather');
      const infoHumidity=document.querySelector('.info-humididy');
      const infoWind=document.querySelector('.info-wind');

      const elCloneInfoWeather=infoWeather.cloneNode(true);
      const elCloneInfoHumidity=infoHumidity.cloneNode(true);
      const elCloneInfoWind=infoWind.cloneNode(true);

      elCloneInfoWeather.id='clone-info-weather';
      elCloneInfoWeather.classList.add('active-clone');

      elCloneInfoHumidity.id='clone-info-humidity';
      elCloneInfoHumidity.classList.add('active-clone');

      elCloneInfoWind.id='clone-info-wind';
      elCloneInfoWind.classList.add('active-clone');

      setTimeout(()=>{
        infoWeather.insertAdjacentElement("afterend",elCloneInfoWeather);
        infoHumidity.insertAdjacentElement("afterend",elCloneInfoHumidity);
        infoWind.insertAdjacentElement("afterend",elCloneInfoWind);
      },2200);

      const cloneInfoWeather=document.querySelectorAll('.info-weather.active-clone');
      const totalCloneInfoWeather=cloneInfoWeather.length;
      const cloneInfoWeatherFirst=cloneInfoWeather[0];

      const cloneInfoHumidity=document.querySelectorAll('.info-humidity.active-clone');
      // const totalCloneInfoHumidity=cloneInfoHumidity.length;
      const cloneInfoHumidityFirst=cloneInfoHumidity[0];

      const cloneInfoWind=document.querySelectorAll('.info-wind.active-clone');
      // const totalCloneInfoWind=cloneInfoHumidity.length;
      const cloneInfoWindfirst=cloneInfoWind[0];

      if(totalCloneInfoWeather>0){
        cloneInfoWeatherFirst.classList.remove('active-clone');
        cloneInfoHumidityFirst.classList.remove('active-clone');
        cloneInfoWindFirst.classList.remove('active-clone');

        setTimeout(()=>{
          cloneInfoWeatherFirst.remove();
          cloneInfoHumidityFirst.remove();
          cloneInfoWindfirst.remove();
        },2200);
      }
      

    }

    });
});
