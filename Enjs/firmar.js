var SignedXml = require("xml-crypto").SignedXml
var fs = require("fs");

// Lee el archivo XML
var xml = fs.readFileSync('xml_sinfirma.xml', 'utf8');

var sig = new SignedXml({ privateKey: fs.readFileSync("private_key.pem") });
sig.addReference({
  xpath: "//*[local-name(.)='ExtensionContent']",
  digestAlgorithm: "http://www.w3.org/2000/09/xmldsig#sha1",
  transforms: ["http://www.w3.org/2001/10/xml-exc-c14n#"],
});
sig.canonicalizationAlgorithm = "http://www.w3.org/2001/10/xml-exc-c14n#";
sig.signatureAlgorithm = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
sig.computeSignature(xml);
fs.writeFileSync("xml_firmado.xml", sig.getSignedXml());
