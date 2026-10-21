import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import {
    createEvent,
    getGroupsLocalUserIsMemberInfo
} from "@/lib/databaseHandler";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getUserID } from "../auth/authContext";
import { Evento } from "../interfaces/evento";
import { Grupo } from "../interfaces/grupo";

export default function CriarEvento() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [evento, setEvento] = useState<Evento | null>(null);
  const [grupos, setGrupos] = useState<Grupo[] | []>([]);
  const [value, setValue] = useState(0);
  const [itemsGrupos, setGruposItems] = useState([
    { label: "Selecione um grupo", value: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserId] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const resultado = await getGroupsLocalUserIsMemberInfo();
        setGrupos(resultado);

        var gruposArray = resultado.map((grupo: Grupo) => ({
          label: grupo.nome,
          value: grupo.id,
        }));
        const usID = await getUserID();
        setUserId(usID);
        setGruposItems(gruposArray as any);
      } catch (error) {
        console.log("erro: " + error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [setGrupos]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <Link
            style={{ fontWeight: "500", fontSize: 20 }}
            href={"/(tabs)/grupos"}
          >
            ← Voltar
          </Link>
          <Text>{"\n"}</Text>
        </View>
        <Text style={styles.title}>Criação de evento</Text>
        <Text>{"\n"}</Text>
        <Text>Descrição do evento</Text>
        <TextInput
          value={descricao}
          onChangeText={setDescricao}
          style={styles.multilineInput}
          multiline
          numberOfLines={4}
          maxLength={200}
        ></TextInput>
        <Text>{"\n"}</Text>
        <Text>Grupo do evento</Text>
        <GroupDropDown
          open={open as any}
          value={value}
          items={itemsGrupos}
          setOpen={setOpen as any}
          setValue={setValue as any}
          setItems={setGruposItems as any}
        />
        <Text>{"\n"}</Text>
        <Button
          text="Criar event"
          onClick={() => CreateEvent(descricao, value, userID)}
        />
      </View>
    </View>
  );
}
export async function CreateEvent(
  descricao: string,
  value: number,
  userID: string,
) {
  await createEvent(descricao, value, userID);
  router.push("/(tabs)/eventos");
}
interface GroupDropDownProps {
  open: boolean;
  value: any;
  items: { label: string; value: any }[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export function GroupDropDown({
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
}: GroupDropDownProps) {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}
