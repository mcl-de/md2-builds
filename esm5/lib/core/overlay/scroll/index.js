/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { SCROLL_DISPATCHER_PROVIDER } from './scroll-dispatcher';
import { Scrollable } from './scrollable';
import { PlatformModule } from '../../platform/index';
import { ScrollStrategyOptions } from './scroll-strategy-options';
export { Scrollable } from './scrollable';
export { ScrollDispatcher } from './scroll-dispatcher';
export { ScrollStrategyOptions } from './scroll-strategy-options';
export { RepositionScrollStrategy } from './reposition-scroll-strategy';
export { CloseScrollStrategy } from './close-scroll-strategy';
export { NoopScrollStrategy } from './noop-scroll-strategy';
export { BlockScrollStrategy } from './block-scroll-strategy';
var ScrollDispatchModule = /** @class */ (function () {
    function ScrollDispatchModule() {
    }
    ScrollDispatchModule.decorators = [
        { type: NgModule, args: [{
                    imports: [PlatformModule],
                    exports: [Scrollable],
                    declarations: [Scrollable],
                    providers: [SCROLL_DISPATCHER_PROVIDER, ScrollStrategyOptions],
                },] }
    ];
    return ScrollDispatchModule;
}());
export { ScrollDispatchModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL292ZXJsYXkvc2Nyb2xsL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBRWhFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDeEMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFJckQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDdEUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7Ozs7O2dCQUUzRCxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUN6QixPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7b0JBQ3JCLFlBQVksRUFBRSxDQUFDLFVBQVUsQ0FBQztvQkFDMUIsU0FBUyxFQUFFLENBQUMsMEJBQTBCLEVBQUUscUJBQXFCLENBQUM7aUJBQy9EOzsrQkF0QkQ7O1NBdUJhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTQ1JPTExfRElTUEFUQ0hFUl9QUk9WSURFUn0gZnJvbSAnLi9zY3JvbGwtZGlzcGF0Y2hlcic7XG5pbXBvcnQge1Njcm9sbGFibGV9IGZyb20gJy4vc2Nyb2xsYWJsZSc7XG5pbXBvcnQge1BsYXRmb3JtTW9kdWxlfSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9pbmRleCc7XG5pbXBvcnQge1Njcm9sbFN0cmF0ZWd5T3B0aW9uc30gZnJvbSAnLi9zY3JvbGwtc3RyYXRlZ3ktb3B0aW9ucyc7XG5cbmV4cG9ydCB7U2Nyb2xsYWJsZX0gZnJvbSAnLi9zY3JvbGxhYmxlJztcbmV4cG9ydCB7U2Nyb2xsRGlzcGF0Y2hlcn0gZnJvbSAnLi9zY3JvbGwtZGlzcGF0Y2hlcic7XG5cbi8vIEV4cG9ydCBwcmUtZGVmaW5lZCBzY3JvbGwgc3RyYXRlZ2llcyBhbmQgaW50ZXJmYWNlIHRvIGJ1aWxkIGN1c3RvbSBvbmVzLlxuZXhwb3J0IHtTY3JvbGxTdHJhdGVneX0gZnJvbSAnLi9zY3JvbGwtc3RyYXRlZ3knO1xuZXhwb3J0IHtTY3JvbGxTdHJhdGVneU9wdGlvbnN9IGZyb20gJy4vc2Nyb2xsLXN0cmF0ZWd5LW9wdGlvbnMnO1xuZXhwb3J0IHtSZXBvc2l0aW9uU2Nyb2xsU3RyYXRlZ3l9IGZyb20gJy4vcmVwb3NpdGlvbi1zY3JvbGwtc3RyYXRlZ3knO1xuZXhwb3J0IHtDbG9zZVNjcm9sbFN0cmF0ZWd5fSBmcm9tICcuL2Nsb3NlLXNjcm9sbC1zdHJhdGVneSc7XG5leHBvcnQge05vb3BTY3JvbGxTdHJhdGVneX0gZnJvbSAnLi9ub29wLXNjcm9sbC1zdHJhdGVneSc7XG5leHBvcnQge0Jsb2NrU2Nyb2xsU3RyYXRlZ3l9IGZyb20gJy4vYmxvY2stc2Nyb2xsLXN0cmF0ZWd5JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1BsYXRmb3JtTW9kdWxlXSxcbiAgZXhwb3J0czogW1Njcm9sbGFibGVdLFxuICBkZWNsYXJhdGlvbnM6IFtTY3JvbGxhYmxlXSxcbiAgcHJvdmlkZXJzOiBbU0NST0xMX0RJU1BBVENIRVJfUFJPVklERVIsIFNjcm9sbFN0cmF0ZWd5T3B0aW9uc10sXG59KVxuZXhwb3J0IGNsYXNzIFNjcm9sbERpc3BhdGNoTW9kdWxlIHsgfVxuIl19