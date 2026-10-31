import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AudioProvider } from './context/AudioContext';
import { Navbar } from './components/common/Navbar';
import { AuthPage } from './features/auth/AuthPage';
import { GameListPage } from './features/games/GameListPage';
import { GameAdventureMapPage } from './features/games/GameAdventureMapPage';
import { GamePlayPage } from './features/games/GamePlayPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { ProfilePage } from './features/profile/ProfilePage';
import { api } from './services/api';

type AppView = 'games' | 'map' | 'play' | 'dashboard' | 'profile';

const MainApp: React.FC = () => {
  const { isAuthenticated, isLoading, activeChild } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('games');
  const [selectedGameId, setSelectedGameId] = useState<string>('reading-adventure');
  const [selectedLevelId, setSelectedLevelId] = useState<string>('reading-r1');
  const [totalStars, setTotalStars] = useState<number>(0);

  const fetchStats = () => {
    if (activeChild) {
      api
        .getDashboardSummary(activeChild.id)
        .then((summary) => {
          setTotalStars(summary.totalStars || 0);
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    fetchStats();
  }, [activeChild, currentView]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF9EE] flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-2xl font-black text-amber-700">Milo sedang bersiap...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-slate-800">
      {/* Universal Kids Navigation Header */}
      <Navbar
        currentView={currentView}
        totalStars={totalStars}
        onNavigate={(view) => setCurrentView(view)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {currentView === 'games' && (
          <GameListPage
            onSelectGame={(gameId) => {
              setSelectedGameId(gameId);
              setCurrentView('map');
            }}
            onOpenDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'map' && (
          <GameAdventureMapPage
            gameId={selectedGameId}
            onSelectLevel={(levelId) => {
              setSelectedLevelId(levelId);
              setCurrentView('play');
            }}
            onBack={() => setCurrentView('games')}
          />
        )}

        {currentView === 'play' && (
          <GamePlayPage
            levelId={selectedLevelId}
            gameId={selectedGameId}
            onBack={() => setCurrentView('map')}
            onRefreshData={fetchStats}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardPage onBackToGames={() => setCurrentView('games')} />
        )}

        {currentView === 'profile' && (
          <ProfilePage onBackToGames={() => setCurrentView('games')} />
        )}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AudioProvider>
        <MainApp />
      </AudioProvider>
    </AuthProvider>
  );
}
