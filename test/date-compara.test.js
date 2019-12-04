const expect = require('expect');

const dc = require('../src/date-compara');

var rewire = require("rewire");

describe('data-compara.js', () => {

    //  it('echo', () => {    

    //     let val = new Date();
    //     console.log(val.getFullYear())
    //     console.log(val.getMonth());
    //     console.log(val.getDate());
    //     console.log(val.getDay());
    //     console.log(val.getHours());
    //     console.log(val.getMinutes());
    //     console.log(val.getSeconds());

    //  });

    it('dateBefore', () => {
        let d1 = "2018-1-15";
        let d2 = "2017-10-1";
        let val = dc.dateBefore(d1, d2);
        expect(val).toEqual(false);

        val = dc.dateBefore(d2, d1);
        expect(val).toEqual(true);

        d1 = "1918-9-10";
        d2 = "2019-1-1";
        val = dc.dateBefore(d1, d2);
        expect(val).toEqual(true);

        val = dc.dateBefore(d2, d1);
        expect(val).toEqual(false);

    });

    it('dateAfter', () => {
        let d1 = "2018-10-1";
        let d2 = "2019-10-1";
        let val = dc.dateAfter(d1, d2);
        expect(val).toEqual(false);

        val = dc.dateAfter(d2, d1);
        expect(val).toEqual(true);

        d1 = "2018-3-10";
        d2 = "2019-5-1";
        val = dc.dateAfter(d1, d2);
        expect(val).toEqual(false);

        val = dc.dateAfter(d2, d1);
        expect(val).toEqual(true);

    });



    it('validDate', () => {
        let d1 = "2018-10-1";
        let d2 = "2025-10-1";
        let val = dc.validDate(d1, d2);
        expect(val).toEqual(true);

        d1 = "2018-10-1";
        d2 = "2017-10-1";
        val = dc.validDate(d1, d2);
        expect(val).toEqual(false);

        d1 = "2012-5-16";
        d2 = "2017-10-1";
        val = dc.validDate(d1, d2);
        expect(val).toEqual(false);

    });

    it('validDayOfWeek', () => {

        //let dt = global.Date;

        let dc = rewire("../src/date-compara");

        let mockDate = function () {
            return function () {
                this.getDay = function () {
                    return 4;
                }
            }
        }();

        //dc.__set__("global.Date", mockDate);
        dc.__with__({
            "global.Date": mockDate
        })(function () {
            let val = dc.validDayOfWeek(127);
            expect(val).toEqual(true);


            mockDate = function () {
                return function () {
                    this.getDay = function () {
                        return 2;
                    }
                }
            }();

            val = 0x4;//for 2
            let mask = ~val;

            dc.__set__("global.Date", mockDate);
            val = dc.validDayOfWeek(127 & mask);
            expect(val).toEqual(false);
        });


        //  console.log(new Date().getDay());
        //  dc.__set__("global.Date", dt);
        //  console.log(new Date().getDay());

    });

    it('validTime', () => {

        let dc = rewire("../src/date-compara");

        let mockDate = function () {

            return function () {
                this.getDay = function () {
                    return 3;
                };

                this.getHours = function () {
                    return 12;
                };

                this.getMinutes = function () {
                    return 33;
                };

                this.getSeconds = function () {
                    return 8;
                };
            }
        }();

        //dc.__set__("global.Date", mockDate);
        dc.__with__({
            "global.Date": mockDate
        })(function () {
            let val = dc.validTime("08:00:00", "17:30:00");
            expect(val).toEqual(true);

            val = dc.validTime("08:00:00", "12:00:00");
            expect(val).toEqual(false);

        });

    });

    it('validItem', () => {


        let dc = rewire("../src/date-compara");

        // mock date : 2019-07-09 12:33:08
        let mockDate = function () {
            return function () {

                this.getFullYear = function () {
                    return 2019;
                };

                this.getMonth = function () {
                    return 6; //7 = 6 + 1
                }

                this.getDate = function () {
                    return 9;
                }

                this.getDay = function () {
                    return 2;
                };

                this.getHours = function () {
                    return 12;
                };

                this.getMinutes = function () {
                    return 33;
                };

                this.getSeconds = function () {
                    return 8;
                };
            }
        }();

        // dc.__set__("global.Date", mockDate);
        dc.__with__({
            "global.Date": mockDate
        })(function () {
            let item = {
                startDate: "2019-7-1",
                startTime: "08:00:00",
                endDate: "2019-7-31",
                endTime: "17:00:00",
                repeat: 127
            };
            let val = dc.validItem(item);
            expect(val).toEqual(true);


            item = {
                startDate: "2019-8-1",
                startTime: "08:00:00",
                endDate: "2019-8-31",
                endTime: "17:00:00",
                repeat: 127
            };
            val = dc.validItem(item);
            expect(val).toEqual(false);
        })
    });

})

