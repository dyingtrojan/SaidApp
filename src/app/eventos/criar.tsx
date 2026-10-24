import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import {
  createEvent,
  criarLocal,
  getGroupsLocalUserIsMemberInfo,
  getLocais,
} from "@/lib/databaseHandler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { getUserID } from "../auth/authContext";
import { Evento } from "../interfaces/evento";
import { Grupo } from "../interfaces/grupo";
import { Local } from "../interfaces/local";

export default function CriarEvento() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [evento, setEvento] = useState<Evento | null>(null);
  const [dataHora, setDataHora] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [grupos, setGrupos] = useState<Grupo[] | []>([]);
  const [value, setValue] = useState(0);
  const [itemsGrupos, setGruposItems] = useState([
    { label: "Selecione um grupo", value: "" },
  ]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserId] = useState("");

  // locais
  const [openLocal, setOpenLocal] = useState(false);
  const [localValue, setLocalValue] = useState<number>(0);
  const [itemsLocais, setLocaisItems] = useState([
    { label: "Selecione um local", value: "" },
  ]);
  const [mostrarNovoLocal, setMostrarNovoLocal] = useState(false);
  const [novoLocalNome, setNovoLocalNome] = useState("");
  const [novoLocalDescricao, setNovoLocalDescricao] = useState("");

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
    fetchLocais();
  }, [setGrupos]);

  async function fetchLocais() {
    const resultadoLocais = await getLocais();
    if (resultadoLocais.data) {
      const locaisArray = resultadoLocais.data.map((local: Local) => ({
        label: local.nome,
        value: local.localid,
      }));
      console.log(locaisArray[0].value);
      setLocaisItems(locaisArray as any);
    }
  }

  async function adicionarNovoLocal() {
    if (!novoLocalNome) {
      alert("Digite um nome pro local.");
      return;
    }
    const resultado = await criarLocal(novoLocalNome, novoLocalDescricao);
    if (!resultado.success) {
      alert("Erro ao criar local: " + JSON.stringify(resultado.error));
      return;
    }
    await fetchLocais();
    setLocalValue(resultado.data.id);
    setNovoLocalNome("");
    setNovoLocalDescricao("");
    setMostrarNovoLocal(false);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderColor: "#666565",
          borderWidth: 1,
          borderRadius: 10,
          padding: 20,
          width: "90%",
        }}
      >
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
          key="dropdown-grupo"
          open={open as any}
          value={value}
          items={itemsGrupos as any}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setGruposItems as any}
        />
        <Text>{"\n"}</Text>
        <Text>Local do evento</Text>
        <DropDownPicker
          key="dropdown-local"
          open={openLocal}
          value={localValue}
          items={itemsLocais as any}
          setOpen={setOpenLocal}
          setValue={setLocalValue}
          setItems={setLocaisItems as any}
          zIndex={1000}
          zIndexInverse={3000}
        />
        <Text>{"\n"}</Text>
        <Button
          text={
            mostrarNovoLocal ? "Cancelar novo local" : "+ Cadastrar novo local"
          }
          onClick={() => setMostrarNovoLocal(!mostrarNovoLocal)}
        />
        {mostrarNovoLocal && (
          <View style={{ width: "100%", marginTop: 10 }}>
            <Text>Nome do novo local</Text>
            <TextInput
              value={novoLocalNome}
              onChangeText={setNovoLocalNome}
              style={styles.input}
            />
            <Text>{"\n"}</Text>
            <Text>Descrição</Text>
            <TextInput
              value={novoLocalDescricao}
              onChangeText={setNovoLocalDescricao}
              style={styles.multilineInput}
              multiline
              numberOfLines={3}
              maxLength={200}
            />
            <Text>{"\n"}</Text>
            <Button text="Salvar local" onClick={adicionarNovoLocal} />
          </View>
        )}

        <View>
          <Text>{"\n"}</Text>
          <Text>Data e hora</Text>
          {Platform.OS === "web" ? (
            <input
              type="datetime-local"
              onChange={(e) => setDataHora(new Date(e.target.value))}
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
                text={dataHora.toLocaleDateString()}
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
                      if (selectedDate) setDataHora(selectedDate);
                      setShowPicker2(true);
                    }}
                    onDismiss={() => setOpen(false)}
                  />
                </View>
              )}
              <Button
                text={dataHora.toLocaleTimeString()}
                onClick={() => setShowPicker2(true)}
              />
              {showPicker2 && (
                <DateTimePicker
                  value={dataHora || new Date()}
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onValueChange={(event, selectedDate) => {
                    setShowPicker(false);
                    if (selectedDate) setDataHora(selectedDate);
                    setShowPicker2(false);
                  }}
                  onDismiss={() => setOpen(false)}
                />
              )}
            </>
          )}
        </View>
        <Text>{"\n"}</Text>
        <Button
          text="Criar evento"
          onClick={() =>
            CreateEvent(
              descricao,
              value,
              userID,
              dataHora.toISOString(),
              localValue,
            )
          }
        />
      </View>
    </View>
  );
}
export async function CreateEvent(
  descricao: string,
  value: number,
  userID: string,
  datahora: string,
  localId: number | 0,
) {
  createEvent(descricao, value, userID, datahora, localId);
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
