Adding pages to the merchant portal
===================================
The first step is to create the new page in HTML. One important thing to know before starting to
write the page is that if an empty html file is saved in the user/html folder, the page, when accessed,
will not empty.
Instead it will look like this:

<p align="center"><img src="https://drive.google.com/uc?id=1UBVbRDJPewDOMhBHeQGa3rOUWV2b4nwR"/></p>

What you are looking at right now is the marketplace’s header, footer, and no body in between.

## Adding a page for all merchants, accessible from any page. ##
* The only restriction we have for this section is making that page accessible from a merchant’s portal only. We write that restriction in JavaScript using:
```javascript
if($('#merchantId') && $('#merchantId').length){
  //do something
}
```
* Next, we will create a link and place it somewhere in the general merchant pages. For example, if we want to put it in the “Seller” dropdown menu. 
<p align="center"><img src="https://drive.google.com/uc?id=1ch_bxdY8-jx2_O_g8p6jVCvdklMCzosJ"/></p>
The script that creates the link to be out there can be in this form:

```javascript
(function() {
    var scriptSrc = document.currentScript.src;
    var packagePath = scriptSrc.replace('/scripts/scripts.js', '').trim();
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    var packageId = re.exec(scriptSrc.toLowerCase())[1];
    var hostname = window.location.hostname;

    if($('#merchantId') && $('#merchantId').length){
      
        var a = document.createElement("a"); 
        a.href = "https://" + hostname + "/user/plugins/" + packageId + "/link.html";
        a.innerHTML = "Link"; 
        a.target = "_blank";

        var b = document.createElement("li");
            b.appendChild(a);

        var c = document.querySelector("ul.seller-nav");
            c.appendChild(b);

    }
})();
```

“ul.seller-nav” is the unordered list with class = “seller-nav”, which is the element that codes for the
seller dropdown menu.
As can be seen above, the link’s URL points to an html file that was created and saved in the **user/html** folder.

* Next, we create the HTML file and give it a name that is matched on the script. In this example, we created a file with very random content:
  * A dynamically changing graph which is representing numbers being generated by a script.
  * A button that affects the look of an element.
  * A button that calls an API, displays the response, and triggers Arcadier’s Toastr notification.
  * An iframe from an external app (Spotify)
  * A random image with a random button.
```html 
<!-- begin header -->
	<link href="css/link.css" rel="stylesheet">
	<link href="css/colorchange.css" rel="stylesheet">
<!-- end header -->

<div id="chartContainer" style="height: 370px; width:100%;"></div>
<div id="banner-message">
  <p>Hello World</p>
  <button id="check">Change color</button>
</div>
<div class="api">
	<div class="first">
	  <h1>API call & Response</h1>
	  <input type="button" value="Display Categories" id="checkk">
	</div>
</div>

<iframe src="https://open.spotify.com/embed/track/3I7a9joX0lJnK9XzE38GnD" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

<!-- begin footer -->
	<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script> 
	<script type="text/javascript" src="scripts/api.js"></script>
	<script src="scripts/link.js"></script> 
	<script >
		window.onload = function () {
			var dps = [];
			var chart = new CanvasJS.Chart("chartContainer", {
				exportEnabled: true,
				title :{
					text: "Dynamic Spline Chart"
				},
				axisY: {
					includeZero: false
				},
				data: [{
					type: "spline",
					markerSize: 0,
					dataPoints: dps 
				}]});
			var xVal = 0;
			var yVal = 100;
			var updateInterval = 1000;
			var dataLength = 50; // number of dataPoints visible at any point
			var updateChart = function (count) {
				count = count || 1;
				// count is number of times loop runs to generate random dataPoints.
				for (var j = 0; j < count; j++) {	
					yVal = yVal + Math.round(5 + Math.random() *(-5-5));
					dps.push({
						x: xVal,
						y: yVal
					});
					xVal++;
				}
				if (dps.length > dataLength) {
					dps.shift();
				}
				chart.render();};
			updateChart(dataLength); 
			setInterval(function(){ updateChart() }, updateInterval); 
		}
	</script>
<!-- end footer -->
```

This HTML file is saved in the **user/html** folder.
The scripts are all saved in the **user/scripts** folder.

After correctly and successfully uploading all the files on the developer dashboard. Clicking the buttons should result in this, meaning all the scripts are working and correctly linked in
their respective directories:

<p align="center"><img src="https://drive.google.com/uc?id=1Y-Lqp0aSB69ukqjUWiRCnoiz9HreJv1L"/></p>
