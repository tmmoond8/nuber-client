import React from "react";
import { Mutation, Query } from "react-apollo";
import { LOG_USER_OUT } from "../../sharedQueries";
import { USER_PROFILE } from "../../sharedQueries.queries";
import { userProfile } from "../../types/api";
import SettingsPresenter from './SettingsPresenter';

class MiniProfileQuery extends Query<userProfile> {}

class SettingsContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {logUserOut => (
          <MiniProfileQuery query={USER_PROFILE}>
            {({ data, loading: userDataLoading }) => {
              return (
                <SettingsPresenter
                  userDataLoading={userDataLoading}
                  userData={data}
                  logUserOut={logUserOut}
                />
              )
            }}
          </MiniProfileQuery>
        )}
      </Mutation>
    )
  }
}

export default SettingsContainer;