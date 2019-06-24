import gql from 'graphql-tag'

export const addPlanMutation = gql`
  mutation AddPlan(
    $title: String!
    $detail: String!
    $userId: UserId!
    $startTime: Date!
    $endTime: Date!
  ) {
    addPlan(
      input: {
        title: $title
        detail: $detail
        userId: $userId
        startTime: $startTime
        endTime: $endTime
        clientMutationId: "123"
      }
    ) {
      addedPlanEdge {
        node {
          id
        }
      }
      clientMutationId
    }
  }
`
