/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Renderer, } from '@angular/core';
export class Md2MenuTrigger {
    /**
     * @param {?} _element
     * @param {?} _renderer
     */
    constructor(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._handleClick = this._renderer.listenGlobal('document', 'click', (event) => {
            if (!this._hasChildMenu(event)) {
                this._closeMenu();
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._handleClick = null;
    }
    /**
     * @return {?}
     */
    _toggleMenu() {
        if (this._hasClass(this._getParentElement(), 'open')) {
            this._closeMenu();
        }
        else {
            this._openMenu();
        }
    }
    /**
     * @return {?}
     */
    _openMenu() {
        this._getParentElement().classList.add('open');
        /** @type {?} */
        let siblingElements = this._getSiblingElements(this._getParentElement());
        siblingElements.forEach((el) => {
            el.classList.remove('open');
            this._closeChildrenMenu(el);
        });
    }
    /**
     * @return {?}
     */
    _closeMenu() {
        this._getParentElement().classList.remove('open');
        this._closeChildrenMenu(this._getParentElement());
    }
    /**
     * @param {?} element
     * @return {?}
     */
    _closeChildrenMenu(element) {
        [].forEach.call(element.querySelectorAll('.open'), (el) => {
            el.classList.remove('open');
        });
    }
    /**
     * @return {?}
     */
    _getHostElement() {
        return this._element.nativeElement;
    }
    /**
     * @return {?}
     */
    _getParentElement() {
        return this._element.nativeElement.parentNode;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    _getSiblingElements(element) {
        /** @type {?} */
        let siblingElements = [];
        /** @type {?} */
        let el = element.parentNode.firstChild;
        for (; el; el = el.nextSibling) {
            if (el.nodeType == 1 && el !== element) {
                siblingElements.push(el);
            }
        }
        return siblingElements;
    }
    /**
     * @param {?} element
     * @param {?} target
     * @return {?}
     */
    _getClosestElement(element, target) {
        if (element.hasAttribute(target)) {
            return element;
        }
        /** @type {?} */
        let parentEl;
        while (element) {
            parentEl = element.parentElement;
            if (parentEl && parentEl.hasAttribute(target)) {
                return parentEl;
            }
            element = parentEl;
        }
        return null;
    }
    /**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */
    _hasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _hasChildMenu(event) {
        /** @type {?} */
        let el = this._getClosestElement(event.target, 'md2-menu-trigger');
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
    }
}
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
Md2MenuTrigger.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer }
];
if (false) {
    /** @type {?} */
    Md2MenuTrigger.prototype._handleClick;
    /** @type {?} */
    Md2MenuTrigger.prototype._element;
    /** @type {?} */
    Md2MenuTrigger.prototype._renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS10cmlnZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1tZDIvIiwic291cmNlcyI6WyJsaWIvbWVudS9tZW51LXRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQVV2QixNQUFNOzs7OztJQUlKLFlBQW9CLFFBQW9CLEVBQVUsU0FBbUI7UUFBakQsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVU7S0FBSzs7OztJQUUxRSxlQUFlO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBWSxFQUFFLEVBQUU7WUFDcEYsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNuQjtTQUNGLENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0tBQzFCOzs7O0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsQjtLQUNGOzs7O0lBRUQsU0FBUztRQUNQLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBQy9DLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLGVB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QUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUM5RCxPQUFPLElBQUksQ0FBQzthQUNiO2lCQUFNO2dCQUNMLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7U0FDRjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtLQUNGOzs7WUEzR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLElBQUksRUFBRTtvQkFDSixlQUFlLEVBQUUsTUFBTTtvQkFDdkIsU0FBUyxFQUFFLGVBQWU7aUJBQzNCO2dCQUNELFFBQVEsRUFBRSxnQkFBZ0I7YUFDM0I7Ozs7WUFYQyxVQUFVO1lBQ1YsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgUmVuZGVyZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWQyLW1lbnUtdHJpZ2dlcl0nLFxuICBob3N0OiB7XG4gICAgJ2FyaWEtaGFzcG9wdXAnOiAndHJ1ZScsXG4gICAgJyhjbGljayknOiAnX3RvZ2dsZU1lbnUoKScsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbWQyTWVudVRyaWdnZXInXG59KVxuZXhwb3J0IGNsYXNzIE1kMk1lbnVUcmlnZ2VyIHtcblxuICBwcml2YXRlIF9oYW5kbGVDbGljazogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcikgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuX2hhbmRsZUNsaWNrID0gdGhpcy5fcmVuZGVyZXIubGlzdGVuR2xvYmFsKCdkb2N1bWVudCcsICdjbGljaycsIChldmVudDogRXZlbnQpID0+IHtcbiAgICAgIGlmICghdGhpcy5faGFzQ2hpbGRNZW51KGV2ZW50KSkge1xuICAgICAgICB0aGlzLl9jbG9zZU1lbnUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2hhbmRsZUNsaWNrID0gbnVsbDtcbiAgfVxuXG4gIF90b2dnbGVNZW51KCkge1xuICAgIGlmICh0aGlzLl9oYXNDbGFzcyh0aGlzLl9nZXRQYXJlbnRFbGVtZW50KCksICdvcGVuJykpIHtcbiAgICAgIHRoaXMuX2Nsb3NlTWVudSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9vcGVuTWVudSgpO1xuICAgIH1cbiAgfVxuXG4gIF9vcGVuTWVudSgpIHtcbiAgICB0aGlzLl9nZXRQYXJlbnRFbGVtZW50KCkuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuICAgIGxldCBzaWJsaW5nRWxlbWVudHMgPSB0aGlzLl9nZXRTaWJsaW5nRWxlbWVudHModGhpcy5fZ2V0UGFyZW50RWxlbWVudCgpKTtcbiAgICBzaWJsaW5nRWxlbWVudHMuZm9yRWFjaCgoZWw6IEVsZW1lbnQpID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICAgIHRoaXMuX2Nsb3NlQ2hpbGRyZW5NZW51KGVsKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9jbG9zZU1lbnUoKSB7XG4gICAgdGhpcy5fZ2V0UGFyZW50RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICB0aGlzLl9jbG9zZUNoaWxkcmVuTWVudSh0aGlzLl9nZXRQYXJlbnRFbGVtZW50KCkpO1xuICB9XG5cbiAgX2Nsb3NlQ2hpbGRyZW5NZW51KGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBbXS5mb3JFYWNoLmNhbGwoZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3BlbicpLCAoZWw6IEVsZW1lbnQpID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9nZXRIb3N0RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIF9nZXRQYXJlbnRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGU7XG4gIH1cblxuICBfZ2V0U2libGluZ0VsZW1lbnRzKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBsZXQgc2libGluZ0VsZW1lbnRzOiBBcnJheTxOb2RlPiA9IFtdO1xuICAgIGxldCBlbCA9IGVsZW1lbnQucGFyZW50Tm9kZS5maXJzdENoaWxkO1xuICAgIGZvciAoOyBlbDsgZWwgPSBlbC5uZXh0U2libGluZykge1xuICAgICAgaWYgKGVsLm5vZGVUeXBlID09IDEgJiYgZWwgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgc2libGluZ0VsZW1lbnRzLnB1c2goZWwpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2libGluZ0VsZW1lbnRzO1xuICB9XG5cbiAgX2dldENsb3Nlc3RFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQsIHRhcmdldDogc3RyaW5nKTogRWxlbWVudCB7XG4gICAgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKHRhcmdldCkpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIGxldCBwYXJlbnRFbDogRWxlbWVudDtcbiAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgcGFyZW50RWwgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBpZiAocGFyZW50RWwgJiYgcGFyZW50RWwuaGFzQXR0cmlidXRlKHRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudEVsO1xuICAgICAgfVxuICAgICAgZWxlbWVudCA9IHBhcmVudEVsO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIF9oYXNDbGFzcyhlbGVtZW50OiBFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZykge1xuICAgIHJldHVybiAoJyAnICsgZWxlbWVudC5jbGFzc05hbWUgKyAnICcpLmluZGV4T2YoJyAnICsgY2xhc3NOYW1lICsgJyAnKSA+IC0xO1xuICB9XG5cbiAgX2hhc0NoaWxkTWVudShldmVudDogYW55KSB7XG4gICAgbGV0IGVsID0gdGhpcy5fZ2V0Q2xvc2VzdEVsZW1lbnQoZXZlbnQudGFyZ2V0LCAnbWQyLW1lbnUtdHJpZ2dlcicpO1xuICAgIGlmIChlbCAmJiBlbCA9PT0gdGhpcy5fZ2V0SG9zdEVsZW1lbnQoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9nZXRQYXJlbnRFbGVtZW50KCkuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgZWwgPSB0aGlzLl9nZXRDbG9zZXN0RWxlbWVudChldmVudC50YXJnZXQsICdtZDItbWVudS1pdGVtJyk7XG4gICAgICBpZiAoZWwgJiYgZWwucXVlcnlTZWxlY3RvckFsbCgnW21kMi1tZW51LWNvbnRlbnRdJykubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=