/*
  CSS-Variablen im style-Objekt: Bausteine wie `.spalten` lesen ihre
  Einzelwerte aus Variablen (`style={{ "--spalten": "1fr 1.05fr" }}`).
  Ohne diese Erweiterung verlangte TypeScript an jeder Stelle einen Cast.
*/
import "react";

declare module "react" {
  interface CSSProperties {
    [variable: `--${string}`]: string | number | undefined;
  }
}
