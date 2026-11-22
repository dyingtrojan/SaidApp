import { StyleSheet } from "react-native";
import { Colors } from "../colors";

export const HeaderStyles = StyleSheet.create({
    header: {
        alignSelf: "flex-start",
    },
    trueHeader: {
        padding: 20,
        alignSelf: "flex-start",
        flexDirection: "row",
        borderRadius: 15,
        backgroundColor: Colors.cream,
        width: "100%",
    },
    fixedHeader: {
        marginTop: 20,
        flexDirection: "row",
        position: "sticky",
        top: 0,
    },

})