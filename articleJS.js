function createCookie(name,value,days) {
	var expires="";
	if(days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires="; expires="+date.toGMTString();
	}
	document.cookie=name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ=name+"=";
	var ca=document.cookie.split(';');
	for (var i=0;i<ca.length;i++) {
		var c=ca[i];
		while(c.charAt(0)==' ')
		c = c.substring(1,c.length);
		if (c.indexOf(nameEQ)==0)
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function loadDefaults() {
	var _fontSize=16;
	var _fontFamily="G";
	var _lineHeight=1.5;
	var _width=500;
}
function saveFont() {
	applyFont();
	createCookie("fontMetrics",[_fontSize,_fontFamily,_lineHeight,_width].join("_"),365);
}
function loadFont() {
	var cookieData=readCookie("fontMetrics");
	if (cookieData && (cookieData=cookieData.split("_")) && cookieData.length==4) {
		_fontSize=parseInt(cookieData[0]);
		_fontFamily=cookieData[1];
		_lineHeight=parseFloat(cookieData[2]);
		_width=parseInt(cookieData[3]);
	} else {
		loadDefaults();applyFont();
	}
}
function applyFont() {
	if (_fontSize<10)
		_fontSize=10;
	else if (_fontSize>48)
		_fontSize=48;
	if (_width<300)
		_width=300;
	else if (_width>document.body.clientWidth-80)
		_width=document.body.clientWidth-80;
	if (_lineHeight>3.0)
		_lineHeight=3.0;
	else if (_lineHeight<1.1)
		_lineHeight=1.1;
	var story=document.getElementById('story');
	story.style.fontSize=_fontSize+"px";
	switch(_fontFamily) {
		case"T": 
			story.style.fontFamily="Times, 'Times New Roman', serif";
			break;
		case"H": 
			story.style.fontFamily="Helvetica, Arial, sans-serif";
			break;
		case"V":
			story.style.fontFamily="Verdana, sans-serif";
			break;
		default:
			_fontFamily="G";
			story.style.fontFamily="Georgia, serif";
			break;
	}
	// $('#textArticle').css({
	// 	width:_width+'px',
	// 	marginLeft:'-'+(_width/2+(_width/12))+'px',
	// 	left:'50%'});
	// $('#tempStar').css({
	// 	marginLeft:'-'+(_width/2+(_width/12)-5)+'px',
	// 	left:'50%'});
	story.style.lineHeight=_lineHeight;
}
loadFont();