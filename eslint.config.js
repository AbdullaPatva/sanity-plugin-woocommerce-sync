import sanity from '@sanity/eslint-config-studio'

export default [
  ...sanity,
  {
    ignores: [
      'dist/**',
      '*.js',
      '*.d.ts',
      'node_modules/**'
    ]
  }
] 