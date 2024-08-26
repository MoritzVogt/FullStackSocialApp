export default function Headline({size,text}){
    return[
        <>
            <p style={{
                textAlign:"center",
                color:"text.secondary",
                fontFamily:"Helvetica",
                fontSize: size
            }}>{text ? text:" fetziger Name"}</p>
        </>
    ]
}