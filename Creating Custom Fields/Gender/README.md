# What does this plugin do?
This plugin adds a gender selector in the settings page (user onboarding page) of the user dashboard. Gender is not a field that is taken when the user registers. In order to store this information this program creates a custom field named gender and store it in the current user's information.

# How does it achieve this?

### Front-End

The script makes document elements and puts them in divs that have the same class names as the other form elements in the settings page. This makes sure that the CSS applies to the new elements as well and they all look the same.

Retriving the required HTML tags
```javascript
var container = document.getElementsByClassName("seller-common-box");
var form = container[0].getElementsByTagName("form")[0];
var itemDiv = form.getElementsByClassName("item-form-group")[1];
```
Making the div for the selector
```javascript
var colMd = document.createElement("div");
colMd.setAttribute("class","col-md-6");
```
Appending the newly created tags into the existing tags
```javascript
colMd.appendChild(label);
colMd.appendChild(select);
itemDiv.appendChild(colMd);
```



### Back-end

|Action|Method|URL|Requirements|
|:---:|:---:|:---:|:---:|
|Creating Custom Fields|POST|https://{{your-marketplace}}.arcadier.io/api/v2/admins/{{adminID}}/custom-field-definitions|Marketplace URL, Authorization, Admin ID|
|Editing User Custom Fields|PUT|https://{{your-marketplace}}.arcadier.io/api/v2/{{userID}}|Marketplace URL, User ID, Authorization|
|Editing Marketplace Custom Fields|POST|https://{{your-marketplace}}.arcadier.io/api/v2/marketplaces|Marketplace URL, Authorization|

Editing an existing custom field requires Authorization, and making new custom fields requires admin ID. Since the script runs on the client's side, we cannot be dealing with authorization tokens and Admin IDs here. It is much more secure to have a PHP file (stored in the server, away from the users) handle all the API calls.

The script retrieves the data from HTML and passes this information to a PHP file. This PHP file uses admin_token.php (created when the admin installs the plugin) which uses the client ID and client secret to get the authorization token and admin ID. This PHP file then calls the APIs to create an edit custom fields

###### Sending the data to the PHP file using ajax
```javascript
var data2 = {
  'Gender':gender,
  'customFieldExists':customFieldExists,
  'Code':cf.Code,
  'userId':userId
};

//Send this data to PHP to do the necessary API calls

var apiUrl = packagePath + '/makecustomfields.php';

$.ajax({
    url: apiUrl,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data2),
    success: function(result) {
        toastr.success('Data is saved successfully.', 'Great');
    },
    error: function(error){
      console.log(error);
    }
}).done(function(){
  console.log("Sent successfully!");
});
```

###### Retrieving data on PHP side
```javascript
$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);

//Retrieve the data sent by the js code

$gender = $content['Gender'];
$UserId = $content['userId'];
$customFieldExists = $content['customFieldExists'];
$code = $content['Code'];
```

###### Making API calls on PHP side

Editing an existing custom field
```javascript
include 'callAPI.php';
include 'admin_token.php';

$data = [
  'ID'=>$UserId,
  'CustomFields'=>[
    [
      'Code'=>$code,
      'Values'=>[
        $gender
      ]
    ]
  ]
];

$url = $baseUrl.'/api/v2/users/'.$UserId;
$response = callAPI("PUT",$admin_token['access_token'],$url,$data);
```
Making a new custom fields
```javascript
$cf_data = [
  'Name'=>'gender',
  'IsMandatory'=>false,
  'DataInputType'=>'textfield',
  'ReferenceTable'=>'Users',
  'DataFieldType'=>'string',
  'IsSearchable'=>true,
  'IsSensitive'=>false,
  'Active'=>true
];

$url = $baseUrl.'/api/v2/admins/'.$admin_token['UserId'].'/custom-field-definitions';
$response = callAPI("POST",$admin_token['access_token'],$url,$cf_data);


$data = [
  'ID'=>$UserId,
  'CustomFields'=>[
    [
      'Code'=>$response['Code'],
      'Values'=>[
        $gender
      ]
    ]
  ]
];

$url = $baseUrl.'/api/v2/users/'.$UserId;
$response2 = callAPI("PUT",$admin_token['access_token'],$url,$data);
```
