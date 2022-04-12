import api from '../services/api';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            token: null,
			message: null,
		},
		actions: {
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
		}
	};
};

export default getState;