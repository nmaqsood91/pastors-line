import AllContacts from "./pages/allContacts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainScreen from "./pages/mainScreen";
import UsContacts from "./pages/usContacts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route
          path="/all-contacts"
          element={
            <MainScreen>
              <AllContacts />
            </MainScreen>
          }
        />
        <Route
          path="/us-contacts"
          element={
            <MainScreen>
              <UsContacts />
            </MainScreen>
          }
        />
        {/* <Route path="/modalC/:contactId" element={<ModalC />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
