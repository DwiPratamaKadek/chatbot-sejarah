import Navbar from "../component/Navbar"
import Box from "../elements/Box"



const LandingPage = () => {

    return (
        <>
            <Navbar></Navbar>
            <Box className=" w-full h-auto bg-gray-200  ">
                <div className="mx-96">
                    <div className="flex items-center gap-6">
                        <p className="text-7xl ">HistoryBot</p>
                        <p className="w-auto font-thin">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute </p>
                    </div>
                    <p className="text-6xl mx-11 font-extralight my-3">Explore Indonesia's</p>
                    <div>
                        <p className="text-7xl ">Past Through Chat</p>
                    </div>
                    
                </div>
                

                


            </Box>

        </>
    )


}   
export default LandingPage 