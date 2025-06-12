interface Props { 
    className? : string;
    children?: React.ReactNode;
    onClick? : (event : React.MouseEvent<HTMLButtonElement>) => void
}

const Button:React.FC<Props> = (props) => {
    return (
        <button 
            className={`${props.className}`}
            onClick={props.onClick}
        >
        {props.children}    
        </button>
    );
}
export default Button