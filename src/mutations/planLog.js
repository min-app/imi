import gql from 'graphql-tag'

export const addPlanLogMutation = gql`
  mutation AddLog($planId: PlanId!, $content: String!) {
    addPlanLog(input: {
      planId: $planId
      content: $content
      clientMutationId: "123"
    }) {
      addedPlanLogEdge {
        node {
          id
          content
          createdAt
        }
      }
    }
  }
`