var greenIcon = L.icon({
  iconUrl: "./marker-icons/leaf-green.png",
  shadowUrl: "./marker-icons/leaf-shadow.png",
  
  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

var redIcon = L.icon({
  iconUrl: "./marker-icons/leaf-red.png",
  shadowUrl: "./marker-icons/leaf-shadow.png",
  
  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

var orangeIcon = L.icon({
  iconUrl: "./marker-icons/leaf-orange.png",
  shadowUrl: "./marker-icons/leaf-shadow.png",

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const leafs = [greenIcon, redIcon, orangeIcon];
let leafIndex = 0;

function fetchLocationInfo(lat, lng) {
  document.querySelector("#info").innerHTML = `<div id="loader"></div>`;
  document.getElementById("loader").style.display = "block";
  $.ajax({
    url: "./scripts/getLocationInfo.php",
    type: "GET",
    data: { lat: lat, lng: lng },
    success: function (response) {
      // Parse OpenCage API response
      var locationInfo = JSON.parse(response);
      $.ajax({
        url: "./scripts/getCurrentExchangeRate.php",
        type: "GET",
        success: function (response) {
          if (!response) {
            console.error("Empty response received.");
            return;
          }
          var exchangeInfo = JSON.parse(response);
          
          $.ajax({
            url: "./scripts/getMoreInfo.php",
            type: "GET",
            data: {
              country: locationInfo.results[0].components["ISO_3166-1_alpha-2"],
            },
            success: function (response) {
              if (!response) {
                console.error("Empty response received.");
                return;
              }
              var moreInfo = JSON.parse(response);

              $.ajax({
                url: "./scripts/getWeatherInfo.php",
                type: "GET",
                data: { lat: lat, lng: lng },
                success: function (response) {
                  if (!response) {
                    console.error("Empty response received.");
                    return;
                  }
                  var weatherInfo = JSON.parse(response);
                  
                  $.ajax({
                    url: "./scripts/getWeatherForecast.php",
                    data: { lat: lat, lng: lng },
                    success: function (response) {
                      if (!response) {
                        console.error("Empty response received.");
                        return;
                      }
                      var weatherForecast = JSON.parse(response);
                      
                      $.ajax({
                        url: "./scripts/getWikipediaLinks.php",
                        data: { city: locationInfo.results[0].components.city },
                        success: function (response) {
                          if (!response) {
                            console.error("Empty response received.");
                            return;
                          }
                          var wikipediaLinks = JSON.parse(response);

                          $.ajax({
                            url: "./scripts/getNews.php",
                            data: {
                              country: locationInfo.results[0].components.state
                              ? locationInfo.results[0].components.state
                              : locationInfo.results[0].components.country,
                            },
                            success: function (response) {
                              if (!response) {
                                console.error("Empty response received.");
                                return;
                              }
                              var newsLinks = JSON.parse(response);
                              document.getElementById("loader").style.display =
                                "none";
                              displayLocationInfo(
                                locationInfo,
                                exchangeInfo,
                                lat,
                                lng,
                                moreInfo,
                                weatherInfo,
                                weatherForecast,
                                wikipediaLinks,
                                newsLinks
                              );
                            },
                          });
                        },
                        error: function (xhr, status, error) {
                          console.error(
                            "Error fetching location info:",
                            status,
                            error
                            );
                          },
                        });
                      },
                    error: function (xhr, status, error) {
                      console.error(
                        "Error fetching location info:",
                        status,
                        error
                        );
                      },
                  });
                },
                error: function (xhr, status, error) {
                  console.error("Error fetching location info:", status, error);
                },
              });
            },
            error: function (xhr, status, error) {
              console.error("Error fetching location info:", status, error);
            },
          });
        },
        error: function (xhr, status, error) {
          console.error("Error fetching location info:", status, error);
        },
      });
    },
    error: function (xhr, status, error) {
      console.error("Error fetching location info:", status, error);
    },
  });
}

function displayLocationInfo(
  locationInfo,
  exchangeInfo,
  lat,
  lng,
  moreInfo,
  weatherInfo,
  weatherForecast,
  wikipediaLinks,
  newsLinks
  ) {
    var infoParagraph = document.querySelector("#info");
    if (wikipediaLinks.geonames[4]) {
      infoParagraph.innerHTML = `
      <p>Latitude: ${lat}</p>
      <p>Longitude: ${lng}</p>
      <p id="location-info" class="color-blue">Location Info:</p>
      <p id="weather-forecast" class="center-the-text color-blue">Weather Forecast:</p>
      <p id="exchange-rate" class="center-the-text color-blue">Exchange Rate</p>
      
      <p id="useful-info" class="center-the-text color-blue">Useful Info:</p>
      <p id="news" class="center-the-text color-blue">Local News</p>
      <div id="loader"></div>
  `;
  $("#useful-info").click(function (event) {
      event.preventDefault();
      var modal = $("#myModal5");
      var modalContent = $("#modal-content5");
      var content = `
      <p><a href="http://${wikipediaLinks.geonames[0].wikipediaUrl}">${wikipediaLinks.geonames[0].title}</a></p>
      <p><a href="http://${wikipediaLinks.geonames[1].wikipediaUrl}">${wikipediaLinks.geonames[1].title}</a></p>
      <p><a href="http://${wikipediaLinks.geonames[2].wikipediaUrl}">${wikipediaLinks.geonames[2].title}</a></p>
      <p><a href="http://${wikipediaLinks.geonames[3].wikipediaUrl}">${wikipediaLinks.geonames[3].title}</a></p>
      <p><a href="http://${wikipediaLinks.geonames[4].wikipediaUrl}">${wikipediaLinks.geonames[4].title}</a></p>
      `;
      
      modalContent.html(content);
      modal.css("display", "block");
    });
  } else {
    infoParagraph.innerHTML = `
    <p>Latitude: ${lat}</p>
    <p>Longitude: ${lng}</p>
    <p id="location-info" class="color-blue">Location Info:</p>
    <p id="weather-forecast" class="center-the-text color-blue">Weather Forecast:</p>
    <p id="exchange-rate" class="center-the-text color-blue">Exchange Rate</p>
    <p id="news" class="center-the-text color-blue">Local News</p>
    `;
  }
  // When the user clicks on the location info link
  $("#location-info").click(function (event) {
    // Prevent default link behavior
    event.preventDefault();
    // Get references to the modal and modal content
    var modal = $("#myModal2");
    var modalContent = $("#modal-content2");
    
    // Populate modal content with location information
    var locationContent = `
    <p class="color-blue">Location Info:</p>
    <p>Country: ${locationInfo.results[0].components.country} / Capital city: ${moreInfo.geonames[0].capital}</p>
    <p>Population: ${moreInfo.geonames[0].population}</p>
    <p>City: ${locationInfo.results[0].components.city}</p>
    <p>Address: ${locationInfo.results[0].formatted}</p>
    <p>Temperature: ${weatherInfo.weatherObservation.temperature}°C ${weatherForecast.current.condition.text} <img src="http:${weatherForecast.current.condition.icon}"></p>
    <p>Flag: ${locationInfo.results[0].annotations.flag}</p>
    <p>Currency: ${locationInfo.results[0].annotations.currency.name}</p>
    `;
    // Set modal content
    modalContent.html(locationContent);
    
    // Display the modal
    modal.css("display", "block");
  });
  $("#exchange-rate").click(function (event) {
    event.preventDefault();
    var modal = $("#myModal3");
    var modalContent = $("#modal-content3");
    
    var exchangeContent = `
    <p class="color-blue">Currency Calculator</p>
    <div class="row">
    <div class="col-md-6">
    <label for="currencyInput">Currency:</label>
    <input type="text" id="currencyInput" class="form-control" placeholder="Enter currency">
    ${locationInfo.results[0].annotations.currency.iso_code}
    </div>
    <div class="col-md-6">
    <label for="exchangeResult">Exchange Result:</label>
    <input type="text" id="exchangeResult" class="form-control" readonly>
    USD
    </div>
    </div>
    `;
    // Set modal content
    modalContent.html(exchangeContent);
    $("#currencyInput").on("input", function () {
      // Get the value entered in the currencyInput field
      var currencyValue = $(this).val();
      
      // Perform your calculation or fetch exchange rate here
      // For demonstration, let's assume a simple calculation
      var exchangeRate =
      1 /
      exchangeInfo.rates[
        locationInfo.results[0].annotations.currency.iso_code
      ]; // Example exchange rate
      var result = currencyValue * exchangeRate; // Calculate the result
      
      // Set the value of the exchangeResult input field to the calculated result
      $("#exchangeResult").val(result);
    });
    // Display the modal
    modal.css("display", "block");
  });
  $("#weather-forecast").click(function (event) {
    event.preventDefault();
    var modal = $("#myModal4");
    var modalContent = $("#modal-content4");
    
    var date1 = new Date(weatherForecast.forecast.forecastday[1].date);
    var dayOfWeek1 = date1.getDay();
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var dayOfWeekString1 = days[dayOfWeek1];
    var date2 = new Date(weatherForecast.forecast.forecastday[2].date);
    var dayOfWeek2 = date2.getDay();
    var dayOfWeekString2 = days[dayOfWeek2];
    
    var weatherContent = `
    <div class="row">
      <div class="col-md-4">
      <div>${locationInfo.results[0].components.city}, ${locationInfo.results[0].components.country}</div>
      </div>
      <div class="col-md-4" id="today-forecast">
      <div><img src="http:${weatherForecast.forecast.forecastday[0].day.condition.icon}"><span style="font-size: 2.5rem">${weatherForecast.forecast.forecastday[0].day.maxtemp_c}</span>°C</div>
      <div class="col-md-12">${weatherForecast.forecast.forecastday[0].day.condition.text}</div>
      </div>
      <div class="col-md-4">
      <div><p>Humidity: ${weatherForecast.forecast.forecastday[0].day.avghumidity}%</p><p>Wind: ${weatherForecast.forecast.forecastday[0].day.maxwind_kph} kph</p></div>
      </div>
      </div> 
      <div class="row">
      <div class="col-md-6 row" id="tomorrow">
      <div class="col-md-6">
      <p>${dayOfWeekString1}:</p><p>${weatherForecast.forecast.forecastday[1].day.maxtemp_c}°C</p>
      </div>
      <div class="col-md-6">
      <img src="http:${weatherForecast.forecast.forecastday[1].day.condition.icon}">
      </div>
      </div> 
      <div class="col-md-6 row">
        <div class="col-md-6">
        <p>${dayOfWeekString2}:</p><p>${weatherForecast.forecast.forecastday[2].day.maxtemp_c}°C</p>
        </div>
        <div class="col-md-6">
        <img src="http:${weatherForecast.forecast.forecastday[2].day.condition.icon}">
        </div>
        </div> 
        </div>
        `;
        
        modalContent.html(weatherContent);
        
        // Display the modal
        modal.css("display", "block");
      });
  $("#news").click(function (event) {
    // Prevent default link behavior
    event.preventDefault();
    // Get references to the modal and modal content
    var modal = $("#myModal6");
    var modalContent = $("#modal-content6");
    
    // Populate modal content with location information
    var content = `
    <p><a href="${newsLinks.results[0].link}">${newsLinks.results[0].title}</a></p>
    <p><a href="${newsLinks.results[1].link}">${newsLinks.results[1].title}</a></p>
    <p><a href="${newsLinks.results[2].link}">${newsLinks.results[2].title}</a></p>
    <p><a href="${newsLinks.results[3].link}">${newsLinks.results[3].title}</a></p>
    <p><a href="${newsLinks.results[4].link}">${newsLinks.results[4].title}</a></p>
    `;
    // Set modal content
    modalContent.html(content);
    
    // Display the modal
    modal.css("display", "block");
  });
}

// Function to handle the onchange event of the country selection input
function handleCountrySelection() {
  var selectedCountry = $("#countrySelect option:selected").html(); 

  // Send AJAX request to get more information based on the selected country
  $.ajax({
    url: "./scripts/getCountryPlaces.php",
    type: "GET",
    data: {
      country: selectedCountry,
    },
    success: function (response) {
      if (!response) {
        console.error("Empty response received.");
        return;
      }
      var moreInfo = JSON.parse(response);
      
      // Remove existing markers
      removeAllMarkers();
      
      // Add markers for the location information of the selected country
      moreInfo.geonames.forEach(function(location) {
        var marker = L.marker([location.lat, location.lng], {
          icon: leafs[leafIndex % 3], // Assuming you have an array of leaf icons
        });
        leafIndex++;
        marker.bindPopup(`Location: ${location.name}`); // Customize popup content as needed
        selectedPinsCluster.addLayer(marker);
      });
      
      // Add the marker cluster group to the map
      map.addLayer(selectedPinsCluster);
    },
    error: function (xhr, status, error) {
      console.error("Error fetching more information:", error);
    }
  });
}

// Add an onchange event listener to the country selection input
$("#countrySelect").change(handleCountrySelection);

var selectedPinsCluster = L.markerClusterGroup();

function onMapClick(e) {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  
  let marker = L.marker([e.latlng.lat, e.latlng.lng], {
    icon: leafs[leafIndex % 3],
  });
  marker.bindPopup(`lat: ${e.latlng.lat}, lng: ${e.latlng.lng}`);
  selectedPinsCluster.addLayer(marker);
  map.addLayer(selectedPinsCluster);
  
  fetchLocationInfo(e.latlng.lat, e.latlng.lng);
  leafIndex++;
}


map.on("click", onMapClick);

// Function to remove all markers
function removeAllMarkers() {
  selectedPinsCluster.clearLayers();
}

// Create an easyButton to remove all markers
L.easyButton('<i class="fas fa-trash-alt"></i>', function (btn, map) {
  removeAllMarkers();
}).addTo(map);

// Function to close the modal
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function closeModal2() {
  var modal = document.getElementById("myModal2");
  modal.style.display = "none";
}

function closeModal3() {
  var modal = document.getElementById("myModal3");
  modal.style.display = "none";
}

function closeModal4() {
  var modal = document.getElementById("myModal4");
  modal.style.display = "none";
}

function closeModal5() {
  var modal = document.getElementById("myModal5");
  modal.style.display = "none";
}

function closeModal6() {
  var modal = document.getElementById("myModal6");
  modal.style.display = "none";
}