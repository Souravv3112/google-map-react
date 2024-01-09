import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import "./StateCity.css"


const StateCity = () => {
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const handleZipCodeChange = async (event) => {
        const enteredZipCode = event.target.value;
        setZipCode(enteredZipCode);

        // Fetch city and state based on the entered zip code
        try {
            const response = await fetch(
                `https://api.zippopotam.us/us/${enteredZipCode}`
            );
            const data = await response.json();
            const cityName = data.places[0]["place name"];
            const stateName = data.places[0]["state"];

            setCity(cityName);
            setState(stateName);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setCity("");
            setState("");
        }
    };

    return (
        <>
            <div>
                <h2>Find Cities and States of USA</h2>
                <hr />
                <div className="m-5 w-25">
                    <Form>
                        <Form.Group className="mb-3 form_group" controlId="exampleForm.ControlInput1">
                            <Form.Label > Enter Zip/Pin Code</Form.Label>
                            <Form.Control type="number" id="zipCodeInput"
                                value={zipCode}
                                onChange={handleZipCodeChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" id="stateInput" value={state} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" id="cityInput" value={city} readOnly />
                        </Form.Group>
                    </Form>
                </div>
            </div>
            <hr />
        </>
    );
};

export default StateCity;