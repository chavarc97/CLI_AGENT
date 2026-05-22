import { TextAttributes } from "@opentui/core";

/**
 * Renders a compact status bar showing a build label, a dimmed separator, and the version string.
 *
 * @returns A JSX element containing a horizontal row with "Build" in cyan, a dimmed gray "›" separator, and the version string "opus 4.6".
 */
export function StatusBar() {
    return (
        <box flexDirection="row" gap={1}>
            <text fg="cyan">Build</text>
            <text attributes={TextAttributes.DIM} fg="gray">
                ›
            </text>
            <text>opus 4.6</text>
        </box>
    )
}