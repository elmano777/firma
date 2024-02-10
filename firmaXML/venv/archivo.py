import requests
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.serialization import pkcs12
from cryptography.hazmat.backends import default_backend

# Ruta al archivo .p12
p12_path = "cert_LYF_2024.p12"
# Contraseña del archivo .p12
p12_password = "LyF20241"

# Carga el archivo .p12
with open(p12_path, 'rb') as f:
    p12_data = f.read()

# Extrae la clave privada y el certificado del archivo .p12
private_key, certificate, additional_certificates = pkcs12.load_key_and_certificates(
    p12_data,
    p12_password.encode(),
    backend=default_backend()
)

# Guarda la clave privada en un archivo
with open('private_key.pem', 'wb') as f:
    f.write(private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    ))

# Guarda el certificado en un archivo
with open('certificate.pem', 'wb') as f:
    f.write(certificate.public_bytes(serialization.Encoding.PEM))

# Usa la clave privada y el certificado para hacer una solicitud
response = requests.get("https://ejemplo.com", cert=('certificate.pem', 'private_key.pem'))

# Imprime la respuesta
print(response.text)
