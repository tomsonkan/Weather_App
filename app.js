window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let locationExplanation = document.querySelector('.location-explanation');

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const api = `${proxy}https://api.darksky.net/forecast/845afc0231d87062c9b7c6085a619bf9/${lat},${long}`;

    fetch(api)
      .then(response =>{
        return response.json()
      })
      .then(data => {
        console.log(data);
        const {temperature, summary, icon} = data.currently;
        //Set DOM Elements from the API
        temperatureDegree.textContent = Math.floor(temperature);
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;
        locationExplanation.textContent = data.daily.summary;
        setIcons(icon, document.querySelector('.icon'));
      })
      });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "blue"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
}); 