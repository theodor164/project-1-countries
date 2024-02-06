var selectedPinsCluster = L.markerClusterGroup();

function fetchLocationInfo(lat, lng) {
  $.ajax({
    url: './scripts/getLocationInfo.php',
    type: 'GET',
    data: { lat: lat, lng: lng },
    success: function(response) {
      // Parse OpenCage API response
      var locationInfo = JSON.parse(response);
      // console.log(locationInfo);
      // Display relevant information in the modal

      $.ajax({
        url: './scripts/getCurrentExchangeRate.php',
        type: 'GET',
        success: function(response) {
          if (!response) {
            console.error('Empty response received.');
            return;
          }
          var exchangeInfo = JSON.parse(response);
          // console.log(exchangeInfo.rates[locationInfo.results[0].annotations.currency.iso_code]);

          $.ajax({
            url: './scripts/getMoreInfo.php',
            type: 'GET',
            data: { country: locationInfo.results[0].components["ISO_3166-1_alpha-2"] },
            success: function(response) {
              if (!response) {
                console.error('Empty response received.');
                return;
              }
              var moreInfo = JSON.parse(response);

              $.ajax({
                url: './scripts/getWeatherInfo.php',
                type: 'GET',
                data: { lat: lat, lng: lng },
                success: function(response){
                  if (!response) {
                    console.error('Empty response received.');
                    return;
                  }
                  var weatherInfo = JSON.parse(response);
                  
                  
                  $.ajax({
                    url: './scripts/getWeatherForecast.php',
                    data: { lat: lat, lng: lng },
                    success: function(response) {
                      if (!response) {
                        console.error('Empty response received.');
                        return;
                      }
                      var weatherForecast = JSON.parse(response);

                      $.ajax({
                        url: './scripts/getWikipediaLinks.php',
                        data: {city: locationInfo.results[0].components.city},
                        success: function(response) {
                          if (!response) {
                            console.error('Empty response received.');
                            return;
                          }
                          var wikipediaLinks = JSON.parse(response);
                          // console.log(wikipediaLinks);

                          displayLocationInfo(locationInfo, exchangeInfo, lat, lng, moreInfo, weatherInfo, weatherForecast, wikipediaLinks);
                        },
                        error: function(xhr, status, error) {
                          console.error('Error fetching location info:', status, error);
                        }
                      })
                      
                    },
                    error: function(xhr, status, error) {
                      console.error('Error fetching location info:', status, error);
                    }
                  })

                },
                error: function(xhr, status, error) {
                  console.error('Error fetching location info:', status, error);
                }
              })

            },
            error: function(xhr, status, error) {
              console.error('Error fetching location info:', status, error);
            }
          })

        }, 
        error: function(xhr, status, error) {
          console.error('Error fetching location info:', status, error);
        }
      });
    },
    error: function(xhr, status, error) {
      console.error('Error fetching location info:', status, error);
    }
  });
}

function displayLocationInfo(locationInfo, exchangeInfo, lat, lng, moreInfo, weatherInfo, weatherForecast, wikipediaLinks) {
  var infoParagraph = document.querySelector('#info');
  infoParagraph.innerHTML = `
    Latitude: ${lat}<br>
    Longitude: ${lng}<br>
    Location Info:<br>
    Country: ${locationInfo.results[0].components.country} / Capital city: ${moreInfo.geonames[0].capital}<br>
    Population: ${moreInfo.geonames[0].population}<br>
    City: ${locationInfo.results[0].components.city}<br>
    Address: ${locationInfo.results[0].formatted}<br>
    Temperature: ${weatherInfo.weatherObservation.temperature}<br>
    <div class="forecastContainer">
    Weather Forecast: <br>
    Today: Highest: ${weatherForecast.forecast.forecastday[0].day.maxtemp_c}; Lowest: ${weatherForecast.forecast.forecastday[0].day.mintemp_c}.<br>
    Tomorrow: Highest: ${weatherForecast.forecast.forecastday[1].day.maxtemp_c}; Lowest: ${weatherForecast.forecast.forecastday[1].day.mintemp_c}.<br>
    Day After Tomorrow: Highest: ${weatherForecast.forecast.forecastday[2].day.maxtemp_c}; Lowest: ${weatherForecast.forecast.forecastday[2].day.mintemp_c}.<br>
    </div>
    Currency: ${locationInfo.results[0].annotations.currency.name}<br>
    1 USD = ${exchangeInfo.rates[locationInfo.results[0].annotations.currency.iso_code]} ${locationInfo.results[0].annotations.currency.iso_code}<br>
    Flag: ${locationInfo.results[0].annotations.flag}<br>
    Useful Info: <br>
    <a href="http://${wikipediaLinks.geonames[0].wikipediaUrl}">${wikipediaLinks.geonames[0].title}</a> <br>
    <a href="http://${wikipediaLinks.geonames[1].wikipediaUrl}">${wikipediaLinks.geonames[1].title}</a> <br>
    <a href="http://${wikipediaLinks.geonames[2].wikipediaUrl}">${wikipediaLinks.geonames[2].title}</a> <br>
    <a href="http://${wikipediaLinks.geonames[3].wikipediaUrl}">${wikipediaLinks.geonames[3].title}</a> <br>
    <a href="http://${wikipediaLinks.geonames[4].wikipediaUrl}">${wikipediaLinks.geonames[4].title}</a> <br>
  `;
}


function onMapClick(e) {

  var modal = document.getElementById("myModal");
  modal.style.display = "block";
 
  let marker = L.marker([e.latlng.lat, e.latlng.lng]);
  marker.bindPopup(`lat: ${e.latlng.lat}, lng: ${e.latlng.lng}`)
  selectedPinsCluster.addLayer(marker);
  map.addLayer(selectedPinsCluster);

  fetchLocationInfo(e.latlng.lat, e.latlng.lng);

}

// Function to close the modal
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

map.on("click", onMapClick);