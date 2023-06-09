import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({

  entries: [
    './src/index',
    {
      builder: 'mkdist',
      input: './src/style/',
      outDir: './dist',
    },
  ],

  clean: true,

  declaration: true,

  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
})
