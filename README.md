## Selecting on which page and for which user my code executes ##

### Admin ###
```javascript
```
## Choosing to execute the script only for merchants:
```javascript
if($('#merchanId') && $('#merchantId').length){ 
  //do something
}
```

### Choosing to execute the script on the `item details page`, no matter who the user:
```javascript
if($("body").hasClass("item-detail-page")){ 
  //do something
}
```
### Choosing to execute a script `only for merchants` on the `item-details page`:
```javascript
if($('#merchantId') && $('#merchantId').length && $("body").hasClass("item-detail-page")){ 
  //do something
}
```
### Choosing to execute a script `only for merchants` on the `item-details page` of `Bespoke` marketplaces only:
```javascript
if($('#merchantId') && $('#merchantId').length && $("body").hasClass("item-detail-page")){ 
  $('input').each(function(){
    if($(this).attr('value') == 'bespoke'){
      //do something
    }
  })
}
```
### Choosing to execute a script `only for buyers` on `item-details page` of `Bespoke` marketplaces
only.
Merchants and buyers have only 1 thing in common:
```html
<input type = “hidden” id = “userId” value= “(somevalue)”>"</p>
```
But buyers don’t have:
```html
<input type = “hidden” id = “merchantId” value= “(somevalue)”>
```
That’s why if we want to execute a script strictly for buyers, we write the line 2-3 to return 0
if a `“merchantId”` id is found.
```javascript
if($('#merchantId') && $('#merchantId').length){
  return 0;
} else {
  if($('#userId') && $('#userId').length && $("body").hasClass("item-detail-page")){ 
    $('input').each(function(){
      if($(this).attr('value') == 'bespoke'){
        //do something
      }
    })
  }
}
```
