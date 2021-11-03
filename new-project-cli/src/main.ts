import { CommandFactory } from 'nest-commander'
import { AppModule } from './app.module'
import { LogService } from './common/log/log.service'

/**
 * Application entry point
 */
async function bootstrap() {
  await CommandFactory.run(AppModule, new LogService())
}
bootstrap()
