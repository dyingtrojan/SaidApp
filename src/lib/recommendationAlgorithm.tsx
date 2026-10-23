import { Float } from "react-native/Libraries/Types/CodegenTypes";

export function CalcPoints(
  pos_x: Float,
  pos_y: Float,
  want_pos_x: Float,
  want_pos_y: Float,
) {
  var res = Math.sqrt((pos_x + want_pos_x) ** 2 - (pos_y + want_pos_y) ** 2);
  if (res > 2.5) {
    return { recommend: false };
  }
  return { recommend: true };
}
