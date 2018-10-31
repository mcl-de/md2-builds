/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * Class to be used to power selecting one or more options from a list.
 * \@docs-private
 * @template T
 */
var /**
 * Class to be used to power selecting one or more options from a list.
 * \@docs-private
 * @template T
 */
SelectionModel = /** @class */ (function () {
    function SelectionModel(_isMulti, initiallySelectedValues, _emitChanges) {
        if (_isMulti === void 0) { _isMulti = false; }
        if (_emitChanges === void 0) { _emitChanges = true; }
        var _this = this;
        this._isMulti = _isMulti;
        this._emitChanges = _emitChanges;
        /**
         * Currently-selected values.
         */
        this._selection = new Set();
        /**
         * Keeps track of the deselected options that haven't been emitted by the change event.
         */
        this._deselectedToEmit = [];
        /**
         * Keeps track of the selected option that haven't been emitted by the change event.
         */
        this._selectedToEmit = [];
        /**
         * Event emitted when the value has changed.
         */
        this.onChange = this._emitChanges ? new Subject() : null;
        if (initiallySelectedValues) {
            if (_isMulti) {
                initiallySelectedValues.forEach(function (value) { return _this._markSelected(value); });
            }
            else {
                this._markSelected(initiallySelectedValues[0]);
            }
            // Clear the array in order to avoid firing the change event for preselected values.
            this._selectedToEmit.length = 0;
        }
    }
    Object.defineProperty(SelectionModel.prototype, "selected", {
        /** Selected value(s). */
        get: /**
         * Selected value(s).
         * @return {?}
         */
        function () {
            if (!this._selected) {
                this._selected = Array.from(this._selection.values());
            }
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Selects a value or an array of values.
     */
    /**
     * Selects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype.select = /**
     * Selects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._markSelected(value);
        this._emitChangeEvent();
    };
    /**
     * Deselects a value or an array of values.
     */
    /**
     * Deselects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype.deselect = /**
     * Deselects a value or an array of values.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._unmarkSelected(value);
        this._emitChangeEvent();
    };
    /**
     * Toggles a value between selected and deselected.
     */
    /**
     * Toggles a value between selected and deselected.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype.toggle = /**
     * Toggles a value between selected and deselected.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.isSelected(value) ? this.deselect(value) : this.select(value);
    };
    /**
     * Clears all of the selected values.
     */
    /**
     * Clears all of the selected values.
     * @return {?}
     */
    SelectionModel.prototype.clear = /**
     * Clears all of the selected values.
     * @return {?}
     */
    function () {
        this._unmarkAll();
        this._emitChangeEvent();
    };
    /**
     * Determines whether a value is selected.
     */
    /**
     * Determines whether a value is selected.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype.isSelected = /**
     * Determines whether a value is selected.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this._selection.has(value);
    };
    /**
     * Determines whether the model does not have a value.
     */
    /**
     * Determines whether the model does not have a value.
     * @return {?}
     */
    SelectionModel.prototype.isEmpty = /**
     * Determines whether the model does not have a value.
     * @return {?}
     */
    function () {
        return this._selection.size === 0;
    };
    /**
     * Determines whether the model has a value.
     */
    /**
     * Determines whether the model has a value.
     * @return {?}
     */
    SelectionModel.prototype.hasValue = /**
     * Determines whether the model has a value.
     * @return {?}
     */
    function () {
        return !this.isEmpty();
    };
    /**
     * Sorts the selected values based on a predicate function.
     */
    /**
     * Sorts the selected values based on a predicate function.
     * @param {?=} predicate
     * @return {?}
     */
    SelectionModel.prototype.sort = /**
     * Sorts the selected values based on a predicate function.
     * @param {?=} predicate
     * @return {?}
     */
    function (predicate) {
        if (this._isMulti && this.selected) {
            this._selected.sort(predicate);
        }
    };
    /**
     * Emits a change event and clears the records of selected and deselected values.
     * @return {?}
     */
    SelectionModel.prototype._emitChangeEvent = /**
     * Emits a change event and clears the records of selected and deselected values.
     * @return {?}
     */
    function () {
        if (this._selectedToEmit.length || this._deselectedToEmit.length) {
            /** @type {?} */
            var eventData = new SelectionChange(this._selectedToEmit, this._deselectedToEmit);
            this.onChange.next(eventData);
            this._deselectedToEmit = [];
            this._selectedToEmit = [];
        }
        this._selected = null;
    };
    /**
     * Selects a value.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype._markSelected = /**
     * Selects a value.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.isSelected(value)) {
            if (!this._isMulti) {
                this._unmarkAll();
            }
            this._selection.add(value);
            if (this._emitChanges) {
                this._selectedToEmit.push(value);
            }
        }
    };
    /**
     * Deselects a value.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype._unmarkSelected = /**
     * Deselects a value.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isSelected(value)) {
            this._selection.delete(value);
            if (this._emitChanges) {
                this._deselectedToEmit.push(value);
            }
        }
    };
    /**
     * Clears out the selected values.
     * @return {?}
     */
    SelectionModel.prototype._unmarkAll = /**
     * Clears out the selected values.
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.isEmpty()) {
            this._selection.forEach(function (value) { return _this._unmarkSelected(value); });
        }
    };
    return SelectionModel;
}());
/**
 * Class to be used to power selecting one or more options from a list.
 * \@docs-private
 * @template T
 */
export { SelectionModel };
if (false) {
    /**
     * Currently-selected values.
     * @type {?}
     */
    SelectionModel.prototype._selection;
    /**
     * Keeps track of the deselected options that haven't been emitted by the change event.
     * @type {?}
     */
    SelectionModel.prototype._deselectedToEmit;
    /**
     * Keeps track of the selected option that haven't been emitted by the change event.
     * @type {?}
     */
    SelectionModel.prototype._selectedToEmit;
    /**
     * Cache for the array value of the selected items.
     * @type {?}
     */
    SelectionModel.prototype._selected;
    /**
     * Event emitted when the value has changed.
     * @type {?}
     */
    SelectionModel.prototype.onChange;
    /** @type {?} */
    SelectionModel.prototype._isMulti;
    /** @type {?} */
    SelectionModel.prototype._emitChanges;
}
/**
 * Describes an event emitted when the value of a MdSelectionModel has changed.
 * \@docs-private
 * @template T
 */
var /**
 * Describes an event emitted when the value of a MdSelectionModel has changed.
 * \@docs-private
 * @template T
 */
SelectionChange = /** @class */ (function () {
    function SelectionChange(added, removed) {
        this.added = added;
        this.removed = removed;
    }
    return SelectionChange;
}());
/**
 * Describes an event emitted when the value of a MdSelectionModel has changed.
 * \@docs-private
 * @template T
 */
export { SelectionChange };
if (false) {
    /** @type {?} */
    SelectionChange.prototype.added;
    /** @type {?} */
    SelectionChange.prototype.removed;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvY29yZS9zZWxlY3Rpb24vc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7Ozs7QUFPN0I7Ozs7O0FBQUE7SUF5QkUsd0JBQ1UsVUFDUix1QkFBNkIsRUFDckI7OztRQUhWLGlCQWVDO1FBZFMsYUFBUSxHQUFSLFFBQVE7UUFFUixpQkFBWSxHQUFaLFlBQVk7Ozs7MEJBMUJPLElBQUksR0FBRyxFQUFFOzs7O2lDQUdMLEVBQUU7Ozs7K0JBR0osRUFBRTs7Ozt3QkFlTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBTzlFLElBQUksdUJBQXVCLEVBQUU7WUFDM0IsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osdUJBQXVCLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO2FBQ3JFO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoRDs7WUFHRCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDakM7S0FDRjtJQTFCRCxzQkFBSSxvQ0FBUTtRQURaLHlCQUF5Qjs7Ozs7UUFDekI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUN2RDtZQUVELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN2Qjs7O09BQUE7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LENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BDO1NBQ0Y7Ozs7OztJQUlLLG1DQUFVOzs7Ozs7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQztTQUMvRDs7eUJBekpMO0lBMkpDLENBQUE7Ozs7OztBQXBKRCwwQkFvSkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNRDs7Ozs7QUFBQTtJQUNFLHlCQUFtQixLQUFXLEVBQVMsT0FBYTtRQUFqQyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBTTtLQUFLOzBCQWxLM0Q7SUFtS0MsQ0FBQTs7Ozs7O0FBRkQsMkJBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5cbi8qKlxuICogQ2xhc3MgdG8gYmUgdXNlZCB0byBwb3dlciBzZWxlY3Rpbmcgb25lIG9yIG1vcmUgb3B0aW9ucyBmcm9tIGEgbGlzdC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbk1vZGVsPFQ+IHtcbiAgLyoqIEN1cnJlbnRseS1zZWxlY3RlZCB2YWx1ZXMuICovXG4gIHByaXZhdGUgX3NlbGVjdGlvbjogU2V0PFQ+ID0gbmV3IFNldCgpO1xuXG4gIC8qKiBLZWVwcyB0cmFjayBvZiB0aGUgZGVzZWxlY3RlZCBvcHRpb25zIHRoYXQgaGF2ZW4ndCBiZWVuIGVtaXR0ZWQgYnkgdGhlIGNoYW5nZSBldmVudC4gKi9cbiAgcHJpdmF0ZSBfZGVzZWxlY3RlZFRvRW1pdDogVFtdID0gW107XG5cbiAgLyoqIEtlZXBzIHRyYWNrIG9mIHRoZSBzZWxlY3RlZCBvcHRpb24gdGhhdCBoYXZlbid0IGJlZW4gZW1pdHRlZCBieSB0aGUgY2hhbmdlIGV2ZW50LiAqL1xuICBwcml2YXRlIF9zZWxlY3RlZFRvRW1pdDogVFtdID0gW107XG5cbiAgLyoqIENhY2hlIGZvciB0aGUgYXJyYXkgdmFsdWUgb2YgdGhlIHNlbGVjdGVkIGl0ZW1zLiAqL1xuICBwcml2YXRlIF9zZWxlY3RlZDogVFtdO1xuXG4gIC8qKiBTZWxlY3RlZCB2YWx1ZShzKS4gKi9cbiAgZ2V0IHNlbGVjdGVkKCk6IFRbXSB7XG4gICAgaWYgKCF0aGlzLl9zZWxlY3RlZCkge1xuICAgICAgdGhpcy5fc2VsZWN0ZWQgPSBBcnJheS5mcm9tKHRoaXMuX3NlbGVjdGlvbi52YWx1ZXMoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICB9XG5cbiAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdmFsdWUgaGFzIGNoYW5nZWQuICovXG4gIG9uQ2hhbmdlOiBTdWJqZWN0PFNlbGVjdGlvbkNoYW5nZTxUPj4gPSB0aGlzLl9lbWl0Q2hhbmdlcyA/IG5ldyBTdWJqZWN0KCkgOiBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2lzTXVsdGkgPSBmYWxzZSxcbiAgICBpbml0aWFsbHlTZWxlY3RlZFZhbHVlcz86IFRbXSxcbiAgICBwcml2YXRlIF9lbWl0Q2hhbmdlcyA9IHRydWUpIHtcblxuICAgIGlmIChpbml0aWFsbHlTZWxlY3RlZFZhbHVlcykge1xuICAgICAgaWYgKF9pc011bHRpKSB7XG4gICAgICAgIGluaXRpYWxseVNlbGVjdGVkVmFsdWVzLmZvckVhY2godmFsdWUgPT4gdGhpcy5fbWFya1NlbGVjdGVkKHZhbHVlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9tYXJrU2VsZWN0ZWQoaW5pdGlhbGx5U2VsZWN0ZWRWYWx1ZXNbMF0pO1xuICAgICAgfVxuXG4gICAgICAvLyBDbGVhciB0aGUgYXJyYXkgaW4gb3JkZXIgdG8gYXZvaWQgZmlyaW5nIHRoZSBjaGFuZ2UgZXZlbnQgZm9yIHByZXNlbGVjdGVkIHZhbHVlcy5cbiAgICAgIHRoaXMuX3NlbGVjdGVkVG9FbWl0Lmxlbmd0aCA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdHMgYSB2YWx1ZSBvciBhbiBhcnJheSBvZiB2YWx1ZXMuXG4gICAqL1xuICBzZWxlY3QodmFsdWU6IFQpOiB2b2lkIHtcbiAgICB0aGlzLl9tYXJrU2VsZWN0ZWQodmFsdWUpO1xuICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlc2VsZWN0cyBhIHZhbHVlIG9yIGFuIGFycmF5IG9mIHZhbHVlcy5cbiAgICovXG4gIGRlc2VsZWN0KHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5fdW5tYXJrU2VsZWN0ZWQodmFsdWUpO1xuICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgYSB2YWx1ZSBiZXR3ZWVuIHNlbGVjdGVkIGFuZCBkZXNlbGVjdGVkLlxuICAgKi9cbiAgdG9nZ2xlKHZhbHVlOiBUKTogdm9pZCB7XG4gICAgdGhpcy5pc1NlbGVjdGVkKHZhbHVlKSA/IHRoaXMuZGVzZWxlY3QodmFsdWUpIDogdGhpcy5zZWxlY3QodmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgb2YgdGhlIHNlbGVjdGVkIHZhbHVlcy5cbiAgICovXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMuX3VubWFya0FsbCgpO1xuICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciBhIHZhbHVlIGlzIHNlbGVjdGVkLlxuICAgKi9cbiAgaXNTZWxlY3RlZCh2YWx1ZTogVCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb24uaGFzKHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIG1vZGVsIGRvZXMgbm90IGhhdmUgYSB2YWx1ZS5cbiAgICovXG4gIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbi5zaXplID09PSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciB0aGUgbW9kZWwgaGFzIGEgdmFsdWUuXG4gICAqL1xuICBoYXNWYWx1ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNFbXB0eSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNvcnRzIHRoZSBzZWxlY3RlZCB2YWx1ZXMgYmFzZWQgb24gYSBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gICAqL1xuICBzb3J0KHByZWRpY2F0ZT86IChhOiBULCBiOiBUKSA9PiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faXNNdWx0aSAmJiB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZC5zb3J0KHByZWRpY2F0ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEVtaXRzIGEgY2hhbmdlIGV2ZW50IGFuZCBjbGVhcnMgdGhlIHJlY29yZHMgb2Ygc2VsZWN0ZWQgYW5kIGRlc2VsZWN0ZWQgdmFsdWVzLiAqL1xuICBwcml2YXRlIF9lbWl0Q2hhbmdlRXZlbnQoKSB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGVkVG9FbWl0Lmxlbmd0aCB8fCB0aGlzLl9kZXNlbGVjdGVkVG9FbWl0Lmxlbmd0aCkge1xuICAgICAgbGV0IGV2ZW50RGF0YSA9IG5ldyBTZWxlY3Rpb25DaGFuZ2UodGhpcy5fc2VsZWN0ZWRUb0VtaXQsIHRoaXMuX2Rlc2VsZWN0ZWRUb0VtaXQpO1xuXG4gICAgICB0aGlzLm9uQ2hhbmdlLm5leHQoZXZlbnREYXRhKTtcbiAgICAgIHRoaXMuX2Rlc2VsZWN0ZWRUb0VtaXQgPSBbXTtcbiAgICAgIHRoaXMuX3NlbGVjdGVkVG9FbWl0ID0gW107XG4gICAgfVxuXG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBudWxsO1xuICB9XG5cbiAgLyoqIFNlbGVjdHMgYSB2YWx1ZS4gKi9cbiAgcHJpdmF0ZSBfbWFya1NlbGVjdGVkKHZhbHVlOiBUKSB7XG4gICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWQodmFsdWUpKSB7XG4gICAgICBpZiAoIXRoaXMuX2lzTXVsdGkpIHtcbiAgICAgICAgdGhpcy5fdW5tYXJrQWxsKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NlbGVjdGlvbi5hZGQodmFsdWUpO1xuXG4gICAgICBpZiAodGhpcy5fZW1pdENoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRUb0VtaXQucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIERlc2VsZWN0cyBhIHZhbHVlLiAqL1xuICBwcml2YXRlIF91bm1hcmtTZWxlY3RlZCh2YWx1ZTogVCkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQodmFsdWUpKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb24uZGVsZXRlKHZhbHVlKTtcblxuICAgICAgaWYgKHRoaXMuX2VtaXRDaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuX2Rlc2VsZWN0ZWRUb0VtaXQucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIENsZWFycyBvdXQgdGhlIHNlbGVjdGVkIHZhbHVlcy4gKi9cbiAgcHJpdmF0ZSBfdW5tYXJrQWxsKCkge1xuICAgIGlmICghdGhpcy5pc0VtcHR5KCkpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbi5mb3JFYWNoKHZhbHVlID0+IHRoaXMuX3VubWFya1NlbGVjdGVkKHZhbHVlKSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogRGVzY3JpYmVzIGFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgdmFsdWUgb2YgYSBNZFNlbGVjdGlvbk1vZGVsIGhhcyBjaGFuZ2VkLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uQ2hhbmdlPFQ+IHtcbiAgY29uc3RydWN0b3IocHVibGljIGFkZGVkPzogVFtdLCBwdWJsaWMgcmVtb3ZlZD86IFRbXSkgeyB9XG59XG4iXX0=