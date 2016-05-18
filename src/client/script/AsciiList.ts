/// <reference path="./AsciiMation.ts"/>
/// <reference path="./ascii/Basketball.ts"/>

namespace geoadventures {
    var asciis = [
        ascii.basketball
    ];

    export class AsciiList {
        public randomAscii(): Ascii {
            var rand = Math.round(Math.random() * (asciis.length - 1));

            return asciis[rand];
        }
    }

    export interface Ascii {
        slogan: string;
        frames: string[];
    }

    angular.module('geoadventures.ascii')
        .factory('asciiList', [function() {
            return new AsciiList();
        }]);
}
