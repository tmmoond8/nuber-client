import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { verfiyPhone, verfiyPhoneVariables } from "../../types/api";
import { VERIFY_PHONE } from "./VerifyPhone.queries";
import VerifyPhonePresenter from "./VerifyPhonePresenter";

interface IState {
  verificationCode: string;
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
      phoneNumber: props.location.state.phone,
      verificationCode: ""
    }
    this.onInputChange = this.onInputChange.bind(this);
  }
  public render() {
    const { verificationCode, phoneNumber } = this.state;
    return (
      <VerifyMutation
        mutation={VERIFY_PHONE}
        variables={{
          key: verificationCode,
          phoneNumber
        }}
        onCompleted={data => {
          const { CompletePhoneVerification } = data;
          if (CompletePhoneVerification.ok) {
            toast.success("You're verified, loggin in now");
            // tslint:disable-next-line
            console.log(CompletePhoneVerification);
          } else {
            toast.error(CompletePhoneVerification.error);
          }
        }}
      >
        { (mutation, { loading }) => (
          <VerifyPhonePresenter 
            onSubmit={mutation}
            onChange={this.onInputChange} 
            verificationCode={verificationCode}
            loading={loading}
          />
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