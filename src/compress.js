
const asyncFs = require("./async-fs");
const path = require("path");
const JSZIP = require("jszip");
const AdmZip = require('adm-zip');

/*************************************************/
/**
 * 
 * @param {string} filePath 
 * @param {JSZip} zip 
 */
async function readFile(filePath, zip) {
    try {
        let file = await asyncFs.read(filePath);
        zip.file(path.basename(filePath), file);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * 
 * @param {Array} files 
 * @param {FSZip} zip 
 */
async function readFiles(files, zip) {
    for (let i = 0; i < files.length; i++) {
        try {
            await readFile(files[i], zip);
        } catch (error) {
            console.log(__filename, error);
        }
    }
    return Promise.resolve();
}

/**
 * 
 * @param {string} dir 
 * @param {JSZip} zip 
 */
async function readDir(dir, zip) {
    try {
        let files = await asyncFs.readDir(dir);
        for (let i = 0; i < files.length; i++) {
            let fileName = files[i];
            let filePath = path.join(dir, fileName);
            let file = await asyncFs.stat(filePath);
            if (file.isDirectory()) {
                await readDir(filePath, zip.folder(fileName));
            } else {
                await readFile(filePath, zip);
            }
        }
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * 
 * @param {JSZip} zip 
 * @param {string} path 
 */
async function zipToFile(zip, path) {
    try {
        let content = await zip.generateAsync({
            type: "nodebuffer",
            compression: "DEFLATE",
            compressionOptions: { level: 9 }
        });
        await asyncFs.write(path, content, 'utf8');
        return Promise.resolve(path);
    } catch (error) {
        return Promise.reject(error);
    }
}

/*************************************************/
/**
 * 
 * @param {string} srcDir 
 * @param {string} destPath 
 */
async function zipDir(srcDir, destPath) {
    try {
        let zip = new JSZIP().folder(path.dirname(destPath));
        await readDir(srcDir, zip);
        await zipToFile(zip, destPath);
        return Promise.resolve(destPath);
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * 
 * @param {Array} srcFiles
 * @param {string} destPath 
 */
async function zipFiles(srcFiles, destPath) {
    try {
        let zip = new JSZIP().folder(path.dirname(destPath));
        await readFiles(srcFiles, zip);
        await zipToFile(zip, destPath);
        return Promise.resolve(destPath);
    } catch (error) {
        return Promise.reject(error);
    }
}

/*************************************************/
/**
 * 
 * @param {string} zipPath 
 * @param {string} destPath 
 * @param {boolean} overwrite 
 */
function unzip(zipPath, destPath, overwrite = true) {
    let zip = new AdmZip(zipPath);
    zip.extractAllTo(/*target path*/destPath, /*overwrite*/overwrite);
    return destPath;
}

/*************************************************/
exports.zipFiles = zipFiles;
exports.zipDir = zipDir;
exports.unzip = unzip;