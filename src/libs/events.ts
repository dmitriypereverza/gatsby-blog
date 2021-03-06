import EventEmitter from "events";

export class EventDispatcher<LIST_EVENTS_TYPES> {
  private eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.setMaxListeners(0);
  }

  emit<TYPE extends keyof LIST_EVENTS_TYPES>(
    type: TYPE,
    payload: LIST_EVENTS_TYPES[TYPE],
  ) {
    this.eventEmitter.emit(type as string, payload);
  }

  removeListener<TYPE extends keyof LIST_EVENTS_TYPES>(
    event: TYPE,
    handler: (payload: LIST_EVENTS_TYPES[TYPE]) => void,
  ) {
    this.eventEmitter.removeListener(event as string, handler);
  }

  public on<TYPE extends keyof LIST_EVENTS_TYPES>(
    type: TYPE,
    handler: (payload: LIST_EVENTS_TYPES[TYPE]) => void,
  ) {
    this.eventEmitter.addListener(type as string, handler);
  }
}
