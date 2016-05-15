namespace geoadventures {
    export interface Project {
        title: string;
        name: string;
        files: ProjectFile[];
    }

    export interface ProjectFile {
        name: string;
        type: string;
        searchable?: boolean;
        files?: ProjectFile[];
        geocaches?: GeoCache[];
    }

    export interface GeoCache {
        name: string;
        part?: number;
        latitude: string;
        longitude: string;
    }
}
