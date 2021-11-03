import esbuild from 'esbuild'

esbuild.build({
  bundle: true,
  entryPoints: ['src/main.ts'],
  external: [
    '@nestjs/microservices',
    '@nestjs/websockets/socket-module',
    'cache-manager',
    'class-transformer',
    'class-validator'
  ],
  minify: true,
  outfile: 'dist/main.bundled.js',
  platform: 'node'
})
