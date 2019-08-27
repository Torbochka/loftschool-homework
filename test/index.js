import { assert } from 'chai';
import {
    bind,
    reversePrint
} from '../src/index';

describe('Для анкеты', () => {

    describe('bind', () => {

        let calc = {
            a: 2,
            b: 2,
            sum(...args) {
                return this.a + this.b + [...args].reduce((a, c)=> a + c);
            }
        };

        it('Привязать контекст к функции через bind и проверить, что контекст привязан', () => {
            const result = bind(calc.sum, calc, 2);

            assert.equal(8, result(2));
        });
    });

    describe('reversePrint', () => {

        it('Сделать реверс связанного списка и проверить, что реверс прошел', () => {

            const someList = {
                value: 1,
                next: {
                    value: 2,
                    next: {
                        value: 3,
                        next: {
                            value: 4,
                            next: null
                        }
                    }
                }
            };

            assert.equal(1, reversePrint(someList));
        });
    });

});