import Layout from "@/components/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div className="container mt-4">
        <h1>Hello World</h1>
      </div>
    </Layout>
  );
}
