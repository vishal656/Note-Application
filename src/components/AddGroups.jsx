import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrapperInside = styled.div`
  background-color: white;
  width: 630px;
  padding: 0rem 0rem;
  border-radius: 10px;
  max-height: 500px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 10px;
  }
`;

const Heading = styled.h1`
  font-size: 29px;
  font-family: "Roboto";
  font-weight: 500;
  padding: 20px;
  line-height: 45px;

  @media (max-width: 768px) {
    font-size: 24px;
    padding: 15px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    padding: 10px;
  }
`;

const Label = styled.label`
  font-size: 27.31px;
  font-family: "Roboto";
  font-weight: 500;
  padding: 20px;
  line-height: 45px;

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 10px;
  }

  @media (max-width: 430px) {
    font-size: 16px;
    padding: 5px;
  }

  @media (max-width: 360px) {
    font-size: 12px;
    padding: 0px;
  }
`;

const InputBox = styled.input`
  width: 400px;
  height: 40px;
  border-radius: 22px;
  border: 1px solid #cccccc;
  padding: 15px;
  font-size: 20px;
  font-family: "Roboto";
  font-weight: 400;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 10px;
  }
`;

const Color = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 430px) {
    width: 25px;
    height: 25px;
  }

  @media (max-width: 360px) {
    width: 20px;
    height: 20px;
  }
`;

const CreateButton = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 10px;
  background-color: #001f8b;
  border: none;
  color: white;
  font-size: 20px;
  font-family: "Roboto";
  font-weight: 400;
  margin: 0 16px 15px 15px;
  text-align: center;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 18px;
    width: 130px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    width: 120px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  font-family: "Roboto";
  margin-left: -5.5rem;
  text-align:center;
  @media (max-width: 768px) {
    text-align:left;
    margin-left:0;
    padding:5px 0px 0px 5px;
  }
`;

const AddGroups = (props) => {
  const wrapperRef = useRef(null);
  const [error, setError] = useState("");

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateGroup = () => {
    if (props.groupName.trim() === "") {
      setError("Group name is required.");
    } else {
      setError("");
      props.handleCreateGroup();
    }
  };

  return (
    <Wrapper>
      <WrapperInside ref={wrapperRef}>
        <Heading>Create New group</Heading>
        <div style={{ paddingBottom: 10 }}>
          <Label htmlFor="email">Group Name</Label>
          <InputBox
            type="text"
            id="email"
            name="email"
            autoFocus
            placeholder="Enter Group Name"
            value={props.groupName}
            onChange={(e) => props.setGroupName(e.target.value)}
            autoComplete="off"
          />
          <div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            paddingBottom: 10
          }}
        >
          <Label htmlFor="color">Choose colour</Label>
          <Color
            color="#B38BFA"
            onClick={() => props.setGroupColor("#B38BFA")}
          />
          <Color
            color="#FF79F2"
            onClick={() => props.setGroupColor("#FF79F2")}
          />
          <Color
            color="#43E6FC"
            onClick={() => props.setGroupColor("#43E6FC")}
          />
          <Color
            color="#F19576"
            onClick={() => props.setGroupColor("#F19576")}
          />
          <Color
            color="#0047FF"
            onClick={() => props.setGroupColor("#0047FF")}
          />
          <Color
            color="#6691FF"
            onClick={() => props.setGroupColor("#6691FF")}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <CreateButton onClick={handleCreateGroup}>Create</CreateButton>
        </div>
      </WrapperInside>
    </Wrapper>
  );
};

export default AddGroups;
