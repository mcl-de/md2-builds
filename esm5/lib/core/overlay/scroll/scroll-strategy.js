/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Describes a strategy that will be used by an overlay
 * to handle scroll events while it is open.
 * @record
 */
export function ScrollStrategy() { }
/** @type {?} */
ScrollStrategy.prototype.enable;
/** @type {?} */
ScrollStrategy.prototype.disable;
/** @type {?} */
ScrollStrategy.prototype.attach;
/**
 * Returns an error to be thrown when attempting to attach an already-attached scroll strategy.
 * @return {?}
 */
export function getMdScrollStrategyAlreadyAttachedError() {
    return Error("Scroll strategy has already been attached.");
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9vdmVybGF5L3Njcm9sbC9zY3JvbGwtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxNQUFNO0lBQ0osT0FBTyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztDQUM1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3ZlcmxheVJlZn0gZnJvbSAnLi4vb3ZlcmxheS1yZWYnO1xuXG4vKipcbiAqIERlc2NyaWJlcyBhIHN0cmF0ZWd5IHRoYXQgd2lsbCBiZSB1c2VkIGJ5IGFuIG92ZXJsYXlcbiAqIHRvIGhhbmRsZSBzY3JvbGwgZXZlbnRzIHdoaWxlIGl0IGlzIG9wZW4uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2Nyb2xsU3RyYXRlZ3kge1xuICBlbmFibGU6ICgpID0+IHZvaWQ7XG4gIGRpc2FibGU6ICgpID0+IHZvaWQ7XG4gIGF0dGFjaDogKG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBlcnJvciB0byBiZSB0aHJvd24gd2hlbiBhdHRlbXB0aW5nIHRvIGF0dGFjaCBhbiBhbHJlYWR5LWF0dGFjaGVkIHNjcm9sbCBzdHJhdGVneS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1kU2Nyb2xsU3RyYXRlZ3lBbHJlYWR5QXR0YWNoZWRFcnJvcigpOiBFcnJvciB7XG4gIHJldHVybiBFcnJvcihgU2Nyb2xsIHN0cmF0ZWd5IGhhcyBhbHJlYWR5IGJlZW4gYXR0YWNoZWQuYCk7XG59XG4iXX0=