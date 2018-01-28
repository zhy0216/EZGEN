
class Type{
    constructor(name){
        this.name = name;
    }
    toString(){
        return this.name;
    }

    getClassifyName(){
        return capitalizeFirst(snakeToCamel(this.name));
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

function capitalizeFirst(string) {
    if (typeof string !== "string" || string.length === 0){
        return string;
    }
    return string[0].toUpperCase() + string.slice(1);
}

function isSnakeName(string){
    return string.indexOf("_") > 0
}

function snakeToCamel(string) {
    return string.replace(/(_\w)/g, function(m){return m[1].toUpperCase();});
}


export class EZen{
    constructor() {
        this.result = []
    }

    clear(){
        while (this.result.length > 0)
            this.result.pop()
    }


    generateHelper(data, className) {
        let type = getType(data);
        if (type === "int") {
            return TInt;
        } else if (type === "str") {
            return TStr;
        } else if (type === "float") {
            return TFloat;
        } else if (type === "list") {
            let listType = new ListType();
            listType.elementType = this.generateHelper(data[0], className);
            return listType
        } else if (type === "dict") {
            let dictType = new DictType(className);
            Object.keys(data).forEach(key => {
                let keyType = this.generateHelper(data[key], key);
                dictType.add(key, keyType);
            });
            this.result.push(dictType);
            return dictType;
        }
    }

    generateTypes(data, className) {
        className = className || "TopClass";
        this.generateHelper(data, className);
    }

    _outputMarshMallowCoulmn(keyname, type){
        if(type instanceof AtomType){
            return `${keyname} = fields.${type}()`
        }else if(type instanceof ListType){
            return `${keyname} = fields.List(fields.${type.elementType})`
        }else if(type instanceof DictType){
            return `${keyname} = fields.Nested(${type.getClassifyName()}Schema)`
        }
        throw Error(`type:${type} error`)

    }

    outputMarshMallow(config){
        config = config || {};
        let lines = [];
        for(const type of this.result){
            if(type instanceof DictType) {
                lines.push(`Class ${type.getClassifyName()}Schema(Schema):`);
                console.log(type);
                Object.keys(type.typeDict).forEach((key) => {
                    lines.push("    " + this._outputMarshMallowCoulmn(key, type.typeDict[key]));
                });
                lines.push("\n")
            }
        }
        return lines.join("\n")

    }

}