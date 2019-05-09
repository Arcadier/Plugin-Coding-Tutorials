Custom Fields(CF) are what we give to developers to store information in our databases. There's 2 ways of creatinf custom fields:
* Through the admin portal
 * Created by the admin. Very easy. Retrievable via API. Front-end = taken care of. **BUT** only available for merchants to fill up during an item upload.
 * Created on the developer dashboard. Also very easy. Retrievable via API. Front-end for input and/or display = you need to do it. **BUT** you can literally do anything you want with it.
 
During the process of creating a CF, you will have to choose in which database it will belong. For example:

If you want that CF to store information about the marketplace and retrievable by any user (who's smart enough), the you choose it's ReferenceTable to be "Implementations".

If you want a CF to be storing information for a specific user, then you choose the ReferenceTable to be "Users".

The same logic applies for items.

<h3>But Why?</h3>
<h5>API's</h5> 
It's for API's to know when its relevant to fetch data from a CF. If the CF is in a particular table, for example, in Users table, then if you call the [Get User Info](https://apiv2.arcadier.com/#129fa6b1-1c39-4a41-b7b8-8aa7f2545394) API, it will automtatically query the Users' database and find if that user has any CF associated with them. 
If you call the [Get Marketplace Info](https://apiv2.arcadier.com/#928eac76-5bee-4bf3-9484-293551f95cde) API, it will fetch data from CF's that are assoicatied with the marketplace only and ignore CFs of User's
