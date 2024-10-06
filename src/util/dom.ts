export const getElemContentWidth = (elem: HTMLElement) => {
    const rect = elem.getBoundingClientRect()
    console.log('elem.offsetWidth', elem.offsetWidth)
    console.log('rect', rect)
    return rect.width;
}