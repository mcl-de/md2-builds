/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
/** @type {?} */
var SUPPORTS_INTL_API = false;
/** *
 * The default month names to use if Intl API is not available.
  @type {?} */
var DEFAULT_MONTH_NAMES = {
    'long': [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'
    ],
    'short': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    'narrow': ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
var ɵ0 = function (i) { return String(i + 1); };
/** *
 * The default date names to use if Intl API is not available.
  @type {?} */
var DEFAULT_DATE_NAMES = range(31, ɵ0);
var ɵ1 = function (i) { return String(i); };
/** *
 * The default hour names to use if Intl API is not available.
  @type {?} */
var DEFAULT_HOUR_NAMES = range(24, ɵ1);
var ɵ2 = function (i) { return String(i); };
/** *
 * The default minute names to use if Intl API is not available.
  @type {?} */
var DEFAULT_MINUTE_NAMES = range(60, ɵ2);
/** *
 * The default day of the week names to use if Intl API is not available.
  @type {?} */
var DEFAULT_DAY_OF_WEEK_NAMES = {
    'long': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'short': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    'narrow': ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
    var valuesArray = Array(length);
    for (var i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/**
 * @record
 */
export function Months() { }
/** @type {?} */
Months.prototype.long;
/** @type {?} */
Months.prototype.short;
/** @type {?} */
Months.prototype.narrow;
/**
 * @record
 */
export function DaysOfWeek() { }
/** @type {?} */
DaysOfWeek.prototype.long;
/** @type {?} */
DaysOfWeek.prototype.short;
/** @type {?} */
DaysOfWeek.prototype.narrow;
var DateLocale = /** @class */ (function () {
    function DateLocale() {
        this.firstDayOfWeek = 0;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    DateLocale.prototype.getDayOfWeek = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getDay();
    };
    /**
     * @param {?} style
     * @return {?}
     */
    DateLocale.prototype.getMonthNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        var _this = this;
        if (this.months) {
            return this.months[style];
        }
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf_1 = new Intl.DateTimeFormat(this.locale, { month: style });
            return range(12, function (i) { return _this._stripDirectionalityCharacters(dtf_1.format(new Date(2017, i, 1))); });
        }
        return DEFAULT_MONTH_NAMES[style];
    };
    /**
     * @return {?}
     */
    DateLocale.prototype.getDateNames = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.dates) {
            return this.dates;
        }
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf_2 = new Intl.DateTimeFormat(this.locale, { day: 'numeric' });
            return range(31, function (i) { return _this._stripDirectionalityCharacters(dtf_2.format(new Date(2017, 0, i + 1))); });
        }
        return DEFAULT_DATE_NAMES;
    };
    /**
     * @return {?}
     */
    DateLocale.prototype.getHourNames = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.hours) {
            return this.hours;
        }
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf_3 = new Intl.DateTimeFormat(this.locale, { hour: 'numeric' });
            return range(24, function (i) { return _this._stripDirectionalityCharacters(dtf_3.format(new Date(2017, 0, 0, i))); });
        }
        return DEFAULT_HOUR_NAMES;
    };
    /**
     * @return {?}
     */
    DateLocale.prototype.getMinuteNames = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.minutes) {
            return this.minutes;
        }
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf_4 = new Intl.DateTimeFormat(this.locale, { minute: 'numeric' });
            return range(60, function (i) { return _this._stripDirectionalityCharacters(dtf_4.format(new Date(2017, 0, 0, 0, i))); });
        }
        return DEFAULT_MINUTE_NAMES;
    };
    /**
     * @param {?} style
     * @return {?}
     */
    DateLocale.prototype.getDayOfWeekNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        var _this = this;
        if (this.daysOfWeek) {
            return this.daysOfWeek[style];
        }
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf_5 = new Intl.DateTimeFormat(this.locale, { weekday: style });
            return range(7, function (i) { return _this._stripDirectionalityCharacters(dtf_5.format(new Date(2017, 0, i + 1))); });
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateLocale.prototype.getYearName = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return String(date.getFullYear());
    };
    /**
     * @return {?}
     */
    DateLocale.prototype.getFirstDayOfWeek = /**
     * @return {?}
     */
    function () {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return this.firstDayOfWeek;
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    DateLocale.prototype.format = /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    function (date, displayFormat) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            var dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return this._stripDirectionalityCharacters(dtf.format(date));
        }
        return this._stripDirectionalityCharacters(date.toDateString());
    };
    /**
     * @param {?} d
     * @return {?}
     */
    DateLocale.prototype.getDateLabel = /**
     * @param {?} d
     * @return {?}
     */
    function (d) {
        /** @type {?} */
        var day = this.getDayOfWeekNames('short')[d.getDay()];
        /** @type {?} */
        var date = this.getDateNames()[d.getDate() - 1];
        /** @type {?} */
        var month = this.getMonthNames('short')[d.getMonth()];
        return day + ", " + month + " " + date;
    };
    /**
     * @param {?} d
     * @return {?}
     */
    DateLocale.prototype.getHoursLabel = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return "" + this.getHourNames()[d.getHours()]; };
    /**
     * @param {?} d
     * @return {?}
     */
    DateLocale.prototype.getMinutesLabel = /**
     * @param {?} d
     * @return {?}
     */
    function (d) { return "" + this.getMinuteNames()[d.getMinutes()]; };
    /**
     * @param {?} d
     * @return {?}
     */
    DateLocale.prototype.getMonthLabel = /**
     * @param {?} d
     * @return {?}
     */
    function (d) {
        return this.getMonthNames('long')[d.getMonth()] + " " + this.getYearName(d);
    };
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} s The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    DateLocale.prototype._stripDirectionalityCharacters = /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param {?} s The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    function (s) {
        return s.replace(/[\u200e\u200f]/g, '');
    };
    DateLocale.decorators = [
        { type: Injectable }
    ];
    return DateLocale;
}());
export { DateLocale };
if (false) {
    /** @type {?} */
    DateLocale.prototype.locale;
    /** @type {?} */
    DateLocale.prototype.months;
    /** @type {?} */
    DateLocale.prototype.daysOfWeek;
    /** @type {?} */
    DateLocale.prototype.dates;
    /** @type {?} */
    DateLocale.prototype.hours;
    /** @type {?} */
    DateLocale.prototype.minutes;
    /** @type {?} */
    DateLocale.prototype.firstDayOfWeek;
}
export { ɵ0, ɵ1, ɵ2 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1sb2NhbGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9kYXRlcGlja2VyL2RhdGUtbG9jYWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxJQUFNLGlCQUFpQixHQUFHLEtBQUssQ0FBQzs7OztBQUloQyxJQUFNLG1CQUFtQixHQUFHO0lBQzFCLE1BQU0sRUFBRTtRQUNOLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVztRQUNyRixTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVU7S0FDbEM7SUFDRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUM3RixRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztDQUN2RSxDQUFDO1NBSW1DLFVBQUEsQ0FBQyxJQUFJLE9BQUEsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBYixDQUFhOzs7O0FBQXZELElBQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLEVBQUUsS0FBcUIsQ0FBQztTQUdwQixVQUFBLENBQUMsSUFBSSxPQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBVCxDQUFTOzs7O0FBQW5ELElBQU0sa0JBQWtCLEdBQUcsS0FBSyxDQUFDLEVBQUUsS0FBaUIsQ0FB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Qzs7O2dCQTVHM0MsVUFBVTs7cUJBdkRYOztTQXdEYSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBTVVBQT1JUU19JTlRMX0FQSSA9IGZhbHNlOyAvLyB0eXBlb2YgSW50bCAhPSAndW5kZWZpbmVkJztcblxuXG4vKiogVGhlIGRlZmF1bHQgbW9udGggbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXG5jb25zdCBERUZBVUxUX01PTlRIX05BTUVTID0ge1xuICAnbG9uZyc6IFtcbiAgICAnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLFxuICAgICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ1xuICBdLFxuICAnc2hvcnQnOiBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ10sXG4gICduYXJyb3cnOiBbJ0onLCAnRicsICdNJywgJ0EnLCAnTScsICdKJywgJ0onLCAnQScsICdTJywgJ08nLCAnTicsICdEJ11cbn07XG5cblxuLyoqIFRoZSBkZWZhdWx0IGRhdGUgbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXG5jb25zdCBERUZBVUxUX0RBVEVfTkFNRVMgPSByYW5nZSgzMSwgaSA9PiBTdHJpbmcoaSArIDEpKTtcblxuLyoqIFRoZSBkZWZhdWx0IGhvdXIgbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXG5jb25zdCBERUZBVUxUX0hPVVJfTkFNRVMgPSByYW5nZSgyNCwgaSA9PiBTdHJpbmcoaSkpO1xuXG4vKiogVGhlIGRlZmF1bHQgbWludXRlIG5hbWVzIHRvIHVzZSBpZiBJbnRsIEFQSSBpcyBub3QgYXZhaWxhYmxlLiAqL1xuY29uc3QgREVGQVVMVF9NSU5VVEVfTkFNRVMgPSByYW5nZSg2MCwgaSA9PiBTdHJpbmcoaSkpO1xuXG5cbi8qKiBUaGUgZGVmYXVsdCBkYXkgb2YgdGhlIHdlZWsgbmFtZXMgdG8gdXNlIGlmIEludGwgQVBJIGlzIG5vdCBhdmFpbGFibGUuICovXG5jb25zdCBERUZBVUxUX0RBWV9PRl9XRUVLX05BTUVTID0ge1xuICAnbG9uZyc6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXSxcbiAgJ3Nob3J0JzogWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcbiAgJ25hcnJvdyc6IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddXG59O1xuXG5cbi8qKiBDcmVhdGVzIGFuIGFycmF5IGFuZCBmaWxscyBpdCB3aXRoIHZhbHVlcy4gKi9cbmZ1bmN0aW9uIHJhbmdlPFQ+KGxlbmd0aDogbnVtYmVyLCB2YWx1ZUZ1bmN0aW9uOiAoaW5kZXg6IG51bWJlcikgPT4gVCk6IFRbXSB7XG4gIGNvbnN0IHZhbHVlc0FycmF5ID0gQXJyYXkobGVuZ3RoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhbHVlc0FycmF5W2ldID0gdmFsdWVGdW5jdGlvbihpKTtcbiAgfVxuICByZXR1cm4gdmFsdWVzQXJyYXk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9udGhzIHtcbiAgbG9uZzogQXJyYXk8c3RyaW5nPjtcbiAgc2hvcnQ6IEFycmF5PHN0cmluZz47XG4gIG5hcnJvdzogQXJyYXk8c3RyaW5nPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXlzT2ZXZWVrIHtcbiAgbG9uZzogQXJyYXk8c3RyaW5nPjtcbiAgc2hvcnQ6IEFycmF5PHN0cmluZz47XG4gIG5hcnJvdzogQXJyYXk8c3RyaW5nPjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVMb2NhbGUge1xuXG4gIGxvY2FsZTogYW55O1xuICBtb250aHM6IE1vbnRocztcbiAgZGF5c09mV2VlazogRGF5c09mV2VlaztcbiAgZGF0ZXM6IEFycmF5PHN0cmluZz47XG4gIGhvdXJzOiBBcnJheTxzdHJpbmc+O1xuICBtaW51dGVzOiBBcnJheTxzdHJpbmc+O1xuICBmaXJzdERheU9mV2VlazogbnVtYmVyID0gMDtcblxuICBnZXREYXlPZldlZWsoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RGF5KCk7XG4gIH1cblxuICBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMubW9udGhzKSB7IHJldHVybiB0aGlzLm1vbnRoc1tzdHlsZV07IH1cbiAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgIGxldCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsZSwgeyBtb250aDogc3R5bGUgfSk7XG4gICAgICByZXR1cm4gcmFuZ2UoMTIsIGkgPT4gdGhpcy5fc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoZHRmLmZvcm1hdChuZXcgRGF0ZSgyMDE3LCBpLCAxKSkpKTtcbiAgICB9XG4gICAgcmV0dXJuIERFRkFVTFRfTU9OVEhfTkFNRVNbc3R5bGVdO1xuICB9XG5cbiAgZ2V0RGF0ZU5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICBpZiAodGhpcy5kYXRlcykgeyByZXR1cm4gdGhpcy5kYXRlczsgfVxuICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xuICAgICAgbGV0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCB7IGRheTogJ251bWVyaWMnIH0pO1xuICAgICAgcmV0dXJuIHJhbmdlKDMxLCBpID0+IHRoaXMuX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKFxuICAgICAgICBkdGYuZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDAsIGkgKyAxKSkpKTtcbiAgICB9XG4gICAgcmV0dXJuIERFRkFVTFRfREFURV9OQU1FUztcbiAgfVxuXG4gIGdldEhvdXJOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMuaG91cnMpIHsgcmV0dXJuIHRoaXMuaG91cnM7IH1cbiAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgIGxldCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsZSwgeyBob3VyOiAnbnVtZXJpYycgfSk7XG4gICAgICByZXR1cm4gcmFuZ2UoMjQsIGkgPT4gdGhpcy5fc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoXG4gICAgICAgIGR0Zi5mb3JtYXQobmV3IERhdGUoMjAxNywgMCwgMCwgaSkpKSk7XG4gICAgfVxuICAgIHJldHVybiBERUZBVUxUX0hPVVJfTkFNRVM7XG4gIH1cblxuICBnZXRNaW51dGVOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMubWludXRlcykgeyByZXR1cm4gdGhpcy5taW51dGVzOyB9XG4gICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XG4gICAgICBsZXQgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGUsIHsgbWludXRlOiAnbnVtZXJpYycgfSk7XG4gICAgICByZXR1cm4gcmFuZ2UoNjAsIGkgPT4gdGhpcy5fc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoXG4gICAgICAgIGR0Zi5mb3JtYXQobmV3IERhdGUoMjAxNywgMCwgMCwgMCwgaSkpKSk7XG4gICAgfVxuICAgIHJldHVybiBERUZBVUxUX01JTlVURV9OQU1FUztcbiAgfVxuXG4gIGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgaWYgKHRoaXMuZGF5c09mV2VlaykgeyByZXR1cm4gdGhpcy5kYXlzT2ZXZWVrW3N0eWxlXTsgfVxuICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xuICAgICAgbGV0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCB7IHdlZWtkYXk6IHN0eWxlIH0pO1xuICAgICAgcmV0dXJuIHJhbmdlKDcsIGkgPT4gdGhpcy5fc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoXG4gICAgICAgIGR0Zi5mb3JtYXQobmV3IERhdGUoMjAxNywgMCwgaSArIDEpKSkpO1xuICAgIH1cbiAgICByZXR1cm4gREVGQVVMVF9EQVlfT0ZfV0VFS19OQU1FU1tzdHlsZV07XG4gIH1cblxuICBnZXRZZWFyTmFtZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICBpZiAoU1VQUE9SVFNfSU5UTF9BUEkpIHtcbiAgICAgIGxldCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsZSwgeyB5ZWFyOiAnbnVtZXJpYycgfSk7XG4gICAgICByZXR1cm4gdGhpcy5fc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoZHRmLmZvcm1hdChkYXRlKSk7XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgfVxuXG4gIGdldEZpcnN0RGF5T2ZXZWVrKCk6IG51bWJlciB7XG4gICAgLy8gV2UgY2FuJ3QgdGVsbCB1c2luZyBuYXRpdmUgSlMgRGF0ZSB3aGF0IHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgaXMsIHdlIGRlZmF1bHQgdG8gU3VuZGF5LlxuICAgIHJldHVybiB0aGlzLmZpcnN0RGF5T2ZXZWVrO1xuICB9XG5cbiAgZm9ybWF0KGRhdGU6IERhdGUsIGRpc3BsYXlGb3JtYXQ6IE9iamVjdCk6IHN0cmluZyB7XG4gICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XG4gICAgICBsZXQgZHRmID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGhpcy5sb2NhbGUsIGRpc3BsYXlGb3JtYXQpO1xuICAgICAgcmV0dXJuIHRoaXMuX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKGR0Zi5mb3JtYXQoZGF0ZSkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoZGF0ZS50b0RhdGVTdHJpbmcoKSk7XG4gIH1cblxuICBnZXREYXRlTGFiZWwoZDogRGF0ZSk6IHN0cmluZyB7XG4gICAgbGV0IGRheTogc3RyaW5nID0gdGhpcy5nZXREYXlPZldlZWtOYW1lcygnc2hvcnQnKVtkLmdldERheSgpXTtcbiAgICBsZXQgZGF0ZTogc3RyaW5nID0gdGhpcy5nZXREYXRlTmFtZXMoKVtkLmdldERhdGUoKSAtIDFdO1xuICAgIGxldCBtb250aDogc3RyaW5nID0gdGhpcy5nZXRNb250aE5hbWVzKCdzaG9ydCcpW2QuZ2V0TW9udGgoKV07XG4gICAgcmV0dXJuIGAke2RheX0sICR7bW9udGh9ICR7ZGF0ZX1gO1xuICB9XG5cbiAgZ2V0SG91cnNMYWJlbChkOiBEYXRlKTogc3RyaW5nIHsgcmV0dXJuIGAke3RoaXMuZ2V0SG91ck5hbWVzKClbZC5nZXRIb3VycygpXX1gOyB9XG5cbiAgZ2V0TWludXRlc0xhYmVsKGQ6IERhdGUpOiBzdHJpbmcgeyByZXR1cm4gYCR7dGhpcy5nZXRNaW51dGVOYW1lcygpW2QuZ2V0TWludXRlcygpXX1gOyB9XG5cbiAgZ2V0TW9udGhMYWJlbChkOiBEYXRlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5nZXRNb250aE5hbWVzKCdsb25nJylbZC5nZXRNb250aCgpXX0gJHt0aGlzLmdldFllYXJOYW1lKGQpfWA7XG4gIH1cblxuICAvKipcbiAgICogU3RyaXAgb3V0IHVuaWNvZGUgTFRSIGFuZCBSVEwgY2hhcmFjdGVycy4gRWRnZSBhbmQgSUUgaW5zZXJ0IHRoZXNlIGludG8gZm9ybWF0dGVkIGRhdGVzIHdoaWxlXG4gICAqIG90aGVyIGJyb3dzZXJzIGRvIG5vdC4gV2UgcmVtb3ZlIHRoZW0gdG8gbWFrZSBvdXRwdXQgY29uc2lzdGVudCBhbmQgYmVjYXVzZSB0aGV5IGludGVyZmVyZSB3aXRoXG4gICAqIGRhdGUgcGFyc2luZy5cbiAgICogQHBhcmFtIHMgVGhlIHN0cmluZyB0byBzdHJpcCBkaXJlY3Rpb24gY2hhcmFjdGVycyBmcm9tLlxuICAgKiBAcmV0dXJucyBUaGUgc3RyaXBwZWQgc3RyaW5nLlxuICAgKi9cbiAgcHJpdmF0ZSBfc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoczogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvW1xcdTIwMGVcXHUyMDBmXS9nLCAnJyk7XG4gIH1cbn1cbiJdfQ==