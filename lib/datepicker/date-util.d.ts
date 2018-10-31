import { DateLocale } from './date-locale';
export declare class DateUtil {
    _locale: DateLocale;
    parseDateMap: any;
    replace(s: string, regexp: any, sub?: string): string;
    startsWith(base: any, start: any): boolean;
    isType(s: any, o: any): boolean;
    isFunction(f: any): boolean;
    isList(v: any): boolean;
    isString(s: any): boolean;
    isObject(f: any): boolean;
    isNode(n: any): any;
    isNumber(n: any): boolean;
    getFindFunc(findFunc: any): any;
    getFindIndex(list: any, index: any, defaultIndex: any): any;
    find(list: any, findFunc: any, startIndex?: any, endIndex?: any): any;
    parseDate(date: string, fmt: string): Date;
    today(): Date;
    parse(value: any): Date | null;
    getYear(date: Date): number;
    getMonth(date: Date): number;
    getDate(date: Date): number;
    getHours(date: Date): number;
    getMinutes(date: Date): number;
    getSeconds(date: Date): number;
    createDate(year: number, month: number, date: number, hours: number, minutes: number, seconds: number): Date;
    clone(date: Date): Date;
    getNumDaysInMonth(date: Date): number;
    addCalendarYears(date: Date, years: number): Date;
    addCalendarMonths(date: Date, months: number): Date;
    addCalendarDays(date: Date, days: number): Date;
    addCalendarHours(date: Date, hours: number): Date;
    addCalendarMinutes(date: Date, minutes: number): Date;
    getISODateString(date: Date): string;
    /** Creates a date but allows the month and date to overflow. */
    private _createDateWithOverflow;
    /**
     * Pads a number to make it two digits.
     * @param n The number to pad.
     * @returns The padded number.
     */
    private _2digit;
    compareDate(first: Date, second: Date): number;
    /**
     * Gets the first day of the month for the given date's month.
     */
    getFirstDateOfWeek(date: Date, firstDayOfWeek: number): Date;
    /**
     * Gets the first day of the month for the given date's month.
     */
    getFirstDateOfMonth(date: Date): Date;
    /**
     * Gets the number of days in the month for the given date's month.
     */
    getNumberOfDaysInMonth(date: Date): number;
    /**
     * Get an arbitrary date in the month after the given date's month.
     */
    getDateInNextMonth(date: Date): Date;
    /**
     * Get an arbitrary date in the month before the given date's month.
     */
    getDateInPreviousMonth(date: Date): Date;
    /**
     * Gets whether two dates have the same year.
     */
    isSameYear(d1: Date, d2: Date): boolean;
    /**
     * Gets whether two dates have the same month and year.
     */
    isSameMonthAndYear(d1: Date, d2: Date): boolean;
    /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     */
    isSameDay(d1: Date, d2: Date): boolean;
    /**
     * Gets whether two dates are the same hours.
     */
    isSameHour(d1: Date, d2: Date): boolean;
    /**
     * Gets whether two dates are the same minutes.
     */
    isSameMinute(d1: Date, d2: Date): boolean;
    /**
     * Gets whether a date is in the month immediately after some date.
     * @param startDate The date from which to compare.
     * @param endDate The date to check.
     * @returns
     */
    isInNextMonth(startDate: Date, endDate: Date): boolean;
    /**
     * Gets whether a date is in the month immediately before some date.
     * @param startDate The date from which to compare.
     * @param endDate The date to check.
     * @returns
     */
    isInPreviousMonth(startDate: Date, endDate: Date): boolean;
    /**
     * Gets the midpoint between two dates.
     * @param d1
     * @param d2
     * @returns
     */
    getDateMidpoint(d1: Date, d2: Date): Date;
    /**
     * Gets the week of the month that a given date occurs in.
     * @param date
     * @returns Index of the week of the month (zero-based).
     */
    getWeekOfMonth(date: Date): number;
    /**
     * Gets the week of the year that a given date occurs in.
     * @param date
     * @returns Index of the week according to ISO-8601.
     */
    getWeekOfYear(date: Date): number;
    /**
     * Gets a new date incremented by the given number of minutes. Number of minutes can be negative.
     * @param date
     * @param numberOfMinutes
     * @returns
     */
    incrementMinutes(date: Date, numberOfMinutes: number): Date;
    /**
     * Gets a new date incremented by the given number of hours. Number of hours can be negative.
     * @param date
     * @param numberOfHours
     * @returns
     */
    incrementHours(date: Date, numberOfHours: number): Date;
    /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param date
     * @param numberOfDays
     * @returns
     */
    incrementDays(date: Date, numberOfDays: number): Date;
    /**
     * Gets a new date incremented by the given number of months. Number of months can be negative.
     * If the date of the given month does not match the target month, the date will be set to the
     * last day of the month.
     * @param date
     * @param numberOfMonths
     * @returns
     */
    incrementMonths(date: Date, numberOfMonths: number): Date;
    /**
     * Get the integer distance between two months. This *only* considers the month and year
     * portion of the Date instances.
     *
     * @param start
     * @param end
     * @returns Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    getMonthDistance(start: Date, end: Date): number;
    /**
     * Gets the last day of the month for the given date.
     * @param date
     * @returns
     */
    getLastDateOfMonth(date: Date): Date;
    /**
     * Checks whether a date is valid.
     * @param date
     * @return  Whether the date is a valid Date.
     */
    isValidDate(date: Date): boolean;
    /**
     * Sets a date's time to midnight.
     * @param date
     */
    setDateTimeToMidnight(date: Date): void;
    /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor:
     * 1. No argument for Date representing now.
     * 2. Single-argument value representing number of seconds since Unix Epoch
     * or a Date object.
     * @param value
     * @return New date with time set to midnight.
     */
    createDateAtMidnight(value: any): Date;
    /**
     * Checks if a date is within a min and max range, ignoring the time component.
     * If minDate or maxDate are not dates, they are ignored.
     * @param date
     * @param minDate
     * @param maxDate
     */
    isDateWithinRange(date: Date, minDate: Date, maxDate: Date): boolean;
    /**
     * Checks if a date is within a min and max range.
     * If minDate or maxDate are not dates, they are ignored.
     * @param date
     * @param minDate
     * @param maxDate
     */
    isFullDateWithinRange(date: Date, minDate: Date, maxDate: Date): boolean;
    /**
     * Gets a new date incremented by the given number of years. Number of years can be negative.
     * See `incrementMonths` for notes on overflow for specific dates.
     * @param date
     * @param numberOfYears
     * @returns
     */
    incrementYears(date: Date, numberOfYears: number): Date;
    /**
     * Get the integer distance between two years. This *only* considers the year portion of the
     * Date instances.
     *
     * @param start
     * @param end
     * @returns Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    getYearDistance(start: Date, end: Date): number;
    /**
     * Clamps a date between a minimum and a maximum date.
     * @param date Date to be clamped
     * @param minDate Minimum date
     * @param maxDate Maximum date
     * @return
     */
    clampDate(date: Date, minDate: Date, maxDate: Date): Date;
    /**
     * Extracts and parses the timestamp from a DOM node.
     * @param node Node from which the timestamp will be extracted.
     * @return Time since epoch.
     */
    getTimestampFromNode(node: any): number;
    /**
     * Checks if a month is within a min and max range, ignoring the date and time components.
     * If minDate or maxDate are not dates, they are ignored.
     * @param date
     * @param minDate
     * @param maxDate
     */
    isMonthWithinRange(date: Date, minDate: Date, maxDate: Date): boolean;
    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDateAndTime(first: Date, second: Date): number;
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    sameDate(first: Date | null, second: Date | null): boolean;
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @returns Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    sameDateAndTime(first: Date | null, second: Date | null): boolean;
}
