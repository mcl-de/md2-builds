/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var HighlightPipe = /** @class */ (function () {
    function HighlightPipe() {
    }
    /**
     * Transform function
     * @param value string
     * @param query string filter value
     * @return filtered string with markup
     */
    /**
     * Transform function
     * @param {?} value string
     * @param {?} query string filter value
     * @return {?} filtered string with markup
     */
    HighlightPipe.prototype.transform = /**
     * Transform function
     * @param {?} value string
     * @param {?} query string filter value
     * @return {?} filtered string with markup
     */
    function (value, query) {
        if (query.length < 1) {
            return value;
        }
        return query ? value.replace(new RegExp(this._escapeRegexp(query), 'gi'), '<span class="highlight">$&</span>') : value;
    };
    /**
     * filter pipe
     * @param {?} queryToEscape
     * @return {?} queryToEscape with replace string
     */
    HighlightPipe.prototype._escapeRegexp = /**
     * filter pipe
     * @param {?} queryToEscape
     * @return {?} queryToEscape with replace string
     */
    function (queryToEscape) {
        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    };
    HighlightPipe.decorators = [
        { type: Pipe, args: [{ name: 'highlight' },] }
    ];
    return HighlightPipe;
}());
export { HighlightPipe };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLXBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9hdXRvY29tcGxldGUvYXV0b2NvbXBsZXRlLXBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxJQUFJLEVBRUwsTUFBTSxlQUFlLENBQUM7Ozs7SUFJckI7Ozs7O09BS0c7Ozs7Ozs7SUFDSCxpQ0FBUzs7Ozs7O0lBQVQsVUFBVSxLQUFhLEVBQUUsS0FBYTtRQUNwQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQUUsT0FBTyxLQUFLLENBQUM7U0FBRTtRQUN2QyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUN0RSxtQ0FBbUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDaEQ7Ozs7OztJQU9PLHFDQUFhOzs7OztjQUFDLGFBQXFCO1FBQ3pDLE9BQU8sYUFBYSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsQ0FBQzs7O2dCQXBCbEUsSUFBSSxTQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTs7d0JBTDNCOztTQU1hLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBQaXBlLFxuICBQaXBlVHJhbnNmb3JtXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7IG5hbWU6ICdoaWdobGlnaHQnIH0pXG5leHBvcnQgY2xhc3MgSGlnaGxpZ2h0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAvKipcbiAgICogVHJhbnNmb3JtIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB2YWx1ZSBzdHJpbmdcbiAgICogQHBhcmFtIHF1ZXJ5IHN0cmluZyBmaWx0ZXIgdmFsdWVcbiAgICogQHJldHVybiBmaWx0ZXJlZCBzdHJpbmcgd2l0aCBtYXJrdXBcbiAgICovXG4gIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nLCBxdWVyeTogc3RyaW5nKSB7XG4gICAgaWYgKHF1ZXJ5Lmxlbmd0aCA8IDEpIHsgcmV0dXJuIHZhbHVlOyB9XG4gICAgcmV0dXJuIHF1ZXJ5ID8gdmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMuX2VzY2FwZVJlZ2V4cChxdWVyeSksICdnaScpLFxuICAgICAgJzxzcGFuIGNsYXNzPVwiaGlnaGxpZ2h0XCI+JCY8L3NwYW4+JykgOiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBmaWx0ZXIgcGlwZVxuICAgKiBAcGFyYW0gcXVlcnlUb0VzY2FwZVxuICAgKiBAcmV0dXJuIHF1ZXJ5VG9Fc2NhcGUgd2l0aCByZXBsYWNlIHN0cmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBfZXNjYXBlUmVnZXhwKHF1ZXJ5VG9Fc2NhcGU6IHN0cmluZykge1xuICAgIHJldHVybiBxdWVyeVRvRXNjYXBlLnJlcGxhY2UoLyhbLj8qK14kW1xcXVxcXFwoKXt9fC1dKS9nLCAnXFxcXCQxJyk7XG4gIH1cbn1cbiJdfQ==