import { useEffect, useState } from 'react';
import { Context as ResponsiveContext } from 'react-responsive';
import App from './App';
export default function HydratedApp() {
  const [device, setDevice] = useState<{width:number} | undefined>({width:1280});
  useEffect(() => setDevice(undefined), []);
  return <ResponsiveContext.Provider value={device}><App /></ResponsiveContext.Provider>;
}
