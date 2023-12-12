export type OffsetKey = 'top' | 'right' | 'bottom' | 'left'

export interface InViewportOption {
  threshold: number
  offset: Record<OffsetKey, number>
}

/**
* Check whether an element is in the viewport by
* more than offset px.
*/
export function inViewport(element: Element, options: InViewportOption) {

  const { top, right, bottom, left, width, height } = element.getBoundingClientRect();
  const innerWidth= window.innerWidth;
  const innerHeight = window.innerHeight
  const intersection = {
    t: bottom,
    r: innerWidth - left,
    b: innerHeight - top,
    l: right
  };

  const threshold = {
    x: options.threshold * width,
    y: options.threshold * height
  };

  return intersection.t > (options.offset.top + threshold.y)
    && intersection.r > (options.offset.right + threshold.x)
    && intersection.b > (options.offset.bottom + threshold.y)
    && intersection.l > (options.offset.left + threshold.x);

}
