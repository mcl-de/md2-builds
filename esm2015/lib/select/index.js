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
export class Md2SelectModule {
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
export { SELECT_ITEM_HEIGHT, SELECT_PANEL_MAX_HEIGHT, SELECT_MAX_OPTIONS_DISPLAYED, SELECT_TRIGGER_HEIGHT, SELECT_ITEM_HEIGHT_ADJUSTMENT, SELECT_PANEL_PADDING_X, SELECT_PANEL_INDENT_PADDING_X, SELECT_MULTIPLE_PANEL_PADDING_X, SELECT_PANEL_PADDING_Y, SELECT_PANEL_VIEWPORT_PADDING, Md2SelectChange, Md2Select } from './select';
export { Md2SelectHeader } from './select-header';
export { Md2OptionSelectionChange, Md2Option, Md2OptionModule } from './option';
export { Md2OptgroupBase, _Md2OptgroupMixinBase, Md2Optgroup } from './optgroup';
export { fadeInContent, transformPanel, transformPlaceholder } from './select-animations';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3QvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFhOUQsTUFBTTs7O1lBVkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixjQUFjO2lCQUNmO2dCQUNELE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQztnQkFDdEUsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQzthQUMzQzs7QUFJRCwyVEFBYyxVQUFVLENBQUM7QUFDekIsZ0NBQWMsaUJBQWlCLENBQUM7QUFDaEMscUVBQWMsVUFBVSxDQUFDO0FBQ3pCLG9FQUFjLFlBQVksQ0FBQztBQUMzQixPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNZDJTZWxlY3QgfSBmcm9tICcuL3NlbGVjdCc7XG5pbXBvcnQgeyBNZDJTZWxlY3RIZWFkZXIgfSBmcm9tICcuL3NlbGVjdC1oZWFkZXInO1xuaW1wb3J0IHsgTWQyT3B0aW9uTW9kdWxlIH0gZnJvbSAnLi9vcHRpb24nO1xuaW1wb3J0IHsgTWRDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUgfSBmcm9tICcuLi9jb3JlL2luZGV4JztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgTWQyT3B0aW9uTW9kdWxlLFxuICAgIE1kQ29tbW9uTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbTWQyU2VsZWN0LCBNZDJTZWxlY3RIZWFkZXIsIE1kMk9wdGlvbk1vZHVsZSwgTWRDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNZDJTZWxlY3QsIE1kMlNlbGVjdEhlYWRlcl0sXG59KVxuZXhwb3J0IGNsYXNzIE1kMlNlbGVjdE1vZHVsZSB7IH1cblxuXG5leHBvcnQgKiBmcm9tICcuL3NlbGVjdCc7XG5leHBvcnQgKiBmcm9tICcuL3NlbGVjdC1oZWFkZXInO1xuZXhwb3J0ICogZnJvbSAnLi9vcHRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi9vcHRncm91cCc7XG5leHBvcnQgeyBmYWRlSW5Db250ZW50LCB0cmFuc2Zvcm1QYW5lbCwgdHJhbnNmb3JtUGxhY2Vob2xkZXIgfSBmcm9tICcuL3NlbGVjdC1hbmltYXRpb25zJztcbiJdfQ==