import Button from "components/Button";
import Header from "components/Header";
import Input from "components/Input";
import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";

const Container = styled.div``;

const Form = styled.form`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  key: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const VerifyPhonePresenter: React.SFC<IProps> = ({ key, onChange }) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Number</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <Form>
      <ExtendedInput
        value={key}
        placeholder={"Enter Verification Code"}
        onChange={onChange}
        name={key}
      />
      <Button value={"Submit"} onClick={null} />
    </Form>
  </Container>
);

export default VerifyPhonePresenter;