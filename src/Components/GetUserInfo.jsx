import React, {useState} from 'react';


const URL = 'https://jsonplaceholder.typicode.com/';

export default function GetUserInfo() {
    const [id, setId] = useState("");
    /*const [userId, setUserId] = useState("");*/
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit =  (async e =>  {
        e.preventDefault();
        let request = await fetch(`${URL}posts/${id}`); // await!
        const dataId = await request.json();
        setTitle(dataId.title)
        setBody(dataId.body)

        request = await fetch(`${URL}users/${dataId.userId}`); // await!
        const dataUserId = await request.json();
        setName(dataUserId.name)
        setEmail(dataUserId.email)

        setId('');
    });

    return <>
        <form onSubmit={handleSubmit}>
            <label>
                ID:
                <input type="text" value={id} onChange={e => setId(e.target.value)}/>            <br/>
            </label>
            <button type="submit">Получить данные!</button>
        </form>
        {title && <div>Title = {title}</div>}
        {body && <div>Body = {body}</div>}
        {name && <div>Name = {name}</div>}
        {email && <div>Email = {email}</div>}

    </>;
}