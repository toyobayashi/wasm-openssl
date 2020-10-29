export as namespace openssl;

export declare class MD5 {
  update(data: string | Uint8Array): void;
  final(): Uint8Array;
  digest(): string;
  delete(): void;
}

export declare function md5(data: string | Uint8Array): string;

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
  export function _memalign(boundary: number, size: number): number;
  export function _memcpy(dest: number, source: number, size: number): number;
  export function _memset(dest: number, val: number, size: number): number;
  export function _htonl(hostlong: number): number;
  export function _htons(hostshort: number): number;
  export function _ntohs(netshort: number): number;
  
  export class MD5 extends openssl.MD5 {}
  export function md5(data: string | Uint8Array): string;
}

declare async function init(): Promise<typeof Module>;

export default init;
