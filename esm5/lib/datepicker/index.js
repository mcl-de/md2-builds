/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleModule, OverlayModule, PortalModule, A11yModule } from '../core/index';
import { Md2Datepicker, Md2DatepickerContent } from './datepicker';
import { Md2DatepickerToggle } from './datepicker-toggle';
import { Md2Calendar } from './calendar';
import { Md2MonthView } from './month-view';
import { Md2YearView } from './year-view';
import { Md2CalendarBody } from './calendar-body';
import { Md2Clock } from './clock';
import { DateLocale } from './date-locale';
import { DateUtil } from './date-util';
export { Md2DateChange, Md2DatepickerContent, MD2_DATEPICKER_VALUE_ACCESSOR, MD2_DATEPICKER_VALIDATORS, Md2Datepicker } from './datepicker';
export { Md2MonthView } from './month-view';
export { Md2YearView } from './year-view';
export { Md2CalendarCell, Md2CalendarBody } from './calendar-body';
export { CLOCK_RADIUS, CLOCK_INNER_RADIUS, CLOCK_OUTER_RADIUS, CLOCK_TICK_RADIUS, Md2Clock } from './clock';
export { DateLocale } from './date-locale';
export { DateUtil } from './date-util';
var Md2DatepickerModule = /** @class */ (function () {
    function Md2DatepickerModule() {
    }
    Md2DatepickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        PortalModule,
                        StyleModule,
                        A11yModule,
                    ],
                    exports: [
                        Md2Datepicker,
                        Md2DatepickerToggle,
                        Md2Calendar,
                        Md2CalendarBody,
                        Md2Calendar,
                        Md2MonthView,
                        Md2YearView,
                        Md2CalendarBody,
                        Md2Clock,
                    ],
                    declarations: [
                        Md2Datepicker,
                        Md2DatepickerContent,
                        Md2DatepickerToggle,
                        Md2Calendar,
                        Md2MonthView,
                        Md2YearView,
                        Md2CalendarBody,
                        Md2Clock,
                    ],
                    providers: [DateLocale, DateUtil],
                    entryComponents: [
                        Md2DatepickerContent
                    ]
                },] }
    ];
    return Md2DatepickerModule;
}());
export { Md2DatepickerModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9kYXRlcGlja2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDbkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3ZDLDZIQUFjLGNBQWMsQ0FBQztBQUM3Qiw2QkFBYyxjQUFjLENBQUM7QUFDN0IsNEJBQWMsYUFBYSxDQUFDO0FBQzVCLGlEQUFjLGlCQUFpQixDQUFDO0FBQ2hDLGtHQUFjLFNBQVMsQ0FBQztBQUN4QiwyQkFBYyxlQUFlLENBQUM7QUFDOUIseUJBQWMsYUFBYSxDQUFDOzs7OztnQkFHM0IsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixXQUFXO3dCQUNYLFVBQVU7cUJBQ1g7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGFBQWE7d0JBQ2IsbUJBQW1CO3dCQUNuQixXQUFXO3dCQUNYLGVBQWU7d0JBQ2YsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsZUFBZTt3QkFDZixRQUFRO3FCQUNUO29CQUNELFlBQVksRUFBRTt3QkFDWixhQUFhO3dCQUNiLG9CQUFvQjt3QkFDcEIsbUJBQW1CO3dCQUNuQixXQUFXO3dCQUNYLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxlQUFlO3dCQUNmLFFBQVE7cUJBQ1Q7b0JBQ0QsU0FBUyxFQUFFLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQztvQkFDakMsZUFBZSxFQUFFO3dCQUNmLG9CQUFvQjtxQkFDckI7aUJBQ0Y7OzhCQXhERDs7U0F5RGEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTdHlsZU1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgUG9ydGFsTW9kdWxlLCBBMTF5TW9kdWxlIH0gZnJvbSAnLi4vY29yZS9pbmRleCc7XG5pbXBvcnQgeyBNZDJEYXRlcGlja2VyLCBNZDJEYXRlcGlja2VyQ29udGVudCB9IGZyb20gJy4vZGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBNZDJEYXRlcGlja2VyVG9nZ2xlIH0gZnJvbSAnLi9kYXRlcGlja2VyLXRvZ2dsZSc7XG5pbXBvcnQgeyBNZDJDYWxlbmRhciB9IGZyb20gJy4vY2FsZW5kYXInO1xuaW1wb3J0IHsgTWQyTW9udGhWaWV3IH0gZnJvbSAnLi9tb250aC12aWV3JztcbmltcG9ydCB7IE1kMlllYXJWaWV3IH0gZnJvbSAnLi95ZWFyLXZpZXcnO1xuaW1wb3J0IHsgTWQyQ2FsZW5kYXJCb2R5IH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5JztcbmltcG9ydCB7IE1kMkNsb2NrIH0gZnJvbSAnLi9jbG9jayc7XG5pbXBvcnQgeyBEYXRlTG9jYWxlIH0gZnJvbSAnLi9kYXRlLWxvY2FsZSc7XG5pbXBvcnQgeyBEYXRlVXRpbCB9IGZyb20gJy4vZGF0ZS11dGlsJztcblxuXG5leHBvcnQgKiBmcm9tICcuL2RhdGVwaWNrZXInO1xuZXhwb3J0ICogZnJvbSAnLi9tb250aC12aWV3JztcbmV4cG9ydCAqIGZyb20gJy4veWVhci12aWV3JztcbmV4cG9ydCAqIGZyb20gJy4vY2FsZW5kYXItYm9keSc7XG5leHBvcnQgKiBmcm9tICcuL2Nsb2NrJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZS1sb2NhbGUnO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRlLXV0aWwnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBQb3J0YWxNb2R1bGUsXG4gICAgU3R5bGVNb2R1bGUsXG4gICAgQTExeU1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE1kMkRhdGVwaWNrZXIsXG4gICAgTWQyRGF0ZXBpY2tlclRvZ2dsZSxcbiAgICBNZDJDYWxlbmRhcixcbiAgICBNZDJDYWxlbmRhckJvZHksXG4gICAgTWQyQ2FsZW5kYXIsXG4gICAgTWQyTW9udGhWaWV3LFxuICAgIE1kMlllYXJWaWV3LFxuICAgIE1kMkNhbGVuZGFyQm9keSxcbiAgICBNZDJDbG9jayxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWQyRGF0ZXBpY2tlcixcbiAgICBNZDJEYXRlcGlja2VyQ29udGVudCxcbiAgICBNZDJEYXRlcGlja2VyVG9nZ2xlLFxuICAgIE1kMkNhbGVuZGFyLFxuICAgIE1kMk1vbnRoVmlldyxcbiAgICBNZDJZZWFyVmlldyxcbiAgICBNZDJDYWxlbmRhckJvZHksXG4gICAgTWQyQ2xvY2ssXG4gIF0sXG4gIHByb3ZpZGVyczogW0RhdGVMb2NhbGUsIERhdGVVdGlsXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgTWQyRGF0ZXBpY2tlckNvbnRlbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBNZDJEYXRlcGlja2VyTW9kdWxlIHsgfVxuIl19