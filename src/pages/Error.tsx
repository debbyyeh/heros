import { Link } from "react-router-dom";

export default function Error(){
    return(
        <>
        <h1>Error Page</h1>
        <p>back to home</p>
        <Link to="/">Go Home</Link>
      </>
    )
}