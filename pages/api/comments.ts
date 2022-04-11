import {gql,GraphQLClient} from "graphql-request";
const graphqlApi=process.env.NEXT_PUBLIC_GRAPHQL_CMS_ENDPOINT;
const graphCmsToken=process.env.GRAPH_CMS_TOKEN;
export default async function comments (req:any,res:any) {
    console.log(res, req.body);
// @ts-ignore
    const graphQLClient=new GraphQLClient(graphqlApi,{
    headers:{
        authorization:`Bearer ${graphCmsToken}`,
    }
});
    const query = gql`
        mutation CreateComment($name: String!, $email: String!, $content: String!, $id: ID!) {
            createComment(data:
            {name: $name, eMail: $email, text: $content, post: {connect: {id: $id}}}){
                id,
                createdAt
            }
        }
    `;
    try {
        //@ts-ignore
        const result=await graphQLClient.request(query,req.body);
        return res.status(200).send(result)
    }
    catch (e) {
        console.log(e,res);
        return res.status(500).send(e)
    }
}
