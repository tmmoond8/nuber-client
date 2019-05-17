import Button from "components/Button";
import Form from "components/Form";
import Header from "components/Header";
import Input from "components/Input";
import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";

const Container = styled.div`
  text-align: center;
`;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

const Photo = styled.img`
  width: 10rem;
  height: 10rem;
  margin-bottom: 1rem;
`;

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  loading?: boolean;
}

const EditAccountPresenter: React.SFC<IProps> = ({
  firstName,
  lastName,
  email,
  profilePhoto,
  onInputChange,
  loading
}) => (
  <Container>
    <Helmet>
      <title>Edit Account | Nuber</title>
    </Helmet>
    <Header title="Edit Account" backTo={"/"}/>
    <Photo src={profilePhoto}/>
    <ExtendedForm submitFn={null}>
      <ExtendedInput
        onChange={onInputChange}
        type="text"
        value={firstName}
        placeholder="First Name"
        name="firstName"
      />
      <ExtendedInput
        onChange={onInputChange}
        type="text"
        value={lastName}
        placeholder="Last Name"
        name="lastName"
      />
      <ExtendedInput
        onChange={onInputChange}
        type="email"
        value={email}
        placeholder="Email"
        name="email"
      />
      <Button onClick={null} value={loading ? "Loading" : "Update"}/>
    </ExtendedForm>
  </Container>
);

export default EditAccountPresenter;