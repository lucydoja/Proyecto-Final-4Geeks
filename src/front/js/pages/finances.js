import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { ProgressBar_function, BarGraph_function, PieGraphCategory_function, PieGraphMethod_function } from "./Utils";

export const Finances = () => {
	const { store, actions } = useContext(Context);
	const [category, setCategory] = useState("total");

	// llamar a la funcion de get informacion aqui para que tome en cuenta los datos recientemente agregados en el view de trans
	useEffect(() => {
		actions.getResume();
	}, []);

	// esto es para que siempre le salga el resumen del mes actual
	var date = new Date();
	let current_month_num = date.getMonth();
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	let current_month = months[current_month_num];
	// +1 porque en javascript los meses empiezan en 0 y en python en 1!
	const [month, setMonth] = useState(current_month_num + 1);

	let current_year = date.getFullYear();
	const [year, setYear] = useState(current_year);

	let datos = store.resume.filter(item => item.year === year);
	datos = datos.filter(item => item.month === month);

	let monthly_data = datos[0];
	let weekly_data;

	///DEFINIR CONDICION PARA UNDEFINED POR SI NO TIENE REGISTROS EN UN MES
	monthly_data
		? category == "total"
			? (weekly_data = monthly_data["expenses"]["week"])
			: (weekly_data = monthly_data["category"][category]["week"])
		: null;

	return (
		<div className="container d-flex justify-content-center mt-2">
			<div className="formulario2 mb-5 mt-3 row">
				<h3 className="mt-2">YOUR FINANCES</h3>
				<div>
					<form>
						<div className="form-row mt-3">
							<label htmlFor="month">Select Year</label>
							<select
								onChange={e => setYear(parseInt(e.target.value))}
								className="form-control"
								name="month"
								id="month">
								<option value="" selected disabled hidden>
									{year}
								</option>
								<option value="2020">2020</option>
								<option value="2021">2021</option>
							</select>
						</div>
						<div className="form-row mt-3">
							<label htmlFor="month">Select Month</label>
							<select
								onChange={e => setMonth(parseInt(e.target.value))}
								className="form-control"
								name="month"
								id="month">
								<option value="" selected disabled hidden>
									{current_month}
								</option>
								<option value="1">January</option>
								<option value="2">February</option>
								<option value="3">March</option>
								<option value="4">April</option>
								<option value="5">May</option>
								<option value="6">June</option>
								<option value="7">July</option>
								<option value="8">August</option>
								<option value="9">September</option>
								<option value="10">October</option>
								<option value="11">November</option>
								<option value="12">December</option>
							</select>
						</div>
						<div className="form-row mt-3">
							<label htmlFor="category">Select Category</label>

							<select
								onChange={e => setCategory(e.target.value)}
								className="form-control"
								name="category"
								id="category">
								<option value="total">All</option>
								<option value="home">Home</option>
								<option value="food">Food</option>
								<option value="transport">Transport</option>
								<option value="services">Services</option>
								<option value="education">Education</option>
								<option value="clothing">Clothing</option>
								<option value="entertainment">Entertainment</option>
							</select>
						</div>
					</form>
				</div>

				{monthly_data ? (
					<div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
						<div className="carousel-inner">
							<div className="carousel-item active p-3">
								<h5 className="text-center mt-4">
									<strong>Porcentage of income spent</strong>
								</h5>
								<ProgressBar_function category={category} monthly_data={monthly_data} />
							</div>
							<div className="carousel-item  p-3">
								<BarGraph_function category={category} weekly_data={weekly_data} />
							</div>

							{category == "total" ? (
								<div className="carousel-item  p-3">
									<PieGraphCategory_function monthly_data={monthly_data} />
									{/*Por categoria */}
								</div>
							) : null}

							<div className="carousel-item  p-3">
								<PieGraphMethod_function monthly_data={monthly_data} />
							</div>
						</div>
						<a
							className="carousel-control-prev"
							href="#carouselExampleIndicators"
							role="button"
							data-slide="prev">
							<span className="carousel-control-prev-icon" aria-hidden="true" />
							<span className="sr-only">Previous</span>
						</a>
						<a
							className="carousel-control-next"
							href="#carouselExampleIndicators"
							role="button"
							data-slide="next">
							<span className="carousel-control-next-icon" aria-hidden="true" />
							<span className="sr-only">Next</span>
						</a>
					</div>
				) : (
					<div className="alert alert-danger mt-3 text-center pt-2" role="alert">
						<p>You have no transactions registered for this specific date, please choose another one.</p>
					</div>
				)}
			</div>
			<div className="posicionFooter" />
		</div>
	);
};
