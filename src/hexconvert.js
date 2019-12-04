
/*************************************************/
/**
 * 
 * @param {number} hundred 1-100
 * @returns {number} 1-64 
 */
function hundredToSixty(hundred) {
    let ret = Math.round(64 / 100 * hundred);
    if (ret < 1) {
        ret = 1;
    } else if (ret > 64) {
        ret = 64;
    }
    return ret;
}

/**
 * 
 * @param {number} sixty 1-64
 * @returns {number}  1-100
 */
function sixtyToHundred(sixty) {
    let ret = Math.round(sixty / 64 * 100);
    if (ret < 1) {
        ret = 1;
    } else if (ret > 100) {
        ret = 100;
    }
    return ret;
}

function decimalToHex(dec) {
    if ((typeof dec === 'number') && (dec % 1 === 0)) {
        let temp = dec.toString(16);
        if (temp.length <= 1) {
            temp = '0' + temp;
        } 
        return temp;
    }
}
/*************************************************/
exports.decimalToHex = decimalToHex;
exports.hundredToSixty = hundredToSixty;
exports.sixtyToHundred = sixtyToHundred;