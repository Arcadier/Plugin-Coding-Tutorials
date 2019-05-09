//Creating a user address can only be done by the owner of the address or the marketplace admin
//So we will need the one running to provide a userID, so that the address created is created for them. Merchants and buyers' token will only allow them to create the addresses for themselves. Admins on the other hand can specify anyone else userID and still successfully create an address for them

//get the token
function getCookie(name){
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

var userID = document.getElementbyID("userGuid").value; //get the userID
var token = getCookie('webapitoken'); //get the auth token

var data = {
      "Name": "My old address",
      "Line1": "Room number 2",
      "Line2": "Block number 3, Hall of Residence 4",
      "PostCode": "652123",
      "Delivery": true,
      "Pickup": false,
      "SpecialInstructions": "Goodbye",
      "State": "Jurong",
      "City": "Singapore",
      "Country": "Singapore",
      "CountryCode": "SG"
};

var settings = {
  "url": "https://{{your-marketplace}}.arcadier.io/api/v2/users/" + userID,
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Authorisation": "Bearer" + token
  },
  "data": JSON.stringify(data);
  
  $.ajax(settings).done(function (response) {
  console.log(response);
  console.log("POST successful");
});
      
