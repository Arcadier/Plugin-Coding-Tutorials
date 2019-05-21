# Secure and Simple Way of Creating Custom Fields

## What are Custom Fields?

Custom Fields(CF) are what we give to developers to store information in our databases. There are many ways of creating a Custom Field:

* Through the Admin portal

  * Created by the admin on admin dashboard. Very easy. Retrievable via API. Front-end for input; taken care of. BUT only available for merchants to fill up during an item upload, and gets displayed on the item details page.


* Through the developer dashboard

  * Also very easy. Retrievable via API. Front-end for input; you need to do it. **BUT** you can literally do anything you want with it.


* Created via API

  * There's an API to create the custom fields with a great level of detail. Find detailed documentation on this [here](https://github.com/Arcadier/Tutorials/tree/master/Creating%20Custom%20Fields)


* Created using a much simpler method, described in detail below.

## But Why?

You might ask why this method is even used. The simplest answer is, it's so much easier.

Creating a custom field is a 2 step process: 1) call the API to create it. 2) Call another API to edit it. This function lets you do that in 1 step. <br/>
All you need to do is copy & paste the javascript function given below in *your* script and add the `makecustomfields.php` and `CallAPI.php` in the same directory as your `html`, `css` and `scripts` folders. More information about this [here]().

Another reason you might want to use this method is while writing scripts that would run for Users. Since this script handles client ID's, client secrets and administrator tokens, you do not want it to be handled on client side. TLDR: it's not secure. It is more secure to let a PHP file residing in the server handle all the API calls and authentication.

## What you need to do?

1. Download the `makecutomfields.php` and `CallAPI.php` files and place them in your `admin` or `user` directory.

<p align="center">
  <img src="https://github.com/Arcadier/Tutorials/blob/master/Creating%20Custom%20Fields/Simple%20%26%20Secure%20way%20of%20Creating%20Custom%20Fields/images/directoryForPhp.JPG"/>
 </p>


2. Copy & paste the following function into the script you want to use.

  ```javascript
  var scriptSrc = document.currentScript.src;
  var index = scriptSrc.search(/\/scripts\//);
  var packagePath = scriptSrc.slice(0,index).trim();
  
  function makeCustomField(name,table,exists,code,id,value){

    var FinalResult;
    url = packagePath + '/makecustomfields.php';

    //Preparing the data to send to PHP file

    var data = {
      "Name":name,
      "Table":table,
      "Exists":exists,
      "Code":code,
      "Value":value,
      "ID":id
    }

    /*Using ajax to send the data to PHP file.
    Synchronous ajax (async:false) is used here because the function needs
    to assign result to FinalResults before it returns FinalResult.*/

    $.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        async:false,
        success: function(result) {
            toastr.success('Task successfully completed', 'Great');
            /*PHP returns a json encoded string.
            Parse the string into a JSON object and assign it to Final Result.*/
            FinalResult = JSON.parse(result); 
        },
        error: function(error){
          toastr.error('Something went wrong','Error');
        }
    });

    return FinalResult;
  }
  ```

## How to use the function?

This function can (depending on the parameters passed):

* Create new custom fields and place a value inside them.
* Upadate existing Custom Fields.

### Parameter Definations

|Parameter|Type|Use|
|:---:|:---:|:---:|
|exists|*boolean*|This is a boolean parameter. It takes in a true/false which tells the program if the Custom Field already exists. The program will use this parameter to decide whether to update an existing Custom Field or make a new one.|
|name|*string*|This parameter takes in the name of the Custom Field. This text will be used at the start of the Custom Field Code|
|table|*string*|This parameter takes in the name of the table in which you want to store the Custom Field.|
|code|*string*|This parameter is only supposed to be passed when the *exists* parameter is true. It takes the unique code of the Custom field that you want to edit. If exists is false, this parameter should be null.|
|id|*string*|This parameter takes in the user ID if the table passed is "Users". Otherwise it should remain null.|
|value|*string*|This parameter takes in the value to be stored in the custom field. If the custom field already exists, the program will  edit the Custom Field with this new value. If custom field does not exist, the program will create a new Custom Field and place this value.|

### Return Value

The returned object structure is given below

```javascript
{
  Code: "string",
  Name: "string",
  Values:[Array]
}
```

### Example code

**Making a new Custom Field**

```javascript
var name = "test";
var table = "Users";
var exists = false;
var code = null;
var id = "d7996ffd-3244-431d-852a-55e1a9c7e3cc";
var value = "My first custom field";

var response = makeCustomField(name,table,exists,code,id,value);
console.log(response);
```

Console will print the following value:
```javascript
{
  Code: "test-3guwCAnR5L",
  Name: "test",
  Values: ["My first custom field"]
}
```

