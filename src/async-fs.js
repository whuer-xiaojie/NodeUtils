
const fs = require('fs');
const path = require('path');
const util = require('util');
const dateCompare = require('./date-compara');

/*************************************************/
async function mkdirs(dir) {
    try {
        if (await util.promisify(fs.exists)(dir)) {
            return Promise.resolve();
        } else {
            await mkdirs(path.dirname(dir));
            await util.promisify(fs.mkdir)(dir);
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

async function rmdir(dir) {
    try {
        let exist = await util.promisify(fs.exists)(dir);
        if (exist) {
            let files = await util.promisify(fs.readdir)(dir);
            for (let i = 0; i < files.length; i++) {
                let curPath = path.join(dir, files[i]);
                let fileSta = await util.promisify(fs.stat)(curPath);
                if (fileSta.isDirectory()) {
                    await rmdir(curPath);
                } else {
                    await util.promisify(fs.unlink)(curPath);
                }
            }
        }
        await util.promisify(fs.rmdir)(dir);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

async function mvdir(from, into) {
    try {
        let dest = path.join(into, path.basename());
        await mkdirs(into);
        await util.promisify(fs.rename)(from, dest);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject();
    }
}

async function copydir(from, into) {
    try {
        try {
            await util.promisify(fs.access)(into, fs.constants.F_OK);
        } catch (error) {
            await mkdirs(into);
        }

        let dest = path.join(into, path.basename(from));
        try {
            await util.promisify(fs.access)(dest, fs.constants.F_OK);
        } catch (error) {
            await mkdirs(dest);
        }

        const names = await util.promisify(fs.readdir)(from);
        for (const name of names) {
            const _path = path.resolve(from, name);
            const _dest = path.resolve(dest, name);
            const stat = await util.promisify(fs.stat)(_path);
            if (stat.isDirectory()) {
                await copydir(_path, _dest);
            } else {
                await util.promisify(fs.copyFile)(_path, _dest);
            }
        }
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}
/*************************************************/
/**
 * 
 * @param {string} path
 * @returns {string} yyyy-mm-dd 
 */
async function getFileCreateDate(path) {
    try {
        let sta = await util.promisify(fs.stat)(path);
        return Promise.resolve(sta.birthtime.toLocaleString().split(' ')[0]);
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * 
 * @param {string} dir 
 * @param {string} startDate yyyy-mm-dd
 * @param {string} endDate yyyy-mm-dd
 */
async function findFiles(dir, startDate, endDate) {
    try {
        let names = [];
        let files = await util.promisify(fs.readdir)(dir);
        for (let i = 0; i < files.length; i++) {
            let createDate = await getFileCreateDate(path.join(dir, files[i]));
            if (dateCompare.dateAfter(createDate, startDate) && dateCompare.dateBefore(createDate, endDate)) {
                names.push(path.join(dir, files[i]));
            }
        }
        return Promise.resolve(names);
    } catch (error) {
        return Promise.reject(error);
    }
}

/*************************************************/
exports.read = util.promisify(fs.readFile);
exports.write = util.promisify(fs.writeFile);
exports.exists = util.promisify(fs.exists);
exports.remove = util.promisify(fs.unlink);
exports.rename = util.promisify(fs.rename);
exports.stat = util.promisify(fs.stat);
exports.readDir = util.promisify(fs.readdir);

exports.mkdirs = mkdirs;
exports.rmdir = rmdir;
exports.mvdir = mvdir;
exports.copydir = copydir;

exports.findFiles = findFiles;
