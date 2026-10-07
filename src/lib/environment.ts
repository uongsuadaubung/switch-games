/**
 * true khi đang chạy bên trong Neutralino webview.
 */
export const IS_NEUTRALINO =
  typeof window !== "undefined" && typeof (window as unknown as { Neutralino?: unknown }).Neutralino !== "undefined";

/**
 * true khi đang chạy bên trong Desktop app (Neutralino hoặc Tauri).
 */
export const IS_DESKTOP = IS_NEUTRALINO;

/**
 * true khi mở thẳng trên browser (không qua app desktop).
 */
export const IS_BROWSER = !IS_DESKTOP;

/**
 * true khi Vite build ở chế độ development.
 */
export const IS_DEV = import.meta.env.DEV;
