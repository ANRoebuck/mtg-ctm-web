import { removeDiacritics } from './utils';



describe('remove diacritics', () => {
  it('replaces accented characters', () => {

    const input = 'Lim-Dûl\'s Vault';
    const expected = 'Lim-Dul\'s Vault';

    expect(removeDiacritics(input)).toBe(expected);
  });
});

