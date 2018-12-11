import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import { uglify } from 'rollup-plugin-uglify'

import pkg from './package.json'

const config = {
  input: 'src/index.js',
  output: {
    file: pkg.module,
    format: 'es',
    sourcemap: true
  },
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    url(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs({
      include: [
        'node_modules/**'
      ],
      exclude: [
        'node_modules/process-es6/**'
      ],
      namedExports: {
        'node_modules/react/index.js': ['Fragment', 'Children', 'Component', 'PropTypes', 'createElement', 'createRef'],
        'node_modules/react-dom/index.js': ['render']
      }
    })
  ],
  external: ['immer', 'react', 'react-dom']
}

export default [
  config,
  {
    ...config,
    plugins: [
      ...config.plugins,
      uglify()
    ],
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    }
  }]
