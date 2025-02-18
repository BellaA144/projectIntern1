import Header from "./components/Header";
import TrackerProvider from "./contexts/trackerProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TransactionsPage from "./pages/TransactionsPage";
import SummaryPage from "./pages/SummaryPage";
import Footer from "./components/Footer";

function App() {
  return (
      <TrackerProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/summary" element={<SummaryPage />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </TrackerProvider>
  );
}

export default App;
