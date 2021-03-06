namespace geoadventures {
    var module = angular.module('GeoAdventures', ['ngComponentRouter', 'ngMaterial', 'geoadventures.root', 'geoadventures.home', 'geoadventures.projects', 'geoadventures.twoface', 'geoadventures.files', 'geoadventures.ascii']);

    module.config(['$mdThemingProvider', '$locationProvider', function($mdThemingProvider: angular.material.IThemingProvider, $locationProvider: angular.ILocationProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('orange');

        $locationProvider.html5Mode(true);
    }]);

    module.value('$routerRootComponent', 'root');
}
