// https://www.npmjs.com/package/in-view

import { inViewRegistry, type InViewRegistry, type InViewRegistryOptions } from './registry'
import { inViewport, type InViewportOption } from './viewport'
import { throttle, isNumber, isElement } from 'lodash'

type Selectors = Map<string | Element, InViewRegistry>

/**
 * Create and return the inView function.
 */
const inViewFn = () => {
  /**
   * Fallback if window is undefined.
   */
  if (typeof window === 'undefined') return

  /**
   * How often and on what events we should check
   * each registry.
   */
  const interval = 100
  const triggers = ['scroll', 'resize', 'load']

  /**
   * Maintain a hashmap of all registries, a history
   * of selectors to enumerate, and an options object.
   */
  const selectors: Selectors = new Map()

  const options: InViewRegistryOptions = {
    offset: {} as InViewRegistryOptions['offset'],
    threshold: 0,
    test: inViewport
  }

  /**
   * Check each registry from selector history,
   * throttled to interval.
   */
  const check = throttle(() => {
    for (const selector of selectors.values()) {
      selector.check()
    }
  }, interval)

  /**
   * For each trigger event on window, add a listener
   * which checks each registry.
   */
  triggers.forEach((event) => addEventListener(event, check))

  /**
   * If supported, use MutationObserver to watch the
   * DOM and run checks on mutation.
   */
  if (window.MutationObserver) {
    addEventListener('DOMContentLoaded', () => {
      new MutationObserver(check).observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true
      })
    })
  }

  /**
   * The main interface. Take a selector and retrieve
   * the associated registry or create a new one.
   */
  const control = (selector: string | Element) => {
    if (typeof selector !== 'string' && !isElement(selector)) {
      return
    }

    // Get an up-to-date list of elements.
    const elements = typeof selector === 'string' ? [].slice.call(document.querySelectorAll(selector)) : [selector]

    // If the registry exists, update the elements.
    if (selectors.has(selector)) {
      const result = selectors.get(selector)!
      result.elements = elements
      selectors.set(selector, result)
    }

    // If it doesn't exist, create a new registry.
    else {
      selectors.set(selector, inViewRegistry(elements, options))
    }

    return selectors.get(selector)!
  }

  /**
   * Mutate the offset object with either an object
   * or a number.
   */
  control.offset = (o: number | InViewportOption['offset']) => {
    if (o === undefined) return options.offset
      ; (['top', 'right', 'bottom', 'left'] as const).forEach(
        isNumber(o)
          ? (dim) => (options.offset[dim] = o)
          : (dim) => (isNumber(o[dim]) ? (options.offset[dim] = o[dim]) : null)
      )
    return options.offset
  }

  /**
   * Set the threshold with a number.
   */
  control.threshold = (n: number) => {
    return typeof n === 'number' && n >= 0 && n <= 1 ? (options.threshold = n) : options.threshold
  }

  /**
   * Use a custom test, overriding inViewport, to
   * determine element visibility.
   */
  control.test = (fn: typeof inViewport) => {
    return typeof fn === 'function' ? (options.test = fn) : options.test
  }

  /**
   * Add proxy for test function, set defaults,
   * and return the interface.
   */
  control.is = (el: Element) => options.test(el, options)
  control.offset(0)
  return control
}

// Export a singleton.
export const inView = inViewFn()
