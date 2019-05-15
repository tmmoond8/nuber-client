import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { facebookConnect, facebookConnectVariables } from "../../types/api";
import { FACEBOOK_CONNECT } from "./SocialLogin.queries";
import SocialLoginPresenter from "./SocialLoginPresenter";

class LoginMutation extends Mutation<facebookConnect, facebookConnectVariables> {}

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public facebookMutation: MutationFn;
  public render() {
    return (
      <LoginMutation mutation={FACEBOOK_CONNECT}>
        {(facebookMutation, { loading }) => {
          this.facebookMutation = facebookMutation;
          return (
            <SocialLoginPresenter loginCallback={this.loginCallback}/>
          )
        }}
      </LoginMutation>
    )
  }
  public loginCallback = response => {
    // tslint:disable-next-line
    console.log(response);
  }
}

export default SocialLoginContainer;