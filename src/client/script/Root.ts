namespace geoadventures {
    class Root {

    }

    angular.module('geoadventures.root', [])
        .component('root', {
            controller: Root,
            template: `{% include "Root.html" %}`,
            $routeConfig: [
                { path: '/', name: 'Home', component: 'home', useAsDefault: true },
                { path: '/projects/...', name: 'Projects', component: 'projects' }
            ]
        });
}
