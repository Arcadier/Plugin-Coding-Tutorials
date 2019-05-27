Authentication in Arcadier API's
================================

There are 3 users on Arcadier marketplaces:

* Administrator (Admin)
* Merchant
* Buyer

Most of the API's can only be used by only the Admin, and a select few by only the Merchant and/or Buyer. So, authentication is required for those APIs. Admins have authorization over almost all APIs.

## Authentication Type
We use the `Bearer` + `token` type of authentication. So the headers of the Auth Required for the API calls look like this:

JavaScript:
```javascript
"headers": {
	"Content-Type": "",
	"Authorization": "Bearer" + token
}
```

PHP:
```PHP
CURLOPT_HTTPHEADER => array(
    "Content-Type: application/json",
    "Authorization: Bearer {{admintoken}}"
  )
```

There are 2 ways of getting the token:
### Authentication API
The [Authentication API](https://apiv2.arcadier.com/?version=latest#546294a8-cf01-4543-a994-5929c5be2c41) uses the marketplace `client_id` and `client_secret` as Request. These 2 parameters can be found in the Account Settings of the marketplace's admin dashboard. The API responds with the Admin token: 

The data object in the 
Request:
```javascript
"data": {
    "client_id": "",
    "client_secret": "",
    "grant_type": "client_credentials",
    "scope": "admin"
  }
```
Response:
```javascript
{
  "access_token": "774-character-long-token-xxxxxxx-xxxxxx-xxxxx-xxxxxxxx-xxxxxx-xxxxx",
  "token_type": "bearer",
  "expires_in": 10799,
  "refresh_token": "",
  "UserId": ""
}
```
where `"UserId"` is the administrator ID.



## WebAPItoken from cookie
Scenario: The admin is logged in and has a script running for him/her, on the client side. If the script needs a token to call an API, then this code finds the cookie and extracts the token from it:

```javascript
function getCookie(name){
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}
var token = getCookie('webapitoken');
```
When writing the headers for the API call, you will still need to have a `"Bearer "` (don't forget the space), prefixed:
```javascript
"headers": {
	"Content-Type": "",
	"Authorization": "Bearer" + token
}
```

This is  full example:
```javascript
function getCookie(name){
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}
var token = getCookie('webapitoken');
var settings = {
    "url": "", 
    "method": "", 
    "headers": { 
        "Content-Type": "",
        "Authorisation": "Bearer " + token
    }, 
    "data": ""
};
$.ajax(settings).done(function(response) { console.log(response); });
```

## How to choose between the two methods
The [Authentication API](https://apiv2.arcadier.com/?version=latest#546294a8-cf01-4543-a994-5929c5be2c41) is used when you need admin access from a page is not an admin-logged-in page. Example: a script running on the buyer page that creates a Custom Field using API, which requires Admin Auth. You cant use the ```getCookie()``` function, because that would get the buyer's token.

The main problem with the [Authentication API](https://apiv2.arcadier.com/?version=latest#546294a8-cf01-4543-a994-5929c5be2c41) is that if written in JavaScript and executed on client side, then it exposes the `client_id` and `client_secret`. No one wants that. 

The solution would be to have that API be called using PHP. More details about this can be found [here](https://github.com/Arcadier/Tutorials/tree/master/Creating%20Custom%20Fields/Simple%20%26%20Secure%20way%20of%20Creating%20Custom%20Fields).
