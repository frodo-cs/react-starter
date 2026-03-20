type EventCallback = (data?: unknown) => void

class EventBus {
  private events: Record<string, EventCallback[]> = {}

  on(event: string, callback: EventCallback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  off(event: string, callback: EventCallback) {
    if (!this.events[event]) return
    this.events[event] = this.events[event].filter((cb) => cb !== callback)
  }

  emit(event: string, data?: unknown) {
    if (!this.events[event]) return
    this.events[event].forEach((callback) => callback(data))
  }
}

export const eventBus = new EventBus()
