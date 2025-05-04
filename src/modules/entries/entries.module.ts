import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { Entry } from './entities/entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  controllers: [],
  providers: [EntriesService],
  exports: [EntriesService],
})
export class EntriesModule {}
