//assuming this script is running on the marketplace itself
var baseURL = window.location.hostname;
var settings = {
  "url": "https://" + baseURL + "/api/v2/marketplaces",
  "method": "GET",
};

$.ajax(settings).done(function (response) {
  console.log(response.ID);
  console.log(response.Name);
});
