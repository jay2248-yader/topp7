import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopicList from "./components/TopicList";
import MemberInput from "./components/MemberInput";
import Login from "./components/Login";
import AddTopic from "./components/AddTopic";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/topp3" element={<TopicList />} /> {/* หน้า TopicList */}
        <Route path="/topics/:topicId" element={<MemberInput />} /> {/* หน้า MemberInput ที่รับ topicId */}
        <Route path="/add-topic" element={<AddTopic />} />
      </Routes>
    </Router>
  );
}

export default App;
