var select;
var cf;
var baseURL = window.location.hostname;
var userId = $("#userGuid").val();
var dictSelect = {
  "Not Selected":0,
  "Male":1,
  "Female":2,
  "Other":3
};
var scriptSrc = document.currentScript.src;
var packagePath = scriptSrc.replace('/scripts/scripts.js', '').trim();
var token = commonModule.getCookie('webapitoken');

(function(){

  //Edit the HTML page only when it is the settings page of the user's page

  if(document.body.className=="page-seller seller-items page-settings"){

    //Make the gender selection field

    var container = document.getElementsByClassName("seller-common-box");
    var form = container[0].getElementsByTagName("form")[0];
    var itemDiv = form.getElementsByClassName("item-form-group")[1];

    var colMd = document.createElement("div");
    colMd.setAttribute("class","col-md-6");

    var label = document.createElement("label");
    label.innerHTML = "Gender";

    select = document.createElement("select");
    select.setAttribute("class","required");
    select.id = "input-gender";
    select.setAttribute("onfocusout","create();"); //When user clicks out of the selector, call the create function

    var optionNotSelected = document.createElement("option");
    optionNotSelected.value = null;
    optionNotSelected.innerHTML = "Not Selected";
    var optionMale = document.createElement("option");
    optionMale.value = "Male";
    optionMale.innerHTML = "Male";
    var optionFemale = document.createElement("option");
    optionFemale.value = "Female";
    optionFemale.innerHTML = "Female";
    var optionOther = document.createElement("option");
    optionOther.value = "Other";
    optionOther.innerHTML = "Other"

    select.appendChild(optionNotSelected);
    select.appendChild(optionMale);
    select.appendChild(optionFemale);
    select.appendChild(optionOther);


    colMd.appendChild(label);
    colMd.appendChild(select);

    itemDiv.appendChild(colMd);

    //Checking if this user already has a gender custom field

    var settings = {
      "url":"https://"+baseURL+"/api/v2/users/"+userId,
      "method":"GET"
    };

    $.ajax(settings).done(function(response){

      customFields = response.CustomFields;

      $.each(customFields,function(index,customField){
        if(customField.Code.startsWith("gender")){

          //If custom field is present, then cf is set, otherwise it remains null

          cf = customField;

          //Use the value in cf to set the selector

          select.options[dictSelect[cf.Values[0]]].defaultSelected = true;

          //Break the loop
          return false;
        }
      })

    });

  }

})()

function create(){

  var gender = select.options[select.selectedIndex].value; //Get the selected gender

  customFieldExists = true;

  //The code below is necessary in case cf is null, cf.code will cause error

  if(cf==null){
    customFieldExists = false;
    cf = {
      "Code":null
    };
  }

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
      headers: {
          'Authorization': 'Bearer ' + token,
      },
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



}
