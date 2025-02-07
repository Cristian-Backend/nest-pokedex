import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {
  constructor(
    // inyectamos el modelo de mongoose para ser utilizado. // tambien hay que modificar importacion de modulos.
      @InjectModel(Pokemon.name) 
      private readonly pokemonModel: Model<Pokemon> ,
      private readonly http: AxiosAdapter, // inyectamos el adaptador de axios para hacer peticiones
    ){}


  // Ejecutando Seed
  async executeSeed() {
   // MANDAR A EXPLICAR EL CODIGO
  
    await this.pokemonModel.deleteMany({})   // Elimina todos los pokemones de la base de datos

  const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650') // esta seria la URL

  const pokemonToInsert: {name: string , no: number} [] = [] // Creamos un array para guardar los pokemones


  data.results.forEach(({ name, url })=>{ // obtenemos el name y el url

    const segments = url.split('/'); // Divide la URL en segmentos
    const no = +segments[segments.length - 2]; // Obtiene el número de la URL

    //const pokemon = await this.pokemonModel.create({name, no}) // creamos el pokemon con el nombre y el numero

    pokemonToInsert.push ({name, no}); // Agregamos el pokemon a un array de promesas  // [{name: bulbador , no: 1}] asi se veria.

    console.log({no, segments})
  }) 

  await this.pokemonModel.insertMany(pokemonToInsert) // Insertamos los pokemones en la base de datos

    return 'Seed executed'; // Devuelve los resultados de la API de PokéAPI
  }
}
