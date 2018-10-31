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
export class Md2ColorpickerModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb2xvcnBpY2tlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLGNBQWMsRUFBRSwwQkFBMEIsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUd6QywySEFBYyxlQUFlLENBQUM7QUFDOUIsa0VBQWMsY0FBYyxDQUFDO0FBd0I3QixNQUFNOzs7WUFyQkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsYUFBYTtvQkFDYixZQUFZO29CQUNaLFdBQVc7b0JBQ1gsVUFBVTtpQkFDWDtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsY0FBYztvQkFDZCwwQkFBMEI7b0JBQzFCLGFBQWE7aUJBQ2Q7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLGNBQWM7b0JBQ2QsMEJBQTBCO29CQUMxQixhQUFhO2lCQUNkO2dCQUNELFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQzthQUN2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdHlsZU1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgUG9ydGFsTW9kdWxlLCBBMTF5TW9kdWxlIH0gZnJvbSAnLi4vY29yZS9pbmRleCc7XG5pbXBvcnQgeyBNZDJDb2xvcnBpY2tlciwgQ29sb3JwaWNrZXJTbGlkZXJEaXJlY3RpdmUsIFRleHREaXJlY3RpdmUgfSBmcm9tICcuL2NvbG9ycGlja2VyJztcbmltcG9ydCB7IENvbG9yVXRpbCB9IGZyb20gJy4vY29sb3ItdXRpbCc7XG5cblxuZXhwb3J0ICogZnJvbSAnLi9jb2xvcnBpY2tlcic7XG5leHBvcnQgKiBmcm9tICcuL2NvbG9yLXV0aWwnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBQb3J0YWxNb2R1bGUsXG4gICAgU3R5bGVNb2R1bGUsXG4gICAgQTExeU1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1kMkNvbG9ycGlja2VyLFxuICAgIENvbG9ycGlja2VyU2xpZGVyRGlyZWN0aXZlLFxuICAgIFRleHREaXJlY3RpdmVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWQyQ29sb3JwaWNrZXIsXG4gICAgQ29sb3JwaWNrZXJTbGlkZXJEaXJlY3RpdmUsXG4gICAgVGV4dERpcmVjdGl2ZVxuICBdLFxuICBwcm92aWRlcnM6IFtDb2xvclV0aWxdXG59KVxuZXhwb3J0IGNsYXNzIE1kMkNvbG9ycGlja2VyTW9kdWxlIHsgfVxuIl19