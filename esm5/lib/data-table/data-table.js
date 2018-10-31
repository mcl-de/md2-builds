/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Directive, EventEmitter, Input, Output, Optional, IterableDiffers, ViewEncapsulation, NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Md2SelectModule } from '../select/index';
var Md2PaginationChange = /** @class */ (function () {
    function Md2PaginationChange() {
    }
    return Md2PaginationChange;
}());
export { Md2PaginationChange };
if (false) {
    /** @type {?} */
    Md2PaginationChange.prototype.source;
    /** @type {?} */
    Md2PaginationChange.prototype.activePage;
}
/**
 * @record
 */
export function SortEvent() { }
/** @type {?} */
SortEvent.prototype.sortBy;
/** @type {?} */
SortEvent.prototype.sortOrder;
/**
 * @record
 */
export function PageEvent() { }
/** @type {?} */
PageEvent.prototype.activePage;
/** @type {?} */
PageEvent.prototype.rowsPerPage;
/** @type {?} */
PageEvent.prototype.dataLength;
/**
 * @record
 */
export function DataEvent() { }
/** @type {?} */
DataEvent.prototype.length;
var Md2DataTable = /** @class */ (function () {
    function Md2DataTable(differs) {
        this.differs = differs;
        this.isDataChanged = false;
        this._data = [];
        this._activePage = 1;
        this._rowsPerPage = 1000;
        this._sortBy = '';
        this._sortOrder = 'asc';
        this.activePageChange = new EventEmitter();
        this.rowsPerPageChange = new EventEmitter();
        this.sortByChange = new EventEmitter();
        this.sortOrderChange = new EventEmitter();
        this.onSortChange = new EventEmitter();
        this.onPageChange = new EventEmitter();
        this.diff = differs.find([]).create(null);
    }
    Object.defineProperty(Md2DataTable.prototype, "md2Data", {
        get: /**
         * @return {?}
         */
        function () { return this._data; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._data !== value) {
                this._data = value || [];
                this.recalculatePage();
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "activePage", {
        get: /**
         * @return {?}
         */
        function () { return this._activePage; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._activePage !== value) {
                this._activePage = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "rowsPerPage", {
        get: /**
         * @return {?}
         */
        function () { return this._rowsPerPage; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._rowsPerPage !== value) {
                this._rowsPerPage = value;
                this.setPage(this.activePage, value);
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "sortBy", {
        get: /**
         * @return {?}
         */
        function () { return this._sortBy; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._sortBy !== value) {
                this._sortBy = value;
                if (value) {
                    this.onSortChange.next({ sortBy: this.sortBy, sortOrder: this.sortOrder });
                }
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2DataTable.prototype, "sortOrder", {
        get: /**
         * @return {?}
         */
        function () { return this._sortOrder; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!(value === 'asc' || value === 'desc')) {
                console.warn('sortOrder value must be one of ["asc", "desc"], but is:', value);
                value = 'asc';
            }
            if (this._sortOrder !== value) {
                this._sortOrder = value;
                this.isDataChanged = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Md2DataTable.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var changes = this.diff.diff(this.md2Data);
        if (changes) {
            this.recalculatePage();
            this.isDataChanged = true;
        }
        if (this.isDataChanged) {
            this.fillData();
            this.diff.diff(this.md2Data);
            this.isDataChanged = false;
        }
    };
    /**
     * @return {?}
     */
    Md2DataTable.prototype.getSort = /**
     * @return {?}
     */
    function () {
        return { sortBy: this.sortBy, sortOrder: this.sortOrder };
    };
    /**
     * @param {?} sortBy
     * @param {?} sortOrder
     * @return {?}
     */
    Md2DataTable.prototype.setSort = /**
     * @param {?} sortBy
     * @param {?} sortOrder
     * @return {?}
     */
    function (sortBy, sortOrder) {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = sortOrder;
            this.isDataChanged = true;
            this.onSortChange.next({ sortBy: sortBy, sortOrder: sortOrder });
            this.sortByChange.emit(this.sortBy);
            this.sortOrderChange.emit(this.sortOrder);
        }
    };
    /**
     * @return {?}
     */
    Md2DataTable.prototype.getPage = /**
     * @return {?}
     */
    function () {
        return {
            activePage: this.activePage,
            rowsPerPage: this.rowsPerPage,
            dataLength: this.md2Data.length
        };
    };
    /**
     * @param {?} activePage
     * @param {?} rowsPerPage
     * @return {?}
     */
    Md2DataTable.prototype.setPage = /**
     * @param {?} activePage
     * @param {?} rowsPerPage
     * @return {?}
     */
    function (activePage, rowsPerPage) {
        if (this.rowsPerPage !== rowsPerPage || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ?
                activePage : this.calculateNewActivePage(this.rowsPerPage, rowsPerPage);
            if (this.rowsPerPage !== rowsPerPage) {
                this._rowsPerPage = rowsPerPage;
                this.rowsPerPageChange.emit(this.rowsPerPage);
            }
            this.isDataChanged = true;
            this.onPageChange.emit({
                activePage: this.activePage,
                rowsPerPage: this.rowsPerPage,
                dataLength: this.md2Data ? this.md2Data.length : 0
            });
            this.activePageChange.emit(this.activePage);
        }
    };
    /**
     * @param {?} previousRowsPerPage
     * @param {?} currentRowsPerPage
     * @return {?}
     */
    Md2DataTable.prototype.calculateNewActivePage = /**
     * @param {?} previousRowsPerPage
     * @param {?} currentRowsPerPage
     * @return {?}
     */
    function (previousRowsPerPage, currentRowsPerPage) {
        /** @type {?} */
        var firstRowOnPage = (this.activePage - 1) * previousRowsPerPage + 1;
        /** @type {?} */
        var newActivePage = Math.ceil(firstRowOnPage / currentRowsPerPage);
        return newActivePage;
    };
    /**
     * @return {?}
     */
    Md2DataTable.prototype.recalculatePage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var lastPage = Math.ceil(this.md2Data.length / this.rowsPerPage);
        if (lastPage < this.activePage) {
            this._activePage = lastPage || 1;
            setTimeout(function () {
                _this.activePageChange.emit(_this.activePage);
            }, 10);
        }
        else { }
        this.onPageChange.emit({
            activePage: this.activePage,
            rowsPerPage: this.rowsPerPage,
            dataLength: this.md2Data.length
        });
    };
    /**
     * @return {?}
     */
    Md2DataTable.prototype.fillData = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var offset = (this.activePage - 1) * this.rowsPerPage;
        /** @type {?} */
        var data = this.md2Data;
        /** @type {?} */
        var sortInt = this.sortOrder === 'desc' ? -1 : 1;
        if (this.sortBy) {
            data = data.sort(function (a, b) {
                /** @type {?} */
                var x = _this.caseInsensitiveIteratee(a);
                /** @type {?} */
                var y = _this.caseInsensitiveIteratee(b);
                return ((x > y) ? 1 : (y > x) ? -1 : 0) * sortInt;
            });
        }
        this.data = data.slice(offset, offset + this.rowsPerPage);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2DataTable.prototype.caseInsensitiveIteratee = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var e_1, _a;
        if (typeof this.sortBy === 'string' || this.sortBy instanceof String) {
            try {
                for (var _b = tslib_1.__values(this.sortBy.split('.')), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var sortByProperty = _c.value;
                    value = value[sortByProperty];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            value = value[this.sortBy + ''];
        }
        if (value && typeof value === 'string' || value instanceof String) {
            return value.toLowerCase();
        }
        return value;
    };
    Md2DataTable.decorators = [
        { type: Directive, args: [{
                    selector: 'table[md2Data]',
                    exportAs: 'md2DataTable'
                },] }
    ];
    /** @nocollapse */
    Md2DataTable.ctorParameters = function () { return [
        { type: IterableDiffers }
    ]; };
    Md2DataTable.propDecorators = {
        md2Data: [{ type: Input }],
        activePage: [{ type: Input }],
        rowsPerPage: [{ type: Input }],
        sortBy: [{ type: Input }],
        sortOrder: [{ type: Input }],
        activePageChange: [{ type: Output }],
        rowsPerPageChange: [{ type: Output }],
        sortByChange: [{ type: Output }],
        sortOrderChange: [{ type: Output }]
    };
    return Md2DataTable;
}());
export { Md2DataTable };
if (false) {
    /** @type {?} */
    Md2DataTable.prototype.diff;
    /** @type {?} */
    Md2DataTable.prototype.isDataChanged;
    /** @type {?} */
    Md2DataTable.prototype._data;
    /** @type {?} */
    Md2DataTable.prototype._activePage;
    /** @type {?} */
    Md2DataTable.prototype._rowsPerPage;
    /** @type {?} */
    Md2DataTable.prototype._sortBy;
    /** @type {?} */
    Md2DataTable.prototype._sortOrder;
    /** @type {?} */
    Md2DataTable.prototype.data;
    /** @type {?} */
    Md2DataTable.prototype.activePageChange;
    /** @type {?} */
    Md2DataTable.prototype.rowsPerPageChange;
    /** @type {?} */
    Md2DataTable.prototype.sortByChange;
    /** @type {?} */
    Md2DataTable.prototype.sortOrderChange;
    /** @type {?} */
    Md2DataTable.prototype.onSortChange;
    /** @type {?} */
    Md2DataTable.prototype.onPageChange;
    /** @type {?} */
    Md2DataTable.prototype.differs;
}
var Md2DataTableSortBy = /** @class */ (function () {
    function Md2DataTableSortBy(_md2Table) {
        this._md2Table = _md2Table;
        this._isAsc = false;
        this._isDesc = false;
    }
    /**
     * @return {?}
     */
    Md2DataTableSortBy.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._md2Table.onSortChange.subscribe(function (event) {
            _this._isAsc = (event.sortBy === _this.md2SortBy && event.sortOrder === 'asc');
            _this._isDesc = (event.sortBy === _this.md2SortBy && event.sortOrder === 'desc');
        });
    };
    /**
     * @return {?}
     */
    Md2DataTableSortBy.prototype._sort = /**
     * @return {?}
     */
    function () {
        if (this._isAsc) {
            this._md2Table.setSort(this.md2SortBy, 'desc');
        }
        else {
            this._md2Table.setSort(this.md2SortBy, 'asc');
        }
    };
    Md2DataTableSortBy.decorators = [
        { type: Component, args: [{
                    selector: '[md2SortBy]',
                    template: "<ng-content></ng-content>\n&nbsp;\n<svg *ngIf=\"!_isDesc\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\">\n  <path d=\"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z\" />\n</svg>\n<svg *ngIf=\"_isDesc\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\">\n  <path d=\"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z\" />\n</svg>\n",
                    host: {
                        '[class.md2-sort-active]': '_isAsc || _isDesc',
                        '(click)': '_sort()'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: ["[md2SortBy]{line-height:24px;color:rgba(0,0,0,.54);white-space:nowrap;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[md2SortBy] svg{display:inline-block;vertical-align:middle;fill:currentColor;opacity:0}[md2SortBy]:hover:not(.md2-sort-active) svg{color:rgba(0,0,0,.26);opacity:1}[md2SortBy].md2-sort-active{color:rgba(0,0,0,.87)}[md2SortBy].md2-sort-active svg{opacity:1}md2-pagination{display:block;color:rgba(0,0,0,.54);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}md2-pagination::after,md2-pagination::before{display:table;content:''}md2-pagination::after{clear:both}md2-pagination .md2-pagination{display:inline-block;margin:8px 0;padding:0}md2-pagination .md2-pagination li{position:relative;display:inline-block;width:36px;vertical-align:top;text-align:center;line-height:36px;border-radius:100px;cursor:pointer;box-sizing:border-box}md2-pagination .md2-pagination li:hover:not(.disabled):not(.active){background:rgba(0,0,0,.12)}md2-pagination .md2-pagination li.disabled{pointer-events:none;background:0 0;cursor:default;opacity:.48}md2-pagination .md2-pagination li.active{background:#106cc8;color:#fff;cursor:default}md2-pagination .md2-pagination li svg{fill:currentColor;margin-bottom:-7px}md2-pagination .md2-rows-select{display:inline-block;margin:8px 0;padding:0;float:right;color:rgba(0,0,0,.54);line-height:36px}md2-pagination .md2-rows-select label{vertical-align:sub;margin-right:10px}md2-pagination .md2-rows-select md2-select{display:inline-block;border:0;outline:0}md2-pagination .md2-rows-select .md2-select-trigger{border-width:0;min-width:40px}"]
                }] }
    ];
    /** @nocollapse */
    Md2DataTableSortBy.ctorParameters = function () { return [
        { type: Md2DataTable }
    ]; };
    Md2DataTableSortBy.propDecorators = {
        md2SortBy: [{ type: Input }]
    };
    return Md2DataTableSortBy;
}());
export { Md2DataTableSortBy };
if (false) {
    /** @type {?} */
    Md2DataTableSortBy.prototype.md2SortBy;
    /** @type {?} */
    Md2DataTableSortBy.prototype._isAsc;
    /** @type {?} */
    Md2DataTableSortBy.prototype._isDesc;
    /** @type {?} */
    Md2DataTableSortBy.prototype._md2Table;
}
var Md2Pagination = /** @class */ (function () {
    function Md2Pagination(_dataTable) {
        var _this = this;
        this._dataTable = _dataTable;
        this._activePage = 1;
        this.rowsPerPageSet = [];
        this.paginationLabel = 'Rows per page:';
        this._dataLength = 0;
        this.onPageChangeSubscriber = function (event) {
            _this._activePage = event.activePage;
            _this._rowsPerPage = event.rowsPerPage;
            _this._dataLength = event.dataLength;
            _this._lastPage = Math.ceil(_this._dataLength / _this._rowsPerPage);
        };
    }
    /**
     * @return {?}
     */
    Md2Pagination.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        this.md2Table = this.md2Table || this._dataTable;
        this.onPageChangeSubscriber(this.md2Table.getPage());
        this.md2Table.onPageChange.subscribe(this.onPageChangeSubscriber);
    };
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    Md2Pagination.prototype._setPage = /**
     * @param {?} pageNumber
     * @return {?}
     */
    function (pageNumber) {
        this.md2Table.setPage(pageNumber, this._rowsPerPage);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2Pagination.prototype._setRows = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.md2Table.setPage(this._activePage, parseInt(event.value));
    };
    Md2Pagination.decorators = [
        { type: Component, args: [{
                    selector: 'md2-pagination',
                    template: "<ul class=\"md2-pagination\" *ngIf=\"_dataLength > _rowsPerPage\">\n  <li [class.disabled]=\"_activePage <= 1\" (click)=\"_setPage(_activePage - 1)\">\n    <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n      <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\" />\n    </svg>\n  </li>\n  <li *ngIf=\"_activePage > 4 && _activePage + 1 > _lastPage\" (click)=\"_setPage(_activePage - 4)\">\n    {{_activePage-4}}\n  </li>\n  <li *ngIf=\"_activePage > 3 && _activePage + 2 > _lastPage\" (click)=\"_setPage(_activePage - 3)\">\n    {{_activePage-3}}\n  </li>\n  <li *ngIf=\"_activePage > 2\" (click)=\"_setPage(_activePage - 2)\">\n    {{_activePage-2}}\n  </li>\n  <li *ngIf=\"_activePage > 1\" (click)=\"_setPage(_activePage - 1)\">\n    {{_activePage-1}}\n  </li>\n  <li class=\"active\">{{_activePage}}</li>\n  <li *ngIf=\"_activePage + 1 <= _lastPage\" (click)=\"_setPage(_activePage + 1)\">\n    {{_activePage+1}}\n  </li>\n  <li *ngIf=\"_activePage + 2 <= _lastPage\" (click)=\"_setPage(_activePage + 2)\">\n    {{_activePage+2}}\n  </li>\n  <li *ngIf=\"_activePage + 3 <= _lastPage && _activePage < 3\" (click)=\"_setPage(_activePage + 3)\">\n    {{_activePage+3}}\n  </li>\n  <li *ngIf=\"_activePage + 4 <= _lastPage && _activePage < 2\" (click)=\"_setPage(_activePage + 4)\">\n    {{_activePage+4}}\n  </li>\n  <li [class.disabled]=\"_activePage >= _lastPage\" (click)=\"_setPage(_activePage + 1)\">\n    <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n      <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\" />\n    </svg>\n  </li>\n</ul>\n<div class=\"md2-rows-select\" *ngIf=\"rowsPerPageSet.length && _dataLength > 0\">\n  <label>{{paginationLabel}}</label>\n  <md2-select [(ngModel)]=\"_rowsPerPage\" (change)=\"_setRows($event)\">\n    <md2-option *ngFor=\"let row of rowsPerPageSet\" [value]=\"row\">{{row}}</md2-option>\n  </md2-select>\n</div>\n",
                    exportAs: 'md2Pagination',
                    encapsulation: ViewEncapsulation.None,
                    styles: ["[md2SortBy]{line-height:24px;color:rgba(0,0,0,.54);white-space:nowrap;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[md2SortBy] svg{display:inline-block;vertical-align:middle;fill:currentColor;opacity:0}[md2SortBy]:hover:not(.md2-sort-active) svg{color:rgba(0,0,0,.26);opacity:1}[md2SortBy].md2-sort-active{color:rgba(0,0,0,.87)}[md2SortBy].md2-sort-active svg{opacity:1}md2-pagination{display:block;color:rgba(0,0,0,.54);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}md2-pagination::after,md2-pagination::before{display:table;content:''}md2-pagination::after{clear:both}md2-pagination .md2-pagination{display:inline-block;margin:8px 0;padding:0}md2-pagination .md2-pagination li{position:relative;display:inline-block;width:36px;vertical-align:top;text-align:center;line-height:36px;border-radius:100px;cursor:pointer;box-sizing:border-box}md2-pagination .md2-pagination li:hover:not(.disabled):not(.active){background:rgba(0,0,0,.12)}md2-pagination .md2-pagination li.disabled{pointer-events:none;background:0 0;cursor:default;opacity:.48}md2-pagination .md2-pagination li.active{background:#106cc8;color:#fff;cursor:default}md2-pagination .md2-pagination li svg{fill:currentColor;margin-bottom:-7px}md2-pagination .md2-rows-select{display:inline-block;margin:8px 0;padding:0;float:right;color:rgba(0,0,0,.54);line-height:36px}md2-pagination .md2-rows-select label{vertical-align:sub;margin-right:10px}md2-pagination .md2-rows-select md2-select{display:inline-block;border:0;outline:0}md2-pagination .md2-rows-select .md2-select-trigger{border-width:0;min-width:40px}"]
                }] }
    ];
    /** @nocollapse */
    Md2Pagination.ctorParameters = function () { return [
        { type: Md2DataTable, decorators: [{ type: Optional }] }
    ]; };
    Md2Pagination.propDecorators = {
        rowsPerPageSet: [{ type: Input }],
        md2Table: [{ type: Input }],
        paginationLabel: [{ type: Input }]
    };
    return Md2Pagination;
}());
export { Md2Pagination };
if (false) {
    /** @type {?} */
    Md2Pagination.prototype._activePage;
    /** @type {?} */
    Md2Pagination.prototype.rowsPerPageSet;
    /** @type {?} */
    Md2Pagination.prototype.md2Table;
    /** @type {?} */
    Md2Pagination.prototype.paginationLabel;
    /** @type {?} */
    Md2Pagination.prototype._rowsPerPage;
    /** @type {?} */
    Md2Pagination.prototype._dataLength;
    /** @type {?} */
    Md2Pagination.prototype._lastPage;
    /** @type {?} */
    Md2Pagination.prototype.onPageChangeSubscriber;
    /** @type {?} */
    Md2Pagination.prototype._dataTable;
}
/** @type {?} */
export var MD2_DATA_TABLE_DIRECTIVES = [
    Md2DataTable,
    Md2DataTableSortBy,
    Md2Pagination
];
var Md2DataTableModule = /** @class */ (function () {
    function Md2DataTableModule() {
    }
    Md2DataTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, Md2SelectModule],
                    exports: MD2_DATA_TABLE_DIRECTIVES,
                    declarations: MD2_DATA_TABLE_DIRECTIVES,
                },] }
    ];
    return Md2DataTableModule;
}());
export { Md2DataTableModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2RhdGEtdGFibGUvZGF0YS10YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFFUixlQUFlLEVBRWYsaUJBQWlCLEVBQ2pCLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVsRCxJQUFBOzs7OEJBbEJBO0lBcUJDLENBQUE7QUFIRCwrQkFHQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE4RkMsc0JBQW9CLE9BQXdCO1FBQXhCLFlBQU8sR0FBUCxPQUFPLENBQWlCOzZCQXRFcEIsS0FBSztxQkFDRCxFQUFFOzJCQUNBLENBQUM7NEJBQ0EsSUFBSTt1QkFDTyxFQUFFOzBCQUNmLEtBQUs7Z0NBeURMLElBQUksWUFBWSxFQUFVO2lDQUN6QixJQUFJLFlBQVksRUFBVTs0QkFDL0IsSUFBSSxZQUFZLEVBQXFCOytCQUNsQyxJQUFJLFlBQVksRUFBVTs0QkFFdkMsSUFBSSxZQUFZLEVBQWE7NEJBQzdCLElBQUksWUFBWSxFQUFhO1FBRzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0M7SUEvREQsc0JBQ0ksaUNBQU87Ozs7UUFEWCxjQUNnQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTs7Ozs7UUFDcEMsVUFBWSxLQUFpQjtZQUMzQixJQUFJLElB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LEdBQVU7SUFDOUMsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixhQUFhO0NBQ2QsQ0FBQzs7Ozs7Z0JBRUQsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDO29CQUNyRCxPQUFPLEVBQUUseUJBQXlCO29CQUNsQyxZQUFZLEVBQUUseUJBQXlCO2lCQUN4Qzs7NkJBNVREOztTQTZUYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBEb0NoZWNrLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIEl0ZXJhYmxlRGlmZmVyLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgTmdNb2R1bGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWQyU2VsZWN0TW9kdWxlIH0gZnJvbSAnLi4vc2VsZWN0L2luZGV4JztcblxuZXhwb3J0IGNsYXNzIE1kMlBhZ2luYXRpb25DaGFuZ2Uge1xuICBzb3VyY2U6IE1kMlBhZ2luYXRpb247XG4gIGFjdGl2ZVBhZ2U6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTb3J0RXZlbnQge1xuICBzb3J0Qnk6IHN0cmluZyB8IHN0cmluZ1tdO1xuICBzb3J0T3JkZXI6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWdlRXZlbnQge1xuICBhY3RpdmVQYWdlOiBudW1iZXI7XG4gIHJvd3NQZXJQYWdlOiBudW1iZXI7XG4gIGRhdGFMZW5ndGg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXRhRXZlbnQge1xuICBsZW5ndGg6IG51bWJlcjtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAndGFibGVbbWQyRGF0YV0nLFxuICBleHBvcnRBczogJ21kMkRhdGFUYWJsZSdcbn0pXG5leHBvcnQgY2xhc3MgTWQyRGF0YVRhYmxlIGltcGxlbWVudHMgRG9DaGVjayB7XG5cbiAgcHJpdmF0ZSBkaWZmOiBJdGVyYWJsZURpZmZlcjxhbnk+O1xuICBwcml2YXRlIGlzRGF0YUNoYW5nZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGF0YTogQXJyYXk8YW55PiA9IFtdO1xuICBwcml2YXRlIF9hY3RpdmVQYWdlOiBudW1iZXIgPSAxO1xuICBwcml2YXRlIF9yb3dzUGVyUGFnZTogbnVtYmVyID0gMTAwMDtcbiAgcHJpdmF0ZSBfc29ydEJ5OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+ID0gJyc7XG4gIHByaXZhdGUgX3NvcnRPcmRlcjogc3RyaW5nID0gJ2FzYyc7XG5cbiAgZGF0YTogQXJyYXk8YW55PjtcblxuICBASW5wdXQoKVxuICBnZXQgbWQyRGF0YSgpIHsgcmV0dXJuIHRoaXMuX2RhdGE7IH1cbiAgc2V0IG1kMkRhdGEodmFsdWU6IEFycmF5PGFueT4pIHtcbiAgICBpZiAodGhpcy5fZGF0YSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZSB8fCBbXTtcbiAgICAgIHRoaXMucmVjYWxjdWxhdGVQYWdlKCk7XG4gICAgICB0aGlzLmlzRGF0YUNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBhY3RpdmVQYWdlKCkgeyByZXR1cm4gdGhpcy5fYWN0aXZlUGFnZTsgfVxuICBzZXQgYWN0aXZlUGFnZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2FjdGl2ZVBhZ2UgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9hY3RpdmVQYWdlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IHJvd3NQZXJQYWdlKCkgeyByZXR1cm4gdGhpcy5fcm93c1BlclBhZ2U7IH1cbiAgc2V0IHJvd3NQZXJQYWdlKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fcm93c1BlclBhZ2UgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9yb3dzUGVyUGFnZSA9IHZhbHVlO1xuICAgICAgdGhpcy5zZXRQYWdlKHRoaXMuYWN0aXZlUGFnZSwgdmFsdWUpO1xuICAgICAgdGhpcy5pc0RhdGFDaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgc29ydEJ5KCkgeyByZXR1cm4gdGhpcy5fc29ydEJ5OyB9XG4gIHNldCBzb3J0QnkodmFsdWU6IHN0cmluZyB8IEFycmF5PHN0cmluZz4pIHtcbiAgICBpZiAodGhpcy5fc29ydEJ5ICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fc29ydEJ5ID0gdmFsdWU7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5vblNvcnRDaGFuZ2UubmV4dCh7IHNvcnRCeTogdGhpcy5zb3J0QnksIHNvcnRPcmRlcjogdGhpcy5zb3J0T3JkZXIgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLmlzRGF0YUNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBzb3J0T3JkZXIoKSB7IHJldHVybiB0aGlzLl9zb3J0T3JkZXI7IH1cbiAgc2V0IHNvcnRPcmRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKCEodmFsdWUgPT09ICdhc2MnIHx8IHZhbHVlID09PSAnZGVzYycpKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3NvcnRPcmRlciB2YWx1ZSBtdXN0IGJlIG9uZSBvZiBbXCJhc2NcIiwgXCJkZXNjXCJdLCBidXQgaXM6JywgdmFsdWUpO1xuICAgICAgdmFsdWUgPSAnYXNjJztcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NvcnRPcmRlciAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3NvcnRPcmRlciA9IHZhbHVlO1xuICAgICAgdGhpcy5pc0RhdGFDaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCkgYWN0aXZlUGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgcm93c1BlclBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHNvcnRCeUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgc3RyaW5nW10+KCk7XG4gIEBPdXRwdXQoKSBzb3J0T3JkZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBvblNvcnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFNvcnRFdmVudD4oKTtcbiAgb25QYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQYWdlRXZlbnQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpIHtcbiAgICB0aGlzLmRpZmYgPSBkaWZmZXJzLmZpbmQoW10pLmNyZWF0ZShudWxsKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiBhbnkge1xuICAgIGxldCBjaGFuZ2VzID0gdGhpcy5kaWZmLmRpZmYodGhpcy5tZDJEYXRhKTtcbiAgICBpZiAoY2hhbmdlcykge1xuICAgICAgdGhpcy5yZWNhbGN1bGF0ZVBhZ2UoKTtcbiAgICAgIHRoaXMuaXNEYXRhQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRGF0YUNoYW5nZWQpIHtcbiAgICAgIHRoaXMuZmlsbERhdGEoKTtcbiAgICAgIHRoaXMuZGlmZi5kaWZmKHRoaXMubWQyRGF0YSk7XG4gICAgICB0aGlzLmlzRGF0YUNoYW5nZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBnZXRTb3J0KCk6IFNvcnRFdmVudCB7XG4gICAgcmV0dXJuIHsgc29ydEJ5OiB0aGlzLnNvcnRCeSwgc29ydE9yZGVyOiB0aGlzLnNvcnRPcmRlciB9O1xuICB9XG5cbiAgc2V0U29ydChzb3J0Qnk6IHN0cmluZyB8IHN0cmluZ1tdLCBzb3J0T3JkZXI6IHN0cmluZykge1xuICAgIGlmICh0aGlzLnNvcnRCeSAhPT0gc29ydEJ5IHx8IHRoaXMuc29ydE9yZGVyICE9PSBzb3J0T3JkZXIpIHtcbiAgICAgIHRoaXMuc29ydEJ5ID0gc29ydEJ5O1xuICAgICAgdGhpcy5zb3J0T3JkZXIgPSBzb3J0T3JkZXI7XG4gICAgICB0aGlzLmlzRGF0YUNoYW5nZWQgPSB0cnVlO1xuICAgICAgdGhpcy5vblNvcnRDaGFuZ2UubmV4dCh7IHNvcnRCeTogc29ydEJ5LCBzb3J0T3JkZXI6IHNvcnRPcmRlciB9KTtcbiAgICAgIHRoaXMuc29ydEJ5Q2hhbmdlLmVtaXQodGhpcy5zb3J0QnkpO1xuICAgICAgdGhpcy5zb3J0T3JkZXJDaGFuZ2UuZW1pdCh0aGlzLnNvcnRPcmRlcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0UGFnZSgpOiBQYWdlRXZlbnQge1xuICAgIHJldHVybiB7XG4gICAgICBhY3RpdmVQYWdlOiB0aGlzLmFjdGl2ZVBhZ2UsXG4gICAgICByb3dzUGVyUGFnZTogdGhpcy5yb3dzUGVyUGFnZSxcbiAgICAgIGRhdGFMZW5ndGg6IHRoaXMubWQyRGF0YS5sZW5ndGhcbiAgICB9O1xuICB9XG5cbiAgc2V0UGFnZShhY3RpdmVQYWdlOiBudW1iZXIsIHJvd3NQZXJQYWdlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yb3dzUGVyUGFnZSAhPT0gcm93c1BlclBhZ2UgfHwgdGhpcy5hY3RpdmVQYWdlICE9PSBhY3RpdmVQYWdlKSB7XG4gICAgICB0aGlzLmFjdGl2ZVBhZ2UgPSB0aGlzLmFjdGl2ZVBhZ2UgIT09IGFjdGl2ZVBhZ2UgP1xuICAgICAgICBhY3RpdmVQYWdlIDogdGhpcy5jYWxjdWxhdGVOZXdBY3RpdmVQYWdlKHRoaXMucm93c1BlclBhZ2UsIHJvd3NQZXJQYWdlKTtcbiAgICAgIGlmICh0aGlzLnJvd3NQZXJQYWdlICE9PSByb3dzUGVyUGFnZSkge1xuICAgICAgICB0aGlzLl9yb3dzUGVyUGFnZSA9IHJvd3NQZXJQYWdlO1xuICAgICAgICB0aGlzLnJvd3NQZXJQYWdlQ2hhbmdlLmVtaXQodGhpcy5yb3dzUGVyUGFnZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmlzRGF0YUNoYW5nZWQgPSB0cnVlO1xuICAgICAgdGhpcy5vblBhZ2VDaGFuZ2UuZW1pdCh7XG4gICAgICAgIGFjdGl2ZVBhZ2U6IHRoaXMuYWN0aXZlUGFnZSxcbiAgICAgICAgcm93c1BlclBhZ2U6IHRoaXMucm93c1BlclBhZ2UsXG4gICAgICAgIGRhdGFMZW5ndGg6IHRoaXMubWQyRGF0YSA/IHRoaXMubWQyRGF0YS5sZW5ndGggOiAwXG4gICAgICB9KTtcbiAgICAgIHRoaXMuYWN0aXZlUGFnZUNoYW5nZS5lbWl0KHRoaXMuYWN0aXZlUGFnZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVOZXdBY3RpdmVQYWdlKHByZXZpb3VzUm93c1BlclBhZ2U6IG51bWJlciwgY3VycmVudFJvd3NQZXJQYWdlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCBmaXJzdFJvd09uUGFnZSA9ICh0aGlzLmFjdGl2ZVBhZ2UgLSAxKSAqIHByZXZpb3VzUm93c1BlclBhZ2UgKyAxO1xuICAgIGxldCBuZXdBY3RpdmVQYWdlID0gTWF0aC5jZWlsKGZpcnN0Um93T25QYWdlIC8gY3VycmVudFJvd3NQZXJQYWdlKTtcbiAgICByZXR1cm4gbmV3QWN0aXZlUGFnZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVjYWxjdWxhdGVQYWdlKCkge1xuICAgIGxldCBsYXN0UGFnZSA9IE1hdGguY2VpbCh0aGlzLm1kMkRhdGEubGVuZ3RoIC8gdGhpcy5yb3dzUGVyUGFnZSk7XG4gICAgaWYgKGxhc3RQYWdlIDwgdGhpcy5hY3RpdmVQYWdlKSB7XG4gICAgICB0aGlzLl9hY3RpdmVQYWdlID0gbGFzdFBhZ2UgfHwgMTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2ZVBhZ2VDaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZVBhZ2UpO1xuICAgICAgfSwgMTApO1xuICAgIH0gZWxzZSB7IH1cblxuICAgIHRoaXMub25QYWdlQ2hhbmdlLmVtaXQoe1xuICAgICAgYWN0aXZlUGFnZTogdGhpcy5hY3RpdmVQYWdlLFxuICAgICAgcm93c1BlclBhZ2U6IHRoaXMucm93c1BlclBhZ2UsXG4gICAgICBkYXRhTGVuZ3RoOiB0aGlzLm1kMkRhdGEubGVuZ3RoXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGZpbGxEYXRhKCkge1xuICAgIGxldCBvZmZzZXQgPSAodGhpcy5hY3RpdmVQYWdlIC0gMSkgKiB0aGlzLnJvd3NQZXJQYWdlO1xuICAgIGxldCBkYXRhID0gdGhpcy5tZDJEYXRhO1xuICAgIGxldCBzb3J0SW50ID0gdGhpcy5zb3J0T3JkZXIgPT09ICdkZXNjJyA/IC0xIDogMTtcbiAgICBpZiAodGhpcy5zb3J0QnkpIHtcbiAgICAgIGRhdGEgPSBkYXRhLnNvcnQoKGE6IGFueSwgYjogYW55KSA9PiB7XG4gICAgICAgIGxldCB4ID0gdGhpcy5jYXNlSW5zZW5zaXRpdmVJdGVyYXRlZShhKTtcbiAgICAgICAgbGV0IHkgPSB0aGlzLmNhc2VJbnNlbnNpdGl2ZUl0ZXJhdGVlKGIpO1xuICAgICAgICByZXR1cm4gKCh4ID4geSkgPyAxIDogKHkgPiB4KSA/IC0xIDogMCkgKiBzb3J0SW50O1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZGF0YSA9IGRhdGEuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0aGlzLnJvd3NQZXJQYWdlKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FzZUluc2Vuc2l0aXZlSXRlcmF0ZWUodmFsdWU6IGFueSkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5zb3J0QnkgPT09ICdzdHJpbmcnIHx8IHRoaXMuc29ydEJ5IGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICBmb3IgKGxldCBzb3J0QnlQcm9wZXJ0eSBvZiB0aGlzLnNvcnRCeS5zcGxpdCgnLicpKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVbc29ydEJ5UHJvcGVydHldO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlW3RoaXMuc29ydEJ5ICsgJyddO1xuICAgIH1cbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1ttZDJTb3J0QnldJyxcbiAgdGVtcGxhdGVVcmw6ICdzb3J0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZGF0YS10YWJsZS5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLm1kMi1zb3J0LWFjdGl2ZV0nOiAnX2lzQXNjIHx8IF9pc0Rlc2MnLFxuICAgICcoY2xpY2spJzogJ19zb3J0KCknXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTWQyRGF0YVRhYmxlU29ydEJ5IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBtZDJTb3J0Qnk6IHN0cmluZztcblxuICBfaXNBc2M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2lzRGVzYzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21kMlRhYmxlOiBNZDJEYXRhVGFibGUpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX21kMlRhYmxlLm9uU29ydENoYW5nZS5zdWJzY3JpYmUoKGV2ZW50OiBTb3J0RXZlbnQpID0+IHtcbiAgICAgIHRoaXMuX2lzQXNjID0gKGV2ZW50LnNvcnRCeSA9PT0gdGhpcy5tZDJTb3J0QnkgJiYgZXZlbnQuc29ydE9yZGVyID09PSAnYXNjJyk7XG4gICAgICB0aGlzLl9pc0Rlc2MgPSAoZXZlbnQuc29ydEJ5ID09PSB0aGlzLm1kMlNvcnRCeSAmJiBldmVudC5zb3J0T3JkZXIgPT09ICdkZXNjJyk7XG4gICAgfSk7XG4gIH1cblxuICBfc29ydCgpIHtcbiAgICBpZiAodGhpcy5faXNBc2MpIHtcbiAgICAgIHRoaXMuX21kMlRhYmxlLnNldFNvcnQodGhpcy5tZDJTb3J0QnksICdkZXNjJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX21kMlRhYmxlLnNldFNvcnQodGhpcy5tZDJTb3J0QnksICdhc2MnKTtcbiAgICB9XG4gIH1cblxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZDItcGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAncGFnaW5hdGlvbi5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2RhdGEtdGFibGUuc2NzcyddLFxuICBleHBvcnRBczogJ21kMlBhZ2luYXRpb24nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1kMlBhZ2luYXRpb24ge1xuXG4gIF9hY3RpdmVQYWdlOiBudW1iZXIgPSAxO1xuXG4gIEBJbnB1dCgpIHJvd3NQZXJQYWdlU2V0OiBhbnkgPSBbXTtcbiAgQElucHV0KCkgbWQyVGFibGU6IE1kMkRhdGFUYWJsZTtcbiAgQElucHV0KCkgcGFnaW5hdGlvbkxhYmVsOiBzdHJpbmcgPSAnUm93cyBwZXIgcGFnZTonO1xuXG4gIF9yb3dzUGVyUGFnZTogbnVtYmVyO1xuICBfZGF0YUxlbmd0aDogbnVtYmVyID0gMDtcbiAgX2xhc3RQYWdlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoIEBPcHRpb25hbCgpIHByaXZhdGUgX2RhdGFUYWJsZTogTWQyRGF0YVRhYmxlKSB7IH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgdGhpcy5tZDJUYWJsZSA9IHRoaXMubWQyVGFibGUgfHwgdGhpcy5fZGF0YVRhYmxlO1xuICAgIHRoaXMub25QYWdlQ2hhbmdlU3Vic2NyaWJlcih0aGlzLm1kMlRhYmxlLmdldFBhZ2UoKSk7XG4gICAgdGhpcy5tZDJUYWJsZS5vblBhZ2VDaGFuZ2Uuc3Vic2NyaWJlKHRoaXMub25QYWdlQ2hhbmdlU3Vic2NyaWJlcik7XG4gIH1cblxuICBfc2V0UGFnZShwYWdlTnVtYmVyOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm1kMlRhYmxlLnNldFBhZ2UocGFnZU51bWJlciwgdGhpcy5fcm93c1BlclBhZ2UpO1xuICB9XG5cbiAgX3NldFJvd3MoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubWQyVGFibGUuc2V0UGFnZSh0aGlzLl9hY3RpdmVQYWdlLCBwYXJzZUludChldmVudC52YWx1ZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblBhZ2VDaGFuZ2VTdWJzY3JpYmVyID0gKGV2ZW50OiBQYWdlRXZlbnQpID0+IHtcbiAgICB0aGlzLl9hY3RpdmVQYWdlID0gZXZlbnQuYWN0aXZlUGFnZTtcbiAgICB0aGlzLl9yb3dzUGVyUGFnZSA9IGV2ZW50LnJvd3NQZXJQYWdlO1xuICAgIHRoaXMuX2RhdGFMZW5ndGggPSBldmVudC5kYXRhTGVuZ3RoO1xuICAgIHRoaXMuX2xhc3RQYWdlID0gTWF0aC5jZWlsKHRoaXMuX2RhdGFMZW5ndGggLyB0aGlzLl9yb3dzUGVyUGFnZSk7XG4gIH1cblxufVxuXG5leHBvcnQgY29uc3QgTUQyX0RBVEFfVEFCTEVfRElSRUNUSVZFUzogYW55W10gPSBbXG4gIE1kMkRhdGFUYWJsZSxcbiAgTWQyRGF0YVRhYmxlU29ydEJ5LFxuICBNZDJQYWdpbmF0aW9uXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTWQyU2VsZWN0TW9kdWxlXSxcbiAgZXhwb3J0czogTUQyX0RBVEFfVEFCTEVfRElSRUNUSVZFUyxcbiAgZGVjbGFyYXRpb25zOiBNRDJfREFUQV9UQUJMRV9ESVJFQ1RJVkVTLFxufSlcbmV4cG9ydCBjbGFzcyBNZDJEYXRhVGFibGVNb2R1bGUgeyB9XG4iXX0=