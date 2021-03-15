const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLogged: "false",
			expenses: [],
			incomes: [],
			user: [],
			resume: []
		},
		actions: {
			// Use getActions to call a function within a fuction

			logged: () => {
				let status = sessionStorage.getItem("is_logged");
				status != "true" ? setStore({ isLogged: "false" }) : setStore({ isLogged: status });
			},

			logOut: () => {
				sessionStorage.removeItem("user_token");
				sessionStorage.removeItem("is_logged");
				getActions().logged();
			},

			addExpense: datos => {
				///ESTO SE TIENE QUE QUITAR DESPUES DE UNIR ENDPOINTS
				let data = datos;
				let expense = getStore().expenses;
				expense = expense.concat(data);
				setStore({ expenses: [...expense] });
				///

				let user_token = sessionStorage.getItem("user_token");

				fetch(process.env.BACKEND_URL + "/expense", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + user_token
					},
					body: JSON.stringify(data)
				})
					.then(response => {
						if (!response.ok) {
							response.text().then(text => alert(text));
							throw Error(response.statusText);
						} else {
							let expense = getStore().expenses;
							expense = expense.concat(data);
							setStore({ expenses: [...expense] });
						}
						return response.json();
					})
					.then(data => {
						console.log("Succesfully added expense");
					})
					.catch(error => {
						console.error("Error:", error);
					});
			},

			addIncome: datos => {
				let data = datos;
				let user_token = sessionStorage.getItem("user_token");
				///ESTO SE TIENE QUE QUITAR DESPUES DE UNIR ENDPOINTS
				let income = getStore().incomes;
				income = income.concat(data);
				setStore({ incomes: [...income] });
				///

				fetch(process.env.BACKEND_URL + "/income", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + user_token
					},
					body: JSON.stringify(data)
				})
					.then(response => {
						if (!response.ok) {
							response.text().then(text => alert(text));
							throw Error(response.statusText);
						} else {
							let income = getStore().incomes;
							income = income.concat(data);
							setStore({ incomes: [...income] });
						}
						return response.json();
					})
					.then(data => {
						console.log("Succesfully added income");
					})
					.catch(error => {
						console.error("Error:", error);
					});
			},

			deleteExpense: variable => {
				let user_token = sessionStorage.getItem("user_token");
				///ESTO SE TIENE QUE QUITAR DESPUES DE UNIR ENDPOINTS
				let expense = getStore().expenses;
				expense = expense.filter(item => item.id !== variable);
				setStore({ expenses: [...expense] });
				///

				fetch(process.env.BACKEND_URL + "/expense", {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + user_token
					}
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						} else {
							let expense = getStore().expenses;
							expense = expense.filter(item => item.id !== variable);
							setStore({ expenses: [...expense] });
						}
						return response.json();
					})
					.then(data => {
						setStore({ favorites: data });
						console.log("Expense deleted");
					})
					.catch(error => {
						console.error("Error:", error);
					});
			},

			deleteIncome: variable => {
				let user_token = sessionStorage.getItem("user_token");
				///ESTO SE TIENE QUE QUITAR DESPUES DE UNIR ENDPOINTS
				let income = getStore().incomes;
				income = income.filter(item => item.id !== variable);
				setStore({ incomes: [...income] });
				///

				fetch(process.env.BACKEND_URL + "/expense", {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + user_token
					}
				})
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						} else {
							let income = getStore().incomes;
							income = income.filter(item => item.id !== variable);
							setStore({ incomes: [...income] });
						}
						return response.json();
					})
					.then(data => {
						setStore({ favorites: data });
						console.log("Income deleted");
					})
					.catch(error => {
						console.error("Error:", error);
					});
			}
		}
	};
};

export default getState;
