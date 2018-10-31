/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
export class DateAdapter {
    /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    setLocale(locale) {
        this.locale = locale;
    }
    /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDate(first, second) {
        return this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second);
    }
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    sameDate(first, second) {
        return first && second ? !this.compareDate(first, second) : first == second;
    }
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    clampDate(date, min, max) {
        if (min && this.compareDate(date, min) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max) > 0) {
            return max;
        }
        return date;
    }
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9kYXRldGltZS9kYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsTUFBTTs7Ozs7O0lBeUpKLFNBQVMsQ0FBQyxNQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3RCOzs7Ozs7OztJQVNELFdBQVcsQ0FBQyxLQUFRLEVBQUUsTUFBUztRQUM3QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDaEQ7Ozs7Ozs7O0lBU0QsUUFBUSxDQUFDLEtBQWUsRUFBRSxNQUFnQjtRQUN4QyxPQUFPLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUM7S0FDN0U7Ozs7Ozs7OztJQVVELFNBQVMsQ0FBQyxJQUFPLEVBQUUsR0FBYyxFQUFFLEdBQWM7UUFDL0MsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFDLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDMUMsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELE9BQU8sSUFBSSxDQUFDO0tBQ2I7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBBZGFwdHMgdHlwZSBgRGAgdG8gYmUgdXNhYmxlIGFzIGEgZGF0ZSBieSBjZGstYmFzZWQgY29tcG9uZW50cyB0aGF0IHdvcmsgd2l0aCBkYXRlcy4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRlQWRhcHRlcjxEPiB7XG4gIC8qKiBUaGUgbG9jYWxlIHRvIHVzZSBmb3IgYWxsIGRhdGVzLiAqL1xuICBwcm90ZWN0ZWQgbG9jYWxlOiBhbnk7XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHllYXIgY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBleHRyYWN0IHRoZSB5ZWFyIGZyb20uXG4gICAqIEByZXR1cm5zIFRoZSB5ZWFyIGNvbXBvbmVudC5cbiAgICovXG4gIGFic3RyYWN0IGdldFllYXIoZGF0ZTogRCk6IG51bWJlcjtcblxuICAvKipcbiAgICogR2V0cyB0aGUgbW9udGggY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBleHRyYWN0IHRoZSBtb250aCBmcm9tLlxuICAgKiBAcmV0dXJucyBUaGUgbW9udGggY29tcG9uZW50ICgwLWluZGV4ZWQsIDAgPSBKYW51YXJ5KS5cbiAgICovXG4gIGFic3RyYWN0IGdldE1vbnRoKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGRhdGUgb2YgdGhlIG1vbnRoIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCB0aGUgZGF0ZSBvZiB0aGUgbW9udGggZnJvbS5cbiAgICogQHJldHVybnMgVGhlIG1vbnRoIGNvbXBvbmVudCAoMS1pbmRleGVkLCAxID0gZmlyc3Qgb2YgbW9udGgpLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0RGF0ZShkYXRlOiBEKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkYXkgb2YgdGhlIHdlZWsgY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBleHRyYWN0IHRoZSBkYXkgb2YgdGhlIHdlZWsgZnJvbS5cbiAgICogQHJldHVybnMgVGhlIG1vbnRoIGNvbXBvbmVudCAoMC1pbmRleGVkLCAwID0gU3VuZGF5KS5cbiAgICovXG4gIGFic3RyYWN0IGdldERheU9mV2VlayhkYXRlOiBEKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiBuYW1lcyBmb3IgdGhlIG1vbnRocy5cbiAgICogQHBhcmFtIHN0eWxlIFRoZSBuYW1pbmcgc3R5bGUgKGUuZy4gbG9uZyA9ICdKYW51YXJ5Jywgc2hvcnQgPSAnSmFuJywgbmFycm93ID0gJ0onKS5cbiAgICogQHJldHVybnMgQW4gb3JkZXJlZCBsaXN0IG9mIGFsbCBtb250aCBuYW1lcywgc3RhcnRpbmcgd2l0aCBKYW51YXJ5LlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEdldHMgYSBsaXN0IG9mIG5hbWVzIGZvciB0aGUgZGF0ZXMgb2YgdGhlIG1vbnRoLlxuICAgKiBAcmV0dXJucyBBbiBvcmRlcmVkIGxpc3Qgb2YgYWxsIGRhdGUgb2YgdGhlIG1vbnRoIG5hbWVzLCBzdGFydGluZyB3aXRoICcxJy5cbiAgICovXG4gIGFic3RyYWN0IGdldERhdGVOYW1lcygpOiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogR2V0cyBhIGxpc3Qgb2YgbmFtZXMgZm9yIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxuICAgKiBAcGFyYW0gc3R5bGUgVGhlIG5hbWluZyBzdHlsZSAoZS5nLiBsb25nID0gJ1N1bmRheScsIHNob3J0ID0gJ1N1bicsIG5hcnJvdyA9ICdTJykuXG4gICAqIEByZXR1cm5zIEFuIG9yZGVyZWQgbGlzdCBvZiBhbGwgd2Vla2RheSBuYW1lcywgc3RhcnRpbmcgd2l0aCBTdW5kYXkuXG4gICAqL1xuICBhYnN0cmFjdCBnZXREYXlPZldlZWtOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG5hbWUgZm9yIHRoZSB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlLlxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBnZXQgdGhlIHllYXIgbmFtZSBmb3IuXG4gICAqIEByZXR1cm5zIFRoZSBuYW1lIG9mIHRoZSBnaXZlbiB5ZWFyIChlLmcuICcyMDE3JykuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRZZWFyTmFtZShkYXRlOiBEKTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXG4gICAqIEByZXR1cm5zIFRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgKDAtaW5kZXhlZCwgMCA9IFN1bmRheSkuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRGaXJzdERheU9mV2VlaygpOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgd2hvc2UgbW9udGggc2hvdWxkIGJlIGNoZWNrZWQuXG4gICAqIEByZXR1cm5zIFRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbW9udGggb2YgdGhlIGdpdmVuIGRhdGUuXG4gICAqL1xuICBhYnN0cmFjdCBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBEKTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBDbG9uZXMgdGhlIGdpdmVuIGRhdGUuXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGNsb25lXG4gICAqIEByZXR1cm5zIEEgbmV3IGRhdGUgZXF1YWwgdG8gdGhlIGdpdmVuIGRhdGUuXG4gICAqL1xuICBhYnN0cmFjdCBjbG9uZShkYXRlOiBEKTogRDtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGRhdGUgd2l0aCB0aGUgZ2l2ZW4geWVhciwgbW9udGgsIGFuZCBkYXRlLiBEb2VzIG5vdCBhbGxvdyBvdmVyL3VuZGVyLWZsb3cgb2YgdGhlXG4gICAqIG1vbnRoIGFuZCBkYXRlLlxuICAgKiBAcGFyYW0geWVhciBUaGUgZnVsbCB5ZWFyIG9mIHRoZSBkYXRlLiAoZS5nLiA4OSBtZWFucyB0aGUgeWVhciA4OSwgbm90IHRoZSB5ZWFyIDE5ODkpLlxuICAgKiBAcGFyYW0gbW9udGggVGhlIG1vbnRoIG9mIHRoZSBkYXRlICgwLWluZGV4ZWQsIDAgPSBKYW51YXJ5KS4gTXVzdCBiZSBhbiBpbnRlZ2VyIDAgLSAxMS5cbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgb2YgbW9udGggb2YgdGhlIGRhdGUuIE11c3QgYmUgYW4gaW50ZWdlciAxIC0gbGVuZ3RoIG9mIHRoZSBnaXZlbiBtb250aC5cbiAgICogQHJldHVybnMgVGhlIG5ldyBkYXRlLCBvciBudWxsIGlmIGludmFsaWQuXG4gICAqL1xuICBhYnN0cmFjdCBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyKTogRDtcblxuICAvKipcbiAgICogR2V0cyB0b2RheSdzIGRhdGUuXG4gICAqIEByZXR1cm5zIFRvZGF5J3MgZGF0ZS5cbiAgICovXG4gIGFic3RyYWN0IHRvZGF5KCk6IEQ7XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhIGRhdGUgZnJvbSBhIHZhbHVlLlxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHBhcnNlLlxuICAgKiBAcGFyYW0gcGFyc2VGb3JtYXQgVGhlIGV4cGVjdGVkIGZvcm1hdCBvZiB0aGUgdmFsdWUgYmVpbmcgcGFyc2VkXG4gICAqICAgICAodHlwZSBpcyBpbXBsZW1lbnRhdGlvbi1kZXBlbmRlbnQpLlxuICAgKiBAcmV0dXJucyBUaGUgcGFyc2VkIGRhdGUsIG9yIG51bGwgaWYgZGF0ZSBjb3VsZCBub3QgYmUgcGFyc2VkLlxuICAgKi9cbiAgYWJzdHJhY3QgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IGFueSk6IEQgfCBudWxsO1xuXG4gIC8qKlxuICAgKiBGb3JtYXRzIGEgZGF0ZSBhcyBhIHN0cmluZy5cbiAgICogQHBhcmFtIGRhdGUgVGhlIHZhbHVlIHRvIHBhcnNlLlxuICAgKiBAcGFyYW0gZGlzcGxheUZvcm1hdCBUaGUgZm9ybWF0IHRvIHVzZSB0byBkaXNwbGF5IHRoZSBkYXRlIGFzIGEgc3RyaW5nLlxuICAgKiBAcmV0dXJucyBUaGUgcGFyc2VkIGRhdGUsIG9yIG51bGwgaWYgZGF0ZSBjb3VsZCBub3QgYmUgcGFyc2VkLlxuICAgKi9cbiAgYWJzdHJhY3QgZm9ybWF0KGRhdGU6IEQsIGRpc3BsYXlGb3JtYXQ6IGFueSk6IHN0cmluZztcblxuICAvKipcbiAgICogQWRkcyB0aGUgZ2l2ZW4gbnVtYmVyIG9mIHllYXJzIHRvIHRoZSBkYXRlLiBZZWFycyBhcmUgY291bnRlZCBhcyBpZiBmbGlwcGluZyAxMiBwYWdlcyBvbiB0aGVcbiAgICogY2FsZW5kYXIgZm9yIGVhY2ggeWVhciBhbmQgdGhlbiBmaW5kaW5nIHRoZSBjbG9zZXN0IGRhdGUgaW4gdGhlIG5ldyBtb250aC4gRm9yIGV4YW1wbGUgd2hlblxuICAgKiBhZGRpbmcgMSB5ZWFyIHRvIEZlYiAyOSwgMjAxNiwgdGhlIHJlc3VsdGluZyBkYXRlIHdpbGwgYmUgRmViIDI4LCAyMDE3LlxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBhZGQgeWVhcnMgdG8uXG4gICAqIEBwYXJhbSB5ZWFycyBUaGUgbnVtYmVyIG9mIHllYXJzIHRvIGFkZCAobWF5IGJlIG5lZ2F0aXZlKS5cbiAgICogQHJldHVybnMgQSBuZXcgZGF0ZSBlcXVhbCB0byB0aGUgZ2l2ZW4gb25lIHdpdGggdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgeWVhcnMgYWRkZWQuXG4gICAqL1xuICBhYnN0cmFjdCBhZGRDYWxlbmRhclllYXJzKGRhdGU6IEQsIHllYXJzOiBudW1iZXIpOiBEO1xuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBnaXZlbiBudW1iZXIgb2YgbW9udGhzIHRvIHRoZSBkYXRlLiBNb250aHMgYXJlIGNvdW50ZWQgYXMgaWYgZmxpcHBpbmcgYSBwYWdlIG9uIHRoZVxuICAgKiBjYWxlbmRhciBmb3IgZWFjaCBtb250aCBhbmQgdGhlbiBmaW5kaW5nIHRoZSBjbG9zZXN0IGRhdGUgaW4gdGhlIG5ldyBtb250aC4gRm9yIGV4YW1wbGUgd2hlblxuICAgKiBhZGRpbmcgMSBtb250aCB0byBKYW4gMzEsIDIwMTcsIHRoZSByZXN1bHRpbmcgZGF0ZSB3aWxsIGJlIEZlYiAyOCwgMjAxNy5cbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gYWRkIG1vbnRocyB0by5cbiAgICogQHBhcmFtIG1vbnRocyBUaGUgbnVtYmVyIG9mIG1vbnRocyB0byBhZGQgKG1heSBiZSBuZWdhdGl2ZSkuXG4gICAqIEByZXR1cm5zIEEgbmV3IGRhdGUgZXF1YWwgdG8gdGhlIGdpdmVuIG9uZSB3aXRoIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1vbnRocyBhZGRlZC5cbiAgICovXG4gIGFic3RyYWN0IGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IEQsIG1vbnRoczogbnVtYmVyKTogRDtcblxuICAvKipcbiAgICogQWRkcyB0aGUgZ2l2ZW4gbnVtYmVyIG9mIGRheXMgdG8gdGhlIGRhdGUuIERheXMgYXJlIGNvdW50ZWQgYXMgaWYgbW92aW5nIG9uZSBjZWxsIG9uIHRoZVxuICAgKiBjYWxlbmRhciBmb3IgZWFjaCBkYXkuXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGFkZCBkYXlzIHRvLlxuICAgKiBAcGFyYW0gZGF5cyBUaGUgbnVtYmVyIG9mIGRheXMgdG8gYWRkIChtYXkgYmUgbmVnYXRpdmUpLlxuICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBvbmUgd2l0aCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkYXlzIGFkZGVkLlxuICAgKi9cbiAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IEQsIGRheXM6IG51bWJlcik6IEQ7XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIFJGQyAzMzM5IGNvbXBhdGlibGUgZGF0ZSBzdHJpbmcgKGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzMzM5KSAgZm9yIHRoZSBnaXZlblxuICAgKiBkYXRlLlxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBnZXQgdGhlIElTTyBkYXRlIHN0cmluZyBmb3IuXG4gICAqIEByZXR1cm5zIFRoZSBJU08gZGF0ZSBzdHJpbmcgZGF0ZSBzdHJpbmcuXG4gICAqL1xuICBhYnN0cmFjdCBnZXRJU09EYXRlU3RyaW5nKGRhdGU6IEQpOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGxvY2FsZSB1c2VkIGZvciBhbGwgZGF0ZXMuXG4gICAqIEBwYXJhbSBsb2NhbGUgVGhlIG5ldyBsb2NhbGUuXG4gICAqL1xuICBzZXRMb2NhbGUobG9jYWxlOiBhbnkpIHtcbiAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlcyB0d28gZGF0ZXMuXG4gICAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlLlxuICAgKiBAcGFyYW0gc2Vjb25kIFRoZSBzZWNvbmQgZGF0ZSB0byBjb21wYXJlLlxuICAgKiBAcmV0dXJucyAwIGlmIHRoZSBkYXRlcyBhcmUgZXF1YWwsIGEgbnVtYmVyIGxlc3MgdGhhbiAwIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGVhcmxpZXIsXG4gICAqICAgICBhIG51bWJlciBncmVhdGVyIHRoYW4gMCBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBsYXRlci5cbiAgICovXG4gIGNvbXBhcmVEYXRlKGZpcnN0OiBELCBzZWNvbmQ6IEQpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldFllYXIoZmlyc3QpIC0gdGhpcy5nZXRZZWFyKHNlY29uZCkgfHxcbiAgICAgICAgdGhpcy5nZXRNb250aChmaXJzdCkgLSB0aGlzLmdldE1vbnRoKHNlY29uZCkgfHxcbiAgICAgICAgdGhpcy5nZXREYXRlKGZpcnN0KSAtIHRoaXMuZ2V0RGF0ZShzZWNvbmQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0d28gZGF0ZXMgYXJlIGVxdWFsLlxuICAgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IGRhdGUgdG8gY2hlY2suXG4gICAqIEBwYXJhbSBzZWNvbmQgVGhlIHNlY29uZCBkYXRlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSB0d28gZGF0ZXMgYXJlIGVxdWFsLlxuICAgKiAgICAgTnVsbCBkYXRlcyBhcmUgY29uc2lkZXJlZCBlcXVhbCB0byBvdGhlciBudWxsIGRhdGVzLlxuICAgKi9cbiAgc2FtZURhdGUoZmlyc3Q6IEQgfCBudWxsLCBzZWNvbmQ6IEQgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZpcnN0ICYmIHNlY29uZCA/ICF0aGlzLmNvbXBhcmVEYXRlKGZpcnN0LCBzZWNvbmQpIDogZmlyc3QgPT0gc2Vjb25kO1xuICB9XG5cbiAgLyoqXG4gICAqIENsYW1wIHRoZSBnaXZlbiBkYXRlIGJldHdlZW4gbWluIGFuZCBtYXggZGF0ZXMuXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGNsYW1wLlxuICAgKiBAcGFyYW0gbWluIFRoZSBtaW5pbXVtIHZhbHVlIHRvIGFsbG93LiBJZiBudWxsIG9yIG9taXR0ZWQgbm8gbWluIGlzIGVuZm9yY2VkLlxuICAgKiBAcGFyYW0gbWF4IFRoZSBtYXhpbXVtIHZhbHVlIHRvIGFsbG93LiBJZiBudWxsIG9yIG9taXR0ZWQgbm8gbWF4IGlzIGVuZm9yY2VkLlxuICAgKiBAcmV0dXJucyBgbWluYCBpZiBgZGF0ZWAgaXMgbGVzcyB0aGFuIGBtaW5gLCBgbWF4YCBpZiBkYXRlIGlzIGdyZWF0ZXIgdGhhbiBgbWF4YCxcbiAgICogICAgIG90aGVyd2lzZSBgZGF0ZWAuXG4gICAqL1xuICBjbGFtcERhdGUoZGF0ZTogRCwgbWluPzogRCB8IG51bGwsIG1heD86IEQgfCBudWxsKTogRCB7XG4gICAgaWYgKG1pbiAmJiB0aGlzLmNvbXBhcmVEYXRlKGRhdGUsIG1pbikgPCAwKSB7XG4gICAgICByZXR1cm4gbWluO1xuICAgIH1cbiAgICBpZiAobWF4ICYmIHRoaXMuY29tcGFyZURhdGUoZGF0ZSwgbWF4KSA+IDApIHtcbiAgICAgIHJldHVybiBtYXg7XG4gICAgfVxuICAgIHJldHVybiBkYXRlO1xuICB9XG59XG4iXX0=