import { signUpNewUser } from "@/app/auth/authContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Platform, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CadastroPage() {
  const [open, setOpen] = useState(false);
  const [dataHora, setDataHora] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [userName, setUserName] = useState("");
  const [dataNasc, setDataNasc] = useState(new Date());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.login}>
          <View style={styles.header}>
            <Link style={{ fontWeight: "500", fontSize: 20 }} href={"/"}>
              ← Voltar
            </Link>
            <Text>{"\n"}</Text>
          </View>
          <Text style={styles.title}>SaidApp</Text>
          <Text>
            Marque saidas com seus amigos,{"\n"}crie novas amizades{"\n"}e crie
            memorias que ficarão marcadas.{"\n"}
          </Text>
          <Text>{"\n"}</Text>
          <Text>Nome</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#00000046"
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          ></TextInput>
          <Text>{"\n"}</Text>
          <Text>Nome de usuário</Text>
          <TextInput
            value={userName}
            placeholderTextColor="#00000046"
            onChangeText={setUserName}
            style={styles.input}
            placeholder="@nome_de_usuario"
          ></TextInput>
          <Text>{"\n"}</Text>
          <Text>E-mail</Text>
          <TextInput
            value={email}
            placeholderTextColor="#00000046"
            autoComplete="email"
            onChangeText={setEmail}
            style={styles.input}
            placeholder="exemplo@dominio.com"
          ></TextInput>
          <Text>{"\n"}</Text>
          <Text>Data de nascimento</Text>
          {Platform.OS === "web" ? (
            <input
              type="datetime-local"
              onChange={(e) => setDataNasc(new Date(e.target.value))}
              style={{
                height: 40,
                width: 200,
                borderRadius: 10,
                border: "1px solid #000",
              }}
            />
          ) : (
            <>
              <Button
                text={dataNasc.toLocaleDateString()}
                onClick={() => setShowPicker(true)}
              />
              {showPicker && (
                <View>
                  <DateTimePicker
                    value={dataHora || new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onValueChange={(event, selectedDate) => {
                      setShowPicker(false);
                    }}
                    onDismiss={() => setOpen(false)}
                  />
                </View>
              )}
            </>
          )}
          <Text>{"\n"}</Text>
          <Text>Senha</Text>
          <TextInput
            value={senha}
            placeholderTextColor="#00000046"
            onChangeText={setSenha}
            secureTextEntry={true}
            style={styles.input}
            placeholder="Insira sua senha aqui"
          ></TextInput>
          <Text>{"\n"}</Text>
          <Button
            text="Concluir"
            onClick={() => signUp(nome, email, senha, userName, dataNasc)}
          />
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
export async function signUp(
  nome: string,
  email: string,
  password: string,
  userName: string,
  dataNasc: Date
) {
  if (password.length < 6) {
    alert("A senha deve ser maior que 6 caracteres");
    router.replace("/auth/cadastro");
    return "Incorrect Password";
  }
  if (nome && email && userName && password) {
    const res = await signUpNewUser(nome, email, password, userName, dataNasc);
    if (res.success == false) {
      router.replace("/");
    }
    if (res.success && !res.error) {
      router.replace("/(tabs)");
    }
  }
}
