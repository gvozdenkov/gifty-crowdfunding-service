import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  helpUrl:
    'https://github.com/conventional-changelog/commitlint/#what-is-commitlint or !!! use "yarn cz" to step by step commit creation',
};

export default Configuration;
