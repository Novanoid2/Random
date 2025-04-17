//c ~~ a =!> c -> d
function main(workbook: ExcelScript.Workbook) {
    let selectedSheet = workbook.getActiveWorksheet();
    let duplRange = selectedSheet.getRange("A1:A2126");
    let duplNumbs = duplRange.getValues();
    let duplList = duplNumbs.map(row => row[0]);
    for (let cellnumb = 1; cellnumb <= 2126; cellnumb++) {
        let cCell = selectedSheet.getRange("C" + cellnumb);
        let cValue = cCell.getValue();
        let isDuplicate = duplList.includes(cValue);
        if (!isDuplicate) {
            selectedSheet.getRange("D" + cellnumb).setValue(cValue);
        }
    }
}
//e ~~ d =!> e -> f
function main(workbook: ExcelScript.Workbook) {
    let selectedSheet = workbook.getActiveWorksheet();
    let duplRange = selectedSheet.getRange("D1:D2126");
    let duplNumbs = duplRange.getValues();
    let duplList = duplNumbs.map(row => row[0]);
    for (let cellnumb = 1; cellnumb <= 818; cellnumb++) {
        let eCell = selectedSheet.getRange("E" + cellnumb);
        let eValue = eCell.getValue();
        let isDuplicate = duplList.includes(eValue);
        if (!isDuplicate) {
            selectedSheet.getRange("F" + cellnumb).setValue(eValue);
        }
    }
}
//d ~~ c w/ ae => ae -> e 
function main(workbook: ExcelScript.Workbook) {
    let selectedSheet = workbook.getActiveWorksheet();
    let duplRange = selectedSheet.getRange("D1:D2126");
    let duplNumbs = duplRange.getValues();
    let duplList = duplNumbs.map(row => row[0]);
    for (let cellnumb = 1; cellnumb <= 20319; cellnumb++) {
        let cCell = selectedSheet.getRange("C" + cellnumb);
        let cValue = cCell.getValue();
        let isDuplicate = duplList.includes(cValue);
        if (isDuplicate) {
            let agCell = selectedSheet.getRange("AG" + cellnumb);
            let agValue = agCell.getValue();
            if(!agValue && agValue !== 0){
                selectedSheet.getRange("E" + cellnumb).setValue("Puste");
            } else {
            selectedSheet.getRange("E" + cellnumb).setValue(agValue);
            }
        } else {
            selectedSheet.getRange("E" + cellnumb).setValue("N/A");
        } 
    }
}

//bit more optimised ver
function main(workbook: ExcelScript.Workbook) {
    let selectedSheet = workbook.getActiveWorksheet();
    let duplNumbs = selectedSheet.getRange("D1:D2126").getValues();
    let duplSet = new Set (duplNumbs.map(row => row[0]));
    for (let cellnumb = 1; cellnumb <= 20319; cellnumb++) {
        let cCell = selectedSheet.getRange("C" + cellnumb);
        if (duplSet.has(cCell.getValue())) {
            let agValue = selectedSheet.getRange("AG" + cellnumb).getValue();
            if(!agValue/* && agValue !== 0*/){
                selectedSheet.getRange("E" + cellnumb).setValue("Puste");
            } else {
            selectedSheet.getRange("E" + cellnumb).setValue(agValue);
            }
        } else {
            selectedSheet.getRange("E" + cellnumb).setValue("N/A");
        }
    }
}

//duze cos
function main(workbook: ExcelScript.Workbook) {
    let selectedSheet = workbook.getActiveWorksheet();
    let arr: string[] = [];
    let aValues = selectedSheet.getRange("A2:A175").getValues();
    for(let i = 2; i < aValues.length + 2; i++){
        if(aValues[i][0].includes(" ")){
            while(aValues[i][0].includes(" ")){
                aValues[i][0] = aValues[i][0].slice(0,-1);
                arr.push(aValues[i][0]);
            }
        }
    }
    console.log(arr);
    console.log(arr.length);
}

