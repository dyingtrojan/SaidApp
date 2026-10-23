import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

type UserCardProps = {
  id?: string;
  nome: string;
  username: string;
  fotoperfil?: string;
};

export function UserCard(props: UserCardProps) {
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    async function fetchImage() {
      if (props.fotoperfil) {
        const { data: urlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(props.fotoperfil);
        setImage(urlData.publicUrl);
      }
    }
    fetchImage();
  }, []);
  const defaultProfilePicture = require("@/assets/images/default_profile_picture.png");
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        source={image ? { uri: image } : defaultProfilePicture}
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          borderColor: "black",
          borderWidth: 1,
        }}
      />
      <View style={{ marginLeft: 20 }}>
        <Text style={styles.subtitle}>{props.nome}</Text>
        <Text style={styles.subtitle2}>@{props.username}</Text>
      </View>
    </View>
  );
}
