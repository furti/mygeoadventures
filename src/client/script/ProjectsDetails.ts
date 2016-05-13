/// <reference path="./Projects.ts"/>

namespace geoadventures {
    class ProjectsDetails implements angular.OnActivate {
        static $inject = ['$http'];

        private project: Project;

        constructor(private $http: angular.IHttpService) {

        }

        $routerOnActivate(next?: angular.ComponentInstruction): any {
            return this.$http.get<Project>('data/projects/' + next.params['name']).then((response) => {
                this.project = response.data;
            });
        }
    }

    angular.module('geoadventures.projects')
        .component('projectsDetails', {
            controller: ProjectsDetails,
            template:`{% include "ProjectsDetails.html" %}`
        });
}
