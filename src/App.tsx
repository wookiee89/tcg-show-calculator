import { useState } from 'react';
import { ConfigProvider } from './config/configContext.tsx';
import { Shell } from './components/Shell.tsx';
import type { Tab } from './components/TabBar.tsx';
import { QuickCalculator } from './screens/QuickCalculator/QuickCalculator.tsx';
import { BulkCalculator } from './screens/BulkCalculator/BulkCalculator.tsx';
import { MisprintCalculator } from './screens/MisprintCalculator/MisprintCalculator.tsx';

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('quick');

  return (
    <Shell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'quick' && <QuickCalculator key="quick" />}
      {activeTab === 'bulk' && <BulkCalculator key="bulk" />}
      {activeTab === 'misprint' && <MisprintCalculator key="misprint" />}
    </Shell>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
}
