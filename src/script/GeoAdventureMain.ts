namespace geoadventure {
    angular.module('GeoAdventures', ['ngMaterial'])
        .config(['$mdThemingProvider', function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('lime');
        }]);
}
