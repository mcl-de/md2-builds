/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Md2Select } from './select';
import { Md2SelectHeader } from './select-header';
import { Md2OptionModule } from './option';
import { MdCommonModule, OverlayModule } from '../core/index';
var Md2SelectModule = /** @class */ (function () {
    function Md2SelectModule() {
    }
    Md2SelectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        Md2OptionModule,
                        MdCommonModule,
                    ],
                    exports: [Md2Select, Md2SelectHeader, Md2OptionModule, MdCommonModule],
                    declarations: [Md2Select, Md2SelectHeader],
                },] }
    ];
    return Md2SelectModule;
}());
export { Md2SelectModule };
export { SELECT_ITEM_HEIGHT, SELECT_PANEL_MAX_HEIGHT, SELECT_MAX_OPTIONS_DISPLAYED, SELECT_TRIGGER_HEIGHT, SELECT_ITEM_HEIGHT_ADJUSTMENT, SELECT_PANEL_PADDING_X, SELECT_PANEL_INDENT_PADDING_X, SELECT_MULTIPLE_PANEL_PADDING_X, SELECT_PANEL_PADDING_Y, SELECT_PANEL_VIEWPORT_PADDING, Md2SelectChange, Md2Select } from './select';
export { Md2SelectHeader } from './select-header';
export { Md2OptionSelectionChange, Md2Option, Md2OptionModule } from './option';
export { Md2OptgroupBase, _Md2OptgroupMixinBase, Md2Optgroup } from './optgroup';
export { fadeInContent, transformPanel, transformPlaceholder } from './select-animations';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3QvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O2dCQUc3RCxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixlQUFlO3dCQUNmLGNBQWM7cUJBQ2Y7b0JBQ0QsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDO29CQUN0RSxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDO2lCQUMzQzs7MEJBakJEOztTQWtCYSxlQUFlO0FBRzVCLDJUQUFjLFVBQVUsQ0FBQztBQUN6QixnQ0FBYyxpQkFBaUIsQ0FBQztBQUNoQyxxRUFBYyxVQUFVLENBQUM7QUFDekIsb0VBQWMsWUFBWSxDQUFDO0FBQzNCLE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1kMlNlbGVjdCB9IGZyb20gJy4vc2VsZWN0JztcbmltcG9ydCB7IE1kMlNlbGVjdEhlYWRlciB9IGZyb20gJy4vc2VsZWN0LWhlYWRlcic7XG5pbXBvcnQgeyBNZDJPcHRpb25Nb2R1bGUgfSBmcm9tICcuL29wdGlvbic7XG5pbXBvcnQgeyBNZENvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZSB9IGZyb20gJy4uL2NvcmUvaW5kZXgnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBNZDJPcHRpb25Nb2R1bGUsXG4gICAgTWRDb21tb25Nb2R1bGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtNZDJTZWxlY3QsIE1kMlNlbGVjdEhlYWRlciwgTWQyT3B0aW9uTW9kdWxlLCBNZENvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW01kMlNlbGVjdCwgTWQyU2VsZWN0SGVhZGVyXSxcbn0pXG5leHBvcnQgY2xhc3MgTWQyU2VsZWN0TW9kdWxlIHsgfVxuXG5cbmV4cG9ydCAqIGZyb20gJy4vc2VsZWN0JztcbmV4cG9ydCAqIGZyb20gJy4vc2VsZWN0LWhlYWRlcic7XG5leHBvcnQgKiBmcm9tICcuL29wdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL29wdGdyb3VwJztcbmV4cG9ydCB7IGZhZGVJbkNvbnRlbnQsIHRyYW5zZm9ybVBhbmVsLCB0cmFuc2Zvcm1QbGFjZWhvbGRlciB9IGZyb20gJy4vc2VsZWN0LWFuaW1hdGlvbnMnO1xuIl19