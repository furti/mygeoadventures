namespace geoadventures {
    export interface Project {
        title: string;
        name: string;
        files: ProjectFile[];
    }

    export interface ProjectFile {
        path: string;
        geocache: GeoCache;
    }

    export interface GeoCache {
        name: string;
        latitude: string;
        longitude: string;
    }
}
