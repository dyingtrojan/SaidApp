import { Amizade } from "@/app/interfaces/amizade"
import { Usuarios } from "@/app/interfaces/usuarios"
import { supabase } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"
import { Image, Text, View } from "react-native"
import { styles } from "./styles"

type AmizadeCardProps = {
    Amizade: Amizade
    Usuario: Usuarios
}

export function AmizadeCard(props:AmizadeCardProps) {
    const defaultProfilePicture = require("@/assets/images/default_profile_picture.png");
    const [image, setImage] = useState<string | null>(null);
    useEffect(() => {
    async function fetchImage() {
        if (props.Usuario.fotoperfil) {
        const { data: urlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(props.Usuario.fotoperfil);
        setImage(urlData.publicUrl);
        }
    }
    fetchImage();
    }, []);
    return (<View style={{ flexDirection: "row" }}>
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
            <Text style={styles.subtitle}>{props.Usuario.nome}</Text>
            <Text style={styles.subtitle2}>@{props.Usuario.username}</Text>
          </View>
        </View>);
}