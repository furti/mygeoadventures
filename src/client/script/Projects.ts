namespace geoadventures {
    class Projects implements angular.OnActivate {
        static $inject = ['$http'];

        private projects: Project[];
        private $router: angular.Router;

        constructor(private $http: angular.IHttpService) {

        }

        public overview(): void {
            this.$router.navigate(['ProjectsOverview']);
        }

        public project(project: Project): void {
            this.$router.navigate(['ProjectsDetails', { name: project.name }]);
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
            bindings: {
                $router: '<'
            },
            $routeConfig: [
                { path: '/', name: 'ProjectsOverview', component: 'projectsOverview', useAsDefault: true },
                { path: '/:name', name: 'ProjectsDetails', component: 'projectsDetails' }
            ]
        });
}
