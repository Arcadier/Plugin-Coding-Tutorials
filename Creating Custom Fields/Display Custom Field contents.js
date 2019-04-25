/*This snippet uses APIs to fetch data saved in custom fields that have been created for users. When it gets the data that is needed, 
it displays it in a table.
Assumptions:
  1. Custom Fields have already been created & saved
  2. Custom Fields were for merchants only
  3. A table has been created on the page where the script is executed:
    <table id="table">
      <th> Merchant </th>
      <th id="custom-field-column"> Custom Fields </th>
     </table>
*/
var executed = false;
var span=1;
var maxspan;
var adminID;
var baseURL = window.location.hostname;

function getUserInfo(id, callback) {
//this /token API is not recommended to be used in JavaScript, because it exposes sensitive data. 
//You can use PHP instead and pass back the variable here.
    var settings6 = {
        "url": "https://" + baseURL + "/token",
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "client_id": "",
            "client_secret": "",
            "grant_type": "client_credentials",
            "scope": "admin"
        }
    };

    $.ajax(settings6).done(function(admin_token) {
        token = "Bearer " + JSON.stringify(admin_token.access_token).replace(/"/g, '');
         adminID = admin_token.UserId;
         var url = "/api/v2/admins/" + adminID + "/users";  //API to get all users' info
        $.ajax({
            url: url,
            method: 'GET',
            headers: {
                'Authorization': token,
            },
            contentType: 'application/json',
            success: function(response) {
                if (response) {
                    callback(response.Records);
                }
            }
        });
    });
}

getUserInfo(null, function(userInfo) {
    if (userInfo != undefined) {
        for (var i = 0; i < userInfo.length; i++) { //loop through users
            for (var j = 0; j < 4; j++) { //because there are only 4 roles a user can have
                if (userInfo[i].Roles[j] === "Merchant") { //select merchants from all users

                    lastname = userInfo[i].LastName;
                    firstname = userInfo[i].FirstName;

                    $.each(userInfo[i].CustomFields, function(index, cf) { //loop through merchants' custom fields
                        if (cf.Code.startsWith("Custom Field Name")) { //if they have the custom field name
                            if (executed == false) {
                                var table = document.getElementById('table');
                                var tr = document.createElement("tr");
                                tr.id = i;
                                tr.innerHTML = "" + firstname + " " + lastname + "";
                                table.appendChild(tr);
                                executed = true;
                                console.log("create row for: ", firstname);
                            }
                            value = cf.Values[0];
                            var td = document.createElement("td");
                            td.innerHTML = "\n" + value + "";
                            document.getElementById(i).appendChild(td);
                            span++;
                            if (span > maxspan) {
                                maxspan = span;
                                document.getElementById("custom-field-column").setAttribute("colspan", maxspan);
                            }
                        }
                    });
                    //next merchant with the custom field
                    executed = false;
                    maxspan = span;
                    break; //break from the role searching loop, because merchant role has been found and that merchant has no more of the custom field we're looking for
                } else {
                    console.log("Merchant doesn't have the custom field. Next merchant.");
                }
            }
        }
    }
});
