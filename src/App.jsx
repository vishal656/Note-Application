import styled from "styled-components";
import { useState, useEffect } from "react";
import UserList from "./components/UserList";
import Chatwindow from "./components/Chatwindow";
import PocketImage from "./assets/Images/image-removebg-preview 1.png";
import AddGroups from "./components/AddGroups";
const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;
const LeftContainer = styled.div`
  width: 30%;
  border-right: 1px solid #ccc;

  @media (max-width: 768px) {
    width: 100%;
    display: ${({ show }) => (show ? "block" : "none")};
  }
`;

const RightContainer = styled.div`
  width: 70%;
  overflow: hidden;


  @media (max-width: 768px) {
    width: 100%;
    display: ${({ show }) => (show ? "block" : "none")};
  }
`;
function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addButton, setAddButton] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);

    const savedNotes = JSON.parse(localStorage.getItem("notes")) || {};
    setNotes(savedNotes);
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = () => {
    if (!newNote.trim()) return;
    const timestamp = new Date().toISOString();
    const updatedNotes = {
      ...notes,
      [selectedUser.id]: [
        ...(notes[selectedUser.id] || []),
        { text: newNote, createdAt: timestamp, updatedAt: timestamp },
      ],
    };
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNewNote("");
  };

  const handleCreateGroup = () => {
    console.log("Creating group", groupName, groupColor);
    const newGroup = {
      id: users.length + 1,
      name: groupName,
      color: groupColor
    };
    const updatedUsers = [...users, newGroup];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setGroupName("");
    setGroupColor("");
    setAddButton(false);
  };

  return (
    <>
      <Container>
        {addButton && (
          <AddGroups
            onClose={() => setAddButton(false)}
            groupName={groupName}
            setGroupName={setGroupName}
            groupColor={groupColor}
            setGroupColor={setGroupColor}
            handleCreateGroup={handleCreateGroup}
          />
        )}
        <LeftContainer show={!selectedUser}>
          <UserList
            users={users}
            setAddButton={setAddButton}
            handleUserSelect={handleUserSelect}
            groupName={groupName}
            groupColor={groupColor}
          />
        </LeftContainer>
        <RightContainer show={!!selectedUser}>
          {selectedUser ? (
            <Chatwindow
              selectedUser={selectedUser}
              onSendMessage={handleSendMessage}
              newNote={newNote}
              setNewNote={setNewNote}
              notes={notes[selectedUser.id] || []}
              setSelectedUser={setSelectedUser} // Pass setSelectedUser to Chatwindow
            />
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",
                  flexDirection: "column",
                  background:"#DAE5F5",
                }}
              >
                <img src={PocketImage} width={620} height={300} />
                <h1>Pocket Notes</h1>
                <p style={{ width: "50%" }}>
                  Send and receive messages without keeping your phone online.
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
              </div>
            </>
          )}
        </RightContainer>
      </Container>
    </>
  );
}

export default App;
