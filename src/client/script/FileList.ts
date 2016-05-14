namespace geoadventures {
    class FileList {
        public icon(file: ProjectFile): string {
            if (file.type === 'file') {
                return 'description';
            }
            else if (file.type === 'folder') {
                if (!file.files || file.files.length === 0) {
                    return 'folder';
                }
                else {
                    return 'folder_open';
                }
            }
        }
    }

    angular.module('geoadventures.files', [])
        .component('fileList', {
            controller: FileList,
            template: `{% include "FileList.html" %}`,
            bindings: {
                files: '<'
            }
        });
}
