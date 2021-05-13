function isNumber(val) {
    val = val + "";
    if (val.length < 1) return false;
    if (isNaN(val)) {
        return false;
    } else {
        return true;
    }
}
function trimAll(sString){while (sString.substring(0,1) == ' '){sString = sString.substring(1, sString.length);}while (sString.substring(sString.length-1, sString.length) == ' '){sString = sString.substring(0,sString.length-1);} return sString;}
function cleanNumberInput(inVal){
	var tempVal	= inVal+"";
	while ((tempVal.indexOf(" ")>-1)||(tempVal.indexOf("	")>-1)||(tempVal.indexOf(",")>-1)){
		tempVal = tempVal.replace(" ", "").replace("	", "").replace(",", "");
	}
	return tempVal;
}
function gnumberFormat(valToBeFormated){
	var gniTotalDigits = 12;
	var gniPareSize = 12;
	var valStr = "" + valToBeFormated;
	if (valStr.indexOf("N")>=0 || (valToBeFormated == 2*valToBeFormated && valToBeFormated == 1+valToBeFormated)) return "Error ";
	var i = valStr.indexOf("e")
	if (i>=0){
		var expStr = valStr.substring(i+1,valStr.length);
		if (i>11) i=11;  // max 11 digits
		valStr = valStr.substring(0,i);
		if (valStr.indexOf(".")<0){
			valStr += ".";
		}else{
			// remove trailing zeros
			j = valStr.length-1;
			while (j>=0 && valStr.charAt(j)=="0") --j;
			valStr = valStr.substring(0,j+1);
		}
		valStr += "E" + expStr;
	}else{
		var valNeg = false;
		if (valToBeFormated < 0){
			valToBeFormated = -valToBeFormated;
			valNeg = true;
		}
		var valInt = Math.floor(valToBeFormated);
		var valFrac = valToBeFormated - valInt;
		var prec = gniTotalDigits - (""+valInt).length - 1;	// how many digits available after period

		var mult = " 1000000000000000000".substring(1,prec+2);
		if ((mult=="")||(mult==" ")){
			mult = 1;
		}else{
			mult = parseInt(mult);
		}
		var frac = Math.floor(valFrac * mult + 0.5);
		valInt = Math.floor(Math.floor(valToBeFormated * mult + .5) / mult);
		if (valNeg)
			valStr = "-" + valInt;
		else
			valStr = "" + valInt;
		var fracStr = "00000000000000"+frac;
		fracStr = fracStr.substring(fracStr.length-prec, fracStr.length);
		i = fracStr.length-1;

		// remove trailing zeros unless fixed during entry.
		while (i>=0 && fracStr.charAt(i)=="0") --i;
		fracStr = fracStr.substring(0,i+1);
		if (i>=0) valStr += "." + fracStr;
	}
	return valStr;
}
function ucParseSelectValue(inStr){
	var tempArray = inStr.split("[");
	var ucOutArray = [];
	ucOutArray.push(trimAll(tempArray[0]));
	ucOutArray.push(trimAll(tempArray[1].replace("]","")));
	if (tempArray.length>2){
		ucOutArray.push(trimAll(tempArray[2].replace("]","")));
	}
	return ucOutArray;
}
function ucCalculateResultNumOnly(inVal, inFrom, inTo){
	var tempResult = 0;
	var tempInVal = inVal;
	var tempInFrom = inFrom+"";
	var tempInTo = inTo+"";
	if ((tempInFrom.indexOf(":")>0)||(tempInTo.indexOf(":")>0)){
		tempArrayFrom = tempInFrom.split(":");
		tempArrayTo = tempInTo.split(":");
		if ((tempArrayFrom.length==3)||(tempArrayTo.length==3)){
			// Temperature
			eval("tempResult = (("+inVal+"-("+tempArrayFrom[2]+"))/(("+tempArrayFrom[1]+")-("+tempArrayFrom[2]+")))*(("+tempArrayTo[1]+")-("+tempArrayTo[2]+"))+(" + tempArrayTo[2] + ");");
		}else{
			if (("3"==tempArrayFrom[0])||("3"==tempArrayTo[0])){
				//Binary
				//alert("tempResult = (parseInt("+inVal+", "+tempArrayFrom[1]+")).toString("+tempArrayTo[1]+");");
				eval("tempResult = (parseInt(\""+inVal+"\", "+tempArrayFrom[1]+")).toString("+tempArrayTo[1]+");");
				return (tempResult+"").toUpperCase();
			}else{
				if (tempInFrom.indexOf(":")>0){
					if (tempInTo.indexOf(":")>0){
						eval("tempResult = " + tempInVal + "*" + tempArrayTo[1] + "/" + tempArrayFrom[1]);
					}else{
						eval("tempResult = 1/" + tempInVal + "*" + tempArrayFrom[1] + "*" + tempInTo);
					}
				}else{
					eval("tempResult = 1/" + tempInVal + "*" + tempInFrom + "*" + tempArrayTo[1]);
				}
			}
		}
	}else{
		eval("tempResult = " + tempInVal + "*" + tempInTo + "/" + tempInFrom);
	}
	return tempResult;
}
function ucCalculateResult(inVal, inFrom, inTo){
	if (inTo.indexOf(":")>0){
		var tempUntArray = inTo.split(":");
		if (tempUntArray[0]!='3'){
			return gnumberFormat(ucCalculateResultNumOnly(inVal, inFrom, inTo));
		}else{
			return ucCalculateResultNumOnly(inVal, inFrom, inTo);
		}
	}else{
		return gnumberFormat(ucCalculateResultNumOnly(inVal, inFrom, inTo));
	}
}
function ucUpdateResult(){
	var ucfromvalue = cleanNumberInput(document.getElementById("ucfrom").value);
	var ucfromunit = document.getElementById("ucfromunit");
	var uctounit = document.getElementById("uctounit");
	var ucfromunitvalue = ucfromunit.value;
	var uctounitvalue = uctounit.value;
	var uctounitID = 0;
	for (var i = 0; i < uctounit.options.length; i++) {
		if(uctounit.options[i].selected) uctounitID = i;
	}
	if (noValidation==1){
		ucfromvalue = trimAll((ucfromvalue+"").toUpperCase());

		var ucfromunitvalueArray = ucParseSelectValue(ucfromunitvalue);
		var uctounitvalueArray = ucParseSelectValue(uctounitvalue);
		tempBaseNum = parseInt((ucfromunitvalueArray[1]).substr(2).replace("]", ""));
		var tempTestStr = " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		tempRegStr = "";
		if (tempBaseNum>10){
			tempRegStr = "^[0-9A-"+tempTestStr.substr(tempBaseNum,1)+"]+$";
		}else{
			tempRegStr = "^[0-"+tempTestStr.substr(tempBaseNum,1)+"]+$";
		}
		var reg = new RegExp(tempRegStr);
		if (reg.test(ucfromvalue)){
			var tempResult = 1;
			tempResult = ucCalculateResult(ucfromvalue, ucfromunitvalueArray[1], uctounitvalueArray[1]);

			document.getElementById("ucto").value = tempResult;
			document.getElementById("ucresult").innerHTML = "<font color='red'><b>Result:</b></font> " + ucfromvalue + " " + ucfromunitvalueArray[0] + " = " + tempResult + " " + uctounitvalueArray[0] + "";
			document.getElementById("ucresult").style.color = "black";
			//document.getElementById("ucresult").style.border = "2px solid #406b04";

			for (var i = 0; i < uctounit.options.length; i++) {
				var tempArray = ucParseSelectValue(uctounit.options[i].value);
				var tempVal = "";
				var tempResult = 0;
				tempResult = ucCalculateResult(ucfromvalue, ucfromunitvalueArray[1], tempArray[1]);
				tempVal = tempArray[0] + " (" + tempResult + ")";
				uctounit.options[i] = new Option(tempVal,uctounit.options[i].value);
				if (uctounitID==i){
					uctounit.options[i].selected = true;
				}
			}
		}else{
			if (ucfromvalue.length>0){
				document.getElementById("ucresult").innerHTML = "Please provide a valid number!";
				document.getElementById("ucresult").style.color = "red";
				//document.getElementById("ucresult").style.border = "2px solid #406b04";
			}else{
				document.getElementById("ucresult").innerHTML = "";
				//document.getElementById("ucresult").style.border = "2px solid #ffffff";
			}
			document.getElementById("ucto").value = "";
			for (var i = 0; i < uctounit.options.length; i++) {
				var tempArray = ucParseSelectValue(uctounit.options[i].value);
				var tempVal = "";
				if (tempArray.length>2){
					tempVal = tempArray[0] + " [" + tempArray[1] + "]";
				}else{
					tempVal = tempArray[0];
				}
				uctounit.options[i] = new Option(tempVal,uctounit.options[i].value);
				if (uctounitID==i){
					uctounit.options[i].selected = true;
				}
			}
		}
	}else{
		if (!isNumber(ucfromvalue)){
			if (ucfromvalue.length>0){
				document.getElementById("ucresult").innerHTML = "Please provide a valid number!";
				document.getElementById("ucresult").style.color = "red";
				//document.getElementById("ucresult").style.border = "2px solid #406b04";
			}else{
				document.getElementById("ucresult").innerHTML = "";
				//document.getElementById("ucresult").style.border = "2px solid #ffffff";
			}
			document.getElementById("ucto").value = "";
			for (var i = 0; i < uctounit.options.length; i++) {
				var tempArray = ucParseSelectValue(uctounit.options[i].value);
				var tempVal = "";
				if (tempArray.length>2){
					tempVal = tempArray[0] + " [" + tempArray[1] + "]";
				}else{
					tempVal = tempArray[0];
				}
				uctounit.options[i] = new Option(tempVal,uctounit.options[i].value);
				if (uctounitID==i){
					uctounit.options[i].selected = true;
				}
			}
		}else{
			var ucfromunitvalueArray = ucParseSelectValue(ucfromunitvalue);
			var uctounitvalueArray = ucParseSelectValue(uctounitvalue);
			var tempResult = 1;
			if (ucfromunitvalueArray.length>2){
				if (uctounitvalueArray.length>2){
					tempResult = ucCalculateResult(ucfromvalue, ucfromunitvalueArray[2], uctounitvalueArray[2]);
				}else{
					tempResult = ucCalculateResult(ucfromvalue, ucfromunitvalueArray[2], uctounitvalueArray[1]);
				}
			}else{
				if (uctounitvalueArray.length>2){
					tempResult = ucCalculateResult(ucfromvalue, ucfromunitvalueArray[1], uctounitvalueArray[2]);
				}else{
					tempResult = ucCalculateResult(ucfromvalue, ucfromunitvalueArray[1], uctounitvalueArray[1]);
				}
			}
			document.getElementById("ucto").value = tempResult;
			document.getElementById("ucresult").innerHTML = "<font color='red'><b>Result:</b></font> " + ucfromvalue + " " + ucfromunitvalueArray[0] + " = " + tempResult + " " + uctounitvalueArray[0] + "";
			document.getElementById("ucresult").style.color = "black";
			//document.getElementById("ucresult").style.border = "2px solid #406b04";

			for (var i = 0; i < uctounit.options.length; i++) {
				var tempArray = ucParseSelectValue(uctounit.options[i].value);
				var tempVal = "";
				var tempResult = 0;
				if (tempArray.length>2){
					if (ucfromunitvalueArray.length>2){
						tempResult = ucCalculateResult(ucfromvalue, ucfromunitvalueArray[2], tempArray[2]);
					}else{
						tempResult = ucCalculateResult(ucfromvalue, ucfromunitvalueArray[1], tempArray[2]);
					}
					tempVal = tempArray[0] + " [" + tempArray[1] + "] (" + tempResult + ")";
				}else{
					if (ucfromunitvalueArray.length>2){
						tempResult = ucCalculateResult(ucfromvalue, ucfromunitvalueArray[2], tempArray[1]);
					}else{
						tempResult = ucCalculateResult(ucfromvalue, ucfromunitvalueArray[1], tempArray[1]);
					}
					tempVal = tempArray[0] + " (" + tempResult + ")";
				}
				uctounit.options[i] = new Option(tempVal,uctounit.options[i].value);
				if (uctounitID==i){
					uctounit.options[i].selected = true;
				}
			}
		}
	}
}

