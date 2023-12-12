import type { inViewport, InViewportOption } from './viewport'

/**
* - Registry -
*
* Maintain a list of elements, a subset which currently pass
* a given criteria, and fire events when elements move in or out.
*/

export type HandleEvent = 'enter' | 'exit'

export type HandleFun = ((e: Element) => void) | ((e: Element) => Promise<void>)

export interface InViewRegistryOptions {
  offset: InViewportOption['offset']
  threshold: number
  test: typeof inViewport
}

export class InViewRegistry {
  elements: Element[];
  options: InViewRegistryOptions;
  current: Element[];
  handlers: Record<HandleEvent, HandleFun[]>;
  singles: Record<HandleEvent, HandleFun[]>;

  constructor(elements: Element[], options: InViewRegistryOptions) {
    this.options = options;
    this.elements = elements;
    this.current = [];
    this.handlers = { enter: [], exit: [] };
    this.singles = { enter: [], exit: [] };
  }

  /**
  * Check each element in the registry, if an element
  * changes states, fire an event and operate on current.
  */
  check() {
    this.elements.forEach(el => {
      const passes = this.options.test(el, this.options);
      const index = this.current.indexOf(el);
      const current = index > -1;
      const entered = passes && !current;
      const exited = !passes && current;

      if (entered) {
        this.current.push(el);
        this.emit('enter', el);
      }

      if (exited) {
        this.current.splice(index, 1);
        this.emit('exit', el);
      }

    });
    return this;
  }

  /**
  * Register a handler for event, to be fired
  * for every event.
  */
  on(event: HandleEvent, handler: HandleFun) {
    this.handlers[event].push(handler);
    return this;
  }

  /**
  * Register a handler for event, to be fired
  * once and removed.
  */
  once(event: HandleEvent, handler: HandleFun) {
    this.singles[event].unshift(handler);
    return this;
  }

  /**
  * Emit event on given element. Used mostly
  * internally, but could be useful for users.
  */
  emit(event: HandleEvent, element: Element) {
    while (this.singles[event].length) {
      this.singles[event].pop()?.(element);
    }
    let length = this.handlers[event].length;
    while (--length > -1) {
      this.handlers[event][length](element);
    }
    return this;
  }

}

export const inViewRegistry = (elements: Element[], options: InViewRegistryOptions) => new InViewRegistry(elements, options);
