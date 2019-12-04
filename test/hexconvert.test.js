const expect = require('expect');

const rewire = require("rewire");

const hexconvert = require("../src/hexconvert");


describe('hexconvert.js', () => {
   it('hundredToSixty, sixtyToHundred', () => {

      let val = hexconvert.hundredToSixty(88);
      expect(val).toEqual(56);

      val = hexconvert.sixtyToHundred(val);
      expect(val).toEqual(88);



      val = hexconvert.hundredToSixty(2);
      expect(val).toEqual(1);

      val = hexconvert.sixtyToHundred(val);
      expect(val).toEqual(2);


      val = hexconvert.hundredToSixty(6500);
      expect(val).toEqual(64);

      val = hexconvert.hundredToSixty(0);
      expect(val).toEqual(1);


      val = hexconvert.sixtyToHundred(0);
      expect(val).toEqual(1);

      val = hexconvert.sixtyToHundred(6500);
      expect(val).toEqual(100);
   });

   it('decimalToHex', () => {
      let val = hexconvert.decimalToHex(0);
      expect(val).toBe('00');

      val = hexconvert.decimalToHex('10');
      expect(val).toBe(undefined);

      val = hexconvert.decimalToHex(2.5);
      expect(val).toBe(undefined);

      val = hexconvert.decimalToHex(00);
      expect(val).toBe('00');

      val = hexconvert.decimalToHex(10);
      expect(val).toBe('0a');

      val = hexconvert.decimalToHex(255);
      expect(val).toBe('ff');
   });
});
