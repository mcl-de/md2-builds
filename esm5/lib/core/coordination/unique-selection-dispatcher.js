/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var UniqueSelectionDispatcher = /** @class */ (function () {
    function UniqueSelectionDispatcher() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param id ID of the item.
     * @param name Name of the item.
     */
    /**
     * Notify other items that selection for the given name has been set.
     * @param {?} id ID of the item.
     * @param {?} name Name of the item.
     * @return {?}
     */
    UniqueSelectionDispatcher.prototype.notify = /**
     * Notify other items that selection for the given name has been set.
     * @param {?} id ID of the item.
     * @param {?} name Name of the item.
     * @return {?}
     */
    function (id, name) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__values(this._listeners), _c = _b.next(); !_c.done; _c = _b.next()) {
                var listener = _c.value;
                listener(id, name);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /** Listen for future changes to item selection. */
    /**
     * Listen for future changes to item selection.
     * @param {?} listener
     * @return {?}
     */
    UniqueSelectionDispatcher.prototype.listen = /**
     * Listen for future changes to item selection.
     * @param {?} listener
     * @return {?}
     */
    function (listener) {
        this._listeners.push(listener);
    };
    UniqueSelectionDispatcher.decorators = [
        { type: Injectable }
    ];
    return UniqueSelectionDispatcher;
}());
export { UniqueSelectionDispatcher };
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
export var UNIQUE_SELECTION_DISPATCHER_PROVIDER = {
    // If there is already a dispatcher available, use that. Otherwise, provide a new one.
    provide: UniqueSelectionDispatcher,
    deps: [[new Optional(), new SkipSelf(), UniqueSelectionDispatcher]],
    useFactory: UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pcXVlLXNlbGVjdGlvbi1kaXNwYXRjaGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9jb29yZGluYXRpb24vdW5pcXVlLXNlbGVjdGlvbi1kaXNwYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7MEJBaUJELEVBQUU7O0lBRTVEOzs7O09BSUc7Ozs7Ozs7SUFDSCwwQ0FBTTs7Ozs7O0lBQU4sVUFBTyxFQUFVLEVBQUUsSUFBWTs7O1lBQzdCLEtBQXFCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsVUFBVSxDQUFBLGdCQUFBLDRCQUFFO2dCQUFqQyxJQUFJLFFBQVEsV0FBQTtnQkFDZixRQUFRLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3BCOzs7Ozs7Ozs7S0FDRjtJQUVELG1EQUFtRDs7Ozs7O0lBQ25ELDBDQUFNOzs7OztJQUFOLFVBQU8sUUFBMkM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDaEM7O2dCQWxCRixVQUFVOztvQ0FmWDs7U0FnQmEseUJBQXlCOzs7Ozs7Ozs7QUFvQnRDLE1BQU0sdURBQ0YsZ0JBQTJDO0lBQzdDLE9BQU8sZ0JBQWdCLElBQUksSUFBSSx5QkFBeUIsRUFBRSxDQUFDO0NBQzVEOztBQUVELFdBQWEsb0NBQW9DLEdBQUc7O0lBRWxELE9BQU8sRUFBRSx5QkFBeUI7SUFDbEMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksUUFBUSxFQUFFLEVBQUUseUJBQXlCLENBQUMsQ0FBQztJQUNuRSxVQUFVLEVBQUUsNENBQTRDO0NBQ3pELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIE9wdGlvbmFsLCBTa2lwU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLy8gVXNlcnMgb2YgdGhlIERpc3BhdGNoZXIgbmV2ZXIgbmVlZCB0byBzZWUgdGhpcyB0eXBlLCBidXQgVHlwZVNjcmlwdCByZXF1aXJlcyBpdCB0byBiZSBleHBvcnRlZC5cbmV4cG9ydCB0eXBlIFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXJMaXN0ZW5lciA9IChpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpID0+IHZvaWQ7XG5cbi8qKlxuICogQ2xhc3MgdG8gY29vcmRpbmF0ZSB1bmlxdWUgc2VsZWN0aW9uIGJhc2VkIG9uIG5hbWUuXG4gKiBJbnRlbmRlZCB0byBiZSBjb25zdW1lZCBhcyBhbiBBbmd1bGFyIHNlcnZpY2UuXG4gKiBUaGlzIHNlcnZpY2UgaXMgbmVlZGVkIGJlY2F1c2UgbmF0aXZlIHJhZGlvIGNoYW5nZSBldmVudHMgYXJlIG9ubHkgZmlyZWQgb24gdGhlIGl0ZW0gY3VycmVudGx5XG4gKiBiZWluZyBzZWxlY3RlZCwgYW5kIHdlIHN0aWxsIG5lZWQgdG8gdW5jaGVjayB0aGUgcHJldmlvdXMgc2VsZWN0aW9uLlxuICpcbiAqIFRoaXMgc2VydmljZSBkb2VzIG5vdCAqc3RvcmUqIGFueSBJRHMgYW5kIG5hbWVzIGJlY2F1c2UgdGhleSBtYXkgY2hhbmdlIGF0IGFueSB0aW1lLCBzbyBpdCBpc1xuICogbGVzcyBlcnJvci1wcm9uZSBpZiB0aGV5IGFyZSBzaW1wbHkgcGFzc2VkIHRocm91Z2ggd2hlbiB0aGUgZXZlbnRzIG9jY3VyLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVW5pcXVlU2VsZWN0aW9uRGlzcGF0Y2hlciB7XG4gIHByaXZhdGUgX2xpc3RlbmVyczogVW5pcXVlU2VsZWN0aW9uRGlzcGF0Y2hlckxpc3RlbmVyW10gPSBbXTtcblxuICAvKipcbiAgICogTm90aWZ5IG90aGVyIGl0ZW1zIHRoYXQgc2VsZWN0aW9uIGZvciB0aGUgZ2l2ZW4gbmFtZSBoYXMgYmVlbiBzZXQuXG4gICAqIEBwYXJhbSBpZCBJRCBvZiB0aGUgaXRlbS5cbiAgICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgaXRlbS5cbiAgICovXG4gIG5vdGlmeShpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBmb3IgKGxldCBsaXN0ZW5lciBvZiB0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgIGxpc3RlbmVyKGlkLCBuYW1lKTtcbiAgICB9XG4gIH1cblxuICAvKiogTGlzdGVuIGZvciBmdXR1cmUgY2hhbmdlcyB0byBpdGVtIHNlbGVjdGlvbi4gKi9cbiAgbGlzdGVuKGxpc3RlbmVyOiBVbmlxdWVTZWxlY3Rpb25EaXNwYXRjaGVyTGlzdGVuZXIpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFVOSVFVRV9TRUxFQ1RJT05fRElTUEFUQ0hFUl9QUk9WSURFUl9GQUNUT1JZKFxuICAgIHBhcmVudERpc3BhdGNoZXI6IFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIpIHtcbiAgcmV0dXJuIHBhcmVudERpc3BhdGNoZXIgfHwgbmV3IFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXIoKTtcbn1cblxuZXhwb3J0IGNvbnN0IFVOSVFVRV9TRUxFQ1RJT05fRElTUEFUQ0hFUl9QUk9WSURFUiA9IHtcbiAgLy8gSWYgdGhlcmUgaXMgYWxyZWFkeSBhIGRpc3BhdGNoZXIgYXZhaWxhYmxlLCB1c2UgdGhhdC4gT3RoZXJ3aXNlLCBwcm92aWRlIGEgbmV3IG9uZS5cbiAgcHJvdmlkZTogVW5pcXVlU2VsZWN0aW9uRGlzcGF0Y2hlcixcbiAgZGVwczogW1tuZXcgT3B0aW9uYWwoKSwgbmV3IFNraXBTZWxmKCksIFVuaXF1ZVNlbGVjdGlvbkRpc3BhdGNoZXJdXSxcbiAgdXNlRmFjdG9yeTogVU5JUVVFX1NFTEVDVElPTl9ESVNQQVRDSEVSX1BST1ZJREVSX0ZBQ1RPUllcbn07XG4iXX0=