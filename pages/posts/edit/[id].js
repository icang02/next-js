//import hook useState
import { useState } from "react";

//import router
import Router from "next/router";
import Link from "next/link";
import Head from "next/head";

//import layout
import Layout from "@/components/Layout";

//import axios
import axios from "axios";

//fetch with "getServerSideProps"
export async function getServerSideProps({ params }) {
  //http request
  const req = await axios.get(`http://127.0.0.1:8000/api/posts/${params.id}`);
  const res = await req.data.data.resource;

  return {
    props: {
      post: res, // <-- assign response
    },
  };
}

export default function PostEdit(props) {
  //destruct
  const { post } = props;

  //state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);

  //state validation
  const [validation, setValidation] = useState({});

  //function "handleFileChange"
  const handleFileChange = (e) => {
    //define variable for get value image data
    const imageData = e.target.files[0];

    //check validation file
    if (!imageData.type.match("image.*")) {
      //set state "image" to null
      setImage("");

      return;
    }

    //assign file to state "image"
    setImage(imageData);
  };

  // function resetForm
  const resetForm = () => {
    // set state to default value
    setImage("");
    setTitle(post.title);
    setContent(post.content);
  };

  //method "updatePost"
  const updatePost = async (e) => {
    e.preventDefault();

    //define formData
    const formData = new FormData();

    //append data to "formData"
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("_method", "PUT");

    //send data to server
    await axios
      .post(`http://127.0.0.1:8000/api/posts/${post.id}`, formData, {
        onUploadProgress: setLoading(true),
      })
      .then(() => {
        //redirect
        Router.push("/posts");
      })
      .catch((error) => {
        //assign validation on state
        setLoading(false);
        setValidation(error.response.data);
      })
      .finally((e) => {
        // setLoading(false);
      });
  };

  return (
    <Layout>
      <Head>
        <title>Edit Post</title>
      </Head>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                <Link href="/posts" className="btn btn-secondary">
                  Kembali
                </Link>
                <hr />
                <form onSubmit={updatePost}>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      onChange={handleFileChange}
                    />
                    {validation.image && (
                      <small className="text-danger d-block mt-2">
                        {validation.image}
                      </small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {validation.title && (
                      <small className="text-danger d-block mt-2">
                        {validation.title}
                      </small>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                      Content
                    </label>
                    <textarea
                      className="form-control"
                      id="content"
                      rows="3"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    {validation.content && (
                      <small className="text-danger d-block mt-2">
                        {validation.content}
                      </small>
                    )}
                  </div>

                  <div className="mt-3">
                    <button
                      disabled={loading}
                      type="submit"
                      className="btn btn-primary me-1"
                    >
                      {loading && (
                        <span class="spinner-border spinner-border-sm text-light me-1"></span>
                      )}
                      Update Post
                    </button>
                    <button
                      type="reset"
                      onClick={resetForm}
                      className="btn btn-danger"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
