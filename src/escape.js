

/*******************************************************/
/**
 * 0x02---->0x1B 0xE7
 * 0x03---->0x1B 0xE8
 * 0x1B---->0x1B 0x00
 * @param {Array} buffer srcBuffer
 * @param {number} startIndex 
 * @param {number} endIndex
 * @returns {Array} escapedBuffer
 */
function escapeBuffer(buffer, startIndex = 0, endIndex = -1) {
    let buf = [];
    startIndex = (startIndex >= 0) ? startIndex : 0;
    endIndex = (endIndex >= 0) ? endIndex : buffer.length - 1;

    for (let i = 0; i < buffer.length; i++) {
        if (i >= startIndex && i <= endIndex) {
            switch (buffer[i]) {
                case 0x02:
                    buf.push(0x1B);
                    buf.push(0xE7);
                    break;
                case 0x03:
                    buf.push(0x1B);
                    buf.push(0xE8);
                    break;
                case 0x1B:
                    buf.push(0x1B);
                    buf.push(0x00);
                    break;
                default:
                    buf.push(buffer[i]);
                    break;
            }
        } else {
            buf.push(buffer[i]);
        }
    }

    return buf;
}

/**
 * 0x1B 0xE7---->0x02
 * 0x1B 0xE8---->0x03
 * 0x1B 0x00---->0x1B
 * @param {Array} buffer srcBuffer
 * @param {number} startIndex 
 * @param {number} endIndex
 * @returns {Array} escapedBuffer
 */
function unescapeBuffer(buffer, startIndex = 0, endIndex = -1) {
    let buf = [];
    startIndex = (startIndex >= 0) ? startIndex : 0;
    endIndex = (endIndex >= 0) ? endIndex : buffer.length - 1;

    for (let i = 0; i < buffer.length; i++) {
        if (i >= startIndex && i <= endIndex) {
            if (buffer[i] === 0x1B && ((i + 1) < buffer.length)) {
                switch (buffer[i + 1]) {
                    case 0xE7:
                        buf.push(0x02);
                        i++;
                        break;
                    case 0xE8:
                        buf.push(0x03);
                        i++;
                        break;
                    case 0x00:
                        buf.push(0x1B);
                        i++;
                        break;
                    default:
                        buf.push(buffer[i]);
                        break;
                }
            } else {
                buf.push(buffer[i]);
            }
        } else {
            buf.push(buffer[i]);
        }
    }

    return buf;
}

/*******************************************************/
exports.escapeBuffer = escapeBuffer;
exports.unescapeBuffer = unescapeBuffer;