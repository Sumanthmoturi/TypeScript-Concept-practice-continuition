//Utility types

//1.Partial<Type> :- Partial changes all the properties in an object to be optional
interface Point {
    x:number;
    y:number;
}
const pointPart:Partial<Point> = {}
pointPart.x=10;

//2.Required<Type> :- Required changes alll the properties in an object to be required
interface Cars {
    make:string;
    model:string;
    year?:number;
}
let myCar:Required<Cars> = {
    make:"Ford",
    model:"Sport",
    year:2000
}
myCar.make= "Baleno"


//3.Record<Type> :- Record is a shortcut to define an object type with a specific key type and value type
const nameAgeGap:Record<string,number> = {
    "Alice":21,
    "Bob":25,
}


//4.Omit :- Removes keys from an object type
interface aPerson {
    name:string;
    age:45;
    location?:string;
}
const Bob:Omit<aPerson, 'age' | 'location'> = {
    name:"Bob"
}


//5.Pick :- Removes all but picks specfied keys from an object type
interface bPerson {
    name:string;
    age:number;
    location?:string;
}
const bob1:Pick<bPerson, 'name'> = {
    name:"Bob1"
}


//6.Exclude :- Exclude removes types from union
type Primitive= string | number | boolean;
const theValue:Exclude<Primitive, string> = true;

type primitive1= string | number | boolean | string[];
const secondValue:Exclude<primitive1, boolean> = 60;

//7.ReturnType :- ReturnType extracts the return type of a function type
type PointGenerator= () => {x:number; y:number}
const point:ReturnType<PointGenerator> = {
    x:10,
    y:20
}

//8.Parameters:- Parameter extracts paramter types of a function type as an array
type Pointer= (P:{x:number; y:number}) => void;
const point1:Parameters<Pointer>[0] = {
    x:10,
    y:20
}

//9.ReadOnly :- ReadOnly is used to create a new type where all properties are readonly, they cannot be modified once assigned a value
interface cPerson {
    name:string;
    age:number;
}
const personc:Readonly<cPerson> = {
    name:"Harry",
    age:14,
}



/15.TS Basic Generics:-

//-> Functions
function createpairs<S,T>(v1:S,v2:T):[S,T] {
    return [v1,v2];
}
console.log(createpairs<string,number>('hello',42));

//->Classes:- Generics can be used to create generalized classes
class NamedValue<T> {
    private _value: T | undefined;
  
    constructor(private name: string) {}
  
    public setValue(value: T) {
      this._value = value;
    }
  
    public getValue(): T | undefined {
      return this._value;
    }
  
    public toString(): string {
      return `${this.name}: ${this._value}`;
    }
  }
  
  let value = new NamedValue<number>('myNumber');
  value.setValue(10);
  console.log(value.toString());

//->Type Aliases
type Wrapped<T> = {value:T};
const wrappedValue:Wrapped<number>={value:10};

//->Default value
class NamedValue<T = string> {
    private _value: T | undefined;
  
    constructor(private name: string) {}
  
    public setValue(value: T) {
      this._value = value;
    }
  
    public getValue(): T | undefined {
      return this._value;
    }
  
    public toString(): string {
      return `${this.name}: ${this._value}`;
    }
  }
  
  let value1 = new NamedValue('myNumber');
  value1.setValue('myValue');
  console.log(value.toString())


//->Extends
function createLoggedPair<S extends string | number, T extends string | number>(v1: S, v2: T): [S, T] {
    console.log(`creating pair: v1='${v1}', v2='${v2}'`);
    return [v1, v2];
  }



//TypeScript Keyof :- keyof is a keyword in typescript used to extract key type from an object type

//1.Keyof with explicit keys :- when expliciy keys are used on an object,keyof creates a union type with those keys
interface Person {
    name:string;
    age:number;
}
function printPersonProperty(person:Person,property:keyof Person) {
    console.log(`printing properties ${property}: ${person[property]}`)

}
let persona = {
    name:"Max",
    age:27,
}
printPersonProperty(person, "name");


//2.Keyof with index signatures :- keyof can be used with index signatures to extract index type
type StringMap = {[key:string]:unknown};
function createStringPair(property:keyof StringMap, value:string):StringMap {
    return {[property]:value};
}




//TypeScript Null and Undefined :- TS has powerful system to deal with null or undefined values

//1.strickNullChecks:- By default null and undefined are disabled and can be enabled by using strictNullChecks to true;

//2.Types :- Null and undefined are primitive types and can be used like other types,such as string;
let aValue: string | undefined | null= null;
aValue="hello";
aValue=undefined;

//3.Optional Chaining:- It is a JS feature that works well with TS's null handling. It can be used with ?. operator when accessing properties in an object
interface House {
    sqft:number;
    yard?: {
        sqft:number;
    }
}
function printYardSize(house:House) {
    const yardSize=house.yard?.sqft
    if (yardSize === undefined) {
        console.log("No Yard")
    } else {
        console.log(`Yard is ${yardSize} sqft`)
    }
}
let home: House = {
    sqft:500
};
printYardSize(home);


//4.Nullish Coalescence :- It is another JS feature that work well with TS's null handling. It can be used with ?? operator in an expression
function printMileage(mileage:number | null | undefined)
{
    console.log(`Mileage: ${mileage ?? 'Not available'}`)

}
printMileage(null)
printMileage(0);

//5.Null Assertion
function getValue(): string | undefined {
    return 'hello';
  }
  let values = getValue();
  console.log('value length: ' + values!.length);


//6.Array bounds handling:- Even with strictNullchecks enabled, by defauult TS will assume array access will never return undefined. the config noUncheckedIndexedAccess can be used to change this behaviour
let array:number[]=[1,2,3]
let valuess=array[0]




//TypeScript Definitely Typed:- Definitely typed is a prpject that provides a central repository of TypeScript definitions for NPM packages which do not have types
//1.npm install --save-dev @types/jquery

