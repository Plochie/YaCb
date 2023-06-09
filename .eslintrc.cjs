// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'react-refresh'],
	ignorePatterns: ['**/*.scss', '**/*.svg', '**/*.css'],
	rules: {
		'react-refresh/only-export-components': 'warn',
		eqeqeq: 'warn',
		'@typescript-eslint/no-explicit-any': 'off',
		'react/react-in-jsx-scope': 'off',
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					{
						group: ['@tauri-apps/*'],
						message: 'Define wrapper function for using third party libraries',
					},
					{
						group: ['!src/*'],
						message: 'Define wrapper function for using third party libraries',
					},
					{
						group: ['../..*'],
						message:
							'Relative paths are not allowed, convert to absolute paths',
					},
				],
			},
		],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn', // or "error"
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
	},
};
