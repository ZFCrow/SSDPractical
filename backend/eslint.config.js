import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// import security plugins 
import security from 'eslint-plugin-security' 
import securityNode from 'eslint-plugin-security-node' 
import noUnSanitized from 'eslint-plugin-no-unsanitized' 


// the formatter
//! Running guide 
// npm install @microsoft/eslint-formatter-sarif -save-dev 
// npx eslint . -f @microsoft/eslint-formatter-sarif -o report.sarif


export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      // security plugins
      security,
      'security-node': securityNode,
      'no-unsanitized': noUnSanitized,
    },
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,

    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // merge recommended rules from security plugins 
      ...security.configs.recommended.rules, 
      ...securityNode.configs.recommended.rules, 
      ...noUnSanitized.configs.recommended.rules, 
    },
  },
])
