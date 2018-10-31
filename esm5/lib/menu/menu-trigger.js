/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Renderer, } from '@angular/core';
var Md2MenuTrigger = /** @class */ (function () {
    function Md2MenuTrigger(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
    }
    /**
     * @return {?}
     */
    Md2MenuTrigger.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._handleClick = this._renderer.listenGlobal('document', 'click', function (event) {
            if (!_this._hasChildMenu(event)) {
                _this._closeMenu();
            }
        });
    };
    /**
     * @return {?}
     */
    Md2MenuTrigger.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._handleClick = null;
    };
    /**
     * @return {?}
     */
    Md2MenuTrigger.prototype._toggleMenu = /**
     * @return {?}
     */
    function () {
        if (this._hasClass(this._getParentElement(), 'open')) {
            this._closeMenu();
        }
        else {
            this._openMenu();
        }
    };
    /**
     * @return {?}
     */
    Md2MenuTrigger.prototype._openMenu = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._getParentElement().classList.add('open');
        /** @type {?} */
        var siblingElements = this._getSiblingElements(this._getParentElement());
        siblingElements.forEach(function (el) {
            el.classList.remove('open');
            _this._closeChildrenMenu(el);
        });
    };
    /**
     * @return {?}
     */
    Md2MenuTrigger.prototype._closeMenu = /**
     * @return {?}
     */
    function () {
        this._getParentElement().classList.remove('open');
        this._closeChildrenMenu(this._getParentElement());
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Md2MenuTrigger.prototype._closeChildrenMenu = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        [].forEach.call(element.querySelectorAll('.open'), function (el) {
            el.classList.remove('open');
        });
    };
    /**
     * @return {?}
     */
    Md2MenuTrigger.prototype._getHostElement = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    /**
     * @return {?}
     */
    Md2MenuTrigger.prototype._getParentElement = /**
     * @return {?}
     */
    function () {
        return this._element.nativeElement.parentNode;
    };
    /**
     * @param {?} element
     * @return {?}
     */
    Md2MenuTrigger.prototype._getSiblingElements = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var siblingElements = [];
        /** @type {?} */
        var el = element.parentNode.firstChild;
        for (; el; el = el.nextSibling) {
            if (el.nodeType == 1 && el !== element) {
                siblingElements.push(el);
            }
        }
        return siblingElements;
    };
    /**
     * @param {?} element
     * @param {?} target
     * @return {?}
     */
    Md2MenuTrigger.prototype._getClosestElement = /**
     * @param {?} element
     * @param {?} target
     * @return {?}
     */
    function (element, target) {
        if (element.hasAttribute(target)) {
            return element;
        }
        /** @type {?} */
        var parentEl;
        while (element) {
            parentEl = element.parentElement;
            if (parentEl && parentEl.hasAttribute(target)) {
                return parentEl;
            }
            element = parentEl;
        }
        return null;
    };
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    Md2MenuTrigger.prototype._hasClass = /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    function (element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Md2MenuTrigger.prototype._hasChildMenu = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var el = this._getClosestElement(event.target, 'md2-menu-trigger');
        if (el && el === this._getHostElement()) {
            return true;
        }
        else if (this._getParentElement().contains(event.target)) {
            el = this._getClosestElement(event.target, 'md2-menu-item');
            if (el && el.querySelectorAll('[md2-menu-content]').length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    Md2MenuTrigger.decorators = [
        { type: Directive, args: [{
                    selector: '[md2-menu-trigger]',
                    host: {
                        'aria-haspopup': 'true',
                        '(click)': '_toggleMenu()',
                    },
                    exportAs: 'md2MenuTrigger'
                },] }
    ];
    /** @nocollapse */
    Md2MenuTrigger.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer }
    ]; };
    return Md2MenuTrigger;
}());
export { Md2MenuTrigger };
if (false) {
    /** @type {?} */
    Md2MenuTrigger.prototype._handleClick;
    /** @type {?} */
    Md2MenuTrigger.prototype._element;
    /** @type {?} */
    Md2MenuTrigger.prototype._renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS10cmlnZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvbWVudS9tZW51LXRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQzs7SUFjckIsd0JBQW9CLFFBQW9CLEVBQVUsU0FBbUI7UUFBakQsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7S0FBSzs7OztJQUUxRSx3Q0FBZTs7O0lBQWY7UUFBQSxpQkFNQztRQUxDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFDLEtBQVk7WUFDaEYsSUFBSSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzlCLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNuQjtTQUNGLENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsb0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7S0FDMUI7Ozs7SUFFRCxvQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDcEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ25CO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7S0FDRjs7OztJQUVELGtDQUFTOzs7SUFBVDtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFDL0MsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FB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QUFLLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzVELElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzlELE9BQU8sSUFBSSxDQUFDO2FBQ2I7aUJBQU07Z0JBQ0wsT0FBTyxLQUFLLENBQUM7YUFDZDtTQUNGO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0tBQ0Y7O2dCQTNHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsSUFBSSxFQUFFO3dCQUNKLGVBQWUsRUFBRSxNQUFNO3dCQUN2QixTQUFTLEVBQUUsZUFBZTtxQkFDM0I7b0JBQ0QsUUFBUSxFQUFFLGdCQUFnQjtpQkFDM0I7Ozs7Z0JBWEMsVUFBVTtnQkFDVixRQUFROzt5QkFIVjs7U0FjYSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBSZW5kZXJlcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttZDItbWVudS10cmlnZ2VyXScsXG4gIGhvc3Q6IHtcbiAgICAnYXJpYS1oYXNwb3B1cCc6ICd0cnVlJyxcbiAgICAnKGNsaWNrKSc6ICdfdG9nZ2xlTWVudSgpJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICdtZDJNZW51VHJpZ2dlcidcbn0pXG5leHBvcnQgY2xhc3MgTWQyTWVudVRyaWdnZXIge1xuXG4gIHByaXZhdGUgX2hhbmRsZUNsaWNrOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5faGFuZGxlQ2xpY2sgPSB0aGlzLl9yZW5kZXJlci5saXN0ZW5HbG9iYWwoJ2RvY3VtZW50JywgJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9oYXNDaGlsZE1lbnUoZXZlbnQpKSB7XG4gICAgICAgIHRoaXMuX2Nsb3NlTWVudSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5faGFuZGxlQ2xpY2sgPSBudWxsO1xuICB9XG5cbiAgX3RvZ2dsZU1lbnUoKSB7XG4gICAgaWYgKHRoaXMuX2hhc0NsYXNzKHRoaXMuX2dldFBhcmVudEVsZW1lbnQoKSwgJ29wZW4nKSkge1xuICAgICAgdGhpcy5fY2xvc2VNZW51KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX29wZW5NZW51KCk7XG4gICAgfVxuICB9XG5cbiAgX29wZW5NZW51KCkge1xuICAgIHRoaXMuX2dldFBhcmVudEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG4gICAgbGV0IHNpYmxpbmdFbGVtZW50cyA9IHRoaXMuX2dldFNpYmxpbmdFbGVtZW50cyh0aGlzLl9nZXRQYXJlbnRFbGVtZW50KCkpO1xuICAgIHNpYmxpbmdFbGVtZW50cy5mb3JFYWNoKChlbDogRWxlbWVudCkgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgICAgdGhpcy5fY2xvc2VDaGlsZHJlbk1lbnUoZWwpO1xuICAgIH0pO1xuICB9XG5cbiAgX2Nsb3NlTWVudSgpIHtcbiAgICB0aGlzLl9nZXRQYXJlbnRFbGVtZW50KCkuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgIHRoaXMuX2Nsb3NlQ2hpbGRyZW5NZW51KHRoaXMuX2dldFBhcmVudEVsZW1lbnQoKSk7XG4gIH1cblxuICBfY2xvc2VDaGlsZHJlbk1lbnUoZWxlbWVudDogRWxlbWVudCkge1xuICAgIFtdLmZvckVhY2guY2FsbChlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vcGVuJyksIChlbDogRWxlbWVudCkgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpO1xuICAgIH0pO1xuICB9XG5cbiAgX2dldEhvc3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgX2dldFBhcmVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZTtcbiAgfVxuXG4gIF9nZXRTaWJsaW5nRWxlbWVudHMoZWxlbWVudDogRWxlbWVudCkge1xuICAgIGxldCBzaWJsaW5nRWxlbWVudHM6IEFycmF5PE5vZGU+ID0gW107XG4gICAgbGV0IGVsID0gZWxlbWVudC5wYXJlbnROb2RlLmZpcnN0Q2hpbGQ7XG4gICAgZm9yICg7IGVsOyBlbCA9IGVsLm5leHRTaWJsaW5nKSB7XG4gICAgICBpZiAoZWwubm9kZVR5cGUgPT0gMSAmJiBlbCAhPT0gZWxlbWVudCkge1xuICAgICAgICBzaWJsaW5nRWxlbWVudHMucHVzaChlbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzaWJsaW5nRWxlbWVudHM7XG4gIH1cblxuICBfZ2V0Q2xvc2VzdEVsZW1lbnQoZWxlbWVudDogRWxlbWVudCwgdGFyZ2V0OiBzdHJpbmcpOiBFbGVtZW50IHtcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUodGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgbGV0IHBhcmVudEVsOiBFbGVtZW50O1xuICAgIHdoaWxlIChlbGVtZW50KSB7XG4gICAgICBwYXJlbnRFbCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmIChwYXJlbnRFbCAmJiBwYXJlbnRFbC5oYXNBdHRyaWJ1dGUodGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gcGFyZW50RWw7XG4gICAgICB9XG4gICAgICBlbGVtZW50ID0gcGFyZW50RWw7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgX2hhc0NsYXNzKGVsZW1lbnQ6IEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuICgnICcgKyBlbGVtZW50LmNsYXNzTmFtZSArICcgJykuaW5kZXhPZignICcgKyBjbGFzc05hbWUgKyAnICcpID4gLTE7XG4gIH1cblxuICBfaGFzQ2hpbGRNZW51KGV2ZW50OiBhbnkpIHtcbiAgICBsZXQgZWwgPSB0aGlzLl9nZXRDbG9zZXN0RWxlbWVudChldmVudC50YXJnZXQsICdtZDItbWVudS10cmlnZ2VyJyk7XG4gICAgaWYgKGVsICYmIGVsID09PSB0aGlzLl9nZXRIb3N0RWxlbWVudCgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2dldFBhcmVudEVsZW1lbnQoKS5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICBlbCA9IHRoaXMuX2dldENsb3Nlc3RFbGVtZW50KGV2ZW50LnRhcmdldCwgJ21kMi1tZW51LWl0ZW0nKTtcbiAgICAgIGlmIChlbCAmJiBlbC5xdWVyeVNlbGVjdG9yQWxsKCdbbWQyLW1lbnUtY29udGVudF0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==