<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. clonar el repositorio
2. ejecutar

```
npm install 
```

3. tenes nest CLI instalado 

```
nest i -g @nestjs/cli
```

4. levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo __.env.template__ y renombrar la copia a __env__

6. LLenar las variables de entorno definidas en el __env__

7. ejecutar aplicaicon en dev

```
npm run start:dev
```


8. Recontruir la base de datos con la semilla.

```
http://localhost:3000/api/v2/seed
```

## Stack usado

- MongoDB

- NestJS