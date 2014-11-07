var genericController = angular.module('genericController', []);

genericController.controller('TestCtrl', ['$scope', '$http', '$timeout',
	function ($scope, $http, $timeout) {
		//This should be an http request but it doesn't work for some reason
		var data = getJsonData();
		var tabArr = [];
		for (var i = 0; i < data.length; i++) {
			buArr = [];
			for (var j = 0; j < data[i].businessUnits.length; j++) {
				buArr[j] = new BusinessUnit(data[i].businessUnits[j], i, j);
			}
			tabArr[i] = new BusinessUnitTab(data[i].name, buArr, i);
		}
		
		var incidentData = getIncidentData();
		var incArr = [];
		for (var i = 0; i < incidentData.length; i++) {
			incArr[i] = new IncidentBusinessUnit(incidentData[i], i);
		}
		
		$scope.tabArr = tabArr;
		$scope.incArr = incArr;
		$scope.gAvail = ""; $scope.gA0 = ""; $scope.gA1 = ""; $scope.gA2 = ""; $scope.gA3 = ""; $scope.gA4 = ""; $scope.gA5 = ""; $scope.gA6 = ""; $scope.gA7 = "";
		$scope.gPerf = ""; $scope.gP0 = ""; $scope.gP1 = ""; $scope.gP2 = ""; $scope.gP3 = ""; $scope.gP4 = ""; $scope.gP5 = ""; $scope.gP6 = ""; $scope.gP7 = "";
		$scope.end = "07/13/2014"; $scope.monthStart = "07/01/2014"; $scope.timeStart = "02/01/2014"; $scope.end2 = "07/13/2014";
		$scope.pageState = {
			'tab': $scope.tabArr[0],
			'businessUnit': $scope.tabArr[0].businessUnits[0],
			'timeScale': 2,
			'incidentBU': $scope.incArr[0],
			'month': 6,
		};
		$scope.numTableRows = new Array(8); //Need to create an array for ng-repeat
		$scope.numQuarterRows = new Array(4);
		//This must be done because the number of table rows isn't bound to the number of BUs
		
		/**
		* updates the current business Unit to be the selected BU, updates the gauges, performance, and availability charts to reflect the selected BU
		*/
		$scope.updateBU = function(tab, index) {
			if (tab.businessUnits[index]) {
				$scope.pageState.businessUnit = tab.businessUnits[index];
				gauges["availGaugeContainer"].redraw($scope.pageState.businessUnit.ytdAvail);
				gauges["perfGaugeContainer"].redraw($scope.pageState.businessUnit.ytdPerf);
				//makePerfAvailGraphs();
				updateAvailData($scope.gAvail, $scope.pageState.businessUnit.graph1CSV,  $scope.pageState.businessUnit.name);
				updatePerfData($scope.gPerf, $scope.pageState.businessUnit.graph2CSV,  $scope.pageState.businessUnit.name);
			}
		}
		
		/**
		* updates the current incident business unit to be the selected BU
		*/
		$scope.updateIncidentBU = function(index) {
			$scope.pageState.incidentBU = incArr[index];
			updateIncProbGraphs($scope.pageState.incidentBU.graphCSV);
		}
		
		/**
		* updates the current time scale to be the selected time scale
		*/
		$scope.updateTimeScale = function(num) {
			$scope.pageState.timeScale =num;
		}
		
		/**
		* uses the getPerfImage and getAvailImage functions to insert the correct image into the table based on the current and target performance and availability
		*/
		$scope.placeImages = function() {
		
			
		document.getElementById("imgAvail7").innerHTML = "";
			document.getElementById("imgAvail6").innerHTML = "";
			document.getElementById("imgAvail5").innerHTML = "";
			document.getElementById("imgAvail4").innerHTML = "";
			document.getElementById("imgAvail3").innerHTML = "";
			document.getElementById("imgAvail2").innerHTML = "";
			document.getElementById("imgAvail1").innerHTML = "";
			document.getElementById("imgAvail0").innerHTML = "";
			
			document.getElementById("imgPerf7").innerHTML = "";
			document.getElementById("imgPerf6").innerHTML = "";
			document.getElementById("imgPerf5").innerHTML = "";
			document.getElementById("imgPerf4").innerHTML = "";
			document.getElementById("imgPerf3").innerHTML = "";
			document.getElementById("imgPerf2").innerHTML = "";
			document.getElementById("imgPerf1").innerHTML = "";
			document.getElementById("imgPerf0").innerHTML = "";
			
			
			
			document.getElementById("imgPerf0").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[0].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[0].targetPerformance);
			document.getElementById("imgAvail0").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[0].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[0].targetAvailability);
			
			document.getElementById("imgPerf1").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[1].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[1].targetPerformance);
			document.getElementById("imgAvail1").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[1].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[1].targetAvailability);
			
			document.getElementById("imgPerf2").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[2].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[2].targetPerformance);
			document.getElementById("imgAvail2").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[2].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[2].targetAvailability);
			
			document.getElementById("imgPerf3").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[3].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[3].targetPerformance);
			document.getElementById("imgAvail3").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[3].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[3].targetAvailability);
			
			document.getElementById("imgPerf4").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[4].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[4].targetPerformance);
			document.getElementById("imgAvail4").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[4].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[4].targetAvailability);
			
			document.getElementById("imgPerf5").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[5].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[5].targetPerformance);
			document.getElementById("imgAvail5").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[5].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[5].targetAvailability);
			
			document.getElementById("imgPerf6").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[6].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[6].targetPerformance);
			document.getElementById("imgAvail6").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[6].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[6].targetAvailability);
			
			document.getElementById("imgPerf7").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[7].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[7].targetPerformance);
			document.getElementById("imgAvail7").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[7].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[7].targetAvailability);
			//$scope.sparkGraphs();
		}
		
		/**
		* creates the spark graphs for the table and inserts the correct image based on performance and availability
		*/
		$scope.sparkGraphs = function(){
		
			
			$scope.gP7 = SparkGraph("sparkPerf7","", $scope.monthStart, $scope.end);
			$scope.gA7 = SparkGraph("sparkAvail7","", $scope.monthStart, $scope.end);
			$scope.gP6 = SparkGraph("sparkPerf6","", $scope.monthStart, $scope.end);
			$scope.gA6 = SparkGraph("sparkAvail6","", $scope.monthStart, $scope.end);
			$scope.gP5 = SparkGraph("sparkPerf5","", $scope.monthStart, $scope.end);
			$scope.gA5 = SparkGraph("sparkAvail5","", $scope.monthStart, $scope.end);
			$scope.gP4 = SparkGraph("sparkPerf4","", $scope.monthStart, $scope.end);
			$scope.gA4 = SparkGraph("sparkAvail4","", $scope.monthStart, $scope.end);
			$scope.gP3 = SparkGraph("sparkPerf3","", $scope.monthStart, $scope.end);
			$scope.gA3 = SparkGraph("sparkAvail3","", $scope.monthStart, $scope.end);
			$scope.gP2 = SparkGraph("sparkPerf2","", $scope.monthStart, $scope.end);
			$scope.gA2 = SparkGraph("sparkAvail2","", $scope.monthStart, $scope.end);
			$scope.gP1 = SparkGraph("sparkPerf1","", $scope.monthStart, $scope.end);
			$scope.gA1 = SparkGraph("sparkAvail1","", $scope.monthStart, $scope.end);
			$scope.gP0 = SparkGraph("sparkPerf0","", $scope.monthStart, $scope.end);
			$scope.gA0 = SparkGraph("sparkAvail0","", $scope.monthStart, $scope.end);
			
			
			document.getElementById("imgAvail7").innerHTML = "";
			document.getElementById("imgAvail6").innerHTML = "";
			document.getElementById("imgAvail5").innerHTML = "";
			document.getElementById("imgAvail4").innerHTML = "";
			document.getElementById("imgAvail3").innerHTML = "";
			document.getElementById("imgAvail2").innerHTML = "";
			document.getElementById("imgAvail1").innerHTML = "";
			document.getElementById("imgAvail0").innerHTML = "";
			
			document.getElementById("imgPerf7").innerHTML = "";
			document.getElementById("imgPerf6").innerHTML = "";
			document.getElementById("imgPerf5").innerHTML = "";
			document.getElementById("imgPerf4").innerHTML = "";
			document.getElementById("imgPerf3").innerHTML = "";
			document.getElementById("imgPerf2").innerHTML = "";
			document.getElementById("imgPerf1").innerHTML = "";
			document.getElementById("imgPerf0").innerHTML = "";
			
			
			$scope.gP0 = SparkGraph("sparkPerf0",$scope.pageState.tab.businessUnits[0].graph2CSV, $scope.monthStart, $scope.end);
			$scope.gA0 = SparkGraph("sparkAvail0",$scope.pageState.tab.businessUnits[0].graph1CSV, $scope.monthStart, $scope.end);
			document.getElementById("imgPerf0").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[0].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[0].targetPerformance);
			document.getElementById("imgAvail0").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[0].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[0].targetAvailability);
			
			$scope.gP1 = SparkGraph("sparkPerf1",$scope.pageState.tab.businessUnits[1].graph2CSV, $scope.monthStart, $scope.end);
			$scope.gA1 = SparkGraph("sparkAvail1",$scope.pageState.tab.businessUnits[1].graph1CSV, $scope.monthStart, $scope.end);
			document.getElementById("imgPerf1").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[1].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[1].targetPerformance);
			document.getElementById("imgAvail1").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[1].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[1].targetAvailability);
			
			$scope.gP2 = SparkGraph("sparkPerf2",$scope.pageState.tab.businessUnits[2].graph2CSV, $scope.monthStart, $scope.end);
			$scope.gA2 = SparkGraph("sparkAvail2",$scope.pageState.tab.businessUnits[2].graph1CSV, $scope.monthStart, $scope.end);
			document.getElementById("imgPerf2").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[2].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[2].targetPerformance);
			document.getElementById("imgAvail2").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[2].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[2].targetAvailability);
			
			$scope.gP3 = SparkGraph("sparkPerf3",$scope.pageState.tab.businessUnits[3].graph2CSV, $scope.monthStart, $scope.end);
			$scope.gA3 = SparkGraph("sparkAvail3",$scope.pageState.tab.businessUnits[3].graph1CSV, $scope.monthStart, $scope.end);
			document.getElementById("imgPerf3").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[3].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[3].targetPerformance);
			document.getElementById("imgAvail3").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[3].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[3].targetAvailability);
			
			$scope.gP4 = SparkGraph("sparkPerf4",$scope.pageState.tab.businessUnits[4].graph2CSV, $scope.monthStart, $scope.end);
			$scope.gA4 = SparkGraph("sparkAvail4",$scope.pageState.tab.businessUnits[4].graph1CSV, $scope.monthStart, $scope.end);
			document.getElementById("imgPerf4").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[4].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[4].targetPerformance);
			document.getElementById("imgAvail4").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[4].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[4].targetAvailability);
			
			$scope.gP5 = SparkGraph("sparkPerf5",$scope.pageState.tab.businessUnits[5].graph2CSV, $scope.monthStart, $scope.end);
			$scope.gA5 = SparkGraph("sparkAvail5",$scope.pageState.tab.businessUnits[5].graph1CSV, $scope.monthStart, $scope.end);
			document.getElementById("imgPerf5").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[5].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[5].targetPerformance);
			document.getElementById("imgAvail5").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[5].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[5].targetAvailability);
			
			$scope.gP6 = SparkGraph("sparkPerf6",$scope.pageState.tab.businessUnits[6].graph2CSV, $scope.monthStart, $scope.end);
			$scope.gA6 = SparkGraph("sparkAvail6",$scope.pageState.tab.businessUnits[6].graph1CSV, $scope.monthStart, $scope.end);
			document.getElementById("imgPerf6").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[6].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[6].targetPerformance);
			document.getElementById("imgAvail6").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[6].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[6].targetAvailability);
			
			$scope.gP7 = SparkGraph("sparkPerf7",$scope.pageState.tab.businessUnits[7].graph2CSV, $scope.monthStart, $scope.end);
			$scope.gA7 = SparkGraph("sparkAvail7",$scope.pageState.tab.businessUnits[7].graph1CSV, $scope.monthStart, $scope.end);
			document.getElementById("imgPerf7").innerHTML = getPerfImage($scope.pageState.tab.businessUnits[7].actualPerformance[$scope.pageState.month], $scope.pageState.tab.businessUnits[7].targetPerformance);
			document.getElementById("imgAvail7").innerHTML = getAvailImage($scope.pageState.tab.businessUnits[7].actualAvailability[$scope.pageState.month], $scope.pageState.tab.businessUnits[7].targetAvailability);
			
		//$scope.placeImages();
			//updateData(gA0, newFile)
		}
		
		/*$scope.changeSparkGraphs = function(tab){
		
			updateData(gP0, tab.businessUnits[0].graph2CSV);
			
		}*/
		
		/**
		* creates the ytd gauges 
		*/
		$scope.gauge = function(){
			createAvailGauge("availGaugeContainer", "Avail");
			createPerfGauge("perfGaugeContainer", "Perf");
			
		}
		
		/**
		* creates the graphs to display performance and availability
		*/
		$scope.makePerfAvailGraphs = function(){
		start = "02/01/2014";
		
			$scope.gAvail = new AvailGraph("dygAvail", $scope.pageState.businessUnit.graph1CSV, $scope.pageState.businessUnit.name, start, $scope.end);
			$scope.gPerf = new PerfGraph("dygPerf",$scope.pageState.businessUnit.graph2CSV, $scope.pageState.businessUnit.name, start, $scope.end);
		}
		
		/**
		* updates the graphs to display the correct date windows based on the selected month end date and time scale
		*/
		$scope.selectDate = function(){
		
			//$scope.sparkGraphs();
		
			var monthSelect = document.getElementById('month').value;
			$scope.end = monthSelect;
			$scope.end2 = monthSelect;
				if(monthSelect == "07/13/2014"){
					$scope.pageState.month =6;
					$scope.monthStart = "07/01/2014";
					if($scope.pageState.timeScale == 0){$scope.timeStart = "06/01/2014";}
					else if($scope.pageState.timeScale ==1){$scope.timeStart = "05/01/2014";}
					else if($scope.pageState.timeScale ==2){$scope.timeStart = "02/01/2014";}
					else{$scope.timeStart = "01/01/2014"; $scope.end2 = "12/31/2014";}
				}
				else if(monthSelect == "06/30/2014"){
					$scope.pageState.month =5;
					$scope.monthStart = "06/01/2014";
					if($scope.pageState.timeScale == 0){$scope.timeStart = "05/19/2014";}
					else if($scope.pageState.timeScale ==1){$scope.timeStart = "04/01/2014";}
					else if($scope.pageState.timeScale ==2){$scope.timeStart = "01/01/2014";}
					else{$scope.timeStart = "01/01/2014"; $scope.end2 = "12/31/2014";}
				}
				else if(monthSelect == "05/31/2014"){
					$scope.pageState.month =4;
					$scope.monthStart = "05/01/2014";
					if($scope.pageState.timeScale == 0){$scope.timeStart = "04/19/2014";}
					else if($scope.pageState.timeScale ==1){$scope.timeStart = "03/01/2014";}
					else if($scope.pageState.timeScale ==2){$scope.timeStart = "12/01/2013";}
					else{$scope.timeStart = "01/01/2014"; $scope.end2 = "12/31/2014";}
				}
				else if(monthSelect == "04/30/2014"){
					$scope.pageState.month = 3;
					$scope.monthStart = "04/01/2014";
					if($scope.pageState.timeScale == 0){$scope.timeStart = "03/19/2014";}
					else if($scope.pageState.timeScale ==1){$scope.timeStart = "02/01/2014";}
					else if($scope.pageState.timeScale ==2){$scope.timeStart = "11/01/2013";}
					else{$scope.timeStart = "01/01/2014"; $scope.end2 = "12/31/2014";}
				}
				else if(monthSelect == "03/31/2014"){
					$scope.pageState.month = 2;
					$scope.monthStart = "03/01/2014";
					if($scope.pageState.timeScale == 0){$scope.timeStart = "02/17/2014";}
					else if($scope.pageState.timeScale ==1){$scope.timeStart = "01/01/2014";}
					else if($scope.pageState.timeScale ==2){$scope.timeStart = "10/01/2013";}
					else{$scope.timeStart = "01/01/2014"; $scope.end2 = "12/31/2014";}
				}
				else if(monthSelect == "02/28/2014"){
					$scope.pageState.month =1;
					$scope.monthStart = "02/01/2014";
					if($scope.pageState.timeScale == 0){$scope.timeStart = "01/17/2014";}
					else if($scope.pageState.timeScale ==1){$scope.timeStart = "12/01/2013";}
					else if($scope.pageState.timeScale ==2){$scope.timeStart = "09/01/2013";}
					else{$scope.timeStart = "01/01/2014"; $scope.end2 = "12/31/2014";}
				}
				else if(monthSelect == "01/31/2014"){
					$scope.pageState.month = 0;
					$scope.monthStart = "01/01/2014";
					if($scope.pageState.timeScale == 0){$scope.timeStart = "12/20/2013";}
					else if($scope.pageState.timeScale ==1){$scope.timeStart = "11/01/2013";}
					else if($scope.pageState.timeScale ==2){$scope.timeStart = "08/01/2013";}
					else{$scope.timeStart = "01/01/2014"; $scope.end2 = "12/31/2014";}
				}
				
				
			updateDateWindow($scope.gA0, $scope.monthStart, $scope.end);
			updateDateWindow($scope.gA1, $scope.monthStart, $scope.end);
			updateDateWindow($scope.gA2, $scope.monthStart, $scope.end);
			updateDateWindow($scope.gA3, $scope.monthStart, $scope.end);
			updateDateWindow($scope.gA4, $scope.monthStart, $scope.end);
			updateDateWindow($scope.gA5, $scope.monthStart, $scope.end);
			updateDateWindow($scope.gA6, $scope.monthStart, $scope.end);
			updateDateWindow($scope.gA7, $scope.monthStart, $scope.end);
			
			updateDateWindow($scope.gP0, $scope.monthStart, $scope.end);
			updateDateWindow($scope.gP1, $scope.monthStart, $scope.end);
			updateDateWindow($scope.gP2, $scope.monthStart, $scope.end);
			updateDateWindow($scope.gP3, $scope.monthStart, $scope.end);
			updateDateWindow($scope.gP4, $scope.monthStart, $scope.end);
			updateDateWindow($scope.gP5, $scope.monthStart, $scope.end);
			updateDateWindow($scope.gP6, $scope.monthStart, $scope.end);
			updateDateWindow($scope.gP7, $scope.monthStart, $scope.end);
			
			updateDateWindow($scope.gAvail, $scope.timeStart,  $scope.end2);
			updateDateWindow($scope.gPerf, $scope.timeStart,  $scope.end2);
			
			$scope.placeImages();
		}
		
		/**
		* initializes everything upon loading of the files
		*/
		$timeout(function(){
			$scope.sparkGraphs();
			//$scope.makePerfAvailGraphs();
			$scope.gauge(); 
		}, 0);
	}
	
	
	
]);