function convertFIToFra(inRSNum, inRSUnit){
	var totalInch = inRSNum;
	if (inRSUnit=='foot') totalInch = inRSNum * 12;
	var totalFeet = Math.floor(totalInch/12);
	var subInch = Math.floor(totalInch - (totalFeet*12));
	var inchDigit = totalInch - Math.floor(totalInch);
	totalInch = Math.floor(totalInch);
	var inchFracTop = Math.round(inchDigit*64);
	var inchFracBottom = 64;
	if (inchFracTop==64){
		totalInch = totalInch + 1;
		subInch = subInch + 1;
		if (subInch==12){
			subInch = 0;
			totalFeet = totalFeet + 1;
		}
		inchFracTop = 0;
	}else{
		if ((inchFracTop%32)==0){
			inchFracTop = inchFracTop/32;
			inchFracBottom = 2;
		}else if ((inchFracTop%16)==0){
			inchFracTop = inchFracTop/16;
			inchFracBottom = 4;
		}else if ((inchFracTop%8)==0){
			inchFracTop = inchFracTop/8;
			inchFracBottom = 8;
		}else if ((inchFracTop%4)==0){
			inchFracTop = inchFracTop/4;
			inchFracBottom = 16;
		}else if ((inchFracTop%2)==0){
			inchFracTop = inchFracTop/2;
			inchFracBottom = 32;
		}
	}
	if ((totalInch+inchFracTop)<1) return "";
	var finalResult = "<br>OR<br>";
	if (totalFeet>0){
		if (totalFeet>1){
			finalResult += totalFeet + " feet ";
		}else{
			finalResult += totalFeet + " foot ";
		}
		if (subInch>0){
			if (inchFracTop>0){
				finalResult += subInch + " <sup>" + inchFracTop + "</sup>/<sub>" + inchFracBottom + "</sub> inches ";
			}else{
				if (subInch>1){
					finalResult += subInch + " inches ";
				}else{
					finalResult += subInch + " inch ";
				}
			}
		}else{
			if (inchFracTop>0){
				finalResult += " <sup>" + inchFracTop + "</sup>/<sub>" + inchFracBottom + "</sub> inch ";
			}
		}
		finalResult += "<br>OR<br>";
	}
	if (totalInch>0){
		if (inchFracTop>0){
			finalResult += totalInch + " <sup>" + inchFracTop + "</sup>/<sub>" + inchFracBottom + "</sub> inches ";
		}else{
			if (totalInch>1){
				finalResult += totalInch + " inches ";
			}else{
				finalResult += totalInch + " inch ";
			}
		}
	}else{
		if (inchFracTop>0){
			finalResult += " <sup>" + inchFracTop + "</sup>/<sub>" + inchFracBottom + "</sub> inch ";
		}
	}
	return finalResult;
}

