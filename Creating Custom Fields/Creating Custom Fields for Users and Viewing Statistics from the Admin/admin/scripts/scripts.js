function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

$(document).ready(function () {
    var token = getCookie('webapitoken');
    var baseURL = window.location.hostname;
    var adminID = document.getElementById("userGuid").value;

    var settings = {
        "url": "https://" + baseURL + "/api/v2/admins/" + adminID + "/users",
        "method": "GET",
        "headers": {
            "Authorization": "Bearer " + token
        },
        "async": false

    };

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

    // display = document.getElementById("display");
    // for (i = 0; i < ageRangeLimit.length - 1; i++) {
    //     li = document.createElement("li");
    //     li.innerText = ageRangeLimit[i].toString() + "-" + ageRangeLimit[i + 1].toString() + ":" + ageFrequency[i].toString();
    //     console.log(li);
    //     display.append(li);
    // }

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


})()