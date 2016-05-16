/// <reference path="./FileList.ts"/>

namespace geoadventures {

    class FileView {
        public file: ProjectFile;

        public isAvailable(): boolean {
            return this.file.geocaches && this.file.geocaches.length > 0;
        }
    }

    angular.module('geoadventures.files')
        .component('fileView', {
            controller: FileView,
            template: `{% include "FileView.html" %}`,
            bindings: {
                file: '<'
            }
        });
}
