jQuery(document).ready(function() {
  if ($("body").hasClass("item-detail-page")) {

    var b = document.createElement("button"); //Create the button.
    b.id = "check"; //Add an id to it.
    var t = document.createTextNode("Display Random Table"); //Add some text to the button.
    b.appendChild(t);

    var container = document.querySelector(".merchant-name2"); //choose the element to put that button in
    container.appendChild(b);

    $("#check").click(function() { //this function triggers when the button with id="check" is clicked
      var container2 = document.querySelector(".item-detail-right"),
        tbl = document.createElement('table');
        tbl.style.width = '100px';
        tbl.style.border = '1px solid black';

      for (var i = 0; i < 3; i++) {
        var tr = tbl.insertRow();
        for (var j = 0; j < 2; j++) {
          if (i == 2 && j == 1) {
            break;
          } else {
            var td = tr.insertCell();
            td.appendChild(document.createTextNode('Cell'));
            td.style.border = '1px solid black';
            if (i == 1 && j == 1) {
              td.setAttribute('rowSpan', '2');
            }
          }
        }
      }
      container2.appendChild(tbl);
    });
  }
});