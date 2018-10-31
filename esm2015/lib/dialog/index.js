/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, MdCommonModule } from '../core/index';
import { PlatformModule } from '../core/platform/index';
import { Md2Dialog, Md2DialogTitle, Md2DialogContent, Md2DialogActions, Md2DialogPortal } from './dialog';
export class Md2DialogModule {
}
Md2DialogModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, OverlayModule, MdCommonModule, PlatformModule],
                exports: [
                    Md2Dialog,
                    Md2DialogTitle,
                    Md2DialogContent,
                    Md2DialogActions,
                    Md2DialogPortal
                ],
                declarations: [
                    Md2Dialog,
                    Md2DialogTitle,
                    Md2DialogContent,
                    Md2DialogActions,
                    Md2DialogPortal
                ]
            },] }
];
export { Md2DialogConfig, Md2DialogPortal, Md2DialogTitle, Md2DialogContent, Md2DialogActions, Md2Dialog } from './dialog';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9kaWFsb2cvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQ0wsU0FBUyxFQUNULGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDaEIsTUFBTSxVQUFVLENBQUM7QUFvQmxCLE1BQU07OztZQWpCTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFDO2dCQUN0RSxPQUFPLEVBQUU7b0JBQ1AsU0FBUztvQkFDVCxjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixlQUFlO2lCQUNoQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osU0FBUztvQkFDVCxjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO29CQUNoQixlQUFlO2lCQUNoQjthQUNGOztBQUlELGdIQUFjLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSwgTWRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb3JlL2luZGV4JztcbmltcG9ydCB7IFBsYXRmb3JtTW9kdWxlIH0gZnJvbSAnLi4vY29yZS9wbGF0Zm9ybS9pbmRleCc7XG5pbXBvcnQge1xuICBNZDJEaWFsb2csXG4gIE1kMkRpYWxvZ1RpdGxlLFxuICBNZDJEaWFsb2dDb250ZW50LFxuICBNZDJEaWFsb2dBY3Rpb25zLFxuICBNZDJEaWFsb2dQb3J0YWxcbn0gZnJvbSAnLi9kaWFsb2cnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE1kQ29tbW9uTW9kdWxlLCBQbGF0Zm9ybU1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBNZDJEaWFsb2csXG4gICAgTWQyRGlhbG9nVGl0bGUsXG4gICAgTWQyRGlhbG9nQ29udGVudCxcbiAgICBNZDJEaWFsb2dBY3Rpb25zLFxuICAgIE1kMkRpYWxvZ1BvcnRhbFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNZDJEaWFsb2csXG4gICAgTWQyRGlhbG9nVGl0bGUsXG4gICAgTWQyRGlhbG9nQ29udGVudCxcbiAgICBNZDJEaWFsb2dBY3Rpb25zLFxuICAgIE1kMkRpYWxvZ1BvcnRhbFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1kMkRpYWxvZ01vZHVsZSB7IH1cblxuXG5leHBvcnQgKiBmcm9tICcuL2RpYWxvZyc7XG4iXX0=