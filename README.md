# Árbol Binario de Búsqueda
Esta es una aplicación web de un Árbol Binario de Búsqueda desarrollado con el stack MERN.

## Requisitos
Para correr esta aplicación se requiere instalar [NodeJS](https://nodejs.org/es/) y [MongoDB](https://www.mongodb.com/).

## Instrucciones para ejecutar la aplicación en Ubuntu
1. Instalar NodeJS.
  ```
  sudo apt-get install build-essential checkinstall
  sudo apt install nodejs
  sudo apt install npm
  ```
2. Instalar MongoDB
  ```
  sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
  echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
  sudo apt-get update
  sudo apt-get install -y mongodb-org
  ```
3. Iniciar el servidor de MongoDB.
  ```
  sudo service mongod start
  ```
4. Ubicarse en la carpeta del proyecto (donde se encuentra el archivo **package.json**) e instalar las dependencias requeridas.
  ```
  npm install --save
  ```
5. Ejecutar el proyecto con NodeJS.
  ```
  npm start
  ```

## Instrucciones para ejecutar la aplicación en Windows
1. Descargar e instalar [NodeJS](https://nodejs.org/es/) (versión LTS) y [MongoDB](https://www.mongodb.com/download-center/community) (Community version).

2. Iniciar el servidor de MongoDB.
  ```
  mkdir C:\data\db
  cd C:\Program Files\MongoDB\Server\4.0\bin\
  mongod.exe
  ```
3. Ubicarse en la carpeta del proyecto (donde se encuentra el archivo **package.json**) e instalar las dependencias requeridas.
  ```
  npm install --save
  ```
4. Ejecutar el proyecto con NodeJS.
  ```
  npm start
  ```
## Funcionamiento
Al ejecutar el proyecto se levanta un servidor en `http://localhost:3000`, cuyo `/index.html` es una página HTML que utiliza la librería React para interactuar desde el navegador con el API Rest ubicado en `/arbolbinario`.

### API Rest del Árbol Binario de Búsqueda
Este API permite obtener todos los nodos de un árbol binario de búsqueda guardado en la base de datos. Adicionalmente permite agregar nuevos nodos, obtener el ancestro común de dos nodos existentes o eliminar todos los nodos existentes del árbol.

- Para agregar un nodo se debe hacer una petición HTTP POST a la URL `http://localhost:3000/arbolbinario/add` que contenga en su body un JSON con una clave "valor" cuyo valor corresponda al nodo que se quiere introducir. El servidor responderá con un JSON que contiene las claves "status", "indice" y "mensaje". El índice representa el lugar del árbol en el que fue guardado el nodo.
  
  Ejemplo de un JSON válido para hacer la petición: 
  ```
  {"valor":"33"}
  ```
  Ejemplo de un JSON enviado por el servidor como respuesta: 
  ```
  {
    "status": "ok",
    "indice": 4,
    "mensaje": "Nodo guardado en el índice: 4."
  }
  ```
  
- Para obtener todos los nodos del árbol se debe hacer una petición HTTP GET a la URL `http://localhost:3000/arbolbinario`. El servidor responderá con un arreglo de múltiples JSON, donde cada uno representa un nodo.
  
  Ejemplo de un JSON enviado por el servidor como respuesta: 
  ```
  [
    {
        "_id": "5d37c00fea1c9d3f9b0df114",
        "indice": 0,
        "valor": 38,
        "__v": 0
    },
    {
        "_id": "5d37c014ea1c9d3f9b0df115",
        "indice": 1,
        "valor": 24,
        "__v": 0
    },
    {
        "_id": "5d37c026ea1c9d3f9b0df116",
        "indice": 2,
        "valor": 47,
        "__v": 0
    },
    {
        "_id": "5d37c091ea1c9d3f9b0df117",
        "indice": 4,
        "valor": 33,
        "__v": 0
    }
  ]
  ```
- Para obtener el ancestro común de dos nodos existentes se debe hacer una petición HTTP GET a la URL `http://localhost:3000/arbolbinario/ancestor/{nodo1}/{nodo2}` donde `{nodo1}` y `{nodo2}` representan los valores de los nodos.

  Ejemplo de una URL válida para hacer la petición: 
  
  ```
  http://localhost:3000/arbolbinario/ancestor/47/33
  ```
  Ejemplo de un JSON enviado por el servidor como respuesta: 
  ```
  {
    "status": "ok",
    "ancestro": 38,
    "mensaje": "El ancestro común mas cercano entre 47 y 33 es 38."
  }
  ```
- Para eliminar todos los nodos del arbol se debe hacer una petición HTTP DELETE a la URL `http://localhost:3000/arbolbinario`.
  
  Ejemplo de un JSON enviado por el servidor como respuesta: 
  ```
  {
    "status": "ok",
    "mensaje": "Todos los nodos del árbol han sido eliminados."
  }
  ```
