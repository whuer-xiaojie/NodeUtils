const ctimer_r = require("../src/ctimer");
const rewire = require("rewire");

const ctimer = rewire("../src/ctimer");

const setInterval = ctimer.__get__("setInterval");
const clearInterval = ctimer.__get__("clearInterval");

const expect = require("expect");

describe('ctimer.js', () => {

    before(function () {

    });

    after(function () {

    });

    beforeEach(function () {

    });

    //rollback
    afterEach(function () {

        ctimer.__set__("setInterval", setInterval);
        ctimer.__set__("clearInterval", clearInterval);

    });

    it('constructor , start, isRuning', function () {

        let mockSetInterval = function (cb, interval) {
            return "mock_timer";
        };

        let mockClearInterval = function (timer) {
        };

        ctimer.__set__("setInterval", mockSetInterval);
        ctimer.__set__("clearInterval", mockClearInterval);

        let interval = 288;
        let cb = function () { };

        let ct = new ctimer(cb, interval);//call start
        expect(ct.state).toEqual(1); //start state == 1
        expect(ct.timer).not.toBeNull();

        expect(ct.isRuning()).toEqual(true);
    });



    it('pause , isPaused, resume', function () {

        let mockSetInterval = function (cb, interval) {
            return "mock_timer";
        };

        let mockClearInterval = function (timer) {
        };

        ctimer.__set__("setInterval", mockSetInterval);
        ctimer.__set__("clearInterval", mockClearInterval);

        let interval = 288;
        let cb = function () { };

        let ct = new ctimer(cb, interval);//call start
        expect(ct.state).toEqual(1); //start state == 1

        ct.pause();
        expect(ct.isPaused()).toEqual(true);

        ct.resume();
        expect(ct.state).toEqual(1);//start state == 1
    });


    it('stop , isStop', function () {

        let mockSetInterval = function (cb, interval) {
            return "mock_timer";
        };

        let mockClearInterval = function (timer) {
        };

        ctimer.__set__("setInterval", mockSetInterval);
        ctimer.__set__("clearInterval", mockClearInterval);

        let interval = 288;
        let cb = function () { };

        let ct = new ctimer(cb, interval);//call start
        expect(ct.state).toEqual(1); //start state == 1

        ct.stop()
        expect(ct.isStop()).toEqual(true);
    });
});
