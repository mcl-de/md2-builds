/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { OverlayModule, MdCommonModule, PlatformModule } from '../core/index';
import { Md2Tooltip, Md2TooltipComponent } from './tooltip';
var Md2TooltipModule = /** @class */ (function () {
    function Md2TooltipModule() {
    }
    Md2TooltipModule.decorators = [
        { type: NgModule, args: [{
                    imports: [OverlayModule, MdCommonModule, PlatformModule],
                    exports: [Md2Tooltip, Md2TooltipComponent, MdCommonModule],
                    declarations: [Md2Tooltip, Md2TooltipComponent],
                    entryComponents: [Md2TooltipComponent],
                },] }
    ];
    return Md2TooltipModule;
}());
export { Md2TooltipModule };
export { throwMd2TooltipInvalidPositionError, TOUCHEND_HIDE_DELAY, SCROLL_THROTTLE_MS, Md2Tooltip, Md2TooltipComponent } from './tooltip';

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi90b29sdGlwL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RSxPQUFPLEVBQUMsVUFBVSxFQUFFLG1CQUFtQixFQUFDLE1BQU0sV0FBVyxDQUFDOzs7OztnQkFHekQsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFDO29CQUN4RCxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxDQUFDO29CQUMxRCxZQUFZLEVBQUUsQ0FBQyxVQUFVLEVBQUUsbUJBQW1CLENBQUM7b0JBQy9DLGVBQWUsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUN2Qzs7MkJBVkQ7O1NBV2EsZ0JBQWdCO0FBRzdCLDhIQUFjLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPdmVybGF5TW9kdWxlLCBNZENvbW1vbk1vZHVsZSwgUGxhdGZvcm1Nb2R1bGV9IGZyb20gJy4uL2NvcmUvaW5kZXgnO1xuaW1wb3J0IHtNZDJUb29sdGlwLCBNZDJUb29sdGlwQ29tcG9uZW50fSBmcm9tICcuL3Rvb2x0aXAnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtPdmVybGF5TW9kdWxlLCBNZENvbW1vbk1vZHVsZSwgUGxhdGZvcm1Nb2R1bGVdLFxuICBleHBvcnRzOiBbTWQyVG9vbHRpcCwgTWQyVG9vbHRpcENvbXBvbmVudCwgTWRDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtNZDJUb29sdGlwLCBNZDJUb29sdGlwQ29tcG9uZW50XSxcbiAgZW50cnlDb21wb25lbnRzOiBbTWQyVG9vbHRpcENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE1kMlRvb2x0aXBNb2R1bGUge31cblxuXG5leHBvcnQgKiBmcm9tICcuL3Rvb2x0aXAnO1xuIl19