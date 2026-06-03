import * as vscode from 'vscode';

const leadingSpacesMatcher = /^\s*/;
const blankLineMatcher = /^\s*$/;

export const trim = (selected: string): string => {
	const lines = selected.split("\n");

	// Only non-blank lines should influence the shared indent. An empty or
	// whitespace-only line has zero (or fewer) leading spaces and would
	// otherwise force the minimum to zero, leaving the block un-trimmed.
	const leadingSpaceCount = lines.reduce((acc, currentLine) => {
		if (blankLineMatcher.test(currentLine)) {
			return acc;
		}
		const match = currentLine.match(leadingSpacesMatcher);
		const numLeading = match && match.length >= 1 ? match[0].length : 0;
		return (acc === -1 || numLeading < acc) ? numLeading : acc;
	}, -1);

	// -1 means there were no non-blank lines, so there's nothing to strip.
	const indent = leadingSpaceCount < 0 ? 0 : leadingSpaceCount;
	const spaceRegex = RegExp(`^${' '.repeat(indent)}`);

	// Blank lines are normalized to empty so they don't keep stray whitespace.
	const fixed = lines.map(l => (blankLineMatcher.test(l) ? '' : l.replace(spaceRegex, '')));
	return fixed.join("\n");
};

export function activate(context: vscode.ExtensionContext) {
  const trimLeadingWhitespace = vscode.commands.registerTextEditorCommand('trim-leading-whitespace.trimLeadingWhitespace', async (te, edit) => {
    const selected = te.document.getText(te.selection);
		const trimmed = trim(selected);
		edit.replace(te.selection, trimmed);
  });
  context.subscriptions.push(trimLeadingWhitespace);

}

export function deactivate() {}

