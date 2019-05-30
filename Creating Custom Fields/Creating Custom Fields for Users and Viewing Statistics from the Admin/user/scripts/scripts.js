  var userID = document.getElementById("userGuid").value;
var customFields = "";
var customFieldCode = "";
var customFieldIndex = "";
var baseURL = window.location.hostname;
var scriptSrc = document.currentScript.src;
var packagePath = scriptSrc.replace("/scripts/scripts.js", "").trim();
var token = commonModule.getCookie("webapitoken");
(function () {
  if (document.body.className == "page-seller seller-items page-settings") {
    loc = document.getElementsByClassName("item-form-group")[1];

    age = document.createElement("div");
    age.setAttribute("class", "col-md-6");

    label = document.createElement("label");
    label.innerHTML = "AGE";

    input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("name", "age");
    input.setAttribute("id", "input-age");
    input.setAttribute("class", "required");
    input.setAttribute("onfocusout", "postAge()");

    age.appendChild(label);
    age.appendChild(input);

    settings = {
      "url": "https://" + baseURL + "/api/v2/users/" + userID,
      "method": "GET",
      "async": false
    };

    $.ajax(settings).done(function (response) {
      customFields = response.CustomFields;
      console.log(response);
      console.log(customFields);
      customFieldCode = false;
      if (customFields) {
        for (i = 0; i < customFields.length; i++) {
          if (customFields[i].Code.startsWith("age")) {
            customFieldCode = customFields[i].Code;
            input.value = customFields[i]["Values"][0];
            break;
          }
        }
      }
      console.log(customFieldCode);
    });
    loc.append(age);
  }
})();

function postAge() {

  var cfExists = false;

  if (customFieldCode) {
    cfExists = true;
  }
  else {
    customFieldCode = null;
  }

  data2 = {
    "Age": input.value,
    "customFieldExists": cfExists,
    "code": customFieldCode,
    "userID": userID
  };

  apiURL = packagePath + "/createCustomField.php";
  $.ajax({
    "url": apiURL,
    "headers": {
      "Authorization": "Bearer " + token
    },
    "method": "POST",
    "data": JSON.stringify(data2),
    "success": function (result) {
      console.log("Data is saved successfully");
      console.log(JSON.parse(result));
    },
    "error": function (error) {
      console.log(error);
    }
  }).done(function () {
    console.log("Sent");
  });
}
