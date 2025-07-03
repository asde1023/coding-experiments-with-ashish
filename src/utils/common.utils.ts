import { syncCrawl } from "@netcracker/qubership-apihub-json-crawl";
import { emptyEntityDenotation } from "../constants/common.constants";

/**
 * Prints an object in a tree-like structure to the console.
 * Recursively traverses the object and displays each property with proper indentation.
 *
 * @param obj - The object to print. Must be a record with string keys and unknown values.
 * @example
 * ```typescript
 * const data = {
 *   name: "John",
 *   address: {
 *     street: "123 Main St"
 *   },
 *   hobbies: ["reading"]
 * };
 * printObject(data);
 * // Output:
 * // name: John
 * // age: 30
 * // address:
 * //   street: 123 Main St
 * // hobbies:
 * //   reading
 * ```
 */
export const printObject = (obj: Record<string, unknown>): void => {
	syncCrawl(obj, ({ path, value, key }) => {
		if (path.length === 0 || value === undefined) return;

		const indent = "  ".repeat(path.length - 1);
		const keyName = key.toString();

		if (value === null) {
			console.log(`${indent}${keyName}: ${emptyEntityDenotation.null}`);
		} else if (isEmptyObject(value)) {
			console.log(`${indent}${keyName}: ${emptyEntityDenotation.emptyObject}`);
		} else if (isEmptyArray(value)) {
			console.log(`${indent}${keyName}: ${emptyEntityDenotation.emptyArray}`);
		} else if (isLeaf(value)) {
			console.log(`${indent}${keyName}: ${value}`);
		} else {
			console.log(`${indent}${keyName}:`);
		}
	});
};

/**
 * Checks if a value is an empty object (an object with no enumerable properties).
 *
 * @param value - The value to check.
 * @returns `true` if the value is a non-null object with no keys, `false` otherwise.
 * @example
 * ```typescript
 * isEmptyObject({}); // true
 * isEmptyObject({ name: "John" }); // false
 * isEmptyObject(null); // false
 * isEmptyObject([]); // false
 * ```
 */
const isEmptyObject = (value: unknown): boolean => {
	return (
		typeof value === "object" &&
		value !== null &&
		!Array.isArray(value) &&
		Object.keys(value).length === 0
	);
};

/**
 * Checks if a value is an empty array.
 *
 * @param value - The value to check.
 * @returns `true` if the value is an array with length 0, `false` otherwise.
 * @example
 * ```typescript
 * isEmptyArray([]); // true
 * isEmptyArray([1, 2, 3]); // false
 * isEmptyArray({}); // false
 * isEmptyArray(null); // false
 * ```
 */
const isEmptyArray = (value: unknown): boolean => {
	return Array.isArray(value) && value.length === 0;
};

/**
 * Checks if a value is a leaf node (primitive value or null).
 * A leaf node is a value that cannot be further traversed.
 *
 * @param value - The value to check.
 * @returns `true` if the value is null or a primitive type, `false` if it's an object or array.
 * @example
 * ```typescript
 * isLeaf("hello"); // true
 * isLeaf(42); // true
 * isLeaf(null); // true
 * isLeaf({}); // false
 * isLeaf([]); // false
 * ```
 */
const isLeaf = (value: unknown): boolean => {
	return value === null || typeof value !== "object";
};
