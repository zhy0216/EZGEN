import React from 'react';
import {generateTypes, TInt, DictType, camelToSnake} from './EZGen';

it('simple data', () => {
    const data = {
        "a": 1
    };
    let result = generateTypes(data);
    expect(result.length).toBe(1);
    let type = result[0];
    expect(type instanceof DictType).toBe(true);
    expect(Object.keys(type.typeDict).length).toBe(1);
    expect(type.typeDict['a']).toBe(TInt);
});


it("camel to snake", () => {
    expect(camelToSnake('aaaa')).toBe('aaaa');
    expect(camelToSnake('abAa')).toBe('ab_aa');
    expect(camelToSnake('Aaab')).toBe('aaab');
    expect(camelToSnake('AAaa')).toBe('a_aaa');
    expect(camelToSnake('aAaA')).toBe('a_aa_a');
    expect(camelToSnake('toLocaleDateString')).toBe('to_locale_date_string');
    expect(camelToSnake('ABCDE')).toBe('a_b_c_d_e');
})