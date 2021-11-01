import { Injectable, Scope, LoggerService, ConsoleLogger } from '@nestjs/common';
import * as chalk from 'chalk'
import { isUnicodeSupported, isGCP } from '../common.util'

@Injectable({ scope: Scope.TRANSIENT })
export class LogService extends ConsoleLogger implements LoggerService {
    public logger;
    private readonly figures = {
      bullet: '●',
      circle: '◯',
      cross: '✖',
      lozenge: '◆',
      play: '▶',
      pointer: '❯',
      square: '◼',
      star: '★',
      tick: '✔'
    }
    private readonly figuresFallback = {
      bullet: '■',
      circle: '□',
      cross: '×',
      lozenge: '♦',
      play: '►',
      pointer: '>',
      square: '■',
      star: '✶',
      tick: '√'
    }
    private ignoredLogs = [
      'InstanceLoader',
      'NestFactory',
      'RouterExplorer',
      'RoutesResolver'
    ]

    constructor() {
      super();
      this.figures = isUnicodeSupported() ? this.figures : this.figuresFallback;
      this.logger = isGCP() ? console : console;
        // this.isFirebase = functions.config() && functions.config().environment && functions.config().environment.production;
        // this.isFirebaseProduction = functions.config() && functions.config().environment && functions.config().environment.production === 'true';
    }

    public debug(message: string, ...args: any[]): void {
      return this.logMessage(chalk.cyan(this.figures.bullet), chalk.bold.underline, chalk.dim(message), this, 'debug', args);
    }

    public error(message: string, ...args: any[]) {
      return this.logMessage(chalk.redBright(this.figures.cross) + ' ' + chalk.redBright.bold('ERROR  '), chalk.bold.underline, chalk.redBright(message), this, 'error', args);
    }

    public log(message: string, ...args: any[]) {
      return this.logMessage(chalk.cyanBright(this.figures.pointer), chalk.bold.underline, message, this, 'log', args);
    }

    private logMessage(
      icon: string,
      contextStyle: chalk.Chalk,
      message: string,
      logService: LogService,
      logHandler: 'debug' | 'error' | 'log' | 'warn',
      args: any[]
    ) {
      const label = logService.context ? logService.context : 'SYSTEM';
      const labelStyle = label === 'SYSTEM' ? chalk.bold.underline.dim : contextStyle
      if (logService.ignoredLogs.includes(label === 'SYSTEM' ? args.at(-1) : label)) return;
      const msg = icon + ' ' + labelStyle(label) + ' ' + message;
      args && args.length ? logService.logger[logHandler](msg, ...args) : logService.logger[logHandler](msg)
    }

    public start(message: string, ...args: any[]) {
      return this.logMessage(chalk.greenBright(this.figures.play), chalk.bold.underline, chalk.italic(message), this, 'log', args);
    }

    public star(message: string, ...args: any[]) {
      return this.logMessage(chalk.yellowBright(this.figures.star), chalk.bold.underline, chalk.bold(message), this, 'log', args);
    }

    public stop(message: string, ...args: any[]) {
      return this.logMessage(chalk.redBright(this.figures.square), chalk.bold.underline, chalk.italic(message), this, 'log', args);
    }

    public success(message: string, ...args: any[]) {
      return this.logMessage(chalk.greenBright(this.figures.tick), chalk.bold.underline, chalk.bold(message), this, 'log', args);
    }

    public warn(message: string, ...args: any[]) {
      return this.logMessage(chalk.yellowBright(this.figures.lozenge) + ' ' + chalk.bold.yellowBright('WARNING'), chalk.bold.underline, chalk.yellowBright(message), this, 'warn', args);
    }

    public verbose(message: string, ...args: any[]) {
      return this.logMessage(chalk.cyan.dim(this.figures.bullet), chalk.bold.underline, chalk.dim(message), this, 'debug', args);
    }
}
