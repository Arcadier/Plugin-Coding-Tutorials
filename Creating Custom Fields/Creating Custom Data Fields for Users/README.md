# What does this plugin do?
This Plug-In adds a dropwdown to select your gender/orientation preference selector in the settings page os users. This could be a field that is relevant to dating websites for example. Gender is not something our SaaS marketplaces ask for by default. So it has to be custom created. In order to store this information this Plug-In creates a custom field named "Gender" and stores what's input in it in the user's data.

# How does it achieve this?

### Front-End

The script creates input fields in HTML, and assigns certain classes to them. This makes sure that the same CSS applies to the new elements, creatinga a more consistent look.

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

Editing an existing custom field requires Authorization, and making new custom fields requires Admin ID. Since the script runs on the client's side, we cannot allow with authorization tokens and Admin IDs to be worked with there. This is why we have the PHP files to handle that securely on our servers.

The script retrieves the data from HTML and passes this information to PHP (makecustomfields.php). This PHP file uses `admin_token.php` (created when the admin installs the Plug-In) which uses the client ID and client secret of the marketplace to get the authorization token and admin ID. Then, the API to create custom field is called.

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
Creating a new custom field
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
```

Storing the data in the newly created custom field
```javascript
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
