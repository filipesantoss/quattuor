export function encode<T extends object>(value: T) {
  const buffer = Buffer.from(JSON.stringify(value));
  return buffer.toString("base64");
}

export function decode<T extends object>(value: string): T {
  const buffer = Buffer.from(value, "base64");
  const data = JSON.parse(buffer.toString());
  return data as T;
}
