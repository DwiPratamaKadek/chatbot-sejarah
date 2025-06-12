interface Props { 
    className? : string;
    children? : React.ReactNode;
}

const Box:React.FC<Props> = (props) => {
    return (
        <div className={`${props.className}`}>{props.children}</div>
    )
}
export default Box