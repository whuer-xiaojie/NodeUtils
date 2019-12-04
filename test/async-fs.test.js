
const asyncfs_r = require("../src/async-fs");
const rewire = require("rewire");
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;

const asyncfs = rewire("../src/async-fs");
const fs = require("fs");
const util = require("util");
const path = require('path');

chai.use(require("chai-as-promised"));


// async function dummyAsync() {
//     //return Promise.resolve();
//     //return Promise.reject();
// }

// describe.only("AsyncTest", function()  {
//     it("111", function() {
//       return expect(dummyAsync()).to.eventually.fulfilled;
//     });

//     it("222", function() {
//       return expect(dummyAsync()).to.eventually.rejected;
//     });
//   });

const getFileCreateDate = asyncfs.__get__("getFileCreateDate");



describe('async-fs.js', () => {

    beforeEach(function () {

    });

    //rollback
    afterEach(function () {

        asyncfs.__set__("fs", fs);
        asyncfs.__set__("util", util);
        asyncfs.__get__("path", path);

        asyncfs.__set__("mkdirs", asyncfs_r.mkdirs);

        asyncfs.__set__("getFileCreateDate", getFileCreateDate);
    });

    it('mkdirs(resolve)', function (done) {
        //this.timeout(1000*5);       
        let fsMock = {
            exists: function (path, cb) {
                return true;
            },

            mkdir: function mkdir(path, options, callback) {
                return;
            }
        };

        let utilMock = {
            promisify: function (p) {
                return p;
            }
        };

        asyncfs.__set__("fs", fsMock);
        asyncfs.__set__("util", utilMock);

        //to.be.eventually.rejected.and.notify(done); 
        expect(asyncfs.mkdirs("test_mkdirs")).to.be.eventually.fulfilled.and.notify(done);
    });

    it('mkdirs(rejected)', function (done) {

        let fsMock = {
            exists: function (path, cb) {
                return true;
            },

            mkdir: function mkdir(path, options, callback) {
                return;
            }
        };

        let utilMock = {
            promisify: function (p) {
                return p;
            }
        };

        asyncfs.__set__("fs", fsMock);
        asyncfs.__set__("util", utilMock);

        fsMock = {
            exists: function (path, cb) {
                throw "UT_TEST_MOCK_ERROR";
            },

            mkdir: function mkdir(path, options, callback) {
                return;
            }
        };
        asyncfs.__set__("fs", fsMock);
        expect(asyncfs.mkdirs("test_mkdirs")).to.be.eventually.rejected.and.notify(done);

    });

    it('rmdir(resolve)', function (done) {
        let fsMock = {
            exists: function (path, cb) {
                return true;
            },

            readdir: function (path, options, callback) {
                let files = ["ut_a.js", "ut_b.js"]
                return files;
            },

            stat: function (path, callback) {
                let fileSta = {
                    isDirectory: function () {
                        return false;
                    }
                };

                return fileSta;
            },

            unlink: function (path, callback) {

            },

            rmdir: function (path, callback) {

            }

        };

        let utilMock = {
            promisify: function (p) {
                return p;
            }
        };

        asyncfs.__set__("fs", fsMock);
        asyncfs.__set__("util", utilMock);

        expect(asyncfs.rmdir("test_rmdir")).to.be.eventually.fulfilled.and.notify(done);
    });


    it('rmdir(rejected)', function (done) {
        let fsMock = {
            exists: function (path, cb) {
                return true;
            },

            readdir: function (path, options, callback) {
                let files = ["ut_a.js", "ut_b.js"]
                return files;
            },

            stat: function (path, callback) {
                let fileSta = {
                    isDirectory: function () {
                        return false;
                    }
                };

                return fileSta;
            },

            unlink: function (path, callback) {
                throw "UT_TEST_MOCK_ERROR";
            },

            rmdir: function (path, callback) {

            }

        };

        let utilMock = {
            promisify: function (p) {
                return p;
            }
        };

        asyncfs.__set__("fs", fsMock);
        asyncfs.__set__("util", utilMock);

        expect(asyncfs.rmdir("test_rmdir")).to.be.eventually.rejected.and.notify(done);
    });

    it('mvdir(resolve)', function (done) {
        let fsMock = {
            rename: function (from, dest) {

            }

        };

        let utilMock = {
            promisify: function (p) {
                return p;
            }
        };

        let pathMock = {
            join: function (...paths) {

            },

            basename: function () {
                return "ut_test_base";
            }

        };

        asyncfs.__set__("fs", fsMock);
        asyncfs.__set__("util", utilMock);
        asyncfs.__set__("path", pathMock);

        let mkdirsMock = function (dir) { };

        asyncfs.__set__("mkdirs", mkdirsMock);

        expect(asyncfs.mvdir("ut_from", "ut_dest")).to.be.eventually.fulfilled.and.notify(done);
    });

    it('mvdir(rejected)', function (done) {
        let fsMock = {
            rename: function (from, dest) {
                throw "UT_TEST_MOCK_ERROR";
            }
        };

        let utilMock = {
            promisify: function (p) {
                return p;
            }
        };

        let pathMock = {
            join: function (...paths) {

            },

            basename: function () {
                return "ut_test_base";
            }

        };

        asyncfs.__set__("fs", fsMock);
        asyncfs.__set__("util", utilMock);
        asyncfs.__set__("path", pathMock);

        let mkdirsMock = function (dir) {
        };

        asyncfs.__set__("mkdirs", mkdirsMock);

        expect(asyncfs.mvdir("ut_from", "ut_dest")).to.be.eventually.rejected.and.notify(done);
    });


    it('copydir', async function () {
        let mkdirsMock = function (dir) { };
        asyncfs.__set__("mkdirs", mkdirsMock);

        let fsMock = {
            constants: { F_OK: true },
            rename: async function (from, dest) {

            },
            access: async function () {
                return Promise.resolve();
            },
            stat: async function () {
                return {
                    isDirectory: function () {
                        return false;
                    }

                }
            },
            copyFile: async function (src, dest) {
                return Promise.resolve();
            },
            readdir: async function () {
                return Promise.resolve(['test']);
            }
        };

        let utilMock = {
            basename: function (name) {
                return name;
            },
            promisify: function (p) {
                return p;
            }

        };

        let pathMock = {
            join: function (...paths) {

            },

            basename: function () {
                return "ut_test_base";
            },
            resolve: function () {
                return;
            }
        };

        asyncfs.__set__("fs", fsMock);
        asyncfs.__set__("util", utilMock);
        asyncfs.__set__("path", pathMock);
        await asyncfs.copydir('test', 'test/copy');
    });

    it('findFiles(resolve)', function (done) {
        let fsMock = {
            readdir: function (path, options, callback) {
                let files = ["ut_a.js", "ut_b.js"]
                return files;
            }
        };

        let utilMock = {
            promisify: function (p) {
                return p;
            }
        };

        let pathMock = {
            join: function () {
                return arguments[1];
            },

            basename: function () {
                return "ut_test_base";
            }

        };

        let getFileCreateDate = function (path) {
            return "2018-10-1";
        };

        asyncfs.__set__("fs", fsMock);
        asyncfs.__set__("util", utilMock);
        asyncfs.__set__("path", pathMock);
        asyncfs.__set__("getFileCreateDate", getFileCreateDate);

        expect(asyncfs.findFiles("", "2018-09-10", "2019-01-01")).to.be.eventually.fulfilled.deep.equals(["ut_a.js", "ut_b.js"]).and.notify(done);
    });


    it('findFiles(rejected)', function (done) {
        let fsMock = {
            readdir: function (path, options, callback) {
                let files = ["ut_a.js", "ut_b.js"]
                return files;
            }
        };

        let utilMock = {
            promisify: function (p) {
                return p;
            }
        };

        let pathMock = {
            join: function () {
                return arguments[1];
            },

            basename: function () {
                return "ut_test_base";
            }

        };

        let getFileCreateDate = function (path) {
            throw "UT_TEST_MOCK_ERROR";
        };

        asyncfs.__set__("fs", fsMock);
        asyncfs.__set__("util", utilMock);
        asyncfs.__set__("path", pathMock);
        asyncfs.__set__("getFileCreateDate", getFileCreateDate);

        expect(asyncfs.findFiles("", "2018-09-10", "2019-01-01")).to.be.eventually.rejected.and.notify(done);
    });



});


