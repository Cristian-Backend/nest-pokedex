import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule, // Importar el módulo de configuración
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]), // Importar el schema de Mongoose
  ],
  exports: [MongooseModule], // Exportar el módulo de Mongoose para ser utilizado en otros servicios.
})
export class PokemonModule {}
