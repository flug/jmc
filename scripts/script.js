$(document).ready(function() {

  $(document).foundation();

  if(localStorage['salts']) { 
	       
	  getSalts();
	  //	$("#keySalt").append(new Option(item, i));
	    
	  
  }
    $("#storage").on("click", function(){

	  var salts = JSON.parse(localStorage.salts || "null") || [];
	  if($("#salt").val().length > 10) {
		  salts.push($.trim(($("#salt").val())));	
	  }

	  localStorage.salts = JSON.stringify(salts);

      getSalts();
   });

  var Bits = 2048;
  var PassPhrase = $('#keySalt option:selected').text();
  var RSAkey  ;

  $("#keySalt").change(function(){

    RSAkey = '' ;
    PassPhrase = $('#keySalt option:selected').text();

    RSAkey = cryptico.generateRSAKey(PassPhrase, Bits);

  }).trigger("change");
  console.log(PassPhrase);

  var PublicKeyString = cryptico.publicKeyString(RSAkey);
  var PlainText;
  var EncryptionResult;
  var DecryptionResult;
  $('#message').bind("keypress keydown keyup", function(e){
    PlainText = this.value; 
    EncryptionResult = cryptico.encrypt(PlainText, PublicKeyString);

    DecryptionResult = cryptico.decrypt(EncryptionResult.cipher, RSAkey);


    $("#encrypt").val(EncryptionResult.cipher);

    $("#clair").val(DecryptionResult.plaintext);
  });
/*
$("#decrypt").bind("keypress keydown click keyup", function(e){
console.log(PassPhrase);

  decrypt = cryptico.decrypt(this.value, RSAkey);
  $("#done").val(decrypt.plaintext);
});
*/

});


function getSalts() {
  for (var i = 0; i < JSON.parse(localStorage.getItem("salts")).length; i++){
    salt = JSON.parse(localStorage.getItem("salts"));
    $("#keySalt").append(new Option(salt[i], i));
  }
}

