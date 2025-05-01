import * as XLSX from 'xlsx-js-style';
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

  tableToExcelwtFormat(element: HTMLElement, fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const thead = element.querySelector('thead');
    let theadRowCount = 0;
    if (thead) {
      theadRowCount = thead.querySelectorAll('tr').length;
    }

    const range = XLSX.utils.decode_range(ws['!ref']!);

    // 1. Apply border, font, alignment to every cell (including blank)
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });

        // Create missing cell
        if (!ws[cellRef]) {
          ws[cellRef] = { t: 's', v: '' };
        }

        // Apply style
        ws[cellRef].s = {
          font: {
            bold: R < theadRowCount,
            name: 'Arial',
            sz: 11,
          },
          alignment: {
            horizontal: 'center',
            vertical: 'center',
            //wrapText: true,
          },
          border: {
            top:    { style: 'thin', color: { rgb: '000000' } },
            bottom: { style: 'thin', color: { rgb: '000000' } },
            left:   { style: 'thin', color: { rgb: '000000' } },
            right:  { style: 'thin', color: { rgb: '000000' } },
          },
        };
      }
    }

    /*
    // 2. Freeze header rows
    ws['!freeze'] = { xSplit: 0, ySplit: theadRowCount };

    // 3. Auto Column Width
    const colWidths: { wch: number }[] = [];
    for (let C = range.s.c; C <= range.e.c; ++C) {
      let maxLen = 6; // Minimum width
      for (let R = range.s.r; R <= range.e.r; ++R) {
        const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
        const cell = ws[cellRef];
        if (cell && cell.v != null) {
          const cellText = String(cell.v);
          maxLen = Math.max(maxLen, cellText.length);
        }
      }
      colWidths.push({ wch: maxLen + 2 }); // Add some padding
    }
    ws['!cols'] = colWidths;

    // 4. Auto Row Height
    const rowHeights: { hpt: number }[] = [];
    for (let R = range.s.r; R <= range.e.r; ++R) {
      rowHeights.push({ hpt: 14 }); // 14 points = decent height
    }
    ws['!rows'] = rowHeights;
    */ // commented auto fit and freeze on 26042025 for excel export

    // 5. Create Workbook and Save
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName + '.xlsx');
  }
}
