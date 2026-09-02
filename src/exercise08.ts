export type EventMap = {
  launch: string;
  shutdown: number;
};


export class SimpleEventEmitter<T extends EventMap = EventMap> {

  private listeners: {
    [K in keyof T]?: Array<(data: T[K]) => void>;
  } = {};

  public on<K extends keyof T>(
    eventName: K,
    callback: (data: T[K]) => void,
  ): void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName]?.push(callback);
  }

  public emit<K extends keyof T>(eventName: K, data: T[K]): void {
    const handlers = this.listeners[eventName];
    if (handlers) {
      for (let i = 0; i < handlers.length; i++) {
        handlers[i](data);
      }
    }
  }
}
