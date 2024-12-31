import { Link } from "react-router-dom"

const Success = () => {
  return (
    <div>
      Your location has been saved successfully!
   <Link to="/home">Back To Home Page</Link>
    </div>
  )
}

export default Success
