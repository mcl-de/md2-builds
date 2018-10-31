import { CanDisable } from '../common-behaviors/disabled';
export declare class MdOptgroupBase {
}
export declare const _MdOptgroupMixinBase: import("projects/angular-md/src/lib/core/common-behaviors/constructor").Constructor<CanDisable> & typeof MdOptgroupBase;
/**
 * Component that is used to group instances of `md-option`.
 */
export declare class MdOptgroup extends _MdOptgroupMixinBase implements CanDisable {
    /** Label for the option group. */
    label: string;
    /** Unique id for the underlying label. */
    _labelId: string;
}
