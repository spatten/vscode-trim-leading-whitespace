import * as assert from 'assert';
import * as Trimmer from '../extension';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	const examples = [
		[`no change`, `no change`],
		[`   one line`, `one line`],
		[`  two\n  lines`, `two\nlines`],
		[`  one\n  two\n    three\n      four`, `one\ntwo\n  three\n    four`],
		[`  one\n  two\nthree`, `  one\n  two\nthree`]
	];
	test('test trimming', () => {
		examples.forEach(([input, expected]) => {
			const trimmed = Trimmer.trim(input);
			assert.deepEqual(trimmed, expected, `expected\n====\n${input}\n====\nto trim to\n====\n${expected}\n=====\nGot\n=====\n${trimmed}\n=====`);
		});
	});
});
