const check = require("../src/check");
const expect = require("expect");

describe('check.js', () => {
    it('checkSum', function () {

        let buffer = Buffer.from([1, 2, 3, 4, 5]);

        let val = check.checkSum(buffer);

        expect(val).toEqual(15);


        buffer = Buffer.from([100, 200, 300, 5]);

        val = check.checkSum(buffer);

        // 605= 0x25d , 0x25d&0xff = 0x5d
        expect(val).toEqual(0x5d);

    });

    it('checkCrc16', function () {
        let buffer = Buffer.from([0x1]);

        let val = check.checkCrc16(buffer);


        expect(val).toEqual(0x1021);

        buffer = Buffer.from([0x1, 0xff]);

        // for (let i = startIndex; i < buf.length && i <= endIndex; i++) {
        //     crc = crc16Table[((crc >> 8) ^ buf[i]) & 0xff] ^ (crc << 8);
        // }

        val = check.checkCrc16(buffer);

        //crc16Table[((0x1021 >> 8) ^ 0xff) & 0xff] ^(0x1021<<8) & 0xffff);            
        expect(val).toEqual(0x2dc1);

    });

    it('checkCrc32', function () {
        let buffer = Buffer.from([0x1]);
        let val = check.checkCrc32(buffer);
        expect(val).toEqual(1510334235);

        // for (let i = startIndex; i < buf.length && i <= endIndex; i++) {
        //     crc = crc32Table[(crc ^ buf[i]) & 0xff] ^ (crc >> 8);
        // }
        // return (crc ^ 0xffffffff) & 0xffffffff;

        buf = Buffer.from([0x1, 0x1]);
        val = check.checkCrc32(buf);
        expect(val).toEqual(-801500376);

    });
});


