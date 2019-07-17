import React from "react"
import Layout from "../components/layout"
import User from "../components/user"
import { Query } from "react-apollo"
import gql from "graphql-tag"

export default () => {
  return (
    <Query
      query={USERS_QUERY_APOLLO}
      variables={{ id: process.env.GATSBY_MOCK_USER_ID }}
    >
      {({ data, loading, error }) => {
        if (loading)
          return (
            <Layout>
              <h1>Loading...</h1>
            </Layout>
          )
        if (error)
          return (
            <Layout>
              <h1>Error Loading User</h1>
            </Layout>
          )
        return (
          <Layout>
            <User data={data.User} />
          </Layout>
        )
      }}
    </Query>
  )
}

export const USERS_QUERY_APOLLO = gql`
  query getuser($id: uuid!) {
    User: Users_by_pk(id: $id) {
      id
      first_name
      last_name
      username
      skills
      profile_pic
      following_aggregate {
        aggregate {
          count
        }
      }
      following {
        follower_info {
          username
          first_name
          last_name
          profile_pic
          id
        }
      }
      followers_aggregate {
        aggregate {
          count
        }
      }
      followers {
        follow_info {
          username
          profile_pic
          first_name
          last_name
          id
        }
      }
      about
      bio
      linkedin
      github
      learning_paths {
        id
        title
        description
        icon
        votes_aggregate {
          aggregate {
            count
          }
        }
        footsteps {
          id
          resource_icon
          resource_url
          resource_type
          level
          tags
          description
        }
      }
      learning_paths_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`
