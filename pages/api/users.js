import { Amplify, API, Auth } from "aws-amplify";
import awsExports from "../../src/aws-exports";

Amplify.configure({
  ...awsExports,
  API: {
    endpoints: [
      {
        name: awsExports["aws_cloud_logic_custom"][0].name,
        endpoint: awsExports["aws_cloud_logic_custom"][0].endpoint,
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
          };
        },
      },
    ],
  },
  ssr: true,
});

export default async function handler(req, res) {
  API.get("UsersApi", "/").then(({ data }) => {
    res.status(200).json({ data });
  });
}
