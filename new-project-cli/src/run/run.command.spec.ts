// REFERENCE(Integration examples): https://github.com/jmcdo29/nest-commander/tree/main/integration
import { LogService } from '../common'
import { TestingModule } from '@nestjs/testing'
import { CommandTestFactory } from 'nest-commander-testing'
import { AppModule } from '../app.module'

describe('RunCommand', () => {
  let commandModule: TestingModule
  let logService: LogService
  const exitMock: jest.Mock = jest.fn()
  const trueExit = process.exit

  beforeAll(async () => {
    commandModule = await CommandTestFactory.createTestingCommand({
      imports: [AppModule]
    }).compile()
    logService = await commandModule.resolve(LogService)
    process.exit = exitMock as never
  })

  afterEach(() => {
    exitMock.mockReset()
  })

  afterAll(() => {
    process.exit = trueExit
  })

  it.each`
    command                                    | expectedLogs
    ${String(['run', 'task'])}                 | ${1}
    ${String(['run', 'task', '-s', 'testyy'])} | ${2}
  `(
    'should run the $command command',
    async ({ command, expectedLogs }: { command: string[]; expectedLogs: number }) => {
      expect.assertions(1)
      const logSpy = jest.spyOn(logService.logger, 'log')
      await CommandTestFactory.run(commandModule, [...command])
      expect(logSpy).toHaveBeenCalledTimes(expectedLogs)
    }
  )
})
