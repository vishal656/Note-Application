import styled from "styled-components";
import PlusImage from "../assets/Images/+.png";
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Header = styled.div`
  padding: 10px;
  background-color: white;
  z-index: 1;
  position: sticky;
  top: 0;
  text-align: center;
`;

const UserListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding:10px;
`;

const UserNameDiv = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
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
  text-align: center;
  align-content: center;
`;

const AddButton = styled.button`
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 4.8rem;
  right: 2rem;
  z-index: 1;
  border-radius: 50%;
  background-color: #16008b;
  text-align: center;
  border: none;
  cursor: pointer;
`;
const ResponsiveText = styled.p`
  font-family: "Roboto";
  font-weight: 500;
  font-size: 35px;
text-align: center;
padding: 5px;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const UserList = (props) => {
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
  return (
    <Wrapper>
      <ResponsiveText>
        <ResponsiveText>Pocket Notes</ResponsiveText>
      </ResponsiveText>
      <UserListContainer>
        {props?.users.map((user) => (
          <div key={user.id} onClick={() => props?.handleUserSelect(user)}>
            <UserNameDiv>
              <UserName
                color={user.color || "black"}
                style={{ color: "white" }}
              >
                {UserNameCapitalized(user.name)}
              </UserName>
              <UserName style={{ width: "80%", textAlign: "left" }}>
                {user.name}
              </UserName>
            </UserNameDiv>
          </div>
        ))}
      </UserListContainer>
      <AddButton onClick={() => props.setAddButton(true)}>
        <img src={PlusImage} width={25} height={25} />
      </AddButton>
    </Wrapper>
  );
};

export default UserList;