function ucDCUpdateResult(usdcType){
	processingType = usdcType;
	var ucfromvalue = cleanNumberInput(document.getElementById("ucfrom").value);
	var ucfromunit = document.getElementById("ucfromunit");
	var uctounit = document.getElementById("uctounit");
	var uctoid = document.getElementById("ucto");
	if (usdcType==1){
		ucfromvalue = cleanNumberInput(document.getElementById("ucto").value);
		ucfromunit = document.getElementById("uctounit");
		uctounit = document.getElementById("ucfromunit");
		uctoid = document.getElementById("ucfrom");
	}
	var ucfromunitvalue = ucfromunit.value;
	var uctounitvalue = uctounit.value;

	if (noValidation==1){
		ucfromvalue = trimAll((ucfromvalue+"").toUpperCase());

		var ucfromunitvalueArray = ucParseSelectValue(ucfromunitvalue);
		var uctounitvalueArray = ucParseSelectValue(uctounitvalue);
		tempBaseNum = parseInt((ucfromunitvalueArray[1]).substr(2).replace("]", ""));
		var tempTestStr = " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		tempRegStr = "";
		if (tempBaseNum>10){
			tempRegStr = "^[0-9A-"+tempTestStr.substr(tempBaseNum,1)+"]+$";
		}else{
			tempRegStr = "^[0-"+tempTestStr.substr(tempBaseNum,1)+"]+$";
		}
		var reg = new RegExp(tempRegStr);
		if (reg.test(ucfromvalue)){
			var tempResult = 1;
			tempResult = ucCalculateResultNumOnly(ucfromvalue, ucfromunitvalueArray[1], uctounitvalueArray[1]);
			if (uctounitvalueArray[1].indexOf(":")>0){
				var tempUntArray = uctounitvalueArray[1].split(":");
				if (tempUntArray[0]!='3'){
					tempResult = gnumberFormat(tempResult);
				}
			}else{
				tempResult = gnumberFormat(tempResult);
			}
			uctoid.value = tempResult;
			document.getElementById("ucresult").innerHTML = "<font color='red'><b>Result:</b></font> " + ucfromvalue + " " + ucfromunitvalueArray[0] + " = " + tempResult + " " + uctounitvalueArray[0] + "";
			document.getElementById("ucresult").style.color = "black";
			//document.getElementById("ucresult").style.border = "2px solid #406b04";
		}else{
			if (ucfromvalue.length>0){
				document.getElementById("ucresult").innerHTML = "Please provide a valid number!";
				document.getElementById("ucresult").style.color = "red";
				//document.getElementById("ucresult").style.border = "2px solid #406b04";
			}else{
				document.getElementById("ucresult").innerHTML = "";
				//document.getElementById("ucresult").style.border = "2px solid #ffffff";
			}
			uctoid.value = "";
		}
	}else{
		if (!isNumber(ucfromvalue)){
			if (ucfromvalue.length>0){
				document.getElementById("ucresult").innerHTML = "Please provide a valid number!";
				document.getElementById("ucresult").style.color = "red";
				//document.getElementById("ucresult").style.border = "2px solid #406b04";
			}else{
				document.getElementById("ucresult").innerHTML = "";
				//document.getElementById("ucresult").style.border = "2px solid #ffffff";
			}
			uctoid.value = "";
		}else{
			var ucfromunitvalueArray = ucParseSelectValue(ucfromunitvalue);
			var uctounitvalueArray = ucParseSelectValue(uctounitvalue);
			var tempResult = 1;
			var tempResultMore = "";
			if (ucfromunitvalueArray.length>2){
				if (uctounitvalueArray.length>2){
					tempResult = ucCalculateResultNumOnly(ucfromvalue, ucfromunitvalueArray[2], uctounitvalueArray[2]);
					if ((uctounitvalueArray[0]=='foot')||(uctounitvalueArray[0]=='inch')){
						tempResultMore = convertFIToFra(tempResult, uctounitvalueArray[0]);
					}
				}else{
					tempResult = ucCalculateResultNumOnly(ucfromvalue, ucfromunitvalueArray[2], uctounitvalueArray[1]);
				}
			}else{
				if (uctounitvalueArray.length>2){
					tempResult = ucCalculateResultNumOnly(ucfromvalue, ucfromunitvalueArray[1], uctounitvalueArray[2]);
					if ((uctounitvalueArray[0]=='foot')||(uctounitvalueArray[0]=='inch')){
						tempResultMore = convertFIToFra(tempResult, uctounitvalueArray[0]);
					}
				}else{
					tempResult = ucCalculateResultNumOnly(ucfromvalue, ucfromunitvalueArray[1], uctounitvalueArray[1]);
				}
			}
			tempResult = gnumberFormat(tempResult);
			uctoid.value = tempResult;
			document.getElementById("ucresult").innerHTML = "<font color='red'><b>Result:</b></font> " + ucfromvalue + " " + ucfromunitvalueArray[0] + " = " + tempResult + " " + uctounitvalueArray[0] + tempResultMore;
			document.getElementById("ucresult").style.color = "black";
			//document.getElementById("ucresult").style.border = "2px solid #406b04";
		}
	}
}

