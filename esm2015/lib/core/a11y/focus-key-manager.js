/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ListKeyManager } from './list-key-manager';
/**
 * This is the interface for focusable items (used by the FocusKeyManager).
 * Each item must know how to focus itself and whether or not it is currently disabled.
 * @record
 */
export function Focusable() { }
/** @type {?} */
Focusable.prototype.focus;
export class FocusKeyManager extends ListKeyManager {
    /**
     * @param {?} items
     */
    constructor(items) {
        super(items);
    }
    /**
     * This method sets the active item to the item at the specified index.
     * It also adds focuses the newly active item.
     * @param {?} index
     * @return {?}
     */
    setActiveItem(index) {
        super.setActiveItem(index);
        if (this.activeItem) {
            this.activeItem.focus();
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMta2V5LW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2ExMXkvZm9jdXMta2V5LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE9BQU8sRUFBQyxjQUFjLEVBQWEsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7Ozs7O0FBVzlELE1BQU0sc0JBQXVCLFNBQVEsY0FBeUI7Ozs7SUFFNUQsWUFBWSxLQUEyQjtRQUNyQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDZDs7Ozs7OztJQU1ELGFBQWEsQ0FBQyxLQUFhO1FBQ3pCLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDekI7S0FDRjtDQUVGIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1F1ZXJ5TGlzdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0xpc3RLZXlNYW5hZ2VyLCBDYW5EaXNhYmxlfSBmcm9tICcuL2xpc3Qta2V5LW1hbmFnZXInO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIGludGVyZmFjZSBmb3IgZm9jdXNhYmxlIGl0ZW1zICh1c2VkIGJ5IHRoZSBGb2N1c0tleU1hbmFnZXIpLlxuICogRWFjaCBpdGVtIG11c3Qga25vdyBob3cgdG8gZm9jdXMgaXRzZWxmIGFuZCB3aGV0aGVyIG9yIG5vdCBpdCBpcyBjdXJyZW50bHkgZGlzYWJsZWQuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRm9jdXNhYmxlIGV4dGVuZHMgQ2FuRGlzYWJsZSB7XG4gIGZvY3VzKCk6IHZvaWQ7XG59XG5cblxuZXhwb3J0IGNsYXNzIEZvY3VzS2V5TWFuYWdlciBleHRlbmRzIExpc3RLZXlNYW5hZ2VyPEZvY3VzYWJsZT4ge1xuXG4gIGNvbnN0cnVjdG9yKGl0ZW1zOiBRdWVyeUxpc3Q8Rm9jdXNhYmxlPikge1xuICAgIHN1cGVyKGl0ZW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBzZXRzIHRoZSBhY3RpdmUgaXRlbSB0byB0aGUgaXRlbSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgKiBJdCBhbHNvIGFkZHMgZm9jdXNlcyB0aGUgbmV3bHkgYWN0aXZlIGl0ZW0uXG4gICAqL1xuICBzZXRBY3RpdmVJdGVtKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBzdXBlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcblxuICAgIGlmICh0aGlzLmFjdGl2ZUl0ZW0pIHtcbiAgICAgIHRoaXMuYWN0aXZlSXRlbS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=