import { getUserID } from "@/app/auth/authContext";
import { Button } from "@/components/button";
import { styles } from "@/components/styles";
import {
    deleteEvent,
    editEvent,
    getEvento,
    getGroupsLocalUserIsMemberInfo,
} from "@/lib/databaseHandler";
import DateTimePicker, {
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Grupo } from "../../interfaces/grupo";

export default function EditarEvento() {
  const [open, setOpen] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const eventoId = Number(id);

  const [newDescricao, setNewDescricao] = useState("");
  const [grupoValue, setGrupoValue] = useState<number | null>(null);
  const [itemsGrupos, setGruposItems] = useState([
    { label: "Selecione um grupo", value: "" },
  ]);
  const [userCriador, setUserCriador] = useState("");
  const [dataHora, setDataHora] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    async function fetchEvento() {
      const resultadoEvento = await getEvento(eventoId);
      const UserId = await getUserID();

      if (resultadoEvento?.data) {
        setUserCriador(resultadoEvento.data.usuariocriadorid);
        setNewDescricao(resultadoEvento.data.descricao);
        setGrupoValue(resultadoEvento.data.grupoid);
        if (resultadoEvento.data.datahora) {
          setDataHora(new Date(resultadoEvento.data.datahora));
        }
      }

      try {
        const gruposUsuario = await getGroupsLocalUserIsMemberInfo();
        const gruposArray = gruposUsuario.map((grupo: Grupo) => ({
          label: grupo.nome,
          value: grupo.id,
        }));
        setGruposItems(gruposArray as any);
      } catch (error) {
        console.log("erro: " + error);
      }

      if (resultadoEvento.data?.usuariocriadorid != UserId) {
        alert("Você não pode alterar este evento.");
        router.replace("/(tabs)/eventos");
      }
    }
    fetchEvento();
  }, [eventoId]);

  function abrirSeletorDeData() {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: dataHora,
        mode: "date",
        onChange: (event, selectedDate) => {
          if (event.type === "set" && selectedDate) {
            const novaData = new Date(dataHora);
            novaData.setFullYear(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              selectedDate.getDate(),
            );
            setDataHora(novaData);
          }
        },
      });
    } else {
      setShowPicker(true);
    }
  }

  function abrirSeletorDeHora() {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: dataHora,
        mode: "time",
        onChange: (event, selectedTime) => {
          if (event.type === "set" && selectedTime) {
            const novaData = new Date(dataHora);
            novaData.setHours(
              selectedTime.getHours(),
              selectedTime.getMinutes(),
            );
            setDataHora(novaData);
          }
        },
      });
    } else {
      setShowPicker(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <View style={styles.header}>
          <Link
            style={{ fontWeight: "500", fontSize: 20 }}
            href={"/(tabs)/eventos"}
          >
            ← Voltar
          </Link>
          <Text>{"\n"}</Text>
        </View>
        <Text>Descrição</Text>
        <TextInput
          multiline
          style={styles.multilineInput}
          value={newDescricao}
          onChangeText={setNewDescricao}
          numberOfLines={4}
          maxLength={200}
        ></TextInput>
        <Text>{"\n"}</Text>
        <Text>Grupo do evento</Text>
        <GrupoDropDown
          open={open as any}
          value={grupoValue}
          items={itemsGrupos}
          setOpen={setOpen as any}
          setValue={setGrupoValue as any}
          setItems={setGruposItems as any}
        />
        <Text>{"\n"}</Text>
        <Text>Data e hora</Text>
        {Platform.OS === "web" ? (
          <input
            type="datetime-local"
            value={toDatetimeLocalValue(dataHora)}
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
              text={`Data: ${dataHora.toLocaleDateString()}`}
              onClick={abrirSeletorDeData}
            />
            <Text>{"\n"}</Text>
            <Button
              text={`Hora: ${dataHora.toLocaleTimeString()}`}
              onClick={abrirSeletorDeHora}
            />
            {Platform.OS === "ios" && showPicker && (
              <DateTimePicker
                value={dataHora}
                mode="datetime"
                display="spinner"
                onChange={(event, selectedDate) => {
                  setShowPicker(false);
                  if (selectedDate) setDataHora(selectedDate);
                }}
              />
            )}
          </>
        )}
        <Text>{"\n"}</Text>
        <Button
          text="Alterar evento"
          onClick={() =>
            updateEvento(
              eventoId,
              newDescricao,
              grupoValue,
              dataHora.toISOString(),
              userCriador,
            )
          }
        />
        <Text>{"\n"}</Text>
        <Button text="DELETAR EVENTO" onClick={() => delete_event(eventoId)} />
      </View>
    </View>
  );
}

function toDatetimeLocalValue(data: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${data.getFullYear()}-${pad(data.getMonth() + 1)}-${pad(data.getDate())}T${pad(data.getHours())}:${pad(data.getMinutes())}`;
}

async function delete_event(eventoId: number) {
  await deleteEvent(eventoId);
  router.replace("/(tabs)/eventos");
}

async function updateEvento(
  eventoId: number,
  descricao: string,
  grupoId: number | null,
  datahora: string,
  userCriadorid: string,
) {
  if (!grupoId) {
    alert("Selecione um grupo.");
    return;
  }
  try {
    const result = await editEvent(
      eventoId,
      descricao,
      grupoId,
      userCriadorid,
      datahora,
    );
    if (!result.success) {
      alert("Erro ao editar evento: " + JSON.stringify(result.error));
      return;
    }
    router.push("/(tabs)/eventos");
  } catch (e) {
    console.error("Erro no updateEvento:", e);
    alert("Erro inesperado: " + e);
  }
}

interface GrupoDropDownProps {
  open: boolean;
  value: any;
  items: { label: string; value: any }[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export function GrupoDropDown({
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
}: GrupoDropDownProps) {
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
