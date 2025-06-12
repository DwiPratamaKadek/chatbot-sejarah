import Chat from "../component/Chat"
import { useState, useEffect, useRef } from "react";


const MainChat = () => {
        const [input, setInput] = useState("");
        const [history, setHistory] = useState([]);
        const [IsTyping, setIsTyping] = useState(false);
        const [Message, setMessage] = useState("");
        const bottomRef = useRef(null);

        useEffect(() => {
            // Setiap kali history berubah, scroll ke bawah
            if (bottomRef.current) {
                bottomRef.current.scrollIntoView({ behavior: "smooth" });
            }
        },[history]);

        const sendMessage = async () => {
            if (!input.trim()) return;
        
            const userText = input.trim()
            //Menambahkan pesan user ke history 
            setHistory(prev => [...prev, {role : 'user', content : input}])
            setIsTyping(true)


            if(userText.toLowerCase()==="helo"){
                const helo = "Halo ada yang ingin ditanyakan ?"
                let idx = 0

                const typeText = () => {
                    setMessage(helo.slice(0, idx + 1))
                    idx++;
                    
                    if(idx < helo.length) {
                        setTimeout(typeText, 10)
                    }else {
                        setHistory(prev => [...prev, { role: 'bot', content: helo }])
                        console.log("Pesan terbaru", setHistory)
                        setMessage("")
                        setInput("")
                        setIsTyping(false)
                    }
                }
                typeText()
            }else if(userText.toLocaleLowerCase() === "tidak" || userText.toLocaleLowerCase() === "tidak ada") {
                const gooodbyText = "Terima Kasih telah menggunakan bot ini"
                let idx = 0

                const typeText = () => {
                    setMessage(gooodbyText.slice(0, idx + 1))
                    idx++;
                        
                    if(idx < gooodbyText.length) {
                        setTimeout(typeText, 10)
                    }else {
                        setHistory(prev => [...prev, { role: 'bot', content: gooodbyText }])
                        console.log("Pesan terbaru", setHistory)
                        setMessage("")
                        setInput("")
                        setIsTyping(false)
                    }
                }
                typeText()
            
            }else {

                try {
                    const res = await fetch("http://localhost:8000/api/chat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ user_input: input }),
                    });
            
                    // Cek apakah berhasil
                    if (!res.ok) {
                        const text = await res.text();
                        console.error("Respon GAGAL:", res.status, text);
                        return;
                    }
                    
                    const data = await res.json();
                    const fullText = data.response
                    let idx = 0  
                    console.log("✅ Respon JSON:", data);
                    
                    

                    // fungsi untuk typewriter
                    const typeText = () => {
                        setMessage(fullText.slice(0, idx + 1))
                        idx++;
                        
                        if(idx < fullText.length) {
                            setTimeout(typeText, 10)
                        }else {
                            setHistory(prev => [...prev, { role: 'bot', content: fullText }])
                            console.log("Pesan terbaru", setHistory)
                            setMessage( "ada yang ingin ditanyakan lagi? ")
                            
                        }
                    }
                    setInput("");
                    typeText()
                } catch (err) {
                    console.error("Pesan gagal untuk dikirim:", err);
                }
        }

            
            console.log("🧾 History saat ini:", history);    
        };
    return (
        <>
            {/* Untuk History Chat */}
            <div className="w-auto h-[90vh] overflow-y-auto mx-96">
            {/* Map semua pesan */}
            {history.map((msg, index) => (
                <div key={index} className={`flex mb-4 mx-28 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex flex-col max-w-xs p-3 rounded-lg">
                    <div className="flex items-center text-sm text-black p-2 gap-3">
                    <div className="border-2 rounded-full w-11 h-11"></div>
                    {msg.role === "user" ? "You" : "Bot"}
                    </div>
                    <div className="w-auto border-2 p-3 text-black rounded-lg break-all">
                    <div>{msg.content}</div>
                    </div>
                </div>
                </div>
            ))}

            {/* Tampilkan typing message sebagai div terpisah */}
            {IsTyping && (
                <div className="flex mb-4 mx-28 justify-start">
                <div className="flex flex-col max-w-xs p-3 rounded-lg">
                    <div className="flex items-center text-sm text-black p-2 gap-3">
                    <div className="border-2 rounded-full w-11 h-11"></div>
                    Bot
                    </div>
                    <div className="w-auto border-2 p-3 text-gray-500 rounded-lg italic">
                    {Message || "Bot sedang mengetik..."}
                    </div>
                </div>
                </div>
            )}

            <div ref={bottomRef}></div>
            </div>
            
            {/* Component untuk Input user */}
            <Chat input={input} setInput={setInput} onSend={sendMessage}></Chat>
        </>
    )
}
export default MainChat