function main(workbook: ExcelScript.Workbook) {
    let selectedSheet = workbook.getActiveWorksheet();
    let arr = [
            "1A35110173C",
            "1A35410046A",
            "1A37190008",
            "1A63193097",
            "1A63519039",
            "2622566PH",
            "7280294",
            "AD1000496",
            "1A21417080APH",
            "1A27574186",
            "1A33219246PH",
            "1A33219415D",
            "1A31810033PH",
            "1A33219216PH",
            "1A52217002PH",
            "7260465",
            "8PPAD1339200",
            "1A21411005A",
            "1A21599406",
            "1A25647846",
            "1A27574157",
            "1A31113100APH",
            "1A31140116A",
            "1A33212018C",
            "1A33219206APH",
            "1A33861008E",
            "1A51217003DPH",
            "1A61330006",
            "1A802769002",
            "AD1000504",
            "1A21113059",
            "1A21412023",
            "1A32411046B",
            "1A42613525    440",
            "1A52599005",
            "1A63190398",
            "8PPAM0292916",
            "1A18351107",
            "1A21190501",
            "1A31810024B",
            "1A31810058PH",
            "1A33219365B",
            "1A33697010PH",
            "1A35117047PH",
            "1A35417004PH",
            "1A63417015APH",
            "1A63643518    440",
            "2622243",
            "2629394",
            "2SGAD1345001",
            "3EAAM0263703PH",
            "7280180",
            "8PPAD1149601",
            "AD1000498",
            "1A21219099A",
            "1A21219160C",
            "1A21219171C",
            "1A21219224PH",
            "1A21995709",
            "1A24510002PH",
            "1A27574187",
            "1A31162004PH",
            "1A33219442PH",
            "1A33219588PH",
            "1A35110282B",
            "1A35140153B",
            "1A35610092",
            "1A63110331",
            "1A63117071PH",
            "1A63217000PH",
            "1A63617000PH",
            "1A63640009",
            "1A63663517C    440",
            "1A63890005DPH",
            "3EAAM0263203PH",
            "3EAAM0263307PH",
            "8PPAM0292914",
            "AM0855502",
            "1A21113057",
            "1A21219165D",
            "1A21411057",
            "1A21599418",
            "1A21813068",
            "1A27572549",
            "1A29961117",
            "1A31110116A",
            "1A31113030PH",
            "1A31140125A",
            "1A31142009D",
            "1A31510017B",
            "1A31519013A",
            "1A31861032A",
            "1A32412009A",
            "1A32519004PH",
            "1A32592013A",
            "1A33219144C",
            "1A33219198APH",
            "1A33219395PH",
            "1A33219403PH",
            "1A33219465A",
            "1A33219479PH",
            "1A33219572B",
            "1A33219587PH",
            "1A33229440PH",
            "1A33697009PH",
            "1A35110149B",
            "1A35119011CPH",
            "1A35217072PH",
            "1A35440047A",
            "1A42613529PH",
            "1A63113040APH",
            "1A63411002",
            "1A63819001GPH",
            "2620116",
            "2622147",
            "2622149",
            "2622157",
            "2649318",
            "7280183",
            "8PPAM0292915",
            "8PPAM0293015",
            "AD1000497",
            "1A18165647",
            "1A21110192A",
            "1A21110421A",
            "1A21210049",
            "1A21215011",
            "1A21411078C",
            "1A21441014",
            "1A21441046A",
            "1A21510040APH",
            "1A21592545",
            "1A27572557",
            "1A31617148",
            "1A32110122APH",
            "1A32219031APH",
            "1A32613507    440",
            "1A33219001A",
            "1A33219143C",
            "1A33219163CPH",
            "1A33219201APH",
            "1A33219214PH",
            "1A33219478PH",
            "1A33219483PH",
            "1A33219558B",
            "1A33810040G",
            "1A35110304CPH",
            "1A35190166",
            "1A35490045A",
            "1A35613506PH",
            "1A35617005PH",
            "1A35693011B",
            "1A52110006",
            "1A59955140-000-440",
            "1A63110395PH",
            "1A63112086PH",
            "1A63197004PH",
            "1A63461003",
            "1A63517013",
            "1A63611505PH",
            "1A63611506PH",
            "1A63612502PH",
            "1A63897000CPH",
            "2621248",
            "2634334",
            "2647621",
            "3EAAM0263305PH",
            "3EAAM0263405PH",
            "3EAAM0263503PH",
            "8PPAD1146404",
            "AD1000495",
            "HIEAD1102704"        
    ];
    let values = selectedSheet.getRange("B8:B370").getValues();
    for(let i = 0; i < values.length + 1; i++){
        if(arr.includes(values[i][0])){
            selectedSheet.getRange("G" + (i + 8)).setValue("Ja");
        }
    }
}

