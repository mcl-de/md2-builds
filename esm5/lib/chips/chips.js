/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, Output, ViewChild, NgModule, ElementRef, EventEmitter, HostListener, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Md2AutocompleteModule } from '../autocomplete/index';
import { ENTER, SPACE, BACKSPACE, DELETE, COMMA, LEFT_ARROW, RIGHT_ARROW } from '../core/keyboard/keycodes';
var Chip = /** @class */ (function () {
    function Chip(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Chip;
}());
export { Chip };
if (false) {
    /** @type {?} */
    Chip.prototype.text;
    /** @type {?} */
    Chip.prototype.value;
}
/** @type {?} */
var nextId = 0;
/** @type {?} */
export var MD2_CHIPS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Chips; }),
    multi: true
};
/**
 * Change event object emitted by Md2Chips.
 */
var /**
 * Change event object emitted by Md2Chips.
 */
Md2ChipsChange = /** @class */ (function () {
    function Md2ChipsChange() {
    }
    return Md2ChipsChange;
}());
/**
 * Change event object emitted by Md2Chips.
 */
export { Md2ChipsChange };
if (false) {
    /** @type {?} */
    Md2ChipsChange.prototype.source;
    /** @type {?} */
    Md2ChipsChange.prototype.value;
}
var Md2Chips = /** @class */ (function () {
    function Md2Chips(elementRef) {
        this.elementRef = elementRef;
        this.tabindex = 0;
        this.addOnComma = true;
        this.addOnEnter = true;
        this.addOnPaste = true;
        this.addOnSpace = false;
        this.allowedPattern = /.+/;
        this.pasteSplitPattern = ',';
        this.placeholder = '';
        this.isAutoComplete = false;
        this.isRemovable = true;
        this.disabled = false;
        this.minChips = 0;
        this.maxChips = 10000;
        this.type = 'text';
        this.id = 'md2-chips-' + (++nextId);
        this.autocompleteItemText = 'text';
        this.autocompleteItemValue = 'value';
        this.textKey = 'text';
        this.valueKey = null;
        this.change = new EventEmitter();
        this._onChange = function () { };
        this._onTouched = function () { };
        this.chipItemList = [];
        this.inputValue = '';
        this.selectedChip = -1;
        this.inputFocused = false;
        this.autoCompleteFocued = false;
        this._value = '';
        this.isEmptyAutoComplete = true;
    }
    Object.defineProperty(Md2Chips.prototype, "element", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var elements = { root: this.elementRef.nativeElement, mainDiv: null, template: null };
            elements.mainDiv = elements.root.querySelector('.md2-chips-container');
            elements.template = elements.mainDiv.querySelector('.md2-template');
            return elements;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Chips.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this._value; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.setValue(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Chips.prototype, "setValue", {
        /**
         * set value
         * @param value
         */
        set: /**
         * set value
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._value) {
                this._value = value;
                this.chipItemList = [];
                if (value) {
                    if (value && value.length && Array.isArray(value)) {
                        for (var i = 0; i < value.length; i++) {
                            this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
                        }
                    }
                }
            }
            this._emitChangeEvent();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    Md2Chips.prototype.getFocusAutocomplete = /**
     * @return {?}
     */
    function () {
        this._onTouched();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2Chips.prototype.changeAutocomplete = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value) {
            this.addNewChip(value.value);
            this.item = null;
        }
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var elements = this.element;
        this.splitRegExp = new RegExp(this.pasteSplitPattern);
        if (elements.template) {
            this.templateHtmlString = elements.template.innerHTML;
        }
    };
    // check autocomplete input is empty or not
    /**
     * @param {?} evt
     * @return {?}
     */
    Md2Chips.prototype.valueupdate = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        this.isEmptyAutoComplete = evt ? false : true;
    };
    /**
     * input key listener
     * @param event
     */
    /**
     * input key listener
     * @param {?} event
     * @return {?}
     */
    Md2Chips.prototype.inputChanged = /**
     * input key listener
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var key = event.keyCode;
        switch (key) {
            // back space
            case BACKSPACE:
                this.backspaceEvent();
                break;
            // delete
            case DELETE:
                this.backspaceEvent();
                break;
            // left arrow
            case LEFT_ARROW:
                if (this.isAutoComplete && this.isEmptyAutoComplete) {
                    this.leftArrowKeyEvents();
                }
                else if (!this.isAutoComplete && !this.inputValue) {
                    this.leftArrowKeyEvents();
                }
                break;
            // right arrow
            case RIGHT_ARROW:
                if (this.isAutoComplete && this.isEmptyAutoComplete) {
                    this.rightArrowKeyEvents();
                }
                else if (!this.isAutoComplete && !this.inputValue) {
                    this.rightArrowKeyEvents();
                }
                break;
            // enter
            case ENTER:
                if (this.addOnEnter) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            // comma
            case COMMA:
                if (this.addOnComma) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            // space
            case SPACE:
                if (this.addOnSpace) {
                    this.addNewChip(this.inputValue);
                    event.preventDefault();
                }
                break;
            default:
                break;
        }
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        if (!this.isAutoComplete) {
            this.elementRef.nativeElement.querySelector('input.chip-input').focus();
        }
        else {
            this.autoCompleteFocued = true;
            this._onTouched();
        }
        this._resetSelected();
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype.inputBlurred = /**
     * @return {?}
     */
    function () {
        this.inputFocused = false;
        if (this.inputValue) {
            this.addNewChip(this.inputValue);
        }
        this._onTouched();
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype.inputFocus = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        this.inputFocused = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2Chips.prototype.inputPaste = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var clipboardData = event.clipboardData ||
            (event.originalEvent && event.originalEvent.clipboardData);
        /** @type {?} */
        var pastedString = clipboardData.getData('text/plain').trim();
        this.addNewChip(pastedString);
        setTimeout(function () { return _this._resetInput(); });
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype.leftArrowKeyEvents = /**
     * @return {?}
     */
    function () {
        event.preventDefault();
        if (this.selectedChip) {
            if (this.selectedChip < 0) {
                this.selectedChip = this.chipItemList.length - 1;
            }
            else {
                this.selectedChip = this.selectedChip - 1;
            }
        }
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype.rightArrowKeyEvents = /**
     * @return {?}
     */
    function () {
        event.preventDefault();
        if (this.selectedChip != -1) {
            if (this.selectedChip >= this.chipItemList.length) {
                this.selectedChip = 0;
            }
            else {
                this.selectedChip = this.selectedChip + 1;
            }
        }
    };
    /**
     * @param {?} chipString
     * @return {?}
     */
    Md2Chips.prototype._isValid = /**
     * @param {?} chipString
     * @return {?}
     */
    function (chipString) {
        /** @type {?} */
        var typeString = typeof chipString;
        /** @type {?} */
        var isExist;
        if (typeString === 'string') {
            chipString = chipString.trim();
            isExist = this.chipItemList.filter(function (chip) { return chip.text === chipString; });
        }
        else {
            isExist = this.chipItemList.filter(function (chip) { return chip.text === chipString.text; });
        }
        if (this.chipItemList.indexOf(chipString) === -1 && (isExist.length ? false : true)) {
            return this.allowedPattern.test(chipString);
        }
    };
    /**
     * add new chip
     * @param {?} chips
     * @return {?}
     */
    Md2Chips.prototype.addNewChip = /**
     * add new chip
     * @param {?} chips
     * @return {?}
     */
    function (chips) {
        /** @type {?} */
        var validInput = this._isValid(chips);
        if (validInput) {
            if (this.maxChips && this.maxChips < this.chipItemList.length - 1) {
                return;
            }
            else {
                this.chipItemList.push(new Chip(chips, this.autocompleteItemText, this.autocompleteItemValue));
                this.item = null;
            }
        }
        this._resetSelected();
        this._resetInput();
        this.updateValue();
    };
    /**
   * remove selected chip
   * @param chipIndexToRemove index of selected chip
   */
    /**
     * remove selected chip
     * @param {?} chipIndexToRemove index of selected chip
     * @return {?}
     */
    Md2Chips.prototype.removeSelectedChip = /**
     * remove selected chip
     * @param {?} chipIndexToRemove index of selected chip
     * @return {?}
     */
    function (chipIndexToRemove) {
        this.chipItemList.splice(chipIndexToRemove, 1);
        this._resetSelected();
        this.updateValue();
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype.backspaceEvent = /**
     * @return {?}
     */
    function () {
        if (!this.inputValue.length && this.chipItemList.length &&
            this.isRemovable && this.isEmptyAutoComplete) {
            if (this.selectedChip != -1) {
                this.removeSelectedChip(this.selectedChip);
                this.selectedChip = this.chipItemList.length - 1;
            }
            else {
                this.selectedChip = this.chipItemList.length - 1;
            }
        }
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype._resetSelected = /**
     * @return {?}
     */
    function () {
        this.selectedChip = -1;
    };
    /**
     * @return {?}
     */
    Md2Chips.prototype._resetInput = /**
     * @return {?}
     */
    function () {
        if (this.isAutoComplete) {
            this.chipInputForm.controls['autocomplete'].setValue('');
        }
        else {
            this.chipInputForm.controls['chipInput'].setValue('');
        }
    };
    /**
     * update value
     * @return {?}
     */
    Md2Chips.prototype.updateValue = /**
     * update value
     * @return {?}
     */
    function () {
        var _this = this;
        this._value = new Array();
        this._value = this.chipItemList.map(function (chip) {
            if (_this.valueKey) {
                /** @type {?} */
                var c = {};
                c[_this.textKey] = chip.text;
                c[_this.valueKey] = chip.value;
                return c;
            }
            else {
                return chip.value;
            }
        });
        this._emitChangeEvent();
    };
    /** Emits an event when the user selects a color. */
    /**
     * Emits an event when the user selects a color.
     * @return {?}
     */
    Md2Chips.prototype._emitChangeEvent = /**
     * Emits an event when the user selects a color.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var event = new Md2ChipsChange();
        event.source = this;
        event.value = this._value;
        this._onChange(event.value);
        this.change.emit(event);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2Chips.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this._value) {
            this._value = value;
            this.chipItemList = [];
            if (value) {
                if (value && value.length && Array.isArray(value)) {
                    for (var i = 0; i < value.length; i++) {
                        this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
                    }
                }
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Chips.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Chips.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouched = fn; };
    Md2Chips.decorators = [
        { type: Component, args: [{
                    selector: 'md2-chips',
                    template: "<div class=\"md2-chips-container\" [class.md2-chip-disabled]=\"disabled\" [class.md2-chip-remove]=\"!isRemovable\">\n  <span *ngFor=\"let chip of chipItemList; let i = index\" class=\"md2-chip\" [class.active]=\"selectedChip === i\">\n    <span>{{chip.text}}</span>\n    <span [innerHTML]=\"templateHtmlString\"></span>\n    <svg (click)=\"removeSelectedChip(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" *ngIf=\"isRemovable\">\n      <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n    </svg>\n  </span>\n  <ng-content select=\".md2-template\"></ng-content>\n  <form #chipInputForm=\"ngForm\" class=\"chip-input-form\">\n    <input *ngIf=\"!isAutoComplete\" class=\"chip-input\" [disabled]=\"disabled\" [type]=\"type\" [(ngModel)]=\"inputValue\" name=\"chipInput\" [placeholder]=\"placeholder\" (paste)=\"inputPaste($event)\" (keydown)=\"inputChanged($event)\" (blur)=\"inputBlurred()\" (focus)=\"inputFocus()\" />\n    <div *ngIf=\"isAutoComplete\">\n      <md2-autocomplete name=\"autocomplete\"\n                        [placeholder]=\"placeholder\"\n                        [disabled]=\"disabled\"\n                        [(ngModel)]=\"item\"\n                        [items]=\"autocompleteDataList\"\n                        [item-text]=\"autocompleteItemText\"\n                        (textChange)=\"valueupdate($event)\"\n                        (change)=\"changeAutocomplete($event)\"\n                        (keydown)=\"inputChanged($event)\"\n                        (click)=\"getFocusAutocomplete()\">\n      </md2-autocomplete>\n    </div>\n  </form>\n</div>\n<div class=\"chip-error\" *ngIf=\"this.chipItemList.length<this.minChips\">Minimum {{minChips}} chip required.</div>\n<div class=\"chip-error\" *ngIf=\"this.chipItemList.length>=this.maxChips\">You are able to add Maximum {{maxChips}} chip.</div>\n",
                    providers: [MD2_CHIPS_CONTROL_VALUE_ACCESSOR],
                    host: {
                        'role': 'chips',
                        '[id]': 'id',
                        '[tabindex]': 'disabled ? -1 : tabindex',
                        '[class.chip-input-focus]': 'inputFocused || selectedChip >= 0',
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: [".template-content{display:inline}md2-chips{outline:0}md2-chips .md2-chips-container{display:block;box-shadow:0 1px #ccc;padding:5px 0;margin-bottom:10px;min-height:50px;box-sizing:border-box;clear:both}md2-chips .md2-chips-container::after{clear:both;content:'';display:table}md2-chips.chip-input-focus .md2-chips-container{box-shadow:0 2px #0d8bff}md2-chips .md2-chip-disabled{cursor:default}md2-chips md2-autocomplete{margin:0}md2-chips .md2-autocomplete-wrap{border-bottom:0!important}.md2-chip-remove .md2-chip{padding:0 12px}.md2-chip{font-size:14px;position:relative;cursor:default;border-radius:16px;display:block;height:32px;line-height:32px;margin:8px 8px 0 0;padding:0 28px 0 12px;float:left;box-sizing:border-box;max-width:100%;background:#e0e0e0;color:#424242;white-space:nowrap;overflow:hidden;-ms-text-overflow:ellipsis;text-overflow:ellipsis}.md2-chip.active{color:#fff;background:#0d8bff}.md2-chip.active svg{color:rgba(255,255,255,.87)}.md2-chip svg{position:absolute;top:4px;right:4px;cursor:pointer;display:inline-block;overflow:hidden;fill:currentColor;color:rgba(0,0,0,.54)}.md2-template{display:none}.chip-input-disabled{pointer-events:none;cursor:default}.chip-input-form{display:inline-block;height:32px;margin:8px 8px 0 0}.chip-remove{cursor:pointer;display:inline-block;padding:0 3px;color:#616161;font-size:30px;vertical-align:top;line-height:21px;font-family:serif}.chip-input{display:inline-block;width:auto;border:0;outline:0;height:32px;line-height:32px;font-size:16px;background:0 0}.chip-error{font-size:13px;color:#fd0f0f}.md2-chips-container .chip-input-form .md2-autocomplete-wrap{border-bottom:0}.md2-chips-container .md2-autocomplete-wrap .md2-autocomplete-placeholder.has-value,.md2-chips-container .md2-autocomplete-wrap svg,.md2-chips-container .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder{display:none}.md2-chips-container .md2-autocomplete-wrap .md2-autocomplete-input{height:32px;font-size:16px}"]
                }] }
    ];
    /** @nocollapse */
    Md2Chips.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    Md2Chips.propDecorators = {
        tabindex: [{ type: Input }],
        addOnComma: [{ type: Input }],
        addOnEnter: [{ type: Input }],
        addOnPaste: [{ type: Input }],
        addOnSpace: [{ type: Input }],
        allowedPattern: [{ type: Input }],
        ngModel: [{ type: Input }],
        pasteSplitPattern: [{ type: Input }],
        placeholder: [{ type: Input }],
        autocompleteDataList: [{ type: Input }],
        isAutoComplete: [{ type: Input }],
        isRemovable: [{ type: Input }],
        disabled: [{ type: Input }],
        minChips: [{ type: Input }],
        maxChips: [{ type: Input }],
        type: [{ type: Input }],
        id: [{ type: Input }],
        autocompleteItemText: [{ type: Input, args: ['autocomplete-item-text',] }],
        autocompleteItemValue: [{ type: Input, args: ['autocomplete-item-value',] }],
        textKey: [{ type: Input, args: ['item-text',] }],
        valueKey: [{ type: Input, args: ['item-value',] }],
        change: [{ type: Output }],
        chipInputForm: [{ type: ViewChild, args: ['chipInputForm',] }],
        value: [{ type: Input }],
        _handleFocus: [{ type: HostListener, args: ['focus',] }]
    };
    return Md2Chips;
}());
export { Md2Chips };
if (false) {
    /** @type {?} */
    Md2Chips.prototype.tabindex;
    /** @type {?} */
    Md2Chips.prototype.addOnComma;
    /** @type {?} */
    Md2Chips.prototype.addOnEnter;
    /** @type {?} */
    Md2Chips.prototype.addOnPaste;
    /** @type {?} */
    Md2Chips.prototype.addOnSpace;
    /** @type {?} */
    Md2Chips.prototype.allowedPattern;
    /** @type {?} */
    Md2Chips.prototype.ngModel;
    /** @type {?} */
    Md2Chips.prototype.pasteSplitPattern;
    /** @type {?} */
    Md2Chips.prototype.placeholder;
    /** @type {?} */
    Md2Chips.prototype.autocompleteDataList;
    /** @type {?} */
    Md2Chips.prototype.isAutoComplete;
    /** @type {?} */
    Md2Chips.prototype.isRemovable;
    /** @type {?} */
    Md2Chips.prototype.disabled;
    /** @type {?} */
    Md2Chips.prototype.minChips;
    /** @type {?} */
    Md2Chips.prototype.maxChips;
    /** @type {?} */
    Md2Chips.prototype.type;
    /** @type {?} */
    Md2Chips.prototype.id;
    /** @type {?} */
    Md2Chips.prototype.autocompleteItemText;
    /** @type {?} */
    Md2Chips.prototype.autocompleteItemValue;
    /** @type {?} */
    Md2Chips.prototype.textKey;
    /** @type {?} */
    Md2Chips.prototype.valueKey;
    /** @type {?} */
    Md2Chips.prototype.change;
    /** @type {?} */
    Md2Chips.prototype.chipInputForm;
    /** @type {?} */
    Md2Chips.prototype._onChange;
    /** @type {?} */
    Md2Chips.prototype._onTouched;
    /** @type {?} */
    Md2Chips.prototype.chipItemList;
    /** @type {?} */
    Md2Chips.prototype.inputValue;
    /** @type {?} */
    Md2Chips.prototype.selectedChip;
    /** @type {?} */
    Md2Chips.prototype.inputFocused;
    /** @type {?} */
    Md2Chips.prototype.autoCompleteFocued;
    /** @type {?} */
    Md2Chips.prototype._value;
    /** @type {?} */
    Md2Chips.prototype.splitRegExp;
    /** @type {?} */
    Md2Chips.prototype.templateHtmlString;
    /** @type {?} */
    Md2Chips.prototype.item;
    /** @type {?} */
    Md2Chips.prototype.isEmptyAutoComplete;
    /** @type {?} */
    Md2Chips.prototype.elementRef;
}
/** @type {?} */
export var MD2_CHIPS_DIRECTIVES = [Md2Chips];
var Md2ChipsModule = /** @class */ (function () {
    function Md2ChipsModule() {
    }
    Md2ChipsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, Md2AutocompleteModule],
                    declarations: MD2_CHIPS_DIRECTIVES,
                    exports: MD2_CHIPS_DIRECTIVES
                },] }
    ];
    return Md2ChipsModule;
}());
export { Md2ChipsModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jaGlwcy9jaGlwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUNWLE1BQU0sRUFDTixTQUFTLEVBQ1QsUUFBUSxFQUNSLFVBQVUsRUFDVixZQUFZLEVBRVosWUFBWSxFQUNaLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixXQUFXLEVBQ1osTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixLQUFLLEVBQ0wsVUFBVSxFQUNWLFdBQVcsRUFDWixNQUFNLDJCQUEyQixDQUFDO0FBRW5DLElBQUE7SUFJRSxjQUFZLE1BQVcsRUFBRSxPQUFlLEVBQUUsUUFBZ0I7UUFDeEQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztTQUNqQztRQUNELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUNuRDtLQUNGO2VBNUNIO0lBNkNDLENBQUE7QUFiRCxnQkFhQzs7Ozs7Ozs7QUFFRCxJQUFJLE1BQU0sR0FB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c0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgZm9yd2FyZFJlZixcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG4gIE5nTW9kdWxlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIEhvc3RMaXN0ZW5lcixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIE5nRm9ybSxcbiAgRm9ybXNNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWQyQXV0b2NvbXBsZXRlTW9kdWxlIH0gZnJvbSAnLi4vYXV0b2NvbXBsZXRlL2luZGV4JztcbmltcG9ydCB7XG4gIEVOVEVSLFxuICBTUEFDRSxcbiAgQkFDS1NQQUNFLFxuICBERUxFVEUsXG4gIENPTU1BLFxuICBMRUZUX0FSUk9XLFxuICBSSUdIVF9BUlJPV1xufSBmcm9tICcuLi9jb3JlL2tleWJvYXJkL2tleWNvZGVzJztcblxuZXhwb3J0IGNsYXNzIENoaXAge1xuICBwdWJsaWMgdGV4dDogc3RyaW5nO1xuICBwdWJsaWMgdmFsdWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihzb3VyY2U6IGFueSwgdGV4dEtleTogc3RyaW5nLCB2YWx1ZUtleTogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnRleHQgPSB0aGlzLnZhbHVlID0gc291cmNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMudGV4dCA9IHNvdXJjZVt0ZXh0S2V5XTtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZUtleSA/IHNvdXJjZVt2YWx1ZUtleV0gOiBzb3VyY2U7XG4gICAgfVxuICB9XG59XG5cbmxldCBuZXh0SWQgPSAwO1xuZXhwb3J0IGNvbnN0IE1EMl9DSElQU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNZDJDaGlwcyksXG4gIG11bHRpOiB0cnVlXG59O1xuXG4vKiogQ2hhbmdlIGV2ZW50IG9iamVjdCBlbWl0dGVkIGJ5IE1kMkNoaXBzLiAqL1xuZXhwb3J0IGNsYXNzIE1kMkNoaXBzQ2hhbmdlIHtcbiAgc291cmNlOiBNZDJDaGlwcztcbiAgdmFsdWU6IGFueTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWQyLWNoaXBzJyxcbiAgdGVtcGxhdGVVcmw6ICdjaGlwcy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ2NoaXBzLnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbTUQyX0NISVBTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxuXG4gIGhvc3Q6IHtcbiAgICAncm9sZSc6ICdjaGlwcycsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbdGFiaW5kZXhdJzogJ2Rpc2FibGVkID8gLTEgOiB0YWJpbmRleCcsXG4gICAgJ1tjbGFzcy5jaGlwLWlucHV0LWZvY3VzXSc6ICdpbnB1dEZvY3VzZWQgfHwgc2VsZWN0ZWRDaGlwID49IDAnLFxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuXG5leHBvcnQgY2xhc3MgTWQyQ2hpcHMgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBhZGRPbkNvbW1hOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgYWRkT25FbnRlcjogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGFkZE9uUGFzdGU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBhZGRPblNwYWNlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGFsbG93ZWRQYXR0ZXJuOiBSZWdFeHAgPSAvLisvO1xuICBASW5wdXQoKSBuZ01vZGVsOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgcGFzdGVTcGxpdFBhdHRlcm46IHN0cmluZyA9ICcsJztcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBhdXRvY29tcGxldGVEYXRhTGlzdDogc3RyaW5nW107XG4gIEBJbnB1dCgpIGlzQXV0b0NvbXBsZXRlOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGlzUmVtb3ZhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbWluQ2hpcHM6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIG1heENoaXBzOiBudW1iZXIgPSAxMDAwMDtcbiAgQElucHV0KCkgdHlwZTogc3RyaW5nID0gJ3RleHQnO1xuICBASW5wdXQoKSBpZDogc3RyaW5nID0gJ21kMi1jaGlwcy0nICsgKCsrbmV4dElkKTtcbiAgQElucHV0KCdhdXRvY29tcGxldGUtaXRlbS10ZXh0JykgYXV0b2NvbXBsZXRlSXRlbVRleHQ6IHN0cmluZyA9ICd0ZXh0JztcbiAgQElucHV0KCdhdXRvY29tcGxldGUtaXRlbS12YWx1ZScpIGF1dG9jb21wbGV0ZUl0ZW1WYWx1ZTogc3RyaW5nID0gJ3ZhbHVlJztcbiAgQElucHV0KCdpdGVtLXRleHQnKSB0ZXh0S2V5OiBzdHJpbmcgPSAndGV4dCc7XG4gIEBJbnB1dCgnaXRlbS12YWx1ZScpIHZhbHVlS2V5OiBzdHJpbmcgPSBudWxsO1xuXG4gIEBPdXRwdXQoKSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBWaWV3Q2hpbGQoJ2NoaXBJbnB1dEZvcm0nKSBjaGlwSW5wdXRGb3JtOiBOZ0Zvcm07XG5cbiAgX29uQ2hhbmdlOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHsgfTtcbiAgX29uVG91Y2hlZCA9ICgpID0+IHsgfTtcblxuICBjaGlwSXRlbUxpc3Q6IEFycmF5PENoaXA+ID0gW107XG4gIGlucHV0VmFsdWU6IHN0cmluZyA9ICcnO1xuICBzZWxlY3RlZENoaXA6IG51bWJlciA9IC0xO1xuICBpbnB1dEZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgYXV0b0NvbXBsZXRlRm9jdWVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfdmFsdWU6IGFueSA9ICcnO1xuICBwcml2YXRlIHNwbGl0UmVnRXhwOiBSZWdFeHA7XG4gIHRlbXBsYXRlSHRtbFN0cmluZzogYW55O1xuICBpdGVtOiBhbnk7XG4gIHByaXZhdGUgaXNFbXB0eUF1dG9Db21wbGV0ZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7IH1cblxuICBnZXQgZWxlbWVudCgpIHtcbiAgICBjb25zdCBlbGVtZW50czogYW55ID0geyByb290OiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgbWFpbkRpdjogbnVsbCwgdGVtcGxhdGU6IG51bGwgfTtcbiAgICBlbGVtZW50cy5tYWluRGl2ID0gZWxlbWVudHMucm9vdC5xdWVyeVNlbGVjdG9yKCcubWQyLWNoaXBzLWNvbnRhaW5lcicpO1xuICAgIGVsZW1lbnRzLnRlbXBsYXRlID0gZWxlbWVudHMubWFpbkRpdi5xdWVyeVNlbGVjdG9yKCcubWQyLXRlbXBsYXRlJyk7XG4gICAgcmV0dXJuIGVsZW1lbnRzO1xuICB9XG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHsgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7IH1cblxuICAvKipcbiAgICogc2V0IHZhbHVlXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgc2V0IHNldFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5jaGlwSXRlbUxpc3QgPSBbXTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jaGlwSXRlbUxpc3QucHVzaChuZXcgQ2hpcCh2YWx1ZVtpXSwgdGhpcy50ZXh0S2V5LCB0aGlzLnZhbHVlS2V5KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICB9XG5cbiAgZ2V0Rm9jdXNBdXRvY29tcGxldGUoKSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gIH1cblxuICBjaGFuZ2VBdXRvY29tcGxldGUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5hZGROZXdDaGlwKHZhbHVlLnZhbHVlKTtcbiAgICAgIHRoaXMuaXRlbSA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGxldCBlbGVtZW50cyA9IHRoaXMuZWxlbWVudDtcbiAgICB0aGlzLnNwbGl0UmVnRXhwID0gbmV3IFJlZ0V4cCh0aGlzLnBhc3RlU3BsaXRQYXR0ZXJuKTtcbiAgICBpZiAoZWxlbWVudHMudGVtcGxhdGUpIHtcbiAgICAgIHRoaXMudGVtcGxhdGVIdG1sU3RyaW5nID0gZWxlbWVudHMudGVtcGxhdGUuaW5uZXJIVE1MO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNoZWNrIGF1dG9jb21wbGV0ZSBpbnB1dCBpcyBlbXB0eSBvciBub3RcbiAgdmFsdWV1cGRhdGUoZXZ0OiBFdmVudCkge1xuICAgIHRoaXMuaXNFbXB0eUF1dG9Db21wbGV0ZSA9IGV2dCA/IGZhbHNlIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpbnB1dCBrZXkgbGlzdGVuZXJcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBpbnB1dENoYW5nZWQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBsZXQga2V5ID0gZXZlbnQua2V5Q29kZTtcbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgLy8gYmFjayBzcGFjZVxuICAgICAgY2FzZSBCQUNLU1BBQ0U6XG4gICAgICAgIHRoaXMuYmFja3NwYWNlRXZlbnQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBkZWxldGVcbiAgICAgIGNhc2UgREVMRVRFOlxuICAgICAgICB0aGlzLmJhY2tzcGFjZUV2ZW50KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gbGVmdCBhcnJvd1xuICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICBpZiAodGhpcy5pc0F1dG9Db21wbGV0ZSAmJiB0aGlzLmlzRW1wdHlBdXRvQ29tcGxldGUpIHtcbiAgICAgICAgICB0aGlzLmxlZnRBcnJvd0tleUV2ZW50cygpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzQXV0b0NvbXBsZXRlICYmICF0aGlzLmlucHV0VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmxlZnRBcnJvd0tleUV2ZW50cygpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gcmlnaHQgYXJyb3dcbiAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgIGlmICh0aGlzLmlzQXV0b0NvbXBsZXRlICYmIHRoaXMuaXNFbXB0eUF1dG9Db21wbGV0ZSkge1xuICAgICAgICAgIHRoaXMucmlnaHRBcnJvd0tleUV2ZW50cygpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzQXV0b0NvbXBsZXRlICYmICF0aGlzLmlucHV0VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLnJpZ2h0QXJyb3dLZXlFdmVudHMoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIC8vIGVudGVyXG4gICAgICBjYXNlIEVOVEVSOlxuICAgICAgICBpZiAodGhpcy5hZGRPbkVudGVyKSB7XG4gICAgICAgICAgdGhpcy5hZGROZXdDaGlwKHRoaXMuaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIC8vIGNvbW1hXG4gICAgICBjYXNlIENPTU1BOlxuICAgICAgICBpZiAodGhpcy5hZGRPbkNvbW1hKSB7XG4gICAgICAgICAgdGhpcy5hZGROZXdDaGlwKHRoaXMuaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNwYWNlXG4gICAgICBjYXNlIFNQQUNFOlxuICAgICAgICBpZiAodGhpcy5hZGRPblNwYWNlKSB7XG4gICAgICAgICAgdGhpcy5hZGROZXdDaGlwKHRoaXMuaW5wdXRWYWx1ZSk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICBfaGFuZGxlRm9jdXMoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgaWYgKCF0aGlzLmlzQXV0b0NvbXBsZXRlKSB7XG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dC5jaGlwLWlucHV0JykuZm9jdXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdXRvQ29tcGxldGVGb2N1ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gICAgfVxuICAgIHRoaXMuX3Jlc2V0U2VsZWN0ZWQoKTtcbiAgfVxuXG4gIGlucHV0Qmx1cnJlZCgpOiB2b2lkIHtcbiAgICB0aGlzLmlucHV0Rm9jdXNlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmlucHV0VmFsdWUpIHtcbiAgICAgIHRoaXMuYWRkTmV3Q2hpcCh0aGlzLmlucHV0VmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgfVxuXG4gIGlucHV0Rm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5pbnB1dEZvY3VzZWQgPSB0cnVlO1xuICB9XG5cbiAgaW5wdXRQYXN0ZShldmVudDogYW55KTogdm9pZCB7XG4gICAgbGV0IGNsaXBib2FyZERhdGEgPSBldmVudC5jbGlwYm9hcmREYXRhIHx8XG4gICAgICAoZXZlbnQub3JpZ2luYWxFdmVudCAmJiBldmVudC5vcmlnaW5hbEV2ZW50LmNsaXBib2FyZERhdGEpO1xuICAgIGxldCBwYXN0ZWRTdHJpbmcgPSBjbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQvcGxhaW4nKS50cmltKCk7XG4gICAgdGhpcy5hZGROZXdDaGlwKHBhc3RlZFN0cmluZyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9yZXNldElucHV0KCkpO1xuICB9XG5cbiAgbGVmdEFycm93S2V5RXZlbnRzKCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRDaGlwKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZENoaXAgPCAwKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGlwID0gdGhpcy5jaGlwSXRlbUxpc3QubGVuZ3RoIC0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGlwID0gdGhpcy5zZWxlY3RlZENoaXAgLSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByaWdodEFycm93S2V5RXZlbnRzKCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRDaGlwICE9IC0xKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZENoaXAgPj0gdGhpcy5jaGlwSXRlbUxpc3QubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGlwID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGlwID0gdGhpcy5zZWxlY3RlZENoaXAgKyAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2lzVmFsaWQoY2hpcFN0cmluZzogYW55KTogYm9vbGVhbiB7XG4gICAgbGV0IHR5cGVTdHJpbmcgPSB0eXBlb2YgY2hpcFN0cmluZztcbiAgICBsZXQgaXNFeGlzdDogYW55O1xuICAgIGlmICh0eXBlU3RyaW5nID09PSAnc3RyaW5nJykge1xuICAgICAgY2hpcFN0cmluZyA9IGNoaXBTdHJpbmcudHJpbSgpO1xuICAgICAgaXNFeGlzdCA9IHRoaXMuY2hpcEl0ZW1MaXN0LmZpbHRlcigoY2hpcCkgPT4gY2hpcC50ZXh0ID09PSBjaGlwU3RyaW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXNFeGlzdCA9IHRoaXMuY2hpcEl0ZW1MaXN0LmZpbHRlcigoY2hpcCkgPT4gY2hpcC50ZXh0ID09PSBjaGlwU3RyaW5nLnRleHQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jaGlwSXRlbUxpc3QuaW5kZXhPZihjaGlwU3RyaW5nKSA9PT0gLTEgJiYgKGlzRXhpc3QubGVuZ3RoID8gZmFsc2UgOiB0cnVlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuYWxsb3dlZFBhdHRlcm4udGVzdChjaGlwU3RyaW5nKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICogYWRkIG5ldyBjaGlwXG4gICogQHBhcmFtIGNoaXBzXG4gICovXG4gIHByaXZhdGUgYWRkTmV3Q2hpcChjaGlwczogYW55KTogdm9pZCB7XG4gICAgbGV0IHZhbGlkSW5wdXQgPSB0aGlzLl9pc1ZhbGlkKGNoaXBzKTtcbiAgICBpZiAodmFsaWRJbnB1dCkge1xuICAgICAgaWYgKHRoaXMubWF4Q2hpcHMgJiYgdGhpcy5tYXhDaGlwcyA8IHRoaXMuY2hpcEl0ZW1MaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGlwSXRlbUxpc3QucHVzaChuZXcgQ2hpcChjaGlwcywgdGhpcy5hdXRvY29tcGxldGVJdGVtVGV4dCwgdGhpcy5hdXRvY29tcGxldGVJdGVtVmFsdWUpKTtcbiAgICAgICAgdGhpcy5pdGVtID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcmVzZXRTZWxlY3RlZCgpO1xuICAgIHRoaXMuX3Jlc2V0SW5wdXQoKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAqIHJlbW92ZSBzZWxlY3RlZCBjaGlwXG4gKiBAcGFyYW0gY2hpcEluZGV4VG9SZW1vdmUgaW5kZXggb2Ygc2VsZWN0ZWQgY2hpcFxuICovXG4gIHJlbW92ZVNlbGVjdGVkQ2hpcChjaGlwSW5kZXhUb1JlbW92ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jaGlwSXRlbUxpc3Quc3BsaWNlKGNoaXBJbmRleFRvUmVtb3ZlLCAxKTtcbiAgICB0aGlzLl9yZXNldFNlbGVjdGVkKCk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBiYWNrc3BhY2VFdmVudCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaW5wdXRWYWx1ZS5sZW5ndGggJiYgdGhpcy5jaGlwSXRlbUxpc3QubGVuZ3RoICYmXG4gICAgICB0aGlzLmlzUmVtb3ZhYmxlICYmIHRoaXMuaXNFbXB0eUF1dG9Db21wbGV0ZSkge1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDaGlwICE9IC0xKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWRDaGlwKHRoaXMuc2VsZWN0ZWRDaGlwKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoaXAgPSB0aGlzLmNoaXBJdGVtTGlzdC5sZW5ndGggLSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoaXAgPSB0aGlzLmNoaXBJdGVtTGlzdC5sZW5ndGggLSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0U2VsZWN0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZENoaXAgPSAtMTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0SW5wdXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNBdXRvQ29tcGxldGUpIHtcbiAgICAgIHRoaXMuY2hpcElucHV0Rm9ybS5jb250cm9sc1snYXV0b2NvbXBsZXRlJ10uc2V0VmFsdWUoJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNoaXBJbnB1dEZvcm0uY29udHJvbHNbJ2NoaXBJbnB1dCddLnNldFZhbHVlKCcnKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIHVwZGF0ZSB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVWYWx1ZSgpIHtcbiAgICB0aGlzLl92YWx1ZSA9IG5ldyBBcnJheTxhbnk+KCk7XG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLmNoaXBJdGVtTGlzdC5tYXAoKGNoaXA6IGFueSkgPT4ge1xuICAgICAgaWYgKHRoaXMudmFsdWVLZXkpIHtcbiAgICAgICAgbGV0IGM6IGFueSA9IHt9O1xuICAgICAgICBjW3RoaXMudGV4dEtleV0gPSBjaGlwLnRleHQ7XG4gICAgICAgIGNbdGhpcy52YWx1ZUtleV0gPSBjaGlwLnZhbHVlO1xuICAgICAgICByZXR1cm4gYztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjaGlwLnZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICB9XG5cbiAgLyoqIEVtaXRzIGFuIGV2ZW50IHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIGNvbG9yLiAqL1xuICBfZW1pdENoYW5nZUV2ZW50KCk6IHZvaWQge1xuICAgIGxldCBldmVudCA9IG5ldyBNZDJDaGlwc0NoYW5nZSgpO1xuICAgIGV2ZW50LnNvdXJjZSA9IHRoaXM7XG4gICAgZXZlbnQudmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICB0aGlzLl9vbkNoYW5nZShldmVudC52YWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5jaGlwSXRlbUxpc3QgPSBbXTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5jaGlwSXRlbUxpc3QucHVzaChuZXcgQ2hpcCh2YWx1ZVtpXSwgdGhpcy50ZXh0S2V5LCB0aGlzLnZhbHVlS2V5KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX29uQ2hhbmdlID0gZm47IH1cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7IHRoaXMuX29uVG91Y2hlZCA9IGZuOyB9XG59XG5cbmV4cG9ydCBjb25zdCBNRDJfQ0hJUFNfRElSRUNUSVZFUzogYW55W10gPSBbTWQyQ2hpcHNdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTWQyQXV0b2NvbXBsZXRlTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBNRDJfQ0hJUFNfRElSRUNUSVZFUyxcbiAgZXhwb3J0czogTUQyX0NISVBTX0RJUkVDVElWRVNcbn0pXG5leHBvcnQgY2xhc3MgTWQyQ2hpcHNNb2R1bGUgeyB9XG4iXX0=