const URL = "https://api.uam.tv/";


function initPage() {

	

    var token = localStorage.getItem("jwt token");
    
    var remembered = localStorage.getItem("remembered");
   
 
    setTimeout(function(){ 
    	
    	 if(token === null)
		 {
		
		 location.href = "login.html";
		 }
		 
	 else
		 {
		
			 if(remembered === "true")
		 		{
		 		  
				    location.href = "home/home.html";
		 		  
		 		}
		 	else
		 		location.href = "login.html";
	
		 }
    	
    	
    	
    }, 3000);
    	
 
  
}


