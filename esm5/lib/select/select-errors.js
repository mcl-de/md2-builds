/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Returns an exception to be thrown when attempting to change a s
 * elect's `multiple` option after initialization.
 * \@docs-private
 * @return {?}
 */
export function getMdSelectDynamicMultipleError() {
    return new Error('Cannot change `multiple` mode of select after initialization.');
}
/**
 * Returns an exception to be thrown when attempting to assign a non-array value to a select
 * in `multiple` mode. Note that `undefined` and `null` are still valid values to allow for
 * resetting the value.
 * \@docs-private
 * @return {?}
 */
export function getMdSelectNonArrayValueError() {
    return new Error('Cannot assign truthy non-array value to select in `multiple` mode.');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWVycm9ycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL3NlbGVjdC9zZWxlY3QtZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFLQSxNQUFNO0lBQ0osT0FBTyxJQUFJLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDO0NBQ25GOzs7Ozs7OztBQVFELE1BQU07SUFDSixPQUFPLElBQUksS0FBSyxDQUFDLG9FQUFvRSxDQUFDLENBQUM7Q0FDeEYiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJldHVybnMgYW4gZXhjZXB0aW9uIHRvIGJlIHRocm93biB3aGVuIGF0dGVtcHRpbmcgdG8gY2hhbmdlIGEgc1xuICogZWxlY3QncyBgbXVsdGlwbGVgIG9wdGlvbiBhZnRlciBpbml0aWFsaXphdGlvbi5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE1kU2VsZWN0RHluYW1pY011bHRpcGxlRXJyb3IoKTogRXJyb3Ige1xuICByZXR1cm4gbmV3IEVycm9yKCdDYW5ub3QgY2hhbmdlIGBtdWx0aXBsZWAgbW9kZSBvZiBzZWxlY3QgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBleGNlcHRpb24gdG8gYmUgdGhyb3duIHdoZW4gYXR0ZW1wdGluZyB0byBhc3NpZ24gYSBub24tYXJyYXkgdmFsdWUgdG8gYSBzZWxlY3RcbiAqIGluIGBtdWx0aXBsZWAgbW9kZS4gTm90ZSB0aGF0IGB1bmRlZmluZWRgIGFuZCBgbnVsbGAgYXJlIHN0aWxsIHZhbGlkIHZhbHVlcyB0byBhbGxvdyBmb3JcbiAqIHJlc2V0dGluZyB0aGUgdmFsdWUuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRNZFNlbGVjdE5vbkFycmF5VmFsdWVFcnJvcigpOiBFcnJvciB7XG4gIHJldHVybiBuZXcgRXJyb3IoJ0Nhbm5vdCBhc3NpZ24gdHJ1dGh5IG5vbi1hcnJheSB2YWx1ZSB0byBzZWxlY3QgaW4gYG11bHRpcGxlYCBtb2RlLicpO1xufVxuIl19