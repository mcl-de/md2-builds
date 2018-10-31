/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Stripped-down HammerJS annotations to be used within Material, which are necessary,
 * because HammerJS is an optional dependency. For the full annotations see:
 * https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/hammerjs
 */
/**
 * \@docs-private
 * @record
 */
export function HammerInput() { }
/** @type {?} */
HammerInput.prototype.preventDefault;
/** @type {?} */
HammerInput.prototype.deltaX;
/** @type {?} */
HammerInput.prototype.deltaY;
/** @type {?} */
HammerInput.prototype.center;
/**
 * \@docs-private
 * @record
 */
export function HammerStatic() { }
/* TODO: handle strange member:
new(element: HTMLElement | SVGElement, options?: any): HammerManager;
*/
/** @type {?} */
HammerStatic.prototype.Pan;
/** @type {?} */
HammerStatic.prototype.Swipe;
/** @type {?} */
HammerStatic.prototype.Press;
/**
 * \@docs-private
 * @record
 */
export function Recognizer() { }
/* TODO: handle strange member:
new(options?: any): Recognizer;
*/
/** @type {?} */
Recognizer.prototype.recognizeWith;
/**
 * \@docs-private
 * @record
 */
export function RecognizerStatic() { }
/**
 * \@docs-private
 * @record
 */
export function HammerInstance() { }
/** @type {?} */
HammerInstance.prototype.on;
/** @type {?} */
HammerInstance.prototype.off;
/**
 * \@docs-private
 * @record
 */
export function HammerManager() { }
/** @type {?} */
HammerManager.prototype.add;
/** @type {?} */
HammerManager.prototype.set;
/** @type {?} */
HammerManager.prototype.emit;
/** @type {?} */
HammerManager.prototype.off;
/** @type {?} */
HammerManager.prototype.on;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VzdHVyZS1hbm5vdGF0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItbWQyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvZ2VzdHVyZXMvZ2VzdHVyZS1hbm5vdGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTdHJpcHBlZC1kb3duIEhhbW1lckpTIGFubm90YXRpb25zIHRvIGJlIHVzZWQgd2l0aGluIE1hdGVyaWFsLCB3aGljaCBhcmUgbmVjZXNzYXJ5LFxuICogYmVjYXVzZSBIYW1tZXJKUyBpcyBhbiBvcHRpb25hbCBkZXBlbmRlbmN5LiBGb3IgdGhlIGZ1bGwgYW5ub3RhdGlvbnMgc2VlOlxuICogaHR0cHM6Ly9naXRodWIuY29tL0RlZmluaXRlbHlUeXBlZC9EZWZpbml0ZWx5VHlwZWQvdHJlZS9tYXN0ZXIvaGFtbWVyanNcbiAqL1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGludGVyZmFjZSBIYW1tZXJJbnB1dCB7XG4gIHByZXZlbnREZWZhdWx0OiAoKSA9PiB7fTtcbiAgZGVsdGFYOiBudW1iZXI7XG4gIGRlbHRhWTogbnVtYmVyO1xuICBjZW50ZXI6IHsgeDogbnVtYmVyOyB5OiBudW1iZXI7IH07XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgaW50ZXJmYWNlIEhhbW1lclN0YXRpYyB7XG4gIG5ldyhlbGVtZW50OiBIVE1MRWxlbWVudCB8IFNWR0VsZW1lbnQsIG9wdGlvbnM/OiBhbnkpOiBIYW1tZXJNYW5hZ2VyO1xuXG4gIFBhbjogUmVjb2duaXplcjtcbiAgU3dpcGU6IFJlY29nbml6ZXI7XG4gIFByZXNzOiBSZWNvZ25pemVyO1xufVxuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuZXhwb3J0IGludGVyZmFjZSBSZWNvZ25pemVyIHtcbiAgbmV3KG9wdGlvbnM/OiBhbnkpOiBSZWNvZ25pemVyO1xuICByZWNvZ25pemVXaXRoKG90aGVyUmVjb2duaXplcjogUmVjb2duaXplciB8IHN0cmluZyk6IFJlY29nbml6ZXI7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgaW50ZXJmYWNlIFJlY29nbml6ZXJTdGF0aWMge1xuICBuZXcob3B0aW9ucz86IGFueSk6IFJlY29nbml6ZXI7XG59XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG5leHBvcnQgaW50ZXJmYWNlIEhhbW1lckluc3RhbmNlIHtcbiAgb24oZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQ7XG4gIG9mZihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZDtcbn1cblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbmV4cG9ydCBpbnRlcmZhY2UgSGFtbWVyTWFuYWdlciB7XG4gIGFkZChyZWNvZ25pc2VyOiBSZWNvZ25pemVyIHwgUmVjb2duaXplcltdKTogUmVjb2duaXplcjtcbiAgc2V0KG9wdGlvbnM6IGFueSk6IEhhbW1lck1hbmFnZXI7XG4gIGVtaXQoZXZlbnQ6IHN0cmluZywgZGF0YTogYW55KTogdm9pZDtcbiAgb2ZmKGV2ZW50czogc3RyaW5nLCBoYW5kbGVyPzogRnVuY3Rpb24pOiB2b2lkO1xuICBvbihldmVudHM6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiB2b2lkO1xufVxuIl19