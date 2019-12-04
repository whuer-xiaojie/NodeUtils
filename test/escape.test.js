const escape = require("../src/escape");
const expect = require("expect");


describe('escape.js', () => {

    it('escapeBuffer, unescapeBuffer', function () {

        let val = [0x02, 0x03, 0x1B];
        let buffer = Buffer.from(val);
        let eval = escape.escapeBuffer(buffer);
        expect(eval).toEqual([0x1B, 0xE7, 0x1B, 0xE8, 0x1B, 0x00])

        expect(escape.unescapeBuffer(eval)).toEqual(val);

    });

});
