import { gql } from "apollo-boost";
export const PHONE_SIGN_IN = gql`
  mutation startPhoneVerification($phoneNumber: String!) {
    startPhoneVerification(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`;