import React, { useEffect, useState } from 'react'
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import { Button, Form } from "react-bootstrap";

const ReactMap = (props) => {
    const [mapShow, setMapShow] = useState(false);
    const [address, setAddress] = useState("");
    const [cord, setCord] = useState({
        lat: null,
        lng: null,
    });

    useEffect(() => { }, [cord])

    const handleSelect = async (newAddress) => {
        setAddress(newAddress);
        setMapShow(false)

    };
    const handleFindMap = async () => {
        const results = await geocodeByAddress(address);
        const ll = await getLatLng(results[0]);
        setCord(ll);
        setMapShow(true)
    }

    return (<>
        <div className="m-5">
            <h2>Find Location on Map</h2>
            <Form.Group className="input-container w-50" controlId="">
                <Form.Label>Enter Place Name</Form.Label>
                <PlacesAutocomplete
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>

                            <input
                                className="form_control form-control"

                                {...getInputProps({
                                    placeholder: "Search Places ...",
                                    className: "location-search-input form-control",
                                })}
                            />
                            {suggestions?.length > 0 &&
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions?.map((suggestion) => {
                                        const className = suggestion.active
                                            ? "suggestion-item--active"
                                            : "suggestion-item";
                                        const style = suggestion.active
                                            ? { backgroundColor: "#fafafa", cursor: "pointer" }
                                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                                        return (

                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                < span> {suggestion?.description}</span>
                                            </div>

                                        );
                                    })}

                                </div>
                            }
                        </div>
                    )}
                </PlacesAutocomplete>
                <Button className='btn btn-success w-100 mt-1' type='submit' onClick={handleFindMap}>Find</Button>
            </Form.Group>
            <div className='mt-5'>
                {mapShow &&
                    <Map
                        google={props.google}
                        zoom={18}
                        style={{
                            width: "90%",
                            height: "75%",
                        }}
                        initialCenter={{
                            lat: cord?.lat,
                            lng: cord?.lng,
                        }}
                    >
                        <Marker />
                    </Map>
                }
            </div>
        </div>
    </>
    )
}

export default GoogleApiWrapper({
    // apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    apiKey: "AIzaSyBYsWdrf2-qmKyP3XoXVeG0K7yYhJQgcG4",
})(ReactMap);

