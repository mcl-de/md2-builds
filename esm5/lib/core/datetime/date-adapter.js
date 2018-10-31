/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
var /**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
DateAdapter = /** @class */ (function () {
    function DateAdapter() {
    }
    /**
     * Sets the locale used for all dates.
     * @param locale The new locale.
     */
    /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    DateAdapter.prototype.setLocale = /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    function (locale) {
        this.locale = locale;
    };
    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    DateAdapter.prototype.compareDate = /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    function (first, second) {
        return this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second);
    };
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    DateAdapter.prototype.sameDate = /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    function (first, second) {
        return first && second ? !this.compareDate(first, second) : first == second;
    };
    /**
     * Clamp the given date between min and max dates.
     * @param date The date to clamp.
     * @param min The minimum value to allow. If null or omitted no min is enforced.
     * @param max The maximum value to allow. If null or omitted no max is enforced.
     * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    DateAdapter.prototype.clampDate = /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    function (date, min, max) {
        if (min && this.compareDate(date, min) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max) > 0) {
            return max;
        }
        return date;
    };
    return DateAdapter;
}());
/**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
export { DateAdapter };
if (false) {
    /**
     * The locale to use for all dates.
     * @type {?}
     */
    DateAdapter.prototype.locale;
    /**
     * Gets the year component of the given date.
     * @abstract
     * @param {?} date The date to extract the year from.
     * @return {?} The year component.
     */
    DateAdapter.prototype.getYear = function (date) { };
    /**
     * Gets the month component of the given date.
     * @abstract
     * @param {?} date The date to extract the month from.
     * @return {?} The month component (0-indexed, 0 = January).
     */
    DateAdapter.prototype.getMonth = function (date) { };
    /**
     * Gets the date of the month component of the given date.
     * @abstract
     * @param {?} date The date to extract the date of the month from.
     * @return {?} The month component (1-indexed, 1 = first of month).
     */
    DateAdapter.prototype.getDate = function (date) { };
    /**
     * Gets the day of the week component of the given date.
     * @abstract
     * @param {?} date The date to extract the day of the week from.
     * @return {?} The month component (0-indexed, 0 = Sunday).
     */
    DateAdapter.prototype.getDayOfWeek = function (date) { };
    /**
     * Gets a list of names for the months.
     * @abstract
     * @param {?} style The naming style (e.g. long = 'January', short = 'Jan', narrow = 'J').
     * @return {?} An ordered list of all month names, starting with January.
     */
    DateAdapter.prototype.getMonthNames = function (style) { };
    /**
     * Gets a list of names for the dates of the month.
     * @abstract
     * @return {?} An ordered list of all date of the month names, starting with '1'.
     */
    DateAdapter.prototype.getDateNames = function () { };
    /**
     * Gets a list of names for the days of the week.
     * @abstract
     * @param {?} style The naming style (e.g. long = 'Sunday', short = 'Sun', narrow = 'S').
     * @return {?} An ordered list of all weekday names, starting with Sunday.
     */
    DateAdapter.prototype.getDayOfWeekNames = function (style) { };
    /**
     * Gets the name for the year of the given date.
     * @abstract
     * @param {?} date The date to get the year name for.
     * @return {?} The name of the given year (e.g. '2017').
     */
    DateAdapter.prototype.getYearName = function (date) { };
    /**
     * Gets the first day of the week.
     * @abstract
     * @return {?} The first day of the week (0-indexed, 0 = Sunday).
     */
    DateAdapter.prototype.getFirstDayOfWeek = function () { };
    /**
     * Gets the number of days in the month of the given date.
     * @abstract
     * @param {?} date The date whose month should be checked.
     * @return {?} The number of days in the month of the given date.
     */
    DateAdapter.prototype.getNumDaysInMonth = function (date) { };
    /**
     * Clones the given date.
     * @abstract
     * @param {?} date The date to clone
     * @return {?} A new date equal to the given date.
     */
    DateAdapter.prototype.clone = function (date) { };
    /**
     * Creates a date with the given year, month, and date. Does not allow over/under-flow of the
     * month and date.
     * @abstract
     * @param {?} year The full year of the date. (e.g. 89 means the year 89, not the year 1989).
     * @param {?} month The month of the date (0-indexed, 0 = January). Must be an integer 0 - 11.
     * @param {?} date The date of month of the date. Must be an integer 1 - length of the given month.
     * @return {?} The new date, or null if invalid.
     */
    DateAdapter.prototype.createDate = function (year, month, date) { };
    /**
     * Gets today's date.
     * @abstract
     * @return {?} Today's date.
     */
    DateAdapter.prototype.today = function () { };
    /**
     * Parses a date from a value.
     * @abstract
     * @param {?} value The value to parse.
     * @param {?} parseFormat The expected format of the value being parsed
     *     (type is implementation-dependent).
     * @return {?} The parsed date, or null if date could not be parsed.
     */
    DateAdapter.prototype.parse = function (value, parseFormat) { };
    /**
     * Formats a date as a string.
     * @abstract
     * @param {?} date The value to parse.
     * @param {?} displayFormat The format to use to display the date as a string.
     * @return {?} The parsed date, or null if date could not be parsed.
     */
    DateAdapter.prototype.format = function (date, displayFormat) { };
    /**
     * Adds the given number of years to the date. Years are counted as if flipping 12 pages on the
     * calendar for each year and then finding the closest date in the new month. For example when
     * adding 1 year to Feb 29, 2016, the resulting date will be Feb 28, 2017.
     * @abstract
     * @param {?} date The date to add years to.
     * @param {?} years The number of years to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of years added.
     */
    DateAdapter.prototype.addCalendarYears = function (date, years) { };
    /**
     * Adds the given number of months to the date. Months are counted as if flipping a page on the
     * calendar for each month and then finding the closest date in the new month. For example when
     * adding 1 month to Jan 31, 2017, the resulting date will be Feb 28, 2017.
     * @abstract
     * @param {?} date The date to add months to.
     * @param {?} months The number of months to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of months added.
     */
    DateAdapter.prototype.addCalendarMonths = function (date, months) { };
    /**
     * Adds the given number of days to the date. Days are counted as if moving one cell on the
     * calendar for each day.
     * @abstract
     * @param {?} date The date to add days to.
     * @param {?} days The number of days to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of days added.
     */
    DateAdapter.prototype.addCalendarDays = function (date, days) { };
    /**
     * Gets the RFC 3339 compatible date string (https://tools.ietf.org/html/rfc3339)  for the given
     * date.
     * @abstract
     * @param {?} date The date to get the ISO date string for.
     * @return {?} The ISO date string date string.
     */
    DateAdapter.prototype.getISODateString = function (date) { };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9kYXRldGltZS9kYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7O0FBQUE7OztJQXFKRTs7O09BR0c7Ozs7OztJQUNILCtCQUFTOzs7OztJQUFULFVBQVUsTUFBVztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN0QjtJQUVEOzs7Ozs7T0FNRzs7Ozs7Ozs7SUFDSCxpQ0FBVzs7Ozs7OztJQUFYLFVBQVksS0FBUSxFQUFFLE1BQVM7UUFDN0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2hEO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7OztJQUNILDhCQUFROzs7Ozs7O0lBQVIsVUFBUyxLQUFlLEVBQUUsTUFBZ0I7UUFDeEMsT0FBTyxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO0tBQzdFO0lBRUQ7Ozs7Ozs7T0FPRzs7Ozs7Ozs7O0lBQ0gsK0JBQVM7Ozs7Ozs7O0lBQVQsVUFBVSxJQUFPLEVBQUUsR0FBYyxFQUFFLEdBQWM7UUFDL0MsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFDLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDMUMsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELE9BQU8sSUFBSSxDQUFDO0tBQ2I7c0JBdE1IO0lBdU1DLENBQUE7Ozs7OztBQXRNRCx1QkFzTUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogQWRhcHRzIHR5cGUgYERgIHRvIGJlIHVzYWJsZSBhcyBhIGRhdGUgYnkgY2RrLWJhc2VkIGNvbXBvbmVudHMgdGhhdCB3b3JrIHdpdGggZGF0ZXMuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0ZUFkYXB0ZXI8RD4ge1xuICAvKiogVGhlIGxvY2FsZSB0byB1c2UgZm9yIGFsbCBkYXRlcy4gKi9cbiAgcHJvdGVjdGVkIGxvY2FsZTogYW55O1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB5ZWFyIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCB0aGUgeWVhciBmcm9tLlxuICAgKiBAcmV0dXJucyBUaGUgeWVhciBjb21wb25lbnQuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRZZWFyKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG1vbnRoIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCB0aGUgbW9udGggZnJvbS5cbiAgICogQHJldHVybnMgVGhlIG1vbnRoIGNvbXBvbmVudCAoMC1pbmRleGVkLCAwID0gSmFudWFyeSkuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRNb250aChkYXRlOiBEKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkYXRlIG9mIHRoZSBtb250aCBjb21wb25lbnQgb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgdGhlIGRhdGUgb2YgdGhlIG1vbnRoIGZyb20uXG4gICAqIEByZXR1cm5zIFRoZSBtb250aCBjb21wb25lbnQgKDEtaW5kZXhlZCwgMSA9IGZpcnN0IG9mIG1vbnRoKS5cbiAgICovXG4gIGFic3RyYWN0IGdldERhdGUoZGF0ZTogRCk6IG51bWJlcjtcblxuICAvKipcbiAgICogR2V0cyB0aGUgZGF5IG9mIHRoZSB3ZWVrIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCB0aGUgZGF5IG9mIHRoZSB3ZWVrIGZyb20uXG4gICAqIEByZXR1cm5zIFRoZSBtb250aCBjb21wb25lbnQgKDAtaW5kZXhlZCwgMCA9IFN1bmRheSkuXG4gICAqL1xuICBhYnN0cmFjdCBnZXREYXlPZldlZWsoZGF0ZTogRCk6IG51bWJlcjtcblxuICAvKipcbiAgICogR2V0cyBhIGxpc3Qgb2YgbmFtZXMgZm9yIHRoZSBtb250aHMuXG4gICAqIEBwYXJhbSBzdHlsZSBUaGUgbmFtaW5nIHN0eWxlIChlLmcuIGxvbmcgPSAnSmFudWFyeScsIHNob3J0ID0gJ0phbicsIG5hcnJvdyA9ICdKJykuXG4gICAqIEByZXR1cm5zIEFuIG9yZGVyZWQgbGlzdCBvZiBhbGwgbW9udGggbmFtZXMsIHN0YXJ0aW5nIHdpdGggSmFudWFyeS5cbiAgICovXG4gIGFic3RyYWN0IGdldE1vbnRoTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiBuYW1lcyBmb3IgdGhlIGRhdGVzIG9mIHRoZSBtb250aC5cbiAgICogQHJldHVybnMgQW4gb3JkZXJlZCBsaXN0IG9mIGFsbCBkYXRlIG9mIHRoZSBtb250aCBuYW1lcywgc3RhcnRpbmcgd2l0aCAnMScuXG4gICAqL1xuICBhYnN0cmFjdCBnZXREYXRlTmFtZXMoKTogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEdldHMgYSBsaXN0IG9mIG5hbWVzIGZvciB0aGUgZGF5cyBvZiB0aGUgd2Vlay5cbiAgICogQHBhcmFtIHN0eWxlIFRoZSBuYW1pbmcgc3R5bGUgKGUuZy4gbG9uZyA9ICdTdW5kYXknLCBzaG9ydCA9ICdTdW4nLCBuYXJyb3cgPSAnUycpLlxuICAgKiBAcmV0dXJucyBBbiBvcmRlcmVkIGxpc3Qgb2YgYWxsIHdlZWtkYXkgbmFtZXMsIHN0YXJ0aW5nIHdpdGggU3VuZGF5LlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBuYW1lIGZvciB0aGUgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZ2V0IHRoZSB5ZWFyIG5hbWUgZm9yLlxuICAgKiBAcmV0dXJucyBUaGUgbmFtZSBvZiB0aGUgZ2l2ZW4geWVhciAoZS5nLiAnMjAxNycpLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0WWVhck5hbWUoZGF0ZTogRCk6IHN0cmluZztcblxuICAvKipcbiAgICogR2V0cyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxuICAgKiBAcmV0dXJucyBUaGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrICgwLWluZGV4ZWQsIDAgPSBTdW5kYXkpLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0Rmlyc3REYXlPZldlZWsoKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbW9udGggb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHdob3NlIG1vbnRoIHNob3VsZCBiZSBjaGVja2VkLlxuICAgKiBAcmV0dXJucyBUaGUgbnVtYmVyIG9mIGRheXMgaW4gdGhlIG1vbnRoIG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogRCk6IG51bWJlcjtcblxuICAvKipcbiAgICogQ2xvbmVzIHRoZSBnaXZlbiBkYXRlLlxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBjbG9uZVxuICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBkYXRlLlxuICAgKi9cbiAgYWJzdHJhY3QgY2xvbmUoZGF0ZTogRCk6IEQ7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkYXRlIHdpdGggdGhlIGdpdmVuIHllYXIsIG1vbnRoLCBhbmQgZGF0ZS4gRG9lcyBub3QgYWxsb3cgb3Zlci91bmRlci1mbG93IG9mIHRoZVxuICAgKiBtb250aCBhbmQgZGF0ZS5cbiAgICogQHBhcmFtIHllYXIgVGhlIGZ1bGwgeWVhciBvZiB0aGUgZGF0ZS4gKGUuZy4gODkgbWVhbnMgdGhlIHllYXIgODksIG5vdCB0aGUgeWVhciAxOTg5KS5cbiAgICogQHBhcmFtIG1vbnRoIFRoZSBtb250aCBvZiB0aGUgZGF0ZSAoMC1pbmRleGVkLCAwID0gSmFudWFyeSkuIE11c3QgYmUgYW4gaW50ZWdlciAwIC0gMTEuXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIG9mIG1vbnRoIG9mIHRoZSBkYXRlLiBNdXN0IGJlIGFuIGludGVnZXIgMSAtIGxlbmd0aCBvZiB0aGUgZ2l2ZW4gbW9udGguXG4gICAqIEByZXR1cm5zIFRoZSBuZXcgZGF0ZSwgb3IgbnVsbCBpZiBpbnZhbGlkLlxuICAgKi9cbiAgYWJzdHJhY3QgY3JlYXRlRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRhdGU6IG51bWJlcik6IEQ7XG5cbiAgLyoqXG4gICAqIEdldHMgdG9kYXkncyBkYXRlLlxuICAgKiBAcmV0dXJucyBUb2RheSdzIGRhdGUuXG4gICAqL1xuICBhYnN0cmFjdCB0b2RheSgpOiBEO1xuXG4gIC8qKlxuICAgKiBQYXJzZXMgYSBkYXRlIGZyb20gYSB2YWx1ZS5cbiAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBwYXJzZS5cbiAgICogQHBhcmFtIHBhcnNlRm9ybWF0IFRoZSBleHBlY3RlZCBmb3JtYXQgb2YgdGhlIHZhbHVlIGJlaW5nIHBhcnNlZFxuICAgKiAgICAgKHR5cGUgaXMgaW1wbGVtZW50YXRpb24tZGVwZW5kZW50KS5cbiAgICogQHJldHVybnMgVGhlIHBhcnNlZCBkYXRlLCBvciBudWxsIGlmIGRhdGUgY291bGQgbm90IGJlIHBhcnNlZC5cbiAgICovXG4gIGFic3RyYWN0IHBhcnNlKHZhbHVlOiBhbnksIHBhcnNlRm9ybWF0OiBhbnkpOiBEIHwgbnVsbDtcblxuICAvKipcbiAgICogRm9ybWF0cyBhIGRhdGUgYXMgYSBzdHJpbmcuXG4gICAqIEBwYXJhbSBkYXRlIFRoZSB2YWx1ZSB0byBwYXJzZS5cbiAgICogQHBhcmFtIGRpc3BsYXlGb3JtYXQgVGhlIGZvcm1hdCB0byB1c2UgdG8gZGlzcGxheSB0aGUgZGF0ZSBhcyBhIHN0cmluZy5cbiAgICogQHJldHVybnMgVGhlIHBhcnNlZCBkYXRlLCBvciBudWxsIGlmIGRhdGUgY291bGQgbm90IGJlIHBhcnNlZC5cbiAgICovXG4gIGFic3RyYWN0IGZvcm1hdChkYXRlOiBELCBkaXNwbGF5Rm9ybWF0OiBhbnkpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIGdpdmVuIG51bWJlciBvZiB5ZWFycyB0byB0aGUgZGF0ZS4gWWVhcnMgYXJlIGNvdW50ZWQgYXMgaWYgZmxpcHBpbmcgMTIgcGFnZXMgb24gdGhlXG4gICAqIGNhbGVuZGFyIGZvciBlYWNoIHllYXIgYW5kIHRoZW4gZmluZGluZyB0aGUgY2xvc2VzdCBkYXRlIGluIHRoZSBuZXcgbW9udGguIEZvciBleGFtcGxlIHdoZW5cbiAgICogYWRkaW5nIDEgeWVhciB0byBGZWIgMjksIDIwMTYsIHRoZSByZXN1bHRpbmcgZGF0ZSB3aWxsIGJlIEZlYiAyOCwgMjAxNy5cbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gYWRkIHllYXJzIHRvLlxuICAgKiBAcGFyYW0geWVhcnMgVGhlIG51bWJlciBvZiB5ZWFycyB0byBhZGQgKG1heSBiZSBuZWdhdGl2ZSkuXG4gICAqIEByZXR1cm5zIEEgbmV3IGRhdGUgZXF1YWwgdG8gdGhlIGdpdmVuIG9uZSB3aXRoIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHllYXJzIGFkZGVkLlxuICAgKi9cbiAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBELCB5ZWFyczogbnVtYmVyKTogRDtcblxuICAvKipcbiAgICogQWRkcyB0aGUgZ2l2ZW4gbnVtYmVyIG9mIG1vbnRocyB0byB0aGUgZGF0ZS4gTW9udGhzIGFyZSBjb3VudGVkIGFzIGlmIGZsaXBwaW5nIGEgcGFnZSBvbiB0aGVcbiAgICogY2FsZW5kYXIgZm9yIGVhY2ggbW9udGggYW5kIHRoZW4gZmluZGluZyB0aGUgY2xvc2VzdCBkYXRlIGluIHRoZSBuZXcgbW9udGguIEZvciBleGFtcGxlIHdoZW5cbiAgICogYWRkaW5nIDEgbW9udGggdG8gSmFuIDMxLCAyMDE3LCB0aGUgcmVzdWx0aW5nIGRhdGUgd2lsbCBiZSBGZWIgMjgsIDIwMTcuXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGFkZCBtb250aHMgdG8uXG4gICAqIEBwYXJhbSBtb250aHMgVGhlIG51bWJlciBvZiBtb250aHMgdG8gYWRkIChtYXkgYmUgbmVnYXRpdmUpLlxuICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBvbmUgd2l0aCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtb250aHMgYWRkZWQuXG4gICAqL1xuICBhYnN0cmFjdCBhZGRDYWxlbmRhck1vbnRocyhkYXRlOiBELCBtb250aHM6IG51bWJlcik6IEQ7XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIGdpdmVuIG51bWJlciBvZiBkYXlzIHRvIHRoZSBkYXRlLiBEYXlzIGFyZSBjb3VudGVkIGFzIGlmIG1vdmluZyBvbmUgY2VsbCBvbiB0aGVcbiAgICogY2FsZW5kYXIgZm9yIGVhY2ggZGF5LlxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBhZGQgZGF5cyB0by5cbiAgICogQHBhcmFtIGRheXMgVGhlIG51bWJlciBvZiBkYXlzIHRvIGFkZCAobWF5IGJlIG5lZ2F0aXZlKS5cbiAgICogQHJldHVybnMgQSBuZXcgZGF0ZSBlcXVhbCB0byB0aGUgZ2l2ZW4gb25lIHdpdGggdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgZGF5cyBhZGRlZC5cbiAgICovXG4gIGFic3RyYWN0IGFkZENhbGVuZGFyRGF5cyhkYXRlOiBELCBkYXlzOiBudW1iZXIpOiBEO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBSRkMgMzMzOSBjb21wYXRpYmxlIGRhdGUgc3RyaW5nIChodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzMzOSkgIGZvciB0aGUgZ2l2ZW5cbiAgICogZGF0ZS5cbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZ2V0IHRoZSBJU08gZGF0ZSBzdHJpbmcgZm9yLlxuICAgKiBAcmV0dXJucyBUaGUgSVNPIGRhdGUgc3RyaW5nIGRhdGUgc3RyaW5nLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0SVNPRGF0ZVN0cmluZyhkYXRlOiBEKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBsb2NhbGUgdXNlZCBmb3IgYWxsIGRhdGVzLlxuICAgKiBAcGFyYW0gbG9jYWxlIFRoZSBuZXcgbG9jYWxlLlxuICAgKi9cbiAgc2V0TG9jYWxlKGxvY2FsZTogYW55KSB7XG4gICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGFyZXMgdHdvIGRhdGVzLlxuICAgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IGRhdGUgdG8gY29tcGFyZS5cbiAgICogQHBhcmFtIHNlY29uZCBUaGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZS5cbiAgICogQHJldHVybnMgMCBpZiB0aGUgZGF0ZXMgYXJlIGVxdWFsLCBhIG51bWJlciBsZXNzIHRoYW4gMCBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBlYXJsaWVyLFxuICAgKiAgICAgYSBudW1iZXIgZ3JlYXRlciB0aGFuIDAgaWYgdGhlIGZpcnN0IGRhdGUgaXMgbGF0ZXIuXG4gICAqL1xuICBjb21wYXJlRGF0ZShmaXJzdDogRCwgc2Vjb25kOiBEKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXRZZWFyKGZpcnN0KSAtIHRoaXMuZ2V0WWVhcihzZWNvbmQpIHx8XG4gICAgICAgIHRoaXMuZ2V0TW9udGgoZmlyc3QpIC0gdGhpcy5nZXRNb250aChzZWNvbmQpIHx8XG4gICAgICAgIHRoaXMuZ2V0RGF0ZShmaXJzdCkgLSB0aGlzLmdldERhdGUoc2Vjb25kKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdHdvIGRhdGVzIGFyZSBlcXVhbC5cbiAgICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCBkYXRlIHRvIGNoZWNrLlxuICAgKiBAcGFyYW0gc2Vjb25kIFRoZSBzZWNvbmQgZGF0ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMgV2hldGhlciB0aGUgdHdvIGRhdGVzIGFyZSBlcXVhbC5cbiAgICogICAgIE51bGwgZGF0ZXMgYXJlIGNvbnNpZGVyZWQgZXF1YWwgdG8gb3RoZXIgbnVsbCBkYXRlcy5cbiAgICovXG4gIHNhbWVEYXRlKGZpcnN0OiBEIHwgbnVsbCwgc2Vjb25kOiBEIHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmaXJzdCAmJiBzZWNvbmQgPyAhdGhpcy5jb21wYXJlRGF0ZShmaXJzdCwgc2Vjb25kKSA6IGZpcnN0ID09IHNlY29uZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGFtcCB0aGUgZ2l2ZW4gZGF0ZSBiZXR3ZWVuIG1pbiBhbmQgbWF4IGRhdGVzLlxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBjbGFtcC5cbiAgICogQHBhcmFtIG1pbiBUaGUgbWluaW11bSB2YWx1ZSB0byBhbGxvdy4gSWYgbnVsbCBvciBvbWl0dGVkIG5vIG1pbiBpcyBlbmZvcmNlZC5cbiAgICogQHBhcmFtIG1heCBUaGUgbWF4aW11bSB2YWx1ZSB0byBhbGxvdy4gSWYgbnVsbCBvciBvbWl0dGVkIG5vIG1heCBpcyBlbmZvcmNlZC5cbiAgICogQHJldHVybnMgYG1pbmAgaWYgYGRhdGVgIGlzIGxlc3MgdGhhbiBgbWluYCwgYG1heGAgaWYgZGF0ZSBpcyBncmVhdGVyIHRoYW4gYG1heGAsXG4gICAqICAgICBvdGhlcndpc2UgYGRhdGVgLlxuICAgKi9cbiAgY2xhbXBEYXRlKGRhdGU6IEQsIG1pbj86IEQgfCBudWxsLCBtYXg/OiBEIHwgbnVsbCk6IEQge1xuICAgIGlmIChtaW4gJiYgdGhpcy5jb21wYXJlRGF0ZShkYXRlLCBtaW4pIDwgMCkge1xuICAgICAgcmV0dXJuIG1pbjtcbiAgICB9XG4gICAgaWYgKG1heCAmJiB0aGlzLmNvbXBhcmVEYXRlKGRhdGUsIG1heCkgPiAwKSB7XG4gICAgICByZXR1cm4gbWF4O1xuICAgIH1cbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxufVxuIl19