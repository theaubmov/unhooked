import { useNavigate } from 'react-router-dom';
import { PLATFORMS } from '../app.constants';
import type { CSSVars } from '../app.types';
import { RoadmapView } from '../components/RoadmapView';

export function RoadmapPage() {
  const navigate = useNavigate();
  const activePlatform =
    PLATFORMS.find((platform) => platform.id === 'youtube') ?? PLATFORMS[0];
  const themeStyle: CSSVars = {
    '--accent': activePlatform.accent,
    '--accent-contrast': activePlatform.contrast,
  };

  return (
    <div className="page" style={themeStyle}>
      <RoadmapView onBack={() => navigate('/')} />
    </div>
  );
}
