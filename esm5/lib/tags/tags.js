/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR, } from '@angular/forms';
import { coerceBooleanProperty, LEFT_ARROW, RIGHT_ARROW, BACKSPACE, DELETE, TAB, ESCAPE } from '../core/core';
/** @type {?} */
var noop = function () { };
var ɵ0 = noop;
/** @type {?} */
var nextId = 0;
var Tag = /** @class */ (function () {
    function Tag(source, textKey, valueKey) {
        if (typeof source === 'string') {
            this.text = this.value = source;
        }
        if (typeof source === 'object') {
            this.text = source[textKey];
            this.value = valueKey ? source[valueKey] : source;
        }
    }
    return Tag;
}());
export { Tag };
if (false) {
    /** @type {?} */
    Tag.prototype.text;
    /** @type {?} */
    Tag.prototype.value;
}
/** @type {?} */
export var MD2_TAGS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Md2Tags; }),
    multi: true
};
var Md2Tags = /** @class */ (function () {
    function Md2Tags(_element) {
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
    Md2Tags.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () { this._isInitialized = true; };
    Object.defineProperty(Md2Tags.prototype, "disabled", {
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
    Object.defineProperty(Md2Tags.prototype, "tags", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._tags = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Tags.prototype, "value", {
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
    /**
     * setup value
     * @param {?} value
     * @return {?}
     */
    Md2Tags.prototype.setValue = /**
     * setup value
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                var _loop_1 = function (i) {
                    /** @type {?} */
                    var selItm = this_1._tags.find(function (t) { return _this.equals(_this.valueKey ?
                        t[_this.valueKey] : t, value[i]); });
                    if (selItm) {
                        this_1._items.push(new Tag(selItm, this_1.textKey, this_1.valueKey));
                    }
                };
                var this_1 = this;
                for (var i = 0; i < value.length; i++) {
                    _loop_1(i);
                }
            }
            if (this._isInitialized) {
                this._onChangeCallback(value);
                this.change.emit(this._value);
            }
        }
    };
    /**
     * Compare two vars or objects
     * @param {?} o1 compare first object
     * @param {?} o2 compare second object
     * @return {?} boolean comparation result
     */
    Md2Tags.prototype.equals = /**
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
    Object.defineProperty(Md2Tags.prototype, "isMenuVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return ((this._inputFocused || this.noBlur) && this._inputValue &&
                this._list && this._list.length) ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * update scroll of tags suggestion menu
     * @return {?}
     */
    Md2Tags.prototype.updateScroll = /**
     * update scroll of tags suggestion menu
     * @return {?}
     */
    function () {
        if (this._focusedTag < 0) {
            return;
        }
        /** @type {?} */
        var menuContainer = this._element.nativeElement.querySelector('.md2-tags-menu');
        if (!menuContainer) {
            return;
        }
        /** @type {?} */
        var choices = menuContainer.querySelectorAll('.md2-option');
        if (choices.length < 1) {
            return;
        }
        /** @type {?} */
        var highlighted = choices[this._focusedTag];
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
     * input key listener
     * @param event
     */
    /**
     * input key listener
     * @param {?} event
     * @return {?}
     */
    Md2Tags.prototype._handleInputKeydown = /**
     * input key listener
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
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
        setTimeout(function () {
            _this.filterMatches();
        }, 10);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2Tags.prototype._handleKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Md2Tags.prototype.removeAndSelectAdjacentTag = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var selIndex = this.getAdjacentTagIndex(index);
        this.removeTag(index);
        this.selectAndFocusTagSafe(selIndex);
    };
    /**
     * @return {?}
     */
    Md2Tags.prototype.resetselectedTag = /**
     * @return {?}
     */
    function () {
        this._selectedTag = -1;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Md2Tags.prototype.getAdjacentTagIndex = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var len = this._items.length - 1;
        return (len === 0) ? -1 :
            (index === len) ? index - 1 : index;
    };
    /**
     * add tag
     * @param event
     * @param index index of the specific tag
     */
    /**
     * add tag
     * @param {?} event
     * @param {?} index index of the specific tag
     * @return {?}
     */
    Md2Tags.prototype._addTag = /**
     * add tag
     * @param {?} event
     * @param {?} index index of the specific tag
     * @return {?}
     */
    function (event, index) {
        event.preventDefault();
        event.stopPropagation();
        this._items.push(this._list[index]);
        this._inputValue = '';
        this.updateValue();
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Md2Tags.prototype._removeTagAndFocusInput = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.removeTag(index);
        this._handleFocus();
    };
    /**
     * remove tag
     * @param {?} index
     * @return {?}
     */
    Md2Tags.prototype.removeTag = /**
     * remove tag
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this._items.splice(index, 1);
        this.updateValue();
    };
    /**
     * update value
     * @return {?}
     */
    Md2Tags.prototype.updateValue = /**
     * update value
     * @return {?}
     */
    function () {
        this._value = new Array();
        for (var i = 0; i < this._items.length; i++) {
            this._value.push(this._items[i].value);
        }
        this._onChangeCallback(this._value);
        this.change.emit(this._value);
    };
    /**
     * select tag
     * @param index of select tag
     */
    /**
     * select tag
     * @param {?} index of select tag
     * @return {?}
     */
    Md2Tags.prototype._selectTag = /**
     * select tag
     * @param {?} index of select tag
     * @return {?}
     */
    function (index) {
        if (index >= -1 && index <= this._items.length) {
            this._selectedTag = index;
        }
    };
    /**
     * @return {?}
     */
    Md2Tags.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.querySelector('input').focus();
        this.resetselectedTag();
    };
    /**
     * @return {?}
     */
    Md2Tags.prototype._onInputFocus = /**
     * @return {?}
     */
    function () {
        this._inputFocused = true;
        this.resetselectedTag();
    };
    /**
     * @return {?}
     */
    Md2Tags.prototype._onInputBlur = /**
     * @return {?}
     */
    function () {
        this._inputFocused = false;
    };
    /**
     * @return {?}
     */
    Md2Tags.prototype._listEnter = /**
     * @return {?}
     */
    function () { this.noBlur = true; };
    /**
     * @return {?}
     */
    Md2Tags.prototype._listLeave = /**
     * @return {?}
     */
    function () { this.noBlur = false; };
    /**
     * update suggestion menu with filter
     * @return {?}
     */
    Md2Tags.prototype.filterMatches = /**
     * update suggestion menu with filter
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var tempList = this._tags.map(function (tag) { return new Tag(tag, _this.textKey, _this.valueKey); });
        this._list = tempList.filter(function (t) {
            return (new RegExp(_this._inputValue, 'ig').test(t.text) &&
                !_this._items.find(function (i) { return t.text === i.text; }));
        });
        if (this._list.length > 0) {
            this._focusedTag = 0;
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Md2Tags.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (value !== this._value) {
            this._value = value;
            this._items = [];
            if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
                var _loop_2 = function (i) {
                    /** @type {?} */
                    var selItm = this_2._tags.find(function (t) { return _this.equals(_this.valueKey ?
                        t[_this.valueKey] : t, value[i]); });
                    if (selItm) {
                        this_2._items.push(new Tag(selItm, this_2.textKey, this_2.valueKey));
                    }
                };
                var this_2 = this;
                for (var i = 0; i < value.length; i++) {
                    _loop_2(i);
                }
            }
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Tags.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onChangeCallback = fn; };
    /**
     * @param {?} fn
     * @return {?}
     */
    Md2Tags.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) { this._onTouchedCallback = fn; };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    Md2Tags.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
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
    Md2Tags.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
    return Md2Tags;
}());
export { Md2Tags };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFncy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL3RhZ3MvdGFncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNMLGlCQUFpQixHQUVsQixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsVUFBVSxFQUNWLFdBQVcsRUFDWCxTQUFTLEVBQ1QsTUFBTSxFQUNOLEdBQUcsRUFDSCxNQUFNLEVBQ1AsTUFBTSxjQUFjLENBQUM7O0FBRXRCLElBQU0sSUFBSSxHQUFHLGVBQVMsQ0FBQzs7O0FBRXZCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUVmLElBQUE7SUFJRSxhQUFZLE1BQVcsRUFBRSxPQUFlLEVBQUUsUUFBZ0I7UUFDeEQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztTQUNqQztRQUNELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUNuRDtLQUNGO2NBekNIO0lBMENDLENBQUE7QUFiRCxlQWFDOzs7Ozs7OztBQUVELFdBQWEsK0JBQStCLEdBQVE7SUFDbEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxPQUFP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WixlQUFlLEVBQUUsb0NBQW9DO3dCQUNyRCwyQkFBMkIsRUFBRSxVQUFVO3dCQUN2QyxZQUFZLEVBQUUsMEJBQTBCO3dCQUN4QyxzQkFBc0IsRUFBRSxVQUFVO3FCQUNuQztvQkFDRCxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztvQkFDNUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxTQUFTOztpQkFDcEI7Ozs7Z0JBL0RDLFVBQVU7Ozt5QkF1RVQsTUFBTTtxQkFrQk4sS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7MEJBQ0wsS0FBSyxTQUFDLGNBQWM7MkJBQ3BCLEtBQUssU0FBQyxlQUFlOzJCQUVyQixLQUFLO3VCQUlMLEtBQUssU0FBQyxVQUFVO3dCQUdoQixLQUFLO2lDQWtKTCxZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDOytCQTRHbEMsWUFBWSxTQUFDLE9BQU87O2tCQXZXdkI7O1NBb0VhLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBOR19WQUxVRV9BQ0NFU1NPUixcbiAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSxcbiAgTEVGVF9BUlJPVyxcbiAgUklHSFRfQVJST1csXG4gIEJBQ0tTUEFDRSxcbiAgREVMRVRFLFxuICBUQUIsXG4gIEVTQ0FQRVxufSBmcm9tICcuLi9jb3JlL2NvcmUnO1xuXG5jb25zdCBub29wID0gKCkgPT4geyB9O1xuXG5sZXQgbmV4dElkID0gMDtcblxuZXhwb3J0IGNsYXNzIFRhZyB7XG4gIHRleHQ6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihzb3VyY2U6IGFueSwgdGV4dEtleTogc3RyaW5nLCB2YWx1ZUtleTogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnRleHQgPSB0aGlzLnZhbHVlID0gc291cmNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMudGV4dCA9IHNvdXJjZVt0ZXh0S2V5XTtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZUtleSA/IHNvdXJjZVt2YWx1ZUtleV0gOiBzb3VyY2U7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBNRDJfVEFHU19DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNZDJUYWdzKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBcbiAgc2VsZWN0b3I6ICdtZDItdGFncycsXG4gIHRlbXBsYXRlVXJsOiAndGFncy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3RhZ3Muc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAndGFncycsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbY2xhc3MuZm9jdXNdJzogJ19pbnB1dEZvY3VzZWQgfHwgX3NlbGVjdGVkVGFnID49IDAnLFxuICAgICdbY2xhc3MubWQyLXRhZ3MtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAnW3RhYmluZGV4XSc6ICdkaXNhYmxlZCA/IC0xIDogdGFiaW5kZXgnLFxuICAgICdbYXR0ci5hcmlhLWRpc2FibGVkXSc6ICdkaXNhYmxlZCdcbiAgfSxcbiAgcHJvdmlkZXJzOiBbTUQyX1RBR1NfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGV4cG9ydEFzOiAnbWQyVGFncydcbn0pXG5cbmV4cG9ydCBjbGFzcyBNZDJUYWdzIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHsgdGhpcy5faXNJbml0aWFsaXplZCA9IHRydWU7IH1cblxuICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgX3ZhbHVlOiBhbnkgPSAnJztcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaXNJbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgX29uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIHByaXZhdGUgX3RhZ3M6IEFycmF5PGFueT4gPSBbXTtcbiAgX2xpc3Q6IEFycmF5PFRhZz4gPSBbXTtcbiAgX2l0ZW1zOiBBcnJheTxUYWc+ID0gW107XG5cbiAgX2ZvY3VzZWRUYWc6IG51bWJlciA9IDA7XG4gIF9zZWxlY3RlZFRhZzogbnVtYmVyID0gLTE7XG4gIF9pbnB1dFZhbHVlOiBzdHJpbmcgPSAnJztcbiAgX2lucHV0Rm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIG5vQmx1cjogYm9vbGVhbiA9IHRydWU7XG5cbiAgQElucHV0KCkgaWQ6IHN0cmluZyA9ICdtZDItdGFncy0nICsgKCsrbmV4dElkKTtcbiAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcbiAgQElucHV0KCdtZDItdGFnLXRleHQnKSB0ZXh0S2V5OiBzdHJpbmcgPSAndGV4dCc7XG4gIEBJbnB1dCgnbWQyLXRhZy12YWx1ZScpIHZhbHVlS2V5OiBzdHJpbmcgPSBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZSkgeyB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICBASW5wdXQoJ21kMi10YWdzJylcbiAgc2V0IHRhZ3ModmFsdWU6IEFycmF5PGFueT4pIHsgdGhpcy5fdGFncyA9IHZhbHVlOyB9XG5cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLl92YWx1ZTsgfVxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkgeyB0aGlzLnNldFZhbHVlKHZhbHVlKTsgfVxuXG4gIC8qKlxuICAgKiBzZXR1cCB2YWx1ZVxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHByaXZhdGUgc2V0VmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fdmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgc2VsSXRtID0gdGhpcy5fdGFncy5maW5kKCh0OiBhbnkpID0+IHRoaXMuZXF1YWxzKHRoaXMudmFsdWVLZXkgP1xuICAgICAgICAgICAgdFt0aGlzLnZhbHVlS2V5XSA6IHQsIHZhbHVlW2ldKSk7XG4gICAgICAgICAgaWYgKHNlbEl0bSkgeyB0aGlzLl9pdGVtcy5wdXNoKG5ldyBUYWcoc2VsSXRtLCB0aGlzLnRleHRLZXksIHRoaXMudmFsdWVLZXkpKTsgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5faXNJbml0aWFsaXplZCkge1xuICAgICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbXBhcmUgdHdvIHZhcnMgb3Igb2JqZWN0c1xuICAgKiBAcGFyYW0gbzEgY29tcGFyZSBmaXJzdCBvYmplY3RcbiAgICogQHBhcmFtIG8yIGNvbXBhcmUgc2Vjb25kIG9iamVjdFxuICAgKiBAcmV0dXJuIGJvb2xlYW4gY29tcGFyYXRpb24gcmVzdWx0XG4gICAqL1xuICBwcml2YXRlIGVxdWFscyhvMTogYW55LCBvMjogYW55KSB7XG4gICAgaWYgKG8xID09PSBvMikgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIGlmIChvMSA9PT0gbnVsbCB8fCBvMiA9PT0gbnVsbCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAobzEgIT09IG8xICYmIG8yICE9PSBvMikgeyByZXR1cm4gdHJ1ZTsgfVxuICAgIGxldCB0MSA9IHR5cGVvZiBvMSwgdDIgPSB0eXBlb2YgbzIsIGtleTogYW55LCBrZXlTZXQ6IGFueTtcbiAgICBpZiAodDEgPT09IHQyICYmIHQxID09PSAnb2JqZWN0Jykge1xuICAgICAga2V5U2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIGZvciAoa2V5IGluIG8xKSB7XG4gICAgICAgIGlmICghdGhpcy5lcXVhbHMobzFba2V5XSwgbzJba2V5XSkpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIGtleVNldFtrZXldID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvciAoa2V5IGluIG8yKSB7XG4gICAgICAgIGlmICghKGtleSBpbiBrZXlTZXQpICYmIGtleS5jaGFyQXQoMCkgIT09ICckJyAmJiBvMltrZXldKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldCBpc01lbnVWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoKHRoaXMuX2lucHV0Rm9jdXNlZCB8fCB0aGlzLm5vQmx1cikgJiYgdGhpcy5faW5wdXRWYWx1ZSAmJlxuICAgICAgdGhpcy5fbGlzdCAmJiB0aGlzLl9saXN0Lmxlbmd0aCkgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIHNjcm9sbCBvZiB0YWdzIHN1Z2dlc3Rpb24gbWVudVxuICAgKi9cbiAgcHJpdmF0ZSB1cGRhdGVTY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMuX2ZvY3VzZWRUYWcgPCAwKSB7IHJldHVybjsgfVxuICAgIGxldCBtZW51Q29udGFpbmVyID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZDItdGFncy1tZW51Jyk7XG4gICAgaWYgKCFtZW51Q29udGFpbmVyKSB7IHJldHVybjsgfVxuXG4gICAgbGV0IGNob2ljZXMgPSBtZW51Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZDItb3B0aW9uJyk7XG4gICAgaWYgKGNob2ljZXMubGVuZ3RoIDwgMSkgeyByZXR1cm47IH1cblxuICAgIGxldCBoaWdobGlnaHRlZDogYW55ID0gY2hvaWNlc1t0aGlzLl9mb2N1c2VkVGFnXTtcbiAgICBpZiAoIWhpZ2hsaWdodGVkKSB7IHJldHVybjsgfVxuXG4gICAgbGV0IHRvcDogbnVtYmVyID0gaGlnaGxpZ2h0ZWQub2Zmc2V0VG9wICsgaGlnaGxpZ2h0ZWQuY2xpZW50SGVpZ2h0IC0gbWVudUNvbnRhaW5lci5zY3JvbGxUb3A7XG4gICAgbGV0IGhlaWdodDogbnVtYmVyID0gbWVudUNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG5cbiAgICBpZiAodG9wID4gaGVpZ2h0KSB7XG4gICAgICBtZW51Q29udGFpbmVyLnNjcm9sbFRvcCArPSB0b3AgLSBoZWlnaHQ7XG4gICAgfSBlbHNlIGlmICh0b3AgPCBoaWdobGlnaHRlZC5jbGllbnRIZWlnaHQpIHtcbiAgICAgIG1lbnVDb250YWluZXIuc2Nyb2xsVG9wIC09IGhpZ2hsaWdodGVkLmNsaWVudEhlaWdodCAtIHRvcDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaW5wdXQga2V5IGxpc3RlbmVyXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgX2hhbmRsZUlucHV0S2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIEJhY2tzcGFjZVxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSA4ICYmICF0aGlzLl9pbnB1dFZhbHVlKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBpZiAodGhpcy5faXRlbXMubGVuZ3RoICYmIHRoaXMuX3NlbGVjdGVkVGFnIDwgMCkge1xuICAgICAgICB0aGlzLnNlbGVjdEFuZEZvY3VzVGFnU2FmZSh0aGlzLl9pdGVtcy5sZW5ndGggLSAxKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9pdGVtcy5sZW5ndGggJiYgdGhpcy5fc2VsZWN0ZWRUYWcgPiAtMSkge1xuICAgICAgICB0aGlzLnJlbW92ZUFuZFNlbGVjdEFkamFjZW50VGFnKHRoaXMuX3NlbGVjdGVkVGFnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRGVsIEtleVxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSA0NiAmJiAhdGhpcy5faW5wdXRWYWx1ZSkgeyByZXR1cm47IH1cbiAgICAvLyBMZWZ0IC8gUmlnaHQgQXJyb3dcbiAgICBpZiAoKGV2ZW50LmtleUNvZGUgPT09IDM3IHx8IGV2ZW50LmtleUNvZGUgPT09IDM5KSAmJiAhdGhpcy5faW5wdXRWYWx1ZSkgeyByZXR1cm47IH1cbiAgICAvLyBEb3duIEFycm93XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDQwKSB7XG4gICAgICBpZiAoIXRoaXMuaXNNZW51VmlzaWJsZSkgeyByZXR1cm47IH1cbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2ZvY3VzZWRUYWcgPSAodGhpcy5fZm9jdXNlZFRhZyA9PT0gdGhpcy5fbGlzdC5sZW5ndGggLSAxKSA/XG4gICAgICAgIDAgOiBNYXRoLm1pbih0aGlzLl9mb2N1c2VkVGFnICsgMSwgdGhpcy5fbGlzdC5sZW5ndGggLSAxKTtcbiAgICAgIHRoaXMudXBkYXRlU2Nyb2xsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFVwIEFycm93XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM4KSB7XG4gICAgICBpZiAoIXRoaXMuaXNNZW51VmlzaWJsZSkgeyByZXR1cm47IH1cbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuX2ZvY3VzZWRUYWcgPSAodGhpcy5fZm9jdXNlZFRhZyA9PT0gMCkgP1xuICAgICAgICB0aGlzLl9saXN0Lmxlbmd0aCAtIDEgOiBNYXRoLm1heCgwLCB0aGlzLl9mb2N1c2VkVGFnIC0gMSk7XG4gICAgICB0aGlzLnVwZGF0ZVNjcm9sbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBUYWIgS2V5XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDkpIHsgcmV0dXJuOyB9XG4gICAgLy8gRW50ZXIgLyBTcGFjZVxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMyB8fCBldmVudC5rZXlDb2RlID09PSAzMikge1xuICAgICAgaWYgKCF0aGlzLl9pbnB1dFZhbHVlIHx8ICF0aGlzLmlzTWVudVZpc2libGUpIHsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgcmV0dXJuOyB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5fYWRkVGFnKGV2ZW50LCB0aGlzLl9mb2N1c2VkVGFnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gRXNjYXBlIEtleVxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKHRoaXMuX2lucHV0VmFsdWUpIHsgdGhpcy5faW5wdXRWYWx1ZSA9ICcnOyB9XG4gICAgICBpZiAodGhpcy5fc2VsZWN0ZWRUYWcgPj0gMCkgeyB0aGlzLl9oYW5kbGVGb2N1cygpOyB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHJlc2V0IHNlbGVjdGVkIHRhZ1xuICAgIGlmICh0aGlzLl9zZWxlY3RlZFRhZyA+PSAwKSB7IHRoaXMucmVzZXRzZWxlY3RlZFRhZygpOyB9XG4gICAgLy8gZmlsdGVyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmZpbHRlck1hdGNoZXMoKTtcbiAgICB9LCAxMCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCB0aGlzLl9pbnB1dFZhbHVlKSB7IHJldHVybjsgfVxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgY2FzZSBCQUNLU1BBQ0U6XG4gICAgICBjYXNlIERFTEVURTpcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdGVkVGFnIDwgMCkgeyByZXR1cm47IH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5yZW1vdmVBbmRTZWxlY3RBZGphY2VudFRhZyh0aGlzLl9zZWxlY3RlZFRhZyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFRBQjpcbiAgICAgIGNhc2UgRVNDQVBFOlxuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRUYWcgPCAwKSB7IHJldHVybjsgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLl9oYW5kbGVGb2N1cygpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5fc2VsZWN0ZWRUYWcgPCAwKSB7IHRoaXMuX3NlbGVjdGVkVGFnID0gdGhpcy5faXRlbXMubGVuZ3RoOyB9XG4gICAgICAgIGlmICh0aGlzLl9pdGVtcy5sZW5ndGgpIHsgdGhpcy5zZWxlY3RBbmRGb2N1c1RhZ1NhZmUodGhpcy5fc2VsZWN0ZWRUYWcgLSAxKTsgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RlZFRhZyA+PSB0aGlzLl9pdGVtcy5sZW5ndGgpIHsgdGhpcy5fc2VsZWN0ZWRUYWcgPSAtMTsgfVxuICAgICAgICB0aGlzLnNlbGVjdEFuZEZvY3VzVGFnU2FmZSh0aGlzLl9zZWxlY3RlZFRhZyArIDEpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUFuZFNlbGVjdEFkamFjZW50VGFnKGluZGV4OiBudW1iZXIpIHtcbiAgICBsZXQgc2VsSW5kZXggPSB0aGlzLmdldEFkamFjZW50VGFnSW5kZXgoaW5kZXgpO1xuICAgIHRoaXMucmVtb3ZlVGFnKGluZGV4KTtcbiAgICB0aGlzLnNlbGVjdEFuZEZvY3VzVGFnU2FmZShzZWxJbmRleCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0c2VsZWN0ZWRUYWcoKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWRUYWcgPSAtMTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QWRqYWNlbnRUYWdJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgbGV0IGxlbiA9IHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDE7XG4gICAgcmV0dXJuIChsZW4gPT09IDApID8gLTEgOlxuICAgICAgKGluZGV4ID09PSBsZW4pID8gaW5kZXggLSAxIDogaW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRhZ1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogQHBhcmFtIGluZGV4IGluZGV4IG9mIHRoZSBzcGVjaWZpYyB0YWdcbiAgICovXG4gIF9hZGRUYWcoZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLl9pdGVtcy5wdXNoKHRoaXMuX2xpc3RbaW5kZXhdKTtcbiAgICB0aGlzLl9pbnB1dFZhbHVlID0gJyc7XG4gICAgdGhpcy51cGRhdGVWYWx1ZSgpO1xuICB9XG5cbiAgX3JlbW92ZVRhZ0FuZEZvY3VzSW5wdXQoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMucmVtb3ZlVGFnKGluZGV4KTtcbiAgICB0aGlzLl9oYW5kbGVGb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlbW92ZSB0YWdcbiAgICogQHBhcmFtIGluZGV4XG4gICAqL1xuICBwcml2YXRlIHJlbW92ZVRhZyhpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5faXRlbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnVwZGF0ZVZhbHVlKCk7XG4gIH1cblxuICAvKipcbiAgICogdXBkYXRlIHZhbHVlXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVZhbHVlKCkge1xuICAgIHRoaXMuX3ZhbHVlID0gbmV3IEFycmF5PGFueT4oKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2l0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl92YWx1ZS5wdXNoKHRoaXMuX2l0ZW1zW2ldLnZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayh0aGlzLl92YWx1ZSk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdEFuZEZvY3VzVGFnU2FmZSA9IGZ1bmN0aW9uIChpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLl9pdGVtcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3NlbGVjdFRhZygtMSk7XG4gICAgICB0aGlzLl9oYW5kbGVGb2N1cygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaW5kZXggPT09IHRoaXMuX2l0ZW1zLmxlbmd0aCkgeyByZXR1cm4gdGhpcy5faGFuZGxlRm9jdXMoKTsgfVxuICAgIGluZGV4ID0gTWF0aC5tYXgoaW5kZXgsIDApO1xuICAgIGluZGV4ID0gTWF0aC5taW4oaW5kZXgsIHRoaXMuX2l0ZW1zLmxlbmd0aCAtIDEpO1xuICAgIHRoaXMuX3NlbGVjdFRhZyhpbmRleCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIHNlbGVjdCB0YWdcbiAgICogQHBhcmFtIGluZGV4IG9mIHNlbGVjdCB0YWdcbiAgICovXG4gIF9zZWxlY3RUYWcoaW5kZXg6IG51bWJlcikge1xuICAgIGlmIChpbmRleCA+PSAtMSAmJiBpbmRleCA8PSB0aGlzLl9pdGVtcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGVkVGFnID0gaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZm9jdXMnKVxuICBfaGFuZGxlRm9jdXMoKSB7XG4gICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuZm9jdXMoKTtcbiAgICB0aGlzLnJlc2V0c2VsZWN0ZWRUYWcoKTtcbiAgfVxuXG4gIF9vbklucHV0Rm9jdXMoKSB7XG4gICAgdGhpcy5faW5wdXRGb2N1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLnJlc2V0c2VsZWN0ZWRUYWcoKTtcbiAgfVxuXG4gIF9vbklucHV0Qmx1cigpIHtcbiAgICB0aGlzLl9pbnB1dEZvY3VzZWQgPSBmYWxzZTtcbiAgfVxuXG4gIF9saXN0RW50ZXIoKSB7IHRoaXMubm9CbHVyID0gdHJ1ZTsgfVxuXG4gIF9saXN0TGVhdmUoKSB7IHRoaXMubm9CbHVyID0gZmFsc2U7IH1cblxuICAvKipcbiAgICogdXBkYXRlIHN1Z2dlc3Rpb24gbWVudSB3aXRoIGZpbHRlclxuICAgKiBAcGFyYW0gcXVlcnlcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyTWF0Y2hlcygpIHtcbiAgICBsZXQgdGVtcExpc3QgPSB0aGlzLl90YWdzLm1hcCgodGFnOiBhbnkpID0+IG5ldyBUYWcodGFnLCB0aGlzLnRleHRLZXksIHRoaXMudmFsdWVLZXkpKTtcbiAgICB0aGlzLl9saXN0ID0gdGVtcExpc3QuZmlsdGVyKCh0OiBUYWcpID0+XG4gICAgICAobmV3IFJlZ0V4cCh0aGlzLl9pbnB1dFZhbHVlLCAnaWcnKS50ZXN0KHQudGV4dCkgJiZcbiAgICAgICAgIXRoaXMuX2l0ZW1zLmZpbmQoKGk6IFRhZykgPT4gdC50ZXh0ID09PSBpLnRleHQpKSk7XG4gICAgaWYgKHRoaXMuX2xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fZm9jdXNlZFRhZyA9IDA7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl92YWx1ZSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2l0ZW1zID0gW107XG4gICAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCBzZWxJdG0gPSB0aGlzLl90YWdzLmZpbmQoKHQ6IGFueSkgPT4gdGhpcy5lcXVhbHModGhpcy52YWx1ZUtleSA/XG4gICAgICAgICAgICB0W3RoaXMudmFsdWVLZXldIDogdCwgdmFsdWVbaV0pKTtcbiAgICAgICAgICBpZiAoc2VsSXRtKSB7IHRoaXMuX2l0ZW1zLnB1c2gobmV3IFRhZyhzZWxJdG0sIHRoaXMudGV4dEtleSwgdGhpcy52YWx1ZUtleSkpOyB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHsgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGZuOyB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkgeyB0aGlzLl9vblRvdWNoZWRDYWxsYmFjayA9IGZuOyB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxufVxuIl19