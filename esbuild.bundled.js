const esbuild = require('esbuild')

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
  outfile: 'dist/main.bundled.js'
})
