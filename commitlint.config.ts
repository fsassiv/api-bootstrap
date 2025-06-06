export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // ✅ Enforce allowed scopes (project prefixes)
    'scope-enum': [2, 'always', ['general', 'api-g', 'auth']],

    // ✅ Enforce allowed types
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