// The following is for homepage
function gObj(obj) {var theObj;if(document.all){if(typeof obj=="string"){return document.all(obj);}else{return obj.style;}}if(document.getElementById){if(typeof obj=="string"){return document.getElementById(obj);}else{return obj.style;}}return null;}
function popMenu(inval){
	htmlVal = "";
	for (i = 0; i < allA.length; i++) {
		if (inval == allA[i][0][0]){
			htmlVal = htmlVal + "<li id='menuon'><a href='javascript:popMenu(\"" + allA[i][0][0] + "\");showSel(" + allA[i][0][1] + ");'>" + allA[i][0][0] + "</a></li> ";
		}else{
			htmlVal = htmlVal + "<li><a href='javascript:popMenu(\"" + allA[i][0][0] + "\");showSel(" + allA[i][0][1] + ");'>" + allA[i][0][0] + "</a></li> ";
		}
	}
	htmlVal = "<ul>" + htmlVal + "</ul>";
	gObj("menu").innerHTML = htmlVal;
}

function popMenuSmall(inval){
	tA[0] = new Array("Temp","tA");
	htmlVal = "";
	for (i = 0; i < allA.length; i++) {

		if (inval == allA[i][0][0]){
			htmlVal = htmlVal + "<li id='menuon'><a href='javascript:popMenuSmall(\"" + allA[i][0][0] + "\");showSel(" + allA[i][0][1] + ");'>" + allA[i][0][0] + "</a></li> ";
		}else{
			htmlVal = htmlVal + "<li><a href='javascript:popMenuSmall(\"" + allA[i][0][0] + "\");showSel(" + allA[i][0][1] + ");'>" + allA[i][0][0] + "</a></li> ";
		}
	}
	htmlVal = "<ul>" + htmlVal + "</ul>";
	gObj("menu").innerHTML = htmlVal;
}


