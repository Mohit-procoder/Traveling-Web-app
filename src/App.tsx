import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './components/layout/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import ChecklistPage from './pages/ChecklistPage';
import PlannerPage from './pages/PlannerPage';
import CurrencyConverterPage from './pages/CurrencyConverterPage';
import GalleryPage from './pages/GalleryPage';
import BudgetTrackerPage from './pages/BudgetTrackerPage';
import LanguageCheatSheetPage from './pages/LanguageCheatSheetPage';
import ItineraryPage from './pages/ItineraryPage';
import AirportNavigationPage from './pages/AirportNavigationPage';
import MoodboardPage from './pages/MoodboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="checklist" element={<ChecklistPage />} />
          <Route path="planner" element={<PlannerPage />} />
          <Route path="currency-converter" element={<CurrencyConverterPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="budget-tracker" element={<BudgetTrackerPage />} />
          <Route path="language-cheatsheet" element={<LanguageCheatSheetPage />} />
          <Route path="itinerary" element={<ItineraryPage />} />
          <Route path="airport-navigation" element={<AirportNavigationPage />} />
          <Route path="moodboard" element={<MoodboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;