/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR, } from '@angular/forms';
import { coerceBooleanProperty, LEFT_ARROW, RIGHT_ARROW, BACKSPACE, DELETE, TAB, ESCAPE } from '../core/core';
/** @type {?} */
const noop = () => { };
const ɵ0 = noop;
/** @type {?} */
let nextId = 0;
export class Tag {
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
    Tag.prototype.text;
    /** @type {?} */
    Tag.prototype.value;
}
/** @type {?} */
export const MD2_TAGS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Md2Tags),
    multi: true
};
export class Md2Tags {
    /**
     * @param {?} _element
     */
    constructor(_element) {
        this._element = _element;
        this.change = new EventEmitter();
        this._value = '';
        this._disabled = false;
        this._isInitialized = false;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._tags = [];
        this._list = [];
        this._items = [];
        this._focusedTag = 0;
        this._selectedTag = -1;
        this._inputValue = '';
        this._inputFocused = false;
        this.noBlur = true;
        this.id = 'md2-tags-' + (++nextId);
        this.tabindex = 0;
        this.placeholder = '';
        this.textKey = 'text';
        this.valueKey = null;
        this.selectAndFocusTagSafe = function (index) {
            if (!this._items.length) {
                this._selectTag(-1);
                this._handleFocus();
                return;
            }
            if (index === this._items.length) {
                return this._handleFocus();
            }
            index = Math.max(index, 0);
            index = Math.min(index, this._items.length - 1);
            this._selectTag(index);
        };
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() { this._isInitialized = true; }
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
    set tags(value) { this._tags = value; }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) { this.setValue(value); }
    /**
     * setup value
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    /** @type {?} */
                    let selItm = this._tags.find((t) => this.equals(this.valueKey ?
                        t[this.valueKey] : t, value[i]));
                    if (selItm) {
                        this._items.push(new Tag(selItm, this.textKey, this.valueKey));
                    }
                }
            }
            if (this._isInitialized) {
                this._onChangeCallback(value);
                this.change.emit(this._value);
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
        return ((this._inputFocused || this.noBlur) && this._inputValue &&
            this._list && this._list.length) ? true : false;
    }
    /**
     * update scroll of tags suggestion menu
     * @return {?}
     */
    updateScroll() {
        if (this._focusedTag < 0) {
            return;
        }
        /** @type {?} */
        let menuContainer = this._element.nativeElement.querySelector('.md2-tags-menu');
        if (!menuContainer) {
            return;
        }
        /** @type {?} */
        let choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        /** @type {?} */
        let highlighted = choices[this._focusedTag];
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
     * input key listener
     * @param {?} event
     * @return {?}
     */
    _handleInputKeydown(event) {
        // Backspace
        if (event.keyCode === 8 && !this._inputValue) {
            event.preventDefault();
            event.stopPropagation();
            if (this._items.length && this._selectedTag < 0) {
                this.selectAndFocusTagSafe(this._items.length - 1);
            }
            if (this._items.length && this._selectedTag > -1) {
                this.removeAndSelectAdjacentTag(this._selectedTag);
            }
            return;
        }
        // Del Key
        if (event.keyCode === 46 && !this._inputValue) {
            return;
        }
        // Left / Right Arrow
        if ((event.keyCode === 37 || event.keyCode === 39) && !this._inputValue) {
            return;
        }
        // Down Arrow
        if (event.keyCode === 40) {
            if (!this.isMenuVisible) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            this._focusedTag = (this._focusedTag === this._list.length - 1) ?
                0 : Math.min(this._focusedTag + 1, this._list.length - 1);
            this.updateScroll();
            return;
        }
        // Up Arrow
        if (event.keyCode === 38) {
            if (!this.isMenuVisible) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            this._focusedTag = (this._focusedTag === 0) ?
                this._list.length - 1 : Math.max(0, this._focusedTag - 1);
            this.updateScroll();
            return;
        }
        // Tab Key
        if (event.keyCode === 9) {
            return;
        }
        // Enter / Space
        if (event.keyCode === 13 || event.keyCode === 32) {
            if (!this._inputValue || !this.isMenuVisible) {
                event.preventDefault();
                return;
            }
            event.preventDefault();
            this._addTag(event, this._focusedTag);
            return;
        }
        // Escape Key
        if (event.keyCode === 27) {
            event.stopPropagation();
            event.preventDefault();
            if (this._inputValue) {
                this._inputValue = '';
            }
            if (this._selectedTag >= 0) {
                this._handleFocus();
            }
            return;
        }
        // reset selected tag
        if (this._selectedTag >= 0) {
            this.resetselectedTag();
        }
        // filter
        setTimeout(() => {
            this.filterMatches();
        }, 10);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        if (this.disabled || this._inputValue) {
            return;
        }
        switch (event.keyCode) {
            case BACKSPACE:
            case DELETE:
                if (this._selectedTag < 0) {
                    return;
                }
                event.preventDefault();
                this.removeAndSelectAdjacentTag(this._selectedTag);
                break;
            case TAB:
            case ESCAPE:
                if (this._selectedTag < 0) {
                    return;
                }
                event.preventDefault();
                this._handleFocus();
                break;
            case LEFT_ARROW:
                event.preventDefault();
                if (this._selectedTag < 0) {
                    this._selectedTag = this._items.length;
                }
                if (this._items.length) {
                    this.selectAndFocusTagSafe(this._selectedTag - 1);
                }
                break;
            case RIGHT_ARROW:
                event.preventDefault();
                if (this._selectedTag >= this._items.length) {
                    this._selectedTag = -1;
                }
                this.selectAndFocusTagSafe(this._selectedTag + 1);
                break;
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeAndSelectAdjacentTag(index) {
        /** @type {?} */
        let selIndex = this.getAdjacentTagIndex(index);
        this.removeTag(index);
        this.selectAndFocusTagSafe(selIndex);
    }
    /**
     * @return {?}
     */
    resetselectedTag() {
        this._selectedTag = -1;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getAdjacentTagIndex(index) {
        /** @type {?} */
        let len = this._items.length - 1;
        return (len === 0) ? -1 :
            (index === len) ? index - 1 : index;
    }
    /**
     * add tag
     * @param {?} event
     * @param {?} index index of the specific tag
     * @return {?}
     */
    _addTag(event, index) {
        event.preventDefault();
        event.stopPropagation();
        this._items.push(this._list[index]);
        this._inputValue = '';
        this.updateValue();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    _removeTagAndFocusInput(index) {
        this.removeTag(index);
        this._handleFocus();
    }
    /**
     * remove tag
     * @param {?} index
     * @return {?}
     */
    removeTag(index) {
        this._items.splice(index, 1);
        this.updateValue();
    }
    /**
     * update value
     * @return {?}
     */
    updateValue() {
        this._value = new Array();
        for (let i = 0; i < this._items.length; i++) {
            this._value.push(this._items[i].value);
        }
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
    }
    /**
     * select tag
     * @param {?} index of select tag
     * @return {?}
     */
    _selectTag(index) {
        if (index >= -1 && index <= this._items.length) {
            this._selectedTag = index;
        }
    }
    /**
     * @return {?}
     */
    _handleFocus() {
        this._element.nativeElement.querySelector('input').focus();
        this.resetselectedTag();
    }
    /**
     * @return {?}
     */
    _onInputFocus() {
        this._inputFocused = true;
        this.resetselectedTag();
    }
    /**
     * @return {?}
     */
    _onInputBlur() {
        this._inputFocused = false;
    }
    /**
     * @return {?}
     */
    _listEnter() { this.noBlur = true; }
    /**
     * @return {?}
     */
    _listLeave() { this.noBlur = false; }
    /**
     * update suggestion menu with filter
     * @return {?}
     */
    filterMatches() {
        /** @type {?} */
        let tempList = this._tags.map((tag) => new Tag(tag, this.textKey, this.valueKey));
        this._list = tempList.filter((t) => (new RegExp(this._inputValue, 'ig').test(t.text) &&
            !this._items.find((i) => t.text === i.text)));
        if (this._list.length > 0) {
            this._focusedTag = 0;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    /** @type {?} */
                    let selItm = this._tags.find((t) => this.equals(this.valueKey ?
                        t[this.valueKey] : t, value[i]));
                    if (selItm) {
                        this._items.push(new Tag(selItm, this.textKey, this.valueKey));
                    }
                }
            }
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { this._onChangeCallback = fn; }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { this._onTouchedCallback = fn; }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
Md2Tags.decorators = [
    { type: Component, args: [{
                selector: 'md2-tags',
                template: "<div class=\"md2-tags-container\">\n  <span *ngFor=\"let t of _items; let i = index;\" class=\"md2-tag\" [class.active]=\"_selectedTag === i\" (click)=\"_selectTag(i)\">\n    <span class=\"md2-tag-text\">{{t.text}}</span>\n    <svg (click)=\"_removeTagAndFocusInput(i)\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n      <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n    </svg>\n  </span>\n  <div class=\"md2-tag-add\">\n    <input [(ngModel)]=\"_inputValue\" type=\"text\" tabs=\"false\" autocomplete=\"off\" tabindex=\"-1\" [disabled]=\"disabled\" class=\"md2-tags-input\" [placeholder]=\"placeholder\" (focus)=\"_onInputFocus()\" (blur)=\"_onInputBlur()\" (keydown)=\"_handleInputKeydown($event)\" (change)=\"$event.stopPropagation()\" />\n    <ul *ngIf=\"isMenuVisible\" class=\"md2-tags-menu\" (mouseenter)=\"_listEnter()\" (mouseleave)=\"_listLeave()\">\n      <li class=\"md2-tag-option\" *ngFor=\"let l of _list; let i = index;\" [class.focused]=\"_focusedTag === i\" (click)=\"_addTag($event, i)\">\n        <span class=\"md2-tag-option-text\" [innerHtml]=\"l.text | highlight:_inputValue\"></span>\n      </li>\n    </ul>\n  </div>\n</div>\n",
                host: {
                    'role': 'tags',
                    '[id]': 'id',
                    '[class.focus]': '_inputFocused || _selectedTag >= 0',
                    '[class.md2-tags-disabled]': 'disabled',
                    '[tabindex]': 'disabled ? -1 : tabindex',
                    '[attr.aria-disabled]': 'disabled'
                },
                providers: [MD2_TAGS_CONTROL_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
                exportAs: 'md2Tags',
                styles: [":host{outline:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-backface-visibility:hidden;backface-visibility:hidden}.md2-tags-container{position:relative;display:block;max-width:100%;padding:2px 2px 4px;border-bottom:1px solid rgba(0,0,0,.12);box-sizing:content-box;min-width:64px;min-height:26px;cursor:text}.md2-tags-container::after,.md2-tags-container::before{display:table;content:' '}.md2-tags-container::after{clear:both}.focus .md2-tags-container{padding-bottom:3px;border-bottom:2px solid #106cc8}.md2-tags-disabled .md2-tags-container{color:rgba(0,0,0,.38);cursor:default}.md2-tags-disabled.focus .md2-tags-container{padding-bottom:4px;border-bottom:1px solid rgba(0,0,0,.38)}.md2-tag{position:relative;cursor:default;border-radius:16px;display:block;height:32px;line-height:32px;margin:4px 4px 0 0;padding:0 26px 0 12px;float:left;box-sizing:border-box;max-width:100%;background:#e0e0e0;color:#424242;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.md2-tag.active{background:#106cc8;color:rgba(255,255,255,.87)}.md2-tag.active svg{color:rgba(255,255,255,.87)}.md2-tag svg{position:absolute;top:4px;right:2px;cursor:pointer;display:inline-block;overflow:hidden;fill:currentColor;color:rgba(0,0,0,.54)}.md2-tag-add{position:relative;display:inline-block;margin-left:4px}input{border:0;outline:0;margin-top:6px;height:30px;line-height:30px;padding:0;color:rgba(0,0,0,.87);background:0 0}.md2-tags-placeholder{color:rgba(0,0,0,.38)}.md2-tags-menu{position:absolute;left:0;top:100%;display:block;z-index:10;flex-direction:column;width:100%;margin:6px 0 0;padding:8px 0;box-shadow:0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12);max-height:256px;min-height:48px;overflow-y:auto;-webkit-transform:scale(1);transform:scale(1);background:#fff;-webkit-backface-visibility:hidden;backface-visibility:hidden}.md2-tags-menu .md2-tag-option{cursor:pointer;position:relative;display:block;color:#212121;align-items:center;width:auto;transition:background 150ms linear;padding:12px 16px;line-height:24px;box-sizing:border-box;word-wrap:break-word}.md2-tags-menu .md2-tag-option.focused,.md2-tags-menu .md2-tag-option:hover{background:#eee}.md2-tags-menu .md2-tag-option .md2-tag-option-text{width:auto;font-size:16px}.highlight{color:#757575}"]
            }] }
];
/** @nocollapse */
Md2Tags.ctorParameters = () => [
    { type: ElementRef }
];
Md2Tags.propDecorators = {
    change: [{ type: Output }],
    id: [{ type: Input }],
    tabindex: [{ type: Input }],
    placeholder: [{ type: Input }],
    textKey: [{ type: Input, args: ['md2-tag-text',] }],
    valueKey: [{ type: Input, args: ['md2-tag-value',] }],
    disabled: [{ type: Input }],
    tags: [{ type: Input, args: ['md2-tags',] }],
    value: [{ type: Input }],
    _handleKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    _handleFocus: [{ type: HostListener, args: ['focus',] }]
};
if (false) {
    /** @type {?} */
    Md2Tags.prototype.change;
    /** @type {?} */
    Md2Tags.prototype._value;
    /** @type {?} */
    Md2Tags.prototype._disabled;
    /** @type {?} */
    Md2Tags.prototype._isInitialized;
    /** @type {?} */
    Md2Tags.prototype._onTouchedCallback;
    /** @type {?} */
    Md2Tags.prototype._onChangeCallback;
    /** @type {?} */
    Md2Tags.prototype._tags;
    /** @type {?} */
    Md2Tags.prototype._list;
    /** @type {?} */
    Md2Tags.prototype._items;
    /** @type {?} */
    Md2Tags.prototype._focusedTag;
    /** @type {?} */
    Md2Tags.prototype._selectedTag;
    /** @type {?} */
    Md2Tags.prototype._inputValue;
    /** @type {?} */
    Md2Tags.prototype._inputFocused;
    /** @type {?} */
    Md2Tags.prototype.noBlur;
    /** @type {?} */
    Md2Tags.prototype.id;
    /** @type {?} */
    Md2Tags.prototype.tabindex;
    /** @type {?} */
    Md2Tags.prototype.placeholder;
    /** @type {?} */
    Md2Tags.prototype.textKey;
    /** @type {?} */
    Md2Tags.prototype.valueKey;
    /** @type {?} */
    Md2Tags.prototype.selectAndFocusTagSafe;
    /** @type {?} */
    Md2Tags.prototype._element;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL3RhZ3MvdGFncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLGlCQUFpQixHQUVsQixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsVUFBVSxFQUNWLFdBQVcsRUFDWCxTQUFTLEVBQ1QsTUFBTSxFQUNOLEdBQUcsRUFDSCxNQUFNLEVBQ1AsTUFBTSxjQUFjLENBQUM7O0FBRXRCLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUM7OztBQUV2QixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFFZixNQUFNOzs7Ozs7SUFJSixZQUFZLE1BQVcsRUFBRSxPQUFlLEVBQUUsUUFBZ0I7UUFDeEQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztTQUNqQztRQUNELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUNuRDtLQUNGO0NBQ0Y7Ozs7Ozs7O0FBRUQsYUFBYSwrQkFBK0IsR0FBUTtJQUNsRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxD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ckIsS0FBSzttQkFJTCxLQUFLLFNBQUMsVUFBVTtvQkFHaEIsS0FBSzs2QkFrSkwsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQzsyQkE0R2xDLFlBQVksU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTkdfVkFMVUVfQUNDRVNTT1IsXG4gIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBjb2VyY2VCb29sZWFuUHJvcGVydHksXG4gIExFRlRfQVJST1csXG4gIFJJR0hUX0FSUk9XLFxuICBCQUNLU1BBQ0UsXG4gIERFTEVURSxcbiAgVEFCLFxuICBFU0NBUEVcbn0gZnJvbSAnLi4vY29yZS9jb3JlJztcblxuY29uc3Qgbm9vcCA9ICgpID0+IHsgfTtcblxubGV0IG5leHRJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBUYWcge1xuICB0ZXh0OiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Ioc291cmNlOiBhbnksIHRleHRLZXk6IHN0cmluZywgdmFsdWVLZXk6IHN0cmluZykge1xuICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy50ZXh0ID0gdGhpcy52YWx1ZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLnRleHQgPSBzb3VyY2VbdGV4dEtleV07XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWVLZXkgPyBzb3VyY2VbdmFsdWVLZXldIDogc291cmNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgTUQyX1RBR1NfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWQyVGFncyksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgXG4gIHNlbGVjdG9yOiAnbWQyLXRhZ3MnLFxuICB0ZW1wbGF0ZVVybDogJ3RhZ3MuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd0YWdzLnNjc3MnXSxcbiAgaG9zdDoge1xuICAgICdyb2xlJzogJ3RhZ3MnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2NsYXNzLmZvY3VzXSc6ICdfaW5wdXRGb2N1c2VkIHx8IF9zZWxlY3RlZFRhZyA+PSAwJyxcbiAgICAnW2NsYXNzLm1kMi10YWdzLWRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXG4gICAgJ1t0YWJpbmRleF0nOiAnZGlzYWJsZWQgPyAtMSA6IHRhYmluZGV4JyxcbiAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnXG4gIH0sXG4gIHByb3ZpZGVyczogW01EMl9UQUdTX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBleHBvcnRBczogJ21kMlRhZ3MnXG59KVxuXG5leHBvcnQgY2xhc3MgTWQyVGFncyBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmKSB7IH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7IHRoaXMuX2lzSW5pdGlhbGl6ZWQgPSB0cnVlOyB9XG5cbiAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBwcml2YXRlIF92YWx1ZTogYW55ID0gJyc7XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2lzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIF9vbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBwcml2YXRlIF90YWdzOiBBcnJheTxhbnk+ID0gW107XG4gIF9saXN0OiBBcnJheTxUYWc+ID0gW107XG4gIF9pdGVtczogQXJyYXk8VGFnPiA9IFtdO1xuXG4gIF9mb2N1c2VkVGFnOiBudW1iZXIgPSAwO1xuICBfc2VsZWN0ZWRUYWc6IG51bWJlciA9IC0xO1xuICBfaW5wdXRWYWx1ZTogc3RyaW5nID0gJyc7XG4gIF9pbnB1dEZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBub0JsdXI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSAnbWQyLXRhZ3MtJyArICgrK25leHRJZCk7XG4gIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgnbWQyLXRhZy10ZXh0JykgdGV4dEtleTogc3RyaW5nID0gJ3RleHQnO1xuICBASW5wdXQoJ21kMi10YWctdmFsdWUnKSB2YWx1ZUtleTogc3RyaW5nID0gbnVsbDtcblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBzZXQgZGlzYWJsZWQodmFsdWUpIHsgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgQElucHV0KCdtZDItdGFncycpXG4gIHNldCB0YWdzKHZhbHVlOiBBcnJheTxhbnk+KSB7IHRoaXMuX3RhZ3MgPSB2YWx1ZTsgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fdmFsdWU7IH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHsgdGhpcy5zZXRWYWx1ZSh2YWx1ZSk7IH1cblxuICAvKipcbiAgICogc2V0dXAgdmFsdWVcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIHNldFZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3ZhbHVlKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5faXRlbXMgPSBbXTtcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbGV0IHNlbEl0bSA9IHRoaXMuX3RhZ3MuZmluZCgodDogYW55KSA9PiB0aGlzLmVxdWFscyh0aGlzLnZhbHVlS2V5ID9cbiAgICAgICAgICAgIHRbdGhpcy52YWx1ZUtleV0gOiB0LCB2YWx1ZVtpXSkpO1xuICAgICAgICAgIGlmIChzZWxJdG0pIHsgdGhpcy5faXRlbXMucHVzaChuZXcgVGFnKHNlbEl0bSwgdGhpcy50ZXh0S2V5LCB0aGlzLnZhbHVlS2V5KSk7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX2lzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5fdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlIHR3byB2YXJzIG9yIG9iamVjdHNcbiAgICogQHBhcmFtIG8xIGNvbXBhcmUgZmlyc3Qgb2JqZWN0XG4gICAqIEBwYXJhbSBvMiBjb21wYXJlIHNlY29uZCBvYmplY3RcbiAgICogQHJldHVybiBib29sZWFuIGNvbXBhcmF0aW9uIHJlc3VsdFxuICAgKi9cbiAgcHJpdmF0ZSBlcXVhbHMobzE6IGFueSwgbzI6IGFueSkge1xuICAgIGlmIChvMSA9PT0gbzIpIHsgcmV0dXJuIHRydWU7IH1cbiAgICBpZiAobzEgPT09IG51bGwgfHwgbzIgPT09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKG8xICE9PSBvMSAmJiBvMiAhPT0gbzIpIHsgcmV0dXJuIHRydWU7IH1cbiAgICBsZXQgdDEgPSB0eXBlb2YgbzEsIHQyID0gdHlwZW9mIG8yLCBrZXk6IGFueSwga2V5U2V0OiBhbnk7XG4gICAgaWYgKHQxID09PSB0MiAmJiB0MSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGtleVNldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICBmb3IgKGtleSBpbiBvMSkge1xuICAgICAgICBpZiAoIXRoaXMuZXF1YWxzKG8xW2tleV0sIG8yW2tleV0pKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICBrZXlTZXRba2V5XSA9IHRydWU7XG4gICAgICB9XG4gICAgICBmb3IgKGtleSBpbiBvMikge1xuICAgICAgICBpZiAoIShrZXkgaW4ga2V5U2V0KSAmJiBrZXkuY2hhckF0KDApICE9PSAnJCcgJiYgbzJba2V5XSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgaXNNZW51VmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKCh0aGlzLl9pbnB1dEZvY3VzZWQgfHwgdGhpcy5ub0JsdXIpICYmIHRoaXMuX2lucHV0VmFsdWUgJiZcbiAgICAgIHRoaXMuX2xpc3QgJiYgdGhpcy5fbGlzdC5sZW5ndGgpID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBzY3JvbGwgb2YgdGFncyBzdWdnZXN0aW9uIG1lbnVcbiAgICovXG4gIHByaXZhdGUgdXBkYXRlU2Nyb2xsKCkge1xuICAgIGlmICh0aGlzLl9mb2N1c2VkVGFnIDwgMCkgeyByZXR1cm47IH1cbiAgICBsZXQgbWVudUNvbnRhaW5lciA9IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWQyLXRhZ3MtbWVudScpO1xuICAgIGlmICghbWVudUNvbnRhaW5lcikgeyByZXR1cm47IH1cblxuICAgIGxldCBjaG9pY2VzID0gbWVudUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcubWQyLW9wdGlvbicpO1xuICAgIGlmIChjaG9pY2VzLmxlbmd0aCA8IDEpIHsgcmV0dXJuOyB9XG5cbiAgICBsZXQgaGlnaGxpZ2h0ZWQ6IGFueSA9IGNob2ljZXNbdGhpcy5fZm9jdXNlZFRhZ107XG4gICAgaWYgKCFoaWdobGlnaHRlZCkgeyByZXR1cm47IH1cblxuICAgIGxldCB0b3A6IG51bWJlciA9IGhpZ2hsaWdodGVkLm9mZnNldFRvcCArIGhpZ2hsaWdodGVkLmNsaWVudEhlaWdodCAtIG1lbnVDb250YWluZXIuc2Nyb2xsVG9wO1xuICAgIGxldCBoZWlnaHQ6IG51bWJlciA9IG1lbnVDb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgaWYgKHRvcCA+IGhlaWdodCkge1xuICAgICAgbWVudUNvbnRhaW5lci5zY3JvbGxUb3AgKz0gdG9wIC0gaGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAodG9wIDwgaGlnaGxpZ2h0ZWQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICBtZW51Q29udGFpbmVyLnNjcm9sbFRvcCAtPSBoaWdobGlnaHRlZC5jbGllbnRIZWlnaHQgLSB0b3A7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGlucHV0IGtleSBsaXN0ZW5lclxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIF9oYW5kbGVJbnB1dEtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAvLyBCYWNrc3BhY2VcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gOCAmJiAhdGhpcy5faW5wdXRWYWx1ZSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgaWYgKHRoaXMuX2l0ZW1zLmxlbmd0aCAmJiB0aGlzLl9zZWxlY3RlZFRhZyA8IDApIHtcbiAgICAgICAgdGhpcy5zZWxlY3RBbmRGb2N1c1RhZ1NhZmUodGhpcy5faXRlbXMubGVuZ3RoIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5faXRlbXMubGVuZ3RoICYmIHRoaXMuX3NlbGVjdGVkVGFnID4gLTEpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBbmRTZWxlY3RBZGphY2VudFRhZyh0aGlzLl9zZWxlY3RlZFRhZyk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIERlbCBLZXlcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gNDYgJiYgIXRoaXMuX2lucHV0VmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgLy8gTGVmdCAvIFJpZ2h0IEFycm93XG4gICAgaWYgKChldmVudC5rZXlDb2RlID09PSAzNyB8fCBldmVudC5rZXlDb2RlID09PSAzOSkgJiYgIXRoaXMuX2lucHV0VmFsdWUpIHsgcmV0dXJuOyB9XG4gICAgLy8gRG93biBBcnJvd1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSA0MCkge1xuICAgICAgaWYgKCF0aGlzLmlzTWVudVZpc2libGUpIHsgcmV0dXJuOyB9XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9mb2N1c2VkVGFnID0gKHRoaXMuX2ZvY3VzZWRUYWcgPT09IHRoaXMuX2xpc3QubGVuZ3RoIC0gMSkgP1xuICAgICAgICAwIDogTWF0aC5taW4odGhpcy5fZm9jdXNlZFRhZyArIDEsIHRoaXMuX2xpc3QubGVuZ3RoIC0gMSk7XG4gICAgICB0aGlzLnVwZGF0ZVNjcm9sbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBVcCBBcnJvd1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzOCkge1xuICAgICAgaWYgKCF0aGlzLmlzTWVudVZpc2libGUpIHsgcmV0dXJuOyB9XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLl9mb2N1c2VkVGFnID0gKHRoaXMuX2ZvY3VzZWRUYWcgPT09IDApID9cbiAgICAgICAgdGhpcy5fbGlzdC5sZW5ndGggLSAxIDogTWF0aC5tYXgoMCwgdGhpcy5fZm9jdXNlZFRhZyAtIDEpO1xuICAgICAgdGhpcy51cGRhdGVTY3JvbGwoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gVGFiIEtleVxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSA5KSB7IHJldHVybjsgfVxuICAgIC8vIEVudGVyIC8gU3BhY2VcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgfHwgZXZlbnQua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgIGlmICghdGhpcy5faW5wdXRWYWx1ZSB8fCAhdGhpcy5pc01lbnVWaXNpYmxlKSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IHJldHVybjsgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2FkZFRhZyhldmVudCwgdGhpcy5fZm9jdXNlZFRhZyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIEVzY2FwZSBLZXlcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICh0aGlzLl9pbnB1dFZhbHVlKSB7IHRoaXMuX2lucHV0VmFsdWUgPSAnJzsgfVxuICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkVGFnID49IDApIHsgdGhpcy5faGFuZGxlRm9jdXMoKTsgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyByZXNldCBzZWxlY3RlZCB0YWdcbiAgICBpZiAodGhpcy5fc2VsZWN0ZWRUYWcgPj0gMCkgeyB0aGlzLnJlc2V0c2VsZWN0ZWRUYWcoKTsgfVxuICAgIC8vIGZpbHRlclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5maWx0ZXJNYXRjaGVzKCk7XG4gICAgfSwgMTApO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIF9oYW5kbGVLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5faW5wdXRWYWx1ZSkgeyByZXR1cm47IH1cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgQkFDS1NQQUNFOlxuICAgICAgY2FzZSBERUxFVEU6XG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZFRhZyA8IDApIHsgcmV0dXJuOyB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMucmVtb3ZlQW5kU2VsZWN0QWRqYWNlbnRUYWcodGhpcy5fc2VsZWN0ZWRUYWcpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBUQUI6XG4gICAgICBjYXNlIEVTQ0FQRTpcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkVGFnIDwgMCkgeyByZXR1cm47IH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5faGFuZGxlRm9jdXMoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkVGFnIDwgMCkgeyB0aGlzLl9zZWxlY3RlZFRhZyA9IHRoaXMuX2l0ZW1zLmxlbmd0aDsgfVxuICAgICAgICBpZiAodGhpcy5faXRlbXMubGVuZ3RoKSB7IHRoaXMuc2VsZWN0QW5kRm9jdXNUYWdTYWZlKHRoaXMuX3NlbGVjdGVkVGFnIC0gMSk7IH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRUYWcgPj0gdGhpcy5faXRlbXMubGVuZ3RoKSB7IHRoaXMuX3NlbGVjdGVkVGFnID0gLTE7IH1cbiAgICAgICAgdGhpcy5zZWxlY3RBbmRGb2N1c1RhZ1NhZmUodGhpcy5fc2VsZWN0ZWRUYWcgKyAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVBbmRTZWxlY3RBZGphY2VudFRhZyhpbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IHNlbEluZGV4ID0gdGhpcy5nZXRBZGphY2VudFRhZ0luZGV4KGluZGV4KTtcbiAgICB0aGlzLnJlbW92ZVRhZyhpbmRleCk7XG4gICAgdGhpcy5zZWxlY3RBbmRGb2N1c1RhZ1NhZmUoc2VsSW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldHNlbGVjdGVkVGFnKCkge1xuICAgIHRoaXMuX3NlbGVjdGVkVGFnID0gLTE7XG4gIH1cblxuICBwcml2YXRlIGdldEFkamFjZW50VGFnSW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgIGxldCBsZW4gPSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xuICAgIHJldHVybiAobGVuID09PSAwKSA/IC0xIDpcbiAgICAgIChpbmRleCA9PT0gbGVuKSA/IGluZGV4IC0gMSA6IGluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0YWdcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSBpbmRleCBpbmRleCBvZiB0aGUgc3BlY2lmaWMgdGFnXG4gICAqL1xuICBfYWRkVGFnKGV2ZW50OiBFdmVudCwgaW5kZXg6IG51bWJlcikge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5faXRlbXMucHVzaCh0aGlzLl9saXN0W2luZGV4XSk7XG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9ICcnO1xuICAgIHRoaXMudXBkYXRlVmFsdWUoKTtcbiAgfVxuXG4gIF9yZW1vdmVUYWdBbmRGb2N1c0lucHV0KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnJlbW92ZVRhZyhpbmRleCk7XG4gICAgdGhpcy5faGFuZGxlRm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZW1vdmUgdGFnXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmVUYWcoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuX2l0ZW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgdGhpcy51cGRhdGVWYWx1ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSB2YWx1ZVxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVWYWx1ZSgpIHtcbiAgICB0aGlzLl92YWx1ZSA9IG5ldyBBcnJheTxhbnk+KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fdmFsdWUucHVzaCh0aGlzLl9pdGVtc1tpXS52YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sodGhpcy5fdmFsdWUpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5fdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RBbmRGb2N1c1RhZ1NhZmUgPSBmdW5jdGlvbiAoaW5kZXg6IG51bWJlcikge1xuICAgIGlmICghdGhpcy5faXRlbXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9zZWxlY3RUYWcoLTEpO1xuICAgICAgdGhpcy5faGFuZGxlRm9jdXMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGluZGV4ID09PSB0aGlzLl9pdGVtcy5sZW5ndGgpIHsgcmV0dXJuIHRoaXMuX2hhbmRsZUZvY3VzKCk7IH1cbiAgICBpbmRleCA9IE1hdGgubWF4KGluZGV4LCAwKTtcbiAgICBpbmRleCA9IE1hdGgubWluKGluZGV4LCB0aGlzLl9pdGVtcy5sZW5ndGggLSAxKTtcbiAgICB0aGlzLl9zZWxlY3RUYWcoaW5kZXgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBzZWxlY3QgdGFnXG4gICAqIEBwYXJhbSBpbmRleCBvZiBzZWxlY3QgdGFnXG4gICAqL1xuICBfc2VsZWN0VGFnKGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoaW5kZXggPj0gLTEgJiYgaW5kZXggPD0gdGhpcy5faXRlbXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9zZWxlY3RlZFRhZyA9IGluZGV4O1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcbiAgX2hhbmRsZUZvY3VzKCkge1xuICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLmZvY3VzKCk7XG4gICAgdGhpcy5yZXNldHNlbGVjdGVkVGFnKCk7XG4gIH1cblxuICBfb25JbnB1dEZvY3VzKCkge1xuICAgIHRoaXMuX2lucHV0Rm9jdXNlZCA9IHRydWU7XG4gICAgdGhpcy5yZXNldHNlbGVjdGVkVGFnKCk7XG4gIH1cblxuICBfb25JbnB1dEJsdXIoKSB7XG4gICAgdGhpcy5faW5wdXRGb2N1c2VkID0gZmFsc2U7XG4gIH1cblxuICBfbGlzdEVudGVyKCkgeyB0aGlzLm5vQmx1ciA9IHRydWU7IH1cblxuICBfbGlzdExlYXZlKCkgeyB0aGlzLm5vQmx1ciA9IGZhbHNlOyB9XG5cbiAgLyoqXG4gICAqIHVwZGF0ZSBzdWdnZXN0aW9uIG1lbnUgd2l0aCBmaWx0ZXJcbiAgICogQHBhcmFtIHF1ZXJ5XG4gICAqL1xuICBwcml2YXRlIGZpbHRlck1hdGNoZXMoKSB7XG4gICAgbGV0IHRlbXBMaXN0ID0gdGhpcy5fdGFncy5tYXAoKHRhZzogYW55KSA9PiBuZXcgVGFnKHRhZywgdGhpcy50ZXh0S2V5LCB0aGlzLnZhbHVlS2V5KSk7XG4gICAgdGhpcy5fbGlzdCA9IHRlbXBMaXN0LmZpbHRlcigodDogVGFnKSA9PlxuICAgICAgKG5ldyBSZWdFeHAodGhpcy5faW5wdXRWYWx1ZSwgJ2lnJykudGVzdCh0LnRleHQpICYmXG4gICAgICAgICF0aGlzLl9pdGVtcy5maW5kKChpOiBUYWcpID0+IHQudGV4dCA9PT0gaS50ZXh0KSkpO1xuICAgIGlmICh0aGlzLl9saXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX2ZvY3VzZWRUYWcgPSAwO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgc2VsSXRtID0gdGhpcy5fdGFncy5maW5kKCh0OiBhbnkpID0+IHRoaXMuZXF1YWxzKHRoaXMudmFsdWVLZXkgP1xuICAgICAgICAgICAgdFt0aGlzLnZhbHVlS2V5XSA6IHQsIHZhbHVlW2ldKSk7XG4gICAgICAgICAgaWYgKHNlbEl0bSkgeyB0aGlzLl9pdGVtcy5wdXNoKG5ldyBUYWcoc2VsSXRtLCB0aGlzLnRleHRLZXksIHRoaXMudmFsdWVLZXkpKTsgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7IHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSBmbjsgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHsgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjsgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbn1cbiJdfQ==