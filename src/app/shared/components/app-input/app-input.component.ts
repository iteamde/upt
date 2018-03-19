import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AppInputComponent),
    multi: true
};

@Component({
    selector: 'app-app-input',
    templateUrl: './app-input.component.html',
    styleUrls: ['./app-input.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class AppInputComponent implements OnInit, ControlValueAccessor {
    // The internal data model
    private innerValue: any = '';

    // Placeholders for the callbacks which are later provided
    // by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor() { }

    ngOnInit() {
    }

    // get accessor
    get value(): any {
        return this.innerValue;
    }

    // set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    // Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    // From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }



    changePrice(val) {
        console.log(val);
        const regex = /[\d\.]*/g;
        const m: any = regex.exec(val);
        regex.lastIndex++;
        const m1: any = regex.exec(val);
        if (m && m[0]) {
            val = parseFloat(m[0] ? m[0] : '0');
        } else if (m1 && m1[0]) {
            val = parseFloat(m1[0] ? m1[0] : '0');
        }
        if (!val) {
            val = 0;
        }
        return val;
    }

    onChangeListPrice(val) {
        const value = this.changePrice(val);
        this.innerValue = value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }


}
