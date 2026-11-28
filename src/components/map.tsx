import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, Map, Marker } from '@maplibre/maplibre-react-native';

export type Posicao = { latitude: number; longitude: number };

export type MapaProps = {
  coords: Posicao;
  aoSelecionar?: (posicao: Posicao) => void;
};

const ESTILO = 'https://tiles.openfreemap.org/styles/liberty';

export default function Mapa({ coords, aoSelecionar }: MapaProps) {
  const [posicao, setPosicao] = useState<Posicao>({
    latitude: coords.latitude,
    longitude: coords.longitude,
  });

  function selecionar(nova: Posicao) {
    setPosicao(nova);
    aoSelecionar?.(nova);
  }

  return (
    <Map
      style={styles.mapa}
      mapStyle={ESTILO}
      onPress={(e) => {
        // o MapLibre usa a ordem [longitude, latitude]
        const [longitude, latitude] = e.nativeEvent.lngLat;
        selecionar({ latitude, longitude });
      }}
    >
      <Camera
        initialViewState={{
          center: [coords.longitude, coords.latitude],
          zoom: 15,
        }}
      />
      <Marker lngLat={[posicao.longitude, posicao.latitude]}>
        <View style={styles.marcador} />
      </Marker>
    </Map>
  );
}

const styles = StyleSheet.create({
  mapa: { flex: 1 },
  marcador: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#1a73e8',
  },
});
