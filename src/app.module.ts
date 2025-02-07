import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path'; // en node
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
dotenv.config()




@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration], // para leer las variables de entorno del archivo Config
      validationSchema: JoiValidationSchema, // para validar las variables de entorno
    }), 

    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname,'..','public'),
    }),

    MongooseModule.forRoot(process.env.MONGODB,{
      family: 4, 
    }), // conexion a la base de datos
    


    PokemonModule, CommonModule, SeedModule,

    
   
  ],

})
export class AppModule {
 
}
