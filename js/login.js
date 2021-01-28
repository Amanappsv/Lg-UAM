const URL = "https://api.uam.tv/";
var appVersion="0.0.2";


function initPage() {
  
	initWebOsKeys();
    document.getElementById("email").focus();
    initLoginElements();
  // run webOS.service.request and webOS.keyboard.isShowing every 1sec
    
    
    
	
  
}



function initWebOsKeys(){
	document.addEventListener("keydown", function(inEvent){
		console.log(inEvent.keyCode);
		
		if(inEvent.keyCode == 40){
			keyDown();
		}
		else if(inEvent.keyCode == 37){
			keyLeft();
		}
		else if(inEvent.keyCode == 38){
			keyUp();
		}
		else if(inEvent.keyCode == 39){
			keyRight();
		}
		else if(inEvent.keyCode == 13){
			keyOk();
		}
		
	});

}


function keyLeft()
{
	if(document.activeElement.id === "loginButton")
		{
		rememberFocus();
		removeFocus("loginButton");
	    document.getElementById("remember").focus();
		}
}


function keyRight()
{
	if(document.activeElement.id === "remember")
		{
		removeFocus("remember");
		loginStyleChange();
	    document.getElementById("loginButton").focus();
		}
}


function keyOk()
{
	if(document.activeElement.id === "loginButton")
		{
			loginStyleChange();
			login();
		}
	else if(document.activeElement.id === "remember")
	{
		if(document.getElementById("remember").checked == true)
			{
			document.getElementById("remember").checked = false;
			}
		else
			{
			document.getElementById("remember").checked = true;
			}
	}
	else if(document.activeElement.id === "subscribe")
		{
		  	location.href = "signup/signup.html";
		}
}

function keyUp()
{
	if(document.activeElement.id === "pass")
	{
    document.getElementById("email").focus();
	}
	else if(document.activeElement.id === "remember") {
		removeFocus("remember");
	    document.getElementById("pass").focus();
	}
	else if(document.activeElement.id === "loginButton") {
		removeFocus("loginButton");
	    document.getElementById("pass").focus();
	}
	else if(document.activeElement.id === "subscribe") {
		removeFocus("subscribe");
		changeStyle();
	    document.getElementById("forgotPassword").focus();
	}
	else if(document.activeElement.id === "forgotPassword") {
		rememberFocus();
		removeFocus("forgotPassword");
	    document.getElementById("remember").focus();
	   
	}
}



function keyDown() {
	
	if(document.activeElement.id === "email")
	{
    document.getElementById("pass").focus();
	}
else if(document.activeElement.id === "pass")
	{
	rememberFocus();
    document.getElementById("remember").focus();
	}
else if(document.activeElement.id === "loginButton")
	{
	removeFocus("loginButton");	
	changeStyle();
	document.getElementById("forgotPassword").focus();
	}
else if(document.activeElement.id === "remember")
	{
	removeFocus("remember");
	changeStyle();
	document.getElementById("forgotPassword").focus();
	}
else if(document.activeElement.id === "forgotPassword")
	{
	removeFocus("forgotPassword");
	signUpNOw();
	document.getElementById("subscribe").focus();
	}

	
}




//to change css of active elements...
function changeStyle() {
	document.getElementById("forgotPassword").classList.add('activeClass_Forget_Password');		
}
function signUpNOw(){
	document.getElementById("subscribe").classList.add('activeClass');
}
function loginStyleChange() {
	document.getElementById("loginButton").classList.add('loginBtn_style');
}
function rememberFocus(){
	
	document.getElementById("remmber_label").classList.add('remember_label_style');
}



//remove focus....
function removeFocus(id)
{
	if(id === "subscribe")
		{
		var el = document.getElementsByClassName("activeClass")[0].id;
	    document.getElementById(el).classList.remove("activeClass");
		}
	else if(id === "forgotPassword")
		{
		var el = document.getElementsByClassName("activeClass_Forget_Password")[0].id;
	    document.getElementById(el).classList.remove("activeClass_Forget_Password");
		}
	else if(id === "loginButton")
		{
		var el = document.getElementsByClassName("loginBtn_style")[0].id;
		document.getElementById(el).classList.remove("loginBtn_style");
		}
	else if(id === "remember")
		{
		var el = document.getElementsByClassName("remember_label_style")[0].id;
	    document.getElementById(el).classList.remove("remember_label_style");
		}
}



function showLoader()
{
	document.getElementById("spinner_display_id").classList.add('hide_loader');
	document.getElementById("opacity_effect").classList.add('add_opacity');
	
	
}

function hideLoader()
{
	var el = document.getElementsByClassName("add_opacity")[0].id;
    document.getElementById(el).classList.remove("add_opacity");
    
    var el1 = document.getElementsByClassName("hide_loader")[0].id;
    document.getElementById(el1).classList.remove("hide_loader");
    
    
  
}





