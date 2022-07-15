const bl = [];
var tempStr = "";
for(let i=0; i<51; i++){
  tempStr = "rgb(" + (i*5) + "," + (i*5) + "," + (i*5) + ")";
  bl.push(tempStr);
}

export const blacks = bl;