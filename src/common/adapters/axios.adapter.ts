import { Injectable } from "@nestjs/common";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import axios, { AxiosInstance } from 'axios';

// esto sirve por si axios cambia 
@Injectable()
export class AxiosAdapter implements HttpAdapter{

    private  axios: AxiosInstance = axios; // AxiosInstance es una interfaz que nos permite hacer peticiones HTTP
    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url)
            return data;
        } catch (error) {
            throw new Error(`This is an error - checks logs`);
        }
        
    }

}



//Propósito:
//La clase AxiosAdapter actúa como un adaptador para axios, permitiendo que el código que depende de la interfaz HttpAdapter pueda usar axios para hacer peticiones HTTP. Esto es útil para abstraer la biblioteca de HTTP utilizada, de modo que si en el futuro decides cambiar de axios a otra biblioteca, solo necesitas modificar esta clase en lugar de cambiar todo el código que hace peticiones HTTP.