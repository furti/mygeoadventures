namespace geoadventures {
    class Root {
        static $inject = ['$mdMedia', '$scope', '$http'];

        public smallDevice: boolean;
        public loading: boolean;
        public projects: geoadventures.Project[];

        constructor($mdMedia: angular.material.IMedia, $scope: angular.IScope, $http: angular.IHttpService) {
            $scope.$watch(function() { return $mdMedia('xs'); }, (small: boolean) => {
                this.smallDevice = small;

                if (small && !this.projects && !this.loading) {
                    this.loading = true;

                    $http.get<Project[]>('data/projects').then((response) => {
                        this.loading = false;
                        this.projects = response.data;
                    });
                }
            });
        }
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
