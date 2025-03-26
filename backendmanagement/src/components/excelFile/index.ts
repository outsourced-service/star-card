import writeXlsxFile from 'write-excel-file';
import readXlsxFile from 'read-excel-file';
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { removeWhitespace } from '/@/utils/toolsValidate';

Array.prototype.processWithAsync = async function (callback: any) {
    for (let i = 0; i < this.length; i++) {
        await callback(this[i], i, this);
    }
}

/** 导出模板 */
export async function exportFile(fileData: any, fileName: any = 'file.xlsx') {
    const { data = [], schema = [], columnStr = {}, isDimension = false, sheets = 'Sheet 1' } = fileData;
    const fun = (data: any, schema: any) => {
        const columnSet = new Set();  // 创建一个Set来存储唯一的列名  
        data.forEach((item: any) => {
            for (const key in item) if (item.hasOwnProperty(key)) columnSet.add(key);
        });
        Array.from(columnSet).forEach((column: any) => {
            schema.push({
                column: columnStr[column] || column,
                type: String,
                value: (student: any) => `${student?.[column] ?? ''}`
            })
        })
    }

    if (!isDimension) {
        if (schema.length === 0) fun(data, schema);
    } else {
        data.forEach((item: any, index: number) => fun(item, schema[index] = schema[index] || []))
    }
    return await writeXlsxFile(data, {
        schema: schema,
        ...isDimension ? { sheets: sheets } : {},
        fileName
    })
}
/** 导入模板 */
export async function ImportFile(fileData: File, columnStr: { [key: string]: string } = {}) {
    //title: 表头  XLSX: 数据
    const [title = [], ...XLSX] = Array.isArray(fileData) ? fileData : await readXlsxFile(fileData);
    //查找对应表头所在位置
    const keys = Object.keys(columnStr).reduce((prev: any, key: any) => {
        prev[key] = title.findIndex((item: any) => item?.includes(columnStr[key]));
        return prev;
    }, {})
    //查找状态所在位置
    let UploadStatus = title.findIndex((item: any) => item?.includes('导入状态'));
    if (UploadStatus < 0) {
        title.push('导入状态');
        UploadStatus = title.length - 1;
    }
    //查找字段对应的位置
    return {
        title: title || [],
        XLSX: XLSX || [],
        keys: keys || {},
        UploadStatus: UploadStatus || -1
    }
}