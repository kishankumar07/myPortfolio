import { StrictMode } from 'react'
import HydratedApp from './HydratedApp'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import 'animate.css/source/_base.css'
import 'animate.css/source/fading_entrances/fadeIn.css'


const container = document.getElementById('root')!;
const app = <StrictMode><HydratedApp /></StrictMode>;
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);

