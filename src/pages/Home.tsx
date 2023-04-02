import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './Home.scss';
import UserMessage from '../components/UserMessage';
import BotMessage from '../components/BotMessage';
import Loader from '../components/Loader';

import { SendOutlined } from '@ant-design/icons';
import { Space} from 'antd';

const Home = () => {

    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    useEffect(() => {
        document.title = 'Home';
    })

    const handleSubmit = async () => {

        document.getElementById("input-text-chat")!.setAttribute("disabled", "disabled");
        document.getElementById("button-text-chat")!.setAttribute("disabled", "disabled");

        setLoading(true);
        let messagescopy = [...messages];
        let div = (
            <UserMessage text={text} />
        )

        messagescopy.push(div);
        setMessages(messagescopy);

        handleApi(text);
    }

    const handleApi = (text:string) => {

        let messagescopy = [...messages];
        let divuser = (
            <UserMessage text={text} />
        )
        messagescopy.push(divuser);
        let copytext = text;
        
        setText('');
        axios.post('http://localhost:3000/api/complete', {
            text: copytext
        }).then(function (response) {
            let divbot = (
                <BotMessage text={response.data.text.text} />
            )
            messagescopy.push(divbot);
        }).catch(function (error) {
            messagescopy.push("erreur");
        }).finally(function () {
            setMessages(messagescopy);
            setLoading(false);
            document.getElementById("input-text-chat")!.removeAttribute("disabled");
            document.getElementById("button-text-chat")!.removeAttribute("disabled");
        })
        
    }

    const changeText = (e:any) => {
        let textz = e.target!.value;
        setText(textz);
    }

    return (
        <div>
            <h1>Swerk GPT</h1>
            <div className="col">
                <div className="row align-items-end">
                    <div className="messages-hist p-4">
                        {messages.map((message, index) => {
                            const isGray = index % 2 === 0;
                            const messageClass = isGray ? 'gray' : 'light-gray';
                            return (
                            <div key={index} className={messageClass}>
                                {message}
                            </div>
                            );
                        })}
                        <div className="loading text-center mt-4">
                            {loading && (
                                <Loader />
                            )}
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control bg-dark-gray" placeholder="Pourquoi la vie ?" id="input-text-chat" aria-label="Recipient's username" aria-describedby="button-addon2" value={text} onChange={changeText}/>
                            <div className="input-group-append">
                                <button className="btn bg-dark-gray no-round-left" type="button" id="button-text-chat" onClick={() => handleSubmit()}><Space><SendOutlined /></Space></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;