
/*******************************************************/
function parseDate(date) {
    let temp = date.replace(/[:\s\/\.-]/g, '\/');
    let curDate = new Date();
    if (temp.split('/').length === 3) {
        return {
            year: ~~temp.split('/')[0],
            month: ~~temp.split('/')[1],
            day: ~~temp.split('/')[2]
        }
    } else {
        return {
            year: curDate.getFullYear(),
            month: temp.split('/')[0],
            day: temp.split('/')[1]
        }
    }
}

function parseTime(time) {
    return {
        hour: ~~time.split(':')[0],
        minute: ~~time.split(':')[1],
        second: ~~time.split(':')[2]
    }
}

function dateCompara(date1, date2) {
    if (date1.year !== date2.year) {
        return (date1.year - date2.year);
    }
    if (date1.month !== date2.month) {
        return (date1.month - date2.month);
    }
    return (date1.day - date2.day);
}

function timeCompara(time1, time2) {
    if (time1.hour !== time2.hour) {
        return (time1.hour - time2.hour);
    }
    if (time1.minute !== time2.minute) {
        return (time1.minute - time2.minute);
    }
    return (time1.second - time2.second);
}

/*******************************************************/
/**
 * 判断当前是否在有效日期范围内
 * @param {string} startD  2019-(./)7-(./)1 || 7-(./)1
 * @param {string} endD  2019-(./)7-(./)31  || 7-(./)31
 * @returns {boolean}
 */
function validDate(startD, endD) {
    let curDate = new Date();
    let cur = { year: curDate.getFullYear(), month: curDate.getMonth() + 1, day: curDate.getDate() };
    let start = parseDate(startD);
    let end = parseDate(endD);
    return ((dateCompara(cur, start) >= 0) && (dateCompara(cur, end) <= 0));
}

/**
 * 判断当前星期是否有效
 * @param {number} weekMask int8_t
 * @returns {boolean}
 */
function validDayOfWeek(weekMask) {
    let curWeekDay = new Date().getDay();
    return ((weekMask >> curWeekDay) & 0x01 === 1) ? true : false
}

/**
 * 判断当前时间是否在有效范围内
 * @param {string} startT 08:00:00
 * @param {string} endT   17:00:00
 * @returns {boolean}
 */
function validTime(startT, endT) {
    let curDate = new Date();
    let cur = { hour: curDate.getHours(), minute: curDate.getMinutes(), second: curDate.getSeconds() }
    let start = parseTime(startT);
    let end = parseTime(endT);
    return ((timeCompara(cur, start) >= 0) && (timeCompara(cur, end) <= 0));
}

/**
 * 
 * @param {{startDate:2019-7-1,
 *          startTime:08:00:00,
 *          endDate:2019-7-31,
 *          endTime:17:00:00,
 *          repeat:127}} item 
 */
function validItem(item) {
    return (validDate(item.startDate, item.endDate) &&
        validDayOfWeek(item.repeat || 0) &&
        validTime(item.startTime, item.endTime)
    );
}

/*********************************************************/
/**
 * date1在date2之前
 * @param {string} date1 2019-(./)7-(./)1 || 7-(./)1
 * @param {string} date2 2019-(./)7-(./)1 || 7-(./)1
 */
function dateBefore(date1, date2) {
    let d1 = parseDate(date1);
    let d2 = parseDate(date2);
    return dateCompara(d1, d2) <= 0 ? true : false;
}

/**
 * date1在date2之后
 * @param {string} date1 2019-(./)7-(./)1 || 7-(./)1
 * @param {string} date2 2019-(./)7-(./)1 || 7-(./)1
 */
function dateAfter(date1, date2) {
    let d1 = parseDate(date1);
    let d2 = parseDate(date2);
    return dateCompara(d1, d2) >= 0 ? true : false;
}

/*********************************************************/
exports.dateBefore = dateBefore;
exports.dateAfter = dateAfter;
exports.validDate = validDate;
exports.validDayOfWeek = validDayOfWeek;
exports.validTime = validTime;
exports.validItem = validItem;
