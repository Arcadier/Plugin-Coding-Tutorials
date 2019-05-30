<?php

include 'callAPI.php';
include 'admin_token.php';


$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);

$Age = $content['Age'];
$customFieldExists = $content['customFieldExists'];
$code = $content['code'];
$userID = $content['userID'];


$admin_token = getAdminToken();
$baseUrl = getMarketplaceBaseUrl();


// echo json_encode([$customFieldExists]);
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
          
          
          
          ?>