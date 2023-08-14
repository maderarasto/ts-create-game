/**
 * Provides render content functionality.
 */
export default interface Renderable {
    /**
     * Render content of component using 2d rendering context.
     * 
     * @param context 
     */
    render(context: CanvasRenderingContext2D): void;
}