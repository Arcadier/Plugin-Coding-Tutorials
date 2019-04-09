## Selecting on which page and for which user my code executes ##
[Admin](https://github.com/Arcadier/Tutorials#admin)
[Choosing to execute the script only for `merchants`](https://github.com/Arcadier/Tutorials#choosing-to-execute-the-script-only-for-merchants)
[Choosing to execute the script on the `item details page`, no matter who the user](https://github.com/Arcadier/Tutorials#choosing-to-execute-the-script-on-the-item-details-page-no-matter-who-the-user)
[Choosing to execute a script `only for merchants` on the `item-details page` of `Bespoke` marketplaces only](https://github.com/Arcadier/Tutorials#choosing-to-execute-a-script-only-for-merchants-on-the-item-details-page-of-bespoke-marketplaces-only)
[Choosing to execute a script `only for buyers` on `item-details page` of `Bespoke` marketplaces only](https://github.com/Arcadier/Tutorials#choosing-to-execute-a-script-only-for-buyers-on-item-details-page-of-bespoke-marketplaces-only)
---
#### Admin ####
For admins, the task gets really easy. First, the code that’s supposed to run for admins is
found only in the admin folder of your zip file.
Secondly, it can be easily detected if an admin is logged on the admin dashboard with this:
```javascript
var pathname = (window.location.pathname + window.location.search).toLowerCase();
var admin = '/admin';
if(pathname.indexOf(admin) > -1){ 
  //do something
}
```
#### Choosing to execute the script only for `merchants`:
```javascript
if($('#merchanId') && $('#merchantId').length){ 
  //do something
}
```

#### Choosing to execute the script on the `item details page`, no matter who the user:
```javascript
if($("body").hasClass("item-detail-page")){ 
  //do something
}
```
#### Choosing to execute a script `only for merchants` on the `item-details page`:
```javascript
if($('#merchantId') && $('#merchantId').length && $("body").hasClass("item-detail-page")){ 
  //do something
}
```
#### Choosing to execute a script `only for merchants` on the `item-details page` of `Bespoke` marketplaces only:
```javascript
if($('#merchantId') && $('#merchantId').length && $("body").hasClass("item-detail-page")){ 
  $('input').each(function(){
    if($(this).attr('value') == 'bespoke'){
      //do something
    }
  })
}
```
#### Choosing to execute a script `only for buyers` on `item-details page` of `Bespoke` marketplaces only.
Merchants and buyers have only 1 thing in common:
```html
<input type = “hidden” id = “userId” value= “(somevalue)”>"</p>
```
But buyers don’t have:
```html
<input type = “hidden” id = “merchantId” value= “(somevalue)”>
```
That’s why if we want to execute a script strictly for buyers, we write return 0
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
