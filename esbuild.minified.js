const esbuild = require('esbuild')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

esbuild.build({
  entryPoints: ['src/main.ts'],
  external: [
    '@nestjs/microservices',
    '@nestjs/websockets/socket-module',
    'cache-manager',
    'class-transformer',
    'class-validator'
  ],
  bundle: true,
  minify: true,
  platform: 'node',
  plugins: [nodeExternalsPlugin()],
  outfile: 'dist/main.minified.js'
})
