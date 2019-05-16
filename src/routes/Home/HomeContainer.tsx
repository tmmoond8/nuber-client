import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { USER_PROFILE } from "sharedQueries.queries";
import { userProfile } from "../../types/api";
import HomePresenter from "./HomePresenter";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  isMenuOpen: boolean;
}

class ProfileQuery extends Query<userProfile> {}

class HomeContainer extends React.Component<IProps, IState> {
  public state = {
    isMenuOpen: false
  }
  public render() {
    const { isMenuOpen } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ loading }) => (
          <HomePresenter 
            loading={loading}
            isMenuOpen={isMenuOpen} 
            toggleMenu={this.toggleMenu}
          />
        )}
      </ProfileQuery>
    )
  }
  public toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpen: !state.isMenuOpen
      }
    })
  }
}

export default HomeContainer;