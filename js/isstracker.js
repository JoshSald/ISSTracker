// Instantiate
getPassTimes();
getAstronauts();
getISSData();
setInterval(getISSData, 1000);
// END Instantiate

let centerISS = true;

// GET FLYBY TIMES
function getPassTimes() {
  if (navigator.geolocation) {
    // Get user Location
    navigator.geolocation.getCurrentPosition(position => {
      const userLon = position.coords.longitude;
      const userLat = position.coords.latitude;
      const apiKey = "QZ6WW6-NK6SND-96EK6Y-45CU";
      let coords = `${userLat}/${userLon}`;

      const usermarker = L.marker([userLat, userLon], { icon: userIcon }).addTo(
        map
      );
      // URL: USER LOCATION
      const url = `https://www.n2yo.com/rest/v1/satellite/visualpasses/25544/${coords}/7/10/30/&apiKey=${apiKey}`;

      // TEST URL : Rio de Janeiro:
      // const url = `https://www.n2yo.com/rest/v1/satellite/visualpasses/25544/-22.9068/43.1729/0/7/30/&apiKey=${apiKey}`;

      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const passcount = data.info.passescount;
          const issPasses = document.getElementById("issPasses");
          let noPassesMsg = `<p class = "err-msg">Unfortunately there won't be any visible ISS sightings for the next 10 days. Please Check back again in a few days.</p><br><h5>Doesn't the ISS fly over me all the time?</h5><small>The space station’s orbit takes it all around the globe so it may pass over you at times when it's less visible, such as either in the middle of the day when it is too bright or the middle of the night when the sun is on the other side of the earth. The best sightings occur early morning before sunrise or in the evening shortly after sunset when the sky is dark but the sun can still reflect light off the metal structures of the space station.</small>`;
          let passData = "";

          // No passes
          if (passcount <= 0) {
            passData += noPassesMsg;

            // return to DOM
            issPasses.innerHTML = passData;
          } else {
            let passesArr = data.passes;
            let conditionsMsg = "";
            let passList = "";

            // Populate List
            passesArr.map(ISSpass => {
              let passStartTime = new Date(ISSpass.startUTC * 1000);
              let passEndTime = new Date(ISSpass.endUTC * 1000);
              let passDuration = ISSpass.duration;
              let brightness = ISSpass.mag;
              let startDirection = ISSpass.startAz;
              let startCompass = ISSpass.startAzCompass;
              let endDirection = ISSpass.endAz;
              let endCompass = ISSpass.endAzCompass;

              let Time = {
                hours: function hours(i) {
                  return "0" + i.getHours();
                },
                minutes: function minutes(i) {
                  return "0" + i.getMinutes();
                },
                seconds: function seconds(i) {
                  return "0" + i.getSeconds();
                },
                date: function date(i) {
                  return "0" + i.getDate();
                },
                month: function month(i) {
                  return "0" + (i.getMonth() + 1);
                },
                year: function year(i) {
                  return i.getFullYear();
                }
              };

              // TIME AND DATE FORMATS

              // Date of Pass
              let passDate = `${Time.date(passStartTime).substr(
                -2
              )}/${Time.month(passStartTime).substr(-2)}/${Time.year(
                passStartTime
              )}`;
              // Time of start of Pass
              let startPass = `${Time.hours(passStartTime).substr(
                -2
              )}:${Time.minutes(passStartTime).substr(-2)}:${Time.seconds(
                passStartTime
              ).substr(-2)}`;
              // Time of End of Pass
              let endPass = `${Time.hours(passEndTime).substr(
                -2
              )}:${Time.minutes(passEndTime).substr(-2)}:${Time.seconds(
                passEndTime
              ).substr(-2)}`;

              // END TIME AND DATE FORMATS

              // Best Conditions

              if (brightness <= -2.1) {
                conditionsMsg = `<small class = "best-conditions">Best Viewing Conditions</small>`;
              } else if (brightness >= 6) {
                conditionsMsg = `<small class = "err-msg">Poor Viewing conditions</small>`;
              } else if (brightness >= 7) {
                conditionsMsg = `<small class = "err-msg">Not Visible</small>`;
              } else {
                conditionsMsg = `<small class = "bestof-week">Good Viewing conditions</small>`;
              }

              // END Best Conditions

              passList += `<li><p><strong>Date:</strong> ${passDate}</p><hr><p><strong>Start:</strong> ${startPass}</p><p><strong>Where:</strong> ${startDirection}&deg; (${startCompass})</p><hr><p><strong>End:</strong> ${endPass}</p><p><strong>Where:</strong> ${endDirection}&deg; (${endCompass})</p><hr><p><strong>Duration:</strong> ${passDuration} seconds</p>${conditionsMsg}</li>`;
            });

            passData += `<h3>ISS Fly Over Times over the next 10 days</h3><p>You can see the ISS fly overhead at the following times:</p><ol>${passList}</ol>`;

            // Return to DOM
            issPasses.innerHTML = passData;
          }
        })
        .catch(err => {
          console.log(err); // catch any errors
        });
    });
  }
}
// END GET FLYBY TIMES

