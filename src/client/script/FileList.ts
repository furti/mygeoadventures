namespace geoadventures {
    class FileList {
        static $inject = ['$mdDialog'];

        constructor(private $mdDialog: angular.material.IDialogService) {

        }

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

        public openFile(file: ProjectFile, $event: MouseEvent): void {
            var dialog = this.$mdDialog.show({
                template: `
<md-dialog>
  <md-toolbar class="md-accent">
    <div class="md-toolbar-tools">
      <h2>{{ $ctrl.file.name }}</h2>
      <span flex></span>
      <md-button class="md-icon-button" ng-click="$ctrl.$mdDialog.cancel()">
        <md-icon aria-label="Close dialog">close</md-icon>
      </md-button>
    </div>
  </md-toolbar>
  <md-dialog-content class="md-dialog-content">
      <file-view file="$ctrl.file"></file-view>
      <p>Content will follow...</p>
  </md-dialog-content>
</md-dialog>`,
                targetEvent: $event,
                controller: DialogController,
                bindToController: true,
                controllerAs: '$ctrl',
                locals: {
                    file: file
                }
            });
        }
    }

    class DialogController {
        static $inject = ['$mdDialog'];

        constructor(public $mdDialog: angular.material.IDialogService) {

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
