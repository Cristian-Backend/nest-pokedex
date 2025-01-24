import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {


    @IsInt() // tiene que ser numero entero
    @Min(1)// tiene que ser mayor a 1
    @IsPositive() // tiene que ser positivo
    no: number; //numero de pokemon

    @IsString()
    @MinLength(1)
    name: string;

   
}
