import React from 'react';
import {generateTypes, TInt, DictType} from './EZen';

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
