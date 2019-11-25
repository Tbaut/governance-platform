import gql from 'graphql-tag';

export const CREATE_POST = gql`
    mutation createPost($userId: Int! $content: String! $cat: Int! $title: String!) {
        __typename
        insert_posts(objects: {
            author_id: $userId,
            category_id: $cat,
            content: $content,
            title: $title
        }) {
            affected_rows
        }
    }
`;