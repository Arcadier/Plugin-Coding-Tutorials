In this tutorial, we will have the admin input some data that we think is necessary for the plug-in to work properly. This data wll be saved in our databases to be used later in other parts of the marketplace, or any external website. Some real life examples of such data are:
* Tokens
* Promo Codes
* Keys
* Information not asked by default on Arcadier's onboarding processes like:
  * Age
  * Gender
  * Marital Status
  * Profession

In the following example, we will create a custom field called “Collect Data”. It will be a text field,
and the aim is to collect a random number (token) from the admin. We will choose this data to be
saved in the “Users” database. That will be retrievable by APIs later, at any time – this can be done
using the Get user info API for example.

First we get the user input. In this case, we want it in the admin dashboard. So we write this HTML file and save in the `admin/html` folder
```html
<div class="col-sm-9 main-content">
    <div class="page-content">
        <div class="gutter-wrapper">
                <div class="show-right-broder mt-20">
                    <p>Data</p>
                    <input id="custom-field-1" name="custom-field-1" type="text" value="" >
                </div>
                <div class="mt-20">
                    <input type="button" class="link-id-btn" value="Save" name="save" id="edit-btn">
                </div>

                <div id="fetch1"></div>            
        </div>
    </div>
</div>

<!-- begin footer -->
<script type="text/javascript" src="scripts/customfield.js"></script>
<!-- end footer -->
```

In the script, we code for an event handler that executes on the button click, then takes the input and stores it in the "Users" Database
### Define some globals
```javascript
//these globals are wrapped inside a single function so they remain private to this script when being executed.
(function() {
    var scriptSrc = document.currentScript.src;
    var packagePath = scriptSrc.replace('/scripts/customfield.js', '').trim();
    var token = commonModule.getCookie('webapitoken'); 
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    var packageId = re.exec(scriptSrc.toLowerCase())[1];
    var customFieldPrefix = packageId.replace(/-/g, "");
    
    //rest of code
    
})();
```
### The click listener:
```javascript
$(document).ready(function() {

        $('#edit-btn').click(function() {      
            saveKeys();
        });
```
### Identifying the custom field in the Database
```javascript
function getMarketplaceCustomFields(callback) {
   var apiUrl = '/api/v2/marketplaces'
      $.ajax({
         url: apiUrl,
         method: 'GET',
         contentType: 'application/json',
         success: function(result) {
            if (result) {
               callback(result.CustomFields);
            }
         }
      });
}
getMarketplaceCustomFields(function(result) {
   $.each(result, function(index, cf) {
       if (cf.Name == 'Custom Field 1' && cf.Code.startsWith(customFieldPrefix)) {
            var code = cf.Code;
            var name = cf.Name;
   }
});
```
### Authenticating as Admin for the API
```javascript
function getCookie(name){
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}
```

### The event that triggers after click
```javascript
function saveKeys() {  
  //Construct the data object
  var data = {
   "CustomFields": [
      {
        "Code": code,
        "Name": name,
        "Values": [
          $('#custom-field-1').val() //the id of the input field on the HTML page, and its value
        ]
      }
    ]
  }

  //Prepare API request headers and body
  var settings = {
    "url": "https://{{your-marketplace}}.arcadier.io/api/v2/users/{{adminID}}",
    "method": "PUT",
    "headers": {
       "Content-Type": "application/json"
       "Authorization": "Bearer" + token;
    },
    "data": JSON.stringify(data)
  };

  //Send the request
  $.ajax(settings).done(function (response) {
    console.log(response);
    toastr.success('Data is saved successfully.', 'Great');
    window.location.reload(true);
  });
}
```
After this script successfully executes, whatever the user has input will be saved in the database.

