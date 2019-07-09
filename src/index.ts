import { OnChangedEmitter, ChangeData } from 'on-changed-emitter';

export class OnNumberInRangeEmitter extends OnChangedEmitter {
    readonly minValue: number;
    readonly maxValue: number;
    private _isInRange: boolean = false;

    constructor(minValue: number, maxValue: number) {
        super();
        this.minValue = minValue;
        this.maxValue = maxValue;

        this.onChanged((changeData) => {
            if (this.isValueInRange(changeData.currentValue) && !this._isInRange) {
                this._isInRange = true;
                this.emitEnteredRange(changeData);
            } else if (!this.isValueInRange(changeData.currentValue) && this._isInRange) {
                this._isInRange = false;
                this.emitLeftRange(changeData);
            }
        })
    }

    set(value: number) {
        super.set(value);
    }

    onEnteredRange(callback: (changedData: ChangeData) => void) {
        this.on(OnNumberInRangeEmitter.EVENT_ENTERED_RANGE, callback);    
    }

    onLeftRange(callback: (changedData: ChangeData) => void) {
        this.on(OnNumberInRangeEmitter.EVENT_LEFT_RANGE, callback);    
    }

    protected emitEnteredRange(changeData: ChangeData) {
        this.emit(OnNumberInRangeEmitter.EVENT_ENTERED_RANGE, changeData);
    }

    protected emitLeftRange(changeData: ChangeData) {
        this.emit(OnNumberInRangeEmitter.EVENT_LEFT_RANGE, changeData);
    }

    isValueInRange(value: number) {
        return this.minValue <= value && 
               value <= this.maxValue;
    }

    private static get EVENT_ENTERED_RANGE() {
        return 'entered_range'
    }

    private static get EVENT_LEFT_RANGE() {
        return 'left_range'
    }
}
