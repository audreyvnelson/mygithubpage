
		
			var isExpanded1 = 0;
			var isExpanded2 = 0;
			var isExpanded3 = 0;
	
				function expand(value, what){//expands or minimizes the selected project info
					if(what==1){
						if(isExpanded1!=0){//if already open
							isExpanded1 = 0;
							document.getElementById("description1").style.display = "none";
						}
						else{//if unopened
							document.getElementById("description1").style.display = "";
							isExpanded1 = 1;
						}
					}
					else if(what==2){
						if(isExpanded2!=0){//if already open
							isExpanded2 = 0;
							document.getElementById("testing3").style.display = "none";
						}
						else{//if unopened
							document.getElementById("testing3").style.display = "";
							isExpanded2 = 1;
							makeIncProbGraphs();
						}
					}
					else if(what==3){
						if(isExpanded3!=0){//if already opened
							document.getElementById("testing4").style.display = "none";
							isExpanded3 = 0;
						}
						else{//if unopened
							document.getElementById("testing4").style.display = "";
							isExpanded3 = 1;
							makeEucGraphs();
						}
					}
				}//end function expand(value, what)
				
			