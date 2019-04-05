jQuery(document).ready(function () {
    $("#checkk").click(function () {
        var hostname = window.location.hostname;
        var settings = {
            'url': '../../../api/v2/categories',
            'method': 'GET',
            'success': function(response){
                toastr.success("API call successful", "Great!");
                alert(JSON.stringify(response));
            } 
        };
        $.ajax(settings);
    });
});

function getCookie (name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
