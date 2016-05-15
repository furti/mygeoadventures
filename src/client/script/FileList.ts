namespace geoadventures {
    class FileList {
        public icon(file: ProjectFile): string {
            if (file.type === 'file') {
                if (file.searchable) {
                  return 'place';
                }
                else {
                    return 'description';
                }
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
