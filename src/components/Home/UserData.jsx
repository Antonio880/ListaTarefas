import axios from "axios";
import { useEffect } from "react";
import { useUserContext } from "../ContextUser";

export default function UserData(  ){
    const { user } = useUserContext();
    console.log(user)
    const ul = document.querySelector("ul");
    useEffect(()=>{
        axios.get(`https://api.github.com/users/${user.login}/repos`)
         .then(async res => {
            const data = await res.json();

            data.map(index => {
                let li = document.createElement('li');
                li.className("col")
                li.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${index.name}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${index.full_name}</h6>
                        <p class="card-text">${index.description}</p>
                        <a href=${index.html_url} class="card-link">Project GitHub</a>
                        <a href=${index.owner.html_url} class="card-link">Pessoal GitHub</a>
                    </div>
                </div>
                `
                console.log("Chegou")
                ul.appendChild(li);
            })
         })
         .catch(err => console.log(err));
    }, [user])

    return(
        <div className="container text-center">
            <ul>

            </ul>
        </div>
    );
};