
if (window.hyper && window.hyper.log) { console.log = hyper.log; };

document.addEventListener('deviceready', function() {
	app.initialize();
}, false);

var app = {};

//app.DFRBLU_SERVICE_UUID = 'dfb0';
app.DFRBLU_SERVICE_UUID = '0000dfb0-0000-1000-8000-00805f9b34fb';
app.DFRBLU_CHAR_RXTX_UUID = '0000dfb1-0000-1000-8000-00805f9b34fb';
app.DFRBLU_TX_UUID_DESCRIPTOR = '00002902-0000-1000-8000-00805f9b34fb';

app.initialize = function()
{

	console.log('initialize_been_called');
	app.connected = false;
	//Ani & UI Init
	//aniElementsInit();
	//domInit();

	//app.startScan();

	//--------webData----------//
	//domInit();

	//-------InitGeo----------//
	//getGeoLocation();

};

app.startScan = function()
{	
	//console.log("bluno_scan_start");
	app.disconnect();


	app.setLoadingLabel('CONNECTING...');

	console.log('Scanning started...');

	app.devices = {};

	var htmlString =
		'<p style="display:inline">   Scanning...</p>';

	$('#scanResultView').append($(htmlString));

	$('#scanResultView').show();

	function onScanSuccess(device)
	{
		if (device.name != null)
		{
			app.devices[device.address] = device;

			console.log(
				'Found: ' + device.name + ', ' +
				device.address + ', ' + device.rssi);

			if(device.name == 'Bluno'){
			app.connectTo( '' + device.address );

			}
		}
	}

	function onScanFailure(errorCode)
	{

		app.disconnect('Failed to scan for devices.');

		// Write debug information to console.
		console.log('Error ' + errorCode);
	}

	evothings.easyble.reportDeviceOnce(true);
	evothings.easyble.startScan(onScanSuccess, onScanFailure);

	//Check_Scan_Timeout 
	setTimeout(function(){
	if(app.connected == true && app.device.name == 'Bluno'){
	//Move_On
	//loadingPanel('hide');
	}
	else{
	app.disconnect('Scan Timeout');
	}
	},10000);

};

app.setLoadingLabel = function(message)
{
	logMessage("BLE", message);
	// loadingStatus = document.getElementById('loadingStatus');
	// loadingStatus.innerHTML = message;
}

app.connectTo = function(address)
{
	device = app.devices[address];

	$('#loadingView').css('display', 'table');

	app.setLoadingLabel('CONNECTING EMBERACE' +
						'<br /><span style="font-size:0.75em; color: rgb(75,155,255);"> ' + 
						device.name +
						'/ MINI</span>'
						);

	function onConnectSuccess(device)
	{
		function onServiceSuccess(device)
		{
			// Application is now connected
			app.connected = true;
			app.device = device;

			app.setLoadingLabel('Connected to ' + device.name);
			app.setLoadingLabel('[BLE] -- Done BLE Connectinng --');
			Reconnecting = false;
		//setTimeout(function(){
		//if(app.connected == true && app.device.name == 'Bluno'){
		//Move_On
		//loadingPanel('hide');
		//disconModeBtn.style.opacity = "0";
		//drawOnCanvas(1);
		//}
		//},5000);

			device.enableNotification(
				app.DFRBLU_CHAR_RXTX_UUID,
				app.receivedData,
				function(errorcode) {
					console.log('BLE enableNotification error: ' + errorCode);
				});

			autoBLE.driveCom();
		}

		function onServiceFailure(errorCode)
		{
			// Disconnect and show an error message to the user.
			app.disconnect('Device is not from DFRobot');

			// Write debug information to console.
			console.log('Error reading services: ' + errorCode);
		}


		// Connect to the appropriate BLE service
		device.readServices([app.DFRBLU_SERVICE_UUID], onServiceSuccess, onServiceFailure);
	}

	function onConnectFailure(errorCode)
	{
		// Disconnect and show an error message to the user.
		app.disconnect('Failed to connect to device');

		// Write debug information to console
		console.log('Error ' + errorCode);
	}

	// Stop scanning
	evothings.easyble.stopScan();

	// Connect to our device
	console.log('Identifying service for communication');
	device.connect(onConnectSuccess, onConnectFailure);
};

app.sendData = function(data)
{
	if (app.connected)
	{
		function onMessageSendSucces()
		{
			//console.log('Succeded to send message.');
		}

		function onMessageSendFailure(errorCode)
		{
			console.log('Failed to send data with error: ' + errorCode);
			app.disconnect('Failed to send data');
		}

		data = new Uint8Array(data);

		app.device.writeCharacteristic(
			app.DFRBLU_CHAR_RXTX_UUID,
			data,
			onMessageSendSucces,
			onMessageSendFailure);
	}
	else
	{
		// Disconnect and show an error message to the user.
		app.disconnect('Disconnected');

		// Write debug information to console
		console.log('Error - No device connected.');
	}
};

var physicalSpeechReq = false;

app.receivedData = function(data)
{
	if (app.connected)
	{
		var data = new Uint8Array(data);
		//console.log(data.length);
		if (data[0] === 0xAD)
		{
			var value1 = (data[2] << 8) | data[1];
			var value2 = (data[4] << 8) | data[3];
			document.getElementById("leftVShow").innerHTML = "L: " + value1;
			document.getElementById("rightVShow").innerHTML = "R: " + value2;
		}
	}
	else
	{
		// Disconnect and show an error message to the user.
		app.disconnect('Disconnected');

		// Write debug information to console
		console.log('Error - No device connected.');
	}
};

app.autoReconnect = function(){

	Reconnecting = true;
	//disconModeBtn.style.opacity = "1";
	setTimeout(function(){
		app.startScan();
	},3000);

}

app.disconMode = function(){

alert('Embrace will not be able to detect your falling or injury. \n However you can still request a video call and share location.');
//loadingPanel("discon");

}


var Reconnecting = false;
var BLEOffMode = false;

app.disconnect = function(errorMessage)
{

	if(Reconnecting){console.log("Ignore. Because of try reconnecting")}

	else{

	if (errorMessage)
	{
		console.log("Error message from disconnect: "+errorMessage);
		if(!BLEOffMode){
		//loadingPanel('show');
		//autoLoadingAni('fall');
		app.setLoadingLabel('RETRY IN FEW SECONDS');
		app.autoReconnect();
		}
	}

	app.connected = false;
	app.device = null;
	console.log("app.disconnect_set");
	
	// Stop any ongoing scan and close devices.
	evothings.easyble.stopScan();
	evothings.easyble.closeConnectedDevices();
	console.log("disconnect_so_good");
	}

};
