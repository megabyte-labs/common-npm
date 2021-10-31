import { Module } from '@nestjs/common';
import { AppService } from './app.service';

@Module({
  controllers: [],
  imports: [],
  providers: [AppService],
})
/**
 * Main app module
 */
export class AppModule {}
