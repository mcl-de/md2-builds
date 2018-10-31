/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, } from '@angular/forms';
import { coerceBooleanProperty, UP_ARROW, DOWN_ARROW, ENTER, ESCAPE, TAB } from '../core/core';
var Item = /** @class */ (function () {
    function Item(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Item;
}());
export { Item };
if (false) {
    /** @type {?} */
    Item.prototype.text;
    /** @type {?} */
    Item.prototype.value;
}
/** @type {?} */
var nextId = 0;
/** @type {?} */
export var MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Autocomplete; }),
    multi: true
};
/**
 * Change event object emitted by Md2Autocomplete.
 */
var /**
 * Change event object emitted by Md2Autocomplete.
 */
Md2AutocompleteChange = /** @class */ (function () {
    function Md2AutocompleteChange() {
    }
    return Md2AutocompleteChange;
}());
/**
 * Change event object emitted by Md2Autocomplete.
 */
export { Md2AutocompleteChange };
if (false) {
    /** @type {?} */
    Md2AutocompleteChange.prototype.source;
    /** @type {?} */
    Md2AutocompleteChange.prototype.value;
}
var Md2Autocomplete = /** @class */ (function () {
    function Md2Autocomplete(_element) {
        this._element = _element;
        this.change = new EventEmitter();
        this.textChange = new EventEmitter();
        this._value = '';
        this._readonly = false;
        this._required = false;
        this._disabled = false;
        this._isInitialized = false;
        this._onChange = function () { };
        this._onTouched = function () { };
        this._items = [];
        this._list = [];
        this.selectedItem = null;
        this.noBlur = false;
        this._focusedOption = 0;
        this._inputValue = '';
        this._inputFocused = false;
        this.id = 'md2-autocomplete-' + (++nextId);
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
        this.minLength = 1;
    }
    /**
     * @return {?}
     */
    Md2Autocomplete.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () { this._isInitialized = true; };
    Object.defineProperty(Md2Autocomplete.prototype, "readonly", {
        get: /**
         * @return {?}
         */
        function () { return this._readonly; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._readonly = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "required", {
        get: /**
         * @return {?}
         */
        function () { return this._required; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._required = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "items", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._items = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Autocomplete.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this._value; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (value !== this._value) {
                this._value = value;
                this._inputValue = '';
                if (value) {
                    /** @type {?} */
                    var selItm = this._items.find(function (i) { return _this.equals(_this.valueKey ?
                        i[_this.valueKey] : i, value); });
                    this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
                    if (this.selectedItem) {
                        this._inputValue = this.selectedItem.text;
                    }
                }
                if (!this._inputValue) {
                    this._inputValue = '';
                }
                if (this._isInitialized) {
                    this._emitChangeEvent();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Compare two vars or objects
     * @param {?} o1 compare first object
     * @param {?} o2 compare second object
     * @return {?} boolean comparation result
     */
    Md2Autocomplete.prototype.equals = /**
     * Compare two vars or objects
     * @param {?} o1 compare first object
     * @param {?} o2 compare second object
     * @return {?} boolean comparation result
     */
    function (o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        /** @type {?} */
        var t1 = typeof o1;
        /** @type {?} */
        var t2 = typeof o2;
        /** @type {?} */
        var key;
        /** @type {?} */
        var keySet;
        if (t1 === t2 && t1 === 'object') {
            keySet = Object.create(null);
            for (key in o1) {
                if (!this.equals(o1[key], o2[key])) {
                    return false;
                }
                keySet[key] = true;
            }
            for (key in o2) {
                if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(Md2Autocomplete.prototype, "isMenuVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return ((this._inputFocused || this.noBlur) && this._list && this._list.length &&
                !this.selectedItem) && !this.readonly ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * update scroll of suggestion menu
     * @return {?}
     */
    Md2Autocomplete.prototype.updateScroll = /**
     * update scroll of suggestion menu
     * @return {?}
     */
    function () {
        if (this._focusedOption < 0) {
            return;
        }
        /** @type {?} */
        var menuContainer = this._element.nativeElement.querySelector('.md2-autocomplete-menu');
        if (!menuContainer) {
            return;
        }
        /** @type {?} */
        var choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        /** @type {?} */
        var highlighted = choices[this._focusedOption];
        if (!highlighted) {
            return;
        }
        /** @type {?} */
        var top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        /** @type {?} */
        var height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    };
    /**
     * input event listner
     * @param event
     */
    /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    Md2Autocomplete.prototype._handleKeyup = /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.textChange.emit(this._inputValue);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2Autocomplete.prototype._handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (this.disabled) {
            return;
        }
        switch (event.keyCode) {
            case TAB:
                this._handleMouseLeave();
                break;
            case ESCAPE:
                event.stopPropagation();
                event.preventDefault();
                if (this._inputValue) {
                    this._onClear();
                }
                break;
            case ENTER:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this._selectOption(event, this._focusedOption);
                }
                break;
            case DOWN_ARROW:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this._focusedOption = (this._focusedOption === this._list.length - 1) ? 0 :
                        Math.min(this._focusedOption + 1, this._list.length - 1);
                    this.updateScroll();
                }
                break;
            case UP_ARROW:
                event.preventDefault();
                event.stopPropagation();
                if (this.isMenuVisible) {
                    this._focusedOption = (this._focusedOption === 0) ? this._list.length - 1 :
                        Math.max(0, this._focusedOption - 1);
                    this.updateScroll();
                }
                break;
            default:
                setTimeout(function () {
                    _this.updateItems();
                }, 10);
        }
    };
    /**
     * select option
     * @param event
     * @param index of selected item
     */
    /**
     * select option
     * @param {?} event
     * @param {?} index of selected item
     * @return {?}
     */
    Md2Autocomplete.prototype._selectOption = /**
     * select option
     * @param {?} event
     * @param {?} index of selected item
     * @return {?}
     */
    function (event, index) {
        event.preventDefault();
        event.stopPropagation();
        this.selectedItem = this._list[index];
        this._inputValue = this._list[index].text;
        this.updateValue();
        this._handleMouseLeave();
    };
    /**
     * clear selected suggestion
     */
    /**
     * clear selected suggestion
     * @return {?}
     */
    Md2Autocomplete.prototype._onClear = /**
     * clear selected suggestion
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        this._inputValue = '';
        this.selectedItem = null;
        this.updateItems();
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this.updateValue();
    };
    /**
     * update value
     * @return {?}
     */
    Md2Autocomplete.prototype.updateValue = /**
     * update value
     * @return {?}
     */
    function () {
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this._emitChangeEvent();
        this.onFocus();
    };
    /**
     * component focus listener
     * @return {?}
     */
    Md2Autocomplete.prototype.onFocus = /**
     * component focus listener
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        this._element.nativeElement.querySelector('input').focus();
    };
    /**
     * input focus listener
     */
    /**
     * input focus listener
     * @return {?}
     */
    Md2Autocomplete.prototype._handleFocus = /**
     * input focus listener
     * @return {?}
     */
    function () {
        this._inputFocused = true;
        this.updateItems();
        this._focusedOption = 0;
    };
    /**
     * input blur listener
     */
    /**
     * input blur listener
     * @return {?}
     */
    Md2Autocomplete.prototype._handleBlur = /**
     * input blur listener
     * @return {?}
     */
    function () {
        this._inputFocused = false;
        this._onTouched();
    };
    /**
     * suggestion menu mouse enter listener
     */
    /**
     * suggestion menu mouse enter listener
     * @return {?}
     */
    Md2Autocomplete.prototype._handleMouseEnter = /**
     * suggestion menu mouse enter listener
     * @return {?}
     */
    function () { this.noBlur = true; };
    /**
     * suggestion menu mouse leave listener
     */
    /**
     * suggestion menu mouse leave listener
     * @return {?}
     */
    Md2Autocomplete.prototype._handleMouseLeave = /**
     * suggestion menu mouse leave listener
     * @return {?}
     */
    function () { this.noBlur = false; };
    /**
     * Update suggestion to filter the query
     * @return {?}
     */
    Md2Autocomplete.prototype.updateItems = /**
     * Update suggestion to filter the query
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._inputValue.length < this.minLength) {
            this._list = [];
        }
        else {
            this._list = this._items.map(function (i) { return new Item(i, _this.textKey, _this.valueKey); }).filter(function (i) { return new RegExp(_this._inputValue.trim(), 'ig').test(i.text); });
            if (this._list.length && this._list[0].text !== this._inputValue) {
                this.selectedItem = null;
            }
        }
    };
    /**
     * @return {?}
     */
    Md2Autocomplete.prototype._emitChangeEvent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var event = new Md2AutocompleteChange();
        event.source = this;
        event.value = this._value;
        this._onChange(event.value);
        this.change.emit(event);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2Autocomplete.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this._inputValue = '';
            if (value) {
                /** @type {?} */
                var selItm = this._items.find(function (i) { return _this.equals(_this.valueKey ?
                    i[_this.valueKey] : i, value); });
                this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
                if (this.selectedItem) {
                    this._inputValue = this.selectedItem.text;
                }
            }
            if (!this._inputValue) {
                this._inputValue = '';
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Autocomplete.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChange = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Autocomplete.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouched = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    Md2Autocomplete.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    Md2Autocomplete.decorators = [
        { type: Component, args: [{
                    selector: 'md2-autocomplete',
                    template: "<div class=\"md2-autocomplete-trigger\" [class.is-focused]=\"_inputFocused || isMenuVisible\">\n  <input [(ngModel)]=\"_inputValue\" type=\"text\" autocomplete=\"off\" [readonly]=\"readonly\" [tabindex]=\"disabled ? -1 : tabindex\" [disabled]=\"disabled\" class=\"md2-autocomplete-input\" (focus)=\"_handleFocus()\" (blur)=\"_handleBlur()\" (keydown)=\"_handleKeydown($event)\" (keyup)=\"_handleKeyup($event)\" (change)=\"$event.stopPropagation()\" />\n  <span class=\"md2-autocomplete-placeholder\" [class.has-value]=\"_inputValue\"> {{ placeholder }} </span>\n  <svg *ngIf=\"_inputValue && !required && !disabled\" (click)=\"_onClear()\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n    <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n  </svg>\n</div>\n<ul *ngIf=\"isMenuVisible\" class=\"md2-autocomplete-menu\" (mouseenter)=\"_handleMouseEnter()\" (mouseleave)=\"_handleMouseLeave()\">\n  <li class=\"md2-option\" *ngFor=\"let l of _list; let i = index;\" [class.focus]=\"_focusedOption === i\" (click)=\"_selectOption($event, i)\">\n    <div class=\"md2-text\" [innerHtml]=\"l.text | highlight:_inputValue\"></div>\n  </li>\n</ul>\n",
                    providers: [MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
                    host: {
                        'role': 'autocomplete',
                        '[id]': 'id',
                        '[attr.aria-label]': 'placeholder',
                        '[attr.aria-required]': 'required.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                        '[class.md2-autocomplete-disabled]': 'disabled',
                    },
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'md2Autocomplete',
                    styles: ["md2-autocomplete{position:relative;display:block;margin:18px 0;outline:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-backface-visibility:hidden;backface-visibility:hidden}md2-autocomplete.md2-autocomplete-disabled{pointer-events:none;cursor:default}.md2-autocomplete-trigger{position:relative;display:block;width:100%;padding:2px 2px 1px;border-bottom:1px solid rgba(0,0,0,.12);box-sizing:border-box;min-width:64px;min-height:26px;cursor:pointer}.md2-autocomplete-trigger.is-focused{padding-bottom:0;border-bottom:2px solid #106cc8}md2-autocomplete.ng-invalid.ng-touched:not(.md2-autocomplete-disabled) .md2-autocomplete-trigger{color:#f44336;border-bottom-color:#f44336}md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-trigger{color:rgba(0,0,0,.38);border-color:transparent;background-image:linear-gradient(to right,rgba(0,0,0,.38) 0,rgba(0,0,0,.38) 33%,transparent 0);background-position:bottom -1px left 0;background-size:4px 1px;background-repeat:repeat-x;cursor:default}md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-trigger.is-focused{padding-bottom:1px;border-bottom:1px solid transparent}.md2-autocomplete-input{width:100%;height:26px;font-size:15px;outline:0;background:0 0;border:0;box-sizing:border-box}md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-input{color:rgba(0,0,0,.38)}.md2-autocomplete-placeholder{position:absolute;right:26px;bottom:100%;left:0;max-width:100%;padding-left:3px;padding-right:0;line-height:1.4;color:rgba(0,0,0,.38);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;pointer-events:none;z-index:1;-webkit-transform:translate3d(0,26px,0) scale(1);transform:translate3d(0,26px,0) scale(1);transition:transform .4s cubic-bezier(.25,.8,.25,1);transition:transform .4s cubic-bezier(.25,.8,.25,1),-webkit-transform .4s cubic-bezier(.25,.8,.25,1);-webkit-transform-origin:left top;transform-origin:left top}[aria-required=true] .md2-autocomplete-placeholder::after{content:'*'}.md2-autocomplete-trigger.is-focused .md2-autocomplete-placeholder{color:#106cc8}.md2-autocomplete-trigger.is-focused .md2-autocomplete-placeholder,md2-autocomplete .md2-autocomplete-placeholder.has-value{-webkit-transform:translate3d(0,6px,0) scale(.75);transform:translate3d(0,6px,0) scale(.75)}.md2-autocomplete-trigger svg{position:absolute;right:0;top:0;display:block;height:100%;background:#fff;fill:currentColor;color:rgba(0,0,0,.54)}.md2-autocomplete-menu{position:absolute;left:0;top:100%;display:block;z-index:10;width:100%;margin:0;padding:8px 0;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);max-height:256px;min-height:48px;overflow-y:auto;background:#fff}.md2-autocomplete-menu .md2-option{position:relative;display:block;color:#212121;cursor:pointer;width:auto;padding:0 16px;height:48px;line-height:48px;transition:background 150ms linear}.md2-autocomplete-menu .md2-option.focus,.md2-autocomplete-menu .md2-option:hover{background:#ededed}.md2-autocomplete-menu .md2-option .md2-text{width:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:16px}.md2-autocomplete-menu .highlight{color:#737373}"]
                }] }
    ];
    /** @nocollapse */
    Md2Autocomplete.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    Md2Autocomplete.propDecorators = {
        change: [{ type: Output }],
        textChange: [{ type: Output }],
        id: [{ type: Input }],
        tabindex: [{ type: Input }],
        placeholder: [{ type: Input }],
        textKey: [{ type: Input, args: ['item-text',] }],
        valueKey: [{ type: Input, args: ['item-value',] }],
        minLength: [{ type: Input, args: ['min-length',] }],
        readonly: [{ type: Input }],
        required: [{ type: Input }],
        disabled: [{ type: Input }],
        items: [{ type: Input }],
        value: [{ type: Input }]
    };
    return Md2Autocomplete;
}());
export { Md2Autocomplete };
if (false) {
    /** @type {?} */
    Md2Autocomplete.prototype.change;
    /** @type {?} */
    Md2Autocomplete.prototype.textChange;
    /** @type {?} */
    Md2Autocomplete.prototype._value;
    /** @type {?} */
    Md2Autocomplete.prototype._readonly;
    /** @type {?} */
    Md2Autocomplete.prototype._required;
    /** @type {?} */
    Md2Autocomplete.prototype._disabled;
    /** @type {?} */
    Md2Autocomplete.prototype._isInitialized;
    /** @type {?} */
    Md2Autocomplete.prototype._onChange;
    /** @type {?} */
    Md2Autocomplete.prototype._onTouched;
    /** @type {?} */
    Md2Autocomplete.prototype._items;
    /** @type {?} */
    Md2Autocomplete.prototype._list;
    /** @type {?} */
    Md2Autocomplete.prototype.selectedItem;
    /** @type {?} */
    Md2Autocomplete.prototype.noBlur;
    /** @type {?} */
    Md2Autocomplete.prototype._focusedOption;
    /** @type {?} */
    Md2Autocomplete.prototype._inputValue;
    /** @type {?} */
    Md2Autocomplete.prototype._inputFocused;
    /** @type {?} */
    Md2Autocomplete.prototype.id;
    /** @type {?} */
    Md2Autocomplete.prototype.tabindex;
    /** @type {?} */
    Md2Autocomplete.prototype.placeholder;
    /** @type {?} */
    Md2Autocomplete.prototype.textKey;
    /** @type {?} */
    Md2Autocomplete.prototype.valueKey;
    /** @type {?} */
    Md2Autocomplete.prototype.minLength;
    /** @type {?} */
    Md2Autocomplete.prototype._element;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsaUJBQWlCLEdBRWxCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUNMLHFCQUFxQixFQUNyQixRQUFRLEVBQ1IsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sR0FBRyxFQUNKLE1BQU0sY0FBYyxDQUFDO0FBRXRCLElBQUE7SUFJRSxjQUFZLE1BQVcsRUFBRSxPQUFlLEVBQUUsUUFBZ0I7UUFDeEQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztTQUNqQztRQUNELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUNuRDtLQUNGO2VBbkNIO0lBb0NDLENBQUE7QUFiRCxnQkFhQzs7Ozs7Ozs7QUFFRCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBRWYsV0FBYSx1Q0FBdUMsR0FBUTtJQUMxRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGVBQWUsRUFBZixDQUFlLENBQUM7SUFDOUMsS0FBSyxF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QUFnQjs7OztJQUFoQixVQUFpQixFQUF3QixJQUFVLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLEVBQUU7Ozs7O0lBRXpFLDJDQUFpQjs7OztJQUFqQixVQUFrQixFQUFZLElBQVUsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsRUFBRTs7Ozs7SUFFL0QsMENBQWdCOzs7O0lBQWhCLFVBQWlCLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0tBQzVCOztnQkFuVEYsU0FBUyxTQUFDO29CQUVULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLHlzQ0FBZ0M7b0JBRWhDLFNBQVMsRUFBRSxDQUFDLHVDQUF1QyxDQUFDO29CQUNwRCxJQUFJLEVBQUU7d0JBQ0osTUFBTSxFQUFFLGNBQWM7d0JBQ3RCLE1BQU0sRUFBRSxJQUFJO3dCQUNaLG1CQUFtQixFQUFFLGFBQWE7d0JBQ2xDLHNCQUFzQixFQUFFLHFCQUFxQjt3QkFDN0Msc0JBQXNCLEVBQUUscUJBQXFCO3dCQUM3QyxtQ0FBbUMsRUFBRSxVQUFVO3FCQUNoRDtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLGlCQUFpQjs7aUJBQzVCOzs7O2dCQWpFQyxVQUFVOzs7eUJBeUVULE1BQU07NkJBQ04sTUFBTTtxQkFvQk4sS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7MEJBQ0wsS0FBSyxTQUFDLFdBQVc7MkJBQ2pCLEtBQUssU0FBQyxZQUFZOzRCQUNsQixLQUFLLFNBQUMsWUFBWTsyQkFFbEIsS0FBSzsyQkFJTCxLQUFLOzJCQUlMLEtBQUs7d0JBSUwsS0FBSzt3QkFHTCxLQUFLOzswQkF2SFI7O1NBc0VhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgVVBfQVJST1csXG4gIERPV05fQVJST1csXG4gIEVOVEVSLFxuICBFU0NBUEUsXG4gIFRBQlxufSBmcm9tICcuLi9jb3JlL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgSXRlbSB7XG4gIHRleHQ6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihzb3VyY2U6IGFueSwgdGV4dEtleTogc3RyaW5nLCB2YWx1ZUtleTogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnRleHQgPSB0aGlzLnZhbHVlID0gc291cmNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMudGV4dCA9IHNvdXJjZVt0ZXh0S2V5XTtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZUtleSA/IHNvdXJjZVt2YWx1ZUtleV0gOiBzb3VyY2U7XG4gICAgfVxuICB9XG59XG5cbmxldCBuZXh0SWQgPSAwO1xuXG5leHBvcnQgY29uc3QgTUQyX0FVVE9DT01QTEVURV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNZDJBdXRvY29tcGxldGUpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqIENoYW5nZSBldmVudCBvYmplY3QgZW1pdHRlZCBieSBNZDJBdXRvY29tcGxldGUuICovXG5leHBvcnQgY2xhc3MgTWQyQXV0b2NvbXBsZXRlQ2hhbmdlIHtcbiAgc291cmNlOiBNZDJBdXRvY29tcGxldGU7XG4gIHZhbHVlOiBhbnk7XG59XG5cbkBDb21wb25lbnQoe1xuICBcbiAgc2VsZWN0b3I6ICdtZDItYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGVVcmw6ICdhdXRvY29tcGxldGUuaHRtbCcsXG4gIHN0eWxlVXJsczogWydhdXRvY29tcGxldGUuc2NzcyddLFxuICBwcm92aWRlcnM6IFtNRDJfQVVUT0NPTVBMRVRFX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAnYXV0b2NvbXBsZXRlJyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxdJzogJ3BsYWNlaG9sZGVyJyxcbiAgICAnW2F0dHIuYXJpYS1yZXF1aXJlZF0nOiAncmVxdWlyZWQudG9TdHJpbmcoKScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkLnRvU3RyaW5nKCknLFxuICAgICdbY2xhc3MubWQyLWF1dG9jb21wbGV0ZS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ21kMkF1dG9jb21wbGV0ZSdcbn0pXG5cbmV4cG9ydCBjbGFzcyBNZDJBdXRvY29tcGxldGUgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZikgeyB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkgeyB0aGlzLl9pc0luaXRpYWxpemVkID0gdHJ1ZTsgfVxuXG4gIEBPdXRwdXQoKSBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSB0ZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX3ZhbHVlOiBhbnkgPSAnJztcbiAgcHJpdmF0ZSBfcmVhZG9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIF9vbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7IH07XG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7IH07XG5cbiAgcHJpdmF0ZSBfaXRlbXM6IEFycmF5PGFueT4gPSBbXTtcbiAgX2xpc3Q6IEFycmF5PEl0ZW0+ID0gW107XG5cbiAgcHJpdmF0ZSBzZWxlY3RlZEl0ZW06IEl0ZW0gPSBudWxsO1xuICBwcml2YXRlIG5vQmx1cjogYm9vbGVhbiA9IGZhbHNlO1xuICBfZm9jdXNlZE9wdGlvbjogbnVtYmVyID0gMDtcbiAgX2lucHV0VmFsdWU6IHN0cmluZyA9ICcnO1xuICBfaW5wdXRGb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9ICdtZDItYXV0b2NvbXBsZXRlLScgKyAoKytuZXh0SWQpO1xuICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoJ2l0ZW0tdGV4dCcpIHRleHRLZXk6IHN0cmluZyA9ICd0ZXh0JztcbiAgQElucHV0KCdpdGVtLXZhbHVlJykgdmFsdWVLZXk6IHN0cmluZyA9IG51bGw7XG4gIEBJbnB1dCgnbWluLWxlbmd0aCcpIG1pbkxlbmd0aDogbnVtYmVyID0gMTtcblxuICBASW5wdXQoKVxuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZWFkb25seTsgfVxuICBzZXQgcmVhZG9ubHkodmFsdWUpIHsgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgQElucHV0KClcbiAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7IH1cbiAgc2V0IHJlcXVpcmVkKHZhbHVlKSB7IHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZSkgeyB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICBASW5wdXQoKVxuICBzZXQgaXRlbXModmFsdWU6IEFycmF5PGFueT4pIHsgdGhpcy5faXRlbXMgPSB2YWx1ZTsgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5faW5wdXRWYWx1ZSA9ICcnO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGxldCBzZWxJdG0gPSB0aGlzLl9pdGVtcy5maW5kKChpOiBhbnkpID0+IHRoaXMuZXF1YWxzKHRoaXMudmFsdWVLZXkgP1xuICAgICAgICAgIGlbdGhpcy52YWx1ZUtleV0gOiBpLCB2YWx1ZSkpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IG5ldyBJdGVtKHNlbEl0bSwgdGhpcy50ZXh0S2V5LCB0aGlzLnZhbHVlS2V5KTtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJdGVtKSB7IHRoaXMuX2lucHV0VmFsdWUgPSB0aGlzLnNlbGVjdGVkSXRlbS50ZXh0OyB9XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX2lucHV0VmFsdWUpIHsgdGhpcy5faW5wdXRWYWx1ZSA9ICcnOyB9XG4gICAgICBpZiAodGhpcy5faXNJbml0aWFsaXplZCkge1xuICAgICAgICB0aGlzLl9lbWl0Q2hhbmdlRXZlbnQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29tcGFyZSB0d28gdmFycyBvciBvYmplY3RzXG4gICAqIEBwYXJhbSBvMSBjb21wYXJlIGZpcnN0IG9iamVjdFxuICAgKiBAcGFyYW0gbzIgY29tcGFyZSBzZWNvbmQgb2JqZWN0XG4gICAqIEByZXR1cm4gYm9vbGVhbiBjb21wYXJhdGlvbiByZXN1bHRcbiAgICovXG4gIHByaXZhdGUgZXF1YWxzKG8xOiBhbnksIG8yOiBhbnkpIHtcbiAgICBpZiAobzEgPT09IG8yKSB7IHJldHVybiB0cnVlOyB9XG4gICAgaWYgKG8xID09PSBudWxsIHx8IG8yID09PSBudWxsKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmIChvMSAhPT0gbzEgJiYgbzIgIT09IG8yKSB7IHJldHVybiB0cnVlOyB9XG4gICAgbGV0IHQxID0gdHlwZW9mIG8xLCB0MiA9IHR5cGVvZiBvMiwga2V5OiBhbnksIGtleVNldDogYW55O1xuICAgIGlmICh0MSA9PT0gdDIgJiYgdDEgPT09ICdvYmplY3QnKSB7XG4gICAgICBrZXlTZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgZm9yIChrZXkgaW4gbzEpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVxdWFscyhvMVtrZXldLCBvMltrZXldKSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAga2V5U2V0W2tleV0gPSB0cnVlO1xuICAgICAgfVxuICAgICAgZm9yIChrZXkgaW4gbzIpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIGtleVNldCkgJiYga2V5LmNoYXJBdCgwKSAhPT0gJyQnICYmIG8yW2tleV0pIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGlzTWVudVZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICgodGhpcy5faW5wdXRGb2N1c2VkIHx8IHRoaXMubm9CbHVyKSAmJiB0aGlzLl9saXN0ICYmIHRoaXMuX2xpc3QubGVuZ3RoICYmXG4gICAgICAhdGhpcy5zZWxlY3RlZEl0ZW0pICYmICF0aGlzLnJlYWRvbmx5ID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBzY3JvbGwgb2Ygc3VnZ2VzdGlvbiBtZW51XG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVNjcm9sbCgpIHtcbiAgICBpZiAodGhpcy5fZm9jdXNlZE9wdGlvbiA8IDApIHsgcmV0dXJuOyB9XG4gICAgbGV0IG1lbnVDb250YWluZXIgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1kMi1hdXRvY29tcGxldGUtbWVudScpO1xuICAgIGlmICghbWVudUNvbnRhaW5lcikgeyByZXR1cm47IH1cblxuICAgIGxldCBjaG9pY2VzID0gbWVudUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcubWQyLW9wdGlvbicpO1xuICAgIGlmIChjaG9pY2VzLmxlbmd0aCA8IDEpIHsgcmV0dXJuOyB9XG5cbiAgICBsZXQgaGlnaGxpZ2h0ZWQ6IGFueSA9IGNob2ljZXNbdGhpcy5fZm9jdXNlZE9wdGlvbl07XG4gICAgaWYgKCFoaWdobGlnaHRlZCkgeyByZXR1cm47IH1cblxuICAgIGxldCB0b3A6IG51bWJlciA9IGhpZ2hsaWdodGVkLm9mZnNldFRvcCArIGhpZ2hsaWdodGVkLmNsaWVudEhlaWdodCAtIG1lbnVDb250YWluZXIuc2Nyb2xsVG9wO1xuICAgIGxldCBoZWlnaHQ6IG51bWJlciA9IG1lbnVDb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgaWYgKHRvcCA+IGhlaWdodCkge1xuICAgICAgbWVudUNvbnRhaW5lci5zY3JvbGxUb3AgKz0gdG9wIC0gaGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAodG9wIDwgaGlnaGxpZ2h0ZWQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICBtZW51Q29udGFpbmVyLnNjcm9sbFRvcCAtPSBoaWdobGlnaHRlZC5jbGllbnRIZWlnaHQgLSB0b3A7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGlucHV0IGV2ZW50IGxpc3RuZXJcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBfaGFuZGxlS2V5dXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICB0aGlzLnRleHRDaGFuZ2UuZW1pdCh0aGlzLl9pbnB1dFZhbHVlKTtcbiAgfVxuXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIFRBQjogdGhpcy5faGFuZGxlTW91c2VMZWF2ZSgpOyBicmVhaztcbiAgICAgIGNhc2UgRVNDQVBFOlxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMuX2lucHV0VmFsdWUpIHtcbiAgICAgICAgICB0aGlzLl9vbkNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAodGhpcy5pc01lbnVWaXNpYmxlKSB7XG4gICAgICAgICAgdGhpcy5fc2VsZWN0T3B0aW9uKGV2ZW50LCB0aGlzLl9mb2N1c2VkT3B0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKHRoaXMuaXNNZW51VmlzaWJsZSkge1xuICAgICAgICAgIHRoaXMuX2ZvY3VzZWRPcHRpb24gPSAodGhpcy5fZm9jdXNlZE9wdGlvbiA9PT0gdGhpcy5fbGlzdC5sZW5ndGggLSAxKSA/IDAgOlxuICAgICAgICAgICAgTWF0aC5taW4odGhpcy5fZm9jdXNlZE9wdGlvbiArIDEsIHRoaXMuX2xpc3QubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgdGhpcy51cGRhdGVTY3JvbGwoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAodGhpcy5pc01lbnVWaXNpYmxlKSB7XG4gICAgICAgICAgdGhpcy5fZm9jdXNlZE9wdGlvbiA9ICh0aGlzLl9mb2N1c2VkT3B0aW9uID09PSAwKSA/IHRoaXMuX2xpc3QubGVuZ3RoIC0gMSA6XG4gICAgICAgICAgICBNYXRoLm1heCgwLCB0aGlzLl9mb2N1c2VkT3B0aW9uIC0gMSk7XG4gICAgICAgICAgdGhpcy51cGRhdGVTY3JvbGwoKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlSXRlbXMoKTtcbiAgICAgICAgfSwgMTApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBzZWxlY3Qgb3B0aW9uXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAcGFyYW0gaW5kZXggb2Ygc2VsZWN0ZWQgaXRlbVxuICAgKi9cbiAgX3NlbGVjdE9wdGlvbihldmVudDogRXZlbnQsIGluZGV4OiBudW1iZXIpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gdGhpcy5fbGlzdFtpbmRleF07XG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9IHRoaXMuX2xpc3RbaW5kZXhdLnRleHQ7XG4gICAgdGhpcy51cGRhdGVWYWx1ZSgpO1xuICAgIHRoaXMuX2hhbmRsZU1vdXNlTGVhdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjbGVhciBzZWxlY3RlZCBzdWdnZXN0aW9uXG4gICAqL1xuICBfb25DbGVhcigpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9pbnB1dFZhbHVlID0gJyc7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBudWxsO1xuICAgIHRoaXMudXBkYXRlSXRlbXMoKTtcbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMuc2VsZWN0ZWRJdGVtID8gdGhpcy5zZWxlY3RlZEl0ZW0udmFsdWUgOiB0aGlzLnNlbGVjdGVkSXRlbTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVZhbHVlKCkge1xuICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5zZWxlY3RlZEl0ZW0gPyB0aGlzLnNlbGVjdGVkSXRlbS52YWx1ZSA6IHRoaXMuc2VsZWN0ZWRJdGVtO1xuICAgIHRoaXMuX2VtaXRDaGFuZ2VFdmVudCgpO1xuICAgIHRoaXMub25Gb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbXBvbmVudCBmb2N1cyBsaXN0ZW5lclxuICAgKi9cbiAgcHJpdmF0ZSBvbkZvY3VzKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmZvY3VzKCk7XG4gIH1cblxuICAvKipcbiAgICogaW5wdXQgZm9jdXMgbGlzdGVuZXJcbiAgICovXG4gIF9oYW5kbGVGb2N1cygpIHtcbiAgICB0aGlzLl9pbnB1dEZvY3VzZWQgPSB0cnVlO1xuICAgIHRoaXMudXBkYXRlSXRlbXMoKTtcbiAgICB0aGlzLl9mb2N1c2VkT3B0aW9uID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBpbnB1dCBibHVyIGxpc3RlbmVyXG4gICAqL1xuICBfaGFuZGxlQmx1cigpIHtcbiAgICB0aGlzLl9pbnB1dEZvY3VzZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9vblRvdWNoZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdWdnZXN0aW9uIG1lbnUgbW91c2UgZW50ZXIgbGlzdGVuZXJcbiAgICovXG4gIF9oYW5kbGVNb3VzZUVudGVyKCkgeyB0aGlzLm5vQmx1ciA9IHRydWU7IH1cblxuICAvKipcbiAgICogc3VnZ2VzdGlvbiBtZW51IG1vdXNlIGxlYXZlIGxpc3RlbmVyXG4gICAqL1xuICBfaGFuZGxlTW91c2VMZWF2ZSgpIHsgdGhpcy5ub0JsdXIgPSBmYWxzZTsgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgc3VnZ2VzdGlvbiB0byBmaWx0ZXIgdGhlIHF1ZXJ5XG4gICAqIEBwYXJhbSBxdWVyeVxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVJdGVtcygpIHtcbiAgICBpZiAodGhpcy5faW5wdXRWYWx1ZS5sZW5ndGggPCB0aGlzLm1pbkxlbmd0aCkge1xuICAgICAgdGhpcy5fbGlzdCA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9saXN0ID0gdGhpcy5faXRlbXMubWFwKChpOiBhbnkpID0+IG5ldyBJdGVtKGksIHRoaXMudGV4dEtleSxcbiAgICAgICAgdGhpcy52YWx1ZUtleSkpLmZpbHRlcihpID0+IG5ldyBSZWdFeHAodGhpcy5faW5wdXRWYWx1ZS50cmltKCksICdpZycpLnRlc3QoaS50ZXh0KSk7XG4gICAgICBpZiAodGhpcy5fbGlzdC5sZW5ndGggJiYgdGhpcy5fbGlzdFswXS50ZXh0ICE9PSB0aGlzLl9pbnB1dFZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfZW1pdENoYW5nZUV2ZW50KCk6IHZvaWQge1xuICAgIGxldCBldmVudCA9IG5ldyBNZDJBdXRvY29tcGxldGVDaGFuZ2UoKTtcbiAgICBldmVudC5zb3VyY2UgPSB0aGlzO1xuICAgIGV2ZW50LnZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgdGhpcy5fb25DaGFuZ2UoZXZlbnQudmFsdWUpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl92YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2lucHV0VmFsdWUgPSAnJztcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBsZXQgc2VsSXRtID0gdGhpcy5faXRlbXMuZmluZCgoaTogYW55KSA9PiB0aGlzLmVxdWFscyh0aGlzLnZhbHVlS2V5ID9cbiAgICAgICAgICBpW3RoaXMudmFsdWVLZXldIDogaSwgdmFsdWUpKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBuZXcgSXRlbShzZWxJdG0sIHRoaXMudGV4dEtleSwgdGhpcy52YWx1ZUtleSk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbSkgeyB0aGlzLl9pbnB1dFZhbHVlID0gdGhpcy5zZWxlY3RlZEl0ZW0udGV4dDsgfVxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLl9pbnB1dFZhbHVlKSB7IHRoaXMuX2lucHV0VmFsdWUgPSAnJzsgfVxuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7IHRoaXMuX29uQ2hhbmdlID0gZm47IH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4ge30pOiB2b2lkIHsgdGhpcy5fb25Ub3VjaGVkID0gZm47IH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG59XG4iXX0=