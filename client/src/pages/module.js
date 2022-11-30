import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Layout, QueryResult, ModuleDetail } from '../components';

// Query to obtain specific module for a parent track to show in Module page
export const GET_MODULE_AND_PARENT_TRACK = gql`
query getModuleAndParentTrack($trackId: ID!, $moduleId: ID!) {
  track(id: $trackId) {
    id
    title
    modules {
      id
      title
      length
    }
  }
  module(id: $moduleId) {
    id
    videoUrl
    title
    content
  }
}
`;

const Module = ({ trackId, moduleId }) => {
  const { loading, error, data } = useQuery(GET_MODULE_AND_PARENT_TRACK, {
    variables: {
      trackId, moduleId
    }
  });

  return (
    <Layout fullWidth={true}>
      <QueryResult loading={loading} error={error} data={data}>
        <ModuleDetail track={data?.track} module={data?.module} />
      </QueryResult>
    </Layout>
  );
};

export default Module;

