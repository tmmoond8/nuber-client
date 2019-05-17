import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { USER_PROFILE } from "../../sharedQueries.queries";
import {
  userProfile
} from "../../types/api";
import EditAccountPresenter from "./EditAccountPresenter";


interface IState {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  loading: boolean;
}

interface IProps extends RouteComponentProps<any> {}

class ProfileQuery extends Query<userProfile> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    loading: true,
    profilePhoto: "",
  };

  public render() {
    const { email, firstName, lastName, profilePhoto, loading } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE} onCompleted={this.updateFields}>
        {() => (
          <EditAccountPresenter
            email={email}
            firstName={firstName}
            lastName={lastName}
            profilePhoto={profilePhoto}
            onInputChange={this.onInputChange}
            loading={loading}
          />
        )}
      </ProfileQuery>
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

  public updateFields = (data: {} | userProfile) => {
    if("GetMyProfile" in data) {
      const {
        GetMyProfile: { user }
      } = data;
      if(user) {
        const { firstName, lastName, email, profilePhoto } = user;
        const loading = false;
        this.setState({
          email,
          firstName,
          lastName,
          loading,
          profilePhoto,
        } as any);
      }
    }
  }
}

export default EditAccountContainer;

