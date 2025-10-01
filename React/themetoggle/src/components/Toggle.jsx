import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

function Toggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center gap-4">
      <Label>Dark Mode</Label>
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
      />
    </div>
  );
}

export default Toggle;
