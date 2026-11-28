import { lazy, Suspense, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import type { MapaProps } from './map';

const MapaLeaflet = lazy(() => import('./mapLeaflet'));

export default function Mapa(props: MapaProps) {
  const [noNavegador, setNoNavegador] = useState(false);

  // useEffect não roda na renderização do servidor
  useEffect(() => setNoNavegador(true), []);

  if (!noNavegador) return <ActivityIndicator />;

  return (
    <Suspense fallback={<ActivityIndicator />}>
      <MapaLeaflet {...props} />
    </Suspense>
  );
}
