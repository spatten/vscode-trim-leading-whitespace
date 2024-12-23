import * as vscode from 'vscode';

const leadingSpacesMatcher = /^\s*/;

export const trim = (selected: string): string => {
	const lines = selected.split("\n");
	const leadingSpaceCount = lines.reduce((acc, currentLine) => {
		const match = currentLine.match(leadingSpacesMatcher);
		const numLeading = match && match.length >= 1 ? match[0].length : 0;
		return (acc === -1 || numLeading < acc) ? numLeading : acc;
	}, -1);
	const spaceRegex = RegExp(`^${' '.repeat(leadingSpaceCount)}`);
	const fixed = lines.map(l => l.replace(spaceRegex, ''));
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

