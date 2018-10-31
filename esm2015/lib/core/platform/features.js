/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Cached result Set of input types support by the current browser.
  @type {?} */
let supportedInputTypes;
/** *
 * Types of <input> that *might* be supported.
  @type {?} */
const candidateInputTypes = [
    'color',
    'button',
    'checkbox',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
];
/**
 * @return {?} The input types supported by this browser.
 */
export function getSupportedInputTypes() {
    // Result is cached.
    if (supportedInputTypes) {
        return supportedInputTypes;
    }
    // We can't check if an input type is not supported until we're on the browser, so say that
    // everything is supported when not on the browser. We don't use `Platform` here since it's
    // just a helper function and can't inject it.
    if (typeof document !== 'object' || !document) {
        supportedInputTypes = new Set(candidateInputTypes);
        return supportedInputTypes;
    }
    /** @type {?} */
    let featureTestInput = document.createElement('input');
    supportedInputTypes = new Set(candidateInputTypes.filter(value => {
        featureTestInput.setAttribute('type', value);
        return featureTestInput.type === value;
    }));
    return supportedInputTypes;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL3BsYXRmb3JtL2ZlYXR1cmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxJQUFJLG1CQUFtQixDQUFjOzs7O0FBR3JDLE1BQU0sbUJBQW1CLEdBQUc7SUFLMUIsT0FBTztJQUNQLFFBQVE7SUFDUixVQUFVO0lBQ1YsTUFBTTtJQUNOLGdCQUFnQjtJQUNoQixPQUFPO0lBQ1AsTUFBTTtJQUNOLFFBQVE7SUFDUixPQUFPO0lBQ1AsT0FBTztJQUNQLFFBQVE7SUFDUixVQUFVO0lBQ1YsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsUUFBUTtJQUNSLFFBQVE7SUFDUixLQUFLO0lBQ0wsTUFBTTtJQUNOLE1BQU07SUFDTixLQUFLO0lBQ0wsTUFBTTtDQUNQLENBQUM7Ozs7QUFHRixNQUFNOztJQUVKLElBQUksbUJBQW1CLEVBQUU7UUFDdkIsT0FBTyxtQkFBbUIsQ0FBQztLQUM1Qjs7OztJQUtELElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQzdDLG1CQUFtQixHQUFHLElBQUksR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbkQsT0FBTyxtQkFBbUIsQ0FBQztLQUM1Qjs7SUFFRCxJQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkQsbUJBQW1CLEdBQUcsSUFBSSxHQUFHLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQy9ELGdCQUFnQixDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDO0tBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRUosT0FBTyxtQkFBbUIsQ0FBQztDQUM1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBDYWNoZWQgcmVzdWx0IFNldCBvZiBpbnB1dCB0eXBlcyBzdXBwb3J0IGJ5IHRoZSBjdXJyZW50IGJyb3dzZXIuICovXG5sZXQgc3VwcG9ydGVkSW5wdXRUeXBlczogU2V0PHN0cmluZz47XG5cbi8qKiBUeXBlcyBvZiA8aW5wdXQ+IHRoYXQgKm1pZ2h0KiBiZSBzdXBwb3J0ZWQuICovXG5jb25zdCBjYW5kaWRhdGVJbnB1dFR5cGVzID0gW1xuICAvLyBgY29sb3JgIG11c3QgY29tZSBmaXJzdC4gQ2hyb21lIDU2IHNob3dzIGEgd2FybmluZyBpZiB3ZSBjaGFuZ2UgdGhlIHR5cGUgdG8gYGNvbG9yYCBhZnRlclxuICAvLyBmaXJzdCBjaGFuZ2luZyBpdCB0byBzb21ldGhpbmcgZWxzZTpcbiAgLy8gVGhlIHNwZWNpZmllZCB2YWx1ZSBcIlwiIGRvZXMgbm90IGNvbmZvcm0gdG8gdGhlIHJlcXVpcmVkIGZvcm1hdC5cbiAgLy8gVGhlIGZvcm1hdCBpcyBcIiNycmdnYmJcIiB3aGVyZSByciwgZ2csIGJiIGFyZSB0d28tZGlnaXQgaGV4YWRlY2ltYWwgbnVtYmVycy5cbiAgJ2NvbG9yJyxcbiAgJ2J1dHRvbicsXG4gICdjaGVja2JveCcsXG4gICdkYXRlJyxcbiAgJ2RhdGV0aW1lLWxvY2FsJyxcbiAgJ2VtYWlsJyxcbiAgJ2ZpbGUnLFxuICAnaGlkZGVuJyxcbiAgJ2ltYWdlJyxcbiAgJ21vbnRoJyxcbiAgJ251bWJlcicsXG4gICdwYXNzd29yZCcsXG4gICdyYWRpbycsXG4gICdyYW5nZScsXG4gICdyZXNldCcsXG4gICdzZWFyY2gnLFxuICAnc3VibWl0JyxcbiAgJ3RlbCcsXG4gICd0ZXh0JyxcbiAgJ3RpbWUnLFxuICAndXJsJyxcbiAgJ3dlZWsnLFxuXTtcblxuLyoqIEByZXR1cm5zIFRoZSBpbnB1dCB0eXBlcyBzdXBwb3J0ZWQgYnkgdGhpcyBicm93c2VyLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN1cHBvcnRlZElucHV0VHlwZXMoKTogU2V0PHN0cmluZz4ge1xuICAvLyBSZXN1bHQgaXMgY2FjaGVkLlxuICBpZiAoc3VwcG9ydGVkSW5wdXRUeXBlcykge1xuICAgIHJldHVybiBzdXBwb3J0ZWRJbnB1dFR5cGVzO1xuICB9XG5cbiAgLy8gV2UgY2FuJ3QgY2hlY2sgaWYgYW4gaW5wdXQgdHlwZSBpcyBub3Qgc3VwcG9ydGVkIHVudGlsIHdlJ3JlIG9uIHRoZSBicm93c2VyLCBzbyBzYXkgdGhhdFxuICAvLyBldmVyeXRoaW5nIGlzIHN1cHBvcnRlZCB3aGVuIG5vdCBvbiB0aGUgYnJvd3Nlci4gV2UgZG9uJ3QgdXNlIGBQbGF0Zm9ybWAgaGVyZSBzaW5jZSBpdCdzXG4gIC8vIGp1c3QgYSBoZWxwZXIgZnVuY3Rpb24gYW5kIGNhbid0IGluamVjdCBpdC5cbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ29iamVjdCcgfHwgIWRvY3VtZW50KSB7XG4gICAgc3VwcG9ydGVkSW5wdXRUeXBlcyA9IG5ldyBTZXQoY2FuZGlkYXRlSW5wdXRUeXBlcyk7XG4gICAgcmV0dXJuIHN1cHBvcnRlZElucHV0VHlwZXM7XG4gIH1cblxuICBsZXQgZmVhdHVyZVRlc3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIHN1cHBvcnRlZElucHV0VHlwZXMgPSBuZXcgU2V0KGNhbmRpZGF0ZUlucHV0VHlwZXMuZmlsdGVyKHZhbHVlID0+IHtcbiAgICBmZWF0dXJlVGVzdElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIHZhbHVlKTtcbiAgICByZXR1cm4gZmVhdHVyZVRlc3RJbnB1dC50eXBlID09PSB2YWx1ZTtcbiAgfSkpO1xuXG4gIHJldHVybiBzdXBwb3J0ZWRJbnB1dFR5cGVzO1xufVxuIl19