/**
 * Renders a centered header displaying "CLI-" (gray) and "AGENT" (cyan) in tiny ASCII font.
 *
 * @returns A JSX element containing a centered layout with two `ascii-font` labels.
 */
export function Header() {
  return (
    <box justifyContent="center" alignItems="center">
      <box
        flexDirection="row"
        justifyContent="center"
        gap={0.5}
        alignItems="center"
      >
        <ascii-font font="tiny" text="CLI-" color="gray" />
        <ascii-font font="tiny" text="AGENT" color="cyan" />
      </box>
    </box>
  );
}
