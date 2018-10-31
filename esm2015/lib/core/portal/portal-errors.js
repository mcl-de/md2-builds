/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Throws an exception when attempting to attach a null portal to a host.
 * \@docs-private
 * @return {?}
 */
export function throwNullPortalError() {
    throw Error('Must provide a portal to attach');
}
/**
 * Throws an exception when attempting to attach a portal to a host that is already attached.
 * \@docs-private
 * @return {?}
 */
export function throwPortalAlreadyAttachedError() {
    throw Error('Host already has a portal attached');
}
/**
 * Throws an exception when attempting to attach a portal to an already-disposed host.
 * \@docs-private
 * @return {?}
 */
export function throwPortalHostAlreadyDisposedError() {
    throw Error('This PortalHost has already been disposed');
}
/**
 * Throws an exception when attempting to attach an unknown portal type.
 * \@docs-private
 * @return {?}
 */
export function throwUnknownPortalTypeError() {
    throw Error('Attempting to attach an unknown Portal type. BasePortalHost accepts either' +
        'a ComponentPortal or a TemplatePortal.');
}
/**
 * Throws an exception when attempting to attach a portal to a null host.
 * \@docs-private
 * @return {?}
 */
export function throwNullPortalHostError() {
    throw Error('Attempting to attach a portal to a null PortalHost');
}
/**
 * Throws an exception when attempting to detach a portal that is not attached.
 * \@docs-privatew
 * @return {?}
 */
export function throwNoPortalAttachedError() {
    throw Error('Attempting to detach a portal that is not attached to a host');
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFsLWVycm9ycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvcG9ydGFsL3BvcnRhbC1lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBSUEsTUFBTTtJQUNKLE1BQU0sS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7Q0FDaEQ7Ozs7OztBQU1ELE1BQU07SUFDSixNQUFNLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0NBQ25EOzs7Ozs7QUFNRCxNQUFNO0lBQ0osTUFBTSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztDQUMxRDs7Ozs7O0FBTUQsTUFBTTtJQUNKLE1BQU0sS0FBSyxDQUFDLDRFQUE0RTtRQUN4RSx3Q0FBd0MsQ0FBQyxDQUFDO0NBQzNEOzs7Ozs7QUFNRCxNQUFNO0lBQ0osTUFBTSxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztDQUNuRTs7Ozs7O0FBTUQsTUFBTTtJQUNKLE1BQU0sS0FBSyxDQUFDLDhEQUE4RCxDQUFDLENBQUM7Q0FDN0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRocm93cyBhbiBleGNlcHRpb24gd2hlbiBhdHRlbXB0aW5nIHRvIGF0dGFjaCBhIG51bGwgcG9ydGFsIHRvIGEgaG9zdC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93TnVsbFBvcnRhbEVycm9yKCkge1xuICB0aHJvdyBFcnJvcignTXVzdCBwcm92aWRlIGEgcG9ydGFsIHRvIGF0dGFjaCcpO1xufVxuXG4vKipcbiAqIFRocm93cyBhbiBleGNlcHRpb24gd2hlbiBhdHRlbXB0aW5nIHRvIGF0dGFjaCBhIHBvcnRhbCB0byBhIGhvc3QgdGhhdCBpcyBhbHJlYWR5IGF0dGFjaGVkLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dQb3J0YWxBbHJlYWR5QXR0YWNoZWRFcnJvcigpIHtcbiAgdGhyb3cgRXJyb3IoJ0hvc3QgYWxyZWFkeSBoYXMgYSBwb3J0YWwgYXR0YWNoZWQnKTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYW4gZXhjZXB0aW9uIHdoZW4gYXR0ZW1wdGluZyB0byBhdHRhY2ggYSBwb3J0YWwgdG8gYW4gYWxyZWFkeS1kaXNwb3NlZCBob3N0LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dQb3J0YWxIb3N0QWxyZWFkeURpc3Bvc2VkRXJyb3IoKSB7XG4gIHRocm93IEVycm9yKCdUaGlzIFBvcnRhbEhvc3QgaGFzIGFscmVhZHkgYmVlbiBkaXNwb3NlZCcpO1xufVxuXG4vKipcbiAqIFRocm93cyBhbiBleGNlcHRpb24gd2hlbiBhdHRlbXB0aW5nIHRvIGF0dGFjaCBhbiB1bmtub3duIHBvcnRhbCB0eXBlLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dVbmtub3duUG9ydGFsVHlwZUVycm9yKCkge1xuICB0aHJvdyBFcnJvcignQXR0ZW1wdGluZyB0byBhdHRhY2ggYW4gdW5rbm93biBQb3J0YWwgdHlwZS4gQmFzZVBvcnRhbEhvc3QgYWNjZXB0cyBlaXRoZXInICtcbiAgICAgICAgICAgICAgICAgICdhIENvbXBvbmVudFBvcnRhbCBvciBhIFRlbXBsYXRlUG9ydGFsLicpO1xufVxuXG4vKipcbiAqIFRocm93cyBhbiBleGNlcHRpb24gd2hlbiBhdHRlbXB0aW5nIHRvIGF0dGFjaCBhIHBvcnRhbCB0byBhIG51bGwgaG9zdC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93TnVsbFBvcnRhbEhvc3RFcnJvcigpIHtcbiAgdGhyb3cgRXJyb3IoJ0F0dGVtcHRpbmcgdG8gYXR0YWNoIGEgcG9ydGFsIHRvIGEgbnVsbCBQb3J0YWxIb3N0Jyk7XG59XG5cbi8qKlxuICogVGhyb3dzIGFuIGV4Y2VwdGlvbiB3aGVuIGF0dGVtcHRpbmcgdG8gZGV0YWNoIGEgcG9ydGFsIHRoYXQgaXMgbm90IGF0dGFjaGVkLlxuICogQGRvY3MtcHJpdmF0ZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93Tm9Qb3J0YWxBdHRhY2hlZEVycm9yKCkge1xuICB0aHJvdyBFcnJvcignQXR0ZW1wdGluZyB0byBkZXRhY2ggYSBwb3J0YWwgdGhhdCBpcyBub3QgYXR0YWNoZWQgdG8gYSBob3N0Jyk7XG59XG4iXX0=