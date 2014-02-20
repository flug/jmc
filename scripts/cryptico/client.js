var action_message = document.getElementById("action_message");

action_message.addEventListener('click', function (e) {
    'use strict';

    var Akey = document.getElementById("Akey").value;
    var jmc = document.getElementById("crypto_message").textContent;
    var  Bits;

    var key = jmc.split(":")[1];
    var RSAkey;
    var DecryptionResult;
    console.log(key);
    if (Akey !== "undefined") {

        Bits = 2048;

        RSAkey = cryptico.generateRSAKey(Akey, Bits);

        DecryptionResult = cryptico.decrypt(key, RSAkey);

        //DecryptionResult.plaintext;
    }

}, false);
