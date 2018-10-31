/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation, NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2MenuContent } from './menu-content';
import { Md2MenuItem } from './menu-item';
import { Md2MenuTrigger } from './menu-trigger';
export { Md2MenuContent } from './menu-content';
export { Md2MenuItem } from './menu-item';
export { Md2MenuTrigger } from './menu-trigger';
var Md2Menu = /** @class */ (function () {
    function Md2Menu() {
    }
    Md2Menu.decorators = [
        { type: Component, args: [{
                    selector: '[md2-menu]',
                    template: '<ng-content></ng-content>',
                    encapsulation: ViewEncapsulation.None,
                    styles: ["[md2-menu]{position:relative;display:inline-block}[md2-menu-content]{position:absolute;top:0;left:0;display:inline-block;background:#fff;list-style:none;min-width:112px;max-width:280px;max-height:calc(100vh + 48px);padding:8px 0;margin:0;z-index:1001;border-radius:2px;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;transform-origin:left top;transition:.2s linear;box-shadow:0 2px 6px 1px rgba(0,0,0,.34)}[md2-menu-item] [md2-menu-content]{left:100%;margin:-8px 0}[md2-menu-content][x-position=before]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top}[md2-menu-item] [md2-menu-content][x-position=before]{right:100%}[md2-menu-content][y-position=above]{top:auto;bottom:0;-webkit-transform-origin:left bottom;transform-origin:left bottom}[md2-menu-content][y-position=above][x-position=before]{-webkit-transform-origin:right bottom;transform-origin:right bottom}.open>[md2-menu-content]{-webkit-transform:scale(1);transform:scale(1)}[md2-menu-item]{position:relative;width:100%;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;border:none;white-space:nowrap;text-overflow:ellipsis;display:flex;flex-direction:row;align-items:center;height:36px;padding:0 16px;font-size:16px;text-align:start;text-decoration:none;background:0 0;color:rgba(0,0,0,.87);box-sizing:border-box}[md2-menu-item][disabled]{color:rgba(0,0,0,.38)}[md2-menu-item].open,[md2-menu-item]:focus:not([disabled]),[md2-menu-item]:hover:not([disabled]){background:rgba(0,0,0,.04);text-decoration:none}[md2-menu-item]>[md2-menu-trigger]{display:block;height:36px;width:calc(100% + 32px);margin:0 -16px;padding:0 16px;font:inherit;color:inherit;text-align:left;background:0 0;outline:0;border:0;cursor:pointer;box-shadow:none}.md-overlay-container{position:fixed;pointer-events:none;top:0;left:0;height:100%;width:100%;z-index:1000}.md-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.md-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.md-overlay-transparent-backdrop{background:0 0}.md-overlay-backdrop.md-overlay-backdrop-showing{opacity:.48}"]
                }] }
    ];
    return Md2Menu;
}());
export { Md2Menu };
var Md2MenuModule = /** @class */ (function () {
    function Md2MenuModule() {
    }
    Md2MenuModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
                    declarations: [Md2Menu, Md2MenuContent, Md2MenuItem, Md2MenuTrigger],
                },] }
    ];
    return Md2MenuModule;
}());
export { Md2MenuModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL21lbnUvbWVudS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztnQkFHL0MsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsMkJBQTJCO29CQUVyQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOztrQkFuQkQ7O1NBb0JhLE9BQU87Ozs7O2dCQUVuQixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxjQUFjLENBQUM7b0JBQy9ELFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQztpQkFDckU7O3dCQTFCRDs7U0EyQmEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE5nTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNZDJNZW51Q29udGVudCB9IGZyb20gJy4vbWVudS1jb250ZW50JztcbmltcG9ydCB7IE1kMk1lbnVJdGVtIH0gZnJvbSAnLi9tZW51LWl0ZW0nO1xuaW1wb3J0IHsgTWQyTWVudVRyaWdnZXIgfSBmcm9tICcuL21lbnUtdHJpZ2dlcic7XG5leHBvcnQgeyBNZDJNZW51Q29udGVudCB9IGZyb20gJy4vbWVudS1jb250ZW50JztcbmV4cG9ydCB7IE1kMk1lbnVJdGVtIH0gZnJvbSAnLi9tZW51LWl0ZW0nO1xuZXhwb3J0IHsgTWQyTWVudVRyaWdnZXIgfSBmcm9tICcuL21lbnUtdHJpZ2dlcic7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW21kMi1tZW51XScsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gIHN0eWxlVXJsczogWydtZW51LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWQyTWVudSB7IH1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNZDJNZW51LCBNZDJNZW51Q29udGVudCwgTWQyTWVudUl0ZW0sIE1kMk1lbnVUcmlnZ2VyXSxcbiAgZGVjbGFyYXRpb25zOiBbTWQyTWVudSwgTWQyTWVudUNvbnRlbnQsIE1kMk1lbnVJdGVtLCBNZDJNZW51VHJpZ2dlcl0sXG59KVxuZXhwb3J0IGNsYXNzIE1kMk1lbnVNb2R1bGUgeyB9XG4iXX0=