var lA = new Array();
lA[0] = new Array("Length","lA");
lA[1] = new Array("Meter","iv","iv");
lA[2] = new Array("Kilometer","iv*1000","iv/1000");
lA[3] = new Array("Centimeter","iv*0.01","iv/0.01");
lA[4] = new Array("Millimeter","iv*0.001","iv/0.001");
lA[5] = new Array("Micrometer","iv*0.000001","iv/0.000001");
lA[6] = new Array("Nanometer","iv*0.000000001","iv/0.000000001");
lA[7] = new Array("Mile","iv*1609.35","iv/1609.35");
lA[8] = new Array("Yard","iv*0.9144","iv/0.9144");
lA[9] = new Array("Foot","iv*0.3048","iv/0.3048");
lA[10] = new Array("Inch","iv*0.0254","iv/0.0254");
lA[11] = new Array("Light Year","iv*9.46066e+15","iv/9.46066e+15");

var tA = new Array();
tA[0] = new Array("Temperature","tA");
tA[1] = new Array("Celsius","iv","iv");
tA[2] = new Array("Kelvin", "iv - 273.15", "iv + 273.15");
tA[3] = new Array("Fahrenheit", "5/9*(iv-32)", "9/5*iv + 32");

var aA = new Array();
aA[0] = new Array("Area","aA");
aA[1] = new Array("Square Meter","iv","iv");
aA[2] = new Array("Square Kilometer", "iv*1000000", "iv/1000000");
aA[3] = new Array("Square Centimeter", "iv*0.0001", "iv/0.0001");
aA[4] = new Array("Square Millimeter", "iv*0.000001", "iv/0.000001");
aA[5] = new Array("Square Micrometer", "iv*0.000000000001", "iv/0.000000000001");
aA[6] = new Array("Hectare", "iv*10000", "iv/10000");
aA[7] = new Array("Square Mile", "iv*2589990", "iv/2589990");
aA[8] = new Array("Square Yard", "iv*0.83612736", "iv/0.83612736");
aA[9] = new Array("Square Foot", "iv*0.09290304", "iv/0.09290304");
aA[10] = new Array("Square Inch", "iv*0.000645160", "iv/0.000645160");
aA[11] = new Array("Acre", "iv*4046.8564224", "iv/4046.8564224");

