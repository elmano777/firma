from lxml import etree
from signxml import XMLSigner 

 # Asegúrate de reemplazar "tu_archivo.xml" con el nombre de tu archivo
with open("xml_sinfirmar.xml", "rb") as f: 
    XML = f.read()

# Recuperamos nuestras claves de certificado.Para la firma, se necesitan tanto la
# clave pública como la privada. Para la validación, sólo se requiere la pública.
clave_publica = open("certificate.pem", "r").read()
clave_privada = open("private_key.pem", "r").read()

# Construimos un objeto XNL a partir de string con el contenido
nodo_raiz = etree.fromstring(XML)

# Creamos objeto XML firmado
nodo_a_firmar = etree.Element('Signature')
nodo_a_firmar_firmado = XMLSigner().sign( 
    data=nodo_a_firmar,
    key=clave_privada,
    cert=clave_publica 
)

# Insertamos el XML firmado en el elemento <ext:ExtensionContent/>
extension_content = nodo_raiz.find('.//{urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2}ExtensionContent')
for child in nodo_a_firmar_firmado:
    extension_content.append(child)

# Generamos el XML como una cadena
xml_str = etree.tostring(nodo_raiz, pretty_print=True, xml_declaration=False, encoding='ISO-8859-1')

# Agregamos manualmente la declaración XML con standalone="no"
xml_str = '<?xml version="1.0" encoding="ISO-8859-1" standalone="no"?>\n' + xml_str.decode()

# Guardamos el XML final
with open("XML_firmadoo.xml", "w") as f:
    f.write(xml_str)