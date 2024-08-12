import styled from "styled-components";
import ArrowImg from "../assets/Images/Arrow.png";
import BackImage from "../assets/Images/BackImage.png";
const Wrapper = styled.div`
  width: 100%;
  background: #001f8b;
  height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const UserNameDiv = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 10px;
  }
`;

const BackButton = styled.img`

`;

const MessageDiv = styled.div`
  overflow-y: auto;
  padding: 10px;
  background: #dae5f5;
  height: 60vh;
`;

const InputBox = styled.textarea`
  padding: 10px; /* Adjust top padding to 0 to remove gap */
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  box-sizing: border-box;
  background-color: #f0f0f0;
  color: #333;
  line-height: 1.4;
  overflow-y: auto;
  margin: 0px; /* Ensure no extra margin */
  vertical-align: top;/* Add some margin to separate from message div */
  &:focus {
    outline: none;
    border-color: #001f8b;
    background-color: #fff;
  }
`;


const UserName = styled.p`
  padding: 10px;
  cursor: pointer;
  font-size: 20px;
  font-family: "Roboto";
  font-weight: 500;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  text-align: center;
  color: white;
  align-content: center;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const WrapperInside = styled.div`
  background-color: white;
  max-height: 500px;
  padding: 10px;
  margin-bottom: 20px;
  margin-left: auto;
  width: fit-content;
  max-width: 90%;
  min-width: 200px;
  box-sizing: border-box;
  border-radius: 8px;
  word-wrap: break-word;
`;

const SendButtonWrapper = styled.div`
  position: absolute;
  bottom: 45px;
  right: 30px;
  cursor: pointer;
`;

const Chatwindow = ({
  selectedUser,
  onSendMessage,
  newNote,
  setNewNote,
  notes,
  setSelectedUser
}) => {
  const handleSendMessage = () => {
    onSendMessage();
    setNewNote("");
  };

  let UserNameCapitalized = (name) => {
    let trimmedName = name.trim();
    let username = trimmedName.split(/\s+/);
    if (username.length > 1) {
        return (
            username[0].slice(0, 1).toUpperCase() +
            username[1].slice(0, 1).toUpperCase()
        );
    } else {
        return username[0].slice(0, 1).toUpperCase();
    }
};

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      onSendMessage();
    }
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <Wrapper>
          <UserNameDiv>
            <BackButton src={BackImage} height={20} width={25} alt="Back" onClick={()=>setSelectedUser(null)} />
            <UserName color={selectedUser.color || "black"}>
              {UserNameCapitalized(selectedUser.name)}
            </UserName>
            <UserName style={{ width: "100%", textAlign: "left" }}>
              {selectedUser.name}
            </UserName>
          </UserNameDiv>
        </Wrapper>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <MessageDiv>
            {notes.map((msg, index) => (
              <WrapperInside key={index}>
                <p
                  style={{
                    fontSize: "18px",
                    fontFamily: "Roboto",
                    fontWeight: "400px"
                  }}
                >
                  {msg.text}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "flex-end",
                    paddingTop: "10px"
                  }}
                >
                  {new Date(msg.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })}
                  <div>
                    {new Date(msg.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true
                    })}
                  </div>
                </div>
              </WrapperInside>
            ))}
          </MessageDiv>
          <Wrapper
            style={{
              height: "25vh",
              bottom: 0
            }}
          >
            <InputBox
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter your text here..........."
              onKeyPress={handleEnterPress}
            />
            <SendButtonWrapper onClick={handleSendMessage}>
              <img src={ArrowImg} height={25} width={25} />
            </SendButtonWrapper>
          </Wrapper>
        </div>
      </div>
    </>
  );
};

export default Chatwindow;