//login function....
function login()
{
	
	showLoader();

	
let formData = new FormData();
formData.append('username', document.getElementById("email").value);
formData.append('password', document.getElementById("pass").value);

	
	webOS.service.request("luna://com.webos.service.sm", {
	    method: "deviceid/getIDs",
	    parameters: { 
	        "idType": ["LGUDID"]        
	    },
	    onSuccess: function (inResponse) {
  	    	console.log("form data is loaded");

	   	 formData.append('devicehash', inResponse["idList"][0]["idValue"]);
	 	
	     webOS.deviceInfo( function (device) {
	     	
	    	 doLogin(formData ,device);
	    	 
	     	
	       });
	  	
	        
	        
	    },
	    onFailure: function (inError) {
	    	hideLoader();
	        console.log("Failed to get system ID information");
	        console.log("[" + inError.errorCode + "]: " + inError.errorText);
	        // To-Do something
	        //return;
	    }
	});
	
	
	
}



async function doLogin(formData ,device){
	
	 formData.append('devicefriendlyname',  device.modelName);
   	formData.append('platform', "LG " + device.version);
   	formData.append('version', "0.0.1");
   
   	
  		
   
   	
	 	   	    var response = await fetch('https://api.uam.tv/v3/users/auth/get.php', {
	 	   		   	  method: 'POST',
	 	   			  body:formData,
	 	   			
	 	   			});
	 	   	    var data = await response.json();
	 	 
	 	   	    if(document.getElementById("remember").checked){
	 	   	    	localStorage.setItem("remembered", "true");
	 	   	   	}
	 	   	    else{
	 	   	    	localStorage.setItem("remembered", "false");
	 	   	    }
	 	  
	 	  
	 	   	 
	 	 	  localStorage.setItem("jwt token", data["jwt"]);
	 	 	
	 	 	doHeartBeat(data["jwt"] , '0.0.2');
	 	 	
	 	  
	
}



function doHeartBeat(token , v){
	
let formData = new FormData();
	
	webOS.service.request("luna://com.webos.service.sm", {
	    method: "deviceid/getIDs",
	    parameters: { 
	        "idType": ["LGUDID"]        
	    },
	    onSuccess: function (inResponse) {

	    	
	    	formData.append('devicehash', inResponse["idList"][0]["idValue"]);
	    	
	        webOS.deviceInfo( function (device) {
	        	temp(formData , device , token , v);
	        	
	          });
	    	
	        
	    },
	    onFailure: function (inError) {
	        console.log("Failed to get system ID information");
	        console.log("[" + inError.errorCode + "]: " + inError.errorText);
	        
	 		location.href = "login.html";
	        
	        // To-Do something
	        return;
	    }
	});
	
}



async function temp(formData , device , token , v){
	
	console.log("here");
	formData.append('devicefriendlyname',  device.modelName);
	formData.append('platform', "LG " + device.version);
	formData.append('version', appVersion);

	
	
	try{
		 var response = await fetch(URL + 'v3/users/devices/heartbeat/post.php', {
   		   	  method: 'POST',
   			  body:formData,
   			  headers: {
   				  'Authorization' : "Bearer " + token,
   			  },
   			});
   	    var data = await response.json();
   	    console.log(data);
   	    
		location.href = "home/home.html";

   	    
	}
	catch(Exception){
		location.href = "login.html";
	}
		
 	   	   
 	   	    
 	   	    
 	   		
}








//init keyboard listener for textfields.....
function initLoginElements()
{

    //email field....
    document.getElementById('email').addEventListener('focus', function() {
    	  console.log("input element is focused and ready to get user input.");
    	});

    	document.getElementById('email').addEventListener('blur', function() {
    	  console.log("input element loses focus.");
    	});

    	document.getElementById('email').addEventListener('change', function() {
    	  console.log("input element value is changed.");
    	});



    	document.body.addEventListener('email', function(event) {
    	  switch (event.keyCode) {
    	    case 65376: // Done
    	      document.getElementById('email').blur();
    	      break;
    	    case 65385: // Cancel
    	      document.getElementById('email').blur();
    	      break;
    	  }
    	});
    	
    	
    	//password field...
    	  document.getElementById('pass').addEventListener('focus', function() {
    	  console.log("input element is focused and ready to get user input.");
    	});

    	document.getElementById('pass').addEventListener('blur', function() {
    	  console.log("input element loses focus.");
    	});

    	document.getElementById('pass').addEventListener('change', function() {
    	  console.log("input element value is changed.");
    	});



    	document.body.addEventListener('pass', function(event) {
    	  switch (event.keyCode) {
    	    case 65376: // Done
    	      document.getElementById('pass').blur();
    	      break;
    	    case 65385: // Cancel
    	      document.getElementById('pass').blur();
    	      break;
    	  }
    	});
    
    
}

