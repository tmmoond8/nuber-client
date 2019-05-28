import { getCode } from "lib/mapHelpers";
import React from "react";
import { Query } from "react-apollo";
import ReactDOM from 'react-dom';
import { RouteComponentProps } from "react-router";
import { USER_PROFILE } from "sharedQueries.queries";
import { userProfile } from "../../types/api";
import HomePresenter from "./HomePresenter";

interface IProps extends RouteComponentProps<any> {
  google: any;
}
interface IState {
  isMenuOpen: boolean;
  toAddress: string;
  toLat: number;
  toLng: number;
  lat: number;
  lng: number;
}


class ProfileQuery extends Query<userProfile> {}

class HomeContainer extends React.Component<IProps, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public userMarker: google.maps.Marker | null = null;
  public toMarker: google.maps.Marker | null = null;
  public direction: google.maps.DirectionsRenderer | null = null;

  public state = {
    isMenuOpen: false,
    lat: 0,
    lng: 0,
    toAddress: "",
    toLat: 0,
    toLng: 0,
  }

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSuccess,
      this.handleGeoError
    )
  }

  public render() {
    const { isMenuOpen, toAddress } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ loading }) => (
          <HomePresenter 
            loading={loading}
            isMenuOpen={isMenuOpen} 
            toggleMenu={this.toggleMenu}
            mapRef={this.mapRef}
            toAddress={toAddress}
            onInputChange={this.onInputChange}
            onAddressSubmit={this.onAddressSubmit}
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
    });
  };

  public handleGeoSuccess: PositionCallback = (position: Position) => {
    const {
      coords: { latitude, longitude } 
    } = position;
    this.setState({
      lat: latitude,
      lng: longitude
    });
    this.loadMap(latitude, longitude);
  };

  public handleGeoError: PositionErrorCallback = () => {
    console.error("No location");
  }

  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      zoom: 13
    };
    this.map = new maps.Map(mapNode, mapConfig);

    const watchOptions: PositionOptions = {
      enableHighAccuracy: true
    };
    navigator.geolocation.watchPosition(
      this.handleGeoWatchSuccess,
      this.handleGeoError,
      watchOptions
    );

    const userMarkerOption: google.maps.MarkerOptions = {
      icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 7
      },
      position: {
        lat,
        lng
      }
    };
    this.userMarker = new maps.Marker(userMarkerOption);
    this.userMarker!.setMap(this.map);
  };

  public handleGeoWatchSuccess: PositionCallback = (position: Position) => {
    const {
      coords: { latitude: lat, longitude: lng }
    } = position;
    this.userMarker!.setPosition({ lat, lng });
    this.map!.panTo({ lat, lng });
  }
  
  public handleGeoWatchError: PositionErrorCallback = () => {
    console.error("No location");
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  }
  public onAddressSubmit = async () => {
    const { toAddress } = this.state;
    const { google } = this.props;
    const maps = google.maps;
    const result = await getCode(toAddress);
    if (result !== false ) {
      const { lat, lng, formatted_address: formattedAddress } = result;
      
      if (this.toMarker) {
        this.toMarker.setMap(null);
      }
      const toMarkerOptions: google.maps.MarkerOptions = {
        position: {
          lat,
          lng
        }
      };
      this.toMarker = new maps.Marker(toMarkerOptions);
      this.toMarker!.setMap(this.map);
      
      this.setState({
        toAddress: formattedAddress,
        toLat: lat,
        toLng: lng
      }, this.setBounds);
    }
  }

  public setBounds = () => {
    const { lat, lng, toLat, toLng } = this.state;
    const { google: { maps } } = this.props;
    const bounds = new maps.LatLngBounds();
    bounds.extend({ lat, lng });
    bounds.extend({ lat: toLat, lng: toLng });
    this.map!.fitBounds(bounds);
  }
};

export default HomeContainer;