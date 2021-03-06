var modulesToLoad = [
	'angular-meteor',
	'ui.router',
	'ngMaterial',
	'accounts.ui',
	'ngMessages'
];

angular.module('WhatToDoApp', modulesToLoad);

var themeIcons = ['$mdIconProvider' , function ($mdIconProvider) {

	$mdIconProvider
		.iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
		.iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
		.iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
		.iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
		.iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")
		.iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
		.iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");

}];

angular.module('WhatToDoApp')
		.config(themeIcons);

function onReady() {
	angular.bootstrap(document, ['WhatToDoApp']);
}

if (Meteor.isCordova)
	angular.element(document).on('deviceready', onReady);
else
	angular.element(document).ready(onReady);

angular.module('WhatToDoApp').factory("helpers", function ($meteor) {
	return {
		searchUser: function ($query, exclude) {
			return $meteor.call("searchByQuery", $query, exclude).then(
					function (data) {
						return data;
					},
					function (err) {
						console.log('failed', err);
					}
			);
		}
	};
});

angular.module('WhatToDoApp').factory("conditions", function () {
	return {
		/**
		 * Organization conditions
		 */
		organization: {
			imMember: {
				$or: [
					{ "creator._id": Meteor.userId() },
					{ "users._id": Meteor.userId() },
					{ "admins._id": Meteor.userId() }
				]
			},
			imCreator: {
				"creator._id": Meteor.userId()
			},
			imAdmin: {
				"admins._id": Meteor.userId()
			},
			imUser: {
				"admins._id": Meteor.userId()
			},
			isPublic: {
				"is_public" : true
			}
		},
		/**
		 * Task conditions
		 */
		task: {
			byOrgId: function (orgId) {
				return {
					orgId: orgId
				}
			},
			imCreator: { "creator._id": Meteor.userId() },
			imExecutor: { userId: Meteor.userId() }
		}
	};
});