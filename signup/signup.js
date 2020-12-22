var init = function () {
       
	
	document.getElementById("email").focus();
    initTizenKeys();
};


window.onload = init;






function initTizenKeys()
{
	document.addEventListener("keydown", function(inEvent){
		console.log(inEvent.keyCode);
		
		if(inEvent.keyCode == 40){
			moveDown();
		}
		else if(inEvent.keyCode == 37){
			moveLeft();
		}
		else if(inEvent.keyCode == 38){
			moveUp();
		}
		else if(inEvent.keyCode == 39){
			moveRight();
		}
		else if(inEvent.keyCode == 13){
			moveOk();
		}
		else{
			console.log(inEvent.keyCode);
		}
		
	});
}


function keyOk() {
	
	if(document.activeElement.id === "subscribe")
	{
		location.href = "../login.html";
	}
	else if(document.activeElement.id === "loginBtnID")
	{
		signup();
	}
	
}

function keyLeft() {
	
	if(document.activeElement.id === "loginBtnID")
	{
	
		removeFocus("loginBtn_style");
		document.getElementById("subscribe").classList.add('signupfocus');
		document.getElementById("subscribe").focus();
	}
}


function keyRight() {
	
	if(document.activeElement.id === "subscribe")
	{
		
		removeFocus("signupfocus");
		document.getElementById("loginBtnID").classList.add('loginBtn_style');
		document.getElementById("loginBtnID").focus();
	}
}

function keyDown() {
	
	if(document.activeElement.id === "email")
	{
		document.getElementById("email").blur();
		document.getElementById("fname").focus();
	}
	else if(document.activeElement.id === "fname")
	{
		document.getElementById("fname").blur();
		document.getElementById("lname").focus();
	}
	else if(document.activeElement.id === "lname")
	{
		document.getElementById("lname").blur();
		document.getElementById("pass").focus();
	}
	else if(document.activeElement.id === "pass")
	{
		document.getElementById("pass").blur();
		document.getElementById("loginBtnID").classList.add('loginBtn_style');
	    document.getElementById("loginBtnID").focus();
	}
}


function removeFocus(clas){
	
	var el = document.getElementsByClassName(clas)[0].id;
    document.getElementById(el).classList.remove(clas);
	
}




function signup(){
	
	showLoader();
	
	
	let formData = new FormData();
	formData.append('email', document.getElementById("email").value);
	formData.append('password', document.getElementById("pass").value);
	formData.append('fname', document.getElementById("fname").value);
	formData.append('lname',  document.getElementById("lname").value);
	
	
	
	
	
	

	
	fetch('https://api.uam.tv/v3/users/post.php', {
	  method: 'POST', // or 'PUT'
	  body:formData,
	})
	.then(response => response.json())
	.then(data => {
	  
		
		hideLoader();
		
		if(data["meta"]["response"] == true){
			login();
		}
		else{
			alert("Account already exists!");
		}
	  
	  
	  
	})
	.catch((error) => {
		alert("Errore!");
	  hideLoader();
	});
	
	
	
	
	
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
	        return;
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
	 	 
	 	   	  
	 	   	    	localStorage.setItem("remembered", "false");
	 	   	  
	 	  
	 	   	    localStorage.setItem("jwt token", data["jwt"]);
	 	  
	 	   	    hideLoader();
	 	  
	 	   	    location.href = "home/home.html";
	 	  
	
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


