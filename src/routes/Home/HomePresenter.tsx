import AddressBar from "components/AddressBar";
import Button from "components/Button";
import Menu from "components/Menu";
import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "../../typed-components";
import { userProfile } from "../../types/api";

const Container = styled.div``;

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  border: 0;
  cursor: pointer;
  z-index: 2;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  height: auto;
  width: 80%;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 50px;
  z-index: 10;
  background-color: rgba(0, 0, 0, .8);
`;

const RequestButton = styled(ExtendedButton)`
  bottom: 7rem;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

interface IProps {
  loading: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  mapRef: any;
  toAddress: string;
  onAddressSubmit: any;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  price: number;
  data?: userProfile;
  requestRideMutation?: MutationFn;
}

const HomePresenter: React.SFC<IProps> = ({
  loading, 
  isMenuOpen, 
  toggleMenu,
  mapRef,
  toAddress,
  onInputChange,
  onAddressSubmit,
  price,
  data: { GetMyProfile: { user = null } = {} } = { GetMyProfile: {}},
  requestRideMutation,
}) => (
  <Container>
    <Helmet>
      <title>Home | Nuber</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu/>}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{
        sidebar: {
          background: "white",
          width: "80%",
          zIndex: "10"
        }
      }}
    >
      {!loading && (<MenuButton onClick={toggleMenu}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z" fill="#1040e2"/><path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z"/></svg>
      </MenuButton>)}
      {user && !user.isDriving && (
        <React.Fragment>
          <AddressBar
            name="toAddress"
            onChange={onInputChange}
            value={toAddress}
            onBlur={() => ""}
          />
          <ExtendedButton
            onClick={onAddressSubmit}
            disabled={toAddress === ""}
            value={price ? "Change address" : "Pick Address"}
          />
        </React.Fragment>
      )}
      {!price ? false : (
        <RequestButton
          onClick={requestRideMutation}
          disabled={toAddress === ""}
          value={`Request Ride ($${price})`}
        />
      )}
      <Map ref={mapRef}/>
    </Sidebar>
  </Container>
)

export default HomePresenter;