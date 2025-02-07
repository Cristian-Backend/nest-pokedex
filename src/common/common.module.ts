import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
     providers:[AxiosAdapter],
     exports:[AxiosAdapter] // Exportar el adaptador para que pueda ser utilizado en otros módulos 
})
export class CommonModule {}
