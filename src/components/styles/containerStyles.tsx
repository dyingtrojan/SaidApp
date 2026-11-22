import { StyleSheet } from "react-native"
import { Colors } from "../colors"


export const ContainerStyles = StyleSheet.create({
    normalContainer: {
        flex: 1,
        padding: 10,
    },
    centerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    formContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#666565",
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
    },
    sidewaysContainer: {
        flex: 1,
        padding: 10,
        
        overflow: "scroll",
        flexDirection: "row",
        rowGap: 20
    },
    groupIndexContainer: {
        alignSelf: "center",
        width: "95%"
    },
    login: {
        alignItems: "center",
        justifyContent: "center",
        borderColor: Colors.cream,
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
      },
})