const gulp = require('gulp');
const rollup = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

gulp.task('build', async function() {
  const index = await rollup.rollup({
    entry: `./index.js`,
    plugins: [
      commonjs(),
      resolve(),
      babel({
        exclude: 'node_modules/**' // 只编译我们的源代码
      })
    ]
  })

  await index.write({
    dest: `./dist/tiny-compiler.js`,
    format: 'umd',
    moduleName: 'compiler',
  })
});