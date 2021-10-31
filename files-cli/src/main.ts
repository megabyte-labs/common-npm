import { CommandFactory } from 'nest-commander'
import { AppModule } from './app.module'
import { AppService } from './app.service'

/**
 * Application entry point
 */
async function bootstrap() {
  await CommandFactory.run(AppModule)
}
bootstrap()
