const expect = require('expect');

const rewire = require("rewire");

//const os = require('os');

const system = rewire("../src/system");
const os = system.__get__('os');


describe('system.js', () => {

    before(function () {

    });

    //rollback
    after(function () {

    });

    beforeEach(function () {

    });

    //rollback
    afterEach(function () {
        system.__set__("os", os);
    });


    it('getIPV4Netcards, getIPv6Netcards', () => {

        let osMock = {
            networkInterfaces: function () {
                let val = {
                    'Interface-1':
                        [{
                            address: 'fe80::ec7a:37f3:8215:e656',
                            netmask: 'ffff:ffff:ffff:ffff::',
                            family: 'IPv6',
                            mac: '00:50:56:c0:00:01',
                            scopeid: 24,
                            internal: false,
                            cidr: 'fe80::ec7a:37f3:8215:e656/64'
                        },
                        {
                            address: '192.168.16.111',
                            netmask: '255.255.255.0',
                            family: 'IPv4',
                            mac: '00:50:56:c0:00:01',
                            internal: false,
                            cidr: '192.168.16.1/24'
                        }],

                    'Loopback Pseudo-Interface 1':
                        [{
                            address: '::1',
                            netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
                            family: 'IPv6',
                            mac: '00:00:00:00:00:00',
                            scopeid: 0,
                            internal: true,
                            cidr: '::1/128'
                        },
                        {
                            address: '127.0.0.1',
                            netmask: '255.0.0.0',
                            family: 'IPv4',
                            mac: '00:00:00:00:00:00',
                            internal: true,
                            cidr: '127.0.0.1/8'
                        }]
                }; //val
                return val;
            }
        };

        system.__set__("os", osMock);


        let val = system.getIPV4Netcards();

        expect(val.length).toEqual(2);

        expect(val.map(function (p) {
            return p.address
        }).includes('127.0.0.1')).toEqual(true);

        expect(val.map(function (p) {
            return p.address
        }).includes('192.168.16.111')).toEqual(true);


        val = system.getIPv6Netcards();

        expect(val.length).toEqual(2);

        expect(val.map(function (p) {
            return p.address
        }).includes('fe80::ec7a:37f3:8215:e656')).toEqual(true);

        expect(val.map(function (p) {
            return p.address
        }).includes('::1')).toEqual(true);

    });



    it('netcardExists, getDefaultNetcard', () => {

        let osMock = {
            networkInterfaces: function () {
                let val = {
                    'Interface-1':
                        [{
                            address: 'fe80::ec7a:37f3:8215:e656',
                            netmask: 'ffff:ffff:ffff:ffff::',
                            family: 'IPv6',
                            mac: '00:50:56:c0:00:01',
                            scopeid: 24,
                            internal: false,
                            cidr: 'fe80::ec7a:37f3:8215:e656/64'
                        },
                        {
                            address: '192.168.16.111',
                            netmask: '255.255.255.0',
                            family: 'IPv4',
                            mac: '00:50:56:c0:00:01',
                            internal: false,
                            cidr: '192.168.16.1/24'
                        }],

                    'Loopback Pseudo-Interface 1':
                        [{
                            address: '::1',
                            netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
                            family: 'IPv6',
                            mac: '00:00:00:00:00:00',
                            scopeid: 0,
                            internal: true,
                            cidr: '::1/128'
                        },
                        {
                            address: '127.0.0.1',
                            netmask: '255.0.0.0',
                            family: 'IPv4',
                            mac: '00:00:00:00:00:00',
                            internal: true,
                            cidr: '127.0.0.1/8'
                        }]
                }; //val
                return val;
            }
        };

        system.__set__("os", osMock);

        let val = system.netcardExists('127.0.0.1', '00:00:00:00:00:00');
        expect(val).toEqual(true);

        val = system.netcardExists('127.0.0.2', '01:01:00:00:00:00');
        expect(val).toEqual(false);

        val = system.netcardExists('192.168.16.111', '00:50:56:c0:00:01');
        expect(val).toEqual(true);

        val = system.netcardExists('192.168.16.112', '01:50:56:c0:00:01');
        expect(val).toEqual(false);


        val = system.getDefaultNetcard();
        expect(val.address).toEqual('192.168.16.111');

    });
});



