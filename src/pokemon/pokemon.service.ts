import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name) // inyectamos el modelo de mongoose
    private readonly pokemonModel: Model<Pokemon> 
  ){}
  async create(createPokemonDto: CreatePokemonDto) {
    // pasamos a minuscula.
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
     // creamos el pokemon dentro del dto donde tiene los valores a crearse
    const pokemon = await this.pokemonModel.create(createPokemonDto) 
    return pokemon;
      
    } catch (error) {
      
      // error de duplicacion
      this.handleExceptions(error); // este error esta definito abajo de el archivo.
      
    }


  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) { // termino - es como un ID

    // 3 busquedas para este endpoint

    let pokemon: Pokemon // entity

    if(!isNaN(+term)){ // si es un numero
      pokemon = await this.pokemonModel.findOne({no: term}) // BUSCAR POR TERMINO , numero del pokemon.
    }

    // MognoID
    if( !pokemon && isValidObjectId(term)){ // si no existe un pokemon y es un mongoID
      pokemon = await this.pokemonModel.findById(term) // BUSCAR POR TERMINO, mongoID
    }

    // name
    if(!pokemon) pokemon = await this.pokemonModel.findOne({name: term.toLowerCase().trim()}) // BUSCAR POR TERMINO, nombre del pokemon.

     //si el pokemon no existe
    if(!pokemon) throw new NotFoundException(`Pokemon not found with term ${term}`)
    
    return pokemon;
  }

 async update(term: string, updatePokemonDto: UpdatePokemonDto) {

  const pokemon = await this.findOne( term ); // buscamos el pokemon
  if(updatePokemonDto.name) 
    updatePokemonDto.name = updatePokemonDto.name.toLowerCase(); // pasamos a minuscula

  try {
     await pokemon.updateOne(updatePokemonDto); // actualizamos el pokemon
     return { ...pokemon.toJSON(), ...updatePokemonDto }; // retornamos el pokemon actualizado con los datos nuevos
    
  } catch (error) {
    // error de duplicacion
    this.handleExceptions(error);
  
  }

     
  }

 async remove(id: string) {
    //const pokemon = await this.findOne(id); // buscamos el pokemon
    //await pokemon.deleteOne(); // eliminamos el pokemon
    
   // const result = this.pokemonModel.findByIdAndDelete(id); // eliminamos el pokemon por id
   
   // eliminamos el pokemon por id con el metodo deleteOne para evitar multiples consultas
   const { deletedCount } = await this.pokemonModel.deleteOne({_id: id});
   
   // si no se encontro el pokemon lanzamos una excepcion - deleteAcount significa que no se elimino ningun documento
   if(deletedCount === 0) throw new NotFoundException(`Pokemon not found with id ${id}`); 

   return;
  }

  // ESTE METODO ES CREADO PARA QUE NO SE REPITA UNA Y OTRA VEZ EL MISMO CODIGO.
  private handleExceptions(error: any) { 
    if (error.code === 11000) {// codigo de duplicacion
      throw new BadRequestException(`Pokemon already exists ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't update Pokemon - Check server logs`);
  }
}
