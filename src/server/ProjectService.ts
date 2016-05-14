import fs = require('fs');

class ProjectService {
    private projectOverview: SimpleProject[];
    private projects: ProjectMap;
    private projectFile = './target/content/projects.json';
    private projectFileLastModifiedInMillis: Number;

    constructor() {
        this.refresh();

        console.log('Refresh interval ' + process.env.PROJECT_REFRESH_INTERVAL_IN_MILLIS);
        console.log('ENV %o', process.env);

        setInterval(() => {
            this.refresh();
        }, process.env.PROJECT_REFRESH_INTERVAL_IN_MILLIS || 10000);
    }

    public getProjects(): SimpleProject[] {
        return this.projectOverview;
    }

    public getProject(projectName: string): Project {
        return this.projects[projectName];
    }

    private refresh(): void {
        console.log('Checking for refresh ' + new Date().toJSON());

        fs.stat(this.projectFile, (err: NodeJS.ErrnoException, stats: fs.Stats) => {
            var actualMillis = stats.mtime.getTime();

            if (this.projectFileLastModifiedInMillis !== actualMillis) {
                this.projectFileLastModifiedInMillis = actualMillis;
                this.load();
            }
        });
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
