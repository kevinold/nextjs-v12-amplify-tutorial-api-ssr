import { Amplify, withSSRContext } from "aws-amplify";
import Head from "next/head";
import awsExports from "../src/aws-exports";
import { listPosts } from "../src/graphql/queries";
import styles from "../styles/Home.module.css";

Amplify.configure({ ...awsExports, ssr: true });

export async function getStaticPaths() {
  const SSR = withSSRContext();
  const { data } = await SSR.API.graphql({ query: listPosts });
  const paths = data.listPosts.items.map((post) => ({
    params: { id: post.id },
  }));

  return {
    fallback: "blocking",
    paths,
  };
}

export async function getStaticProps({}) {
  const SSR = withSSRContext();
  const { data } = await SSR.API.graphql({ query: listPosts });

  return {
    props: {
      posts: data.listPosts.items,
    },
    revalidate: 10,
  };
}

export default function ISR({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>ISR</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {posts.map((post) => (
          <a
            data-test={`post-${post.id}`}
            className={styles.card}
            href={`/posts/${post.id}`}
            key={post.id}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </a>
        ))}
      </main>
    </div>
  );
}
