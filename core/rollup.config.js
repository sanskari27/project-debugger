import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

// ESM build for modern bundlers
const esmConfig = {
  input: 'src/index.ts',
  output: {
    file: 'dist/esm/index.js',
    format: 'esm',
    sourcemap: true,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
    }),
  ],
  external: ['rrweb'],
};

// CommonJS build for Node.js
const cjsConfig = {
  input: 'src/index.ts',
  output: {
    file: 'dist/cjs/index.js',
    format: 'cjs',
    sourcemap: true,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
    }),
  ],
  external: ['rrweb'],
};

// UMD build for CDN (minified)
const umdConfig = {
  input: 'src/index.ts',
  output: {
    file: 'dist/core.min.js',
    format: 'umd',
    name: 'ProjectDebuggerCore',
    sourcemap: false,
    exports: 'named',
    inlineDynamicImports: true,
    plugins: [terser()],
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
    }),
  ],
  external: [],
};

export default [esmConfig, cjsConfig, umdConfig]; 