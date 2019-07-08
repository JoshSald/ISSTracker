## What is The ISS Tracker

**The ISS tracker** was built as an educational tool for children (and adults) who are interested in the the International Space Station and want to be able to spot it in the night sky. It is purposefully designed to be minimal to keep on screen distractions at a minimum. [View it live here](https://tracktheiss.netlify.com/)

### Features

- Track the ISS live on the map
- Map shows whether the ISS is in the earth's shadow
- Live video stream directly from the ISS (desktop only)
- Pause/Play controls for the live stream (desktop only)
- List of dates and times over the next 10 days when the ISS will fly overhead (based on local clock settings rather than UTC)
- Viewing Conditions for each overhead pass (based on how bright it will be).
- Frequently Asked Questions about the ISS
- Information on the crew aboard the ISS and how many days they have been in space compared to the current day

### Tools

- n2yo API: pass data
- wheretheissat API: ISS Location
- Ustream Embed API: video player controls
- Leaflet: JS map library
- OpenStreetMap: map tiles
- [Terminator](https://github.com/joergdietrich/Leaflet.Terminator): daylight mapping
- Bootstrap: accordion menu styling

### Troubleshooting

##### I cannot move around on the map

By default, the map automatically centers itself to the ISS's location. Make sure that the "Follow ISS" icon is unchecked if you want to explore the map.

##### It keeps telling me that there won't be any sightings

Two basic conditions need to be met for anyone on the globe to observe the International Space Station (ISS) from any location:

- The ISS needs to pass roughly overhead of your location, and
- It needs to do that during night so it's visible to the naked eye

Due to various factors such as your location on the globe compared to the ISS' orbit, the season, the earth's rotation, and even weather conditions/cloud cover (which the Tracker does not predict or take into account), the ISS may not meet the 2 criterea mentioned above. The ISS probably does fly over your location a few times every day, but the ISS isn't bright enough (doesn't reflect enough light with its truss and solar panels) during the day to be brighter than the day skies. The tracker only takes into account **visible** overhead passes and ignores the passes that happen during the day when you cannot see it.

_**Line 27** in the "isstracker.js" file includes a test link to Rio De Janeiro if you want to see what a list of passes would look like. Don't forget to comment out the link at **Line 24** before you do so._

##### The background is black. Is the stream working?

For every orbit around the earth,the ISS flies into the earth's shadow for roughly 45 minutes. This may just look a black screen if the weather conditions block city lights from view or if the ISS is flying over an uninhabited patch of land or body of water. Check the map to see where the ISS is to make sure it's flying in the daylight. If you see an IBM logo on the top right of your screen, the stream should be working.

##### The Stream won't start on Google Chrome

go to `chrome://flags/#autoplay-policy` and change your settings to "No user gesture is required" to allow the player to automatically play the stream

##### The People in Space section is not up to date

The `astronauts.json` file is updated manually by myself, which isn't an ideal solution. In the future, that will be automated to be up to date with the current data from the ISS.
