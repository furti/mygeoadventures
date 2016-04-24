namespace geoadventures {
    class Projects {

    }

    angular.module('geoadventures.projects', [])
        .component('projects', {
            controller: Projects,
            templateUrl: './target/templates/Projects.html',
            $routeConfig: [
                { path: '/', name: 'ProjectsHome', component: 'projectsHome', useAsDefault: true }
            ]
        });
}
