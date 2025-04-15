export interface ClueType {
  id: number;
  text: string;
  code: string | null;
  hint?: string;
  isLast?: boolean;
}

export interface GameState {
  currentClue: number;
  unlockedClues: number[];
  currentPage: "game" | "howto";
}
