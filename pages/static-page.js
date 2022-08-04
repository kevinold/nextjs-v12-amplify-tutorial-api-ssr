import { Amplify, Analytics, API } from "aws-amplify";
import { useEffect } from "react";
import awsExports from "../src/aws-exports";

Amplify.configure({
  ...awsExports,
  API: {
    endpoints: [
      {
        name: awsExports["aws_cloud_logic_custom"][0].name,
        endpoint: awsExports["aws_cloud_logic_custom"][0].endpoint,
        region: awsExports["aws_cloud_logic_custom"][0].region,
        custom_header: async () => {
          return {
            Authorization: `Bearer ${(await Auth.currentSession()).idToken.jwtToken}`,
          };
        },
      },
    ],
  },
  ssr: true,
});

export default function StaticPage() {
  useEffect(() => {
    const recordAnalytics = async () => {
      await Analytics.record({ name: "viewStaticPage" });
    };

    const getUsers = async () => {
      await API.get("UsersApi", "/", {});
    };

    recordAnalytics().catch(console.error);
    getUsers().then(console.log).catch(console.error);
  }, []);
  return <div data-test="content">This is a static page</div>;
}
