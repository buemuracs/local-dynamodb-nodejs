export interface EncodingService<T> {
  encode(content: T): string;
  decode(encoded: string): T;
}

export class EncodingServiceImpl<T> implements EncodingService<T> {
  encode(content: T): string {
    const buffer = Buffer.from(JSON.stringify(content), "utf-8");
    return buffer.toString("base64");
  }

  decode(encoded: string): T {
    const buffer = Buffer.from(encoded, "base64");
    return JSON.parse(buffer.toString("utf-8")) as unknown as T;
  }
}
