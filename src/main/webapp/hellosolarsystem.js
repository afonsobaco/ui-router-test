var myApp = angular.module('hellosolarsystem', [ 'ui.router' ]);

myApp.config(function($stateProvider) {
	// An array of state definitions
	var states = [ {
		name : 'hello',
		url : '/hello',
		// Using component: instead of template:
		component : 'hello'
	},

	{
		name : 'about',
		url : '/about',
		component : 'about'
	},

	{
		name : 'people',
		url : '/people',
		component : 'people',
		// This state defines a 'people' resolve
		// It delegates to the PeopleService to HTTP fetch (async)
		// The people component receives this via its `bindings: `
		resolve : {
			people : function(PeopleService) {
				return PeopleService.getAllPeople();
			}
		}
	},

	{
		name : 'people.person',
		url : '/{personId}',
		component : 'person',
		resolve : {
			person : function(people, $stateParams) {
				return people.find(function(person) {
					return person.id === $stateParams.personId;
				});
			}
		}

	} ]

	// Loop over the state definitions and register them
	states.forEach(function(state) {
		$stateProvider.state(state);
	});
});
