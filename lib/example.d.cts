
export class Blob {
  constructor();
  constructor(len: number);
  constructor(other: Blob);

  static create(data: Buffer): Blob;

  fill(value: number): void;
  export(): Buffer;
  write(data: Buffer): void;
  writeAsync(data: Buffer): Promise<void>;
}

export class IntObject {
  constructor();
  constructor(arg0: IntObject);
  constructor(value: number);

  get(): number;
}

export function readOnlyVector(in_data: IntObject[]): number;

export function returnVector(): IntObject[];

export function putMap(in_data: Record<string, string>): void;

export function getMap(): Record<string, string>;
