/// <reference path="./Projects.ts"/>

namespace geoadventures {
    class ProjectsHome {

    }

    angular.module('geoadventures.projects')
        .component('projectsHome', {
            controller: ProjectsHome,
            templateUrl: './target/templates/ProjectsHome.html'
        });
}
