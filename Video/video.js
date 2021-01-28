const URL = "https://api.uam.tv/";
var player;
var percentage;
var isHit = false;

var init = function () {
       
    initTizenKeys();
    
    setPlayer();
    
    
    console.log(localStorage.getItem("videoId"));
    
    
    	setInterval(function(){
    	     
    		
    		
    		if(isHit == false){
    			
    			if(player.duration() > 0){
    	    		
        			percentage = (5/100) * player.duration();
        			if(player.currentTime() >= percentage){
        				
        				
        				//hit view api....
        				 var token = localStorage.getItem("jwt token");

        				   
        				 if (token !== null) {
        					 viewApi(localStorage.getItem("videoId") , token);
        				    } else {
        				        console.log("No token found");
        				        location.href = "../login.html";
        				    }
        				
        			}
        			else
        				{
        					console.log("no");
        				}
        		}
    			
    		}
    		
    		
    	}, 2000);
   
};


window.onload = init;



function viewApi(videoId , token){
	
	isHit = true;
	
	 let params = {
		        "idmovie": videoId
		    };

		    let query = Object.keys(params)
		        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
		        .join('&');

	
	fetch('https://api.uam.tv/v3/movies/view/post.php?' + query, {
		  headers: {
			  'Authorization' : "Bearer " + token,
		  },
		})
		.then(response => response.json())
		.then(data => {

			if(data["meta"]["response"] == true)
				{
					
					console.log("api successful");
				}
			
			else 
				{
				isHit = false;
				console.log("api error");
				}
				

		  
		})
		.catch((error) => {
		  console.log("Err : " , error);
		  location.href = "../login.html";
		  
		});
	}
	
	





function setPlayer() {

	 player = videojs('player_one');
	    var url = localStorage.getItem("video");
	    
	    player.src({
	     type: 'application/x-mpegURL',
	     src: url
	    });
	   
//	    player.nuevo({
//	    	title: "Nuevo plugin for VideoJs Player"
//	    });
//	   
//	    player.hotkeys({
//	    	volumeStep: 0.1,
//	    	seekStep: 5
//	    	});
	    
	    
    var geo = localStorage.getItem("geo");
	    
	    console.log("geo" , geo);
	    
	 //   if(geo == "true")
	    headRequest(url);
	    
}


function headRequest(pathToResource) {
	  fetch(pathToResource, {
	    method: 'HEAD'
	  })

	  .then(data => {

		  if (data.status == 401) {
			  
			  setFocus("ok_btn_id" , "active_modal")
	    		$('#myModal').modal('show');
			  
		}
		  
		  
		  
        })
        .catch((error) => {
            console.log('Err:', error);
            
        });
	}





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
		else if(inEvent.keyCode == 461){
			 location.href = "../home/home.html";
		}
		
	});
}



function moveRight(){
	
	player.currentTime(player.currentTime() + 10);
}

function moveLeft(){
	
	player.currentTime(player.currentTime() - 10);
}


function moveOk() {
	
	
	if(document.getElementsByClassName("active_modal")[0] !== undefined){
		
		removeFocus("active_modal");
		$('#myModal').modal('hide');

		
		
	}
	else
		{
		if (player.paused()) {
			  player.play();
		  }
		  else {
			  player.pause();
		  }
		}
		  
		
	
}


function setFocus(id, clas) {

    document.getElementById(id).classList.add(clas);

}

function removeFocus(clas) {

    var el = document.getElementsByClassName(clas)[0].id;
    document.getElementById(el.toString()).classList.remove(clas);


}
