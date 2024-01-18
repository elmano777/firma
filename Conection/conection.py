import psycopg2

# Parámetros de conexión
parametros = {
    "host": "localhost",
    "database": "pokedex",
    "user": "Pokemony1",
    "password": "Pokemony1"
}

# Crear una conexión
conexion = psycopg2.connect(**parametros)

# Crear un cursor
cursor = conexion.cursor()

# Ejecutar una consulta SQL
cursor.execute("""SELECT * FROM "pokedex-api".pokemon""")

# Obtener los resultados
resultados = cursor.fetchall()
print(resultados)

# Cerrar la conexión
conexion.close()
