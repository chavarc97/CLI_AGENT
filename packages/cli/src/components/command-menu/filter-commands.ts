import type { Command } from "./types";
import { COMMANDS } from "./commands";

/**
 * Selects commands whose names start with the provided query.
 *
 * Trims surrounding whitespace and performs a case-insensitive prefix match. If `query` is falsy (for example, an empty string), the full `COMMANDS` list is returned.
 *
 * @param query - The user-provided search string; leading/trailing whitespace is ignored and matching is case-insensitive
 * @returns An array of commands whose names begin with `query` (case-insensitive). If `query` is falsy, returns the complete `COMMANDS` array.
 */
export function getFilteredCommands(query: string): Command[] {
    if (!query) return COMMANDS;

    const q = query.trim().toLowerCase();

    return COMMANDS.filter((cmd) =>
        cmd.name.toLowerCase().startsWith(q)
    )
}