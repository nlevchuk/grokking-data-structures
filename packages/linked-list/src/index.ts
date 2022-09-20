type Pair = (fn: Function) => any;
type List = (fn: Function) => any;
type EmptyList = null;
type ListArguments = any[];

/*
  Make a pair.

  Example:
  cons(1, 2)
*/
export const cons = function cons(x: any, y: any): Pair {
  return (fn): any => fn(x, y);
}

/*
  Make a list.

  Example:
  list()                - empty list
  list(1, 2, 3, ..., n) - list with elements
*/
export const list = function list(...args: ListArguments): List {
  return (fn): Pair | EmptyList => {
    if (args.length === 0) {
      return null;
    }

    const first = args[0];
    const rest = list.apply(null, args.slice(1));

    return cons(first, rest)(fn);
  }
};

/*
  Get first element of a list.

  Example:
  car(Pair|List)
*/
export const car = function car(node: Pair | List): any {
  return node((p, q) => p);
}

/*
  Get list of rest elements.

  Example:
  cdr(Pair|List)
*/
export const cdr = function cdr(node: Pair | List): any {
  return node((p, q) => q);
}

/*
  Stringify List or Pair.

  Example:
  toString(Pair|List)
*/
export const toString = function toString(node: Pair | List | any): string {
  if (typeof node !== "function") {
    return `${node}`;
  }

  return node((p, q) => `(${toString(p)}, ${toString(q)})`);
};
