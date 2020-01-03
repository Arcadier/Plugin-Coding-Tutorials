![Arcadier](https://theme.zdassets.com/theme_assets/2008942/9566e69f67b1ee67fdfbcd79b1e580bdbbc98874.svg "Arcadier")

### Topics:
1. [Creating the file structure](https://github.com/Arcadier/Coding-Tutorials/blob/master/Preparing%20your%20source%20code%20for%20upload.md#creating-the-file-structure)
2. [Naming your files](https://github.com/Arcadier/Coding-Tutorials/blob/master/Preparing%20your%20source%20code%20for%20upload.md#naming-your-files)
3. [PHP files](https://github.com/Arcadier/Coding-Tutorials/blob/master/Preparing%20your%20source%20code%20for%20upload.md#php-files)
4. [Uploading your source code](https://github.com/Arcadier/Coding-Tutorials/blob/master/Preparing%20your%20source%20code%20for%20upload.md#uploading-your-source)

### Creating the file structure
When starting to write your Plug-In's source code, the first thing to do is to create the file structure. You should do it as follows:

<p align="center"><img src="https://user-images.githubusercontent.com/6611854/71706403-a4aebb80-2e1f-11ea-84d6-b8eec52f70f8.PNG"></p>

`admin` and `user` are the two main folders - both containing the same set of subfolders `html`, `css` and `scripts`.
The source files will reside in those subfolders as shown below:
<p align="center"><img src="https://user-images.githubusercontent.com/6611854/71706618-120f1c00-2e21-11ea-9d1d-7988e5ae4344.png"></p>

### Naming your files
Each scripts subfolder can only have one script named `scripts.js`. They will run on **every** page of the marketplace. For example, if the `admin` folder contains a script called `scripts.js`, then all pages on the Admin Portal will execute the script. The same logic applies for the `user` folder - the script will execute on all buyer and merchant pages.

That is why knowing [how to choose where your script runs is important](https://github.com/Arcadier/Coding-Tutorials/blob/master/Selecting%20on%20which%20page%20and%20for%20which%20user%20my%20code%20executes.md).

Any other scripts named differently will have to be added as a ```<script src="" ></script>``` tag in the html pages for them to be executed.

If you have an `index.html` in the `admin` folder, it will be loaded *right after* installing the plug-in, and will be accessible via the **Plug-Ins** link on the sidebar of the Admin Portal. If you want any script to run on it, you will have to add the script tags ```<script src="" ></script>```.
You can see examples of the above explanation in our [Plug-In Sample Code Repository](https://github.com/Arcadier/Plug-In-Sample-Codes).

If you have an `index.html` in the `user` folder, then you will be able to do the following:
* [Adding a new page for Buyers](https://github.com/Arcadier/Coding-Tutorials/tree/master/Adding%20a%20new%20page%20for%20logged%20in%20buyers)
* [Adding a new page for Merchants](https://github.com/Arcadier/Coding-Tutorials/tree/master/Adding%20a%20new%20page%20to%20merchant)

### PHP Files
If you prefer coding in PHP, you can still do that by saving your PHP files in the main folders instead of the subfolders, as shown below:
<p align="center"><img src="https://user-images.githubusercontent.com/6611854/71707425-b8a8ec00-2e24-11ea-881f-3640ea8d9b2e.png"></p>

Please note:
* If you want buyers and merchants to be affected by the PHP files, then the PHP files should be in the `user` folder.
* If you want the admin to be affected by the PHP files, then the PHP files should be in the `admin` folder.

An example of a Plug-In Sample Code that uses PHP is the [Discount Coupon Generator](https://github.com/Arcadier/Discount-Coupon-Generator).

**Very Important**

Two PHP files are **automatically generated** when the source code is uploaded on the Developer Dashboard:
* [admin_token.php](https://github.com/Arcadier/Discount-Coupon-Generator/blob/master/user/admin_token.php) - When automatically generated, ```$client_id``` and ```$client_secret``` will be assigned their correct values for your marketplace automatically.
* [callAPI.php](https://github.com/Arcadier/Discount-Coupon-Generator/blob/master/user/callAPI.php)

### Uploading your source
Instructions on how to compress and upload to the developer dashboard is explained [here](https://github.com/Arcadier/Coding-Tutorials).
