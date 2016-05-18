namespace geoadventures {

    class AsciiMation {
        static $inject = ['$scope', 'asciiList'];

        private ascii: Ascii;
        private currentIndex: number;
        private lastChangedTimesamp: number;
        private stop: boolean;

        constructor(private $scope: angular.IScope, asciiList: AsciiList) {
            this.ascii = asciiList.randomAscii();
            this.currentIndex = 0;
            this.stop = false;

            this.play();

            this.$scope.$on('$destroy', () => {
                this.stop = true;
            });
        }

        public getFrame(): string {
            if (!this.ascii) {
                return '';
            }

            return this.ascii.frames[this.currentIndex];
        }

        private play(): void {
            requestAnimationFrame((timestamp) => {
                if (this.stop) {
                    return;
                }

                if (this.needsChange(timestamp)) {
                    console.log('frame');

                    this.currentIndex++;

                    if (this.currentIndex === this.ascii.frames.length) {
                        this.currentIndex = 0;
                    }

                    this.$scope.$apply();

                    this.lastChangedTimesamp = timestamp;
                }

                this.play();
            });
        }

        private needsChange(timestamp: number): boolean {
            if (!this.lastChangedTimesamp) {
                this.lastChangedTimesamp = timestamp;

                return false;
            }

            //Refresh every seconds
            if (timestamp - this.lastChangedTimesamp >= 500) {
                return true;
            }

            return false;
        }
    }

    angular.module('geoadventures.ascii', [])
        .component('asciiMation', {
            template: `{% include "AsciiMation.html" %}`,
            controller: AsciiMation
        });
}
