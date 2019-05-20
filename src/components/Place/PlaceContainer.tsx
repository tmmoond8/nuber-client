import React from "react";
import { Mutation } from "react-apollo";
import { GET_PLACES } from "../../sharedQueries.queries";
import { editPlace, editPlaceVariables } from "../../types/api";
import { EDIT_PLACE } from "./Place.queries";
import PlacePresenter from "./PlacePresenter";

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
}

class FavMutation extends Mutation<editPlace, editPlaceVariables> {}

class PlaceContainer extends React.Component<IProps> {
  public render() {
    const { id, fav, name, address } = this.props;
    return (
      <FavMutation
        mutation={EDIT_PLACE}
        variables={{
          PlaceId: id,
          isFav: !fav
        }}
        refetchQueries={[{ query: GET_PLACES }]}
      >
        {editPlaceMutation => (
          <PlacePresenter
            onToggleStar={editPlaceMutation}
            fav={fav}
            name={name}
            address={address}
          />
        )}
      </FavMutation>
    )
  }
}

export default PlaceContainer;