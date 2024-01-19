// Carga el certificado
var p12Der = forge.util.decode64(p12B64);
var p12Asn1 = forge.asn1.fromDer(p12Der);
var p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, mi_pwd_p12);

// Obtiene el certificado y la clave privada
var certBags = p12.getBags({bagType:forge.pki.oids.certBag});
var cert = certBags[forge.pki.oids.certBag][0].cert;
var pkcs8bags = p12.getBags({bagType:forge.pki.oids.pkcs8ShroudedKeyBag});
var pkcs8 = pkcs8bags[forge.pki.oids.pkcs8ShroudedKeyBag][0];
var key = pkcs8.key;

// Convierte el certificado a formato DER y obtiene su hash
var certificateX509_asn1 = forge.pki.certificateToAsn1(cert);
var certificateX509_der = forge.asn1.toDer(certificateX509_asn1).getBytes();
var certificateX509_der_hash = sha1_base64(certificateX509_der);

// Genera la firma del documento XML
var sha1_comprobante = sha1_base64(comprobante.replace('<?xml version="1.0" encoding="UTF-8"?>\n', ''));
