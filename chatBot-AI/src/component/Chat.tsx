import InputText from "../elements/InputText";
import Box from "../elements/Box";
import Button from "../elements/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface ChatProps { 
    input : string;
    setInput : (value: string) => void;
    onSend : () => void;
}


const Chat: React.FC<ChatProps> = ({input, setInput, onSend}) => {
    return (
        <div className="fixed bottom-0 left-0 w-full flex justify-center bg-white py-4 ">
            <Box className="flex justify-between items-center border-2 w-2/4 px-5 py-2 rounded-lg ">
                <InputText 
                    className="border-none focus:outline-none w-full"  
                    placeholder="Masukan Text"
                    value = {input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSend()}
                >
                </InputText>
                <Button className="bg-black rounded-full p-2 ml-4" onClick={onSend}>
                    <FontAwesomeIcon icon={faArrowRight} className="text-white pt-1 pr-1 pl-1"></FontAwesomeIcon>
                </Button>
            </Box>
        </div>
        
    )
}
export default Chat;