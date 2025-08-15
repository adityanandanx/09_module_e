export type PhotoType = {
  id: string;
  url: string;
  filename: string;
  rotation?: number;
};

export type OperatingMode = "manual" | "auto" | "random";
export type ThemeType = "A" | "B" | "C" | "D" | "E" | "F";

// Keeping these as any for now, will fix later
export type KeyHandlerType = (key: any) => void;
