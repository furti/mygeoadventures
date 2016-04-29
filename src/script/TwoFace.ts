namespace geoadventures {
    class TwoFace {

    }

    angular.module('geoadventures.twoface', [])
        .component('twoFace', {
            controller: TwoFace,
            template: '<div class="top-face"></div><div class="bottom-face"></div>'
        });
}
