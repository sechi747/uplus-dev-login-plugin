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

  clean: false,

  declaration: true,

  rollup: {
    emitCJS: false,
    esbuild: {
      minify: true,
    },
  },
})
