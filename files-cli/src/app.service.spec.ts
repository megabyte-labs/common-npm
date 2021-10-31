import { TestingModule } from '@nestjs/testing'
import { CommandTestFactory } from 'nest-commander-testing'

describe('Task Command', () => {
  let commandInstance: TestingModule

  beforeAll(async () => {
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [AppModule]
    }).compile()
  })

  it('should call the "run" method', async () => {
    CommandTestFactory.setAnswers(['echo Hello World!'])
    const spawnSpy = jest.spyOn(childProcess, 'spawn')
    await CommandTestFactory.run(commandInstance, ['run'])
    expect(spawnSpy).toBeCalledWith(['echo Hello World!', { shell: os.userInfo().shell }])
  })
})
