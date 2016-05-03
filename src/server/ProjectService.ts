import fs = require('fs');

class ProjectService {
    private projectOverview: SimpleProject[];
    private projectFile = './target/content/projects.json';

    constructor() {
        this.load();
    }

    public getProjects(): SimpleProject[] {
        return this.projectOverview;
    }

    private load(): void {
        fs.readFile(this.projectFile, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
            if (err) {
                throw err;
            }

            let projects: Project[] = JSON.parse(data),
                newOverview: SimpleProject[] = [];

            projects.forEach((value: Project) => {
                newOverview.push({
                    title: value.title,
                    name: value.name
                });
            });

            this.projectOverview = newOverview;
        });
    }
}

interface Project extends SimpleProject {

}

interface SimpleProject {
    title: string;
    name: string;
}

;

export var instance = new ProjectService();
