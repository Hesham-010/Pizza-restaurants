import { Module } from '@nestjs/common';
import { StorService } from './service/stor.service';
import { StorResolver } from './resolver/stor.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/stor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [StorResolver, StorService],
})
export class StorModule {}
