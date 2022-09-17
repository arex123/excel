let sheetDB = [];

for(let i=0; i< rows;i++){
    let sheetRow = [];
    for(let j=0;j<cols;j++){
        let cellProp = {
            bold: false,
            italic: false,
            underline: false,
            alignment: "left",
            fontFamily: "monospace",
            fontSize: "14",
            fontColor: "#000000",
            BGcolor: "#000000", // for indication 
            value:"",
            formula:"",
            children:[]  
        }

        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

//selecting cells for properties
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-props")
let fontColor = document.querySelector(".font-color-prop");
let BGColor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];


let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1"

//application of two way binding
//attach property listeners
bold.addEventListener("click",(e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //modification
    cellProp.bold = !cellProp.bold; //Data change
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; //UI change (1)
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; // UI change (2)

})


italic.addEventListener("click",(e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //modification
    cellProp.italic = !cellProp.italic; //Data change
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; //UI change (1)
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp; // UI change (2)

})


underline.addEventListener("click",(e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //modification
    cellProp.underline = !cellProp.underline; //Data change
    cell.style.textDecoration = cellProp.underline ? "underline" : "normal"; //UI change (1)
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp; // UI change (2)

})


fontFamily.addEventListener("change",(e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    //modification
    cellProp.fontFamily = fontFamily.value; //Data change
    cell.style.fontFamily = cellProp.fontFamily;
    fontFamily.value = cellProp.fontFamily;

})

fontSize.addEventListener("change",(e)=>{
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontSize = fontSize.value;
    cell.style.fontSize = cellProp.fontSize+"px";
    fontSize.value = cellProp.fontSize;
})

fontColor.addEventListener("change",(e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.fontColor = fontColor.value;
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor;
    
})

BGColor.addEventListener("change",(e) => {
    let address = addressBar.value;
    let [cell, cellProp] = getCellAndCellProp(address);

    cellProp.BGColor = BGColor.value;
    cell.style.backgroundColor = cellProp.BGColor;
    BGColor.value = cellProp.BGColor;
    
})

alignment.forEach((alignElem) => {
    alignElem.addEventListener("click",(e)=>{
        let address = addressBar.value;
        let [cell, cellProp] = getCellAndCellProp(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue; //data change
        cell.style.textAlign = cellProp.alignment; // UI change(1)

        switch(alignValue){
            case "left":
                leftAlign.style.backgroundColor = activeColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = activeColorProp;
                rightAlign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColorProp;
                centerAlign.style.backgroundColor = inactiveColorProp;
                rightAlign.style.backgroundColor = activeColorProp;
                break;
        }


    })
})


let allCells = document.querySelectorAll(".cell");
for(let i=0;i<allCells.length;i++){
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell){

    cell.addEventListener("click",(e) => {


    let address = addressBar.value;
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    let cellProp = sheetDB[rid][cid];

    //Apply cell Properties
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal"; //UI change (1)
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal"; //UI change (1)
    cell.style.fontSize = cellProp.fontSize+"px";
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.textDecoration = cellProp.underline ? "underline" : "normal"; //UI change (1)
    cell.style.textAlign = cellProp.alignment; // UI change(1)
    cell.style.backgroundColor = cellProp.BGColor;
    cell.style.color = cellProp.fontColor;

    //Apply properties UI Props container
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactiveColorProp; // UI change (2)
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactiveColorProp; // UI change (2)
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactiveColorProp; // UI change (2)
    fontColor.value = cellProp.fontColor;
    BGColor.value = cellProp.BGcolor;
    fontSize.value = cellProp.fontSize;
    fontFamily.value = cellProp.fontFamily;
    switch(cellProp.alignment){
        case "left":
            leftAlign.style.backgroundColor = activeColorProp;
            centerAlign.style.backgroundColor = inactiveColorProp;
            rightAlign.style.backgroundColor = inactiveColorProp;
            break;
        case "center":
            leftAlign.style.backgroundColor = inactiveColorProp;
            centerAlign.style.backgroundColor = activeColorProp;
            rightAlign.style.backgroundColor = inactiveColorProp;
            break;
        case "right":
            leftAlign.style.backgroundColor = inactiveColorProp;
            centerAlign.style.backgroundColor = inactiveColorProp;
            rightAlign.style.backgroundColor = activeColorProp;
            break;
    }
    let formulaBar = document.querySelector(".formula-bar");
    formulaBar.value = cellProp.formula;
    cell.value = cellProp.value


})
  
}


function getCellAndCellProp(address){
    let [rid, cid] = decodeRIDCIDFromAddress(address);
    //Access cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function decodeRIDCIDFromAddress(address){
    let rid = Number(address.slice(1)-1); // "1"->0
    let cid = Number(address.charCodeAt(0))-65; // "A" -> 65
    return [rid, cid];
}