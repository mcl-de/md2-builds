/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, } from '@angular/forms';
import { coerceBooleanProperty, UP_ARROW, DOWN_ARROW, ENTER, ESCAPE, TAB } from '../core/core';
export class Item {
    /**
     * @param {?} source
     * @param {?} textKey
     * @param {?} valueKey
     */
    constructor(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
}
if (false) {
    /** @type {?} */
    Item.prototype.text;
    /** @type {?} */
    Item.prototype.value;
}
/** @type {?} */
let nextId = 0;
/** @type {?} */
export const MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Md2Autocomplete),
    multi: true
};
/**
 * Change event object emitted by Md2Autocomplete.
 */
export class Md2AutocompleteChange {
}
if (false) {
    /** @type {?} */
    Md2AutocompleteChange.prototype.source;
    /** @type {?} */
    Md2AutocompleteChange.prototype.value;
}
export class Md2Autocomplete {
    /**
     * @param {?} _element
     */
    constructor(_element) {
        this._element = _element;
        this.change = new EventEmitter();
        this.textChange = new EventEmitter();
        this._value = '';
        this._readonly = false;
        this._required = false;
        this._disabled = false;
        this._isInitialized = false;
        this._onChange = () => { };
        this._onTouched = () => { };
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
    ngAfterContentInit() { this._isInitialized = true; }
    /**
     * @return {?}
     */
    get readonly() { return this._readonly; }
    /**
     * @param {?} value
     * @return {?}
     */
    set readonly(value) { this._readonly = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * @param {?} value
     * @return {?}
     */
    set items(value) { this._items = value; }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (value !== this._value) {
            this._value = value;
            this._inputValue = '';
            if (value) {
                /** @type {?} */
                let selItm = this._items.find((i) => this.equals(this.valueKey ?
                    i[this.valueKey] : i, value));
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
    }
    /**
     * Compare two vars or objects
     * @param {?} o1 compare first object
     * @param {?} o2 compare second object
     * @return {?} boolean comparation result
     */
    equals(o1, o2) {
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
        let t1 = typeof o1;
        /** @type {?} */
        let t2 = typeof o2;
        /** @type {?} */
        let key;
        /** @type {?} */
        let keySet;
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
    }
    /**
     * @return {?}
     */
    get isMenuVisible() {
        return ((this._inputFocused || this.noBlur) && this._list && this._list.length &&
            !this.selectedItem) && !this.readonly ? true : false;
    }
    /**
     * update scroll of suggestion menu
     * @return {?}
     */
    updateScroll() {
        if (this._focusedOption < 0) {
            return;
        }
        /** @type {?} */
        let menuContainer = this._element.nativeElement.querySelector('.md2-autocomplete-menu');
        if (!menuContainer) {
            return;
        }
        /** @type {?} */
        let choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        /** @type {?} */
        let highlighted = choices[this._focusedOption];
        if (!highlighted) {
            return;
        }
        /** @type {?} */
        let top = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
        /** @type {?} */
        let height = menuContainer.offsetHeight;
        if (top > height) {
            menuContainer.scrollTop += top - height;
        }
        else if (top < highlighted.clientHeight) {
            menuContainer.scrollTop -= highlighted.clientHeight - top;
        }
    }
    /**
     * input event listner
     * @param {?} event
     * @return {?}
     */
    _handleKeyup(event) {
        this.textChange.emit(this._inputValue);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
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
                setTimeout(() => {
                    this.updateItems();
                }, 10);
        }
    }
    /**
     * select option
     * @param {?} event
     * @param {?} index of selected item
     * @return {?}
     */
    _selectOption(event, index) {
        event.preventDefault();
        event.stopPropagation();
        this.selectedItem = this._list[index];
        this._inputValue = this._list[index].text;
        this.updateValue();
        this._handleMouseLeave();
    }
    /**
     * clear selected suggestion
     * @return {?}
     */
    _onClear() {
        if (this.disabled) {
            return;
        }
        this._inputValue = '';
        this.selectedItem = null;
        this.updateItems();
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this.updateValue();
    }
    /**
     * update value
     * @return {?}
     */
    updateValue() {
        this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
        this._emitChangeEvent();
        this.onFocus();
    }
    /**
     * component focus listener
     * @return {?}
     */
    onFocus() {
        if (this.disabled) {
            return;
        }
        this._element.nativeElement.querySelector('input').focus();
    }
    /**
     * input focus listener
     * @return {?}
     */
    _handleFocus() {
        this._inputFocused = true;
        this.updateItems();
        this._focusedOption = 0;
    }
    /**
     * input blur listener
     * @return {?}
     */
    _handleBlur() {
        this._inputFocused = false;
        this._onTouched();
    }
    /**
     * suggestion menu mouse enter listener
     * @return {?}
     */
    _handleMouseEnter() { this.noBlur = true; }
    /**
     * suggestion menu mouse leave listener
     * @return {?}
     */
    _handleMouseLeave() { this.noBlur = false; }
    /**
     * Update suggestion to filter the query
     * @return {?}
     */
    updateItems() {
        if (this._inputValue.length < this.minLength) {
            this._list = [];
        }
        else {
            this._list = this._items.map((i) => new Item(i, this.textKey, this.valueKey)).filter(i => new RegExp(this._inputValue.trim(), 'ig').test(i.text));
            if (this._list.length && this._list[0].text !== this._inputValue) {
                this.selectedItem = null;
            }
        }
    }
    /**
     * @return {?}
     */
    _emitChangeEvent() {
        /** @type {?} */
        let event = new Md2AutocompleteChange();
        event.source = this;
        event.value = this._value;
        this._onChange(event.value);
        this.change.emit(event);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this._value) {
            this._value = value;
            this._inputValue = '';
            if (value) {
                /** @type {?} */
                let selItm = this._items.find((i) => this.equals(this.valueKey ?
                    i[this.valueKey] : i, value));
                this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
                if (this.selectedItem) {
                    this._inputValue = this.selectedItem.text;
                }
            }
            if (!this._inputValue) {
                this._inputValue = '';
            }
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChange = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this._onTouched = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
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
Md2Autocomplete.ctorParameters = () => [
    { type: ElementRef }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvYXV0b2NvbXBsZXRlL2F1dG9jb21wbGV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsaUJBQWlCLEdBRWxCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUNMLHFCQUFxQixFQUNyQixRQUFRLEVBQ1IsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sR0FBRyxFQUNKLE1BQU0sY0FBYyxDQUFDO0FBRXRCLE1BQU07Ozs7OztJQUlKLFlBQVksTUFBVyxFQUFFLE9BQWUsRUFBRSxRQUFnQjtRQUN4RCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQ25EO0tBQ0Y7Q0FDRjs7Ozs7Ozs7QUFFRCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7O0FBRWYsYUFBYSx1Q0FBdUMsR0FBUTtJQUMxRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO0lBQzlDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQzs7OztBQUdGLE1BQU07Q0FHTDs7Ozs7OztBQW9CRCxNQUFNOzs7O0lBRUosWUFBb0IsUUFBb0I7UUFBcEIsYUFBUSxHQUFSLFFBQVEsQ0FBWTtzQkFJRixJQUFJLFlBQVksRUFBTzswQkFDdEMsSUFBSSxZQUFZLEVBQUU7c0JBRW5CLEVBQUU7eUJBQ0ssS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7OEJBQ0EsS0FBSzt5QkFFTCxHQUFHLEVBQUUsSUFBSTswQkFDOUIsR0FBRyxFQUFFLElBQUk7c0JBRU8sRUFBRTtxQkFDVixFQUFFOzRCQUVNLElBQUk7c0JBQ1AsS0FBSzs4QkFDTixDQUFDOzJCQUNKLEVBQUU7NkJBQ0MsS0FBSztrQkFFUixtQkFBbUIsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDO3dCQUMxQixDQUFDOzJCQUNFLEVBQUU7dUJBQ0ssTUFBTTt3QkFDSixJQUFJO3lCQUNILENBQUM7S0E5Qkc7Ozs7SUFFN0Msa0JBQWtCLEtBQUssSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsRUFBRTs7OztJQThCcEQsSUFDSSxRQUFRLEtBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Ozs7O0lBQ2xELElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFdEUsSUFDSSxRQUFRLEtBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Ozs7O0lBQ2xELElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Ozs7SUFFdEUsSUFDSSxRQUFRLEtBQWMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7Ozs7O0lBQ2xELElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Ozs7O0lBRXRFLElBQ0ksS0FBSyxDQUFDLEtBQWlCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsRUFBRTs7OztJQUVyRCxJQUNJLEtBQUssS0FBVSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTs7Ozs7SUFDeEMsSUFBSSxLQUFLLENBQUMsS0FBVTtRQUNsQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksS0FBSyxFQUFFOztnQkFDVCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ25FLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7aUJBQUU7YUFDdEU7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQzthQUFFO1lBQ2pELElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDekI7U0FDRjtLQUNGOzs7Ozs7O0lBUU8sTUFBTSxDQUFDLEVBQU8sRUFBRSxFQUFPO1FBQzdCLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7UUFDL0IsSUFBSSxFQUFFLEtBQUssSUFBSSxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFBRSxPQUFPLEtBQUssQ0FBQztTQUFFO1FBQ2pELElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQUUsT0FBTyxJQUFJLENBQUM7U0FBRTs7UUFDNUMsSUFBSSxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQXdDOztRQUExRCxJQUFvQixFQUFFLEdBQUcsT0FBTyxFQUFFLENBQXdCOztRQUExRCxJQUFvQyxHQUFHLENBQW1COztRQUExRCxJQUE4QyxNQUFNLENBQU07UUFDMUQsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxRQUFRLEVBQUU7WUFDaEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsS0FBSyxHQUFHLElBQUksRUFBRSxFQUFFO2dCQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFBRSxPQUFPLEtBQUssQ0FBQztpQkFBRTtnQkFDckQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQzthQUNwQjtZQUNELEtBQUssR0FBRyxJQUFJLEVBQUUsRUFBRTtnQkFDZCxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUFFLE9BQU8sS0FBSyxDQUFDO2lCQUFFO2FBQzVFO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDOzs7OztJQUdmLElBQUksYUFBYTtRQUNmLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQzVFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDeEQ7Ozs7O0lBS08sWUFBWTtRQUNsQixJQUFJLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUFFO1lBQUUsT0FBTztTQUFFOztRQUN4QyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsYUFBYSxFQUFFO1lBQUUsT0FBTztTQUFFOztRQUUvQixJQUFJLE9BQU8sR0FBRyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUQsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUFFLE9BQU87U0FBRTs7UUFFbkMsSUFBSSxXQUFXLEdBQVEsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQUUsT0FBTztTQUFFOztRQUU3QixJQUFJLEdBQUcsR0FBVyxXQUFXLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQzs7UUFDN0YsSUFBSSxNQUFNLEdBQVcsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUVoRCxJQUFJLEdBQUcsR0FBRyxNQUFNLEVBQUU7WUFDaEIsYUFBYSxDQUFDLFNBQVMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLFlBQVksRUFBRTtZQUN6QyxhQUFhLENBQUMsU0FBUyxJQUFJLFdBQVcsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1NBQzNEOzs7Ozs7O0lBT0gsWUFBWSxDQUFDLEtBQW9CO1FBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUN4Qzs7Ozs7SUFFRCxjQUFjLENBQUMsS0FBb0I7UUFDakMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQzlCLFFBQVEsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNyQixLQUFLLEdBQUc7Z0JBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQUMsTUFBTTtZQUMxQyxLQUFLLE1BQU07Z0JBQ1QsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNqQjtnQkFDRCxNQUFNO1lBRVIsS0FBSyxLQUFLO2dCQUNSLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN4QixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDaEQ7Z0JBQ0QsTUFBTTtZQUVSLEtBQUssVUFBVTtnQkFDYixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3pFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDckI7Z0JBQ0QsTUFBTTtZQUNSLEtBQUssUUFBUTtnQkFDWCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ3pFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDckI7Z0JBQ0QsTUFBTTtZQUNSO2dCQUNFLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUNwQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ1Y7S0FDRjs7Ozs7OztJQU9ELGFBQWEsQ0FBQyxLQUFZLEVBQUUsS0FBYTtRQUN2QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztLQUMxQjs7Ozs7SUFLRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzlFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQjs7Ozs7SUFLTyxXQUFXO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDOUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7Ozs7SUFNVCxPQUFPO1FBQ2IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Ozs7O0lBTTdELFlBQVk7UUFDVixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7S0FDekI7Ozs7O0lBS0QsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNuQjs7Ozs7SUFLRCxpQkFBaUIsS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFOzs7OztJQUszQyxpQkFBaUIsS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxFQUFFOzs7OztJQU1wQyxXQUFXO1FBQ2pCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNqQjthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDMUI7U0FDRjs7Ozs7SUFHSCxnQkFBZ0I7O1FBQ2QsSUFBSSxLQUFLLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO1FBQ3hDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6Qjs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBVTtRQUNuQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLElBQUksS0FBSyxFQUFFOztnQkFDVCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ25FLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7aUJBQUU7YUFDdEU7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQzthQUFFO1NBQ2xEO0tBQ0Y7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsRUFBd0IsSUFBVSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFOzs7OztJQUV6RSxpQkFBaUIsQ0FBQyxFQUFZLElBQVUsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsRUFBRTs7Ozs7SUFFL0QsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7S0FDNUI7OztZQW5URixTQUFTLFNBQUM7Z0JBRVQsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIseXNDQUFnQztnQkFFaEMsU0FBUyxFQUFFLENBQUMsdUNBQXVDLENBQUM7Z0JBQ3BELElBQUksRUFBRTtvQkFDSixNQUFNLEVBQUUsY0FBYztvQkFDdEIsTUFBTSxFQUFFLElBQUk7b0JBQ1osbUJBQW1CLEVBQUUsYUFBYTtvQkFDbEMsc0JBQXNCLEVBQUUscUJBQXFCO29CQUM3QyxzQkFBc0IsRUFBRSxxQkFBcUI7b0JBQzdDLG1DQUFtQyxFQUFFLFVBQVU7aUJBQ2hEO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUUsaUJBQWlCOzthQUM1Qjs7OztZQWpFQyxVQUFVOzs7cUJBeUVULE1BQU07eUJBQ04sTUFBTTtpQkFvQk4sS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7c0JBQ0wsS0FBSyxTQUFDLFdBQVc7dUJBQ2pCLEtBQUssU0FBQyxZQUFZO3dCQUNsQixLQUFLLFNBQUMsWUFBWTt1QkFFbEIsS0FBSzt1QkFJTCxLQUFLO3VCQUlMLEtBQUs7b0JBSUwsS0FBSztvQkFHTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBjb2VyY2VCb29sZWFuUHJvcGVydHksXG4gIFVQX0FSUk9XLFxuICBET1dOX0FSUk9XLFxuICBFTlRFUixcbiAgRVNDQVBFLFxuICBUQUJcbn0gZnJvbSAnLi4vY29yZS9jb3JlJztcblxuZXhwb3J0IGNsYXNzIEl0ZW0ge1xuICB0ZXh0OiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Ioc291cmNlOiBhbnksIHRleHRLZXk6IHN0cmluZywgdmFsdWVLZXk6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy50ZXh0ID0gdGhpcy52YWx1ZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLnRleHQgPSBzb3VyY2VbdGV4dEtleV07XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWVLZXkgPyBzb3VyY2VbdmFsdWVLZXldIDogc291cmNlO1xuICAgIH1cbiAgfVxufVxuXG5sZXQgbmV4dElkID0gMDtcblxuZXhwb3J0IGNvbnN0IE1EMl9BVVRPQ09NUExFVEVfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWQyQXV0b2NvbXBsZXRlKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbi8qKiBDaGFuZ2UgZXZlbnQgb2JqZWN0IGVtaXR0ZWQgYnkgTWQyQXV0b2NvbXBsZXRlLiAqL1xuZXhwb3J0IGNsYXNzIE1kMkF1dG9jb21wbGV0ZUNoYW5nZSB7XG4gIHNvdXJjZTogTWQyQXV0b2NvbXBsZXRlO1xuICB2YWx1ZTogYW55O1xufVxuXG5AQ29tcG9uZW50KHtcbiAgXG4gIHNlbGVjdG9yOiAnbWQyLWF1dG9jb21wbGV0ZScsXG4gIHRlbXBsYXRlVXJsOiAnYXV0b2NvbXBsZXRlLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnYXV0b2NvbXBsZXRlLnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbTUQyX0FVVE9DT01QTEVURV9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ2F1dG9jb21wbGV0ZScsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsXSc6ICdwbGFjZWhvbGRlcicsXG4gICAgJ1thdHRyLmFyaWEtcmVxdWlyZWRdJzogJ3JlcXVpcmVkLnRvU3RyaW5nKCknLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZC50b1N0cmluZygpJyxcbiAgICAnW2NsYXNzLm1kMi1hdXRvY29tcGxldGUtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgZXhwb3J0QXM6ICdtZDJBdXRvY29tcGxldGUnXG59KVxuXG5leHBvcnQgY2xhc3MgTWQyQXV0b2NvbXBsZXRlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHsgdGhpcy5faXNJbml0aWFsaXplZCA9IHRydWU7IH1cblxuICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgdGV4dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIF92YWx1ZTogYW55ID0gJyc7XG4gIHByaXZhdGUgX3JlYWRvbmx5OiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX3JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2lzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBfb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4geyB9O1xuICBfb25Ub3VjaGVkID0gKCkgPT4geyB9O1xuXG4gIHByaXZhdGUgX2l0ZW1zOiBBcnJheTxhbnk+ID0gW107XG4gIF9saXN0OiBBcnJheTxJdGVtPiA9IFtdO1xuXG4gIHByaXZhdGUgc2VsZWN0ZWRJdGVtOiBJdGVtID0gbnVsbDtcbiAgcHJpdmF0ZSBub0JsdXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2ZvY3VzZWRPcHRpb246IG51bWJlciA9IDA7XG4gIF9pbnB1dFZhbHVlOiBzdHJpbmcgPSAnJztcbiAgX2lucHV0Rm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSAnbWQyLWF1dG9jb21wbGV0ZS0nICsgKCsrbmV4dElkKTtcbiAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCdpdGVtLXRleHQnKSB0ZXh0S2V5OiBzdHJpbmcgPSAndGV4dCc7XG4gIEBJbnB1dCgnaXRlbS12YWx1ZScpIHZhbHVlS2V5OiBzdHJpbmcgPSBudWxsO1xuICBASW5wdXQoJ21pbi1sZW5ndGgnKSBtaW5MZW5ndGg6IG51bWJlciA9IDE7XG5cbiAgQElucHV0KClcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVhZG9ubHk7IH1cbiAgc2V0IHJlYWRvbmx5KHZhbHVlKSB7IHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3JlcXVpcmVkOyB9XG4gIHNldCByZXF1aXJlZCh2YWx1ZSkgeyB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQodmFsdWUpIHsgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgQElucHV0KClcbiAgc2V0IGl0ZW1zKHZhbHVlOiBBcnJheTxhbnk+KSB7IHRoaXMuX2l0ZW1zID0gdmFsdWU7IH1cblxuICBASW5wdXQoKVxuICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuX3ZhbHVlOyB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl92YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2lucHV0VmFsdWUgPSAnJztcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBsZXQgc2VsSXRtID0gdGhpcy5faXRlbXMuZmluZCgoaTogYW55KSA9PiB0aGlzLmVxdWFscyh0aGlzLnZhbHVlS2V5ID9cbiAgICAgICAgICBpW3RoaXMudmFsdWVLZXldIDogaSwgdmFsdWUpKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBuZXcgSXRlbShzZWxJdG0sIHRoaXMudGV4dEtleSwgdGhpcy52YWx1ZUtleSk7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbSkgeyB0aGlzLl9pbnB1dFZhbHVlID0gdGhpcy5zZWxlY3RlZEl0ZW0udGV4dDsgfVxuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLl9pbnB1dFZhbHVlKSB7IHRoaXMuX2lucHV0VmFsdWUgPSAnJzsgfVxuICAgICAgaWYgKHRoaXMuX2lzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdGhpcy5fZW1pdENoYW5nZUV2ZW50KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmUgdHdvIHZhcnMgb3Igb2JqZWN0c1xuICAgKiBAcGFyYW0gbzEgY29tcGFyZSBmaXJzdCBvYmplY3RcbiAgICogQHBhcmFtIG8yIGNvbXBhcmUgc2Vjb25kIG9iamVjdFxuICAgKiBAcmV0dXJuIGJvb2xlYW4gY29tcGFyYXRpb24gcmVzdWx0XG4gICAqL1xuICBwcml2YXRlIGVxdWFscyhvMTogYW55LCBvMjogYW55KSB7XG4gICAgaWYgKG8xID09PSBvMikgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIGlmIChvMSA9PT0gbnVsbCB8fCBvMiA9PT0gbnVsbCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAobzEgIT09IG8xICYmIG8yICE9PSBvMikgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIGxldCB0MSA9IHR5cGVvZiBvMSwgdDIgPSB0eXBlb2YgbzIsIGtleTogYW55LCBrZXlTZXQ6IGFueTtcbiAgICBpZiAodDEgPT09IHQyICYmIHQxID09PSAnb2JqZWN0Jykge1xuICAgICAga2V5U2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIGZvciAoa2V5IGluIG8xKSB7XG4gICAgICAgIGlmICghdGhpcy5lcXVhbHMobzFba2V5XSwgbzJba2V5XSkpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIGtleVNldFtrZXldID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvciAoa2V5IGluIG8yKSB7XG4gICAgICAgIGlmICghKGtleSBpbiBrZXlTZXQpICYmIGtleS5jaGFyQXQoMCkgIT09ICckJyAmJiBvMltrZXldKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBpc01lbnVWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoKHRoaXMuX2lucHV0Rm9jdXNlZCB8fCB0aGlzLm5vQmx1cikgJiYgdGhpcy5fbGlzdCAmJiB0aGlzLl9saXN0Lmxlbmd0aCAmJlxuICAgICAgIXRoaXMuc2VsZWN0ZWRJdGVtKSAmJiAhdGhpcy5yZWFkb25seSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1cGRhdGUgc2Nyb2xsIG9mIHN1Z2dlc3Rpb24gbWVudVxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVTY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMuX2ZvY3VzZWRPcHRpb24gPCAwKSB7IHJldHVybjsgfVxuICAgIGxldCBtZW51Q29udGFpbmVyID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZDItYXV0b2NvbXBsZXRlLW1lbnUnKTtcbiAgICBpZiAoIW1lbnVDb250YWluZXIpIHsgcmV0dXJuOyB9XG5cbiAgICBsZXQgY2hvaWNlcyA9IG1lbnVDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLm1kMi1vcHRpb24nKTtcbiAgICBpZiAoY2hvaWNlcy5sZW5ndGggPCAxKSB7IHJldHVybjsgfVxuXG4gICAgbGV0IGhpZ2hsaWdodGVkOiBhbnkgPSBjaG9pY2VzW3RoaXMuX2ZvY3VzZWRPcHRpb25dO1xuICAgIGlmICghaGlnaGxpZ2h0ZWQpIHsgcmV0dXJuOyB9XG5cbiAgICBsZXQgdG9wOiBudW1iZXIgPSBoaWdobGlnaHRlZC5vZmZzZXRUb3AgKyBoaWdobGlnaHRlZC5jbGllbnRIZWlnaHQgLSBtZW51Q29udGFpbmVyLnNjcm9sbFRvcDtcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXIgPSBtZW51Q29udGFpbmVyLm9mZnNldEhlaWdodDtcblxuICAgIGlmICh0b3AgPiBoZWlnaHQpIHtcbiAgICAgIG1lbnVDb250YWluZXIuc2Nyb2xsVG9wICs9IHRvcCAtIGhlaWdodDtcbiAgICB9IGVsc2UgaWYgKHRvcCA8IGhpZ2hsaWdodGVkLmNsaWVudEhlaWdodCkge1xuICAgICAgbWVudUNvbnRhaW5lci5zY3JvbGxUb3AgLT0gaGlnaGxpZ2h0ZWQuY2xpZW50SGVpZ2h0IC0gdG9wO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBpbnB1dCBldmVudCBsaXN0bmVyXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgX2hhbmRsZUtleXVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgdGhpcy50ZXh0Q2hhbmdlLmVtaXQodGhpcy5faW5wdXRWYWx1ZSk7XG4gIH1cblxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSBUQUI6IHRoaXMuX2hhbmRsZU1vdXNlTGVhdmUoKTsgYnJlYWs7XG4gICAgICBjYXNlIEVTQ0FQRTpcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLl9pbnB1dFZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5fb25DbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVOVEVSOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKHRoaXMuaXNNZW51VmlzaWJsZSkge1xuICAgICAgICAgIHRoaXMuX3NlbGVjdE9wdGlvbihldmVudCwgdGhpcy5fZm9jdXNlZE9wdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRE9XTl9BUlJPVzpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmICh0aGlzLmlzTWVudVZpc2libGUpIHtcbiAgICAgICAgICB0aGlzLl9mb2N1c2VkT3B0aW9uID0gKHRoaXMuX2ZvY3VzZWRPcHRpb24gPT09IHRoaXMuX2xpc3QubGVuZ3RoIC0gMSkgPyAwIDpcbiAgICAgICAgICAgIE1hdGgubWluKHRoaXMuX2ZvY3VzZWRPcHRpb24gKyAxLCB0aGlzLl9saXN0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKHRoaXMuaXNNZW51VmlzaWJsZSkge1xuICAgICAgICAgIHRoaXMuX2ZvY3VzZWRPcHRpb24gPSAodGhpcy5fZm9jdXNlZE9wdGlvbiA9PT0gMCkgPyB0aGlzLl9saXN0Lmxlbmd0aCAtIDEgOlxuICAgICAgICAgICAgTWF0aC5tYXgoMCwgdGhpcy5fZm9jdXNlZE9wdGlvbiAtIDEpO1xuICAgICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUl0ZW1zKCk7XG4gICAgICAgIH0sIDEwKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogc2VsZWN0IG9wdGlvblxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQHBhcmFtIGluZGV4IG9mIHNlbGVjdGVkIGl0ZW1cbiAgICovXG4gIF9zZWxlY3RPcHRpb24oZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IHRoaXMuX2xpc3RbaW5kZXhdO1xuICAgIHRoaXMuX2lucHV0VmFsdWUgPSB0aGlzLl9saXN0W2luZGV4XS50ZXh0O1xuICAgIHRoaXMudXBkYXRlVmFsdWUoKTtcbiAgICB0aGlzLl9oYW5kbGVNb3VzZUxlYXZlKCk7XG4gIH1cblxuICAvKipcbiAgICogY2xlYXIgc2VsZWN0ZWQgc3VnZ2VzdGlvblxuICAgKi9cbiAgX29uQ2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9ICcnO1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gbnVsbDtcbiAgICB0aGlzLnVwZGF0ZUl0ZW1zKCk7XG4gICAgdGhpcy5fdmFsdWUgPSB0aGlzLnNlbGVjdGVkSXRlbSA/IHRoaXMuc2VsZWN0ZWRJdGVtLnZhbHVlIDogdGhpcy5zZWxlY3RlZEl0ZW07XG4gICAgdGhpcy51cGRhdGVWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVWYWx1ZSgpIHtcbiAgICB0aGlzLl92YWx1ZSA9IHRoaXMuc2VsZWN0ZWRJdGVtID8gdGhpcy5zZWxlY3RlZEl0ZW0udmFsdWUgOiB0aGlzLnNlbGVjdGVkSXRlbTtcbiAgICB0aGlzLl9lbWl0Q2hhbmdlRXZlbnQoKTtcbiAgICB0aGlzLm9uRm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb21wb25lbnQgZm9jdXMgbGlzdGVuZXJcbiAgICovXG4gIHByaXZhdGUgb25Gb2N1cygpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKS5mb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIGlucHV0IGZvY3VzIGxpc3RlbmVyXG4gICAqL1xuICBfaGFuZGxlRm9jdXMoKSB7XG4gICAgdGhpcy5faW5wdXRGb2N1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLnVwZGF0ZUl0ZW1zKCk7XG4gICAgdGhpcy5fZm9jdXNlZE9wdGlvbiA9IDA7XG4gIH1cblxuICAvKipcbiAgICogaW5wdXQgYmx1ciBsaXN0ZW5lclxuICAgKi9cbiAgX2hhbmRsZUJsdXIoKSB7XG4gICAgdGhpcy5faW5wdXRGb2N1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5fb25Ub3VjaGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogc3VnZ2VzdGlvbiBtZW51IG1vdXNlIGVudGVyIGxpc3RlbmVyXG4gICAqL1xuICBfaGFuZGxlTW91c2VFbnRlcigpIHsgdGhpcy5ub0JsdXIgPSB0cnVlOyB9XG5cbiAgLyoqXG4gICAqIHN1Z2dlc3Rpb24gbWVudSBtb3VzZSBsZWF2ZSBsaXN0ZW5lclxuICAgKi9cbiAgX2hhbmRsZU1vdXNlTGVhdmUoKSB7IHRoaXMubm9CbHVyID0gZmFsc2U7IH1cblxuICAvKipcbiAgICogVXBkYXRlIHN1Z2dlc3Rpb24gdG8gZmlsdGVyIHRoZSBxdWVyeVxuICAgKiBAcGFyYW0gcXVlcnlcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlSXRlbXMoKSB7XG4gICAgaWYgKHRoaXMuX2lucHV0VmFsdWUubGVuZ3RoIDwgdGhpcy5taW5MZW5ndGgpIHtcbiAgICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGlzdCA9IHRoaXMuX2l0ZW1zLm1hcCgoaTogYW55KSA9PiBuZXcgSXRlbShpLCB0aGlzLnRleHRLZXksXG4gICAgICAgIHRoaXMudmFsdWVLZXkpKS5maWx0ZXIoaSA9PiBuZXcgUmVnRXhwKHRoaXMuX2lucHV0VmFsdWUudHJpbSgpLCAnaWcnKS50ZXN0KGkudGV4dCkpO1xuICAgICAgaWYgKHRoaXMuX2xpc3QubGVuZ3RoICYmIHRoaXMuX2xpc3RbMF0udGV4dCAhPT0gdGhpcy5faW5wdXRWYWx1ZSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2VtaXRDaGFuZ2VFdmVudCgpOiB2b2lkIHtcbiAgICBsZXQgZXZlbnQgPSBuZXcgTWQyQXV0b2NvbXBsZXRlQ2hhbmdlKCk7XG4gICAgZXZlbnQuc291cmNlID0gdGhpcztcbiAgICBldmVudC52YWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgIHRoaXMuX29uQ2hhbmdlKGV2ZW50LnZhbHVlKTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl9pbnB1dFZhbHVlID0gJyc7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgbGV0IHNlbEl0bSA9IHRoaXMuX2l0ZW1zLmZpbmQoKGk6IGFueSkgPT4gdGhpcy5lcXVhbHModGhpcy52YWx1ZUtleSA/XG4gICAgICAgICAgaVt0aGlzLnZhbHVlS2V5XSA6IGksIHZhbHVlKSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gbmV3IEl0ZW0oc2VsSXRtLCB0aGlzLnRleHRLZXksIHRoaXMudmFsdWVLZXkpO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW0pIHsgdGhpcy5faW5wdXRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRJdGVtLnRleHQ7IH1cbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5faW5wdXRWYWx1ZSkgeyB0aGlzLl9pbnB1dFZhbHVlID0gJyc7IH1cbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQgeyB0aGlzLl9vbkNoYW5nZSA9IGZuOyB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7IHRoaXMuX29uVG91Y2hlZCA9IGZuOyB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxufVxuIl19