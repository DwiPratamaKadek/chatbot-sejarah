
interface Props{
href : string
target : '_blank' | '_self' | '_parent' | '_top'
rel : string
className : string 
children : React.ReactNode
}



const PindahHalaman:React.FC<Props> = (props) => {
    return (
        <a href={props.href} target={props.target} rel={props.rel} className={props.className}>
            {props.children}
        </a>
    )
}
export default PindahHalaman
