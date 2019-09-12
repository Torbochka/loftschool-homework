import { assert } from 'chai';
import {
    palindrom
} from '../src/traine';

describe('Тренеровка', () => {

    describe('palindrom', () => {
        const result = palindrom('abcba');

        assert.isTrue(result, 'Это не полиндром!');
    });

});