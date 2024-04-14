
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})


export class ExcelService {

  constructor() { }

  public exportAsExcelFile(element: any, excelFileName: string): void {


    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, { dateNF: 'dd/mm/yyyy;@', cellDates: true, raw: false });
    //here new changes 

    //excelFileName='excelFileName.XLSX';
    excelFileName = excelFileName + ".XLSX";

    /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const wb: XLSX.WorkBook = XLSX.utils.book_new();



    XLSX.utils.book_append_sheet(wb, worksheet, 'Sheet1');


    /* save to file */
    XLSX.writeFile(wb, excelFileName);
  }

}
