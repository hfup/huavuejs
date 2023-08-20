"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readExcel = exports.writeExcel = void 0;
const exceljs_1 = require("exceljs");
// 写入excel文件 多个sheet 通过浏览器下载
async function writeExcel(outFileName, dataOpt) {
    let workbook = new exceljs_1.Workbook();
    for (let i = 0; i < dataOpt.length; i++) {
        let data = dataOpt[i];
        let worksheet = workbook.addWorksheet(data.sheetName ?? `sheet${i + 1}`);
        worksheet.columns = data.headers.map(item => {
            return {
                key: item.key,
                header: item.header,
                width: item.width ?? 20
            };
        });
        //保持数据与表头一致
        let dataRows = data.data.map(item => {
            let obj = {};
            data.headers.forEach(header => {
                obj[header.key] = item[header.key] ?? '';
            });
            return obj;
        });
        worksheet.addRows(dataRows);
    }
    //将工作簿写转换为 ArrayBuffer
    let buffer = await workbook.xlsx.writeBuffer();
    //将ArrayBuffer转换为Blob
    let blob = new Blob([buffer], { type: 'application/octet-stream' });
    //创建一个a标签
    let a = document.createElement('a');
    //创建一个点击事件
    let event = new MouseEvent('click');
    //将a标签的download属性设置为我们想要下载的文件名
    a.download = outFileName;
    //将Blob对象设置为a标签的href属性
    a.href = URL.createObjectURL(blob);
    //触发a标签的点击事件
    a.dispatchEvent(event);
    //释放URL对象所占资源
    URL.revokeObjectURL(a.href);
}
exports.writeExcel = writeExcel;
// 读取excel文件 只读取指定的表头
async function readExcel(file, destSheetsOpt) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
            const data = e.target?.result;
            if (data) { //存在数据
                const workbook = new exceljs_1.Workbook();
                await workbook.xlsx.load(data);
                let destSheetList = [];
                // 处理sheet
                workbook.eachSheet((worksheet, sheetId) => {
                    destSheetsOpt.forEach(sheetOpt => {
                        if (worksheet.name === sheetOpt.sheetName) {
                            destSheetList.push({
                                worksheet,
                                headers: sheetOpt.headers
                            });
                        }
                    });
                });
                let allData = {}; //读取的所有数据
                // 处理sheet
                destSheetList.forEach(sheet => {
                    let resultData = [];
                    let headers = [];
                    sheet.worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
                        if (rowNumber === 1) {
                            headers = row.values;
                            headers = headers.slice(1);
                        }
                        else {
                            let obj = {};
                            row.eachCell((cell, colNumber) => {
                                let headerName = headers[colNumber - 1];
                                if (headerName) {
                                    sheet.headers.forEach(header => {
                                        // 找出对应的key
                                        if (header.header === headerName) {
                                            obj[header.key] = cell.value ?? '';
                                        }
                                    });
                                }
                            });
                            resultData.push(obj);
                        }
                    });
                    allData[sheet.worksheet.name] = resultData;
                });
                //
                if (destSheetList.length === 1) {
                    //allData[destSheetList[0].worksheet.name]
                    resolve(allData[destSheetList[0].worksheet.name]);
                    return;
                }
                resolve(allData);
                return;
            }
            resolve(null);
            return;
        };
        reader.onerror = (e) => {
            reject(e);
        };
        reader.readAsArrayBuffer(file);
    });
}
exports.readExcel = readExcel;