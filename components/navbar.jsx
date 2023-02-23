import Link from "next/link"
import Head from "next/head"
import { useRouter } from "next/router"

export default function navbar() {
  const router = useRouter();

  return (
    <header>
      <nav className="navbar bg-light navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link href="/" className="navbar-brand">NextJS</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/" className={`nav-link ${router.pathname == "/" ? "active" : ""}`}>Home</Link>
              </li>
              <li className="nav-item">
                <Link href="/posts" className={`nav-link ${router.pathname == "/posts" || router.pathname == "/posts/create" ? "active" : ""}`}>Post</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-primary" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  )
}
