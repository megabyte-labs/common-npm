import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * The main app service singleton
 */
export class AppService {
  private helloWorld: string;

  /**
   * Initialization logic
   */
  constructor() {
    this.helloWorld = 'Hello World!';
  }

  /**
   * Method that returns a 'Hello World!' string
   *
   * @returns 'Hello World!'
   */
  public getHello(): string {
    return this.helloWorld;
  }
}
