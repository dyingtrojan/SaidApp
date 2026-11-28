import { SelectItem } from "@/components/selectItem";
import { styles } from "@/components/styles";
import { getAllInterests, getInterestsWithName } from "@/lib/databaseHandler";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Interesse } from "../interfaces/interesse";
import { HeaderStyles } from "@/components/styles/headerStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContainerStyles } from "@/components/styles/containerStyles";


async function getInterests(name: string){
  if (name == "") return [];
  const res = await getInterestsWithName(name);
  const interSearch = res.data as Interesse[];
  return interSearch
}

export default function InteressesPages() {
  const [interestsSearched, setInteresseSearched] = useState("")
  const [interestsFound, setInterestsFound] = useState<Interesse[]>([])
  const [interesses, setInteresses] = useState<Interesse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getAllInterests();
      if (result.data) {
        setInteresses(result.data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <SafeAreaView style={ContainerStyles.normalContainer}>
      <View style={HeaderStyles.header}>
        <Link style={{ fontWeight: "500", fontSize: 20 }} href={"/(tabs)/perfil"}>
          ← Voltar
        </Link>
        <Text style={styles.title}>Interesses</Text>
      </View>
      <View style={{ flexDirection: "row"}}>
        <TextInput style={styles.input}
        placeholder="Digite o nome do seu interesse (Música)"
        defaultValue={interestsSearched}
        onChangeText={async (interesse) => 
          setInterestsFound(await getInterests(interesse))
        }
        placeholderTextColor={"#9d9d9d"}
        ></TextInput>
        <Text>{"\n"}</Text>
      </View>
      <ScrollView>
          {interestsFound.map((interesse) => (
            <View key={interesse.id} style={{flexDirection: "row", width: "100%"}}>
              <SelectItem key={interesse.id}
              id={interesse.id}
              text={interesse.nome}/>
            </View>
          ))}
        </ScrollView>
    </SafeAreaView>
  );
}
