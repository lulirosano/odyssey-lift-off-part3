import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Layout, QueryResult } from '../components';
import TrackDetail from '../components/track-detail';

/** GET_TRACK gql query to retrieve a specific track by its ID */
export const GET_TRACK = gql`
  query GetTrack($trackId: ID!) {
    track(id: $trackId) {
      id
      description
      title
      author {
        id
        name
        photo
      }
      thumbnail
      length
      modulesCount
      numberOfViews
      modules {
        id
        title
        length
      }
    }
  }
`;

const Track = ({ trackId }) => {
  const { loading, error, data } = useQuery(GET_TRACK, {
    variables: { trackId }
  });

  return (
    <Layout>
      <QueryResult error={error} loading={loading} data={data}>
        <TrackDetail track={data?.track} />
      </QueryResult>
    </Layout>
  )
};

export default Track;