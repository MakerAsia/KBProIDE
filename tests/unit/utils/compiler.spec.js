import compiler from '@/engine/utils/compiler.js';

describe('@engine/utils/compiler.js', () => {
  it('must have parseError', () => {
    expect(compiler.parseError).not.toBeUndefined();
  });
});
