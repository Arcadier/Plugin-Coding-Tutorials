<?php

include 'callAPI.php';
include 'admin_token.php';

$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);

//Retrieving the data sent by javascript

$name = $content['Name'];
$table = $content['Table'];
$exists = $content['Exists'];
$code = $content['Code'];
$value = $content['Value'];
$id = $content['ID'];

function makeCustomField($name,$table,$exists,$code,$value,$id){

  $admin_token = getAdminToken();
  $baseUrl = getMarketplaceBaseUrl();
  $urlMarket = $baseUrl.'/api/v2/marketplaces';
  $marketplaceID = callAPI("GET",null,$urlMarket,null)['ID'];

  //Preparing the Update URL, Action, and the Update Data data when table is Users.

  if($table=='Users'){

    $updateUrl = $baseUrl.'/api/v2/users/'.$id;
    $action = 'PUT';
    $updateData =
    [
      'ID'=>$id,
      'CustomFields'=>
      [
        [
          'Code'=>$code,
          'Values'=>
          [
            $value
          ]
        ]
      ]
    ];

  }

  //Preparing the Update URL, Action, and the Update Data data when table is Implementatations.

  elseif($table=='Implementations'){

    $updateUrl = $baseUrl.'/api/v2/marketplaces';
    $action = 'POST';
    $updateData =
    [
      'ID'=>$marketplaceID,
      'CustomFields'=>
      [
        [
          'Code'=>$code,
          'Values'=>
          [
            $value
          ]
        ]
      ]
    ];

  }

  //Errors

  elseif($table=='Items'){
    //API doesn't exist. To be implemented in the future
    return json_encode("Items haven't been implemented yett!!");
  }
  else{
    return json_encode("Incorrect Reference Table Name!");
  }

  /*If the Custom Field exists, then just update the existing Custom field using the Custom Field code and User ID/ Marketplace ID with the value parameter.
  Store the returned data in response.
  */

  if($exists){

    $response = callAPI($action,$admin_token['access_token'],$updateUrl,$updateData);

  }

  /*If the Custom Field does not exist, Make a new Custom Field and then Update that using the new Code and User ID/Marketplace ID  with the value parameter.
  Store the returned data in response.
  */

  else{

    $cf_data = [
      'Name'=>$name,
      'IsMandatory'=>false,
      'DataInputType'=>'textfield',
      'ReferenceTable'=>$table,
      'DataFieldType'=>'string',
      'IsSearchable'=>true,
      'IsSensitive'=>false,
      'Active'=>true
    ];

    $createUrl = $baseUrl.'/api/v2/admins/'.$admin_token['UserId'].'/custom-field-definitions';
    $createResponse = callAPI("POST",$admin_token['access_token'],$createUrl,$cf_data);
    $updateData['CustomFields'][0]['Code'] = $createResponse['Code'];
    $code = $createResponse['Code'];

    $response = callAPI($action,$admin_token['access_token'],$updateUrl,$updateData);
  }

  //Use response and iterate through its Custom Fields to find the Custom Field we just edited. Then return the json encoded string of this Custom Field.

  $fields = $response['CustomFields'];
  foreach($fields as $field){
    if($field['Code']==$code){
      return json_encode($field);
    }
  }

  return json_encode("Invalid custom field code!")
}
echo makeCustomField($name,$table,$exists,$code,$value,$id); //Echo this functions result so that it can be retrievedby the javascript file.

?>
