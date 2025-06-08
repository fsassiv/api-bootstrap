export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['general', 'api-gateway', 'auth-service']],
    'type-enum': [
      2,
      'always',
      [
        'ci',
        'chore',
        'docs',
        'ticket',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'note',
      ],
    ],

    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
  },
};
