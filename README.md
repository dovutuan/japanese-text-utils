# japanese-text-utils

[![npm version](https://img.shields.io/npm/v/japanese-text-utils.svg?style=flat-square)](https://www.npmjs.com/package/japanese-text-utils)
[![license](https://img.shields.io/npm/l/japanese-text-utils.svg?style=flat-square)](LICENSE)

Convert between **full-width (Zenkaku)** and **half-width (Hankaku)** characters in Japanese text.  
Supports **Katakana**, **ASCII letters/digits**, spaces, punctuation, and symbols.

---

## ✨ Features

- Convert **full-width → half-width** (`ガラス` → `ｶﾞﾗｽ`)
- Convert **half-width → full-width** (`ｶﾀｶﾅ` → `カタカナ`)
- Handles:
    - Katakana (with dakuten/handakuten, e.g. ガ ↔ ｶﾞ, パ ↔ ﾊﾟ, ヴ ↔ ｳﾞ)
    - ASCII letters and digits (Ａ → A, ７ → 7, etc.)
    - Punctuation (! ↔ ！, $ ↔ ＄, etc.)
    - Spaces (　 ↔ " ")
    - Yen sign / backslash (￥ ↔ \\)

---

## 📦 Installation

```bash
npm install japanese-text-utils
# or
yarn add japanese-text-utils
# or
pnpm add japanese-text-utils
```

## 🚀 Usage
### ES Module / TypeScript
```typescript
import { toHalfSizeCharacters, toFullSizeCharacters } from 'japanese-text-utils';

console.log(toHalfSizeCharacters('ガラス-１７個「テスト」'));
// => 'ｶﾞﾗｽ-17個｢ﾃｽﾄ｣'

console.log(toFullSizeCharacters('ｶﾀｶﾅ 123 ABC ~ \\\"'));
// => 'カタカナ　１２３　ＡＢＣ　～　￥”'
```

### CommonJS
```javascript
const { toHalfSizeCharacters, toFullSizeCharacters } = require('japanese-text-utils');

console.log(toHalfSizeCharacters('”’～　')); // => '"\'~ '
console.log(toFullSizeCharacters('"\'~ '));   // => '”’～　'
```

## 📚 API
**toHalfSizeCharacters(str: string): string**

Convert a string from full-width to half-width characters.

- Katakana: ガ → ｶﾞ, ア → ｱ
- ASCII letters/digits: Ａ → A, ７ → 7
- Punctuation: ！ → !, ＄ → $
- Spaces: 　 → " "
- ￥ → \

**toFullSizeCharacters(str: string): string**

Convert a string from half-width to full-width characters.

- Katakana: ｶﾞ → ガ, ｱ → ア
- ASCII letters/digits: A → Ａ, 7 → ７
- Punctuation: ! → ！, $ → ＄
- Spaces: " " → 　
- \ → ￥

## 🧪 Testing

You can run tests with Vitest or Jest. Example with Vitest:
```bash
npm install -D vitest
```
```typescript
import { describe, it, expect } from 'vitest';
import { toHalfSizeCharacters, toFullSizeCharacters } from 'japanese-text-utils';

describe('Kana conversion', () => {
    it('converts full-width to half-width', () => {
        expect(toHalfSizeCharacters('ガ')).toBe('ｶﾞ');
    });
    it('converts half-width to full-width', () => {
        expect(toFullSizeCharacters('ｳﾞ')).toBe('ヴ');
    });
});
```