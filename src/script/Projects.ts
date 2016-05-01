namespace geoadventures {
    class Projects {

    }

    angular.module('geoadventures.projects', [])
        .component('projects', {
            controller: Projects,
            templateUrl: 'templates/Projects.html',
            $routeConfig: [
                { path: '/', name: 'ProjectsHome', component: 'projectsHome', useAsDefault: true },
                { path: '/:name', name: 'ProjectsDetails', component: 'projectsDetails'}
            ]
        });
}
