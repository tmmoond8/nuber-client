import { gql } from "apollo-boost";

export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        profilePhoto
        fullName
        firstName
        lastName
        email
        isDriving
      }
    }
  }
`;