If you use the [get user information](https://apiv2.arcadier.com/view/6410759/S17oxV7m/?version=latest#129fa6b1-1c39-4a41-b7b8-8aa7f2545394) API with user ID `d7996ffd-3244-431d-852a-55e1a9c7e3cc`, you will see the following:
```javascript
{
    "ID": "d7996ffd-3244-431d-852a-55e1a9c7e3cc",
    "Email": "naseerfathima2426@gmail.com",
    "FirstName": "Naseer",
    "LastName": "Ahmed Khan",
    "DisplayName": "Hacherboii1999",
    "Description": "",
    "PhoneNumber": "86502577",
    "DateJoined": 1557720278,
    "Roles": [
        "Admin"
    ],
    "Media": [
        {
            "MediaUrl": "https://hacherboii1999.sandbox.arcadier.io/images/user/naseer-mufs7gmq1l.jpg"
        }
    ],
    "CustomFields": [
        {
            "Code": "test-3guwCAnR5L",
            "Name": "test",
            "Values": [
                "My first custom field" //New Custom Field created by the function
            ]
        }
    ],
    "Onboarded": false,
    "OnboardedDateTime": 1557720532,
    "Active": true,
    "Enabled": true,
    "Visible": true
}
```

**Editing an Existing Custom Field**

```javascript
var name = "test";
var table = "Users";
var exists = true; //exists is true; program will edit an existing custom field
var code = response["Code"];
var id = "d7996ffd-3244-431d-852a-55e1a9c7e3cc";
var value = "My first custom field edit!!";

var editResponse = makeCustomField(name,table,exists,code,id,value);
console.log(editResponse);
```

Console will print the following value:

```javascript
{
  Code: "test-3guwCAnR5L",
  Name: "test",
  Values: ["My first custom field edit!!"]
}
```

If you use the [get user information](https://apiv2.arcadier.com/view/6410759/S17oxV7m/?version=latest#129fa6b1-1c39-4a41-b7b8-8aa7f2545394) API with user ID `d7996ffd-3244-431d-852a-55e1a9c7e3cc`, you will see the following:

```javascript
{
    "ID": "d7996ffd-3244-431d-852a-55e1a9c7e3cc",
    "Email": "naseerfathima2426@gmail.com",
    "FirstName": "Naseer",
    "LastName": "Ahmed Khan",
    "DisplayName": "Hacherboii1999",
    "Description": "",
    "PhoneNumber": "86502577",
    "DateJoined": 1557720278,
    "Roles": [
        "Admin"
    ],
    "Media": [
        {
            "MediaUrl": "https://hacherboii1999.sandbox.arcadier.io/images/user/naseer-mufs7gmq1l.jpg"
        }
    ],
    "CustomFields": [
        {
            "Code": "test-3guwCAnR5L",
            "Name": "test",
            "Values": [
                "My first custom field edit!!" //Custom Field edited by the function
            ]
        }
    ],
    "Onboarded": false,
    "OnboardedDateTime": 1557720532,
    "Active": true,
    "Enabled": true,
    "Visible": true
}
```

**Making a marketplace custom field**

```javascript
var name = "test";
var table = "Implementations";
var exists = false;
var code = null;
var id = null;
var value = "My first custom field";

var response = makeCustomField(name,table,exists,code,id,value);
console.log(response);
```

Console will print the following value:

```javascript
{
  Code: "test-JV5UpgWcBL",
  Name: "test",
  Values: ["My first custom field"]
}
```

If you use the [get marketplace information](https://apiv2.arcadier.com/view/6410759/S17oxV7m/?version=latest#928eac76-5bee-4bf3-9484-293551f95cde) API, you will see the following:

```javascript
{
    "ID": "48487919-f7b8-4733-8098-7f762dad683f",
    "Name": "Hacherboii1999",
    "LogoUrl": "https://hacherboii1999.sandbox.arcadier.io/images/logo-hacherboii1999.sandbox.arcadier.io.png",
    "CountryCode": "SG",
    "CurrencyCode": "SGD",
    "SeoTitle": "Hacherboii1999",
    "SeoDescription": "Hacking for life",
    "Languages": [
        "en"
    ],
    "Owner": {
        "ID": "c9996grd-2407-431r-672a-55e1a9c7e3cc",
        "Email": "naseerfathima2426@gmail.com",
        "FirstName": "Naseer",
        "LastName": "Ahmed Khan",
        "DisplayName": "Hacherboii1999",
        "Description": "",
        "Media": [
            {
                "MediaUrl": "/images/user/naseer-mufs7gmq1l.jpg"
            }
        ]
    },
    "CustomFields": [
        {
            "Code": "test-JV5UpgWcBL",
            "Name": "test",
            "Values": [
                "My first custom field" //New Custom field created by the function.
            ]
        }
    ]
}
```
