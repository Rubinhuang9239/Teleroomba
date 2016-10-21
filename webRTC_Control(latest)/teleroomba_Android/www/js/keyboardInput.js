//------Keyboard_Control---------//

keyBoard = {};

keyBoard.keydownList = {
						"37":false,
						"38":false,
						"39":false,
						"40":false,
					   };

window.addEventListener("load",function(){keyBoard.init()});

keyBoard.init = function(){
	window.addEventListener("keydown",keyBoard.Input);
	window.addEventListener("keyup",keyBoard.InputFinish);
}

keyBoard.Input = function(event) {
    var key = event.which;
    keyBoard.keydownList[key] = true;
    keyBoard.drive();
}

keyBoard.InputFinish = function(event) {
    var key = event.which;
    keyBoard.keydownList[key] = false;

    keyBoard.checkEmpty();
}

keyBoard.checkEmpty = function(){

	var emptyCount = 0;

	for(key in keyBoard.keydownList){
		emptyCount += keyBoard.keydownList[key];
	}

	//if empty, keyBoard.drive(0);
	if( emptyCount == 0 ){
		keyBoard.drive(0);
	}

}

keyBoard.drive = function(empty){
	var msg = "o";

	var cmd = { lV : 0, rV : 0 };

	if(empty == 0){
		//stop//
		msg = "o";
		cmd = { lV : 0, rV : 0 };
	}
	else{
		//^/v
		if( keyBoard.keydownList["38"] +  keyBoard.keydownList["40"] == 1 ){

			if(keyBoard.keydownList["38"] == true ){

				//single ^
			msg = "^";
			cmd = { lV : 40, rV : 40 };

				//+L or +R
				if((keyBoard.keydownList["37"]+keyBoard.keydownList["39"]) == 1){
					//+L
					if( keyBoard.keydownList["37"] == true ){
						msg = "<^";
						cmd = { lV : 25, rV : 40 };
					}
					//+R
					else if(keyBoard.keydownList["39"] == true){
						msg = "^>";
						cmd = { lV : 40, rV : 25 };
					}
				}
			}

			if(keyBoard.keydownList["40"] == true ){

				//single v
			msg = "v";
			cmd = { lV : -40, rV : -40 };

				//+L or +R
				if((keyBoard.keydownList["37"]+keyBoard.keydownList["39"]) == 1){
					//+L
					if( keyBoard.keydownList["37"] == true ){
						var msg = "<v";
						cmd = { lV : -25, rV : -40 };
					}
					//+R
					else if(keyBoard.keydownList["39"] == true){
						var msg = "v>";
						cmd = { lV : -40, rV : -25 };
					}
				}
			}
		}

		//</>
		else if( keyBoard.keydownList["37"] +  keyBoard.keydownList["39"] == 1 ){
			//+L
					if( keyBoard.keydownList["37"] == true ){
						var msg = "<";
						cmd = { lV : -32, rV : 32 };
					}
					//+R
					else if(keyBoard.keydownList["39"] == true){
						var msg = ">";
						cmd = { lV : 32, rV : -32 };
					}
		}

	}
	console.log(msg, cmd);

	//Send to Phone
	cmd.type = "DR";
	WebRTCDataMethold.sendData(cmd);

}