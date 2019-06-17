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

First you will need a Developer Dashboard for sandbox. The dashboard allows you to create your plug-ins, upload your code, edit your Plug-In details, restrict access and visibility. To get one, contact devsupport@arcadier.com.

Once you receive credentials to login to your own dashboard, you can start creating your first Plug-In. After logging-in, you will see the list of your Plug-Ins. Click on "Add Package" on the top right corner to create a new one.

![Homepage](https://bootstrap.arcadier.com/github/1.PNG)

Give the Plug-In a name and a description, and click on "Save".

![Create New](https://bootstrap.arcadier.com/github/2.PNG)

![Giving Details](https://bootstrap.arcadier.com/github/3.PNG)

Now the plug-in should appear in the homepage. To upload the Plug-In's code, click on the edit button on its right.

![Editing](https://bootstrap.arcadier.com/github/4.png)

On the "File Management" tab, there will be an upload button for you to upload your code files, compressed in a .zip folder. Then click on "Save".

![Uploading](https://bootstrap.arcadier.com/github/5.png)

-----------------------------------------------------------------------------------------------------------------------------

Now that you know how to upload your code, let's start coding. Starting by the simplest: a "Hello World" on the marketplace admin dashboard.

```html
<!-- header begin -->
<!-- header end -->

<div>
  <p id="test">Hello World</p>
  <button id="try"> Click me! </button>
</div>

<!-- footer begin -->
<script type="text/javascript" src="scripts/script.js"></script>
<!-- footer end -->

```
Save the code above as `index.html` in a folder called "html"

```javascript
  $("#try").click(function() {
  	document.getElementById("test").setAttribute("style", "background-color: blue;");
  });
```
Save this code as a "script.js" file in a folder called "scripts"

```CSS
button {
  height: 60px;
  border-radius: 10px;
  border-color: #00F;
}
```
Save the CSS above as "style.css" in a folder called "css".

Now save the "html", "css", and "scripts" folders in a root folder called "admin".
Create another folder in the same directory as "admin", and name it "user".
"user" will contain the same folders "html", "css", and "scripts", but they will be empty (for now).

Zip "admin" and "user" **together** in a single .zip folder.

Upload that zip file on the Developer Dashboard. Then click "Save". This will redirect you to the homepage of the developer dashboard. Make sure the Plug-In is set to "Show" and "Enable".

Login on the Admin Portal of your sandbox marketplace.
Navigate to Plug-Ins on the left pane.
Find "Hello World".
Accept Terms and Conditions and click on "Install".
