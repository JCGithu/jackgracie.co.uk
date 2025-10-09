export function horizontalScroll(node: HTMLElement, options: { sensitivity?: number, smooth?: boolean } = {}) {
  const { sensitivity = 1, smooth = true } = { ...options };

  function handleWheel(event: WheelEvent) {
    const scrollAmount = event.deltaY * sensitivity;
    const { scrollLeft, scrollWidth, clientWidth } = node;

    // Check if we can scroll in the desired direction
    const canScrollLeft = scrollLeft > 0;
    const canScrollRight = scrollLeft < scrollWidth - clientWidth;

    // Only prevent default if we can actually scroll horizontally
    if ((scrollAmount < 0 && canScrollLeft) || (scrollAmount > 0 && canScrollRight)) {
      event.preventDefault();

      if (smooth) {
        node.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      } else {
        node.scrollLeft += scrollAmount;
      }
    }
  }

  // Add the wheel event listener
  node.addEventListener('wheel', handleWheel, { passive: false });

  // Return cleanup function
  return {
    destroy() {
      node.removeEventListener('wheel', handleWheel);
    },
    update(newOptions = {}) {
      const { sensitivity: newSensitivity = 1, smooth: newSmooth = true } = newOptions as { sensitivity?: number, smooth?: boolean };
      // Update options if needed (though typically not necessary)
      options.sensitivity = newSensitivity;
      options.smooth = newSmooth;
    }
  };
}
