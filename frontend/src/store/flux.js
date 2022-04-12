import api from '../services/api';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

            syncTokenFromSessionStore: () => {
                const token = sessionStorage.getItem("token");
                if(token && token != "" && token != undefined) {
                    setStore({ token: token });
                }
            },

            logout: () => {
                sessionStorage.removeItem("token");
                setStore({ token: null });
            },

            login: async(email, password) => {
                try {
                    const resp = await api.post(`/token`, {
                        email: email,
                        password: password,
                        }, { headers: { 'Content-Type': 'application/json' }});
    
                    if(resp.status !== 200) {
                        alert("There has been an error.")
                        return false;
                    }
    
                    const data = resp.data;
                    console.log(data);
                    sessionStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });
                    return true;
                } catch (err) {
                    console.error("There was an error. Error: " + err.message)
                }

            },

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;