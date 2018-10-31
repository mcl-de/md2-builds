/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Coerces a data-bound value (typically a string) to a number.
 * @param {?} value
 * @param {?=} fallbackValue
 * @return {?}
 */
export function coerceNumberProperty(value, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = 0; }
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    return isNaN(parseFloat(/** @type {?} */ (value))) || isNaN(Number(value)) ? fallbackValue : Number(value);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLXByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9jb2VyY2lvbi9udW1iZXItcHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLE1BQU0sK0JBQStCLEtBQVUsRUFBRSxhQUFpQjtJQUFqQiw4QkFBQSxFQUFBLGlCQUFpQjs7OztJQUloRSxPQUFPLEtBQUssQ0FBQyxVQUFVLG1CQUFDLEtBQVksRUFBQyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUNoRyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBDb2VyY2VzIGEgZGF0YS1ib3VuZCB2YWx1ZSAodHlwaWNhbGx5IGEgc3RyaW5nKSB0byBhIG51bWJlci4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZTogYW55LCBmYWxsYmFja1ZhbHVlID0gMCkge1xuICAvLyBwYXJzZUZsb2F0KHZhbHVlKSBoYW5kbGVzIG1vc3Qgb2YgdGhlIGNhc2VzIHdlJ3JlIGludGVyZXN0ZWQgaW4gKGl0IHRyZWF0cyBudWxsLCBlbXB0eSBzdHJpbmcsXG4gIC8vIGFuZCBvdGhlciBub24tbnVtYmVyIHZhbHVlcyBhcyBOYU4sIHdoZXJlIE51bWJlciBqdXN0IHVzZXMgMCkgYnV0IGl0IGNvbnNpZGVycyB0aGUgc3RyaW5nXG4gIC8vICcxMjNoZWxsbycgdG8gYmUgYSB2YWxpZCBudW1iZXIuIFRoZXJlZm9yZSB3ZSBhbHNvIGNoZWNrIGlmIE51bWJlcih2YWx1ZSkgaXMgTmFOLlxuICByZXR1cm4gaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSBhcyBhbnkpKSB8fCBpc05hTihOdW1iZXIodmFsdWUpKSA/IGZhbGxiYWNrVmFsdWUgOiBOdW1iZXIodmFsdWUpO1xufVxuIl19