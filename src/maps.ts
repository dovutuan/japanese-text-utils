/**
 * Mapping of full-width Katakana & punctuation to half-width forms.
 * - This direction is: FULL-WIDTH (Zenkaku) → HALF-WIDTH (Hankaku)
 * - Use `fullKanaMap` (inverted) for the reverse conversion.
 *
 * Notes:
 * - Includes voiced/semi-voiced sounds (dakuten/handakuten) and punctuation.
 * - Keep keys and values as single Unicode codepoints or valid half-width digraphs (e.g., 'ｶﾞ').
 */
export const halfKanaMap: Record<string, string> = {
    'ガ': 'ｶﾞ','ギ': 'ｷﾞ','グ': 'ｸﾞ','ゲ': 'ｹﾞ','ゴ': 'ｺﾞ',
    'ザ': 'ｻﾞ','ジ': 'ｼﾞ','ズ': 'ｽﾞ','ゼ': 'ｾﾞ','ゾ': 'ｿﾞ',
    'ダ': 'ﾀﾞ','ヂ': 'ﾁﾞ','ヅ': 'ﾂﾞ','デ': 'ﾃﾞ','ド': 'ﾄﾞ',
    'バ': 'ﾊﾞ','ビ': 'ﾋﾞ','ブ': 'ﾌﾞ','ベ': 'ﾍﾞ','ボ': 'ﾎﾞ',
    'パ': 'ﾊﾟ','ピ': 'ﾋﾟ','プ': 'ﾌﾟ','ペ': 'ﾍﾟ','ポ': 'ﾎﾟ',
    'ヴ': 'ｳﾞ','ヷ': 'ﾜﾞ','ヺ': 'ｦﾞ',
    'ア': 'ｱ','イ': 'ｲ','ウ': 'ｳ','エ': 'ｴ','オ': 'ｵ',
    'カ': 'ｶ','キ': 'ｷ','ク': 'ｸ','ケ': 'ｹ','コ': 'ｺ',
    'サ': 'ｻ','シ': 'ｼ','ス': 'ｽ','セ': 'ｾ','ソ': 'ｿ',
    'タ': 'ﾀ','チ': 'ﾁ','ツ': 'ﾂ','テ': 'ﾃ','ト': 'ﾄ',
    'ナ': 'ﾅ','ニ': 'ﾆ','ヌ': 'ﾇ','ネ': 'ﾈ','ノ': 'ﾉ',
    'ハ': 'ﾊ','ヒ': 'ﾋ','フ': 'ﾌ','ヘ': 'ﾍ','ホ': 'ﾎ',
    'マ': 'ﾏ','ミ': 'ﾐ','ム': 'ﾑ','メ': 'ﾒ','モ': 'ﾓ',
    'ヤ': 'ﾔ','ユ': 'ﾕ','ヨ': 'ﾖ',
    'ラ': 'ﾗ','リ': 'ﾘ','ル': 'ﾙ','レ': 'ﾚ','ロ': 'ﾛ',
    'ワ': 'ﾜ','ヲ': 'ｦ','ン': 'ﾝ',
    'ァ': 'ｧ','ィ': 'ｨ','ゥ': 'ｩ','ェ': 'ｪ','ォ': 'ｫ',
    'ッ': 'ｯ','ャ': 'ｬ','ュ': 'ｭ','ョ': 'ｮ',
    '。': '｡','、': '､','ー': 'ｰ','「': '｢','」': '｣','・': '･',
};

/** Invert a string-to-string dictionary without external deps (lodash.invert). */
export function invertMap(obj: Record<string, string>): Record<string, string> {
    const out: Record<string, string> = {};
    for (const k in obj) out[obj[k]] = k;
    return out;
}

// Cache keys and build regex for performance.
const halfKanaKeys = Object.keys(halfKanaMap);

/** Matches any FULL-WIDTH Katakana/punctuation that we can shrink (Zenkaku → Hankaku). */
export const halfKanaReg = new RegExp('(' + halfKanaKeys.join('|') + ')', 'g');

export const fullKanaMap = invertMap(halfKanaMap);
const fullKanaKeys = Object.keys(fullKanaMap);

/** Matches any HALF-WIDTH Katakana/punctuation that we can widen (Hankaku → Zenkaku). */
export const fullKanaReg = new RegExp('(' + fullKanaKeys.join('|') + ')', 'g');

/** ASCII punctuation class (no spaces inside the class; properly escaped). */
export const asciiPunct = /[!#$%&'()*+,\-\.\/:;<=>?@\[\\\]^_`{|}]/g;
