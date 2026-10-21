import { getUserID } from "@/app/auth/authContext";
import { Interesse } from "@/app/interfaces/interesse";
import { addInterestOfUser, deleteInterestOfUser, getInterestsOfUser } from "@/lib/databaseHandler";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type SelectItemProp = {
  text: string;
  id: number,
  onClick: any;
};

export function SelectItem(props: SelectItemProp) {
  const [check, setCheck] = useState("");

  useEffect(() => {
    async function checkInterest() {
      const res = await getInterestsOfUser(await getUserID());
      if (res.find((interesse: Interesse) => interesse.id == props.id) != undefined){
        setCheck("| ✓")
      }else{
        setCheck("")
      }
  }
    checkInterest()
  }, [])

  async function checkInterest() {
    setCheck("| Analisando...")
    const res = await getInterestsOfUser(await getUserID());
    if (res.find((interesse: Interesse) => interesse.id == props.id) != undefined){
      await deleteInterestOfUser(props.id);
      setCheck("")
    }else{
      await addInterestOfUser(props.id);
      setCheck("| ✓")
    }
  }
  return (
    <View style={styles.button}>
      <Pressable onPress={() => {checkInterest()}}>
        <Text style={styles.a}>{props.text} {check}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: "#0000000e",
    color: "#000000",
    borderColor: "#ffffff00",
    textDecorationLine: "none",
    textDecorationColor: "#ffffff",
    borderRadius: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    height: 35,
    marginBottom: 20,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  a: {
    textDecorationLine: "none",
    textDecorationColor: "white",
    color: "black",
    marginLeft: "2%",
    textAlign: "left",
    alignSelf: "flex-start",
  },
});
