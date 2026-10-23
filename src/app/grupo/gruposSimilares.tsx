import { getGroupsWithInterests, getInterestsOfUser } from "@/lib/databaseHandler";
import { useEffect } from "react";
import { View } from "react-native";
import { getUserID } from "../auth/authContext";

export default function GrupoSimilares() {
  useEffect(() => {
    async function fetchData() {
      const USER_ID = await getUserID();
      const interests = await getInterestsOfUser(USER_ID);
      const groups = await getGroupsWithInterests(interests)
      var grupos = []
      
    }
    fetchData()
  }, [])
  return <View>

  </View>;
}
