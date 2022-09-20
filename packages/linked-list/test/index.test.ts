import { cons, list, car, cdr, toString } from '../src';

describe('cons', () => {
  let pair;
  beforeEach(() => {
    pair = cons(1, 2);
  });

  it('makes a pair', () => {
    expect(toString(pair)).toEqual('(1, 2)');
  });

  it('returns first element of a pair', () => {
    expect(car(pair)).toEqual(1);
  });

  it('returns second element of a pair', () => {
    expect(cdr(pair)).toEqual(2);
  });
});

describe('list', () => {
  let lst;
  beforeEach(() => {
    lst = list(1, 2, 3);
  });

  it('makes an empty list with no arguments', () => {
    lst = list();

    expect(toString(lst)).toEqual(null);
  });

  it('makes a list with single argument', () => {
    lst = list(1);

    expect(toString(lst)).toEqual('(1, null)');
  });

  it('returns empty list when applying cdr to single-argument list', () => {
    lst = list(1);

    expect(toString(cdr(lst))).toEqual(null);
  });

  it('makes a list with several arguments', () => {
    expect(toString(lst)).toEqual('(1, (2, (3, null)))');
  });

  it('returns first element of a list', () => {
    expect(car(lst)).toEqual(1);
  });

  describe('applies cdr calls several times', () => {
    it('returns list of rest elements', () => {
      expect(toString(cdr(lst))).toEqual('(2, (3, null))');
    });

    it('returns list of rest rest elements', () => {
      expect(toString(cdr(cdr(lst)))).toEqual('(3, null)');
    });

    it('returns last list (empty list)', () => {
      expect(toString(cdr(cdr(cdr(lst))))).toEqual(null);
    });
  });
});

describe('car', () => {
  it('applies to en empty list throws an error', () => {
    expect(() => car(null)).toThrow();
  });
});

describe('cdr', () => {
  it('applies to an empty list throws an error', () => {
    expect(() => cdr(null)).toThrow();
  });
});