function main(workbook: ExcelScript.Workbook) {
    let selectedSheet = workbook.getActiveWorksheet();
    let sheet2 = workbook.getWorksheet("Sheet1");
    let kValues = selectedSheet.getRange("K30:K128").getValues();
    let bValues = sheet2.getRange("B6:B749").getValues().map(row => row[0]);
    for(let i = 0; i < bValues.length; i++){
        for(let j = 0; j < kValues.length; j++){
            if(bValues[i][0] === kValues[j][0]){
        let lCellValue = selectedSheet.getRange("L"+ (i+30)).getValue();
        let mCellValue = selectedSheet.getRange("M"+ (i+30)).getValue();
        let nCellValue = selectedSheet.getRange("N"+ (i+30)).getValue();
        let oCellValue = selectedSheet.getRange("O"+ (i+30)).getValue();
        sheet2.getRange("H"+(i+6)).setValue(lCellValue);
        sheet2.getRange("I"+(i+6)).setValue(mCellValue);
        sheet2.getRange("J"+(i+6)).setValue(nCellValue);
        sheet2.getRange("K"+(i+6)).setValue(oCellValue);
      }
    }
}
}

function main(workbook: ExcelScript.Workbook) {
    let selectedSheet = workbook.getActiveWorksheet();
    let sheet2 = workbook.getWorksheet("Sheet1");
    let kValues = selectedSheet.getRange("K30:K127").getValues();
    let bValues = sheet2.getRange("B6:B749").getValues();
    for (let i = 0; i < bValues.length; i++) {
        let bValue = bValues[i][0]; 
        for (let kIndex = 0; kIndex < kValues.length; kIndex++) {  
            let kValue = kValues[kIndex][0];
            if (bValue === kValue) {
                let lCellValue = selectedSheet.getRange("L" + (kIndex + 30)).getValue();
                let mCellValue = selectedSheet.getRange("M" + (kIndex + 30)).getValue();
                let nCellValue = selectedSheet.getRange("N" + (kIndex + 30)).getValue();
                let oCellValue = selectedSheet.getRange("O" + (kIndex + 30)).getValue();
                sheet2.getRange("H" + (i + 6)).setValue(lCellValue);
                sheet2.getRange("I" + (i + 6)).setValue(mCellValue);
                sheet2.getRange("J" + (i + 6)).setValue(nCellValue);
                sheet2.getRange("K" + (i + 6)).setValue(oCellValue);
                break;
            }
        }
    }
}

function main(workbook: ExcelScript.Workbook) {
    let selectedSheet = workbook.getWorksheet("green to be active via Kadan");
    let colorSheet = workbook.getWorksheet("purple_to obsolete");
    let s1Values = selectedSheet.getRange("B6:B1893").getValues();
    let s2Values = colorSheet.getRange("B5:B351").getValues();   
    for(let i = 0; i < s1Values.length; i++){
        let s1value = s1Values[i][0];
        for(let j = 0; j < s2Values.length; j++){
            let s2value = s2Values[j][0];
            if(s1value === s2value){
                selectedSheet.getRange("A"+(i+6)).setColor("Light green");
                break;
            }
        }
    }
}