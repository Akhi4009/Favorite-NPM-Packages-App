import { Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
    <Flex justify={"space-around"} h={"80px"} bg={"cyan"} alignItems={"center"} m={"20px"}>
<Link to="/">Home</Link>
<Link to="/add">Add Fav</Link>
<Link to="fav">Favorite</Link>
    </Flex>
    </>
  )
}

export default Navbar