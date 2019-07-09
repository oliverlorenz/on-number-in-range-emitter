import test from 'tape';
import { OnNumberInRangeEmitter } from '../../src/index';

const TestObject = class TestObject extends OnNumberInRangeEmitter { }
const minValue = -1;
const maxValue = 1;
const valueInRange = 0;
const secondValueInRange = 0.5;
const valueOutsideRange = 2;
const secondValueOutsideRange = 3;

test('onEnteredRange calls callback once, if value is in range', function(t) {
    t.plan(1);

    const testObject = new TestObject(minValue, maxValue);
    testObject.onEnteredRange(() => {
        t.ok(true, 'callback was called once')
    })
    
    testObject.set(valueInRange)
});

test('onEnteredRange calls callback only once, if first set value is in range, and second value is also in range', function(t) {
    t.plan(1);

    const testObject = new TestObject(minValue, maxValue);
    testObject.onEnteredRange(() => {
        t.ok(true, 'callback was called once')
    })
    
    testObject.set(valueInRange);
    testObject.set(secondValueInRange);
})

test('onLeftRange calls callback once, if value is outside range', function(t) {
    t.plan(1);

    const testObject = new TestObject(minValue, maxValue);
    testObject.onLeftRange(() => {
        t.ok(true, 'callback was called once')
    })
    
    testObject.set(valueInRange);
    testObject.set(valueOutsideRange);
});

test('onLeftRange calls callback only once, if first set value is outside range, and second value is also outside range', function(t) {
    t.plan(1);

    const testObject = new TestObject(minValue, maxValue);
    testObject.onLeftRange(() => {
        t.ok(true, 'callback was called once')
    })
    
    testObject.set(valueInRange);
    testObject.set(valueOutsideRange);
    testObject.set(secondValueOutsideRange);
});
