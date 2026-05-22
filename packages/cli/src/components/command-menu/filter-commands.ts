import type { Command } from "./types";
import { COMMANDS } from "./commands";

export function getFilteredCommands(query: string): Command[] {
    if (!query) return COMMANDS;

    const q = query.trim().toLowerCase();

    return COMMANDS.filter((cmd) =>
        cmd.name.toLowerCase().startsWith(q)
    )
}