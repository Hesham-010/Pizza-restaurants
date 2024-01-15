import { Module } from '@nestjs/common';
import { InstructionService } from './services/instruction.service';
import { InstructionResolver } from './resolvers/instruction.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instruction } from './entities/instraction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instruction])],
  providers: [InstructionResolver, InstructionService],
})
export class InstructionModule {}
