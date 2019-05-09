var baseURL = window.location.hostname;
var token;

//this token API isn't recommended to be used in JavaScript because it exposes the client ID and secret
var settings = {
    "url": "https://" + baseURL + "/token",
    "method": "POST",
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
        "client_id": "{{client_id}}",
        "client_secret": "{{client_secret}}",
        "grant_type": "client_credentials",
        "scope": "admin"
    }
};
$.ajax(settings).done(function(admin_token) {
    token = "Bearer " + JSON.stringify(admin_token.access_token).replace(/"/g, '');
    adminID = admin_token.UserId;

    //creating JSON body for API
    var user_data = {
        "Name": "User Custom Field",
        "IsMandatory": !1,
        "DataInputType": "textfield",
        "ReferenceTable": "Users",
        "DataFieldType": "string",
        "IsSearchable": !0,
        "IsSensitive": !1,
        "Active": !0
    };

    //calling Create Custom Field API
    var settings2 = {
        "url": "https://" + baseURL + "/api/v2/admins/" + adminID + "/custom-field-definitions",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": token
        },
        "data": JSON.stringify(user_data)
    };
    $.ajax(settings2).done(function(response) {
        var creation_response = response;
        var userID = //userID of the user you want this value to be stored for

        //CReate JSON body for Update User Info API
        var data = {
            "ID": userID,
            "CustomFields": [{
                "Code": creation_response.Code,
                "Values": [value]
            }]
        };
        //call the Update User Information API
        var settings3 = {
            "url": "https://" + baseURL + "/api/v2/users/" + userID + "/",
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": token
            },
            "data": JSON.stringify(data),
        };
        $.ajax(settings3).done(function(result) {
            toastr.success("Success", "Great"); //the user now has a custom field with a value (line 54) stored in it
        })
    })
})
