/**
 * A Movement action on the Game board.
 */
export interface Movement {
  /**
   * The change in the y-axis.
   * A positive value represents a downard movement.
   * A negative value represents an upward movement.
   */
  dy: number;

  /**
   * The change in the x-axis.
   * A positive value represents a rightward movement.
   * A negative value represents a leftward movement.
   */
  dx: number;
}
