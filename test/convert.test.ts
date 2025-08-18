import { describe, it, expect } from 'vitest';
import { toHalfSizeCharacters, toFullSizeCharacters } from '../src/index';

describe('toHalfSizeCharacters', () => {
    it('converts full-width Katakana to half-width', () => {
        expect(toHalfSizeCharacters('ガラス')).toBe('ｶﾞﾗｽ');
    });

    it('converts full-width ASCII letters/numbers to half-width', () => {
        expect(toHalfSizeCharacters('ＡＢＣ１２３')).toBe('ABC123');
    });

    it('converts full-width punctuation to half-width', () => {
        expect(toHalfSizeCharacters('！＄？')).toBe('!$?');
    });

    it('only space conversion (no kana change in this case)', () => {
        expect(toHalfSizeCharacters('ＡＢＣ　１２３')).toBe('ABC 123');
    });

    it('does not change half-width kana but converts space', () => {
        expect(toHalfSizeCharacters('ﾃｽﾄ　ﾃｽﾄ')).toBe('ﾃｽﾄ ﾃｽﾄ');
    });
});

describe('toFullSizeCharacters', () => {
    it('converts half-width Katakana to full-width', () => {
        expect(toFullSizeCharacters('ｶﾀｶﾅ')).toBe('カタカナ');
    });

    it('converts half-width ASCII letters/numbers to full-width', () => {
        expect(toFullSizeCharacters('ABC123')).toBe('ＡＢＣ１２３');
    });

    it('converts half-width punctuation to full-width', () => {
        expect(toFullSizeCharacters('!$?')).toBe('！＄？');
    });

    it('converts half-width space to full-width space', () => {
        expect(toFullSizeCharacters('テスト テスト')).toBe('テスト　テスト');
    });

    it('handles dakuten/handakuten correctly', () => {
        expect(toFullSizeCharacters('ｳﾞｧ')).toBe('ヴァ');
    });
});
