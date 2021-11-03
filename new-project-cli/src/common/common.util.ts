/**
 * Returns random elements from an array
 *
 * @param arr - Any array
 * @param n - Size of returned array
 * @returns Randomly shuffled array of specified size
 */
export function getRandomElements(array: any[], count: number): any[] {
  const beginning = 0
  const sortProperty = 0.5

  return array.sort(() => Math.random() - sortProperty).slice(beginning, count)
}

/**
 * Detects if code is running on GCP
 *
 * @returns true if environment is GCP/Firebase
 */
export function isGCP(): boolean {
  return Boolean(process.env.GCLOUD_PROJECT)
}

/**
 * Detects if the code is being run by Jest
 *
 * @returns true if a Jest test is being run
 */
export function isJestTest(): boolean {
  return typeof process.env.JEST_WORKER_ID !== 'undefined'
}

/**
 * Detects if terminal is modern
 *
 * @returns true if Terminal supports fancy icons
 */
export function isUnicodeSupported(): boolean {
  if (process.platform !== 'win32') {
    // Linux console (kernel)
    return process.env.TERM !== 'linux'
  }

  return (
    Boolean(process.env.CI) ||
    // Windows Terminal
    Boolean(process.env.WT_SESSION) ||
    // ConEmu and cmder
    process.env.ConEmuTask === '{cmd::Cmder}' ||
    process.env.TERM_PROGRAM === 'vscode' ||
    process.env.TERM === 'xterm-256color' ||
    process.env.TERM === 'alacritty'
  )
}
