# Ages Plugin

## Purpose of the Plugin

### User 
The plugin lets user to enter their age into their settings page. The input Age is stored in a custom Field called 'age' inside the Users reference table.

### Admin
The plugin gives statistics in the admin side, giving the frequency of people lying in age intervals of 10. Going from 0-10,10-20 uptill 90-100.

## Working

### User

#### Front-End

The script creates a new input field in the settings page, where one can enter in their age. It does so by first querying through the DOM and finding out the place where the field must be added. 

```
loc - location where the input field is added
age - input field being added
label - name of the new input field
input - DOM input being added
```

When ever the page is loaded, an API call to the GET user data. The JSON is then iterated through and the required custom field's value is displayed in the field. 


#### Back-End 
The following APIs were used in the making of this plugin, 


|Action|Method|URL|Requirements|
|:---:|:---:|:---:|:---:|
|Creating Custom Fields|POST|https://{{your-marketplace}}.arcadier.io/api/v2/admins/{{adminID}}/custom-field-definitions|Marketplace URL, Admin token, Admin ID|
|Editing User Custom Fields|PUT|https://{{your-marketplace}}.arcadier.io/api/v2/{{userID}}|Marketplace URL, User ID, Admin token|
|Editing Marketplace Custom Fields|POST|https://{{your-marketplace}}.arcadier.io/api/v2/marketplaces|Marketplace URL, Admin token|

As the admin token is required to make the API calls, we use PHP to get the admin token. This is the only way to get the admin token with the plugin. 

```php
include 'callAPI.php';

...

$admin_token = getAdminToken();
```

updating the value in a custom field if the custom field already exists, the code follows to echo a succesful message to the front end when called.
```php
if($customFieldExists){

  $data=[
    'ID' => $userID,
    'CustomFields' => [
      [
      'Code' => $code,
      'Values' => [ 
        $Age
        ]
        ]
    ]
      ];
      
      $url = $baseUrl.'/api/v2/users/'.$userID;
      $response = callAPI("PUT",$admin_token['access_token'],$url,$data);
      echo json_encode(['if',$code,$response]);
      
    }
```

calling the API to create the custom field for the user who doesn't have the custom field data

```php
else{
      // echo json_encode(["Entered else"])
      $cf_data = [
        'Name'=>'age',
        'IsMandatory'=>false,
        'DataInputType'=>'textfield',
        'ReferenceTable'=>'Users',
        'DataFieldType'=>'string',
        'IsSearchable'=>true,
        'IsSensitive'=>false,
        'Active'=>true
      ];
      
```

calling the API to update the value of the custom field linked to the user

```php
      $url = $baseUrl.'/api/v2/admins/'.$admin_token['UserId'].'/custom-field-definitions';
      
      $response = callAPI("POST",$admin_token['access_token'],$url,$cf_data);
      
      $data = [
        'ID'=>$userID,
        'CustomFields'=>[
          [
            'Code'=>$response['Code'],
            'Values'=>[
              $Age
              ]
              ]
              ]
            ];
            $url = $baseUrl.'/api/v2/users/'.$userID;
            $response2 = callAPI("PUT",$admin_token['access_token'],$url,$data);
            echo json_encode(['else',$response,$response2]);
          }
```


### Admin


In the front end, we display the age data in a tabular form. Since, the API call is being made from the admin side we don't need to use PHP to get the authorization token for making the call to the GET all users API. 

|Action|Method|URL|Requirements|
|:---:|:---:|:---:|:---:|
|Get all users|GET|https://{{your-marketplace}}.arcadier.io/api/v2/admins/{{adminID}}/users|Marketplace URL, Admin token, Admin id|

Getting all the requirements to make the API calls
```javascript
 var token = getCookie('webapitoken');
    var baseURL = window.location.hostname;
    var adminID = document.getElementById("userGuid").value;
```

Making the API calls and getting ages of all the marketplace users in a single array.
```javascript
 ages = [];
    $.ajax(settings).done(function (response) {
        records = response["Records"];
        for (i = 0; i < records.length; i++) {
            if (records[i]["CustomFields"]) {
                cf_temp = records[i]["CustomFields"];
                for (j = 0; j < cf_temp.length; j++) {
                    if (cf_temp[j]["Code"].startsWith("age")) {
                        ages.push(cf_temp[j]["Values"][0]);
                    }
                }
            }
        }
    })
```

Sorting the data in the display format
```javascript
ageRangeLimit = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    ageFrequency = []
    for (j = 0; j < ages.length; j++) {
        for (i = 0; i < ageRangeLimit.length - 1; i++) {
            ageFrequency.push(0)
            if (ages[j] < ageRangeLimit[i + 1] && ages[j] >= ageRangeLimit[i]) {
                // console.log("entered outer if");
                ageFrequency[i] += 1;


            }
        }
    }
```

Making the table which is going to be displayed

```javascript
display = document.getElementById("display");

    var mini = document.createElement("td");
    var maxi = document.createElement("td");
    var freq = document.createElement("td");
    mini.className = "col col1";
    maxi.className = "col col2";
    freq.className = "col col3";

    mini.innerHTML = "min";
    maxi.innerHTML = "max";
    freq.innerHTML = "frequency";

    header = document.createElement("tr");
    console.log(mini, maxi, freq);
    header.appendChild(mini);
    header.appendChild(maxi);
    header.appendChild(freq);
    header.className = "table-header";

    console.log(header);

    display.appendChild(header);

    console.log(display);

    for (i = 0; i < ageRangeLimit.length - 1; i++) {

        var mini = document.createElement("td");
        var maxi = document.createElement("td");
        var freq = document.createElement("td");
        var row = document.createElement("tr");
        mini.className = "col col1";
        maxi.className = "col col2";
        freq.className = "col col3";
        row.className = "table-row"

        mini.innerHTML = ageRangeLimit[i].toString();
        maxi.innerHTML = ageRangeLimit[i + 1].toString();
        freq.innerHTML = ageFrequency[i].toString();

        row.appendChild(mini);
        row.appendChild(maxi);
        row.appendChild(freq);
        console.log(row);
        display.append(row);
        console.log(display);
    }
```
