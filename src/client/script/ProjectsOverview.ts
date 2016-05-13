/// <reference path="./Projects.ts"/>

namespace geoadventures {

    class ProjectsOverview {


    }

    angular.module('geoadventures.projects')
        .component('projectsOverview', {
            controller: ProjectsOverview,
            template: `{% include "ProjectsOverview.html" %}`
        });
}
