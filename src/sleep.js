
class Ut {
    static sleep(ms = 0) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, ms);
        });
    }
}

/*************************************************/
module.exports = Ut;