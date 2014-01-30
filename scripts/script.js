$(document).ready(function() {

if(localStorage['salts'])
{ 
	  console.log(JSON.parse(localStorage.getItem("salts")).length);
	     
	getSalts();
	//	$("#keySalt").append(new Option(item, i));
	  
	
}
  $("#storage").on("click", function(){
  	console.log($("#salt").val().length);
	var salts = JSON.parse(localStorage.salts || "null") || [];
  	if($("#salt").val().length > 10)
  	{
  		salts.push($.trim(($("#salt").val())));	
  	}
  	localStorage.salts = JSON.stringify(salts);
getSalts();
 });
});


function getSalts()
{
	 for (var i = 0; i < JSON.parse(localStorage.getItem("salts")).length; i++){
	    salt = JSON.parse(localStorage.getItem("salts"));
	    $("#keySalt").append(new Option(salt[i], i));
	}
}