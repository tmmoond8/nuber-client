import React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router-dom';
import { getRide, getRideVariables } from '../../types/api';
import { GET_RIDE } from './Ride.queries';
import RidePresenter from './RidePresenter';

class RideQuery extends Query<getRide, getRideVariables> {}

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
      <RideQuery query={GET_RIDE} variables={{ rideId: parseInt(rideId, 10) }}>
        {({ data: rideData }) => (
          <RidePresenter rideData={rideData}/>
        )}
      </RideQuery>
    )
  }
}

export default RideContainer;