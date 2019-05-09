/*This snippet shows how you could create a a new custom field to be stored in the Implementations Reference table, 
and straight away store values in it (line 55)*/

var token;
var marketplaceID;
var baseURL = window.location.hostname;

function getmarketplaceinfo(){
		var call = {
			"url": "https://" + baseURL + "/api/v2/marketplaces",
			"method": "GET",
		};

	$.ajax(call).done(function (response) {
		marketplaceID = response.ID;
	});
}

token = "Bearer" + `//your preferred method of getting admin token`;

//create a custom field for marketplace
var cf_data = {
	"Name": "Field", //can be anything you want
	"IsMandatory": false,
	"DataInputType": "textfield", //custom field accepts text
	"ReferenceTable": "Implementations", //Implementations == marketplace database
	"DataFieldType": "string",
	"IsSearchable": true,
	"IsSensitive": false,
	"Active": true
};

//call the Create Custom Field API
var params = {
	"url": "https://" + baseURL + "/api/v2/admins/" + adminID + "/custom-field-definitions",
	"method": "POST",
	"headers": {
		"Content-Type": "application/json",
		"Authorization": token
	},
	"data": JSON.stringify(cf_data)
};

$.ajax(params).done(function(response) {
	creation_response = response;
	getmarketplaceinfo();

	//store the value in the custom field
	var data = {
		"ID": marketplaceID,
		"CustomFields": [
			{
				"Code": creation_response.Code,
				"Values": [
					"Value that you want to store"
				]
			}
		]
	};

	//store the value we want in the marketplace custom field
	var mp_params = {
		"url": "https://" + baseURL + "/api/v2/marketplaces",
		"method": "POST",
		"headers": {
			"Content-Type": "application/json",
			"Authorization": token
		},
		"data": JSON.stringify(data)
	};
	
	$.ajax(mp_params).done(function(result) {
		toastr.success("Custom field Saved in Marketplace", "Great");
		//location.reload(true);
	});
});
