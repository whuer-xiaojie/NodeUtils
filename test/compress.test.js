const compress_r = require("../src/compress");
const rewire = require("rewire");
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;

const compress = rewire("../src/compress");
const fs = require("fs");
const util = require("util");
const path = require('path');


const asyncFs = require("../src/async-fs");


chai.use(require("chai-as-promised"));

const JSZIP = compress.__get__("JSZIP");
const readFiles = compress.__get__("readFiles");
const zipToFile = compress.__get__("zipToFile");
const readDir = compress.__get__("readDir");



describe('compress.js', () => {

    before(function () {

    });

    after(function () {

    });

    beforeEach(function () {

    });


    //rollback
    afterEach(function () {

        compress.__set__("JSZIP", JSZIP);
        compress.__set__("readFiles", readFiles);
        compress.__set__("zipToFile", zipToFile);
        compress.__set__("readDir", readDir);
        compress.__set__("asyncFs", asyncFs);

    });


    it('zipFiles(resolve)', function (done) {

        let mockJSZIP = function () {
            return function () {
                this.folder = function (dir) {
                    return this;
                };
                this.file = function (path, file) {
                };
                this.generateAsync = function (json) {
                    return json;
                }
            }
        }();

        let mockAsyncFs = {
            read: function (filePath) {

            },
            readDir: function (dir) {

            },
            write: function (path, content, encode) {

            }
        }

        compress.__set__("JSZIP", mockJSZIP);
        compress.__set__("asyncFs", mockAsyncFs);

        expect(compress.zipFiles("src_zipFiles", "dest_zipFiles")).to.be.eventually.fulfilled.and.notify(done);

    });

    it('zipFiles(reject)', function (done) {

        let mockJSZIP = function () {
            return function () {
                this.folder = function (dir) {
                    throw "UT_TEST_MOCK_ERROR";
                };
                this.file = function (path, file) {
                };
                this.generateAsync = function (json) {
                    return json;
                }
            }
        }();

        let mockAsyncFs = {
            read: function (filePath) {

            },
            readDir: function (dir) {

            },
            write: function (path, content, encode) {

            }
        }

        compress.__set__("JSZIP", mockJSZIP);
        compress.__set__("asyncFs", mockAsyncFs);

        expect(compress.zipFiles("src_zipFiles", "dest_zipFiles")).to.be.eventually.rejected.and.notify(done);


    });

    it('zipDir(resolve)', function (done) {

        let mockJSZIP = function () {
            return function () {
                this.folder = function (dir) {
                    return this;
                };
                this.file = function (path, file) {
                };
                this.generateAsync = function (json) {
                    return json;
                }
            }
        }();

        let mockAsyncFs = {
            read: function (filePath) {

            },
            readDir: function (dir) {
                let files = ["ut_a.js", "ut_b.js"]
                return files;
            },
            write: function (path, content, encode) {

            },

            stat: function (path, callback) {
                let fileSta = {
                    isDirectory: function () {
                        return false;
                    }
                };

                return fileSta;
            }
        }

        compress.__set__("JSZIP", mockJSZIP);
        compress.__set__("asyncFs", mockAsyncFs);

        expect(compress.zipDir("srcDir", "destPath")).to.be.eventually.fulfilled.and.notify(done);

    });

    it('zipDir(rejected)', function (done) {

        let mockJSZIP = function () {
            return function () {
                this.folder = function (dir) {
                    throw "UT_TEST_MOCK_ERROR";
                };
                this.file = function (path, file) {
                };
                this.generateAsync = function (json) {
                    return json;
                }
            }
        }();

        let mockAsyncFs = {
            read: function (filePath) {

            },
            readDir: function (dir) {
                let files = ["ut_a.js", "ut_b.js"]
                return files;
            },
            write: function (path, content, encode) {

            },

            stat: function (path, callback) {
                let fileSta = {
                    isDirectory: function () {
                        return false;
                    }
                };

                return fileSta;
            }
        }

        compress.__set__("JSZIP", mockJSZIP);
        compress.__set__("asyncFs", mockAsyncFs);

        expect(compress.zipDir("srcDir", "destPath")).to.be.eventually.rejected.and.notify(done);


    });
});
