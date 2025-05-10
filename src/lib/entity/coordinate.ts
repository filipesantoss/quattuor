/**
 * A Coordinate of the Game board.
 */
export interface Coordinate {
  /**
   * A unique identifier for the Coordinate.
   */
  id: string;

  /**
   * The x-axis value of the Coordinate.
   */
  x: number;

  /**
   * The y-axis value of the Coordinate.
   */
  y: number;
}
