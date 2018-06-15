'use strict'; class xlsExport{constructor(data,title='Worksheet'){if(!Array.isArray(data)||(typeof title!=='string'||Object.prototype.toString.call(title)!=='[object String]'))
  throw new Error("Invalid input types: new xlsExport(Array [], String)");this._data=data;this._title=title;}
  set setData(data){if(!Array.isArray(data))throw new Error("Invalid input type: setData(Array [])");this._data=data;}
  get getData(){return this._data;}
  exportToXLS(fileName='export.xls'){if(typeof fileName!=='string'||Object.prototype.toString.call(fileName)!=='[object String]')
  throw new Error("Invalid input type: exportToCSV(String)");const TEMPLATE_XLS=`
          <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
          <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>
          <head><!--[if gte mso 9]><xml>
          <x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{title}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>
          <![endif]--></head>
          <body>{table}</body></html>`;const MIME_XLS='data:application/vnd.ms-excel;base64,';const parameters={title:this._title,table:this.objectToTable()};const computeOutput=TEMPLATE_XLS.replace(/{(\w+)}/g,(x,y)=>parameters[y]);this.downloadFile(MIME_XLS+this.toBase64(computeOutput),fileName);}
  exportToCSV(fileName='export.csv'){if(typeof fileName!=='string'||Object.prototype.toString.call(fileName)!=='[object String]')
  throw new Error("Invalid input type: exportToCSV(String)");const MIME_CSV='data:attachament/csv,';this.downloadFile(MIME_CSV+encodeURIComponent(this.objectToSemicolons()),fileName);}
  downloadFile(output,fileName){const link=document.createElement('a');document.body.appendChild(link);link.download=fileName;link.href=output;link.click();}
  toBase64(string){return window.btoa(unescape(encodeURIComponent(string)));}
  objectToTable(){const colsHead='<tr><td style=\"text-align:center; font-weight:bold;\">ID</td><td style=\"text-align:center; font-weight:bold;\">Nama</td></tr>';const colsData=this._data.map(obj=>[`<tr>
                  ${Object.keys(obj).map(col=>`<td style=\"mso-number-format:0; text-align:left;\">${obj[col]?obj[col]:''}</td>`).join('')}
              </tr>`]).join('');return `<table>${colsHead}${colsData}</table>`.trim();}
  objectToSemicolons(){const colsHead=Object.keys(this._data).map(key=>[key]).join(';');const colsData=this._data.map(obj=>[Object.keys(obj).map(col=>[obj[col]]).join(';')]).join('\n');return `${colsHead}\n${colsData}`;}}