var vA = new Array();
vA[0] = new Array("Volume","vA");
vA[1] = new Array("Cubic Meter","iv","iv");
vA[2] = new Array("Cubic Kilometer", "iv*1000000000", "iv/1000000000");
vA[3] = new Array("Cubic Centimeter", "iv*0.000001", "iv/0.000001");
vA[4] = new Array("Cubic Millimeter", "iv*1.0e-9", "iv/1.0e-9");
vA[5] = new Array("Liter", "iv*0.001", "iv/0.001");
vA[6] = new Array("Milliliter", "iv*0.000001", "iv/0.000001");
vA[7] = new Array("US Gallon", "iv*0.00378541", "iv/0.00378541");
vA[8] = new Array("US Quart", "iv*0.0009463525", "iv/0.0009463525");
vA[9] = new Array("US Pint", "iv*0.00047317625", "iv/0.00047317625");
vA[10] = new Array("US Cup", "iv*0.000236588125", "iv/0.000236588125");
vA[11] = new Array("US Fluid Ounce", "iv*0.000029573515625", "iv/0.000029573515625");
vA[12] = new Array("US Table Spoon", "iv*0.0000147867578125", "iv/0.0000147867578125");
vA[13] = new Array("US Tea Spoon", "iv*4.9289192708333333333333333333333e-6", "iv/4.9289192708333333333333333333333e-6");
vA[14] = new Array("Imperial Gallon", "iv*0.00454609", "iv/0.00454609");
vA[15] = new Array("Imperial Quart", "iv*0.0011365225", "iv/0.0011365225");
vA[16] = new Array("Imperial Pint", "iv*0.00056826125", "iv/0.00056826125");
vA[17] = new Array("Imperial Fluid Ounce", "iv*0.0000284130625", "iv/0.0000284130625");
vA[18] = new Array("Imperial Table Spoon", "iv*0.0000177581640625", "iv/0.0000177581640625");
vA[19] = new Array("Imperial Tea Spoon", "iv*5.9193880208333333333333333333333e-6", "iv/5.9193880208333333333333333333333e-6");
vA[20] = new Array("Cubic Mile", "iv*4.16818e+9", "iv/4.16818e+9");
vA[21] = new Array("Cubic Yard", "iv*0.764554857984", "iv/0.764554857984");
vA[22] = new Array("Cubic Foot", "iv*0.028316846592", "iv/0.028316846592");
vA[23] = new Array("Cubic Inch", "iv*0.000016387064", "iv/0.000016387064");

var wA = new Array();
wA[0] = new Array("Weight","wA");
wA[1] = new Array("Kilogram","iv","iv");
wA[2] = new Array("Gram", "iv*0.001", "iv/0.001");
wA[3] = new Array("Milligram", "iv*0.000001", "iv/0.000001");
wA[4] = new Array("Metric Ton", "iv*1000", "iv/1000");
wA[5] = new Array("Long Ton", "iv*1016.04608", "iv/1016.04608");
wA[6] = new Array("Short Ton", "iv*907.184", "iv/907.184");
wA[7] = new Array("Pound", "iv*0.453592", "iv/0.453592");
wA[8] = new Array("Ounce", "iv*0.0283495", "iv/0.0283495");
wA[9] = new Array("Carrat", "iv*0.0002", "iv/0.0002");
wA[10] = new Array("Atomic Mass Unit", "iv*1.6605401999104288e-27", "iv/1.6605401999104288e-27");

var mA = new Array();
mA[0] = new Array("Time","mA");
mA[1] = new Array("Second","iv","iv");
mA[2] = new Array("Millisecond", "iv*0.001", "iv/0.001");
mA[3] = new Array("Microsecond", "iv*0.000001", "iv/0.000001");
mA[4] = new Array("Nanosecond", "iv*0.000000001", "iv/0.000000001");
mA[5] = new Array("Picosecond", "iv*0.000000000001", "iv/0.000000000001");
mA[6] = new Array("Minute", "iv*60", "iv/60");
mA[7] = new Array("Hour", "iv*3600", "iv/3600");
mA[8] = new Array("Day", "iv*86400", "iv/86400");
mA[9] = new Array("Week", "iv*604800", "iv/604800");
mA[10] = new Array("Month", "iv*2629800", "iv/2629800");
mA[11] = new Array("Year", "iv*31557600", "iv/31557600");

allA = new Array(lA,tA,aA,vA,wA,mA);

function isNum(sText){
	var ValidChars = "0123456789.-";
	var Char;
	if (sText.length < 1) return false;
	for (i = 0; i < sText.length; i++) {
		Char = sText.charAt(i);
		if (ValidChars.indexOf(Char) == -1) return false;
	}
	return true;
}

function showSel(aName){
	document.calForm.calFrom.length = 0;
	document.calForm.calTo.length = 0;
	for(i=1; i<aName.length; i++){
		document.calForm.calFrom.options[(i-1)] = new Option(aName[i][0],i);
		document.calForm.calTo.options[(i-1)] = new Option(aName[i][0],i);
	}
	document.calForm.calFrom.options[0].selected = true;
	document.calForm.calTo.options[1].selected = true;
	document.calForm.toVal.value = "";
	currentAName = aName;
	calcul();
}

