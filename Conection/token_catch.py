import requests

# URL del endpoint
url = "https://api-seguridad.sunat.gob.pe/v1/clientessol/b6f8235c-1878-499e-b800-f591ee409126/oauth2/token/"

# Datos que quieres enviar como x-www-form-urlencoded
body = {
    "grant_type": "password",
    "scope": "https://api-cpe.sunat.gob.pe/",
    "client_id": "b6f8235c-1878-499e-b800-f591ee409126",
    "client_secret": "atfAd/E4vK4p1Lo0SS1XDg==",
    "username": "20602391133UCHUGGIN",
    "password": "hecesinse",
}

# Realizar la solicitud POST
respuesta = requests.post(url=url, data=body)

# Imprimir la respuesta
try:
    print(respuesta.json())
except ValueError:
    print("La respuesta no es un JSON válido.")
