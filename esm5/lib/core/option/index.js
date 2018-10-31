/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdRippleModule } from '../ripple/index';
import { MdSelectionModule } from '../selection/index';
import { MdOption } from './option';
import { MdOptgroup } from './optgroup';
var MdOptionModule = /** @class */ (function () {
    function MdOptionModule() {
    }
    MdOptionModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MdRippleModule, CommonModule, MdSelectionModule],
                    exports: [MdOption, MdOptgroup],
                    declarations: [MdOption, MdOptgroup]
                },] }
    ];
    return MdOptionModule;
}());
export { MdOptionModule };
export { MdOptionSelectionChange, MdOption } from './option';
export { MdOptgroupBase, _MdOptgroupMixinBase, MdOptgroup } from './optgroup';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL29wdGlvbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFlBQVksQ0FBQzs7Ozs7Z0JBR3JDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixDQUFDO29CQUMxRCxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO29CQUMvQixZQUFZLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO2lCQUNyQzs7eUJBWkQ7O1NBYWEsY0FBYztBQUczQixrREFBYyxVQUFVLENBQUM7QUFDekIsaUVBQWMsWUFBWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TWRSaXBwbGVNb2R1bGV9IGZyb20gJy4uL3JpcHBsZS9pbmRleCc7XG5pbXBvcnQge01kU2VsZWN0aW9uTW9kdWxlfSBmcm9tICcuLi9zZWxlY3Rpb24vaW5kZXgnO1xuaW1wb3J0IHtNZE9wdGlvbn0gZnJvbSAnLi9vcHRpb24nO1xuaW1wb3J0IHtNZE9wdGdyb3VwfSBmcm9tICcuL29wdGdyb3VwJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTWRSaXBwbGVNb2R1bGUsIENvbW1vbk1vZHVsZSwgTWRTZWxlY3Rpb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbTWRPcHRpb24sIE1kT3B0Z3JvdXBdLFxuICBkZWNsYXJhdGlvbnM6IFtNZE9wdGlvbiwgTWRPcHRncm91cF1cbn0pXG5leHBvcnQgY2xhc3MgTWRPcHRpb25Nb2R1bGUge31cblxuXG5leHBvcnQgKiBmcm9tICcuL29wdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL29wdGdyb3VwJztcbiJdfQ==