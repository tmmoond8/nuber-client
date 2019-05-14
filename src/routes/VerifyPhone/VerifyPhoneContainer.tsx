import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { verfiyPhone, verfiyPhoneVariables } from "../../types/api";
import { VERIFY_PHONE } from "./VerifyPhone.queries";
import VerifyPhonePresenter from "./VerifyPhonePresenter";

interface IState {
  key: string;
  phoneNumber: string;
}

interface IProps extends RouteComponentProps<any> {}

class VerifyMutation extends Mutation<verfiyPhone, verfiyPhoneVariables> {}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    try {
      Object.hasOwnProperty.call(props.location.state, "phone");
    } catch (e) {
      props.history.push("/");
    }
     this.state = {
       key: "",
       phoneNumber: props.location.state.phone
     }
     this.onInputChange = this.onInputChange.bind(this);
  }
  public render() {
    const { key, phoneNumber } = this.state;
    return (
      <VerifyMutation
        mutation={VERIFY_PHONE}
        variables={{
          key,
          phoneNumber
        }}
      >
        { (mutation, { loading }) => (
          <VerifyPhonePresenter onChange={this.onInputChange} key={key}/>
        )}
      </VerifyMutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any); 
  }
}

export default VerifyPhoneContainer;