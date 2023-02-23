// layout
import Layout from "@/components/Layout";

// link
import Link from "next/link";
import Head from "next/head";

// axios
import axios from "axios";

//router
import { useRouter } from "next/router";
import { useState } from "react";

// fetch with "getServerSideProps"
export async function getServerSideProps() {
  // URL API
  // const URL = "http://127.0.0.1:8000";
  const URL = "https://api.ilmifaizan.web.id";

  // http request
  const req = await axios.get(`${URL}/api/posts`);
  const res = await req.data.data.resource.data;

  return {
    props: {
      posts: res, // <-- assign response
    },
  };
}

export default function PostIndex(props) {
  // URL API
  // const URL = "http://127.0.0.1:8000";
  const URL = "https://api.ilmifaizan.web.id";

  // destruct
  const { posts } = props;

  // state loading
  const [loading, setLoading] = useState(false);

  //router
  const router = useRouter();

  //refresh data
  const refreshData = () => {
    router.replace(router.asPath);
  };

  //function "deletePost"
  const deletePost = async (id) => {
    if (confirm("Hapus data?")) {
      // sending
      await axios.delete(`${URL}/api/posts/${id}`, {
        onprogress: setLoading(true),
      });

      // refresh data
      setLoading(false);
      refreshData();
    }
  };

  return (
    <Layout>
      <Head>
        <title>Post</title>
      </Head>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                <Link href="/posts/create" className="btn btn-primary">
                  Tambah
                </Link>
                <hr />
                <div className="table-responsive">
                  <table className="table table-bordered mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Judul</th>
                        <th>Content</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post, i) => (
                        <tr key={post.id}>
                          <td>{i + 1}</td>
                          <td className="text-center">
                            <img
                              src={`${URL}/storage/posts/${post.image}`}
                              className="rounded-3"
                              alt="gambar"
                              width={150}
                            />
                          </td>
                          <td>{post.title}</td>
                          <td>{post.content}</td>
                          <td className="text-nowrap">
                            <Link href={`/posts/edit/${post.id}`}>
                              <button className="btn btn-sm btn-primary border-0 shadow-sm me-1">
                                EDIT
                              </button>
                            </Link>
                            <button
                              onClick={() => deletePost(post.id)}
                              disabled={loading}
                              className="btn btn-sm btn-danger border-0 shadow-sm"
                            >
                              DELETE
                            </button>
                          </td>
                        </tr>
                      ))}

                      {posts.length == 0 && (
                        <tr>
                          <td className="text-center" colSpan={5}>
                            Tidak ada data.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