function calVal(id, iv){
	eval("rv = (" + currentAName[id][2] + ");");
	return gnumberFormat(rv);
}
function calcul(){
	selectFrom = document.calForm.calFrom;
	selectTo = document.calForm.calTo;
	fromVal = cleanNumberInput(document.calForm.fromVal.value);
	selectFromID = 0;
	selectToID = 0;
	selectFromVal = "";
	selectToVal = "";
	stdval = 0;
	for (var i = 0; i < selectFrom.options.length; i++) {
		if(selectFrom.options[i].selected) {
			selectFromID = selectFrom.options[i].value;
			selectFromVal = selectFrom.options[i].text;
		}
	}
	for (var i = 0; i < selectTo.options.length; i++) {
		if(selectTo.options[i].selected) {
			selectToID = selectTo.options[i].value;
			selectToVal = selectTo.options[i].text;
		}
	}
	if ((selectFromID>0) && (isNumber(fromVal))){
		iv = parseFloat(fromVal);
		stdval = 0;
		eval("stdval = " + currentAName[selectFromID][1]+ ";");

		document.calForm.calTo.length = 0;
		for(i=1; i<currentAName.length; i++){
			tempVal = calVal(i, stdval);
			selectTo.options[(i-1)] = new Option(currentAName[i][0] + " (" + tempVal + ")",i);
			if (selectToID == i) {
				selectTo.options[(i-1)].selected = true;
				document.calForm.toVal.value = tempVal;
				//gObj("calResults").style.border = "2px solid #406b04";
				gObj("calResults").innerHTML = "<font color='red'><b>Result:</b></font> " + fromVal + " " + selectFromVal + " = " + tempVal + " " + currentAName[i][0];
			}
		}
	}
	if ((!(isNumber(fromVal)))||(selectFromID<1)){
		for(i=1; i<currentAName.length; i++){
			tempVal = calVal(i, stdval);
			selectTo.options[(i-1)] = new Option(currentAName[i][0],i);
			if (selectToID == i) {
				selectTo.options[(i-1)].selected = true;
				document.calForm.toVal.value = "";
				//gObj("calResults").style.border = "2px solid #fff";
				gObj("calResults").innerHTML = "";
			}
		}
		if ((fromVal+"").length>0){
			//gObj("calResults").style.border = "2px solid #406b04";
			gObj("calResults").innerHTML = "<font color='red'>Please provide a valid number!</font>";
		}
	}
}