// GET ASTRONAUTS CURRENTLY IN SPACE
function getAstronauts() {
  let url = "js/astronauts.json";

  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      let astronauts = data;
      let noa = document.getElementById("noa");
      let astronautList = document.getElementById("astronautList");
      let astronautInfo = "";

      astronauts.map(astronaut => {
        // Calculate Days in Space
        let launchdate = new Date(astronaut.launch_date * 1000);
        let today = new Date();
        var oneDay = 1000 * 60 * 60 * 24;
        let daysInSpace = Math.floor(
          Math.abs((today.getTime() - launchdate.getTime()) / oneDay)
        );
        // END Calculate Days in Space

        //Edit DOM with JSON data
        astronautInfo += `<hr><li><h4>${
          astronaut.name
        }</h4><div class="astronaut-info"><p><img class="flag" src="img/flags/${
          astronaut.country
        }.svg"><em>${
          astronaut.role
        }</em></p></div><img class="astronaut-portrait" src="img/astronauts/${
          astronaut.img
        }"><p>${daysInSpace} <small>days in space</small></p><p class="bio">${
          astronaut.bio
        }</p></li>`;
        // END Edit DOM with JSON data
      });

      noa.innerText = data.length;
      astronautList.innerHTML = astronautInfo;
    })
    .catch(err => {
      console.log(err); // catch any errors
    });
  // END GET ASTRONAUTS CURRENTLY IN SPACE
}
// END GET ASTRONAUTS CURRENTLY IN SPACE

// GET ISS DATA
function getISSData() {
  let url = `https://api.wheretheiss.at/v1/satellites/25544`;

  fetch(url)
    .then(resp => {
      return resp.json();
    }) // Convert data to json
    .then(data => {
      const lon = data.longitude;
      const lat = data.latitude;
      const alt = data.altitude;
      const spd = data.velocity;
      let currLatLng = L.latLng(lat, lon);
      path.push(currLatLng);
      const polyline = L.polyline(path, {
        color: "#150C34",
        weight: 2,
        opacity: 1,
        dashArray: [3, 6]
      });
      // END API DATA

      markers.addLayer(marker);
      markers.addLayer(polyline);
      // DOM Elements
      const locLon = document.getElementById("lon");
      const locLat = document.getElementById("lat");
      const locAlt = document.getElementById("alt");
      const locSpd = document.getElementById("spd");
      // END DOM Elements

      //Edit DOM with API data
      locLon.innerText = lon.toFixed(2);
      locLat.innerText = lat.toFixed(2);
      locAlt.innerText = Math.floor(alt);
      locSpd.innerText = Math.floor(spd);
      marker.setLatLng([lat, lon]);
      //END Edit DOM with API data

      // Center marker
      if (centerISS === true) {
        map.setView([lat, lon]);
      }
      // END Center marker

      // END ISS TRACKING
    });
}
// END GET ISS DATA

// Centralize ISS controller
function followISS() {
  let checkbox = document.getElementById("centralizeISS");

  if (checkbox.checked == true) {
    centerISS = true;
  } else {
    centerISS = false;
  }
}
// END Centralize ISS controller
