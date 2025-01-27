import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interfaces';


@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios; // AxiosInstance es una interfaz que nos permite hacer peticiones HTTP
  // Ejecutando Seed
  async executeSeed() {
  const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10') // esta seria la URL

  data.results.forEach(({ name, url })=>{ // obtenemos el name y el url

    const segments = url.split('/'); // Divide la URL en segmentos
    const no = +segments[segments.length - 2]; // Obtiene el número de la URL
    
    console.log({no, segments})
  }) 

    return data.results; // Devuelve los resultados de la API de PokéAPI
  }
}
