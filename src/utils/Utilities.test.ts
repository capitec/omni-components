import * as Utilities from './Utilities.js';

test('isFunction() returns false for non-functions', () => {
	expect(Utilities.isFunction({})).toEqual(false);
});

test('isFunction() returns true for functions', () => {
	expect(Utilities.isFunction(() => { /* */ })).toEqual(true);
});

test('isPromise() returns false for non-promises', () => {
	expect(Utilities.isPromise(() => { /* */ })).toEqual(false);
});

test('isPromise() returns true for promises', () => {
	expect(Utilities.isPromise(new Promise((resolve, reject) => {
		// do some async task
		resolve(undefined);
	}))).toEqual(true);
});

test('isObject() returns false for non-objects', () => {
	expect(Utilities.isObject('string')).toEqual(false);
});

test('isObject() returns true for objects', () => {
	expect(Utilities.isObject({})).toEqual(true);
});

test('getValue() returns nested value', () => {
	const obj = {
		inner: {
			final: 'val'
		}
	};

	const v = Utilities.getValue(obj, 'inner.final');
	expect(v).toEqual('val');
});

test('getValue() returns undefined if value error occurs', () => {
	const v = Utilities.getValue(null, 'inner.final');
	expect(v).toBeUndefined();
});

test('setValue() sets nested value', () => {
	const obj = {
		inner: {
			final: 'val'
		}
	};

	const obj2 = Utilities.setValue(obj, 'inner.other', 'newVal');

	expect(obj2.inner.other).toEqual('newVal');
	expect(obj).toEqual(obj2);
});

test('groupBy() with field', () => {
	const items = [
		{
			groupField: 'a',
			field: 'a'
		},
		{
			groupField: 'a',
			field: 'b'
		},
		{
			groupField: 'b',
			field: 'a'
		},
		{
			groupField: 'b',
			field: 'b'
		}
	];
	items.push({
		groupField: 'c',
		field: 'c'
	});

	const obj2 = Utilities.groupBy(items, 'groupField');

	// There are 3 groupings each with their own array
	expect(obj2.a).toBeTruthy();
	expect(obj2.b).toBeTruthy();
	expect(obj2.c).toBeTruthy();

	// There should be 2 in the 'a' group
	expect(obj2.a.length).toEqual(2);

	// There should be 2 in the 'b' group
	expect(obj2.b.length).toEqual(2);

	// There should be 1 in the 'c' group
	expect(obj2.c.length).toEqual(1);
});

test('groupBy() with function', () => {
	const items = [
		{
			groupField: 'a',
			field: 'a'
		},
		{
			groupField: 'a',
			field: 'b'
		},
		{
			groupField: 'b',
			field: 'a'
		},
		{
			groupField: 'b',
			field: 'b'
		}
	];
	items.push({
		groupField: 'c',
		field: 'c'
	});

	const obj2 = Utilities.groupBy(items, (accumulator: { [x: string]: any; }, currentValue: any) => {
		accumulator[Utilities.getValue(currentValue, 'groupField')] = [...accumulator[Utilities.getValue(currentValue, 'groupField')] || [], currentValue];
		return accumulator;
	});

	// There are 3 groupings each with their own array
	expect(obj2.a).toBeTruthy();
	expect(obj2.b).toBeTruthy();
	expect(obj2.c).toBeTruthy();

	// There should be 2 in the 'a' group
	expect(obj2.a.length).toEqual(2);

	// There should be 2 in the 'b' group
	expect(obj2.b.length).toEqual(2);

	// There should be 1 in the 'c' group
	expect(obj2.c.length).toEqual(1);
});

test('formatBytes() returns correct format for 0 Bytes', () => {
	const v = Utilities.formatBytes(0);
	expect(v).toEqual('0 Bytes');
});

test('formatBytes() returns correct format for no Bytes provided', () => {
	const v = Utilities.formatBytes(null);
	expect(v).toEqual('0 Bytes');
});

test('formatBytes() returns correct format for wrong bytes provided', () => {
	const v = Utilities.formatBytes('abc' as any);
	expect(v).toEqual('0 Bytes');
});

test('formatBytes() returns correct format for negative bytes provided', () => {
	const v = Utilities.formatBytes(-13);
	expect(v).toEqual('0 Bytes');
});

test('formatBytes() returns correct format for positive kilo bytes provided', () => {
	const v = Utilities.formatBytes(1654);
	expect(v).toEqual('1.62 KB');
});

test('formatBytes() returns correct format for positive kilo bytes provided with decimals', () => {
	const v = Utilities.formatBytes(1654, 3);
	expect(v).toEqual('1.615 KB');
});

test('formatBytes() returns correct format for positive kilo bytes provided with no decimals', () => {
	const v = Utilities.formatBytes(1654, 0);
	expect(v).toEqual('2 KB');
});

test('deepCopy() returns cloned objects correctly', () => {
	const c = Utilities.deepCopy({ abc: 'abc' });
	expect(c.abc).toEqual('abc');
});

test('deepCopy() returns nested cloned objects correctly', () => {
	const c = Utilities.deepCopy({
		abc: {
			xyz: 'xyz'
		}
	});
	expect(c.abc.xyz).toEqual('xyz');
});

test('deepCopy() returns cloned array correctly', () => {
	const c = Utilities.deepCopy([{ abc: 'abc' }, { xyz: 'xyz' }]);
	expect(c).toBeInstanceOf(Array);
});