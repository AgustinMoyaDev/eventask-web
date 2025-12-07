export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0],
    'type-enum': [
      2,
      'always',
      [
        'build', // Compilation, dependencies
        'chore', // Routine tasks, configs
        'ci', // CI/CD
        'docs', // Documentation
        'feat', // New features
        'fix', // Bug fixes
        'perf', // Performance improvements
        'refactor', // Code changes that neither fix bugs nor add features
        'revert', // Revert changes
        'style', // Formatting (spaces, commas, etc)
        'test', // Tests
      ],
    ],
  },
}
