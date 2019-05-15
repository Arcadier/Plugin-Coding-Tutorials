# What are custom fields?

Custom Fields(CF) are what we give to developers to store information in our databases. There's 2 ways of creating custom fields:
* Through the admin portal.
 * Created by the admin on admin dashboard. Very easy. Retrievable via API. Front-end = taken care of. **BUT** only available for merchants to fill up during an item upload, and gets displayed on the item details page.
 * Created on the developer dashboard. Also very easy. Retrievable via API. Front-end for input and/or display = you need to do it. **BUT** you can literally do anything you want with it.
 * Created via API. There's an API to create the custom fields with a great level of detail (explained below).
 
During the process of creating a CF, you will have to choose in which database it will belong. For example:

If you want that CF to store information about the marketplace and retrievable by any user, then you choose it's ReferenceTable to be "Implementations".

If you want a CF to be storing information for a specific user, then you choose the ReferenceTable to be "Users".

The same logic applies for items.

<h3>But Why?</h3>
<h5>API's</h5>

It's for API's to know when its relevant to fetch data from a CF. If the CF is in a particular table, for example, in Users table, then if you call the [Get User Info](https://apiv2.arcadier.com/#129fa6b1-1c39-4a41-b7b8-8aa7f2545394) API, it will automtatically query the Users' database and find if that user has any CF associated with them. 

If you call the [Get Marketplace Info](https://apiv2.arcadier.com/#928eac76-5bee-4bf3-9484-293551f95cde) API, it will fetch data from CF's that are associated with the marketplace only and ignore CFs of User's.

It just makes the life of those API's easier. Who doesn't like happy, fast responding API's?

# How to create Custom fields
> "That's honestly the easiest thing I've learnt when I joined Arcadier" ~ Tanoo, Pre-Sales Engineer at Arcadier

If he can learn that then you definitely can. We have an API to create custom fields: [Create Custom Field](https://apiv2.arcadier.com/#27cc6867-d272-4dfb-9891-82216a63c409).

This is the body the API accepts
```JSON
{
  "Name": "string",
  "DataInputType": "string",
  "DataRegex": "string",
  "MinValue": 0,
  "MaxValue": 0,
  "ReferenceTable": "string",
  "DataFieldType": "string",
  "IsSearchable": true,
  "IsSensitive": true,
  "Active": true,
  "CreatedDateTime": "2019-03-29T07:24:03.051Z",
  "Options": [
    {
      "Name": "string"
    }
  ]
}
```
The `Code` is automatically generated and will always have what you give as `Name` as prefix. For example, if you give `"Name": "banana"`, after a successful API call, the `Code` will be automatically generated as `"banana-randomnesslevel99"`.

`"DataInputType"` can hold several values:
* `textfield`
* `checkbox`
* `dropdown`
* `number`

`"DataRegex"` will hold the Regex requirements for the Value that will be stored in them.

`"MinValue"` and `"MaxValue"` are the minimum and maximum value a number can have if `number` is chosen as `"DataInputType"`.

`"ReferenceTable"` for now can hold `"Implementations"`, `"Users"` and `"Items"`.
* Implementations will make the custom field retrivable by Marketplace API's.
* Users will make it retrievable by Accounts API's.
* Items will make it retrievable by Items API's.

`"DataFieldType"` is either `"string"`, or `"integer"`.

```json
"Options": [
    {
      "Name": "string"
    }
  ]
```
This is only relevant for dropdown and checkbox where you would have to specify options.

Knowing this, create an object 
```javascript
var object = { 
  "Name": "string",
  "DataInputType": "string",
  "DataRegex": "string",
  "MinValue": 0,
  "MaxValue": 0,
  "ReferenceTable": "string",
  "DataFieldType": "string",
  "IsSearchable": true,
  "IsSensitive": true,
  "Active": true,
  "CreatedDateTime": "2019-03-29T07:24:03.051Z",
  "Options": [
    {
      "Name": "string"
    }
  ]
};
```
Stringify it with `var data = JSON.stringify(object)`

Have the admin token, adminID and marketplace URL ready. Prepare the headers:
```javascript
var headers = {
        "url": "https://" + baseURL + "/api/v2/admins/" + adminID + "/custom-field-definitions",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        "data": JSON.stringify(user_data)
    };
```
Let Ajax do the magic:
```javascript
$.ajax(headers).done(function(response) {
   console.log(response);
});
```
Your Custom Field has been created and you may proceed to fill it up with data using our `Update` APIs.

# How to store data in the custom fields
We do that using API's.
If you chose the ReferenceTable of the custom field to be `"Implementations"`, then your custom field will be affected by **Marketplace API's**.

After creating the custom field, you will receive the custom field's `Code` in the response: `response.Code`.

Call  the [Get marketplace Information API](https://apiv2.arcadier.com/view/6410759/S17oxV7m/?version=latest#928eac76-5bee-4bf3-9484-293551f95cde). Store the `response.ID` in a variable - this is the marketplace's ID.

Call the [Update Marketplace Information API](https://apiv2.arcadier.com/view/6410759/S17oxV7m/?version=latest#73471ada-ab82-42f3-bad4-af79f5e1714b).

```javascript
var data = {
    "ID": marketplaceID,
    "CustomFields": [
        {
            "Code": response.code,
            "Values": [
                "I want to save this" //if the custom field was set to be a textfield
            ]
        }
    ]
};
```

Call the API:
```javascript
var settings = {
  "url": "https://" + baseURL + "/api/v2/marketplaces",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer" + token
  },
  "data": JSON.stringify(data)
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
If you chose the ReferenceTable of the custom field to be `"Users"`, then your custom field will be affected by **User API's**.

After creating the custom field, you will receive the custom field's `Code` in the response: `response.Code`. 

Call the [Update User Info API](https://apiv2.arcadier.com/view/6410759/S17oxV7m/?version=latest#cac4e985-84f9-48fd-bd76-0cbc1850fc66) and have the `userID` ready. Then preprare the data and call the API to save it for that `userID`.

```javascript
var data = {
    "ID": userID,
    "CustomFields": [
        {
            "Code": response.code,
            "Values": [
                "I want to save this" //if the custom field was set to be a textfield
            ]
        }
    ]
};

var settings = {
  "url": "https://" + baseURL + "/api/v2/users/" + userID,
  "method": "PUT",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer" + token
  },
  "data": JSON.stringify(data) ,
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
