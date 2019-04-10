![Arcadier](https://theme.zdassets.com/theme_assets/2008942/9566e69f67b1ee67fdfbcd79b1e580bdbbc98874.svg "Arcadier")

Change existing pages on the buyer portal
===
Adding changes to the buyers' portal is very to do using simple JavaScript and a quick inspection of the HTML tags of the page that you want to change.

For example if you want to add a button to the item details page of a marketplace, simply code as you would normally code an HTML button (but in JS), and place it in the container you want. More information about choosing the page and user for which you want your code to be used is found [here.](https://github.com/Arcadier/Tutorials/blob/master/Selecting%20on%20which%20page%20and%20for%20which%20user%20my%20code%20executes.md)

```javascript
if($('body').hasClass('item-detail-page')){  //if the page is the item detail page
  var button = document.createELement("button");
      button.id = "check";
      
  var txt = docuemnt.createTextNode("Display Random Table");
      button.appendChild(txt);
      
  var container = dociument.querySelector(".merchant-name2")  //personal choice of position
      container.appendChild(button);
}
```
Then, as from here, you can continue writing your script to speciffy what happens when the button is clicked, and where do the changes occur.

In this example, for completely random reasons, it creates a table. So, to create a table on click:

```javascript
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
```
