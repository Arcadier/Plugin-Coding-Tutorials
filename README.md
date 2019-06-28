![Arcadier](https://theme.zdassets.com/theme_assets/2008942/9566e69f67b1ee67fdfbcd79b1e580bdbbc98874.svg "Arcadier")
  
If you are not familiar with Arcadier’s system or creation of Plug-Ins, then you have come to the right
place to learn all you need to become a plug-in developer.
We have documentation on our:
* [API v2.0](https://apiv2.arcadier.com)
* [Front-end](https://api.arcadier.com)

We have Github repositories for:
* [Plug in demos](https://github.com/Arcadier/Plug-In-Demos)
* [Developer Community Support](https://github.com/Arcadier/Developer-Community-Support)
* [Tutorials and Guides](https://github.com/Arcadier/Tutorials)

And finally, to test and play with our system:
* [Our sandbox marketplaces](https://api.arcadier.com/get-started)

These little code snippets and their descriptions aim at showing you how to create *very* basic functions that are expected out of Plug-Ins, like
* Adding front-end changes to our pages
* Creating new pages
* Choosing the type of user you would like the code to execucte for
* Calling API's
* Storing data in back-end
* Fetching data from the back-end

Feel free to Ctrl+C, Ctrl+V them or suggest improvement them through pull-requests. Our developers don't have ego issues.

## Creating your first Plug-In on Sandbox ##

This tutorial will allow you to understand the process of creating, uploading, and using Plug-Ins in your sandbox marketplace. To begin, you will need a Developer's account for sandbox. This account will allow you to create your Plug-Ins, upload your code, restrict access and visibility, and edit your Plug-In details. To obtain one, please contact devsupport@arcadier.com.

Once you have received your info, visit [the Developer's dashboard](https://dashboard.sandbox.arcadier.io/account/login) to login to your own dashboard. After logging-in, your dashboard will display a list of your available Plug-Ins. To create a new Plug-In, click on “Add Package” on the top right corner of the page.

<img width="1437" alt="Screen Shot 2019-06-28 at 2 36 51 PM" src="https://user-images.githubusercontent.com/6611854/60322617-7f457e80-99b2-11e9-827c-81b727532530.png">

Give the Plug-In an appropriate name and description and click on “Save” to create it.

<img width="1434" alt="Screen Shot 2019-06-25 at 11 01 00 AM" src="https://user-images.githubusercontent.com/6611854/60079640-ec61d580-9760-11e9-9815-df22656e0298.png">

<img width="1435" alt="Screen Shot 2019-06-25 at 11 01 27 AM" src="https://user-images.githubusercontent.com/6611854/60079648-eff55c80-9760-11e9-8ddf-f42aa83ef0ea.png">

Now the Plug-In should appear in the bottom of the Developer's dashboard. Click on the edit button on its right to upload the Plug-In’s code. 

<img width="1435" alt="Screen Shot 2019-06-28 at 2 37 17 PM" src="https://user-images.githubusercontent.com/6611854/60322742-caf82800-99b2-11e9-845f-f0f6c7ddafd0.png">

This should direct you to a page that allows you to edit the details of the Plug-In. Keep this page steady as we will return to it once we finish the code.

<img width="1436" alt="Screen Shot 2019-06-25 at 11 02 38 AM" src="https://user-images.githubusercontent.com/6611854/60079943-8590ec00-9761-11e9-8aaa-25cd562224f3.png">

-----------------------------------------------------------------------------------------------------------------------------

In order to upload a code, you have to have a code to begin with. First of all, we will need a locating folder for our code file. To avoid any issues with our software, the structure of your internal folder should follow a specific outline. Begin by creating a folder and naming it something parallel to the function of the Plug-In. In this example, we will name the root folder “Hello World”. Inside this root folder, create two folders named “admin” and “user” and in BOTH folders, create three folders named “html”, “css”, and “scripts”. You may follow the pictures below as a guideline. 

![Screen Shot 2019-06-24 at 4](https://user-images.githubusercontent.com/6611854/60322906-3f32cb80-99b3-11e9-820c-40018c94d88e.png)

![Screen Shot 2019-06-24 at 5](https://user-images.githubusercontent.com/6611854/60080049-bec95c00-9761-11e9-894c-07fb22ddc9aa.png)

Respectively, the “admin” folder contains the Plug-In’s code that alters the admin’s page where as the “user” folder contains code that corresponds to the user’s page (Merchant, Buyer, Admin, etc.).

Once we have this set up, let’s start by coding the simplest “Hello World” on the marketplace admin dashboard using any basic text editor.

```html
<!-- header begin -->
<link rel = "stylesheet" type = "text/css" href = "css/style.css">
<!-- header end -->

<div>
	<p id = "banner-message">
		Hello World
	</p>
	<button>
		Click me!
	</button>
</div>

<!-- footer begin -->
<script type = "text/javascript" src = "scripts/script.js"></script>
<!-- footer end -->
```
Save the code above as “index.html” inside the “html” folder of “admin”.

```javascript
// find elements
var banner = $("#banner-message")
var button = $("button")

// handle click and add class
button.on("click", function(){
  banner.addClass("alt")
});
```
Save the code above as “script.js” inside the “scripts” folder of “admin”.

```CSS
body {
	background: #20262E;
	padding: 20px;
	font-family: Helvetica;
  }
  
  #banner-message {
	background: #fff;
	border-radius: 4px;
	padding: 20px;
	font-size: 25px;
	text-align: center;
	transition: all 0.2s;
	margin: 0 auto;
	width: 300px;
  }
  
  button {
	background: #0084ff;
	border: none;
	border-radius: 5px;
	padding: 8px 14px;
	font-size: 15px;
	color: #fff;
  }
  
  #banner-message.alt {
	background: #0084ff;
	color: #fff;
	margin-top: 40px;
	width: 200px;
  }
  
  #banner-message.alt button {
	background: #fff;
	color: #000;
  }
```
Save the code above as “style.css” inside the “css” folder of “admin”.

Understandably, the “user” folder is empty for now. However, zip the “admin” and “user” together in a single .zip folder. Do not pay unnecessary attention to the name of the .zip file.

![Screen Shot 2019-06-25 at 10](https://user-images.githubusercontent.com/6611854/60080411-752d4100-9762-11e9-9768-1c46834a1bb5.png)

![Screen Shot 2019-06-25 at 400](https://user-images.githubusercontent.com/6611854/60080523-ad348400-9762-11e9-9699-2b904663f3ed.png)

-----------------------------------------------------------------------------------------------------------------------------

Going back to the Package Details page, upload that .zip file on the Developer Dashboard by clicking on the blue “Upload” button under the “File Management” tab. Once the Package Name, Package Description, and File Management are all completed, click “Save” and the Plug-In will be available in your sandbox marketplace. 

<img width="1435" alt="Screen Shot 2019-06-28 at 2 37 33 PM" src="https://user-images.githubusercontent.com/6611854/60322655-92584e80-99b2-11e9-8d26-e83232230ef6.png">

Make sure that the Plug-In is set to “Show” and “Enable”.

<img width="1435" alt="Screen Shot 2019-06-28 at 2 37 17 PM" src="https://user-images.githubusercontent.com/6611854/60322718-bae04880-99b2-11e9-9f49-c58f5cd3c0b2.png">

Login on the Admin Portal of your sandbox marketplace. Navigate to Plug-Ins on the left pane. Under the “Available” tab, find your “Hello World” Plug-In. 

<img width="1435" alt="Screen Shot 2019-06-25 at 11 04 13 AM" src="https://user-images.githubusercontent.com/6611854/60323064-98026400-99b3-11e9-863b-27b18a38b2f2.png">

<img width="1435" alt="Screen Shot 2019-06-25 at 11 05 56 AM" src="https://user-images.githubusercontent.com/6611854/60323065-98026400-99b3-11e9-8d88-e5589823ca48.png">

Install the Plug-In and this should redirect you to the completed page of Hello World.

<img width="1436" alt="Screen Shot 2019-06-25 at 11 06 09 AM" src="https://user-images.githubusercontent.com/6611854/60323118-b8cab980-99b3-11e9-92fd-bc817551fbc0.png">

Check to see that the button does indeed change the background color of your “Hello World” text to blue.

<img width="1435" alt="Screen Shot 2019-06-25 at 11 06 27 AM" src="https://user-images.githubusercontent.com/6611854/60080765-1f0ccd80-9763-11e9-95d9-88876200fa5c.png">

<img width="1436" alt="Screen Shot 2019-06-25 at 11 06 47 AM" src="https://user-images.githubusercontent.com/6611854/60080769-203dfa80-9763-11e9-9c2b-0fe2f3b10f3f.png">

You can now create multiple Plug-Ins based on your own unique codes!
