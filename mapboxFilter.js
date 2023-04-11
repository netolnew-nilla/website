const renderMap = async () => {
  try {
    const location = await fetch(`https://webapp.library.uvic.ca/nilla_app/api/api.php?request=all`);
    const locationData = await location.json();

    mapboxgl.accessToken = "pk.eyJ1IjoibmlsbGEtbWFwYm94IiwiYSI6ImNsY2pjaXBlcjJzdzYzcXA0ZjB1dmhweG4ifQ.HMEHTPDx5f3LCDcdEw2cWA";
    
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/nilla-mapbox/clcjk88s3009c15qsmdds4vrh", // style URL
      center: [-102, 55], // starting position [lng, lat]
      zoom: 3, // starting zoom
      projection: "globe", // display the map as a 3D globe
    }); 

    map.scrollZoom.disable(); // disable map zoom when using scroll

    const nav = new mapboxgl.NavigationControl({ showCompass: false, showZoom: true }); // Add zoom controls to the map.

    map.addControl(nav, "bottom-right");

    function flyToLocation(currentFeature) {
      map.flyTo({ center: currentFeature.geometry.coordinates, zoom: 15 });
    } // Add flyTo method to center the map on the correct location and zoom in

    locationData.forEach((locate, index) => {
      
      new mapboxgl.Marker({
        color: "#000000",
        draggable: false,
        className: `popup-id-${locate.id}`,
      })
        .setLngLat([locate.long, locate.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25, className: `popup-id-${locate.id}` }) // add popups
            .setHTML(`<h6 class="popup-title">${locate.name}</h6>
            <p class="popup-text">${locate.type} in ${locate.location}, ${locate.Province_territory}</p>
            <p class="popup-text"><b>Language:</b> ${locate.language}</p>
            <p class="popup-text"><b>Programs offered aimed at creating new speakers: </b>${locate.How_r_new_speakers_created}</p>
            <p class="popup-text"><b>Other language initiatives offered: </b>${locate.Other_lang_Progs}</p>
            <a href="/${locate.id}" class="popup-summary" target="_blank">Learn More</a>`)
        )
/*        
///////////////////// AS added Feb 24 //////////////////////////////////////////////////////////////////////////////////////////
        const listing = location.appendChild(document.createElement('div'));
          listing.className = 'item';
        
        const link = listing.appendChild(document.createElement('a'));
          link.href = '#';
           link.className = 'title';
            link.innerHTML = `${locate.location}`;

        if (locate.language) {
            link.innerHTML += ` <br /><small>${locate.language}</small>`;
        }

        const details = listing.appendChild(document.createElement('div'));
            details.innerHTML = `${locate.How_r_new_speakers_created}`;

  }
});

/////////////////////////////////////////////////left off at "Outside of eachLayer etc.../////////////////////////////////////////
  
  
  */      
        .addTo(map);
    });
    
    
  } catch (err) {
    console.error(error);
  }
};
renderMap();
