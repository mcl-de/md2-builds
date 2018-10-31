/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DateLocale } from './date-locale';
var DateUtil = /** @class */ (function () {
    function DateUtil() {
        this._locale = new DateLocale();
        this.parseDateMap = {
            'y': 0,
            // placeholder -> ctorIndex
            'Y': [0, -2000],
            'M': [1, 1],
            // placeholder -> [ctorIndex, offset|value array]
            'n': [1, this._locale.getMonthNames('short')],
            'N': [1, this._locale.getMonthNames('long')],
            'd': 2,
            'm': 4,
            'H': 3,
            'h': 3,
            'K': [3, 1],
            'k': [3, 1],
            's': 5,
            'S': 6,
            'a': [3, ['am', 'pm']],
            'A': [3, ['AM', 'PM']]
        };
    }
    /**
     * @param {?} s
     * @param {?} regexp
     * @param {?=} sub
     * @return {?}
     */
    DateUtil.prototype.replace = /**
     * @param {?} s
     * @param {?} regexp
     * @param {?=} sub
     * @return {?}
     */
    function (s, regexp, sub) {
        return (s != null ? '' + s : '').replace(regexp, sub != null ? sub : '');
    };
    /**
     * @param {?} base
     * @param {?} start
     * @return {?}
     */
    DateUtil.prototype.startsWith = /**
     * @param {?} base
     * @param {?} start
     * @return {?}
     */
    function (base, start) {
        return start != null && base.substr(0, start.length) == start;
    };
    /**
     * @param {?} s
     * @param {?} o
     * @return {?}
     */
    DateUtil.prototype.isType = /**
     * @param {?} s
     * @param {?} o
     * @return {?}
     */
    function (s, o) {
        return typeof s == o;
    };
    /**
     * @param {?} f
     * @return {?}
     */
    DateUtil.prototype.isFunction = /**
     * @param {?} f
     * @return {?}
     */
    function (f) {
        return this.isType(f, 'function');
    };
    /**
     * @param {?} v
     * @return {?}
     */
    DateUtil.prototype.isList = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        return !!v && v.length != null && !this.isString(v) && !this.isNode(v) && !this.isFunction(v);
    };
    /**
     * @param {?} s
     * @return {?}
     */
    DateUtil.prototype.isString = /**
     * @param {?} s
     * @return {?}
     */
    function (s) {
        return this.isType(s, 'string');
    };
    /**
     * @param {?} f
     * @return {?}
     */
    DateUtil.prototype.isObject = /**
     * @param {?} f
     * @return {?}
     */
    function (f) {
        return !!f && this.isType(f, 'object');
    };
    /**
     * @param {?} n
     * @return {?}
     */
    DateUtil.prototype.isNode = /**
     * @param {?} n
     * @return {?}
     */
    function (n) {
        return n && n['nodeType'];
    };
    /**
     * @param {?} n
     * @return {?}
     */
    DateUtil.prototype.isNumber = /**
     * @param {?} n
     * @return {?}
     */
    function (n) {
        return this.isType(n, 'number');
    };
    /**
     * @param {?} findFunc
     * @return {?}
     */
    DateUtil.prototype.getFindFunc = /**
     * @param {?} findFunc
     * @return {?}
     */
    function (findFunc) {
        return this.isFunction(findFunc) ? findFunc : function (obj, index) {
            if (findFunc === obj) {
                return index;
            }
        };
    };
    /**
     * @param {?} list
     * @param {?} index
     * @param {?} defaultIndex
     * @return {?}
     */
    DateUtil.prototype.getFindIndex = /**
     * @param {?} list
     * @param {?} index
     * @param {?} defaultIndex
     * @return {?}
     */
    function (list, index, defaultIndex) {
        return index == null ? defaultIndex :
            index < 0 ? Math.max(list.length + index, 0) : Math.min(list.length, index);
    };
    /**
     * @param {?} list
     * @param {?} findFunc
     * @param {?=} startIndex
     * @param {?=} endIndex
     * @return {?}
     */
    DateUtil.prototype.find = /**
     * @param {?} list
     * @param {?} findFunc
     * @param {?=} startIndex
     * @param {?=} endIndex
     * @return {?}
     */
    function (list, findFunc, startIndex, endIndex) {
        /** @type {?} */
        var f = this.getFindFunc(findFunc);
        /** @type {?} */
        var e = this.getFindIndex(list, endIndex, list.length);
        /** @type {?} */
        var r;
        for (var i = this.getFindIndex(list, startIndex, 0); i < e; i++) {
            if ((r = f.call(list, list[i], i)) != null) {
                return r;
            }
        }
    };
    /**
     * @param {?} date
     * @param {?} fmt
     * @return {?}
     */
    DateUtil.prototype.parseDate = /**
     * @param {?} date
     * @param {?} fmt
     * @return {?}
     */
    function (date, fmt) {
        var _this = this;
        /** @type {?} */
        var indexMap = {};
        /** @type {?} */
        var reIndex = 1;
        /** @type {?} */
        var timezoneOffsetMatch;
        /** @type {?} */
        var timezoneIndex;
        /** @type {?} */
        var match;
        /** @type {?} */
        var format = this.replace(fmt, /^\?/);
        if (format != fmt && !this.replace(date, /^\s+|\s+$/g)) {
            return null;
        }
        if (match = /^\[([+-])(\d\d)(\d\d)\]\s*(.*)/.exec(format)) {
            timezoneOffsetMatch = match;
            format = match[4];
        }
        /** @type {?} */
        var parser = new RegExp(format.replace(/(.)(\1*)(?:\[([^\]]*)\])?/g, function (wholeMatch, placeholderChar, placeholderDigits, param) {
            if (/[dmhkyhs]/i.test(placeholderChar)) {
                indexMap[reIndex++] = placeholderChar;
                /** @type {?} */
                var plen = placeholderDigits.length + 1;
                return '(\\d' + (plen < 2 ? '+' : ('{1,' + plen + '}')) + ')';
            }
            else if (placeholderChar == 'z') {
                timezoneIndex = reIndex;
                reIndex += 3;
                return '([+-])(\\d\\d)(\\d\\d)';
            }
            else if (/[NnaA]/.test(placeholderChar)) {
                indexMap[reIndex++] = [placeholderChar, param && param.split(',')];
                return '([a-zA-Z\\u0080-\\u1fff]+)';
            }
            else if (/w/i.test(placeholderChar)) {
                return '[a-zA-Z\\u0080-\\u1fff]+';
            }
            else if (/\s/.test(placeholderChar)) {
                return '\\s+';
            }
            else {
                return _this.replace(wholeMatch, /[\\\[\]\/{}()*+?.$|^-]/g, '\\$&');
            }
        }));
        if (!(match = parser.exec(date))) {
            return undefined;
        }
        /** @type {?} */
        var ctorArgs = [0, 0, 0, 0, 0, 0, 0];
        var _loop_1 = function (i) {
            /** @type {?} */
            var matchVal = match[i];
            /** @type {?} */
            var indexEntry = indexMap[i];
            if (this_1.isList(indexEntry)) { // for a, n or N
                /** @type {?} */
                var placeholderChar = indexEntry[0];
                /** @type {?} */
                var mapEntry = this_1.parseDateMap[placeholderChar];
                /** @type {?} */
                var ctorIndex = mapEntry[0];
                /** @type {?} */
                var valList = indexEntry[1] || mapEntry[1];
                /** @type {?} */
                var listValue = this_1.find(valList, function (v, index) {
                    if (_this.startsWith(matchVal.toLowerCase(), v.toLowerCase())) {
                        return index;
                    }
                });
                if (listValue == null) {
                    return { value: undefined };
                }
                if (placeholderChar == 'a' || placeholderChar == 'A') {
                    ctorArgs[ctorIndex] += listValue * 12;
                }
                else {
                    ctorArgs[ctorIndex] = listValue;
                }
            }
            else if (indexEntry) { // for numeric values (yHmMs)
                /** @type {?} */
                var value = parseFloat(matchVal);
                /** @type {?} */
                var mapEntry = this_1.parseDateMap[indexEntry];
                if (this_1.isList(mapEntry)) {
                    ctorArgs[mapEntry[0]] += value - mapEntry[1];
                }
                else {
                    ctorArgs[mapEntry] += value;
                }
            }
        };
        var this_1 = this;
        for (var i = 1; i < reIndex; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        /** @type {?} */
        var d = new Date(ctorArgs[0], ctorArgs[1], ctorArgs[2], ctorArgs[3], ctorArgs[4], ctorArgs[5], ctorArgs[6]);
        return d;
    };
    /**
     * @return {?}
     */
    DateUtil.prototype.today = /**
     * @return {?}
     */
    function () {
        return new Date();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DateUtil.prototype.parse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var timestamp = typeof value == 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getYear = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getFullYear();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getMonth();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getDate();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getHours = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getHours();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getMinutes = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getMinutes();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getSeconds = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getSeconds();
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @return {?}
     */
    DateUtil.prototype.createDate = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @return {?}
     */
    function (year, month, date, hours, minutes, seconds) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11 || date < 1) {
            return null;
        }
        /** @type {?} */
        var result = this._createDateWithOverflow(year, month, date, hours, minutes, seconds);
        // Check that the date wasn't above the upper bound for the month, causing the month to
        // overflow.
        if (result.getMonth() != month) {
            return null;
        }
        return result;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.clone = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date));
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getNumDaysInMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0, 0, 0, 0));
    };
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    DateUtil.prototype.addCalendarYears = /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    function (date, years) {
        return this.addCalendarMonths(date, years * 12);
    };
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    DateUtil.prototype.addCalendarMonths = /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    function (date, months) {
        /** @type {?} */
        var newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) != ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0, this.getHours(newDate), this.getMinutes(newDate), this.getSeconds(newDate));
        }
        return newDate;
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    DateUtil.prototype.addCalendarDays = /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    function (date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days, this.getHours(date), this.getMinutes(date), this.getSeconds(date));
    };
    /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    DateUtil.prototype.addCalendarHours = /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    function (date, hours) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date) + hours, this.getMinutes(date), this.getSeconds(date));
    };
    /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    DateUtil.prototype.addCalendarMinutes = /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    function (date, minutes) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date) + minutes, this.getSeconds(date));
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getISODateString = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return [
            date.getUTCFullYear(),
            this._2digit(date.getUTCMonth() + 1),
            this._2digit(date.getUTCDate())
        ].join('-');
    };
    /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @return {?}
     */
    DateUtil.prototype._createDateWithOverflow = /**
     * Creates a date but allows the month and date to overflow.
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @return {?}
     */
    function (year, month, date, hours, minutes, seconds) {
        /** @type {?} */
        var result = new Date(year, month, date, hours, minutes, seconds);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    };
    /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    DateUtil.prototype._2digit = /**
     * Pads a number to make it two digits.
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    function (n) {
        return ('00' + n).slice(-2);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DateUtil.prototype.compareDate = /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first, second) {
        return this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second);
    };
    /**
     * Gets the first day of the month for the given date's month.
     */
    /**
     * Gets the first day of the month for the given date's month.
     * @param {?} date
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    DateUtil.prototype.getFirstDateOfWeek = /**
     * Gets the first day of the month for the given date's month.
     * @param {?} date
     * @param {?} firstDayOfWeek
     * @return {?}
     */
    function (date, firstDayOfWeek) {
        /** @type {?} */
        var day = date.getDate() - ((7 + date.getDay() - firstDayOfWeek) % 7);
        return new Date(date.getFullYear(), date.getMonth(), day, date.getHours(), date.getMinutes());
    };
    /**
     * Gets the first day of the month for the given date's month.
     */
    /**
     * Gets the first day of the month for the given date's month.
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getFirstDateOfMonth = /**
     * Gets the first day of the month for the given date's month.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    };
    /**
     * Gets the number of days in the month for the given date's month.
     */
    /**
     * Gets the number of days in the month for the given date's month.
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getNumberOfDaysInMonth = /**
     * Gets the number of days in the month for the given date's month.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    /**
     * Get an arbitrary date in the month after the given date's month.
     */
    /**
     * Get an arbitrary date in the month after the given date's month.
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getDateInNextMonth = /**
     * Get an arbitrary date in the month after the given date's month.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1, date.getHours(), date.getMinutes());
    };
    /**
     * Get an arbitrary date in the month before the given date's month.
     */
    /**
     * Get an arbitrary date in the month before the given date's month.
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getDateInPreviousMonth = /**
     * Get an arbitrary date in the month before the given date's month.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1, date.getHours(), date.getMinutes());
    };
    /**
     * Gets whether two dates have the same year.
     */
    /**
     * Gets whether two dates have the same year.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    DateUtil.prototype.isSameYear = /**
     * Gets whether two dates have the same year.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    function (d1, d2) {
        return d1 && d2 && d1.getFullYear() === d2.getFullYear();
    };
    /**
     * Gets whether two dates have the same month and year.
     */
    /**
     * Gets whether two dates have the same month and year.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    DateUtil.prototype.isSameMonthAndYear = /**
     * Gets whether two dates have the same month and year.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    function (d1, d2) {
        return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    };
    /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     */
    /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    DateUtil.prototype.isSameDay = /**
     * Gets whether two dates are the same day (not not necesarily the same time).
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    function (d1, d2) {
        return d1 && d2 && d1.getDate() == d2.getDate() && this.isSameMonthAndYear(d1, d2);
    };
    /**
     * Gets whether two dates are the same hours.
     */
    /**
     * Gets whether two dates are the same hours.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    DateUtil.prototype.isSameHour = /**
     * Gets whether two dates are the same hours.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    function (d1, d2) {
        return d1 && d2 && d1.getHours() == d2.getHours() && this.isSameDay(d1, d2);
    };
    /**
     * Gets whether two dates are the same minutes.
     */
    /**
     * Gets whether two dates are the same minutes.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    DateUtil.prototype.isSameMinute = /**
     * Gets whether two dates are the same minutes.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    function (d1, d2) {
        return d1 && d2 && d1.getMinutes() == d2.getMinutes() && this.isSameHour(d1, d2);
    };
    /**
     * Gets whether a date is in the month immediately after some date.
     * @param startDate The date from which to compare.
     * @param endDate The date to check.
     * @returns
     */
    /**
     * Gets whether a date is in the month immediately after some date.
     * @param {?} startDate The date from which to compare.
     * @param {?} endDate The date to check.
     * @return {?}
     */
    DateUtil.prototype.isInNextMonth = /**
     * Gets whether a date is in the month immediately after some date.
     * @param {?} startDate The date from which to compare.
     * @param {?} endDate The date to check.
     * @return {?}
     */
    function (startDate, endDate) {
        /** @type {?} */
        var nextMonth = this.getDateInNextMonth(startDate);
        return this.isSameMonthAndYear(nextMonth, endDate);
    };
    /**
     * Gets whether a date is in the month immediately before some date.
     * @param startDate The date from which to compare.
     * @param endDate The date to check.
     * @returns
     */
    /**
     * Gets whether a date is in the month immediately before some date.
     * @param {?} startDate The date from which to compare.
     * @param {?} endDate The date to check.
     * @return {?}
     */
    DateUtil.prototype.isInPreviousMonth = /**
     * Gets whether a date is in the month immediately before some date.
     * @param {?} startDate The date from which to compare.
     * @param {?} endDate The date to check.
     * @return {?}
     */
    function (startDate, endDate) {
        /** @type {?} */
        var previousMonth = this.getDateInPreviousMonth(startDate);
        return this.isSameMonthAndYear(endDate, previousMonth);
    };
    /**
     * Gets the midpoint between two dates.
     * @param d1
     * @param d2
     * @returns
     */
    /**
     * Gets the midpoint between two dates.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    DateUtil.prototype.getDateMidpoint = /**
     * Gets the midpoint between two dates.
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    function (d1, d2) {
        return this.createDateAtMidnight((d1.getTime() + d2.getTime()) / 2);
    };
    /**
     * Gets the week of the month that a given date occurs in.
     * @param date
     * @returns Index of the week of the month (zero-based).
     */
    /**
     * Gets the week of the month that a given date occurs in.
     * @param {?} date
     * @return {?} Index of the week of the month (zero-based).
     */
    DateUtil.prototype.getWeekOfMonth = /**
     * Gets the week of the month that a given date occurs in.
     * @param {?} date
     * @return {?} Index of the week of the month (zero-based).
     */
    function (date) {
        /** @type {?} */
        var firstDayOfMonth = this.getFirstDateOfMonth(date);
        return Math.floor((firstDayOfMonth.getDay() + date.getDate() - 1) / 7);
    };
    /**
     * Gets the week of the year that a given date occurs in.
     * @param date
     * @returns Index of the week according to ISO-8601.
     */
    /**
     * Gets the week of the year that a given date occurs in.
     * @param {?} date
     * @return {?} Index of the week according to ISO-8601.
     */
    DateUtil.prototype.getWeekOfYear = /**
     * Gets the week of the year that a given date occurs in.
     * @param {?} date
     * @return {?} Index of the week according to ISO-8601.
     */
    function (date) {
        /** @type {?} */
        var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        /** @type {?} */
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday and return weekNo
        return Math.ceil((((+d - +yearStart) / 86400000) + 1) / 7);
    };
    /**
     * Gets a new date incremented by the given number of minutes. Number of minutes can be negative.
     * @param date
     * @param numberOfMinutes
     * @returns
     */
    /**
     * Gets a new date incremented by the given number of minutes. Number of minutes can be negative.
     * @param {?} date
     * @param {?} numberOfMinutes
     * @return {?}
     */
    DateUtil.prototype.incrementMinutes = /**
     * Gets a new date incremented by the given number of minutes. Number of minutes can be negative.
     * @param {?} date
     * @param {?} numberOfMinutes
     * @return {?}
     */
    function (date, numberOfMinutes) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes() + numberOfMinutes);
    };
    /**
     * Gets a new date incremented by the given number of hours. Number of hours can be negative.
     * @param date
     * @param numberOfHours
     * @returns
     */
    /**
     * Gets a new date incremented by the given number of hours. Number of hours can be negative.
     * @param {?} date
     * @param {?} numberOfHours
     * @return {?}
     */
    DateUtil.prototype.incrementHours = /**
     * Gets a new date incremented by the given number of hours. Number of hours can be negative.
     * @param {?} date
     * @param {?} numberOfHours
     * @return {?}
     */
    function (date, numberOfHours) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + numberOfHours, date.getMinutes());
    };
    /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param date
     * @param numberOfDays
     * @returns
     */
    /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param {?} date
     * @param {?} numberOfDays
     * @return {?}
     */
    DateUtil.prototype.incrementDays = /**
     * Gets a new date incremented by the given number of days. Number of days can be negative.
     * @param {?} date
     * @param {?} numberOfDays
     * @return {?}
     */
    function (date, numberOfDays) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + numberOfDays, date.getHours(), date.getMinutes());
    };
    /**
     * Gets a new date incremented by the given number of months. Number of months can be negative.
     * If the date of the given month does not match the target month, the date will be set to the
     * last day of the month.
     * @param date
     * @param numberOfMonths
     * @returns
     */
    /**
     * Gets a new date incremented by the given number of months. Number of months can be negative.
     * If the date of the given month does not match the target month, the date will be set to the
     * last day of the month.
     * @param {?} date
     * @param {?} numberOfMonths
     * @return {?}
     */
    DateUtil.prototype.incrementMonths = /**
     * Gets a new date incremented by the given number of months. Number of months can be negative.
     * If the date of the given month does not match the target month, the date will be set to the
     * last day of the month.
     * @param {?} date
     * @param {?} numberOfMonths
     * @return {?}
     */
    function (date, numberOfMonths) {
        /** @type {?} */
        var dateInTargetMonth = new Date(date.getFullYear(), date.getMonth() + numberOfMonths, 1, date.getHours(), date.getMinutes());
        /** @type {?} */
        var numberOfDaysInMonth = this.getNumberOfDaysInMonth(dateInTargetMonth);
        if (numberOfDaysInMonth < date.getDate()) {
            dateInTargetMonth.setDate(numberOfDaysInMonth);
        }
        else {
            dateInTargetMonth.setDate(date.getDate());
        }
        return dateInTargetMonth;
    };
    /**
     * Get the integer distance between two months. This *only* considers the month and year
     * portion of the Date instances.
     *
     * @param start
     * @param end
     * @returns Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    /**
     * Get the integer distance between two months. This *only* considers the month and year
     * portion of the Date instances.
     *
     * @param {?} start
     * @param {?} end
     * @return {?} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    DateUtil.prototype.getMonthDistance = /**
     * Get the integer distance between two months. This *only* considers the month and year
     * portion of the Date instances.
     *
     * @param {?} start
     * @param {?} end
     * @return {?} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    function (start, end) {
        return (12 * (end.getFullYear() - start.getFullYear())) + (end.getMonth() - start.getMonth());
    };
    /**
     * Gets the last day of the month for the given date.
     * @param date
     * @returns
     */
    /**
     * Gets the last day of the month for the given date.
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.getLastDateOfMonth = /**
     * Gets the last day of the month for the given date.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.getFullYear(), date.getMonth(), this.getNumberOfDaysInMonth(date), date.getHours(), date.getMinutes());
    };
    /**
     * Checks whether a date is valid.
     * @param date
     * @return  Whether the date is a valid Date.
     */
    /**
     * Checks whether a date is valid.
     * @param {?} date
     * @return {?} Whether the date is a valid Date.
     */
    DateUtil.prototype.isValidDate = /**
     * Checks whether a date is valid.
     * @param {?} date
     * @return {?} Whether the date is a valid Date.
     */
    function (date) {
        return date != null && date.getTime && !isNaN(date.getTime());
    };
    /**
     * Sets a date's time to midnight.
     * @param date
     */
    /**
     * Sets a date's time to midnight.
     * @param {?} date
     * @return {?}
     */
    DateUtil.prototype.setDateTimeToMidnight = /**
     * Sets a date's time to midnight.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this.isValidDate(date)) {
            date.setHours(0, 0, 0, 0);
        }
    };
    /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor:
     * 1. No argument for Date representing now.
     * 2. Single-argument value representing number of seconds since Unix Epoch
     * or a Date object.
     * @param value
     * @return New date with time set to midnight.
     */
    /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor:
     * 1. No argument for Date representing now.
     * 2. Single-argument value representing number of seconds since Unix Epoch
     * or a Date object.
     * @param {?} value
     * @return {?} New date with time set to midnight.
     */
    DateUtil.prototype.createDateAtMidnight = /**
     * Creates a date with the time set to midnight.
     * Drop-in replacement for two forms of the Date constructor:
     * 1. No argument for Date representing now.
     * 2. Single-argument value representing number of seconds since Unix Epoch
     * or a Date object.
     * @param {?} value
     * @return {?} New date with time set to midnight.
     */
    function (value) {
        /** @type {?} */
        var date;
        if (!value) {
            date = new Date();
        }
        else {
            date = new Date(value);
        }
        this.setDateTimeToMidnight(date);
        return date;
    };
    /**
     * Checks if a date is within a min and max range, ignoring the time component.
     * If minDate or maxDate are not dates, they are ignored.
     * @param date
     * @param minDate
     * @param maxDate
     */
    /**
     * Checks if a date is within a min and max range, ignoring the time component.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    DateUtil.prototype.isDateWithinRange = /**
     * Checks if a date is within a min and max range, ignoring the time component.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    function (date, minDate, maxDate) {
        /** @type {?} */
        var dateAtMidnight = this.createDateAtMidnight(date);
        /** @type {?} */
        var minDateAtMidnight = this.isValidDate(minDate) ? this.createDateAtMidnight(minDate) : null;
        /** @type {?} */
        var maxDateAtMidnight = this.isValidDate(maxDate) ? this.createDateAtMidnight(maxDate) : null;
        return (!minDateAtMidnight || minDateAtMidnight <= dateAtMidnight) &&
            (!maxDateAtMidnight || maxDateAtMidnight >= dateAtMidnight);
    };
    /**
     * Checks if a date is within a min and max range.
     * If minDate or maxDate are not dates, they are ignored.
     * @param date
     * @param minDate
     * @param maxDate
     */
    /**
     * Checks if a date is within a min and max range.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    DateUtil.prototype.isFullDateWithinRange = /**
     * Checks if a date is within a min and max range.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    function (date, minDate, maxDate) {
        minDate = this.isValidDate(minDate) ? minDate : null;
        maxDate = this.isValidDate(maxDate) ? maxDate : null;
        return (!minDate || minDate <= date) &&
            (!maxDate || maxDate >= date);
    };
    /**
     * Gets a new date incremented by the given number of years. Number of years can be negative.
     * See `incrementMonths` for notes on overflow for specific dates.
     * @param date
     * @param numberOfYears
     * @returns
     */
    /**
     * Gets a new date incremented by the given number of years. Number of years can be negative.
     * See `incrementMonths` for notes on overflow for specific dates.
     * @param {?} date
     * @param {?} numberOfYears
     * @return {?}
     */
    DateUtil.prototype.incrementYears = /**
     * Gets a new date incremented by the given number of years. Number of years can be negative.
     * See `incrementMonths` for notes on overflow for specific dates.
     * @param {?} date
     * @param {?} numberOfYears
     * @return {?}
     */
    function (date, numberOfYears) {
        return this.incrementMonths(date, numberOfYears * 12);
    };
    /**
     * Get the integer distance between two years. This *only* considers the year portion of the
     * Date instances.
     *
     * @param start
     * @param end
     * @returns Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    /**
     * Get the integer distance between two years. This *only* considers the year portion of the
     * Date instances.
     *
     * @param {?} start
     * @param {?} end
     * @return {?} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    DateUtil.prototype.getYearDistance = /**
     * Get the integer distance between two years. This *only* considers the year portion of the
     * Date instances.
     *
     * @param {?} start
     * @param {?} end
     * @return {?} Number of months between `start` and `end`. If `end` is before `start`
     *     chronologically, this number will be negative.
     */
    function (start, end) {
        return end.getFullYear() - start.getFullYear();
    };
    /**
     * Clamps a date between a minimum and a maximum date.
     * @param date Date to be clamped
     * @param minDate Minimum date
     * @param maxDate Maximum date
     * @return
     */
    /**
     * Clamps a date between a minimum and a maximum date.
     * @param {?} date Date to be clamped
     * @param {?} minDate Minimum date
     * @param {?} maxDate Maximum date
     * @return {?}
     */
    DateUtil.prototype.clampDate = /**
     * Clamps a date between a minimum and a maximum date.
     * @param {?} date Date to be clamped
     * @param {?} minDate Minimum date
     * @param {?} maxDate Maximum date
     * @return {?}
     */
    function (date, minDate, maxDate) {
        /** @type {?} */
        var boundDate = date;
        if (minDate && date < minDate) {
            boundDate = new Date(minDate.getTime());
        }
        if (maxDate && date > maxDate) {
            boundDate = new Date(maxDate.getTime());
        }
        return boundDate;
    };
    /**
     * Extracts and parses the timestamp from a DOM node.
     * @param node Node from which the timestamp will be extracted.
     * @return Time since epoch.
     */
    /**
     * Extracts and parses the timestamp from a DOM node.
     * @param {?} node Node from which the timestamp will be extracted.
     * @return {?} Time since epoch.
     */
    DateUtil.prototype.getTimestampFromNode = /**
     * Extracts and parses the timestamp from a DOM node.
     * @param {?} node Node from which the timestamp will be extracted.
     * @return {?} Time since epoch.
     */
    function (node) {
        if (node && node.hasAttribute('data-timestamp')) {
            return Number(node.getAttribute('data-timestamp'));
        }
    };
    /**
     * Checks if a month is within a min and max range, ignoring the date and time components.
     * If minDate or maxDate are not dates, they are ignored.
     * @param date
     * @param minDate
     * @param maxDate
     */
    /**
     * Checks if a month is within a min and max range, ignoring the date and time components.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    DateUtil.prototype.isMonthWithinRange = /**
     * Checks if a month is within a min and max range, ignoring the date and time components.
     * If minDate or maxDate are not dates, they are ignored.
     * @param {?} date
     * @param {?} minDate
     * @param {?} maxDate
     * @return {?}
     */
    function (date, minDate, maxDate) {
        /** @type {?} */
        var month = date.getMonth();
        /** @type {?} */
        var year = date.getFullYear();
        return (!minDate || minDate.getFullYear() < year || minDate.getMonth() <= month) &&
            (!maxDate || maxDate.getFullYear() > year || maxDate.getMonth() >= month);
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
    DateUtil.prototype.compareDateAndTime = /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    function (first, second) {
        return this.getYear(first) - this.getYear(second) ||
            this.getMonth(first) - this.getMonth(second) ||
            this.getDate(first) - this.getDate(second) ||
            this.getHours(first) - this.getDate(second) ||
            this.getMinutes(first) - this.getDate(second) ||
            this.getSeconds(first) - this.getDate(second);
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
    DateUtil.prototype.sameDate = /**
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
    DateUtil.prototype.sameDateAndTime = /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    function (first, second) {
        return first && second ? !this.compareDateAndTime(first, second) : first == second;
    };
    return DateUtil;
}());
export { DateUtil };
if (false) {
    /** @type {?} */
    DateUtil.prototype._locale;
    /** @type {?} */
    DateUtil.prototype.parseDateMap;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS11dGlsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvZGF0ZXBpY2tlci9kYXRlLXV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsSUFBQTs7dUJBRXdCLElBQUksVUFBVSxFQUFFOzRCQUVsQjtZQUNsQixHQUFHLEVBQUUsQ0FBQzs7WUFDTixHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDZixHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztZQUNYLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUMsR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ1gsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNYLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLENBQUM7WUFDTixHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEIsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3ZCOzs7Ozs7OztJQUVELDBCQUFPOzs7Ozs7SUFBUCxVQUFRLENBQVMsRUFBRSxNQUFXLEVBQUUsR0FBWTtRQUMxQyxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxD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QUFrQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQztLQUNwRjttQkE5cUJIO0lBZ3JCQyxDQUFBO0FBOXFCRCxvQkE4cUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0ZUxvY2FsZSB9IGZyb20gJy4vZGF0ZS1sb2NhbGUnO1xuXG5leHBvcnQgY2xhc3MgRGF0ZVV0aWwge1xuXG4gIF9sb2NhbGU6IERhdGVMb2NhbGUgPSBuZXcgRGF0ZUxvY2FsZSgpO1xuXG4gIHBhcnNlRGF0ZU1hcDogYW55ID0ge1xuICAgICd5JzogMCwgICAgICAvLyBwbGFjZWhvbGRlciAtPiBjdG9ySW5kZXhcbiAgICAnWSc6IFswLCAtMjAwMF0sXG4gICAgJ00nOiBbMSwgMV0sIC8vIHBsYWNlaG9sZGVyIC0+IFtjdG9ySW5kZXgsIG9mZnNldHx2YWx1ZSBhcnJheV1cbiAgICAnbic6IFsxLCB0aGlzLl9sb2NhbGUuZ2V0TW9udGhOYW1lcygnc2hvcnQnKV0sXG4gICAgJ04nOiBbMSwgdGhpcy5fbG9jYWxlLmdldE1vbnRoTmFtZXMoJ2xvbmcnKV0sXG4gICAgJ2QnOiAyLFxuICAgICdtJzogNCxcbiAgICAnSCc6IDMsXG4gICAgJ2gnOiAzLFxuICAgICdLJzogWzMsIDFdLFxuICAgICdrJzogWzMsIDFdLFxuICAgICdzJzogNSxcbiAgICAnUyc6IDYsXG4gICAgJ2EnOiBbMywgWydhbScsICdwbSddXSxcbiAgICAnQSc6IFszLCBbJ0FNJywgJ1BNJ11dXG4gIH07XG5cbiAgcmVwbGFjZShzOiBzdHJpbmcsIHJlZ2V4cDogYW55LCBzdWI/OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKHMgIT0gbnVsbCA/ICcnICsgcyA6ICcnKS5yZXBsYWNlKHJlZ2V4cCwgc3ViICE9IG51bGwgPyBzdWIgOiAnJyk7XG4gIH1cblxuICBzdGFydHNXaXRoKGJhc2U6IGFueSwgc3RhcnQ6IGFueSkge1xuICAgIHJldHVybiBzdGFydCAhPSBudWxsICYmIGJhc2Uuc3Vic3RyKDAsIHN0YXJ0Lmxlbmd0aCkgPT0gc3RhcnQ7XG4gIH1cblxuICBpc1R5cGUoczogYW55LCBvOiBhbnkpIHtcbiAgICByZXR1cm4gdHlwZW9mIHMgPT0gbztcbiAgfVxuXG4gIGlzRnVuY3Rpb24oZjogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuaXNUeXBlKGYsICdmdW5jdGlvbicpO1xuICB9XG5cbiAgaXNMaXN0KHY6IGFueSkge1xuICAgIHJldHVybiAhIXYgJiYgdi5sZW5ndGggIT0gbnVsbCAmJiAhdGhpcy5pc1N0cmluZyh2KSAmJiAhdGhpcy5pc05vZGUodikgJiYgIXRoaXMuaXNGdW5jdGlvbih2KTtcbiAgfVxuXG4gIGlzU3RyaW5nKHM6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmlzVHlwZShzLCAnc3RyaW5nJyk7XG4gIH1cblxuICBpc09iamVjdChmOiBhbnkpIHtcbiAgICByZXR1cm4gISFmICYmIHRoaXMuaXNUeXBlKGYsICdvYmplY3QnKTtcbiAgfVxuXG4gIGlzTm9kZShuOiBhbnkpIHtcbiAgICByZXR1cm4gbiAmJiBuWydub2RlVHlwZSddO1xuICB9XG5cbiAgaXNOdW1iZXIobjogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuaXNUeXBlKG4sICdudW1iZXInKTtcbiAgfVxuXG4gIGdldEZpbmRGdW5jKGZpbmRGdW5jOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5pc0Z1bmN0aW9uKGZpbmRGdW5jKSA/IGZpbmRGdW5jIDogKG9iajogYW55LCBpbmRleDogYW55KSA9PiB7XG4gICAgICBpZiAoZmluZEZ1bmMgPT09IG9iaikge1xuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGdldEZpbmRJbmRleChsaXN0OiBhbnksIGluZGV4OiBhbnksIGRlZmF1bHRJbmRleDogYW55KSB7XG4gICAgcmV0dXJuIGluZGV4ID09IG51bGwgPyBkZWZhdWx0SW5kZXggOlxuICAgICAgaW5kZXggPCAwID8gTWF0aC5tYXgobGlzdC5sZW5ndGggKyBpbmRleCwgMCkgOiBNYXRoLm1pbihsaXN0Lmxlbmd0aCwgaW5kZXgpO1xuICB9XG5cbiAgZmluZChsaXN0OiBhbnksIGZpbmRGdW5jOiBhbnksIHN0YXJ0SW5kZXg/OiBhbnksIGVuZEluZGV4PzogYW55KSB7XG4gICAgbGV0IGYgPSB0aGlzLmdldEZpbmRGdW5jKGZpbmRGdW5jKTtcbiAgICBsZXQgZSA9IHRoaXMuZ2V0RmluZEluZGV4KGxpc3QsIGVuZEluZGV4LCBsaXN0Lmxlbmd0aCk7XG4gICAgbGV0IHI6IGFueTtcbiAgICBmb3IgKGxldCBpID0gdGhpcy5nZXRGaW5kSW5kZXgobGlzdCwgc3RhcnRJbmRleCwgMCk7IGkgPCBlOyBpKyspIHtcbiAgICAgIGlmICgociA9IGYuY2FsbChsaXN0LCBsaXN0W2ldLCBpKSkgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwYXJzZURhdGUoZGF0ZTogc3RyaW5nLCBmbXQ6IHN0cmluZykge1xuICAgIGxldCBpbmRleE1hcDogYW55ID0ge307IC8vIGNvbnRhaW5zIHJlR3JvdXBQb3NpdGlvbiAtPiB0eXBlTGV0dGVyIG9yIFt0eXBlTGV0dGVyLCB2YWx1ZSBhcnJheV1cbiAgICBsZXQgcmVJbmRleCA9IDE7XG4gICAgbGV0IHRpbWV6b25lT2Zmc2V0TWF0Y2g6IGFueTtcbiAgICBsZXQgdGltZXpvbmVJbmRleDogYW55O1xuICAgIGxldCBtYXRjaDogYW55O1xuXG4gICAgbGV0IGZvcm1hdCA9IHRoaXMucmVwbGFjZShmbXQsIC9eXFw/Lyk7XG4gICAgaWYgKGZvcm1hdCAhPSBmbXQgJiYgIXRoaXMucmVwbGFjZShkYXRlLCAvXlxccyt8XFxzKyQvZykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChtYXRjaCA9IC9eXFxbKFsrLV0pKFxcZFxcZCkoXFxkXFxkKVxcXVxccyooLiopLy5leGVjKGZvcm1hdCkpIHtcbiAgICAgIHRpbWV6b25lT2Zmc2V0TWF0Y2ggPSBtYXRjaDtcbiAgICAgIGZvcm1hdCA9IG1hdGNoWzRdO1xuICAgIH1cblxuICAgIGxldCBwYXJzZXIgPSBuZXcgUmVnRXhwKGZvcm1hdC5yZXBsYWNlKC8oLikoXFwxKikoPzpcXFsoW15cXF1dKilcXF0pPy9nLFxuICAgICAgKHdob2xlTWF0Y2gsIHBsYWNlaG9sZGVyQ2hhciwgcGxhY2Vob2xkZXJEaWdpdHMsIHBhcmFtKSA9PiB7XG4gICAgICAgIGlmICgvW2RtaGt5aHNdL2kudGVzdChwbGFjZWhvbGRlckNoYXIpKSB7XG4gICAgICAgICAgaW5kZXhNYXBbcmVJbmRleCsrXSA9IHBsYWNlaG9sZGVyQ2hhcjtcbiAgICAgICAgICBsZXQgcGxlbiA9IHBsYWNlaG9sZGVyRGlnaXRzLmxlbmd0aCArIDE7XG4gICAgICAgICAgcmV0dXJuICcoXFxcXGQnICsgKHBsZW4gPCAyID8gJysnIDogKCd7MSwnICsgcGxlbiArICd9JykpICsgJyknO1xuICAgICAgICB9IGVsc2UgaWYgKHBsYWNlaG9sZGVyQ2hhciA9PSAneicpIHtcbiAgICAgICAgICB0aW1lem9uZUluZGV4ID0gcmVJbmRleDtcbiAgICAgICAgICByZUluZGV4ICs9IDM7XG4gICAgICAgICAgcmV0dXJuICcoWystXSkoXFxcXGRcXFxcZCkoXFxcXGRcXFxcZCknO1xuICAgICAgICB9IGVsc2UgaWYgKC9bTm5hQV0vLnRlc3QocGxhY2Vob2xkZXJDaGFyKSkge1xuICAgICAgICAgIGluZGV4TWFwW3JlSW5kZXgrK10gPSBbcGxhY2Vob2xkZXJDaGFyLCBwYXJhbSAmJiBwYXJhbS5zcGxpdCgnLCcpXTtcbiAgICAgICAgICByZXR1cm4gJyhbYS16QS1aXFxcXHUwMDgwLVxcXFx1MWZmZl0rKSc7XG4gICAgICAgIH0gZWxzZSBpZiAoL3cvaS50ZXN0KHBsYWNlaG9sZGVyQ2hhcikpIHtcbiAgICAgICAgICByZXR1cm4gJ1thLXpBLVpcXFxcdTAwODAtXFxcXHUxZmZmXSsnO1xuICAgICAgICB9IGVsc2UgaWYgKC9cXHMvLnRlc3QocGxhY2Vob2xkZXJDaGFyKSkge1xuICAgICAgICAgIHJldHVybiAnXFxcXHMrJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKHdob2xlTWF0Y2gsIC9bXFxcXFxcW1xcXVxcL3t9KCkqKz8uJHxeLV0vZywgJ1xcXFwkJicpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICBpZiAoIShtYXRjaCA9IHBhcnNlci5leGVjKGRhdGUpKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBsZXQgY3RvckFyZ3MgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMF07XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCByZUluZGV4OyBpKyspIHtcbiAgICAgIGxldCBtYXRjaFZhbCA9IG1hdGNoW2ldO1xuICAgICAgbGV0IGluZGV4RW50cnk6IGFueSA9IGluZGV4TWFwW2ldO1xuICAgICAgaWYgKHRoaXMuaXNMaXN0KGluZGV4RW50cnkpKSB7IC8vIGZvciBhLCBuIG9yIE5cbiAgICAgICAgbGV0IHBsYWNlaG9sZGVyQ2hhciA9IGluZGV4RW50cnlbMF07XG4gICAgICAgIGxldCBtYXBFbnRyeSA9IHRoaXMucGFyc2VEYXRlTWFwW3BsYWNlaG9sZGVyQ2hhcl07XG4gICAgICAgIGxldCBjdG9ySW5kZXggPSBtYXBFbnRyeVswXTtcbiAgICAgICAgbGV0IHZhbExpc3QgPSBpbmRleEVudHJ5WzFdIHx8IG1hcEVudHJ5WzFdO1xuICAgICAgICBsZXQgbGlzdFZhbHVlID0gdGhpcy5maW5kKHZhbExpc3QsXG4gICAgICAgICAgKHY6IGFueSwgaW5kZXg6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhcnRzV2l0aChtYXRjaFZhbC50b0xvd2VyQ2FzZSgpLCB2LnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgaWYgKGxpc3RWYWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhY2Vob2xkZXJDaGFyID09ICdhJyB8fCBwbGFjZWhvbGRlckNoYXIgPT0gJ0EnKSB7XG4gICAgICAgICAgY3RvckFyZ3NbY3RvckluZGV4XSArPSBsaXN0VmFsdWUgKiAxMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdG9yQXJnc1tjdG9ySW5kZXhdID0gbGlzdFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGluZGV4RW50cnkpIHsgLy8gZm9yIG51bWVyaWMgdmFsdWVzICh5SG1NcylcbiAgICAgICAgbGV0IHZhbHVlID0gcGFyc2VGbG9hdChtYXRjaFZhbCk7XG4gICAgICAgIGxldCBtYXBFbnRyeSA9IHRoaXMucGFyc2VEYXRlTWFwW2luZGV4RW50cnldO1xuICAgICAgICBpZiAodGhpcy5pc0xpc3QobWFwRW50cnkpKSB7XG4gICAgICAgICAgY3RvckFyZ3NbbWFwRW50cnlbMF1dICs9IHZhbHVlIC0gbWFwRW50cnlbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3RvckFyZ3NbbWFwRW50cnldICs9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBkID0gbmV3IERhdGUoY3RvckFyZ3NbMF0sIGN0b3JBcmdzWzFdLCBjdG9yQXJnc1syXSwgY3RvckFyZ3NbM10sIGN0b3JBcmdzWzRdLFxuICAgICAgY3RvckFyZ3NbNV0sIGN0b3JBcmdzWzZdKTtcbiAgICByZXR1cm4gZDtcbiAgfVxuXG4gIHRvZGF5KCk6IERhdGUge1xuICAgIHJldHVybiBuZXcgRGF0ZSgpO1xuICB9XG5cbiAgcGFyc2UodmFsdWU6IGFueSk6IERhdGUgfCBudWxsIHtcbiAgICBsZXQgdGltZXN0YW1wID0gdHlwZW9mIHZhbHVlID09ICdudW1iZXInID8gdmFsdWUgOiBEYXRlLnBhcnNlKHZhbHVlKTtcbiAgICByZXR1cm4gaXNOYU4odGltZXN0YW1wKSA/IG51bGwgOiBuZXcgRGF0ZSh0aW1lc3RhbXApO1xuICB9XG5cbiAgZ2V0WWVhcihkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICB9XG5cbiAgZ2V0TW9udGgoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKTtcbiAgfVxuXG4gIGdldERhdGUoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpO1xuICB9XG5cbiAgZ2V0SG91cnMoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKTtcbiAgfVxuXG4gIGdldE1pbnV0ZXMoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpO1xuICB9XG5cbiAgZ2V0U2Vjb25kcyhkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gIH1cblxuICBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyLFxuICAgIGhvdXJzOiBudW1iZXIsIG1pbnV0ZXM6IG51bWJlciwgc2Vjb25kczogbnVtYmVyKTogRGF0ZSB7XG4gICAgLy8gQ2hlY2sgZm9yIGludmFsaWQgbW9udGggYW5kIGRhdGUgKGV4Y2VwdCB1cHBlciBib3VuZCBvbiBkYXRlIHdoaWNoIHdlIGhhdmUgdG8gY2hlY2sgYWZ0ZXJcbiAgICAvLyBjcmVhdGluZyB0aGUgRGF0ZSkuXG4gICAgaWYgKG1vbnRoIDwgMCB8fCBtb250aCA+IDExIHx8IGRhdGUgPCAxKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyh5ZWFyLCBtb250aCwgZGF0ZSwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMpO1xuXG4gICAgLy8gQ2hlY2sgdGhhdCB0aGUgZGF0ZSB3YXNuJ3QgYWJvdmUgdGhlIHVwcGVyIGJvdW5kIGZvciB0aGUgbW9udGgsIGNhdXNpbmcgdGhlIG1vbnRoIHRvXG4gICAgLy8gb3ZlcmZsb3cuXG4gICAgaWYgKHJlc3VsdC5nZXRNb250aCgpICE9IG1vbnRoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgY2xvbmUoZGF0ZTogRGF0ZSk6IERhdGUge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZURhdGUodGhpcy5nZXRZZWFyKGRhdGUpLCB0aGlzLmdldE1vbnRoKGRhdGUpLCB0aGlzLmdldERhdGUoZGF0ZSksXG4gICAgICB0aGlzLmdldEhvdXJzKGRhdGUpLCB0aGlzLmdldE1pbnV0ZXMoZGF0ZSksIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKSk7XG4gIH1cblxuICBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXREYXRlKHRoaXMuX2NyZWF0ZURhdGVXaXRoT3ZlcmZsb3coXG4gICAgICB0aGlzLmdldFllYXIoZGF0ZSksIHRoaXMuZ2V0TW9udGgoZGF0ZSkgKyAxLCAwLCAwLCAwLCAwKSk7XG4gIH1cblxuICBhZGRDYWxlbmRhclllYXJzKGRhdGU6IERhdGUsIHllYXJzOiBudW1iZXIpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5hZGRDYWxlbmRhck1vbnRocyhkYXRlLCB5ZWFycyAqIDEyKTtcbiAgfVxuXG4gIGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IERhdGUsIG1vbnRoczogbnVtYmVyKTogRGF0ZSB7XG4gICAgbGV0IG5ld0RhdGUgPSB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxuICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLCB0aGlzLmdldE1vbnRoKGRhdGUpICsgbW9udGhzLCB0aGlzLmdldERhdGUoZGF0ZSksIHRoaXMuZ2V0SG91cnMoZGF0ZSksXG4gICAgICB0aGlzLmdldE1pbnV0ZXMoZGF0ZSksIHRoaXMuZ2V0U2Vjb25kcyhkYXRlKSk7XG5cbiAgICAvLyBJdCdzIHBvc3NpYmxlIHRvIHdpbmQgdXAgaW4gdGhlIHdyb25nIG1vbnRoIGlmIHRoZSBvcmlnaW5hbCBtb250aCBoYXMgbW9yZSBkYXlzIHRoYW4gdGhlIG5ld1xuICAgIC8vIG1vbnRoLiBJbiB0aGlzIGNhc2Ugd2Ugd2FudCB0byBnbyB0byB0aGUgbGFzdCBkYXkgb2YgdGhlIGRlc2lyZWQgbW9udGguXG4gICAgLy8gTm90ZTogdGhlIGFkZGl0aW9uYWwgKyAxMiAlIDEyIGVuc3VyZXMgd2UgZW5kIHVwIHdpdGggYSBwb3NpdGl2ZSBudW1iZXIsIHNpbmNlIEpTICUgZG9lc24ndFxuICAgIC8vIGd1YXJhbnRlZSB0aGlzLlxuICAgIGlmICh0aGlzLmdldE1vbnRoKG5ld0RhdGUpICE9ICgodGhpcy5nZXRNb250aChkYXRlKSArIG1vbnRocykgJSAxMiArIDEyKSAlIDEyKSB7XG4gICAgICBuZXdEYXRlID0gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyh0aGlzLmdldFllYXIobmV3RGF0ZSksIHRoaXMuZ2V0TW9udGgobmV3RGF0ZSksIDAsXG4gICAgICAgIHRoaXMuZ2V0SG91cnMobmV3RGF0ZSksIHRoaXMuZ2V0TWludXRlcyhuZXdEYXRlKSwgdGhpcy5nZXRTZWNvbmRzKG5ld0RhdGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RGF0ZTtcbiAgfVxuXG4gIGFkZENhbGVuZGFyRGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcbiAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSwgdGhpcy5nZXRNb250aChkYXRlKSwgdGhpcy5nZXREYXRlKGRhdGUpICsgZGF5cyxcbiAgICAgIHRoaXMuZ2V0SG91cnMoZGF0ZSksIHRoaXMuZ2V0TWludXRlcyhkYXRlKSwgdGhpcy5nZXRTZWNvbmRzKGRhdGUpKTtcbiAgfVxuXG4gIGFkZENhbGVuZGFySG91cnMoZGF0ZTogRGF0ZSwgaG91cnM6IG51bWJlcik6IERhdGUge1xuICAgIHJldHVybiB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxuICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLCB0aGlzLmdldE1vbnRoKGRhdGUpLCB0aGlzLmdldERhdGUoZGF0ZSksXG4gICAgICB0aGlzLmdldEhvdXJzKGRhdGUpICsgaG91cnMsIHRoaXMuZ2V0TWludXRlcyhkYXRlKSwgdGhpcy5nZXRTZWNvbmRzKGRhdGUpKTtcbiAgfVxuXG4gIGFkZENhbGVuZGFyTWludXRlcyhkYXRlOiBEYXRlLCBtaW51dGVzOiBudW1iZXIpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcbiAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSwgdGhpcy5nZXRNb250aChkYXRlKSwgdGhpcy5nZXREYXRlKGRhdGUpLFxuICAgICAgdGhpcy5nZXRIb3VycyhkYXRlKSwgdGhpcy5nZXRNaW51dGVzKGRhdGUpICsgbWludXRlcywgdGhpcy5nZXRTZWNvbmRzKGRhdGUpKTtcbiAgfVxuICBnZXRJU09EYXRlU3RyaW5nKGRhdGU6IERhdGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBbXG4gICAgICBkYXRlLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICB0aGlzLl8yZGlnaXQoZGF0ZS5nZXRVVENNb250aCgpICsgMSksXG4gICAgICB0aGlzLl8yZGlnaXQoZGF0ZS5nZXRVVENEYXRlKCkpXG4gICAgXS5qb2luKCctJyk7XG4gIH1cblxuICAvKiogQ3JlYXRlcyBhIGRhdGUgYnV0IGFsbG93cyB0aGUgbW9udGggYW5kIGRhdGUgdG8gb3ZlcmZsb3cuICovXG4gIHByaXZhdGUgX2NyZWF0ZURhdGVXaXRoT3ZlcmZsb3coeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXRlOiBudW1iZXIsXG4gICAgaG91cnM6IG51bWJlciwgbWludXRlczogbnVtYmVyLCBzZWNvbmRzOiBudW1iZXIpIHtcbiAgICBsZXQgcmVzdWx0ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRhdGUsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKTtcblxuICAgIC8vIFdlIG5lZWQgdG8gY29ycmVjdCBmb3IgdGhlIGZhY3QgdGhhdCBKUyBuYXRpdmUgRGF0ZSB0cmVhdHMgeWVhcnMgaW4gcmFuZ2UgWzAsIDk5XSBhc1xuICAgIC8vIGFiYnJldmlhdGlvbnMgZm9yIDE5eHguXG4gICAgaWYgKHllYXIgPj0gMCAmJiB5ZWFyIDwgMTAwKSB7XG4gICAgICByZXN1bHQuc2V0RnVsbFllYXIodGhpcy5nZXRZZWFyKHJlc3VsdCkgLSAxOTAwKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYWRzIGEgbnVtYmVyIHRvIG1ha2UgaXQgdHdvIGRpZ2l0cy5cbiAgICogQHBhcmFtIG4gVGhlIG51bWJlciB0byBwYWQuXG4gICAqIEByZXR1cm5zIFRoZSBwYWRkZWQgbnVtYmVyLlxuICAgKi9cbiAgcHJpdmF0ZSBfMmRpZ2l0KG46IG51bWJlcikge1xuICAgIHJldHVybiAoJzAwJyArIG4pLnNsaWNlKC0yKTtcbiAgfVxuXG4gIGNvbXBhcmVEYXRlKGZpcnN0OiBEYXRlLCBzZWNvbmQ6IERhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldFllYXIoZmlyc3QpIC0gdGhpcy5nZXRZZWFyKHNlY29uZCkgfHxcbiAgICAgIHRoaXMuZ2V0TW9udGgoZmlyc3QpIC0gdGhpcy5nZXRNb250aChzZWNvbmQpIHx8XG4gICAgICB0aGlzLmdldERhdGUoZmlyc3QpIC0gdGhpcy5nZXREYXRlKHNlY29uZCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZmlyc3QgZGF5IG9mIHRoZSBtb250aCBmb3IgdGhlIGdpdmVuIGRhdGUncyBtb250aC5cbiAgICovXG4gIGdldEZpcnN0RGF0ZU9mV2VlayhkYXRlOiBEYXRlLCBmaXJzdERheU9mV2VlazogbnVtYmVyKSB7XG4gICAgbGV0IGRheTogbnVtYmVyID0gZGF0ZS5nZXREYXRlKCkgLSAoKDcgKyBkYXRlLmdldERheSgpIC0gZmlyc3REYXlPZldlZWspICUgNyk7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXksIGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGZpcnN0IGRheSBvZiB0aGUgbW9udGggZm9yIHRoZSBnaXZlbiBkYXRlJ3MgbW9udGguXG4gICAqL1xuICBnZXRGaXJzdERhdGVPZk1vbnRoKGRhdGU6IERhdGUpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aCBmb3IgdGhlIGdpdmVuIGRhdGUncyBtb250aC5cbiAgICovXG4gIGdldE51bWJlck9mRGF5c0luTW9udGgoZGF0ZTogRGF0ZSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSArIDEsIDApLmdldERhdGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gYXJiaXRyYXJ5IGRhdGUgaW4gdGhlIG1vbnRoIGFmdGVyIHRoZSBnaXZlbiBkYXRlJ3MgbW9udGguXG4gICAqL1xuICBnZXREYXRlSW5OZXh0TW9udGgoZGF0ZTogRGF0ZSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSArIDEsIDEsXG4gICAgICBkYXRlLmdldEhvdXJzKCksIGRhdGUuZ2V0TWludXRlcygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gYXJiaXRyYXJ5IGRhdGUgaW4gdGhlIG1vbnRoIGJlZm9yZSB0aGUgZ2l2ZW4gZGF0ZSdzIG1vbnRoLlxuICAgKi9cbiAgZ2V0RGF0ZUluUHJldmlvdXNNb250aChkYXRlOiBEYXRlKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpIC0gMSwgMSxcbiAgICAgIGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgd2hldGhlciB0d28gZGF0ZXMgaGF2ZSB0aGUgc2FtZSB5ZWFyLlxuICAgKi9cbiAgaXNTYW1lWWVhcihkMTogRGF0ZSwgZDI6IERhdGUpIHtcbiAgICByZXR1cm4gZDEgJiYgZDIgJiYgZDEuZ2V0RnVsbFllYXIoKSA9PT0gZDIuZ2V0RnVsbFllYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHdoZXRoZXIgdHdvIGRhdGVzIGhhdmUgdGhlIHNhbWUgbW9udGggYW5kIHllYXIuXG4gICAqL1xuICBpc1NhbWVNb250aEFuZFllYXIoZDE6IERhdGUsIGQyOiBEYXRlKSB7XG4gICAgcmV0dXJuIGQxICYmIGQyICYmIGQxLmdldEZ1bGxZZWFyKCkgPT09IGQyLmdldEZ1bGxZZWFyKCkgJiYgZDEuZ2V0TW9udGgoKSA9PT0gZDIuZ2V0TW9udGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHdoZXRoZXIgdHdvIGRhdGVzIGFyZSB0aGUgc2FtZSBkYXkgKG5vdCBub3QgbmVjZXNhcmlseSB0aGUgc2FtZSB0aW1lKS5cbiAgICovXG4gIGlzU2FtZURheShkMTogRGF0ZSwgZDI6IERhdGUpIHtcbiAgICByZXR1cm4gZDEgJiYgZDIgJiYgZDEuZ2V0RGF0ZSgpID09IGQyLmdldERhdGUoKSAmJiB0aGlzLmlzU2FtZU1vbnRoQW5kWWVhcihkMSwgZDIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgd2hldGhlciB0d28gZGF0ZXMgYXJlIHRoZSBzYW1lIGhvdXJzLlxuICAgKi9cbiAgaXNTYW1lSG91cihkMTogRGF0ZSwgZDI6IERhdGUpIHtcbiAgICByZXR1cm4gZDEgJiYgZDIgJiYgZDEuZ2V0SG91cnMoKSA9PSBkMi5nZXRIb3VycygpICYmIHRoaXMuaXNTYW1lRGF5KGQxLCBkMik7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB3aGV0aGVyIHR3byBkYXRlcyBhcmUgdGhlIHNhbWUgbWludXRlcy5cbiAgICovXG4gIGlzU2FtZU1pbnV0ZShkMTogRGF0ZSwgZDI6IERhdGUpIHtcbiAgICByZXR1cm4gZDEgJiYgZDIgJiYgZDEuZ2V0TWludXRlcygpID09IGQyLmdldE1pbnV0ZXMoKSAmJiB0aGlzLmlzU2FtZUhvdXIoZDEsIGQyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHdoZXRoZXIgYSBkYXRlIGlzIGluIHRoZSBtb250aCBpbW1lZGlhdGVseSBhZnRlciBzb21lIGRhdGUuXG4gICAqIEBwYXJhbSBzdGFydERhdGUgVGhlIGRhdGUgZnJvbSB3aGljaCB0byBjb21wYXJlLlxuICAgKiBAcGFyYW0gZW5kRGF0ZSBUaGUgZGF0ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMgXG4gICAqL1xuICBpc0luTmV4dE1vbnRoKHN0YXJ0RGF0ZTogRGF0ZSwgZW5kRGF0ZTogRGF0ZSkge1xuICAgIGxldCBuZXh0TW9udGggPSB0aGlzLmdldERhdGVJbk5leHRNb250aChzdGFydERhdGUpO1xuICAgIHJldHVybiB0aGlzLmlzU2FtZU1vbnRoQW5kWWVhcihuZXh0TW9udGgsIGVuZERhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgd2hldGhlciBhIGRhdGUgaXMgaW4gdGhlIG1vbnRoIGltbWVkaWF0ZWx5IGJlZm9yZSBzb21lIGRhdGUuXG4gICAqIEBwYXJhbSBzdGFydERhdGUgVGhlIGRhdGUgZnJvbSB3aGljaCB0byBjb21wYXJlLlxuICAgKiBAcGFyYW0gZW5kRGF0ZSBUaGUgZGF0ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMgXG4gICAqL1xuICBpc0luUHJldmlvdXNNb250aChzdGFydERhdGU6IERhdGUsIGVuZERhdGU6IERhdGUpIHtcbiAgICBsZXQgcHJldmlvdXNNb250aCA9IHRoaXMuZ2V0RGF0ZUluUHJldmlvdXNNb250aChzdGFydERhdGUpO1xuICAgIHJldHVybiB0aGlzLmlzU2FtZU1vbnRoQW5kWWVhcihlbmREYXRlLCBwcmV2aW91c01vbnRoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBtaWRwb2ludCBiZXR3ZWVuIHR3byBkYXRlcy5cbiAgICogQHBhcmFtIGQxXG4gICAqIEBwYXJhbSBkMlxuICAgKiBAcmV0dXJucyBcbiAgICovXG4gIGdldERhdGVNaWRwb2ludChkMTogRGF0ZSwgZDI6IERhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVEYXRlQXRNaWRuaWdodCgoZDEuZ2V0VGltZSgpICsgZDIuZ2V0VGltZSgpKSAvIDIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHdlZWsgb2YgdGhlIG1vbnRoIHRoYXQgYSBnaXZlbiBkYXRlIG9jY3VycyBpbi5cbiAgICogQHBhcmFtIGRhdGVcbiAgICogQHJldHVybnMgSW5kZXggb2YgdGhlIHdlZWsgb2YgdGhlIG1vbnRoICh6ZXJvLWJhc2VkKS5cbiAgICovXG4gIGdldFdlZWtPZk1vbnRoKGRhdGU6IERhdGUpIHtcbiAgICBsZXQgZmlyc3REYXlPZk1vbnRoID0gdGhpcy5nZXRGaXJzdERhdGVPZk1vbnRoKGRhdGUpO1xuICAgIHJldHVybiBNYXRoLmZsb29yKChmaXJzdERheU9mTW9udGguZ2V0RGF5KCkgKyBkYXRlLmdldERhdGUoKSAtIDEpIC8gNyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgd2VlayBvZiB0aGUgeWVhciB0aGF0IGEgZ2l2ZW4gZGF0ZSBvY2N1cnMgaW4uXG4gICAqIEBwYXJhbSBkYXRlXG4gICAqIEByZXR1cm5zIEluZGV4IG9mIHRoZSB3ZWVrIGFjY29yZGluZyB0byBJU08tODYwMS5cbiAgICovXG4gIGdldFdlZWtPZlllYXIoZGF0ZTogRGF0ZSkge1xuICAgIC8vIENvcHkgZGF0ZSBzbyBkb24ndCBtb2RpZnkgb3JpZ2luYWxcbiAgICBjb25zdCBkID0gbmV3IERhdGUoRGF0ZS5VVEMoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKSk7XG4gICAgLy8gU2V0IHRvIG5lYXJlc3QgVGh1cnNkYXk6IGN1cnJlbnQgZGF0ZSArIDQgLSBjdXJyZW50IGRheSBudW1iZXJcbiAgICAvLyBNYWtlIFN1bmRheSdzIGRheSBudW1iZXIgN1xuICAgIGQuc2V0VVRDRGF0ZShkLmdldFVUQ0RhdGUoKSArIDQgLSAoZC5nZXRVVENEYXkoKSB8fCA3KSk7XG4gICAgLy8gR2V0IGZpcnN0IGRheSBvZiB5ZWFyXG4gICAgY29uc3QgeWVhclN0YXJ0ID0gbmV3IERhdGUoRGF0ZS5VVEMoZC5nZXRVVENGdWxsWWVhcigpLCAwLCAxKSk7XG4gICAgLy8gQ2FsY3VsYXRlIGZ1bGwgd2Vla3MgdG8gbmVhcmVzdCBUaHVyc2RheSBhbmQgcmV0dXJuIHdlZWtOb1xuICAgIHJldHVybiBNYXRoLmNlaWwoKCAoICgrZCAtICt5ZWFyU3RhcnQpIC8gODY0MDAwMDApICsgMSkgLyA3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbmV3IGRhdGUgaW5jcmVtZW50ZWQgYnkgdGhlIGdpdmVuIG51bWJlciBvZiBtaW51dGVzLiBOdW1iZXIgb2YgbWludXRlcyBjYW4gYmUgbmVnYXRpdmUuXG4gICAqIEBwYXJhbSBkYXRlXG4gICAqIEBwYXJhbSBudW1iZXJPZk1pbnV0ZXNcbiAgICogQHJldHVybnMgXG4gICAqL1xuICBpbmNyZW1lbnRNaW51dGVzKGRhdGU6IERhdGUsIG51bWJlck9mTWludXRlczogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSxcbiAgICAgIGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCkgKyBudW1iZXJPZk1pbnV0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBuZXcgZGF0ZSBpbmNyZW1lbnRlZCBieSB0aGUgZ2l2ZW4gbnVtYmVyIG9mIGhvdXJzLiBOdW1iZXIgb2YgaG91cnMgY2FuIGJlIG5lZ2F0aXZlLlxuICAgKiBAcGFyYW0gZGF0ZVxuICAgKiBAcGFyYW0gbnVtYmVyT2ZIb3Vyc1xuICAgKiBAcmV0dXJucyBcbiAgICovXG4gIGluY3JlbWVudEhvdXJzKGRhdGU6IERhdGUsIG51bWJlck9mSG91cnM6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCksXG4gICAgICBkYXRlLmdldEhvdXJzKCkgKyBudW1iZXJPZkhvdXJzLCBkYXRlLmdldE1pbnV0ZXMoKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhIG5ldyBkYXRlIGluY3JlbWVudGVkIGJ5IHRoZSBnaXZlbiBudW1iZXIgb2YgZGF5cy4gTnVtYmVyIG9mIGRheXMgY2FuIGJlIG5lZ2F0aXZlLlxuICAgKiBAcGFyYW0gZGF0ZVxuICAgKiBAcGFyYW0gbnVtYmVyT2ZEYXlzXG4gICAqIEByZXR1cm5zIFxuICAgKi9cbiAgaW5jcmVtZW50RGF5cyhkYXRlOiBEYXRlLCBudW1iZXJPZkRheXM6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkgKyBudW1iZXJPZkRheXMsXG4gICAgICBkYXRlLmdldEhvdXJzKCksIGRhdGUuZ2V0TWludXRlcygpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbmV3IGRhdGUgaW5jcmVtZW50ZWQgYnkgdGhlIGdpdmVuIG51bWJlciBvZiBtb250aHMuIE51bWJlciBvZiBtb250aHMgY2FuIGJlIG5lZ2F0aXZlLlxuICAgKiBJZiB0aGUgZGF0ZSBvZiB0aGUgZ2l2ZW4gbW9udGggZG9lcyBub3QgbWF0Y2ggdGhlIHRhcmdldCBtb250aCwgdGhlIGRhdGUgd2lsbCBiZSBzZXQgdG8gdGhlXG4gICAqIGxhc3QgZGF5IG9mIHRoZSBtb250aC5cbiAgICogQHBhcmFtIGRhdGVcbiAgICogQHBhcmFtIG51bWJlck9mTW9udGhzXG4gICAqIEByZXR1cm5zIFxuICAgKi9cbiAgaW5jcmVtZW50TW9udGhzKGRhdGU6IERhdGUsIG51bWJlck9mTW9udGhzOiBudW1iZXIpIHtcbiAgICAvLyBJZiB0aGUgc2FtZSBkYXRlIGluIHRoZSB0YXJnZXQgbW9udGggZG9lcyBub3QgYWN0dWFsbHkgZXhpc3QsIHRoZSBEYXRlIG9iamVjdCB3aWxsXG4gICAgLy8gYXV0b21hdGljYWxseSBhZHZhbmNlICphbm90aGVyKiBtb250aCBieSB0aGUgbnVtYmVyIG9mIG1pc3NpbmcgZGF5cy5cbiAgICAvLyBGb3IgZXhhbXBsZSwgaWYgeW91IHRyeSB0byBnbyBmcm9tIEphbi4gMzAgdG8gRmViLiAzMCwgeW91J2xsIGVuZCB1cCBvbiBNYXJjaCAyLlxuICAgIC8vIFNvLCB3ZSBjaGVjayBpZiB0aGUgbW9udGggb3ZlcmZsb3dlZCBhbmQgZ28gdG8gdGhlIGxhc3QgZGF5IG9mIHRoZSB0YXJnZXQgbW9udGggaW5zdGVhZC5cbiAgICBsZXQgZGF0ZUluVGFyZ2V0TW9udGggPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSArIG51bWJlck9mTW9udGhzLCAxLFxuICAgICAgZGF0ZS5nZXRIb3VycygpLCBkYXRlLmdldE1pbnV0ZXMoKSk7XG4gICAgbGV0IG51bWJlck9mRGF5c0luTW9udGggPSB0aGlzLmdldE51bWJlck9mRGF5c0luTW9udGgoZGF0ZUluVGFyZ2V0TW9udGgpO1xuICAgIGlmIChudW1iZXJPZkRheXNJbk1vbnRoIDwgZGF0ZS5nZXREYXRlKCkpIHtcbiAgICAgIGRhdGVJblRhcmdldE1vbnRoLnNldERhdGUobnVtYmVyT2ZEYXlzSW5Nb250aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGVJblRhcmdldE1vbnRoLnNldERhdGUoZGF0ZS5nZXREYXRlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRlSW5UYXJnZXRNb250aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGludGVnZXIgZGlzdGFuY2UgYmV0d2VlbiB0d28gbW9udGhzLiBUaGlzICpvbmx5KiBjb25zaWRlcnMgdGhlIG1vbnRoIGFuZCB5ZWFyXG4gICAqIHBvcnRpb24gb2YgdGhlIERhdGUgaW5zdGFuY2VzLlxuICAgKlxuICAgKiBAcGFyYW0gc3RhcnRcbiAgICogQHBhcmFtIGVuZFxuICAgKiBAcmV0dXJucyBOdW1iZXIgb2YgbW9udGhzIGJldHdlZW4gYHN0YXJ0YCBhbmQgYGVuZGAuIElmIGBlbmRgIGlzIGJlZm9yZSBgc3RhcnRgXG4gICAqICAgICBjaHJvbm9sb2dpY2FsbHksIHRoaXMgbnVtYmVyIHdpbGwgYmUgbmVnYXRpdmUuXG4gICAqL1xuICBnZXRNb250aERpc3RhbmNlKHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpIHtcbiAgICByZXR1cm4gKDEyICogKGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKSkpICsgKGVuZC5nZXRNb250aCgpIC0gc3RhcnQuZ2V0TW9udGgoKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbGFzdCBkYXkgb2YgdGhlIG1vbnRoIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cbiAgICogQHBhcmFtIGRhdGVcbiAgICogQHJldHVybnMgXG4gICAqL1xuICBnZXRMYXN0RGF0ZU9mTW9udGgoZGF0ZTogRGF0ZSkge1xuICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgdGhpcy5nZXROdW1iZXJPZkRheXNJbk1vbnRoKGRhdGUpLFxuICAgICAgZGF0ZS5nZXRIb3VycygpLCBkYXRlLmdldE1pbnV0ZXMoKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgYSBkYXRlIGlzIHZhbGlkLlxuICAgKiBAcGFyYW0gZGF0ZVxuICAgKiBAcmV0dXJuICBXaGV0aGVyIHRoZSBkYXRlIGlzIGEgdmFsaWQgRGF0ZS5cbiAgICovXG4gIGlzVmFsaWREYXRlKGRhdGU6IERhdGUpIHtcbiAgICByZXR1cm4gZGF0ZSAhPSBudWxsICYmIGRhdGUuZ2V0VGltZSAmJiAhaXNOYU4oZGF0ZS5nZXRUaW1lKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBkYXRlJ3MgdGltZSB0byBtaWRuaWdodC5cbiAgICogQHBhcmFtIGRhdGVcbiAgICovXG4gIHNldERhdGVUaW1lVG9NaWRuaWdodChkYXRlOiBEYXRlKSB7XG4gICAgaWYgKHRoaXMuaXNWYWxpZERhdGUoZGF0ZSkpIHtcbiAgICAgIGRhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkYXRlIHdpdGggdGhlIHRpbWUgc2V0IHRvIG1pZG5pZ2h0LlxuICAgKiBEcm9wLWluIHJlcGxhY2VtZW50IGZvciB0d28gZm9ybXMgb2YgdGhlIERhdGUgY29uc3RydWN0b3I6XG4gICAqIDEuIE5vIGFyZ3VtZW50IGZvciBEYXRlIHJlcHJlc2VudGluZyBub3cuXG4gICAqIDIuIFNpbmdsZS1hcmd1bWVudCB2YWx1ZSByZXByZXNlbnRpbmcgbnVtYmVyIG9mIHNlY29uZHMgc2luY2UgVW5peCBFcG9jaFxuICAgKiBvciBhIERhdGUgb2JqZWN0LlxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQHJldHVybiBOZXcgZGF0ZSB3aXRoIHRpbWUgc2V0IHRvIG1pZG5pZ2h0LlxuICAgKi9cbiAgY3JlYXRlRGF0ZUF0TWlkbmlnaHQodmFsdWU6IGFueSkge1xuICAgIGxldCBkYXRlOiBEYXRlO1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnNldERhdGVUaW1lVG9NaWRuaWdodChkYXRlKTtcbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBkYXRlIGlzIHdpdGhpbiBhIG1pbiBhbmQgbWF4IHJhbmdlLCBpZ25vcmluZyB0aGUgdGltZSBjb21wb25lbnQuXG4gICAqIElmIG1pbkRhdGUgb3IgbWF4RGF0ZSBhcmUgbm90IGRhdGVzLCB0aGV5IGFyZSBpZ25vcmVkLlxuICAgKiBAcGFyYW0gZGF0ZVxuICAgKiBAcGFyYW0gbWluRGF0ZVxuICAgKiBAcGFyYW0gbWF4RGF0ZVxuICAgKi9cbiAgaXNEYXRlV2l0aGluUmFuZ2UoZGF0ZTogRGF0ZSwgbWluRGF0ZTogRGF0ZSwgbWF4RGF0ZTogRGF0ZSkge1xuICAgIGxldCBkYXRlQXRNaWRuaWdodCA9IHRoaXMuY3JlYXRlRGF0ZUF0TWlkbmlnaHQoZGF0ZSk7XG4gICAgbGV0IG1pbkRhdGVBdE1pZG5pZ2h0ID0gdGhpcy5pc1ZhbGlkRGF0ZShtaW5EYXRlKSA/IHRoaXMuY3JlYXRlRGF0ZUF0TWlkbmlnaHQobWluRGF0ZSkgOiBudWxsO1xuICAgIGxldCBtYXhEYXRlQXRNaWRuaWdodCA9IHRoaXMuaXNWYWxpZERhdGUobWF4RGF0ZSkgPyB0aGlzLmNyZWF0ZURhdGVBdE1pZG5pZ2h0KG1heERhdGUpIDogbnVsbDtcbiAgICByZXR1cm4gKCFtaW5EYXRlQXRNaWRuaWdodCB8fCBtaW5EYXRlQXRNaWRuaWdodCA8PSBkYXRlQXRNaWRuaWdodCkgJiZcbiAgICAgICghbWF4RGF0ZUF0TWlkbmlnaHQgfHwgbWF4RGF0ZUF0TWlkbmlnaHQgPj0gZGF0ZUF0TWlkbmlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIGRhdGUgaXMgd2l0aGluIGEgbWluIGFuZCBtYXggcmFuZ2UuXG4gICAqIElmIG1pbkRhdGUgb3IgbWF4RGF0ZSBhcmUgbm90IGRhdGVzLCB0aGV5IGFyZSBpZ25vcmVkLlxuICAgKiBAcGFyYW0gZGF0ZVxuICAgKiBAcGFyYW0gbWluRGF0ZVxuICAgKiBAcGFyYW0gbWF4RGF0ZVxuICAgKi9cbiAgaXNGdWxsRGF0ZVdpdGhpblJhbmdlKGRhdGU6IERhdGUsIG1pbkRhdGU6IERhdGUsIG1heERhdGU6IERhdGUpIHtcbiAgICBtaW5EYXRlID0gdGhpcy5pc1ZhbGlkRGF0ZShtaW5EYXRlKSA/IG1pbkRhdGUgOiBudWxsO1xuICAgIG1heERhdGUgPSB0aGlzLmlzVmFsaWREYXRlKG1heERhdGUpID8gbWF4RGF0ZSA6IG51bGw7XG4gICAgcmV0dXJuICghbWluRGF0ZSB8fCBtaW5EYXRlIDw9IGRhdGUpICYmXG4gICAgICAoIW1heERhdGUgfHwgbWF4RGF0ZSA+PSBkYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbmV3IGRhdGUgaW5jcmVtZW50ZWQgYnkgdGhlIGdpdmVuIG51bWJlciBvZiB5ZWFycy4gTnVtYmVyIG9mIHllYXJzIGNhbiBiZSBuZWdhdGl2ZS5cbiAgICogU2VlIGBpbmNyZW1lbnRNb250aHNgIGZvciBub3RlcyBvbiBvdmVyZmxvdyBmb3Igc3BlY2lmaWMgZGF0ZXMuXG4gICAqIEBwYXJhbSBkYXRlXG4gICAqIEBwYXJhbSBudW1iZXJPZlllYXJzXG4gICAqIEByZXR1cm5zIFxuICAgKi9cbiAgaW5jcmVtZW50WWVhcnMoZGF0ZTogRGF0ZSwgbnVtYmVyT2ZZZWFyczogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5jcmVtZW50TW9udGhzKGRhdGUsIG51bWJlck9mWWVhcnMgKiAxMik7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBpbnRlZ2VyIGRpc3RhbmNlIGJldHdlZW4gdHdvIHllYXJzLiBUaGlzICpvbmx5KiBjb25zaWRlcnMgdGhlIHllYXIgcG9ydGlvbiBvZiB0aGVcbiAgICogRGF0ZSBpbnN0YW5jZXMuXG4gICAqXG4gICAqIEBwYXJhbSBzdGFydFxuICAgKiBAcGFyYW0gZW5kXG4gICAqIEByZXR1cm5zIE51bWJlciBvZiBtb250aHMgYmV0d2VlbiBgc3RhcnRgIGFuZCBgZW5kYC4gSWYgYGVuZGAgaXMgYmVmb3JlIGBzdGFydGBcbiAgICogICAgIGNocm9ub2xvZ2ljYWxseSwgdGhpcyBudW1iZXIgd2lsbCBiZSBuZWdhdGl2ZS5cbiAgICovXG4gIGdldFllYXJEaXN0YW5jZShzdGFydDogRGF0ZSwgZW5kOiBEYXRlKSB7XG4gICAgcmV0dXJuIGVuZC5nZXRGdWxsWWVhcigpIC0gc3RhcnQuZ2V0RnVsbFllYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGFtcHMgYSBkYXRlIGJldHdlZW4gYSBtaW5pbXVtIGFuZCBhIG1heGltdW0gZGF0ZS5cbiAgICogQHBhcmFtIGRhdGUgRGF0ZSB0byBiZSBjbGFtcGVkXG4gICAqIEBwYXJhbSBtaW5EYXRlIE1pbmltdW0gZGF0ZVxuICAgKiBAcGFyYW0gbWF4RGF0ZSBNYXhpbXVtIGRhdGVcbiAgICogQHJldHVyblxuICAgKi9cbiAgY2xhbXBEYXRlKGRhdGU6IERhdGUsIG1pbkRhdGU6IERhdGUsIG1heERhdGU6IERhdGUpIHtcbiAgICBsZXQgYm91bmREYXRlID0gZGF0ZTtcbiAgICBpZiAobWluRGF0ZSAmJiBkYXRlIDwgbWluRGF0ZSkge1xuICAgICAgYm91bmREYXRlID0gbmV3IERhdGUobWluRGF0ZS5nZXRUaW1lKCkpO1xuICAgIH1cbiAgICBpZiAobWF4RGF0ZSAmJiBkYXRlID4gbWF4RGF0ZSkge1xuICAgICAgYm91bmREYXRlID0gbmV3IERhdGUobWF4RGF0ZS5nZXRUaW1lKCkpO1xuICAgIH1cbiAgICByZXR1cm4gYm91bmREYXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3RzIGFuZCBwYXJzZXMgdGhlIHRpbWVzdGFtcCBmcm9tIGEgRE9NIG5vZGUuXG4gICAqIEBwYXJhbSBub2RlIE5vZGUgZnJvbSB3aGljaCB0aGUgdGltZXN0YW1wIHdpbGwgYmUgZXh0cmFjdGVkLlxuICAgKiBAcmV0dXJuIFRpbWUgc2luY2UgZXBvY2guXG4gICAqL1xuICBnZXRUaW1lc3RhbXBGcm9tTm9kZShub2RlOiBhbnkpIHtcbiAgICBpZiAobm9kZSAmJiBub2RlLmhhc0F0dHJpYnV0ZSgnZGF0YS10aW1lc3RhbXAnKSkge1xuICAgICAgcmV0dXJuIE51bWJlcihub2RlLmdldEF0dHJpYnV0ZSgnZGF0YS10aW1lc3RhbXAnKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIG1vbnRoIGlzIHdpdGhpbiBhIG1pbiBhbmQgbWF4IHJhbmdlLCBpZ25vcmluZyB0aGUgZGF0ZSBhbmQgdGltZSBjb21wb25lbnRzLlxuICAgKiBJZiBtaW5EYXRlIG9yIG1heERhdGUgYXJlIG5vdCBkYXRlcywgdGhleSBhcmUgaWdub3JlZC5cbiAgICogQHBhcmFtIGRhdGVcbiAgICogQHBhcmFtIG1pbkRhdGVcbiAgICogQHBhcmFtIG1heERhdGVcbiAgICovXG4gIGlzTW9udGhXaXRoaW5SYW5nZShkYXRlOiBEYXRlLCBtaW5EYXRlOiBEYXRlLCBtYXhEYXRlOiBEYXRlKSB7XG4gICAgbGV0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgIGxldCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgcmV0dXJuICghbWluRGF0ZSB8fCBtaW5EYXRlLmdldEZ1bGxZZWFyKCkgPCB5ZWFyIHx8IG1pbkRhdGUuZ2V0TW9udGgoKSA8PSBtb250aCkgJiZcbiAgICAgICghbWF4RGF0ZSB8fCBtYXhEYXRlLmdldEZ1bGxZZWFyKCkgPiB5ZWFyIHx8IG1heERhdGUuZ2V0TW9udGgoKSA+PSBtb250aCk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGFyZXMgdHdvIGRhdGVzLlxuICAgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IGRhdGUgdG8gY29tcGFyZS5cbiAgICogQHBhcmFtIHNlY29uZCBUaGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZS5cbiAgICogQHJldHVybnMgMCBpZiB0aGUgZGF0ZXMgYXJlIGVxdWFsLCBhIG51bWJlciBsZXNzIHRoYW4gMCBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBlYXJsaWVyLFxuICAgKiAgICAgYSBudW1iZXIgZ3JlYXRlciB0aGFuIDAgaWYgdGhlIGZpcnN0IGRhdGUgaXMgbGF0ZXIuXG4gICAqL1xuICBjb21wYXJlRGF0ZUFuZFRpbWUoZmlyc3Q6IERhdGUsIHNlY29uZDogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0WWVhcihmaXJzdCkgLSB0aGlzLmdldFllYXIoc2Vjb25kKSB8fFxuICAgICAgdGhpcy5nZXRNb250aChmaXJzdCkgLSB0aGlzLmdldE1vbnRoKHNlY29uZCkgfHxcbiAgICAgIHRoaXMuZ2V0RGF0ZShmaXJzdCkgLSB0aGlzLmdldERhdGUoc2Vjb25kKSB8fFxuICAgICAgdGhpcy5nZXRIb3VycyhmaXJzdCkgLSB0aGlzLmdldERhdGUoc2Vjb25kKSB8fFxuICAgICAgdGhpcy5nZXRNaW51dGVzKGZpcnN0KSAtIHRoaXMuZ2V0RGF0ZShzZWNvbmQpIHx8XG4gICAgICB0aGlzLmdldFNlY29uZHMoZmlyc3QpIC0gdGhpcy5nZXREYXRlKHNlY29uZCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHR3byBkYXRlcyBhcmUgZXF1YWwuXG4gICAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgZGF0ZSB0byBjaGVjay5cbiAgICogQHBhcmFtIHNlY29uZCBUaGUgc2Vjb25kIGRhdGUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIHR3byBkYXRlcyBhcmUgZXF1YWwuXG4gICAqICAgICBOdWxsIGRhdGVzIGFyZSBjb25zaWRlcmVkIGVxdWFsIHRvIG90aGVyIG51bGwgZGF0ZXMuXG4gICAqL1xuICBzYW1lRGF0ZShmaXJzdDogRGF0ZSB8IG51bGwsIHNlY29uZDogRGF0ZSB8IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmlyc3QgJiYgc2Vjb25kID8gIXRoaXMuY29tcGFyZURhdGUoZmlyc3QsIHNlY29uZCkgOiBmaXJzdCA9PSBzZWNvbmQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHR3byBkYXRlcyBhcmUgZXF1YWwuXG4gICAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgZGF0ZSB0byBjaGVjay5cbiAgICogQHBhcmFtIHNlY29uZCBUaGUgc2Vjb25kIGRhdGUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIHR3byBkYXRlcyBhcmUgZXF1YWwuXG4gICAqICAgICBOdWxsIGRhdGVzIGFyZSBjb25zaWRlcmVkIGVxdWFsIHRvIG90aGVyIG51bGwgZGF0ZXMuXG4gICAqL1xuICBzYW1lRGF0ZUFuZFRpbWUoZmlyc3Q6IERhdGUgfCBudWxsLCBzZWNvbmQ6IERhdGUgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZpcnN0ICYmIHNlY29uZCA/ICF0aGlzLmNvbXBhcmVEYXRlQW5kVGltZShmaXJzdCwgc2Vjb25kKSA6IGZpcnN0ID09IHNlY29uZDtcbiAgfVxuXG59XG4iXX0=