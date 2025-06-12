interface Props {
    className? : string;
    placeholder? : string;
    value? : string;
    onChange? : (event : React.ChangeEvent<HTMLTextAreaElement>)=> void
    onKeyDown? : (event : React.KeyboardEvent<HTMLTextAreaElement>)=> void
    onClik? : (event : React.MouseEvent<HTMLTextAreaElement>)=> void
}

const InputText:React.FC<Props> = (props) => {
    return ( 
        <textarea  
            value={props.value}
            className={`${props.className}`} 
            placeholder={`${props.placeholder}`} 
            onChange={props.onChange}
            onKeyDown={props.onKeyDown}
            onClick={props.onClik}
        />
    );
}
export default InputText;