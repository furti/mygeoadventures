namespace geoadventures {
    class Home {

    }

    angular.module('geoadventures.home', [])
        .component('home', {
            controller: Home,
            template: `{% include "Home.html" %}`
        });
}
