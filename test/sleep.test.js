const expect = require('expect');

const rewire = require("rewire");

const Ut = require("../src/sleep");


describe('sleep.js', () => {
   it('sleep', async function () {
      let begin = Date.now();
      const result = await Ut.sleep(1000);
      let end = Date.now();

      expect((end - begin) >= 1000).toEqual(true);

   })

});
