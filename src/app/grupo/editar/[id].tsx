import { getUserID } from "@/app/auth/authContext";
import { Interesse } from "@/app/interfaces/interesse";
import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import {
  addInterestsToGroup,
  editarGrupo,
  getGroup,
  getGroupInterests,
  getInteresse,
  getInterestsOfUser,
} from "@/lib/databaseHandler";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Grupo } from "../../interfaces/grupo";

export default function EditarGrupo() {
  // para o dropDownPicker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number[]>([]);
  const [interessesItems, setInteressesItems] = useState([
    { label: "Selecione um interesse", value: "" },
  ]);

  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<Grupo | null>(null);
  const [loading, setLoading] = useState(true);
  const grupoId = Number(id);

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [interesses, setInteresses] = useState<Interesse[] | null>(null);

  useEffect(() => {
    async function fetchGroup() {
      const resultado = await getGroup(grupoId);
      const UserId = await getUserID();
      if (resultado?.data) {
        setData(resultado.data);
        setNewName(resultado.data.nome);
        setNewDescription(resultado.data.descricao);
      }
      try {
        const resInterests = await getInterestsOfUser(UserId);
        const resGrupoInterests = await getGroupInterests(resultado.data.id);
        if (resInterests) {
          setInteresses(resultado.data);
          var interessesArray = resInterests.map((interesse: Interesse) => ({
            label: interesse.nome,
            value: interesse.id,
          }));
          if (interessesArray != undefined) {
            setInteressesItems(interessesArray as any);
          }
        }
        var interestArray: number[] = [];
        if (resGrupoInterests) {
          for (
            let index = 1;
            index <= (resGrupoInterests.data?.length as any);
            index++
          ) {
            const interest = await getInteresse(resInterests[index].id);
            interestArray.push(interest.data.id);
          }
          setValue(interestArray);
        }
      } catch (error) {
        console.log("erro: " + error);
      }
      if (resultado.data?.usuariocriadorid != UserId) {
        alert("Você não pode alterar o grupo.");
        router.replace("/(tabs)/grupos");
      }
    }
    fetchGroup();
  }, [grupoId, setInteressesItems]);

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <View style={styles.header}>
          <Link
            style={{ fontWeight: "500", fontSize: 20 }}
            href={"/(tabs)/grupos"}
          >
            ← Voltar
          </Link>
          <Text>{"\n"}</Text>
        </View>
        <Text>Nome</Text>
        <TextInput
          style={styles.input}
          value={newName}
          onChangeText={setNewName}
        ></TextInput>
        <Text>{"\n"}</Text>
        <Text>Descrição</Text>
        <TextInput
          multiline
          style={styles.multilineInput}
          value={newDescription}
          onChangeText={setNewDescription}
          numberOfLines={4}
          maxLength={200}
        ></TextInput>
        <Text>{"\n"}</Text>
        <Text>Interesses do grupo</Text>
        <GroupDropDown
          open={open as any}
          value={value}
          items={interessesItems}
          setOpen={setOpen as any}
          setValue={setValue}
          setItems={setInteressesItems as any}
        />
        <Text>{"\n"}</Text>
        <Button
          text="Alterar grupo"
          onClick={() => updateGroup(newName, newDescription, grupoId, value)}
        />
      </View>
    </View>
  );
}
async function updateGroup(
  nome: string,
  description: string,
  groupId: number,
  interesses: number[],
) {
  try {
    const result = await addInterestsToGroup(groupId, interesses);
    if (!result.success) {
      console.log("Erro ao editar grupo: " + result.error);
    }
  } catch (e) {
    router.reload();
  }
  try {
    const result = await editarGrupo(groupId, nome, description);
    if (!result.success) {
      alert("Erro ao editar grupo: " + JSON.stringify(result.error));
      return;
    }

    router.push("/(tabs)/grupos");
  } catch (e) {
    console.error("Erro no updateGroup:", e);
    alert("Erro inesperado: " + e);
  }
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
      multiple
      min={0}
      max={20}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}
