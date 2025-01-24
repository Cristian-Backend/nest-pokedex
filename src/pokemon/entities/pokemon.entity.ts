import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"; // trae todo lo relacionado a mongoose.

 @Schema() // decorador para decirle a mongoose que esto es un esquema
 export class Pokemon extends Document {

    // id: string; // mongo me lo da

    // Prop solo se utiliza para MONGODB, son propiedades del mismo.

    @Prop({
        unique: true, // para que no se repita el nombre
        index: true // para que se pueda buscar por nombre
    }) 
     name: string;

     // numero de pokemon
     @Prop({
        unique: true, // para que no se repita el numero
        index: true // para que se pueda buscar por numero
     })
     no: number;

 }

 export const PokemonSchema = SchemaFactory.createForClass( Pokemon ); // crea el esquema de mongoose