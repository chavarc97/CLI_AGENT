import type { Command } from "./types";

export const COMMANDS: Command[] = [
  {
    name: "new",
    description: "Create a new conversation",
    value: "/new",
  },
  {
    name: "models",
    description: "Select AI model for generation",
    value: "/models",
  },
  {
    name: "agents",
    description: "Switch agents",
    value: "/agents",
  },
  { name: "sessions", 
    description: "Browse past sessions", 
    value: "/sessions" 
  },
  {
    name: "upgrade",
    description: "Buy more credits",
    value: "/upgrade",
  },
  {
    name: "theme",
    description: "Change color theme",
    value: "/theme",
  },
  {
    name: "usage",
    description: "Open billing portal in your browser",
    value: "/usage",
  },
  {
    name: "login",
    description: "Sign in with your browser",
    value: "/login",
  },
  {
    name: "logout",
    description: "Logout from the application",
    value: "/logout",
  },
  {
    name: "exit",
    description: "Exit the application",
    value: "/exit",
    action: (ctx) => {
      ctx.exit();
    },
  },
];
