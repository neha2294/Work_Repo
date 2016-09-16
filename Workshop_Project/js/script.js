var myApp = angular.module('myApp', ['ngRoute']);
	/*method used for routing*/
	myApp.config(function($routeProvider) {
		$routeProvider
		.when("/addBook", {
			templateUrl : "pages/addnewbook.html",
			controller: "myCtrl2"
		})
		.when("/addAuthor", {
			templateUrl : "pages/addnewauthor.html",
			controller: "myCtrl1"
		})
		.when("/editAuthor/:authName",{
			templateUrl : "pages/editAuthor.html",
			controller: "myCtrl1"
		})
		.when("/editBook/:bookName",{
			templateUrl : "pages/bookpage.html",
			controller: "myCtrl2"
		})
		.when("/", {
			templateUrl : "pages/table.html",
			controller:"myCtrl"
		})

	});		
    
	/*Controller to load data in table*/
	myApp.controller('myCtrl', function ($scope,$location, $http){
		
		/*HTTP request to fetch data in table*/    
		$http.get("http://172.27.12.104:3000/book/list").then(function(response) {
		  $scope.emp = response.data;
        });
	
		/*To hide Home button on main page*/	
		$scope.getPath = function (){
			return($location.path());
		
		};
	});
		
	/*Controller for author related request*/	
	myApp.controller('myCtrl1',function($scope,$http,$routeParams){
	
		/*To switch between update and edit button*/
		$scope.editAuthorData = true;
		$scope.editBtn = true;
		$scope.updateBtn = false;

		/*To add new author into the database*/	
		$scope.addNew = function(authorData,avOn){
			console.log(authorData);
			console.log(avOn);
			authorData.skills=avOn;
			var req = {
				method: 'POST',
				url: 'http://172.27.12.104:3000/author/new',
				data: authorData
			};
			 $http(req).then(function(response){
				alert("Record Added");
			}); 
		};
		
		/*Function to display data in input field */
		function getAuthorData(author) {
			
			var authorName = {"name":author};
			var req = {
					method: 'POST',
					url: 'http://172.27.12.104:3000/author/byname',
					data: authorName,
					success: function(data){
					console.log(data);
					} 
				};
				
				return $http(req).then(function(response){
				return response.data;
				}); 
			}
			
			getAuthorData($routeParams.authName).then(function(result){
				$scope.e = result;
			});
			
		/*To switch between update and edit button*/	
		$scope.edit = function() {
			$scope.editBtn = false;
			$scope.updateBtn = true;
			$scope.editAuthorData = false;
		};
	
		/*To update author data*/	
		$scope.update = function(authorData,avOn) {
			$http.put('http://172.27.12.104:3000/author/update',authorData).then(function(response){
			console.log(response.data);
			alert("Record Updated");
			});
		};
		
		/*Reset the input fields*/
		$scope.authorDetails = {};
		$scope.reset = function() {
        $scope.newAuthor = angular.copy($scope.authorDetails);
		};
		$scope.reset();

	
		/*To show the checkbox selected*/
		$scope.skills=[];
		$scope.toggleSelection = function toggleSelection(avOn) {
			var idx = $scope.skills.indexOf(avOn);

			// is currently selected
			if (idx > -1) {
			  $scope.skills.splice(idx, 1);
			}

			// is newly selected
			else {
			  $scope.skills.push(avOn);
			}
		};
	
		/*To delete the record*/	
		$scope.deleteData=function(empid){
			var config={
			data:{"empid":empid}, 
			headers: {
					'Content-type': 'application/json;charset=utf-8'
				}
			};
			console.log(empid);
			$http.delete('http://172.27.12.104:3000/author/remove',config).then(function(response){
				alert("Record Deleted");
			});
		};
	});
	
	/*Controller for book related request*/	
	myApp.controller('myCtrl2',function($scope,$http,$routeParams){

		/*To switch between update and edit button*/
		$scope.editBookData = true;
		$scope.editBtn = true;
		$scope.updateBtn = false;
	
		/*To add new book into the database*/		
		$scope.addNew = function(bookData,avOn){
			
			console.log(avOn);
			bookData.availableOn=avOn;
			console.log(bookData);
			var req = {
				method: 'POST',
				url: 'http://172.27.12.104:3000/book/new',
				data: bookData
			};
			 $http(req).then(function(response){
				alert("Record Added");
			}); 
		}

		/*Function to display data in input field */
		function getBookData(isbn) {
			console.log(isbn);
			var isbn={"isbn":isbn};
			var req = {
					method: 'POST',
					url: 'http://172.27.12.104:3000/book/byisbn',
					data: isbn,
					success: function(data){
					console.log(data);
					} 
			};
				
				return $http(req).then(function(response){
				return response.data;
				}); 
		}
			
			getBookData($routeParams.bookName).then(function(result){
				$scope.book = result;
				console.log(result);
			});
		
		/*To switch between update and edit button*/	
		$scope.edit = function() {
			$scope.editBtn = false;
			$scope.updateBtn = true;
			$scope.editBookData = false;
		};
		
		/*To update book data*/		
		$scope.update = function(bookData,avOn) {
			console.log(bookData);
			bookData.availableOn=avOn;
			$http.put('http://172.27.12.104:3000/book/update',bookData).then(function(response){
			console.log(response.data);
			alert("Record Updated");
			});
		};
		
		/*Reset the input fields*/
		$scope.bookDetails = {};
		$scope.reset = function() {
        $scope.newBook = angular.copy($scope.bookDetails);
		};
		$scope.reset();
		
		/*To show the checkbox selected*/	
		$scope.availableOn=[];
		$scope.toggleSelection = function toggleSelection(avOn) {
			var idx = $scope.availableOn.indexOf(avOn);

			// is currently selected
			if (idx > -1) {
			  $scope.availableOn.splice(idx, 1);
			}

			// is newly selected
			else {
			  $scope.availableOn.push(avOn);
			}
		  };
		  
		/*To delete the record*/	  
		$scope.deleteData=function(isbn){
			var config={
			data:{"isbn":isbn}, 
			headers: {
					'Content-type': 'application/json;charset=utf-8'
				}
			};
			console.log(isbn);
			$http.delete('http://172.27.12.104:3000/book/remove',config).then(function(response){
				alert("Record Deleted");
			});
		}
	});		