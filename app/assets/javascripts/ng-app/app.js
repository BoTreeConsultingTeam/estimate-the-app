angular.module('myApp', [])
	.controller('homeController', ['$scope','$http', function ($scope,$http) {
		$http.get('assets/ng-app/connection.properties').then(function (response) {
			// Initialize variables
			$scope.questions = response.data
			$scope.selected_entries_radio={}
			$scope.selected_entries_checkbox={}
			$scope.total_my = 0
			$scope.person_days_my = 0
			$scope.personnel_my = 0
			$scope.total_actual = 0
			$scope.person_days_actual = 0
			$scope.personnel_actual = 0
			angular.forEach($scope.questions, function(question) {
				id = question.id
				if (question.type=="checkbox"){
					$scope.selected_entries_checkbox[id] = {}
					angular.forEach(question.options, function(option) {
						opt_id = option.id
						$scope.selected_entries_checkbox[id][opt_id] = null
					})
				}else{
					$scope.selected_entries_radio[id] = null
				}
			})
		})

		// Function which calculates the score after selecting / checking the option
		$scope.calculateScore = function(question,option){
			// Set value in appropriate variable
			if (question.type=="checkbox"){
				// Calculation for check box
				angular.forEach(document.getElementsByName("question_"+question.id), function(ele) {
					if (ele.id == "option_"+option.id){
						if(ele.checked){
							//	When the check box element is checked
							$scope.selected_entries_checkbox[question.id][option.id] = option
						}else{
							//	When the check box element is unchecked
							$scope.selected_entries_checkbox[question.id][option.id] = null
						}
					}
				})
			}else{
				// Calculation for radio button
				$scope.selected_entries_radio[question.id] = option
			}

			// Set all counters to zero and calculate totals
			$scope.total_my = 0
			$scope.person_days_my = 0
			$scope.personnel_my = 0
			$scope.total_actual = 0
			$scope.person_days_actual = 0
			$scope.personnel_actual = 0
			// Add total of all radio inputs
			angular.forEach($scope.selected_entries_radio, function(value, key) {
				if (value!=null) {
					addToTotalScoreboard(value)
				}
			})
			// Add total of all check box inputs
			angular.forEach($scope.selected_entries_checkbox, function(value, key) {
				angular.forEach(value, function(v, k) {
					if (v!=null) {
						addToTotalScoreboard(v)
					}
				})
			})
		}

		function addToTotalScoreboard(value){
			$scope.total_my = $scope.total_my + value["value2"]
			$scope.total_actual = $scope.total_actual + value["value1"]

			$scope.person_days_my = $scope.person_days_my + value["person_days2"]
			$scope.person_days_actual = $scope.person_days_actual + value["person_days1"]

			$scope.personnel_my = $scope.personnel_my + value["personnel2"]
			$scope.personnel_actual = $scope.personnel_actual + value["personnel1"]
		}
	}]);




