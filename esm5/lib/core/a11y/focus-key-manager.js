/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ListKeyManager } from './list-key-manager';
/**
 * This is the interface for focusable items (used by the FocusKeyManager).
 * Each item must know how to focus itself and whether or not it is currently disabled.
 * @record
 */
export function Focusable() { }
/** @type {?} */
Focusable.prototype.focus;
var FocusKeyManager = /** @class */ (function (_super) {
    tslib_1.__extends(FocusKeyManager, _super);
    function FocusKeyManager(items) {
        return _super.call(this, items) || this;
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     */
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     * @param {?} index
     * @return {?}
     */
    FocusKeyManager.prototype.setActiveItem = /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     * @param {?} index
     * @return {?}
     */
    function (index) {
        _super.prototype.setActiveItem.call(this, index);
        if (this.activeItem) {
            this.activeItem.focus();
        }
    };
    return FocusKeyManager;
}(ListKeyManager));
export { FocusKeyManager };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMta2V5LW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2ExMXkvZm9jdXMta2V5LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUMsY0FBYyxFQUFhLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7OztBQVc5RCxJQUFBO0lBQXFDLDJDQUF5QjtJQUU1RCx5QkFBWSxLQUEyQjtlQUNyQyxrQkFBTSxLQUFLLENBQUM7S0FDYjtJQUVEOzs7T0FHRzs7Ozs7OztJQUNILHVDQUFhOzs7Ozs7SUFBYixVQUFjLEtBQWE7UUFDekIsaUJBQU0sYUFBYSxZQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3pCO0tBQ0Y7MEJBN0JIO0VBYXFDLGNBQWMsRUFrQmxELENBQUE7QUFsQkQsMkJBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1F1ZXJ5TGlzdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xpc3RLZXlNYW5hZ2VyLCBDYW5EaXNhYmxlfSBmcm9tICcuL2xpc3Qta2V5LW1hbmFnZXInO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGludGVyZmFjZSBmb3IgZm9jdXNhYmxlIGl0ZW1zICh1c2VkIGJ5IHRoZSBGb2N1c0tleU1hbmFnZXIpLlxuICogRWFjaCBpdGVtIG11c3Qga25vdyBob3cgdG8gZm9jdXMgaXRzZWxmIGFuZCB3aGV0aGVyIG9yIG5vdCBpdCBpcyBjdXJyZW50bHkgZGlzYWJsZWQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRm9jdXNhYmxlIGV4dGVuZHMgQ2FuRGlzYWJsZSB7XG4gIGZvY3VzKCk6IHZvaWQ7XG59XG5cblxuZXhwb3J0IGNsYXNzIEZvY3VzS2V5TWFuYWdlciBleHRlbmRzIExpc3RLZXlNYW5hZ2VyPEZvY3VzYWJsZT4ge1xuXG4gIGNvbnN0cnVjdG9yKGl0ZW1zOiBRdWVyeUxpc3Q8Rm9jdXNhYmxlPikge1xuICAgIHN1cGVyKGl0ZW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXRzIHRoZSBhY3RpdmUgaXRlbSB0byB0aGUgaXRlbSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgKiBJdCBhbHNvIGFkZHMgZm9jdXNlcyB0aGUgbmV3bHkgYWN0aXZlIGl0ZW0uXG4gICAqL1xuICBzZXRBY3RpdmVJdGVtKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBzdXBlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcblxuICAgIGlmICh0aGlzLmFjdGl2ZUl0ZW0pIHtcbiAgICAgIHRoaXMuYWN0aXZlSXRlbS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=