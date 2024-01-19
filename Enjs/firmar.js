var SignedXml = require("xml-crypto").SignedXml;
var fs = require("fs");
var xpath = require("xpath");
var dom = require("xmldom").DOMParser;

// Lee el archivo XML
var xml = fs.readFileSync("xml_sinfirma.xml", "utf8");
var doc = new dom().parseFromString(xml);

var sig = new SignedXml({
  privateKey: fs.readFileSync("private_key.pem"),
  publicCert: fs.readFileSync("certificate.pem"),
});
sig.addReference({
  xpath: "//*[local-name(.)='ExtensionContent']",
  digestAlgorithm: "http://www.w3.org/2000/09/xmldsig#sha1",
  transforms: ["http://www.w3.org/2001/10/xml-exc-c14n#"],
});
sig.canonicalizationAlgorithm = "http://www.w3.org/2001/10/xml-exc-c14n#";
sig.signatureAlgorithm = "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
sig.computeSignature(xml);
fs.writeFileSync("xml_firmado.xml", sig.getSignedXml());

// Encuentra el elemento ExtensionContent y añade la firma
var select = xpath.select;
var nodes = select("//*[local-name(.)='ExtensionContent']", doc);
var signature = sig.getSignatureXml();
var parser = new dom();
var signatureNode = parser.parseFromString(signature);
nodes[0].appendChild(signatureNode);

// Guarda el XML firmado
fs.writeFileSync("xml_firmado.xml", doc.toString());
