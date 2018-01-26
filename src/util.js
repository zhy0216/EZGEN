
class Type{
    constructor(name){
        this.name = name;
    }
    toString(){
        return this.name;
    }
}

class AtomType extends Type{

}

export const TInt = new AtomType("int");
export const TFloat = new AtomType("float");
export const TStr = new AtomType("str");
export const TAny = new AtomType("any");

export class ComplexType extends Type{
    constructor(name){
        super(name);
    }
}

function getType(data){
    // maybe we need type class
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
    if(data === undefined || data === null){
        return "any";
    }

    if(Array.isArray(data)) {
        return "list"
    }

    let type =  typeof data;
    if(type === "number"){
        if(Number.isInteger(data)){
            return "int";
        }
        return "float";
    }else if(type === "string"){
        return "str";
    }else if(type === "object"){
        return "dict";
    }else{
        throw Error("do not support type: " + type)
    }
}

class ListType extends ComplexType{
    constructor() {
        super("list");
        this.elementType = TAny;
    }
    toString(){
        return "List[" + this.elementType.toString() + "]"
    }
}

export class DictType extends ComplexType{
    constructor(name){
        super(name);
        this.typeDict = {};
    }

    add(key, type){
        this.typeDict[key] = type;
    }

    toString(){
        let r = "";
        Object.keys(this.typeDict).forEach(attribute_name => {
            r += (attribute_name + ":" + this.typeDict[attribute_name]);
        });
        return r;
    }
}

function generateHelper(data, className, stack){
    let type = getType(data);
    if(type === "int"){
        return TInt;
    }else if(type === "list"){
        let listType = new ListType();
        listType.elementType = generateHelper(data[0], className, stack);
    }else if(type === "dict"){
        let dictType = new DictType(className);
        Object.keys(data).forEach(key => {
            let keyType = generateHelper(data[key], key, stack);
            dictType.add(key, keyType);
        });
        stack.push(dictType);
    }
}

export function generateTypes(data, className){
    className = className || "TopClass";
    let stack = [];
    generateHelper(data, className, stack);
    return stack;
}

// https://davidwalsh.name/javascript-debounce-function
export function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};