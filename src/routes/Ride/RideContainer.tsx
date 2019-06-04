import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { USER_PROFILE } from '../../sharedQueries.queries';
import { 
  getRide, 
  getRideVariables, 
  updateRide,
  updateRideVariables,
  userProfile 
} from '../../types/api';
import { GET_RIDE, UPDATE_RIDE_STATUS } from './Ride.queries';
import RidePresenter from './RidePresenter';

class RideQuery extends Query<getRide, getRideVariables> {}
class ProfileQuery extends Query<userProfile> {}
class RideUpdate extends Mutation<updateRide, updateRideVariables> {}

interface IProps extends RouteComponentProps<any> {}

class RideContainer extends React.Component<IProps> {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { rideId }
      },
      history
    } = this.props;
    if(!rideId || !parseInt(rideId, 10)) {
      history.push('/')
    }
  }
  public render() {
    const {
      match: {
        params: { rideId }
      },
    } = this.props;
    
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data: userData }) => (
          <RideQuery query={GET_RIDE} variables={{ rideId: parseInt(rideId, 10) }}>
            {({ data: rideData }) => (
              <RideUpdate 
                mutation={UPDATE_RIDE_STATUS}
                refetchQueries={[{ query: GET_RIDE , variables: { rideId: parseInt(rideId, 10) }}]}
              >
                {updateRideMutation => (
                  <RidePresenter 
                    rideData={rideData}
                    userData={userData}
                    updateRideMutation={updateRideMutation}
                  />
                )}
              </RideUpdate>
              
            )}
          </RideQuery>
        )}
      </ProfileQuery>
    )
  }
}

export default RideContainer;