/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Optional, SkipSelf } from '@angular/core';
/** @typedef {?} */
var UniqueSelectionDispatcherListener;
export { UniqueSelectionDispatcherListener };
/**
 * Class to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 *
 * This service does not *store* any IDs and names because they may change at any time, so it is
 * less error-prone if they are simply passed through when the events occur.
 */
export class UniqueSelectionDispatcher {
    constructor() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param {?} id ID of the item.
     * @param {?} name Name of the item.
     * @return {?}
     */
    notify(id, name) {
        for (let listener of this._listeners) {
            listener(id, name);
        }
    }
    /**
     * Listen for future changes to item selection.
     * @param {?} listener
     * @return {?}
     */
    listen(listener) {
        this._listeners.push(listener);
    }
}
UniqueSelectionDispatcher.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    UniqueSelectionDispatcher.prototype._listeners;
}
/**
 * @param {?} parentDispatcher
 * @return {?}
 */
export function UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY(parentDispatcher) {
    return parentDispatcher || new UniqueSelectionDispatcher();
}
/** @type {?} */
export const UNIQUE_SELECTION_DISPATCHER_PROVIDER = {
    // If there is already a dispatcher available, use that. Otherwise, provide a new one.
    provide: UniqueSelectionDispatcher,
    deps: [[new Optional(), new SkipSelf(), UniqueSelectionDispatcher]],
    useFactory: UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pcXVlLXNlbGVjdGlvbi1kaXNwYXRjaGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9jb29yZGluYXRpb24vdW5pcXVlLXNlbGVjdGlvbi1kaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFnQjdELE1BQU07OzBCQUNzRCxFQUFFOzs7Ozs7OztJQU81RCxNQUFNLENBQUMsRUFBVSxFQUFFLElBQVk7UUFDN0IsS0FBSyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEI7S0FDRjs7Ozs7O0lBR0QsTUFBTSxDQUFDLFFBQTJDO1FBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2hDOzs7WUFsQkYsVUFBVTs7Ozs7Ozs7OztBQXFCWCxNQUFNLHVEQUNGLGdCQUEyQztJQUM3QyxPQUFPLGdCQUFnQixJQUFJLElBQUkseUJBQXlCLEVBQUUsQ0FBQztDQUM1RDs7QUFFRCxhQUFhLG9DQUFvQyxHQUFHOztJQUVsRCxPQUFPLEVBQUUseUJBQXlCO0lBQ2xDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLHlCQUF5QixDQUFDLENBQUM7SUFDbkUsVUFBVSxFQUFFLDRDQUE0QztDQUN6RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBPcHRpb25hbCwgU2tpcFNlbGZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbi8vIFVzZXJzIG9mIHRoZSBEaXNwYXRjaGVyIG5ldmVyIG5lZWQgdG8gc2VlIHRoaXMgdHlwZSwgYnV0IFR5cGVTY3JpcHQgcmVxdWlyZXMgaXQgdG8gYmUgZXhwb3J0ZWQuXG5leHBvcnQgdHlwZSBVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyTGlzdGVuZXIgPSAoaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nKSA9PiB2b2lkO1xuXG4vKipcbiAqIENsYXNzIHRvIGNvb3JkaW5hdGUgdW5pcXVlIHNlbGVjdGlvbiBiYXNlZCBvbiBuYW1lLlxuICogSW50ZW5kZWQgdG8gYmUgY29uc3VtZWQgYXMgYW4gQW5ndWxhciBzZXJ2aWNlLlxuICogVGhpcyBzZXJ2aWNlIGlzIG5lZWRlZCBiZWNhdXNlIG5hdGl2ZSByYWRpbyBjaGFuZ2UgZXZlbnRzIGFyZSBvbmx5IGZpcmVkIG9uIHRoZSBpdGVtIGN1cnJlbnRseVxuICogYmVpbmcgc2VsZWN0ZWQsIGFuZCB3ZSBzdGlsbCBuZWVkIHRvIHVuY2hlY2sgdGhlIHByZXZpb3VzIHNlbGVjdGlvbi5cbiAqXG4gKiBUaGlzIHNlcnZpY2UgZG9lcyBub3QgKnN0b3JlKiBhbnkgSURzIGFuZCBuYW1lcyBiZWNhdXNlIHRoZXkgbWF5IGNoYW5nZSBhdCBhbnkgdGltZSwgc28gaXQgaXNcbiAqIGxlc3MgZXJyb3ItcHJvbmUgaWYgdGhleSBhcmUgc2ltcGx5IHBhc3NlZCB0aHJvdWdoIHdoZW4gdGhlIGV2ZW50cyBvY2N1ci5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIge1xuICBwcml2YXRlIF9saXN0ZW5lcnM6IFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXJMaXN0ZW5lcltdID0gW107XG5cbiAgLyoqXG4gICAqIE5vdGlmeSBvdGhlciBpdGVtcyB0aGF0IHNlbGVjdGlvbiBmb3IgdGhlIGdpdmVuIG5hbWUgaGFzIGJlZW4gc2V0LlxuICAgKiBAcGFyYW0gaWQgSUQgb2YgdGhlIGl0ZW0uXG4gICAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGl0ZW0uXG4gICAqL1xuICBub3RpZnkoaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XG4gICAgZm9yIChsZXQgbGlzdGVuZXIgb2YgdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICBsaXN0ZW5lcihpZCwgbmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIExpc3RlbiBmb3IgZnV0dXJlIGNoYW5nZXMgdG8gaXRlbSBzZWxlY3Rpb24uICovXG4gIGxpc3RlbihsaXN0ZW5lcjogVW5pcXVlU2VsZWN0aW9uRGlzcGF0Y2hlckxpc3RlbmVyKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBVTklRVUVfU0VMRUNUSU9OX0RJU1BBVENIRVJfUFJPVklERVJfRkFDVE9SWShcbiAgICBwYXJlbnREaXNwYXRjaGVyOiBVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyKSB7XG4gIHJldHVybiBwYXJlbnREaXNwYXRjaGVyIHx8IG5ldyBVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyKCk7XG59XG5cbmV4cG9ydCBjb25zdCBVTklRVUVfU0VMRUNUSU9OX0RJU1BBVENIRVJfUFJPVklERVIgPSB7XG4gIC8vIElmIHRoZXJlIGlzIGFscmVhZHkgYSBkaXNwYXRjaGVyIGF2YWlsYWJsZSwgdXNlIHRoYXQuIE90aGVyd2lzZSwgcHJvdmlkZSBhIG5ldyBvbmUuXG4gIHByb3ZpZGU6IFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIsXG4gIGRlcHM6IFtbbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpLCBVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyXV0sXG4gIHVzZUZhY3Rvcnk6IFVOSVFVRV9TRUxFQ1RJT05fRElTUEFUQ0hFUl9QUk9WSURFUl9GQUNUT1JZXG59O1xuIl19