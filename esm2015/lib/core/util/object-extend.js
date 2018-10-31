/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Extends an object with the *enumerable* and *own* properties of one or more source objects,
 * similar to Object.assign.
 *
 * @param {?} dest The object which will have properties copied to it.
 * @param {...?} sources The source objects from which properties will be copied.
 * @return {?}
 */
export function extendObject(dest, ...sources) {
    if (dest == null) {
        throw TypeError('Cannot convert undefined or null to object');
    }
    for (let source of sources) {
        if (source != null) {
            for (let key in source) {
                if (source.hasOwnProperty(key)) {
                    dest[key] = source[key];
                }
            }
        }
    }
    return dest;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0LWV4dGVuZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvdXRpbC9vYmplY3QtZXh0ZW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU9BLE1BQU0sdUJBQXVCLElBQVMsRUFBRSxHQUFHLE9BQWM7SUFDdkQsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1FBQ2hCLE1BQU0sU0FBUyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7S0FDL0Q7SUFFRCxLQUFLLElBQUksTUFBTSxJQUFJLE9BQU8sRUFBRTtRQUMxQixJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDbEIsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7Z0JBQ3RCLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDekI7YUFDRjtTQUNGO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQztDQUNiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlbmRzIGFuIG9iamVjdCB3aXRoIHRoZSAqZW51bWVyYWJsZSogYW5kICpvd24qIHByb3BlcnRpZXMgb2Ygb25lIG9yIG1vcmUgc291cmNlIG9iamVjdHMsXG4gKiBzaW1pbGFyIHRvIE9iamVjdC5hc3NpZ24uXG4gKlxuICogQHBhcmFtIGRlc3QgVGhlIG9iamVjdCB3aGljaCB3aWxsIGhhdmUgcHJvcGVydGllcyBjb3BpZWQgdG8gaXQuXG4gKiBAcGFyYW0gc291cmNlcyBUaGUgc291cmNlIG9iamVjdHMgZnJvbSB3aGljaCBwcm9wZXJ0aWVzIHdpbGwgYmUgY29waWVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kT2JqZWN0KGRlc3Q6IGFueSwgLi4uc291cmNlczogYW55W10pOiBhbnkge1xuICBpZiAoZGVzdCA9PSBudWxsKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgfVxuXG4gIGZvciAobGV0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XG4gICAgaWYgKHNvdXJjZSAhPSBudWxsKSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGRlc3Rba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRlc3Q7XG59XG4iXX0=