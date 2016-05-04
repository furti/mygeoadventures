namespace geoadventures {
    class Projects implements angular.OnActivate {
        static $inject = ['$http'];

        private projects: Project[];

        constructor(private $http: angular.IHttpService) {

        }

        public $routerOnActivate(): any {
            return this.$http.get<Project[]>('data/projects').then((response) => {
                this.projects = response.data;
            });
        };
    }

    angular.module('geoadventures.projects', [])
        .component('projects', {
            controller: Projects,
            templateUrl: 'templates/Projects.html',
            $routeConfig: [
                { path: '/', name: 'ProjectsHome', component: 'projectsHome', useAsDefault: true },
                { path: '/:name', name: 'ProjectsDetails', component: 'projectsDetails' }
            ]
        });
}
