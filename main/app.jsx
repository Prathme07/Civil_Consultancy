import './Style/style.css'
import './Style/chat.css'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, setDoc, getFirestore, getDoc, onSnapshot, collection, addDoc, orderBy, query } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { auth } from '../Civil_Consultancy/script/chat'

function App() {
    const [user, setUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [messageInput, setMessageInput] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user)
        })
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (user) {
            const db = getFirestore()
            const messagesRef = collection(db, 'messages')
            const q = query(messagesRef, orderBy('timestamp', 'asc'))

            const unsubscribe = onSnapshot(q, (snapshot) => {
                setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            })

            return () => unsubscribe()
        }
    }, [user])

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()

        try {
            await signInWithPopup(auth, provider)
        } catch (error) {
            console.log(error)
        }
    }

    const sendMessage = async () => {
        if (!user || !messageInput.trim()) return
    
        const db = getFirestore()
        const messageText = messageInput.trim()
        const timestamp = new Date()
    
        try {
            // Add the message to Firestore
            await addDoc(collection(db, 'messages'), {
                text: messageText,
                timestamp: timestamp,
                userId: user.uid
            })
    
            // Add the message to the local state to display it immediately
            setMessages(prevMessages => [...prevMessages, {
                id: Date.now(), // Use a unique ID for the message
                text: messageText,
                timestamp: timestamp,
                userId: user.uid
            }])
    
            // Clear the message input field
            setMessageInput('')
        } catch (error) {
            console.error('Error sending message:', error)
        }
    }
    

    return (
        <div className="chat-container">
            {!user && <button onClick={handleGoogleLogin}>Login with Google</button>}
            {user &&
                <>
                    <div className="chat-messages">
                        {messages.map(message => (
                            <div key={message.id} className={`message ${message.userId === user.uid ? 'sent' : 'received'}`}>
                                <p>{message.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="message-input">
                        <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </>
            }
        </div>
    )
}

export default App
