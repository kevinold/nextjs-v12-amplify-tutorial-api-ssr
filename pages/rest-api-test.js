import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify, API } from "aws-amplify";
import { useEffect, useState } from "react";
import config from "../src/aws-exports.js";

Amplify.configure(config);

async function get() {
  const apiName = "UsersApi";
  const path = "";
  const myInit = {
    response: true,
  };

  return API.get(apiName, path, myInit)
    .then((response) => {
      console.log("got response", response);
      return response;
    })
    .catch((error) => {
      console.log("got error", error);
      return error;
    });
}

export default function App() {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  async function getResponse() {
    setIsLoading(true);
    setResponse(await get());
    setIsLoading(false);
  }
  useEffect(() => {
    getResponse();
  }, []);
  return (
    <div>
      <Authenticator>
        <button onClick={getResponse}>refresh</button>
        <button type="button" onClick={() => Auth.signOut()}>
          Sign out
        </button>
        {isLoading && <span>Loading...</span>}
        <code>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </code>
      </Authenticator>
    </div>
  );
}
