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

  $("#keySalt").change(function () {

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


    $("#encrypt").val("jmc:"+EncryptionResult.cipher);

    $("#clair").val(DecryptionResult.plaintext);
  });



  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
      // Execute some script when the page is fully (DOM) ready
      chrome.tabs.executeScript(null, {code:"init();"});
    }
  });
  //
});


function getSalts() {
  for (var i = 0; i < JSON.parse(localStorage.getItem("salts")).length; i++){
    salt = JSON.parse(localStorage.getItem("salts"));
    $("#keySalt").append(new Option(salt[i], i));
  }
}

function init() {
  var width  = null;
  var position = null ;
  var jmc = null;

  $('*:contains("jmc:")').each(function(){
    width = $(this).css('width');
    position = $(this).position();
    jmc =  $(this).last().text().trim();
    $(this).html('<div style="text-align:center;position:absolute; z-index:1000; background: #fff; width:'+width+'; top:'+position.top +'px; left: '+position.left +'px">'
      +'<p style="font-weight: bold; text-align:center">Décryptez le message</p>'
      +' <input type="text" id="Akey" style="margin:auto; background: #fafafa; border-color: #999; border: 1px solid #ccc; color: rgba(0,0,0,0.75); display: block; font-size: 0.875rem; padding: 0.5rem; height: 2.3125rem; width: 75%;outline: none;border-radius: 0px;" />'

      +'<br/>'
      +'<button style="background-color: #007095;padding-top: 0.625rem; padding-right: 1.25rem; padding-bottom: 0.6875rem; padding-left: 1.25rem; font-size: 0.6875rem; color: #fff; display: inline-block; border: 1px solid #007095 " id="action_message" >Déchiffrer</button>'
      +'</div>');
  });

  $('<div id="crypto_message" style="display:none">'+jmc+'</'+'div>').appendTo(document.body);


  addCryptoScript();
}



function addScript(scriptURL, onload) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.setAttribute("src", scriptURL);
  if (onload) script.onload = onload;
  document.documentElement.appendChild(script);
}

function addCryptoScript(){
  addScript(chrome.extension.getURL("scripts/cryptico/jsbn.js"));
  addScript(chrome.extension.getURL("scripts/cryptico/random.js"));
  addScript(chrome.extension.getURL("scripts/cryptico/hash.js"));
  addScript(chrome.extension.getURL("scripts/cryptico/rsa.js"));
  addScript(chrome.extension.getURL("scripts/cryptico/aes.js"));
  addScript(chrome.extension.getURL("scripts/cryptico/api.js"));
  addScript(chrome.extension.getURL("scripts/cryptico/client.js"));
}
