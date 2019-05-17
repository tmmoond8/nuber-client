import React from "react";
import { RouteComponentProps } from "react-router-dom";
import EditAccountPresenter from './EditAccountPresenter';


interface IState {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
}

interface IProps extends RouteComponentProps<any> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    profilePhoto: ""
  };

  public render() {
    const { email, firstName, lastName, profilePhoto } = this.state;
    return (
      <EditAccountPresenter
        email={email}
        lastName={lastName}
        firstName={firstName}
        profilePhoto={profilePhoto}
        onInputChange={this.onInputChange}
        loading={false}
      />
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };
}

export default EditAccountContainer;

