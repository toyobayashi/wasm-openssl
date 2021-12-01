export as namespace openssl;

declare namespace Module {
  export const HEAP8: Int8Array;
  export const HEAP16: Int16Array;
  export const HEAP32: Int32Array;
  export const HEAPF32: Float32Array;
  export const HEAPF64: Float64Array;
  export const HEAPU8: Uint8Array;
  export const HEAPU16: Uint16Array;
  export const HEAPU32: Uint32Array;
  export function _free(ptr: number): void;
  export function _malloc(size: number): number;
  
  export class MD5 {
    update(data: string | Uint8Array): void;
    final(): Uint8Array;
    digest(): string;
    delete(): void;
  }
  export function md5(data: string | Uint8Array): string;
}

export declare interface ModuleOptions {
  arguments?: string[];
  buffer?: ArrayBuffer | SharedArrayBuffer;
  wasmMemory?: WebAssembly.Memory;
  locateFile?: (wasmBinaryPath: string, prefix: string) => string;
  logReadFiles?: boolean;
  printWithColors?: boolean;
  onAbort?: (message: string) => void;
  onRuntimeInitialized?: () => void;
  noExitRuntime?: boolean;
  noInitialRun?: boolean;
  preInit?: Function;
  preinitializedWebGLContext?: WebGLRenderingContext;
  preRun?: Function[];
  print?: (data: string) => void;
  printErr?: (data: string) => void;
  destroy?: (obj: any) => void;
  getPreloadedPackage?: (remotePackageName: string, remotePackageSize: number) => ArrayBuffer;
  instantiateWasm?: (imports: WebAssembly.Imports, successCallback: (instance: WebAssembly.Instance) => void) => false | {} | WebAssembly.Instance;
  onCustomMessage?: (message: any) => void;
}

declare async function init(options?: ModuleOptions): Promise<typeof Module>;

export default init;
