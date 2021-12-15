import chalk from 'chalk'
import inquirer from 'inquirer'
import { execSync } from 'node:child_process'
import { decorateSystem } from '../lib/decorate-system.js'
import { logInstructions, LOG_DECORATOR_REGEX } from '../lib/log.js'

const MENU_ENTRY_TITLE_WIDTH = 24

/**
 * Prompts the user for the operating system they wish to launch and test the
 * Ansible play against.
 *
 * @returns {string} The operating system string, lowercased
 */
async function promptForDesktop() {
  const groups = JSON.parse(execSync("yq eval -o=j '.groups' molecule/desktop/molecule.yml"))
  // eslint-disable-next-line security/detect-object-injection
  const choices = Object.keys(groups).map(key => key.padEnd(MENU_ENTRY_TITLE_WIDTH) + chalk.gray(groups[key]))
  const choicesDecorated = choices.map((choice) => decorateSystem(choice))
  const response = await inquirer.prompt([
    {
      choices: choicesDecorated,
      message: 'Which desktop operating system would you like to test the Ansible play against?',
      name: 'operatingSystem',
      type: 'list'
    }
  ])

  const DECORATION_LENGTH = 2

  return response.operatingSystem.replace(LOG_DECORATOR_REGEX, '')
    .toLowerCase().slice(DECORATION_LENGTH).split(" ")[0]
}

/**
 * Main script logic
 */
async function run() {
  logInstructions(
    'Desktop Ansible Molecule Test via VirtualBox',
    'Choose a desktop environment below to run the Ansible play on.' +
      ' After choosing, a VirtualBox VM will be created. Then, the Ansible play will run on the VM.' +
      ' After it is done, the VM will be left open for inspection. Please do get carried away' +
      ' ensuring everything is working as expected and looking for configuration optimizations that' +
      ' can be made. The operating systems should all be the latest stable release but might not always' +
      ' be the latest version.'
  )
  const environment = await promptForDesktop()
  execSync(`task ansible:test:molecule:virtualbox:converge:cli -- ${environment}`, { stdio: 'inherit' })
}

run()
