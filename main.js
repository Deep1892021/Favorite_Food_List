var foodieApp = angular.module('foodieApp', ['ngRoute']);
console.log(foodieApp);
var list;
foodieApp.controller('loginController', function($scope, $location) {
	$scope.goToHome = function() {
		$location.url('home')
	}
})

//controller for restaurant page
foodieApp.controller('restaurantController', function($scope, $routeParams, $http) {
	$scope.restaurantId = $routeParams.id;
	$scope.nonVegFood = false;
//	var nonVegItems = ['egg', 'meat', 'beef', 'chicken', 'pork', 'mutton'];
var protein=['pulses','peas','milk','gram','eggs'];
var carbs=['wheat','rice','potato','banana','bread'];
var fats=['butter','oil','milk','cheese'];
var vitamins=['tomato','salad','vegetables'];
	var restaurants = [{
		name: 'Farzi Cafe',
		address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
		location: 'Connaught Place',
		category: 'Casual Dining, Bar',
		vote: '4.2',
		cuisines: 'Modern Indian',
		cost: '2200',
		hours: '12 Noon to 1 AM (Mon-Sun)',
		image: 'http://static01.nyt.com/images/2015/08/27/multimedia/clark-tomato-sandwich/clark-tomato-sandwich-videoSmall.jpg',
		bestDish: {
			name: 'Corn Pizza',
			image: 'http://static01.nyt.com/images/2015/08/27/multimedia/clark-tomato-sandwich/clark-tomato-sandwich-videoSmall.jpg'
		}
	}, {
		name: 'Pirates',
		address: '38/39, Level 10, Block F , Inner Circle, Corol bagh',
		location: 'Connaught Place',
		category: 'Bakery',
		vote: '4.4',
		cuisines: 'Desert',
		cost: '200',
		hours: '12 Noon to 10 PM (Mon-Sun)',
		image: 'https://tobuz.com/wp-content/uploads/2016/12/sweet-tooth-fairy-bakery-5.jpg'
	},
        {
	name: 'Swisserot',
	address: '28-B, 1st Floor , Phase-3, Mohali',
	location: 'Mohali',
	category: 'Special Dining',
	vote: '4.2',
	cuisines: 'Bis Swiss',
	cost: '1800',
	hours: '6 PM to 1 AM (Mon Closed)',
	image: 'https://images.pexels.com/photos/253580/pexels-photo-253580.jpeg?h=350&auto=compress&cs=tinysrgb',
},
{
	name: 'Dominoz',
	address: '12/13, Round Market, Ambala',
	location: 'Ambala Cantt',
	category: 'Snacky',
	vote: '4.8',
	cuisines: ' Double Cheese Pizza',
	cost: '799',
	hours: '12 Noon to 2 AM (Everyday)',
	image: 'https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg?w=940&h=650&auto=compress&cs=tinysrgb',
},
{
	name: 'Pizza Hut',
	address: '#12, 3rd Floor, New Mall, Zirakpur',
	location: 'Zirakpur',
	category: 'Snacky n Spicy',
	vote: '4.5',
	cuisines: 'Hutter Pizza',
	cost: '849',
	hours: '11 AM to 1 AM (Daily)',
	image: 'https://thumb9.shutterstock.com/display_pic_with_logo/3837956/583585405/stock-photo-pizza-pepperoni-this-picture-is-perfect-for-you-to-design-your-restaurant-menus-visit-my-page-583585405.jpg',
},
{
	name: 'Sagarika',
	address: '31, NH-1, near factory stores, Ambala-Delhi Highway',
	location: 'Shahpur',
	category: 'Casual Dining, Bar',
	vote: '4.1',
	cuisines: 'Lunchify',
	cost: '1275',
	hours: '12 Noon to 4 PM (Everyday)',
	image: 'https://images.pexels.com/photos/461326/pexels-photo-461326.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
},
{
	name: 'Celebration',
	address: 'Store 32, NH-63, Kardhan',
	location: 'Mahesh Nagar',
	category: 'Casual Dining, Club',
	vote: '4.4',
	cuisines: 'Kimo Drink',
	cost: '390',
	hours: '7 PM to 2 AM (Tuesday Closed)',
	image: 'https://images.pexels.com/photos/5249/bread-food-restaurant-people.jpg?w=940&h=650&auto=compress&cs=tinysrgb',
},
{
	name: 'Indo-Spice',
	address: 'Level 1, Near Gandhi Ground, Indra Chowk',
	location: 'Canttonment',
	category: ' Yummy Brekfast',
	vote: '4.5',
	cuisines: 'Indo ButterMilk',
	cost: '120',
	hours: '6 AM to 11 PM (Daily)',
	image: 'https://images.pexels.com/photos/46520/milk-glass-frisch-healthy-46520.jpeg?h=350&auto=compress&cs=tinysrgb',
},
{
	name: 'Subway',
	address: 'Shop-1, Block B, Galaxy, Ropar',
	location: 'Punjab',
	category: 'Snacky',
	vote: '4.6',
	cuisines: 'Mega Burger',
	cost: '220',
	hours: '11 AM to 11 PM (Mon Closed)',
	image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
},
{
	name: 'Khan Foods',
	address: '35, Sector-32A, Chandigarh',
	location: 'Chandigarh',
	category: 'Evening Special, Bar',
	vote: '4.4',
	cuisines: 'Evener',
	cost: '430',
	hours: '4 PM to 8 PM (Mon-Sun)',
	image: 'https://images.pexels.com/photos/162993/food-thai-spicy-asian-162993.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
}    

	]
				$scope.x = 0;
				$scope.toggle=function(){
   			$scope.x = 1-$scope.x;
				console.log($scope.x);
				}
	$scope.restaurant = restaurants[$routeParams.id - 1];
	$scope.getIngredients = function(url) {
		var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
		$http({
			'method': 'POST',
			'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
			'headers': {
				'Authorization': 'Key d4aa0fd8f7c94d9a85f0eaddf27c4deb',
				'Content-Type': 'application/json'
			},
			'data': data
		}).then(function(response) {
			var ingredients = response.data.outputs[0].data.concepts;

			$scope.ingredients = [];
			for (var i = 0; i < ingredients.length; i++) {
				$scope.ingredients.push(ingredients[i]);
			}

$scope.save = function(){
  $scope.useringredient = [];
  angular.forEach($scope.ingredients, function(ingredient){
    if (!!ingredient.selected&&ingredient.value>=0.75) {
		$scope.useringredient.push(ingredient.name);
	}
	else {
		$scope.message="Sorry ! Not found in our list";
	}
  })
}

	$scope.user=[];
	$("input:checkbox[name=user]:checked").each(function(){
	    $scope.user.push($(this).val());
			console.log($scope.user);
	});




			list = $scope.ingredients;



			// $('.ingredients').html(list);
		}, function(xhr) {
			console.log(xhr);
		})


	}

})
//controller for main page
foodieApp.controller('mainController', function($scope) {
	$scope.restaurants = [{
		name: 'Farzi Cafe',
		address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
		location: 'Connaught Place',
		category: 'Casual Dining, Bar',
		vote: '4.2',
		cuisines: 'Modern Indian',
		cost: '2200',
		hours: '12 Noon to 1 AM (Mon-Sun)',
		image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg',
		id: 1
	}, {
		name: 'Pirates',
		address: '38/39, Level 10, Block F , Inner Circle, Corol bagh',
		location: 'Connaught Place',
		category: 'Bakery',
		vote: '4.4',
		cuisines: 'Desert',
		cost: '200',
		hours: '12 Noon to 10 PM (Mon-Sun)',
		image: 'https://tobuz.com/wp-content/uploads/2016/12/sweet-tooth-fairy-bakery-5.jpg',
		id: 2
	},
        {
		name: 'Swisserot',
		address: '28-B, 1st Floor , Phase-3, Mohali',
		location: 'Mohali',
		category: 'Special Dining',
		vote: '4.2',
		cuisines: 'Bis Swiss',
		cost: '1800',
		hours: '6 PM to 1 AM (Mon Closed)',
		image: 'https://images.pexels.com/photos/253580/pexels-photo-253580.jpeg?h=350&auto=compress&cs=tinysrgb',
		id: 3
	},
	{
		name: 'Dominoz',
		address: '12/13, Round Market, Ambala',
		location: 'Ambala Cantt',
		category: 'Snacky',
		vote: '4.8',
		cuisines: ' Double Cheese Pizza',
		cost: '799',
		hours: '12 Noon to 2 AM (Everyday)',
		image: 'https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg?w=940&h=650&auto=compress&cs=tinysrgb',
		id: 4
	},
	{
		name: 'Pizza Hut',
		address: '#12, 3rd Floor, New Mall, Zirakpur',
		location: 'Zirakpur',
		category: 'Snacky n Spicy',
		vote: '4.5',
		cuisines: 'Hutter Pizza',
		cost: '849',
		hours: '11 AM to 1 AM (Daily)',
		image: 'https://thumb9.shutterstock.com/display_pic_with_logo/3837956/583585405/stock-photo-pizza-pepperoni-this-picture-is-perfect-for-you-to-design-your-restaurant-menus-visit-my-page-583585405.jpg',
		id: 5
	},
	{
		name: 'Sagarika',
		address: '31, NH-1, near factory stores, Ambala-Delhi Highway',
		location: 'Shahpur',
		category: 'Casual Dining, Bar',
		vote: '4.1',
		cuisines: 'Lunchify',
		cost: '1275',
		hours: '12 Noon to 4 PM (Everyday)',
		image: 'https://images.pexels.com/photos/461326/pexels-photo-461326.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
		id: 6
	},
	{
		name: 'Celebration',
		address: 'Store 32, NH-63, Kardhan',
		location: 'Mahesh Nagar',
		category: 'Casual Dining, Club',
		vote: '4.4',
		cuisines: 'Kimo Drink',
		cost: '390',
		hours: '7 PM to 2 AM (Tuesday Closed)',
		image: 'https://images.pexels.com/photos/5249/bread-food-restaurant-people.jpg?w=940&h=650&auto=compress&cs=tinysrgb',
		id: 7
	},
	{
		name: 'Indo-Spice',
		address: 'Level 1, Near Gandhi Ground, Indra Chowk',
		location: 'Canttonment',
		category: ' Yummy Brekfast',
		vote: '4.5',
		cuisines: 'Indo ButterMilk',
		cost: '120',
		hours: '6 AM to 11 PM (Daily)',
		image: 'https://images.pexels.com/photos/46520/milk-glass-frisch-healthy-46520.jpeg?h=350&auto=compress&cs=tinysrgb',
		id: 8
	},
	{
		name: 'Subway',
		address: 'Shop-1, Block B, Galaxy, Ropar',
		location: 'Punjab',
		category: 'Snacky',
		vote: '4.6',
		cuisines: 'Mega Burger',
		cost: '220',
		hours: '11 AM to 11 PM (Mon Closed)',
		image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
		id: 9
	},
	{
		name: 'Khan Foods',
		address: '35, Sector-32A, Chandigarh',
		location: 'Chandigarh',
		category: 'Evening Special, Bar',
		vote: '4.4',
		cuisines: 'Evener',
		cost: '430',
		hours: '4 PM to 8 PM (Mon-Sun)',
		image: 'https://images.pexels.com/photos/162993/food-thai-spicy-asian-162993.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
		id: 10
	}
	];
console.log($scope.restaurants[0].name);
$scope.change = function(){
$scope.restaurants.push({
	name: 'Pirates',
	address: '38/39, Level 10, Block F , Inner Circle, Corol bagh',
	location: 'Connaught Place',
	category: 'Bakery',
	vote: '4.4',
	cuisines: 'Desert',
	cost: '200',
	hours: '12 Noon to 10 PM (Mon-Sun)',
	image: 'https://tobuz.com/wp-content/uploads/2016/12/sweet-tooth-fairy-bakery-5.jpg',
	id: 2
});

console.log($scope);
console.log($scope.$parent.restaurants);

}

})
// Controller for todolist page
foodieApp.controller("todo", function($scope) {
			$scope.list = list;
			$scope.x=1;
			console.log(list);
			$scope.grocery = [];
			//I need to create an array of object because we will need this for keeping track of which has been bought and which not
			for (var i = 0; i < list.length; i++) {
				var a = {
					id: i,
					name: list[i],
					buy: false
				};
				$scope.grocery.push(a);
			}
			console.log($scope);
			$scope.bought = [];
			$scope.nbought = [];
			$scope.see = function() {
				console.log($scope);
				$scope.grocery[19].buy = "ksakdjjjjad";
			}
			$scope.toggle = function(num) {
				// we need to change value dependin
				$scope.grocery[num].buy = !$scope.grocery[num].buy;
				$scope.$parent.grocery[num].buy = !$scope.$parent.grocery[num].buy

			}
			$scope.one =function(){

				$scope.x=1;

			}
			$scope.two =function(){

				$scope.x=2;

			}
			$scope.three =function(){

				$scope.x=3;

			}
			$scope.filter = function() {
$scope.bought=[];
$scope.nbought=[];
				for (var i = 0; i < $scope.grocery.length; i++) {
					if ($scope.grocery[i].buy) {
						$scope.bought.push($scope.grocery[i]);
					} else {
						$scope.nbought.push($scope.grocery[i]);
					}
				}

				console.log($scope.bought);
			}


})
foodieApp.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	}).when('/home', {
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	}).when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	}).when('/todolist', {
		templateUrl: 'pages/todo.html',
		controller: 'todo'
	})
})
