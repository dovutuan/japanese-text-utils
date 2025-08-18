import { halfKanaMap, halfKanaReg, fullKanaMap, fullKanaReg, asciiPunct } from './maps';

/**
 * Convert a string from FULL-WIDTH (Zenkaku) characters to HALF-WIDTH (Hankaku).
 *
 * Includes:
 * - Katakana conversion (ガ → ｶﾞ, ア → ｱ, etc.)
 * - ASCII A–Z, a–z, 0–9 (Ｆ → F, ７ → 7)
 * - Punctuation and symbols (！ → !, ＄ → $, ￥ → \, etc.)
 * - Normalize quotes, tildes, dashes to standard ASCII forms
 * - Spaces: full-width space (　) → half-width space ( )
 *
 * @param str Input string that may contain full-width characters
 * @returns Converted string with half-width characters
 */
export function toHalfSizeCharacters(str: string): string {
    return str
        // Katakana: full-width → half-width
        .replace(halfKanaReg, (m) => halfKanaMap[m] ?? m)
        // Latin alphabet (Ａ–Ｚ, ａ–ｚ) → ASCII
        .replace(/[Ａ-Ｚａ-ｚ]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 65248))
        // Digits (０–９) → ASCII
        .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 65248))
        // Normalize various Unicode quote/tilde variants → ASCII
        .replace(/[”“″〝〟＂]/g, '"')
        .replace(/[’‘´′＇]/g, "'")
        .replace(/[‐－―]/g, '-')
        .replace(/[～〜]/g, '~')
        // Dakuten/handakuten marks → half-width
        .replace(/゛/g, 'ﾞ')
        .replace(/゜/g, 'ﾟ')
        // Space: full-width → ASCII space
        .replace(/　/g, ' ')
        // Yen sign → backslash
        .replace(/￥/g, '\\')
        // General punctuation: full-width → ASCII
        .replace(/[！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g,
            (s) => String.fromCharCode(s.charCodeAt(0) - 65248));
}

/**
 * Convert a string from HALF-WIDTH (Hankaku) characters to FULL-WIDTH (Zenkaku).
 *
 * Includes:
 * - Katakana conversion (ｶﾞ → ガ, ｱ → ア, etc.)
 * - ASCII A–Z, a–z, 0–9 (F → Ｆ, 7 → ７)
 * - Punctuation and symbols (! → ！, $ → ＄, \ → ￥, etc.)
 * - Normalize quotes, tildes to full-width forms
 * - Spaces: ASCII space ( ) → full-width space (　)
 *
 * @param str Input string that may contain half-width characters
 * @returns Converted string with full-width characters
 */
export function toFullSizeCharacters(str: string): string {
    return str
        // Katakana: half-width → full-width
        .replace(fullKanaReg, (m) => fullKanaMap[m] ?? m)
        // Latin alphabet (A–Z, a–z) → full-width
        .replace(/[A-Za-z]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 65248))
        // Digits (0–9) → full-width
        .replace(/[0-9]/g, (s) => String.fromCharCode(s.charCodeAt(0) + 65248))
        // Quotes/tilde → full-width variants
        .replace(/"/g, '”')
        .replace(/'/g, '’')
        .replace(/~/g, '～')
        // Dakuten/handakuten marks → full-width
        .replace(/ﾞ/g, '゛')
        .replace(/ﾟ/g, '゜')
        // Space: ASCII → full-width space
        .replace(/ /g, '　')
        // Backslash → Yen sign
        .replace(/\\/g, '￥')
        // General punctuation: ASCII → full-width
        .replace(asciiPunct, (s) => String.fromCharCode(s.charCodeAt(0) + 65248));
}

const api = { toHalfSizeCharacters, toFullSizeCharacters };
export default api;
