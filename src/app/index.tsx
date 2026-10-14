import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SaidApp</Text>
      <Text>
        Marque saidas com seus amigos,{"\n"}crie novas amizades{"\n"}e crie
        memorias que ficarão marcadas.
      </Text>
      <View style={styles.buttons}>
        <Link style={styles.button} href="/auth/cadastro">
          Criar Conta
        </Link>
        <Text>{"\n"}</Text>
        <Link style={styles.button} href={"/auth/login"}>
          Fazer Login
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
  },
  buttons: {
    marginTop: 40,
  },
  button: {
    backgroundColor: "#000000",
    color: "#ffffff",
    borderColor: "#ffffff00",
    textDecorationLine: "none",
    textDecorationColor: "#ffffff",
    borderRadius: 15,
    width: 200,
    height: 60,
    marginBottom: 20,
    textAlign: "center",
    textAlignVertical: "center",
    alignContent: "space-evenly",
  },
  a: {
    textDecorationLine: "none",
    textDecorationColor: "white",
    color: "white",
    textAlign: "center",
    alignItems: "center",
  },
});
