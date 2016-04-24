/// <reference path="../../typings/browser.d.ts" />

declare namespace angular {
    interface RoutingComponentOptions extends angular.IComponentOptions {
        $routeConfig: angular.RouteDefinition[]
    }

    interface IModule {
        /**
         * Use this method to register a component.
         *
         * @param name The name of the component.
         * @param options A definition object passed into the component.
         */
        component(name: string, options: RoutingComponentOptions): IModule;
    }
}
