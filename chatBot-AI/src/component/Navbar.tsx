import Box from "../elements/Box"
import PindahHalaman from "../elements/PindahHalaman"


const Navbar = () => { 
    return (
        <div className="flex justify-center  w-full h-auto my-6 ">
            <Box className="flex justify-between items-center border-2 border-gray-300 w-3/5 h-auto rounded-md shadow-lg  ">
                <img src="public/images/logo.png" alt="logo" className="w-11 h-auto py-1 " />
                <div className="flex gap-3 items-center p-2"> 
                    <p>Home</p>
                        <PindahHalaman href="/chat" target="_self" rel="noopener noreferrer" className="flex justify-center border-2 border-black rounded-3xl w-20 p-2">
                            <img src="public/images/Vector.png" alt="right arrow"/>
                        </PindahHalaman>
                </div>
                
            </Box>
        </div>
    ) 
}

export default Navbar