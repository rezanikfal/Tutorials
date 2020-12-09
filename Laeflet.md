```diff
- global-base-map.component.html:48 ERROR TypeError: Cannot read property '_leaflet_id' of undefined
```
You are probably __NOT__ adding a layer to the map i.e. ```this.p1 = L.marker([100, 100]).addTo(this.map)``` but removing the layer from the map i.e. ```this.map.removeLayer(this.p1)``` somewhere else  
