import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { MapaProps } from './map';

function Clique({ aoClicar }: { aoClicar: (p: [number, number]) => void }) {
  useMapEvents({
    click: (e) => aoClicar([e.latlng.lat, e.latlng.lng]),
  });
  return null;
}

export default function MapaLeaflet({ coords, aoSelecionar }: MapaProps) {
  const [posicao, setPosicao] = useState<[number, number]>([
    coords.latitude,
    coords.longitude,
  ]);

  function selecionar([latitude, longitude]: [number, number]) {
    setPosicao([latitude, longitude]);
    aoSelecionar?.({ latitude, longitude });
  }

  return (
    <MapContainer center={posicao} zoom={15} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Clique aoClicar={selecionar} />
      <CircleMarker center={posicao} radius={8}>
        <Popup>Local selecionado</Popup>
      </CircleMarker>
    </MapContainer>
  );
}
