import type { Dict, M } from './base';
interface ExcelHeader {
    key: string;
    header: string;
    width?: number;
}
interface WriteExcelDataOption {
    headers: ExcelHeader[];
    data: Dict[];
    sheetName?: string;
}
interface ReadExcelDataOption {
    headers: ExcelHeader[];
    sheetName: string;
}
declare function writeExcel(outFileName: string, dataOpt: WriteExcelDataOption[]): Promise<void>;
declare function readExcel(file: File, destSheetsOpt: ReadExcelDataOption[]): Promise<M<Dict[]> | Dict[] | null>;
export { writeExcel, readExcel };
export type { WriteExcelDataOption, ExcelHeader, ReadExcelDataOption };
