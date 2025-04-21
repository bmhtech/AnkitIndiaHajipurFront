
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

  tableToExcel = (function () {
    // Define your style class template.
    var style = "<style>table{border: 1px solid black;} th, td {border:1px dotted black;}</style>";
    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' + style + '</head><body><table>{table}</table></body></html>'
        , base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        }
        , format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; })
        }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
       // window.location.href = uri + base64(format(template, ctx))
       var a = document.createElement('a');
        a.href = uri + base64(format(template, ctx))
        a.download = name+'.xls';
        //triggering the function
        a.click(); 
        
      }
    })()

}
