/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Cached result Set of input types support by the current browser.
  @type {?} */
var supportedInputTypes;
/** *
 * Types of <input> that *might* be supported.
  @type {?} */
var candidateInputTypes = [
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
    var featureTestInput = document.createElement('input');
    supportedInputTypes = new Set(candidateInputTypes.filter(function (value) {
        featureTestInput.setAttribute('type', value);
        return featureTestInput.type === value;
    }));
    return supportedInputTypes;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL3BsYXRmb3JtL2ZlYXR1cmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSxJQUFJLG1CQUFtQixDQUFjOzs7O0FBR3JDLElBQU0sbUJBQW1CLEdBQUc7SUFLMUIsT0FBTztJQUNQLFFBQVE7SUFDUixVQUFVO0lBQ1YsTUFBTTtJQUNOLGdCQUFnQjtJQUNoQixPQUFPO0lBQ1AsTUFBTTtJQUNOLFFBQVE7SUFDUixPQUFPO0lBQ1AsT0FBTztJQUNQLFFBQVE7SUFDUixVQUFVO0lBQ1YsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsUUFBUTtJQUNSLFFBQVE7SUFDUixLQUFLO0lBQ0wsTUFBTTtJQUNOLE1BQU07SUFDTixLQUFLO0lBQ0wsTUFBTTtDQUNQLENBQUM7Ozs7QUFHRixNQUFNOztJQUVKLElBQUksbUJBQW1CLEVBQUU7UUFDdkIsT0FBTyxtQkFBbUIsQ0FBQztLQUM1Qjs7OztJQUtELElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQzdDLG1CQUFtQixHQUFHLElBQUksR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbkQsT0FBTyxtQkFBbUIsQ0FBQztLQUM1Qjs7SUFFRCxJQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkQsbUJBQW1CLEdBQUcsSUFBSSxHQUFHLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSztRQUM1RCxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdDLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQztLQUN4QyxDQUFDLENBQUMsQ0FBQztJQUVKLE9BQU8sbUJBQW1CLENBQUM7Q0FDNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQ2FjaGVkIHJlc3VsdCBTZXQgb2YgaW5wdXQgdHlwZXMgc3VwcG9ydCBieSB0aGUgY3VycmVudCBicm93c2VyLiAqL1xubGV0IHN1cHBvcnRlZElucHV0VHlwZXM6IFNldDxzdHJpbmc+O1xuXG4vKiogVHlwZXMgb2YgPGlucHV0PiB0aGF0ICptaWdodCogYmUgc3VwcG9ydGVkLiAqL1xuY29uc3QgY2FuZGlkYXRlSW5wdXRUeXBlcyA9IFtcbiAgLy8gYGNvbG9yYCBtdXN0IGNvbWUgZmlyc3QuIENocm9tZSA1NiBzaG93cyBhIHdhcm5pbmcgaWYgd2UgY2hhbmdlIHRoZSB0eXBlIHRvIGBjb2xvcmAgYWZ0ZXJcbiAgLy8gZmlyc3QgY2hhbmdpbmcgaXQgdG8gc29tZXRoaW5nIGVsc2U6XG4gIC8vIFRoZSBzcGVjaWZpZWQgdmFsdWUgXCJcIiBkb2VzIG5vdCBjb25mb3JtIHRvIHRoZSByZXF1aXJlZCBmb3JtYXQuXG4gIC8vIFRoZSBmb3JtYXQgaXMgXCIjcnJnZ2JiXCIgd2hlcmUgcnIsIGdnLCBiYiBhcmUgdHdvLWRpZ2l0IGhleGFkZWNpbWFsIG51bWJlcnMuXG4gICdjb2xvcicsXG4gICdidXR0b24nLFxuICAnY2hlY2tib3gnLFxuICAnZGF0ZScsXG4gICdkYXRldGltZS1sb2NhbCcsXG4gICdlbWFpbCcsXG4gICdmaWxlJyxcbiAgJ2hpZGRlbicsXG4gICdpbWFnZScsXG4gICdtb250aCcsXG4gICdudW1iZXInLFxuICAncGFzc3dvcmQnLFxuICAncmFkaW8nLFxuICAncmFuZ2UnLFxuICAncmVzZXQnLFxuICAnc2VhcmNoJyxcbiAgJ3N1Ym1pdCcsXG4gICd0ZWwnLFxuICAndGV4dCcsXG4gICd0aW1lJyxcbiAgJ3VybCcsXG4gICd3ZWVrJyxcbl07XG5cbi8qKiBAcmV0dXJucyBUaGUgaW5wdXQgdHlwZXMgc3VwcG9ydGVkIGJ5IHRoaXMgYnJvd3Nlci4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdXBwb3J0ZWRJbnB1dFR5cGVzKCk6IFNldDxzdHJpbmc+IHtcbiAgLy8gUmVzdWx0IGlzIGNhY2hlZC5cbiAgaWYgKHN1cHBvcnRlZElucHV0VHlwZXMpIHtcbiAgICByZXR1cm4gc3VwcG9ydGVkSW5wdXRUeXBlcztcbiAgfVxuXG4gIC8vIFdlIGNhbid0IGNoZWNrIGlmIGFuIGlucHV0IHR5cGUgaXMgbm90IHN1cHBvcnRlZCB1bnRpbCB3ZSdyZSBvbiB0aGUgYnJvd3Nlciwgc28gc2F5IHRoYXRcbiAgLy8gZXZlcnl0aGluZyBpcyBzdXBwb3J0ZWQgd2hlbiBub3Qgb24gdGhlIGJyb3dzZXIuIFdlIGRvbid0IHVzZSBgUGxhdGZvcm1gIGhlcmUgc2luY2UgaXQnc1xuICAvLyBqdXN0IGEgaGVscGVyIGZ1bmN0aW9uIGFuZCBjYW4ndCBpbmplY3QgaXQuXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICdvYmplY3QnIHx8ICFkb2N1bWVudCkge1xuICAgIHN1cHBvcnRlZElucHV0VHlwZXMgPSBuZXcgU2V0KGNhbmRpZGF0ZUlucHV0VHlwZXMpO1xuICAgIHJldHVybiBzdXBwb3J0ZWRJbnB1dFR5cGVzO1xuICB9XG5cbiAgbGV0IGZlYXR1cmVUZXN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBzdXBwb3J0ZWRJbnB1dFR5cGVzID0gbmV3IFNldChjYW5kaWRhdGVJbnB1dFR5cGVzLmZpbHRlcih2YWx1ZSA9PiB7XG4gICAgZmVhdHVyZVRlc3RJbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCB2YWx1ZSk7XG4gICAgcmV0dXJuIGZlYXR1cmVUZXN0SW5wdXQudHlwZSA9PT0gdmFsdWU7XG4gIH0pKTtcblxuICByZXR1cm4gc3VwcG9ydGVkSW5wdXRUeXBlcztcbn1cbiJdfQ==