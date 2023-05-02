El proyecto puede ser iniciado con el comando
$ npm test

MONGODB_CNX_STR = 'mongodb://127.0.0.1:27017/ecommerce')

Las sesiones duran 3 minutos!
store: MongoStore.create({ mongoUrl: MONGODB_CNX_STR, ttl: 3*60 })

🚧🚧🚧🚧🚧🚧🚧🚧
##se deben cargar los datos en auth.confif.js que se encuentra en src\config\auth.config.js
export const githubAppId = 0000000000000000000
export const githubClienteId = ''
export const githubClientSecret = ''
export const githubCallbackUrl = 'http://localhost:8080/sessions/githubcallback'