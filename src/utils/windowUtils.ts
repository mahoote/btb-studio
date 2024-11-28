/**
 * Scroll to the top of the page
 * @param behaviour
 */
export const scrollToTop = (behaviour: 'instant' | 'smooth' | 'auto' = 'instant') => {
    window.scrollTo({
        top: 0,
        behavior: behaviour,
    })
}
