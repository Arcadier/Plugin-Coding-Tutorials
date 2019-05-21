var scriptSrc = document.currentScript.src;
var index = scriptSrc.search(/\/scripts\//);
var packagePath = scriptSrc.slice(0,index).trim();

function makeCustomField(name,table,exists,code,id,value){
  /*

  Parameter Definations

  name(string) - This parameter takes in the name of the Custom Field. This text will be used at the start of the Custom Field Code

  table(string) - This parameter takes in the name of the table in which you want to save the Custom Field.

  exists(boolean) - This is a boolean parameter. It takes in a true/false which tells the program if the Custom Field already exists.
                    The program will use this parameter to decide whether to update an existing Custom Field or to make a new one.

  code(string) - This parameter is only supposed to be passed when the exists parameter is true.
                 It takes the unique code of the Custom field that you want to edit. If exists is false, this parameter should be null.

  id(string) - This parameter takes in the user ID, in case the program is dealing with User Custom Fields.

  value(string) - This parameter takes in the value that is to be put inside the custom field.
                  If the custom field already exists, the program will use the Custom field code to edit the Custom Field and place this new value.
                  If custom field does not exist, the program will create a new Custom Field and place this value inside it.

  */

  var FinalResult;
  url = packagePath + '/makecustomfields.php';

  //Preparing the data to send to PHP file

  var data = {
    "Name":name,
    "Table":table,
    "Exists":exists,
    "Code":code,
    "Value":value,
    "ID":id
  }

  //Using ajax to send the data to PHP file. Synchronous ajax (async:false) is used here the function needs to assign result to FinalResults before it returns FinalResult.

  $.ajax({
      url: url,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      async:false,
      success: function(result) {
          toastr.success('Task successfully completed', 'Great');
          FinalResult = JSON.parse(result); //PHP returns a json encoded string. Parse the string into a JSON object and assign it to Final Result.
      },
      error: function(error){
        toastr.error('Something went wrong','Error');
      }
  });

  return FinalResult;
}
