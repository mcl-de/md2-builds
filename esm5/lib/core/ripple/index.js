/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { MdRipple } from './ripple';
import { MdCommonModule } from '../common-behaviors/common-module';
import { VIEWPORT_RULER_PROVIDER } from '../overlay/position/viewport-ruler';
import { ScrollDispatchModule } from '../overlay/scroll/index';
import { PlatformModule } from '../platform/index';
export { MdRipple, MD_RIPPLE_GLOBAL_OPTIONS } from './ripple';
export { RippleRef, RippleState } from './ripple-ref';
export { RIPPLE_FADE_IN_DURATION, RIPPLE_FADE_OUT_DURATION } from './ripple-renderer';
var MdRippleModule = /** @class */ (function () {
    function MdRippleModule() {
    }
    MdRippleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MdCommonModule, PlatformModule, ScrollDispatchModule],
                    exports: [MdRipple, MdCommonModule],
                    declarations: [MdRipple],
                    providers: [VIEWPORT_RULER_PROVIDER],
                },] }
    ];
    return MdRippleModule;
}());
export { MdRippleModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL3JpcHBsZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxFQUFDLFFBQVEsRUFBdUIsd0JBQXdCLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDakYsT0FBTyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDcEQsT0FBTyxFQUFlLHVCQUF1QixFQUFFLHdCQUF3QixFQUFDLE1BQU0sbUJBQW1CLENBQUM7Ozs7O2dCQUVqRyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsQ0FBQztvQkFDL0QsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQztvQkFDbkMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUN4QixTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDckM7O3lCQWhCRDs7U0FpQmEsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNZFJpcHBsZX0gZnJvbSAnLi9yaXBwbGUnO1xuaW1wb3J0IHtNZENvbW1vbk1vZHVsZX0gZnJvbSAnLi4vY29tbW9uLWJlaGF2aW9ycy9jb21tb24tbW9kdWxlJztcbmltcG9ydCB7VklFV1BPUlRfUlVMRVJfUFJPVklERVJ9IGZyb20gJy4uL292ZXJsYXkvcG9zaXRpb24vdmlld3BvcnQtcnVsZXInO1xuaW1wb3J0IHtTY3JvbGxEaXNwYXRjaE1vZHVsZX0gZnJvbSAnLi4vb3ZlcmxheS9zY3JvbGwvaW5kZXgnO1xuaW1wb3J0IHtQbGF0Zm9ybU1vZHVsZX0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXgnO1xuXG5leHBvcnQge01kUmlwcGxlLCBSaXBwbGVHbG9iYWxPcHRpb25zLCBNRF9SSVBQTEVfR0xPQkFMX09QVElPTlN9IGZyb20gJy4vcmlwcGxlJztcbmV4cG9ydCB7UmlwcGxlUmVmLCBSaXBwbGVTdGF0ZX0gZnJvbSAnLi9yaXBwbGUtcmVmJztcbmV4cG9ydCB7UmlwcGxlQ29uZmlnLCBSSVBQTEVfRkFERV9JTl9EVVJBVElPTiwgUklQUExFX0ZBREVfT1VUX0RVUkFUSU9OfSBmcm9tICcuL3JpcHBsZS1yZW5kZXJlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNZENvbW1vbk1vZHVsZSwgUGxhdGZvcm1Nb2R1bGUsIFNjcm9sbERpc3BhdGNoTW9kdWxlXSxcbiAgZXhwb3J0czogW01kUmlwcGxlLCBNZENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW01kUmlwcGxlXSxcbiAgcHJvdmlkZXJzOiBbVklFV1BPUlRfUlVMRVJfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBNZFJpcHBsZU1vZHVsZSB7fVxuIl19