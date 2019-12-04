const os = require('os');

/*************************************************/
function buildNetcards(family) {
    const netWorkInterface = os.networkInterfaces();
    let netcards = [];
    for (let key in netWorkInterface) {
        let net = {};
        net.name = key;
        net.family = family;
        for (let i = 0; i < netWorkInterface[key].length; i++) {
            if (netWorkInterface[key][i].family === family) {
                net.address = netWorkInterface[key][i].address;
                net.netmask = netWorkInterface[key][i].netmask;
                net.mac = netWorkInterface[key][i].mac;
                break;
            }
        }
        netcards.push(net);
    }
    return netcards;
}

/*************************************************/
/**
 * 
 * @returns {[{name:string,family:string,address:string,netmask:string,mac:string}]}
 */
function getIPV4Netcards() {
    return buildNetcards('IPv4');
}

/**
 * 
 * @returns {[{name:string,family:string,address:string,netmask:string,mac:string}]}
 */
function getIPv6Netcards() {
    return buildNetcards('IPv6');
}

function netcardExists(ip, mac) {
    const netWorkInterface = os.networkInterfaces();
    for (let key in netWorkInterface) {
        for (let i = 0; i < netWorkInterface[key].length; i++) {
            if (netWorkInterface[key][i].address === ip /*&&
                netWorkInterface[key][i].mac === mac*/) {
                return true;
            }
        }
    }
    return false;
}

/**
 * @returns {{address: string,
 *            netmask: string,
 *            family: string,
 *            mac: string,
 *            internal:boolean,
 *            cidr:string}}
 */
function getDefaultNetcard() {
    const netWorkInterface = os.networkInterfaces();
    for (let key in netWorkInterface) {
        for (let i = 0; i < netWorkInterface[key].length; i++) {
            if (netWorkInterface[key][i].family === 'IPv4' &&
                netWorkInterface[key][i].mac !== '00:00:00:00:00:00') {
                return netWorkInterface[key][i];
            }
        }
    }
}

/*************************************************/
exports.getIPV4Netcards = getIPV4Netcards;
exports.getIPv6Netcards = getIPv6Netcards;
exports.netcardExists = netcardExists;
exports.getDefaultNetcard = getDefaultNetcard;