var rightNavMain = new Array("Common Converters","Engineering Converters","Heat Converters","Fluids Converters","Light Converters","Electricity Converters","Magnetism Converters","Radiology Converters");
var rightNavSub = new Array();
rightNavSub[0] = new Array("<a href='/length-converter.html'>Length</a>","<a href='/weight-and-mass-converter.html'>Weight and Mass</a>","<a href='/volume-converter.html'>Volume</a>","<a href='/temperature-converter.html'>Temperature</a>","<a href='/area-converter.html'>Area</a>","<a href='/pressure-converter.html'>Pressure</a>","<a href='/energy-converter.html'>Energy</a>","<a href='/power-converter.html'>Power</a>","<a href='/force-converter.html'>Force</a>","<a href='/time-converter.html'>Time</a>","<a href='/speed-converter.html'>Speed</a>","<a href='/angle-converter.html'>Angle</a>","<a href='/fuel-consumption-converter.html'>Fuel Consumption</a>","<a href='/numbers-converter.html'>Numbers</a>","<a href='/data-storage-converter.html'>Data Storage</a>","<a href='/volume-dry-converter.html'>Volume - Dry</a>","<a href='/currency-converter.html'>Currency</a>","<a href='/case-converter.html'>Case</a>");
rightNavSub[1] = new Array("<a href='/volume-converter.html'>Volume</a>","<a href='/temperature-converter.html'>Temperature</a>","<a href='/area-converter.html'>Area</a>","<a href='/pressure-converter.html'>Pressure</a>","<a href='/energy-converter.html'>Energy</a>","<a href='/power-converter.html'>Power</a>","<a href='/force-converter.html'>Force</a>","<a href='/time-converter.html'>Time</a>","<a href='/speed-converter.html'>Speed</a>","<a href='/angle-converter.html'>Angle</a>","<a href='/fuel-consumption-converter.html'>Fuel Consumption</a>","<a href='/numbers-converter.html'>Numbers</a>","<a href='/data-storage-converter.html'>Data Storage</a>","<a href='/volume-dry-converter.html'>Volume - Dry</a>","<a href='/currency-converter.html'>Currency</a>","<a href='/velocity-angular-converter.html'>Velocity - Angular</a>","<a href='/acceleration-converter.html'>Acceleration</a>","<a href='/acceleration-angular-converter.html'>Acceleration - Angular</a>","<a href='/density-converter.html'>Density</a>","<a href='/specific-volume-converter.html'>Specific Volume</a>","<a href='/moment-of-inertia-converter.html'>Moment of Inertia</a>","<a href='/moment-of-force-converter.html'>Moment of Force</a>","<a href='/torque-converter.html'>Torque</a>");
rightNavSub[2] = new Array("<a href='/fuel-efficiency-mass-converter.html'>Fuel Efficiency - Mass</a>","<a href='/fuel-efficiency-volume-converter.html'>Fuel Efficiency - Volume</a>","<a href='/temperature-interval-converter.html'>Temperature Interval</a>","<a href='/thermal-expansion-converter.html'>Thermal Expansion</a>","<a href='/thermal-resistance-converter.html'>Thermal Resistance</a>","<a href='/thermal-conductivity-converter.html'>Thermal Conductivity</a>","<a href='/specific-heat-capacity-converter.html'>Specific Heat Capacity</a>","<a href='/heat-density-converter.html'>Heat Density</a>","<a href='/heat-flux-density-converter.html'>Heat Flux Density</a>","<a href='/heat-transfer-coefficient-converter.html'>Heat Transfer Coefficient</a>");
rightNavSub[3] = new Array("<a href='/flow-converter.html'>Flow</a>","<a href='/flow-mass-converter.html'>Flow - Mass</a>","<a href='/flow-molar-converter.html'>Flow - Molar</a>","<a href='/mass-flux-density-converter.html'>Mass Flux Density</a>","<a href='/concentration-molar-converter.html'>Concentration - Molar</a>","<a href='/concentration-solution-converter.html'>Concentration - Solution</a>","<a href='/viscosity-dynamic-converter.html'>Viscosity - Dynamic</a>","<a href='/viscosity-kinematic-converter.html'>Viscosity - Kinematic</a>","<a href='/surface-tension-converter.html'>Surface Tension</a>","<a href='/permeability-converter.html'>Permeability</a>");
rightNavSub[4] = new Array("<a href='/luminance-converter.html'>Luminance</a>","<a href='/luminous-intensity-converter.html'>Luminous Intensity</a>","<a href='/illumination-converter.html'>Illumination</a>","<a href='/digital-image-resolution-converter.html'>Digital Image Resolution</a>","<a href='/frequency-wavelength-converter.html'>Frequency Wavelength</a>");
rightNavSub[5] = new Array("<a href='/charge-converter.html'>Charge</a>","<a href='/linear-charge-density-converter.html'>Linear Charge Density</a>","<a href='/surface-charge-density-converter.html'>Surface Charge Density</a>","<a href='/volume-charge-density-converter.html'>Volume Charge Density</a>","<a href='/current-converter.html'>Current</a>","<a href='/linear-current-density-converter.html'>Linear Current Density</a>","<a href='/surface-current-density-converter.html'>Surface Current Density</a>","<a href='/electric-field-strength-converter.html'>Electric Field Strength</a>","<a href='/electric-potential-converter.html'>Electric Potential</a>","<a href='/electric-resistance-converter.html'>Electric Resistance</a>","<a href='/electric-resistivity-converter.html'>Electric Resistivity</a>","<a href='/electric-conductance-converter.html'>Electric Conductance</a>","<a href='/electric-conductivity-converter.html'>Electric Conductivity</a>","<a href='/electrostatic-capacitance-converter.html'>Electrostatic Capacitance</a>","<a href='/inductance-converter.html'>Inductance</a>");
rightNavSub[6] = new Array("<a href='/magnetomotive-force-converter.html'>Magnetomotive Force</a>","<a href='/magnetic-field-strength-converter.html'>Magnetic Field Strength</a>","<a href='/magnetic-flux-converter.html'>Magnetic Flux</a>","<a href='/magnetic-flux-density-converter.html'>Magnetic Flux Density</a>");
rightNavSub[7] = new Array("<a href='/radiation-converter.html'>Radiation</a>","<a href='/radiation-activity-converter.html'>Radiation-Activity</a>","<a href='/radiation-exposure-converter.html'>Radiation-Exposure</a>","<a href='/radiation-absorbed-dose-converter.html'>Radiation-Absorbed Dose</a>");

function showNav(inNavItems){
	var snavHTML = '';
	var snavMainStyle = ' style="background-color: #eee;color:#006633;background-image: url(\'/images/down-arrow.svg\');background-repeat: no-repeat;background-position: right 6px center;"';
	for (i = 0; i < rightNavMain.length; i++) {
		snavHTML += '<a href="#" onClick="return showNav(\''+rightNavMain[i]+'\')"';
		if (inNavItems==rightNavMain[i]) snavHTML += snavMainStyle;
		snavHTML += '>'+rightNavMain[i]+'</a>';

		if (inNavItems==rightNavMain[i]){
			snavHTML += '<div id="ocsubnav">';
			for (j = 0; j < rightNavSub[i].length; j++){
				snavHTML += rightNavSub[i][j];
			}
			snavHTML += '</div>';
		}
	}

	snavHTML = '<div id="octitle">All Converters</div><div id="occontent">'+snavHTML+'<a href="/common-unit-systems.php">Common Unit Systems</a></div>';;
	gObj("othercalc").innerHTML = snavHTML;
	return false;
}


