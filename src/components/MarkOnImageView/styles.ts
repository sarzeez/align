import { StyleSheet } from "react-native";

export const MARKER_SIZE = 48;

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  markerInner: {
    width: MARKER_SIZE / 2,
    height: MARKER_SIZE / 2,
    backgroundColor: "white",
    borderRadius: MARKER_SIZE / 2 / 2,
  },
  markerOuter: {
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    borderRadius: MARKER_SIZE / 2,
    backgroundColor: "#FFE3BC98",
    alignItems: "center",
    justifyContent: "center",
  },
});
