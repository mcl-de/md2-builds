/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Directive, EventEmitter, Input, Output, Optional, IterableDiffers, ViewEncapsulation, NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Md2SelectModule } from '../select/index';
export class Md2PaginationChange {
}
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
export class Md2DataTable {
    /**
     * @param {?} differs
     */
    constructor(differs) {
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
    /**
     * @return {?}
     */
    get md2Data() { return this._data; }
    /**
     * @param {?} value
     * @return {?}
     */
    set md2Data(value) {
        if (this._data !== value) {
            this._data = value || [];
            this.recalculatePage();
            this.isDataChanged = true;
        }
    }
    /**
     * @return {?}
     */
    get activePage() { return this._activePage; }
    /**
     * @param {?} value
     * @return {?}
     */
    set activePage(value) {
        if (this._activePage !== value) {
            this._activePage = value;
        }
    }
    /**
     * @return {?}
     */
    get rowsPerPage() { return this._rowsPerPage; }
    /**
     * @param {?} value
     * @return {?}
     */
    set rowsPerPage(value) {
        if (this._rowsPerPage !== value) {
            this._rowsPerPage = value;
            this.setPage(this.activePage, value);
            this.isDataChanged = true;
        }
    }
    /**
     * @return {?}
     */
    get sortBy() { return this._sortBy; }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortBy(value) {
        if (this._sortBy !== value) {
            this._sortBy = value;
            if (value) {
                this.onSortChange.next({ sortBy: this.sortBy, sortOrder: this.sortOrder });
            }
            this.isDataChanged = true;
        }
    }
    /**
     * @return {?}
     */
    get sortOrder() { return this._sortOrder; }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortOrder(value) {
        if (!(value === 'asc' || value === 'desc')) {
            console.warn('sortOrder value must be one of ["asc", "desc"], but is:', value);
            value = 'asc';
        }
        if (this._sortOrder !== value) {
            this._sortOrder = value;
            this.isDataChanged = true;
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        /** @type {?} */
        let changes = this.diff.diff(this.md2Data);
        if (changes) {
            this.recalculatePage();
            this.isDataChanged = true;
        }
        if (this.isDataChanged) {
            this.fillData();
            this.diff.diff(this.md2Data);
            this.isDataChanged = false;
        }
    }
    /**
     * @return {?}
     */
    getSort() {
        return { sortBy: this.sortBy, sortOrder: this.sortOrder };
    }
    /**
     * @param {?} sortBy
     * @param {?} sortOrder
     * @return {?}
     */
    setSort(sortBy, sortOrder) {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = sortOrder;
            this.isDataChanged = true;
            this.onSortChange.next({ sortBy: sortBy, sortOrder: sortOrder });
            this.sortByChange.emit(this.sortBy);
            this.sortOrderChange.emit(this.sortOrder);
        }
    }
    /**
     * @return {?}
     */
    getPage() {
        return {
            activePage: this.activePage,
            rowsPerPage: this.rowsPerPage,
            dataLength: this.md2Data.length
        };
    }
    /**
     * @param {?} activePage
     * @param {?} rowsPerPage
     * @return {?}
     */
    setPage(activePage, rowsPerPage) {
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
    }
    /**
     * @param {?} previousRowsPerPage
     * @param {?} currentRowsPerPage
     * @return {?}
     */
    calculateNewActivePage(previousRowsPerPage, currentRowsPerPage) {
        /** @type {?} */
        let firstRowOnPage = (this.activePage - 1) * previousRowsPerPage + 1;
        /** @type {?} */
        let newActivePage = Math.ceil(firstRowOnPage / currentRowsPerPage);
        return newActivePage;
    }
    /**
     * @return {?}
     */
    recalculatePage() {
        /** @type {?} */
        let lastPage = Math.ceil(this.md2Data.length / this.rowsPerPage);
        if (lastPage < this.activePage) {
            this._activePage = lastPage || 1;
            setTimeout(() => {
                this.activePageChange.emit(this.activePage);
            }, 10);
        }
        else { }
        this.onPageChange.emit({
            activePage: this.activePage,
            rowsPerPage: this.rowsPerPage,
            dataLength: this.md2Data.length
        });
    }
    /**
     * @return {?}
     */
    fillData() {
        /** @type {?} */
        let offset = (this.activePage - 1) * this.rowsPerPage;
        /** @type {?} */
        let data = this.md2Data;
        /** @type {?} */
        let sortInt = this.sortOrder === 'desc' ? -1 : 1;
        if (this.sortBy) {
            data = data.sort((a, b) => {
                /** @type {?} */
                let x = this.caseInsensitiveIteratee(a);
                /** @type {?} */
                let y = this.caseInsensitiveIteratee(b);
                return ((x > y) ? 1 : (y > x) ? -1 : 0) * sortInt;
            });
        }
        this.data = data.slice(offset, offset + this.rowsPerPage);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    caseInsensitiveIteratee(value) {
        if (typeof this.sortBy === 'string' || this.sortBy instanceof String) {
            for (let sortByProperty of this.sortBy.split('.')) {
                value = value[sortByProperty];
            }
        }
        else {
            value = value[this.sortBy + ''];
        }
        if (value && typeof value === 'string' || value instanceof String) {
            return value.toLowerCase();
        }
        return value;
    }
}
Md2DataTable.decorators = [
    { type: Directive, args: [{
                selector: 'table[md2Data]',
                exportAs: 'md2DataTable'
            },] }
];
/** @nocollapse */
Md2DataTable.ctorParameters = () => [
    { type: IterableDiffers }
];
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
export class Md2DataTableSortBy {
    /**
     * @param {?} _md2Table
     */
    constructor(_md2Table) {
        this._md2Table = _md2Table;
        this._isAsc = false;
        this._isDesc = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._md2Table.onSortChange.subscribe((event) => {
            this._isAsc = (event.sortBy === this.md2SortBy && event.sortOrder === 'asc');
            this._isDesc = (event.sortBy === this.md2SortBy && event.sortOrder === 'desc');
        });
    }
    /**
     * @return {?}
     */
    _sort() {
        if (this._isAsc) {
            this._md2Table.setSort(this.md2SortBy, 'desc');
        }
        else {
            this._md2Table.setSort(this.md2SortBy, 'asc');
        }
    }
}
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
Md2DataTableSortBy.ctorParameters = () => [
    { type: Md2DataTable }
];
Md2DataTableSortBy.propDecorators = {
    md2SortBy: [{ type: Input }]
};
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
export class Md2Pagination {
    /**
     * @param {?} _dataTable
     */
    constructor(_dataTable) {
        this._dataTable = _dataTable;
        this._activePage = 1;
        this.rowsPerPageSet = [];
        this.paginationLabel = 'Rows per page:';
        this._dataLength = 0;
        this.onPageChangeSubscriber = (event) => {
            this._activePage = event.activePage;
            this._rowsPerPage = event.rowsPerPage;
            this._dataLength = event.dataLength;
            this._lastPage = Math.ceil(this._dataLength / this._rowsPerPage);
        };
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        this.md2Table = this.md2Table || this._dataTable;
        this.onPageChangeSubscriber(this.md2Table.getPage());
        this.md2Table.onPageChange.subscribe(this.onPageChangeSubscriber);
    }
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    _setPage(pageNumber) {
        this.md2Table.setPage(pageNumber, this._rowsPerPage);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _setRows(event) {
        this.md2Table.setPage(this._activePage, parseInt(event.value));
    }
}
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
Md2Pagination.ctorParameters = () => [
    { type: Md2DataTable, decorators: [{ type: Optional }] }
];
Md2Pagination.propDecorators = {
    rowsPerPageSet: [{ type: Input }],
    md2Table: [{ type: Input }],
    paginationLabel: [{ type: Input }]
};
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
export const MD2_DATA_TABLE_DIRECTIVES = [
    Md2DataTable,
    Md2DataTableSortBy,
    Md2Pagination
];
export class Md2DataTableModule {
}
Md2DataTableModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule, Md2SelectModule],
                exports: MD2_DATA_TABLE_DIRECTIVES,
                declarations: MD2_DATA_TABLE_DIRECTIVES,
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS10YWJsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2RhdGEtdGFibGUvZGF0YS10YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBRU4sUUFBUSxFQUVSLGVBQWUsRUFFZixpQkFBaUIsRUFDakIsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWxELE1BQU07Q0FHTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCRCxNQUFNOzs7O0lBeUVKLFlBQW9CLE9BQXdCO1FBQXhCLFlBQU8sR0FBUCxPQUFPLENBQWlCOzZCQXRFcEIsS0FBSztxQkFDRCxFQUFFOzJCQUNBLENBQUM7NEJBQ0EsSUFBSTt1QkFDTyxFQUFFOzBCQUNmLEtBQUs7Z0NBeURMLElBQUksWUFBWSxFQUFVO2lDQUN6QixJQUFJLFlBQVksRUFBVTs0QkFDL0IsSUFBSSxZQUFZLEVBQXFCOytCQUNsQyxJQUFJLFlBQVksRUFBVTs0QkFFdkMsSUFBSSxZQUFZLEVBQWE7NEJBQzdCLElBQUksWUFBWSxFQUFhO1FBRzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0M7Ozs7SUEvREQsSUFDSSxPQUFPLEtBQUssT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Ozs7O0lBQ3BDLElBQUksT0FBTyxDQUFDLEtBQWlCO1FBQzNCLElBQUksSUFBSSxDQUFDLEtBQUss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RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgRG9DaGVjayxcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBJdGVyYWJsZURpZmZlcixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE5nTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1kMlNlbGVjdE1vZHVsZSB9IGZyb20gJy4uL3NlbGVjdC9pbmRleCc7XG5cbmV4cG9ydCBjbGFzcyBNZDJQYWdpbmF0aW9uQ2hhbmdlIHtcbiAgc291cmNlOiBNZDJQYWdpbmF0aW9uO1xuICBhY3RpdmVQYWdlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU29ydEV2ZW50IHtcbiAgc29ydEJ5OiBzdHJpbmcgfCBzdHJpbmdbXTtcbiAgc29ydE9yZGVyOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFnZUV2ZW50IHtcbiAgYWN0aXZlUGFnZTogbnVtYmVyO1xuICByb3dzUGVyUGFnZTogbnVtYmVyO1xuICBkYXRhTGVuZ3RoOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YUV2ZW50IHtcbiAgbGVuZ3RoOiBudW1iZXI7XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3RhYmxlW21kMkRhdGFdJyxcbiAgZXhwb3J0QXM6ICdtZDJEYXRhVGFibGUnXG59KVxuZXhwb3J0IGNsYXNzIE1kMkRhdGFUYWJsZSBpbXBsZW1lbnRzIERvQ2hlY2sge1xuXG4gIHByaXZhdGUgZGlmZjogSXRlcmFibGVEaWZmZXI8YW55PjtcbiAgcHJpdmF0ZSBpc0RhdGFDaGFuZ2VkID0gZmFsc2U7XG4gIHByaXZhdGUgX2RhdGE6IEFycmF5PGFueT4gPSBbXTtcbiAgcHJpdmF0ZSBfYWN0aXZlUGFnZTogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBfcm93c1BlclBhZ2U6IG51bWJlciA9IDEwMDA7XG4gIHByaXZhdGUgX3NvcnRCeTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiA9ICcnO1xuICBwcml2YXRlIF9zb3J0T3JkZXI6IHN0cmluZyA9ICdhc2MnO1xuXG4gIGRhdGE6IEFycmF5PGFueT47XG5cbiAgQElucHV0KClcbiAgZ2V0IG1kMkRhdGEoKSB7IHJldHVybiB0aGlzLl9kYXRhOyB9XG4gIHNldCBtZDJEYXRhKHZhbHVlOiBBcnJheTxhbnk+KSB7XG4gICAgaWYgKHRoaXMuX2RhdGEgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9kYXRhID0gdmFsdWUgfHwgW107XG4gICAgICB0aGlzLnJlY2FsY3VsYXRlUGFnZSgpO1xuICAgICAgdGhpcy5pc0RhdGFDaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgYWN0aXZlUGFnZSgpIHsgcmV0dXJuIHRoaXMuX2FjdGl2ZVBhZ2U7IH1cbiAgc2V0IGFjdGl2ZVBhZ2UodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9hY3RpdmVQYWdlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fYWN0aXZlUGFnZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCByb3dzUGVyUGFnZSgpIHsgcmV0dXJuIHRoaXMuX3Jvd3NQZXJQYWdlOyB9XG4gIHNldCByb3dzUGVyUGFnZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX3Jvd3NQZXJQYWdlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fcm93c1BlclBhZ2UgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0UGFnZSh0aGlzLmFjdGl2ZVBhZ2UsIHZhbHVlKTtcbiAgICAgIHRoaXMuaXNEYXRhQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IHNvcnRCeSgpIHsgcmV0dXJuIHRoaXMuX3NvcnRCeTsgfVxuICBzZXQgc29ydEJ5KHZhbHVlOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+KSB7XG4gICAgaWYgKHRoaXMuX3NvcnRCeSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3NvcnRCeSA9IHZhbHVlO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMub25Tb3J0Q2hhbmdlLm5leHQoeyBzb3J0Qnk6IHRoaXMuc29ydEJ5LCBzb3J0T3JkZXI6IHRoaXMuc29ydE9yZGVyIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5pc0RhdGFDaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBnZXQgc29ydE9yZGVyKCkgeyByZXR1cm4gdGhpcy5fc29ydE9yZGVyOyB9XG4gIHNldCBzb3J0T3JkZXIodmFsdWU6IHN0cmluZykge1xuICAgIGlmICghKHZhbHVlID09PSAnYXNjJyB8fCB2YWx1ZSA9PT0gJ2Rlc2MnKSkge1xuICAgICAgY29uc29sZS53YXJuKCdzb3J0T3JkZXIgdmFsdWUgbXVzdCBiZSBvbmUgb2YgW1wiYXNjXCIsIFwiZGVzY1wiXSwgYnV0IGlzOicsIHZhbHVlKTtcbiAgICAgIHZhbHVlID0gJ2FzYyc7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zb3J0T3JkZXIgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9zb3J0T3JkZXIgPSB2YWx1ZTtcbiAgICAgIHRoaXMuaXNEYXRhQ2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgpIGFjdGl2ZVBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHJvd3NQZXJQYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSBzb3J0QnlDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZyB8IHN0cmluZ1tdPigpO1xuICBAT3V0cHV0KCkgc29ydE9yZGVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgb25Tb3J0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxTb3J0RXZlbnQ+KCk7XG4gIG9uUGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8UGFnZUV2ZW50PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzKSB7XG4gICAgdGhpcy5kaWZmID0gZGlmZmVycy5maW5kKFtdKS5jcmVhdGUobnVsbCk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogYW55IHtcbiAgICBsZXQgY2hhbmdlcyA9IHRoaXMuZGlmZi5kaWZmKHRoaXMubWQyRGF0YSk7XG4gICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgIHRoaXMucmVjYWxjdWxhdGVQYWdlKCk7XG4gICAgICB0aGlzLmlzRGF0YUNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0RhdGFDaGFuZ2VkKSB7XG4gICAgICB0aGlzLmZpbGxEYXRhKCk7XG4gICAgICB0aGlzLmRpZmYuZGlmZih0aGlzLm1kMkRhdGEpO1xuICAgICAgdGhpcy5pc0RhdGFDaGFuZ2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ2V0U29ydCgpOiBTb3J0RXZlbnQge1xuICAgIHJldHVybiB7IHNvcnRCeTogdGhpcy5zb3J0QnksIHNvcnRPcmRlcjogdGhpcy5zb3J0T3JkZXIgfTtcbiAgfVxuXG4gIHNldFNvcnQoc29ydEJ5OiBzdHJpbmcgfCBzdHJpbmdbXSwgc29ydE9yZGVyOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5zb3J0QnkgIT09IHNvcnRCeSB8fCB0aGlzLnNvcnRPcmRlciAhPT0gc29ydE9yZGVyKSB7XG4gICAgICB0aGlzLnNvcnRCeSA9IHNvcnRCeTtcbiAgICAgIHRoaXMuc29ydE9yZGVyID0gc29ydE9yZGVyO1xuICAgICAgdGhpcy5pc0RhdGFDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMub25Tb3J0Q2hhbmdlLm5leHQoeyBzb3J0Qnk6IHNvcnRCeSwgc29ydE9yZGVyOiBzb3J0T3JkZXIgfSk7XG4gICAgICB0aGlzLnNvcnRCeUNoYW5nZS5lbWl0KHRoaXMuc29ydEJ5KTtcbiAgICAgIHRoaXMuc29ydE9yZGVyQ2hhbmdlLmVtaXQodGhpcy5zb3J0T3JkZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldFBhZ2UoKTogUGFnZUV2ZW50IHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aXZlUGFnZTogdGhpcy5hY3RpdmVQYWdlLFxuICAgICAgcm93c1BlclBhZ2U6IHRoaXMucm93c1BlclBhZ2UsXG4gICAgICBkYXRhTGVuZ3RoOiB0aGlzLm1kMkRhdGEubGVuZ3RoXG4gICAgfTtcbiAgfVxuXG4gIHNldFBhZ2UoYWN0aXZlUGFnZTogbnVtYmVyLCByb3dzUGVyUGFnZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucm93c1BlclBhZ2UgIT09IHJvd3NQZXJQYWdlIHx8IHRoaXMuYWN0aXZlUGFnZSAhPT0gYWN0aXZlUGFnZSkge1xuICAgICAgdGhpcy5hY3RpdmVQYWdlID0gdGhpcy5hY3RpdmVQYWdlICE9PSBhY3RpdmVQYWdlID9cbiAgICAgICAgYWN0aXZlUGFnZSA6IHRoaXMuY2FsY3VsYXRlTmV3QWN0aXZlUGFnZSh0aGlzLnJvd3NQZXJQYWdlLCByb3dzUGVyUGFnZSk7XG4gICAgICBpZiAodGhpcy5yb3dzUGVyUGFnZSAhPT0gcm93c1BlclBhZ2UpIHtcbiAgICAgICAgdGhpcy5fcm93c1BlclBhZ2UgPSByb3dzUGVyUGFnZTtcbiAgICAgICAgdGhpcy5yb3dzUGVyUGFnZUNoYW5nZS5lbWl0KHRoaXMucm93c1BlclBhZ2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5pc0RhdGFDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMub25QYWdlQ2hhbmdlLmVtaXQoe1xuICAgICAgICBhY3RpdmVQYWdlOiB0aGlzLmFjdGl2ZVBhZ2UsXG4gICAgICAgIHJvd3NQZXJQYWdlOiB0aGlzLnJvd3NQZXJQYWdlLFxuICAgICAgICBkYXRhTGVuZ3RoOiB0aGlzLm1kMkRhdGEgPyB0aGlzLm1kMkRhdGEubGVuZ3RoIDogMFxuICAgICAgfSk7XG4gICAgICB0aGlzLmFjdGl2ZVBhZ2VDaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZVBhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlTmV3QWN0aXZlUGFnZShwcmV2aW91c1Jvd3NQZXJQYWdlOiBudW1iZXIsIGN1cnJlbnRSb3dzUGVyUGFnZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBsZXQgZmlyc3RSb3dPblBhZ2UgPSAodGhpcy5hY3RpdmVQYWdlIC0gMSkgKiBwcmV2aW91c1Jvd3NQZXJQYWdlICsgMTtcbiAgICBsZXQgbmV3QWN0aXZlUGFnZSA9IE1hdGguY2VpbChmaXJzdFJvd09uUGFnZSAvIGN1cnJlbnRSb3dzUGVyUGFnZSk7XG4gICAgcmV0dXJuIG5ld0FjdGl2ZVBhZ2U7XG4gIH1cblxuICBwcml2YXRlIHJlY2FsY3VsYXRlUGFnZSgpIHtcbiAgICBsZXQgbGFzdFBhZ2UgPSBNYXRoLmNlaWwodGhpcy5tZDJEYXRhLmxlbmd0aCAvIHRoaXMucm93c1BlclBhZ2UpO1xuICAgIGlmIChsYXN0UGFnZSA8IHRoaXMuYWN0aXZlUGFnZSkge1xuICAgICAgdGhpcy5fYWN0aXZlUGFnZSA9IGxhc3RQYWdlIHx8IDE7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmVQYWdlQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmVQYWdlKTtcbiAgICAgIH0sIDEwKTtcbiAgICB9IGVsc2UgeyB9XG5cbiAgICB0aGlzLm9uUGFnZUNoYW5nZS5lbWl0KHtcbiAgICAgIGFjdGl2ZVBhZ2U6IHRoaXMuYWN0aXZlUGFnZSxcbiAgICAgIHJvd3NQZXJQYWdlOiB0aGlzLnJvd3NQZXJQYWdlLFxuICAgICAgZGF0YUxlbmd0aDogdGhpcy5tZDJEYXRhLmxlbmd0aFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmaWxsRGF0YSgpIHtcbiAgICBsZXQgb2Zmc2V0ID0gKHRoaXMuYWN0aXZlUGFnZSAtIDEpICogdGhpcy5yb3dzUGVyUGFnZTtcbiAgICBsZXQgZGF0YSA9IHRoaXMubWQyRGF0YTtcbiAgICBsZXQgc29ydEludCA9IHRoaXMuc29ydE9yZGVyID09PSAnZGVzYycgPyAtMSA6IDE7XG4gICAgaWYgKHRoaXMuc29ydEJ5KSB7XG4gICAgICBkYXRhID0gZGF0YS5zb3J0KChhOiBhbnksIGI6IGFueSkgPT4ge1xuICAgICAgICBsZXQgeCA9IHRoaXMuY2FzZUluc2Vuc2l0aXZlSXRlcmF0ZWUoYSk7XG4gICAgICAgIGxldCB5ID0gdGhpcy5jYXNlSW5zZW5zaXRpdmVJdGVyYXRlZShiKTtcbiAgICAgICAgcmV0dXJuICgoeCA+IHkpID8gMSA6ICh5ID4geCkgPyAtMSA6IDApICogc29ydEludDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmRhdGEgPSBkYXRhLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdGhpcy5yb3dzUGVyUGFnZSk7XG4gIH1cblxuICBwcml2YXRlIGNhc2VJbnNlbnNpdGl2ZUl0ZXJhdGVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuc29ydEJ5ID09PSAnc3RyaW5nJyB8fCB0aGlzLnNvcnRCeSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgZm9yIChsZXQgc29ydEJ5UHJvcGVydHkgb2YgdGhpcy5zb3J0Qnkuc3BsaXQoJy4nKSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlW3NvcnRCeVByb3BlcnR5XTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSB2YWx1ZVt0aGlzLnNvcnRCeSArICcnXTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbbWQyU29ydEJ5XScsXG4gIHRlbXBsYXRlVXJsOiAnc29ydC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2RhdGEtdGFibGUuc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5tZDItc29ydC1hY3RpdmVdJzogJ19pc0FzYyB8fCBfaXNEZXNjJyxcbiAgICAnKGNsaWNrKSc6ICdfc29ydCgpJ1xuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE1kMkRhdGFUYWJsZVNvcnRCeSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgbWQyU29ydEJ5OiBzdHJpbmc7XG5cbiAgX2lzQXNjOiBib29sZWFuID0gZmFsc2U7XG4gIF9pc0Rlc2M6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZDJUYWJsZTogTWQyRGF0YVRhYmxlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9tZDJUYWJsZS5vblNvcnRDaGFuZ2Uuc3Vic2NyaWJlKChldmVudDogU29ydEV2ZW50KSA9PiB7XG4gICAgICB0aGlzLl9pc0FzYyA9IChldmVudC5zb3J0QnkgPT09IHRoaXMubWQyU29ydEJ5ICYmIGV2ZW50LnNvcnRPcmRlciA9PT0gJ2FzYycpO1xuICAgICAgdGhpcy5faXNEZXNjID0gKGV2ZW50LnNvcnRCeSA9PT0gdGhpcy5tZDJTb3J0QnkgJiYgZXZlbnQuc29ydE9yZGVyID09PSAnZGVzYycpO1xuICAgIH0pO1xuICB9XG5cbiAgX3NvcnQoKSB7XG4gICAgaWYgKHRoaXMuX2lzQXNjKSB7XG4gICAgICB0aGlzLl9tZDJUYWJsZS5zZXRTb3J0KHRoaXMubWQyU29ydEJ5LCAnZGVzYycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tZDJUYWJsZS5zZXRTb3J0KHRoaXMubWQyU29ydEJ5LCAnYXNjJyk7XG4gICAgfVxuICB9XG5cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWQyLXBhZ2luYXRpb24nLFxuICB0ZW1wbGF0ZVVybDogJ3BhZ2luYXRpb24uaHRtbCcsXG4gIHN0eWxlVXJsczogWydkYXRhLXRhYmxlLnNjc3MnXSxcbiAgZXhwb3J0QXM6ICdtZDJQYWdpbmF0aW9uJyxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNZDJQYWdpbmF0aW9uIHtcblxuICBfYWN0aXZlUGFnZTogbnVtYmVyID0gMTtcblxuICBASW5wdXQoKSByb3dzUGVyUGFnZVNldDogYW55ID0gW107XG4gIEBJbnB1dCgpIG1kMlRhYmxlOiBNZDJEYXRhVGFibGU7XG4gIEBJbnB1dCgpIHBhZ2luYXRpb25MYWJlbDogc3RyaW5nID0gJ1Jvd3MgcGVyIHBhZ2U6JztcblxuICBfcm93c1BlclBhZ2U6IG51bWJlcjtcbiAgX2RhdGFMZW5ndGg6IG51bWJlciA9IDA7XG4gIF9sYXN0UGFnZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRhVGFibGU6IE1kMkRhdGFUYWJsZSkgeyB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIHRoaXMubWQyVGFibGUgPSB0aGlzLm1kMlRhYmxlIHx8IHRoaXMuX2RhdGFUYWJsZTtcbiAgICB0aGlzLm9uUGFnZUNoYW5nZVN1YnNjcmliZXIodGhpcy5tZDJUYWJsZS5nZXRQYWdlKCkpO1xuICAgIHRoaXMubWQyVGFibGUub25QYWdlQ2hhbmdlLnN1YnNjcmliZSh0aGlzLm9uUGFnZUNoYW5nZVN1YnNjcmliZXIpO1xuICB9XG5cbiAgX3NldFBhZ2UocGFnZU51bWJlcjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5tZDJUYWJsZS5zZXRQYWdlKHBhZ2VOdW1iZXIsIHRoaXMuX3Jvd3NQZXJQYWdlKTtcbiAgfVxuXG4gIF9zZXRSb3dzKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm1kMlRhYmxlLnNldFBhZ2UodGhpcy5fYWN0aXZlUGFnZSwgcGFyc2VJbnQoZXZlbnQudmFsdWUpKTtcbiAgfVxuXG4gIHByaXZhdGUgb25QYWdlQ2hhbmdlU3Vic2NyaWJlciA9IChldmVudDogUGFnZUV2ZW50KSA9PiB7XG4gICAgdGhpcy5fYWN0aXZlUGFnZSA9IGV2ZW50LmFjdGl2ZVBhZ2U7XG4gICAgdGhpcy5fcm93c1BlclBhZ2UgPSBldmVudC5yb3dzUGVyUGFnZTtcbiAgICB0aGlzLl9kYXRhTGVuZ3RoID0gZXZlbnQuZGF0YUxlbmd0aDtcbiAgICB0aGlzLl9sYXN0UGFnZSA9IE1hdGguY2VpbCh0aGlzLl9kYXRhTGVuZ3RoIC8gdGhpcy5fcm93c1BlclBhZ2UpO1xuICB9XG5cbn1cblxuZXhwb3J0IGNvbnN0IE1EMl9EQVRBX1RBQkxFX0RJUkVDVElWRVM6IGFueVtdID0gW1xuICBNZDJEYXRhVGFibGUsXG4gIE1kMkRhdGFUYWJsZVNvcnRCeSxcbiAgTWQyUGFnaW5hdGlvblxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE1kMlNlbGVjdE1vZHVsZV0sXG4gIGV4cG9ydHM6IE1EMl9EQVRBX1RBQkxFX0RJUkVDVElWRVMsXG4gIGRlY2xhcmF0aW9uczogTUQyX0RBVEFfVEFCTEVfRElSRUNUSVZFUyxcbn0pXG5leHBvcnQgY2xhc3MgTWQyRGF0YVRhYmxlTW9kdWxlIHsgfVxuIl19