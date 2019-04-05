(function() {
    var scriptSrc = document.currentScript.src;
    var packagePath = scriptSrc.replace('/scripts/scripts.js', '').trim();
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    var packageId = re.exec(scriptSrc.toLowerCase())[1];
    var hostname = window.location.hostname;

    if($('#merchantId') && $('#merchantId').length){
      
        var a = document.createElement("a"); 
        a.href = "https://" + hostname + "/user/plugins/" + packageId + "/link.html";
        a.innerHTML = "Link"; 
        a.target = "_blank";

        var b = document.createElement("li");
            b.appendChild(a);

        var c = document.querySelector("ul.seller-nav");
            c.appendChild(b);

    }
})();

