import { useEffect, useState } from "react";
import { getUserID } from "../auth/authContext";
import { getAllUsers, podeModerar } from "@/lib/databaseHandler";
import { router } from "expo-router";

export default function Index() {
    const [usuarios, setUsuarios] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const userId = await getUserID();
            const permitido = await podeModerar(userId);
            if (!permitido) {
                alert("Você não tem permissão para acessar essa página.");
                router.replace("/(tabs)/perfil");
                return;
            }
            const resultado = await getAllUsers();
            if (resultado.success) setUsuarios(resultado.data || []);
        }
        fetchData();
    }, []);
}