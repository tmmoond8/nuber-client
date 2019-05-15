import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { LOG_USER_IN } from 'sharedQueries';
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
  public state = {
    email: "",
    fbId: "",
    firstName: "",
    lastName: ""
  }
  public facebookMutation: MutationFn;
  public render() {
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <LoginMutation 
            mutation={FACEBOOK_CONNECT}
            onCompleted={data => {
              const { FacebookConnect } = data;
              if (FacebookConnect.ok) {
                logUserIn({
                  variables: {
                    token: FacebookConnect.token
                  }
                })
              } else {
                toast.error(FacebookConnect.error);
              }
            }}
          >
            {(facebookMutation, { loading }) => {
              this.facebookMutation = facebookMutation;
              return <SocialLoginPresenter loginCallback={this.loginCallback}/>;
            }}
          </LoginMutation>
        )}
      </Mutation>
    )
  }
  public loginCallback = response => {
    const { name, first_name, last_name, id, acessToken, email } = response;
    if (acessToken) {
      toast.success(`Welcome ${name}`);
      this.facebookMutation({
        variables: {
          email,
          fbId: id,
          firstName: first_name,
          lastName: last_name
        }
      })
    } else {
      toast.error("Cound not log you in 😔");
    }
  };
}

export default SocialLoginContainer;