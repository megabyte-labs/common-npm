import { Module } from '@nestjs/common';
import { RunCommand } from './run/run.command';
import { TaskQuestion } from './questions/task.question';
import { ChildCommand } from './run/child/child.command';
import { CommonModule } from './common';

/**
 * Main app module
 */
@Module({
  controllers: [],
  imports: [
    CommonModule
  ],
  providers: [RunCommand, ChildCommand, TaskQuestion],
})
export class AppModule {}
