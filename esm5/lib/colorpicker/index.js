/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StyleModule, OverlayModule, PortalModule, A11yModule } from '../core/index';
import { Md2Colorpicker, ColorpickerSliderDirective, TextDirective } from './colorpicker';
import { ColorUtil } from './color-util';
export { SliderPosition, SliderDimension, TextDirective, ColorpickerSliderDirective, Md2ColorChange, Md2Colorpicker } from './colorpicker';
export { COLOR_RGB, COLOR_HSL, Hsva, Hsla, Rgba, ColorUtil } from './color-util';
var Md2ColorpickerModule = /** @class */ (function () {
    function Md2ColorpickerModule() {
    }
    Md2ColorpickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        OverlayModule,
                        PortalModule,
                        StyleModule,
                        A11yModule,
                    ],
                    exports: [
                        Md2Colorpicker,
                        ColorpickerSliderDirective,
                        TextDirective
                    ],
                    declarations: [
                        Md2Colorpicker,
                        ColorpickerSliderDirective,
                        TextDirective
                    ],
                    providers: [ColorUtil]
                },] }
    ];
    return Md2ColorpickerModule;
}());
export { Md2ColorpickerModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb2xvcnBpY2tlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLGNBQWMsRUFBRSwwQkFBMEIsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUd6QywySEFBYyxlQUFlLENBQUM7QUFDOUIsa0VBQWMsY0FBYyxDQUFDOzs7OztnQkFHNUIsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsYUFBYTt3QkFDYixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsVUFBVTtxQkFDWDtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsY0FBYzt3QkFDZCwwQkFBMEI7d0JBQzFCLGFBQWE7cUJBQ2Q7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGNBQWM7d0JBQ2QsMEJBQTBCO3dCQUMxQixhQUFhO3FCQUNkO29CQUNELFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDdkI7OytCQWhDRDs7U0FpQ2Esb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN0eWxlTW9kdWxlLCBPdmVybGF5TW9kdWxlLCBQb3J0YWxNb2R1bGUsIEExMXlNb2R1bGUgfSBmcm9tICcuLi9jb3JlL2luZGV4JztcbmltcG9ydCB7IE1kMkNvbG9ycGlja2VyLCBDb2xvcnBpY2tlclNsaWRlckRpcmVjdGl2ZSwgVGV4dERpcmVjdGl2ZSB9IGZyb20gJy4vY29sb3JwaWNrZXInO1xuaW1wb3J0IHsgQ29sb3JVdGlsIH0gZnJvbSAnLi9jb2xvci11dGlsJztcblxuXG5leHBvcnQgKiBmcm9tICcuL2NvbG9ycGlja2VyJztcbmV4cG9ydCAqIGZyb20gJy4vY29sb3ItdXRpbCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBPdmVybGF5TW9kdWxlLFxuICAgIFBvcnRhbE1vZHVsZSxcbiAgICBTdHlsZU1vZHVsZSxcbiAgICBBMTF5TW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgTWQyQ29sb3JwaWNrZXIsXG4gICAgQ29sb3JwaWNrZXJTbGlkZXJEaXJlY3RpdmUsXG4gICAgVGV4dERpcmVjdGl2ZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNZDJDb2xvcnBpY2tlcixcbiAgICBDb2xvcnBpY2tlclNsaWRlckRpcmVjdGl2ZSxcbiAgICBUZXh0RGlyZWN0aXZlXG4gIF0sXG4gIHByb3ZpZGVyczogW0NvbG9yVXRpbF1cbn0pXG5leHBvcnQgY2xhc3MgTWQyQ29sb3JwaWNrZXJNb2R1bGUgeyB9XG4iXX0=