import { StyleSheet } from "react-native";
import { useFonts } from 'expo-font';
import { Color } from "expo-router";
import { Colors } from "./colors";

export const styles = StyleSheet.create({
  multilineInput: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    height: 80,
  },
  containerScroll: {
    padding: 30,
    marginTop: 20,
    flex: 1,
  },
  right: {
    alignContent: "flex-start",
  },
  buttonProfileEdit: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignContent: "flex-end",
  },
  input: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minWidth: "100%",
    width: "auto",
    height: 40,
  },
  searchInput: {
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    minWidth: "90%",
    width: "auto",
    height: 40,
  },
  title: {
    fontSize: 45,
    fontFamily: "Quicksand_400Regular",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 32,
    fontFamily: "Quicksand_700Bold",
    fontWeight: "semibold",
  },
  subtitle2: {
    fontSize: 16,
    fontFamily: "Quicksand_400Regular",
    fontWeight: "condensed",
    color: "#303030",
  },
  buttons: {
    marginTop: 40,
  },
  a: {
    textDecorationLine: "none",
    fontFamily: "Quicksand_400Regular",
    textDecorationColor: "white",
    color: "white",
  },
  titleScreenText_part1: {
    fontSize: 45,
    fontFamily: "Quicksand_400Regular",
    fontWeight: "bold",
    color: Colors.darkTeal
  },
  titleScreenText_part2: {
    fontSize: 45,
    fontFamily: "Quicksand_400Regular",
    fontWeight: "bold",
    color: Colors.carrotOrange
  }
});
