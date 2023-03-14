/// <reference types="vite/client" />

import { FormTypes } from "./config";

export {};

declare global {
  interface Window {
    api?: any;
  }
}
