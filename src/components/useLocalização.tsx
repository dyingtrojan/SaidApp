import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export function useLocalizacao() {
  const [coords, setCoords] = useState();
  const [erro, setErro] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErro('Permissão de localização negada');
          return;
        }
        const pos = await Location.getCurrentPositionAsync({});
        setCoords(pos.coords as any);
      } catch (e) {
        setErro('Não foi possível obter a localização');
      }
    })();
  }, []);

  return { coords, erro };
}