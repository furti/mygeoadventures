import fs = require('fs');

class ProjectService {
    private projectOverview: SimpleProject[];
    private projects: ProjectMap;
    private projectFile = './target/content/projects.json';

    constructor() {
        this.load();
    }

    public getProjects(): SimpleProject[] {
        return this.projectOverview;
    }

    public getProject(projectName: string): Project {
        return this.projects[projectName];
    }

    private load(): void {
        fs.readFile(this.projectFile, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
            if (err) {
                throw err;
            }

            let projectList: Project[] = JSON.parse(data),
                newOverview: SimpleProject[] = [],
                newProjects: ProjectMap = {};

            projectList.forEach((value: Project) => {
                newOverview.push({
                    title: value.title,
                    name: value.name
                });

                newProjects[value.name] = value;
            });

            this.projectOverview = newOverview;
            this.projects = newProjects;
        });
    }
}

interface Project extends SimpleProject {

}

interface SimpleProject {
    title: string;
    name: string;
}

type ProjectMap = { [projectName: string]: Project };

export var instance = new ProjectService();
