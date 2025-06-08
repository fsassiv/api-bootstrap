module.exports = {
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'fix', name: 'fix:      A bug fix' },
    { value: 'chore', name: 'chore:    Build process or helper' },
    { value: 'docs', name: 'docs:     Documentation' },
    { value: 'style', name: 'style:    Formatting' },
    { value: 'refactor', name: 'refactor: Code improvement' },
    { value: 'perf', name: 'perf:     Performance' },
    { value: 'test', name: 'test:     Tests' },
    { value: 'revert', name: 'revert:   Revert' },
    { value: 'note', name: 'note:   General annotation' },
  ],
  scopes: [
    { name: 'api-gateway' },
    { name: 'auth-service' },
    { name: 'general' },
  ],
  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['body', 'footer'],
  subjectLimit: 100,
};
