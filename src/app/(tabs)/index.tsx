import { GrupoCard } from "@/components/grupoCard";
import { SaidaCard } from "@/components/saidaCard";
import { styles } from "@/components/styles";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { checkIfLogged } from "../auth/authContext";

export default function TelaInicial() {
  useEffect(() => {
    async function checkLogin() {
      const check = await checkIfLogged();
      if (check == false) {
        router.replace("/");
      }
    }
  }, []);
  const router = useRouter();
  return (
    <ScrollView style={styles.containerScroll}>
      <Text style={styles.subtitle}>
        Eventos marcados em grupos que participa
      </Text>
      <Text>{"\n"}</Text>
      <ScrollView horizontal style={styles.sidewaysContainer}>
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
        <SaidaCard
          titulo="Titulo da saida"
          local="Rua x | Bairro Y | Cidade Z"
          grupo="Grupo LADO CT"
          imagemPath=""
        />
      </ScrollView>
      <Text>{"\n"}</Text>
      <ScrollView>
        <Text style={styles.subtitle}>
          Recomendações de grupos para participar
        </Text>
        <Text>{"\n"}</Text>
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
        <GrupoCard
          nome="teste"
          descricao="LOREM IPSUM DOLOR ET AMET...."
          id={2}
        />
      </ScrollView>
    </ScrollView>
  );
}
