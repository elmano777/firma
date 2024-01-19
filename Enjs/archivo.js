// Carga el contenido del certificado .p12
var fs = require('fs');
var forge = require('node-forge');
var p12Password = 'Rodri2017';
var p12Path = 'CERT_Rodri_2022.p12';

fs.readFile(p12Path, function(err, data) {
    if (err) throw err;
    var p12Der = forge.util.decode64(data.toString('base64'));
    var p12Asn1 = forge.asn1.fromDer(p12Der);
    var p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, p12Password);

    // Extrae la clave privada y el certificado del archivo .p12
    var bags = p12.getBags({bagType: forge.pki.oids.pkcs8ShroudedKeyBag});
    var bag = bags[forge.pki.oids.pkcs8ShroudedKeyBag][0];
    var privateKeyPem = forge.pki.privateKeyToPem(bag.key);
    var certBags = p12.getBags({bagType: forge.pki.oids.certBag});
    var certBag = certBags[forge.pki.oids.certBag][0];
    var certificatePem = forge.pki.certificateToPem(certBag.cert);

    // Guarda la clave privada en un archivo
    fs.writeFile('private_key.pem', privateKeyPem, function(err) {
        if (err) throw err;
    });

    // Guarda el certificado en un archivo
    fs.writeFile('certificate.pem', certificatePem, function(err) {
        if (err) throw err;
    });
});
