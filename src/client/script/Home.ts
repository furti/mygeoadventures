namespace geoadventures {
    class Home {

    }

    angular.module('geoadventures.home', [])
        .component('home', {
            controller: Home,
            templateUrl: 'templates/Home.html'
        });
}
