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
		[`  one\n  two\nthree`, `  one\n  two\nthree`],
		// An empty line in the middle should not block trimming, and stays empty.
		[`  one\n\n  two`, `one\n\ntwo`],
		// A whitespace-only line is ignored for the indent and normalized to empty.
		[`    one\n  \n    two`, `one\n\ntwo`],
		// Leading/trailing empty lines are preserved as empty.
		[`\n  one\n  two\n`, `\none\ntwo\n`]
	];
	test('test trimming', () => {
		examples.forEach(([input, expected]) => {
			const trimmed = Trimmer.trim(input);
			assert.deepEqual(trimmed, expected, `expected\n====\n${input}\n====\nto trim to\n====\n${expected}\n=====\nGot\n=====\n${trimmed}\n=====`);
		});
	});
});
