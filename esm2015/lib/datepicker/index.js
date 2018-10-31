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
export class Md2DatepickerModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9kYXRlcGlja2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDbkUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbkMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBR3ZDLDZIQUFjLGNBQWMsQ0FBQztBQUM3Qiw2QkFBYyxjQUFjLENBQUM7QUFDN0IsNEJBQWMsYUFBYSxDQUFDO0FBQzVCLGlEQUFjLGlCQUFpQixDQUFDO0FBQ2hDLGtHQUFjLFNBQVMsQ0FBQztBQUN4QiwyQkFBYyxlQUFlLENBQUM7QUFDOUIseUJBQWMsYUFBYSxDQUFDO0FBcUM1QixNQUFNOzs7WUFsQ0wsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixXQUFXO29CQUNYLFVBQVU7aUJBQ1g7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGFBQWE7b0JBQ2IsbUJBQW1CO29CQUNuQixXQUFXO29CQUNYLGVBQWU7b0JBQ2YsV0FBVztvQkFDWCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsZUFBZTtvQkFDZixRQUFRO2lCQUNUO2dCQUNELFlBQVksRUFBRTtvQkFDWixhQUFhO29CQUNiLG9CQUFvQjtvQkFDcEIsbUJBQW1CO29CQUNuQixXQUFXO29CQUNYLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxlQUFlO29CQUNmLFFBQVE7aUJBQ1Q7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQztnQkFDakMsZUFBZSxFQUFFO29CQUNmLG9CQUFvQjtpQkFDckI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgU3R5bGVNb2R1bGUsIE92ZXJsYXlNb2R1bGUsIFBvcnRhbE1vZHVsZSwgQTExeU1vZHVsZSB9IGZyb20gJy4uL2NvcmUvaW5kZXgnO1xuaW1wb3J0IHsgTWQyRGF0ZXBpY2tlciwgTWQyRGF0ZXBpY2tlckNvbnRlbnQgfSBmcm9tICcuL2RhdGVwaWNrZXInO1xuaW1wb3J0IHsgTWQyRGF0ZXBpY2tlclRvZ2dsZSB9IGZyb20gJy4vZGF0ZXBpY2tlci10b2dnbGUnO1xuaW1wb3J0IHsgTWQyQ2FsZW5kYXIgfSBmcm9tICcuL2NhbGVuZGFyJztcbmltcG9ydCB7IE1kMk1vbnRoVmlldyB9IGZyb20gJy4vbW9udGgtdmlldyc7XG5pbXBvcnQgeyBNZDJZZWFyVmlldyB9IGZyb20gJy4veWVhci12aWV3JztcbmltcG9ydCB7IE1kMkNhbGVuZGFyQm9keSB9IGZyb20gJy4vY2FsZW5kYXItYm9keSc7XG5pbXBvcnQgeyBNZDJDbG9jayB9IGZyb20gJy4vY2xvY2snO1xuaW1wb3J0IHsgRGF0ZUxvY2FsZSB9IGZyb20gJy4vZGF0ZS1sb2NhbGUnO1xuaW1wb3J0IHsgRGF0ZVV0aWwgfSBmcm9tICcuL2RhdGUtdXRpbCc7XG5cblxuZXhwb3J0ICogZnJvbSAnLi9kYXRlcGlja2VyJztcbmV4cG9ydCAqIGZyb20gJy4vbW9udGgtdmlldyc7XG5leHBvcnQgKiBmcm9tICcuL3llYXItdmlldyc7XG5leHBvcnQgKiBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xuZXhwb3J0ICogZnJvbSAnLi9jbG9jayc7XG5leHBvcnQgKiBmcm9tICcuL2RhdGUtbG9jYWxlJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZS11dGlsJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgUG9ydGFsTW9kdWxlLFxuICAgIFN0eWxlTW9kdWxlLFxuICAgIEExMXlNb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBNZDJEYXRlcGlja2VyLFxuICAgIE1kMkRhdGVwaWNrZXJUb2dnbGUsXG4gICAgTWQyQ2FsZW5kYXIsXG4gICAgTWQyQ2FsZW5kYXJCb2R5LFxuICAgIE1kMkNhbGVuZGFyLFxuICAgIE1kMk1vbnRoVmlldyxcbiAgICBNZDJZZWFyVmlldyxcbiAgICBNZDJDYWxlbmRhckJvZHksXG4gICAgTWQyQ2xvY2ssXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1kMkRhdGVwaWNrZXIsXG4gICAgTWQyRGF0ZXBpY2tlckNvbnRlbnQsXG4gICAgTWQyRGF0ZXBpY2tlclRvZ2dsZSxcbiAgICBNZDJDYWxlbmRhcixcbiAgICBNZDJNb250aFZpZXcsXG4gICAgTWQyWWVhclZpZXcsXG4gICAgTWQyQ2FsZW5kYXJCb2R5LFxuICAgIE1kMkNsb2NrLFxuICBdLFxuICBwcm92aWRlcnM6IFtEYXRlTG9jYWxlLCBEYXRlVXRpbF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIE1kMkRhdGVwaWNrZXJDb250ZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWQyRGF0ZXBpY2tlck1vZHVsZSB7IH1cbiJdfQ==