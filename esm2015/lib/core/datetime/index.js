/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { DateAdapter } from './date-adapter';
import { NativeDateAdapter } from './native-date-adapter';
import { MD_DATE_FORMATS } from './date-formats';
import { MD_NATIVE_DATE_FORMATS } from './native-date-formats';
export { DateAdapter } from './date-adapter';
export { MD_DATE_FORMATS } from './date-formats';
export { NativeDateAdapter } from './native-date-adapter';
export { MD_NATIVE_DATE_FORMATS } from './native-date-formats';
export class NativeDateModule {
}
NativeDateModule.decorators = [
    { type: NgModule, args: [{
                providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }],
            },] }
];
const ɵ0 = MD_NATIVE_DATE_FORMATS;
export class MdNativeDateModule {
}
MdNativeDateModule.decorators = [
    { type: NgModule, args: [{
                imports: [NativeDateModule],
                providers: [{ provide: MD_DATE_FORMATS, useValue: ɵ0 }],
            },] }
];
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLW1kMi8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2RhdGV0aW1lL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFHN0QsNEJBQWMsZ0JBQWdCLENBQUM7QUFDL0IsZ0NBQWMsZ0JBQWdCLENBQUM7QUFDL0Isa0NBQWMsdUJBQXVCLENBQUM7QUFDdEMsdUNBQWMsdUJBQXVCLENBQUM7QUFNdEMsTUFBTTs7O1lBSEwsUUFBUSxTQUFDO2dCQUNSLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsQ0FBQzthQUNqRTs7V0FNa0Qsc0JBQXNCO0FBRXpFLE1BQU07OztZQUpMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDM0IsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsSUFBd0IsRUFBQyxDQUFDO2FBQzFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RhdGVBZGFwdGVyfSBmcm9tICcuL2RhdGUtYWRhcHRlcic7XG5pbXBvcnQge05hdGl2ZURhdGVBZGFwdGVyfSBmcm9tICcuL25hdGl2ZS1kYXRlLWFkYXB0ZXInO1xuaW1wb3J0IHtNRF9EQVRFX0ZPUk1BVFN9IGZyb20gJy4vZGF0ZS1mb3JtYXRzJztcbmltcG9ydCB7TURfTkFUSVZFX0RBVEVfRk9STUFUU30gZnJvbSAnLi9uYXRpdmUtZGF0ZS1mb3JtYXRzJztcblxuXG5leHBvcnQgKiBmcm9tICcuL2RhdGUtYWRhcHRlcic7XG5leHBvcnQgKiBmcm9tICcuL2RhdGUtZm9ybWF0cyc7XG5leHBvcnQgKiBmcm9tICcuL25hdGl2ZS1kYXRlLWFkYXB0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9uYXRpdmUtZGF0ZS1mb3JtYXRzJztcblxuXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogRGF0ZUFkYXB0ZXIsIHVzZUNsYXNzOiBOYXRpdmVEYXRlQWRhcHRlcn1dLFxufSlcbmV4cG9ydCBjbGFzcyBOYXRpdmVEYXRlTW9kdWxlIHt9XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW05hdGl2ZURhdGVNb2R1bGVdLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTURfREFURV9GT1JNQVRTLCB1c2VWYWx1ZTogTURfTkFUSVZFX0RBVEVfRk9STUFUU31dLFxufSlcbmV4cG9ydCBjbGFzcyBNZE5hdGl2ZURhdGVNb2R1bGUge31cbiJdfQ==