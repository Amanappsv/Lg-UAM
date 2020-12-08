const URL = "https://api.uam.tv/";


function initPage() {

	

	
    var token = localStorage.getItem("jwt token");
    
    var remembered = localStorage.getItem("remembered");
   
    
    console.log("remembered" , remembered);
    
 	
    
    setTimeout(function(){ 
    	
    	 if(token === null)
		 {
		
		 location.href = "login.html";
		 }
		 
	 else
		 {
		
			 if(remembered === "true")
		 		{
		 		  
				  doHeartBeat(token);
		 		  
		 		}
		 	else
		 		location.href = "login.html";
	
		 }
    	
    	
    	
    }, 3000);
    	
 
  
}

function doHeartBeat(token){
	
let formData = new FormData();
	
	webOS.service.request("luna://com.webos.service.sm", {
	    method: "deviceid/getIDs",
	    parameters: { 
	        "idType": ["LGUDID"]        
	    },
	    onSuccess: function (inResponse) {

	    	
	    	formData.append('devicehash', inResponse["idList"][0]["idValue"]);
	    	
	        webOS.deviceInfo( function (device) {
	        	
	        	async function temp(){
	        		 formData.append('devicefriendlyname',  device.modelName);
	     	    	formData.append('platform', "LG " + device.version);
	     	    	formData.append('version', device.version);
	     	    
	     	    	
	     	    	
	     	    		
	     		 	   	    var response = await fetch(URL + 'v3/users/devices/heartbeat/post.php', {
	     		 	   		   	  method: 'POST',
	     		 	   			  body:formData,
	     		 	   			  headers: {
	     		 	   				  'Authorization' : "Bearer " + token,
	     		 	   			  },
	     		 	   			});
	     		 	   	    var data = await response.json();
	     		 	   	    console.log(data);
	     		 	   		
	        	}
	          });
	    	
	        
	    },
	    onFailure: function (inError) {
	        console.log("Failed to get system ID information");
	        console.log("[" + inError.errorCode + "]: " + inError.errorText);
	        // To-Do something
	        return;
	    }
	});
	
}





