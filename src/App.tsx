/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Landing } from './pages/Landing';
import { Workspace } from './pages/Workspace';
import { Tutor } from './pages/Tutor';
import { Glossary } from './pages/Glossary';
import { Quiz } from './pages/Quiz';
import { FieldNotes } from './pages/FieldNotes';
import { ImageExplorer } from './pages/ImageExplorer';
import { GisLearning } from './pages/GisLearning';
import { History } from './pages/History';
import { Settings } from './pages/Settings';

export default function App() {
  const [route, setRoute] = useState<string>('landing');

  const renderRoute = () => {
    switch (route) {
      case 'landing':
        return <Landing onNavigate={setRoute} />;
      case 'workspace':
        return <Workspace onNavigate={setRoute} />;
      case 'tutor':
        return <Tutor />;
      case 'glossary':
        return <Glossary />;
      case 'quiz':
        return <Quiz />;
      case 'field-notes':
        return <FieldNotes />;
      case 'image-explorer':
        return <ImageExplorer />;
      case 'gis-learning':
        return <GisLearning />;
      case 'history':
        return <History onNavigate={setRoute} />;
      case 'settings':
        return <Settings />;
      default:
        return <Landing onNavigate={setRoute} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F3EE] text-[#252A27] flex flex-col font-sans antialiased selection:bg-[#526B57] selection:text-white">
      <Header currentRoute={route} onNavigate={setRoute} />
      <main className="flex-1">
        {renderRoute()}
      </main>
      <Footer />
    </div>
  );
}
