import { useRef, useState, useMemo, type RefObject } from "react";
import type { ScrollBoxRenderable } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { getFilteredCommands } from "./filter-commands";
import type { Command } from "./types";

type UseCommandMenuReturn = {
  showCommandMenu: boolean;
  commandQuery: string;
  selectedIndex: number;
  scrollRef: RefObject<ScrollBoxRenderable | null>;
  handleContentChange: (text: string) => void;
  resolveCommand: (index: number) => Command | undefined;
  setSelectedIndex: (index: number) => void;
};

/**
 * Manages state and handlers for a slash-triggered command picker used by a text input.
 *
 * The hook tracks the current input text and whether the command menu is visible, derives
 * the active command query from input when the menu is shown (text after a leading `/`),
 * exposes keyboard-aware selection state and a scrollable list reference, and provides
 * handlers to update the input, resolve a selected command, and set the highlighted index.
 *
 * @returns An object with:
 *  - `showCommandMenu` — `true` when the command picker should be shown.
 *  - `commandQuery` — the active query string (the input after a leading `/` when the menu is visible; otherwise `""`).
 *  - `selectedIndex` — the currently highlighted command index.
 *  - `scrollRef` — `RefObject` to the scrollable command list container.
 *  - `handleContentChange` — function to call with new input text; updates state, resets selection, scrolls the list to top, and opens/closes the menu based on whether the text is a slash-prefixed single token.
 *  - `resolveCommand` — function that returns the `Command` at a given index (or `undefined`); if a command is found, the menu is closed.
 *  - `setSelectedIndex` — setter to update the highlighted index directly.
 */
export function useCommandMenu(): UseCommandMenuReturn {
  const [textValue, setTextValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showCommandMenu, setShowCommandMenu] = useState(false);

  const scrollRef = useRef<ScrollBoxRenderable | null>(null);

  const commandQuery =
    showCommandMenu && textValue.startsWith("/") ? textValue.slice(1) : "";

  const filteredCommands = useMemo(
    () => getFilteredCommands(commandQuery),
    [commandQuery],
  );

  const handleContentChange = (text: string) => {
    setTextValue(text);
    setSelectedIndex(0);

    // jump back to the top of the list when the user types a new character
    const scrollBox = scrollRef.current;
    if (scrollBox) {
      scrollBox.scrollTo(0);
    }

    const prefix = text.startsWith("/") ? text.slice(1) : null;

    if (prefix != null && !prefix.includes(" ")) {
      setShowCommandMenu(true);
    } else {
      setShowCommandMenu(false);
    }
  };

  // Resolve a command at a specific index (returns the command, caller handles execution)
  const resolveCommand = (index: number): Command | undefined => {
    const command = filteredCommands[index];
    if (command) {
      setShowCommandMenu(false);
    }

    return command;
  };

  //  Arrow keys move selection; the list follows along when the hghligh goes off-screen
  useKeyboard((key) => {
    if (!showCommandMenu) return;

    if (key.name == "escape") {
      key.preventDefault();
      setShowCommandMenu(false);
    } else if (key.name === "up") {
      key.preventDefault();
      setSelectedIndex((i: number) => {
        const newIndex = Math.max(0, i - 1);
        // keep the highlited item visible when arrowing past the edge
        const sb = scrollRef.current;
        if (sb && newIndex < sb.scrollTop) {
          sb.scrollTo(newIndex);
        }
        return newIndex;
      });
    } else if (key.name === "down") {
      key.preventDefault();
      setSelectedIndex((i: number) => {
        if (filteredCommands.length === 0) return 0;

        const newIndex = Math.min(filteredCommands.length - 1, i + 1);
        const sb = scrollRef.current;
        if (sb && newIndex >= sb.scrollTop + sb.height) {
          sb.scrollTo(newIndex - sb.height + 1);
        }
        return newIndex;
      });
    }
  });

  return {
    showCommandMenu,
    commandQuery,
    selectedIndex,
    scrollRef,
    handleContentChange,
    resolveCommand,
    setSelectedIndex,
  }
}
