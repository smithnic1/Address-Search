import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_MAPS_API = process.env.JS_GOOGLE_MAPS_API;

type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number, lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(event: Event): void {
    event.preventDefault();
    const enteredAddress = addressInput?.value;
    // encodeURI is js function that makes a string fit a url
    axios.get<GoogleGeocodingResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
            enteredAddress
            )}&key=${GOOGLE_MAPS_API}`
        )
    .then (response => {
        if (response.data.status !== 'OK') {
            throw new Error('Could not get location!');
        }
        const coordiantes = response.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: coordiantes,
            zoom: 8
        });

        new google.maps.Marker({position: coordiantes, map: map})
    })
    .catch (error => {
        alert(error.message);
        console.log(error);
    })
}

form.addEventListener('submit', searchAddressHandler);

function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.JS_GOOGLE_MAPS_API}`;
    document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', loadGoogleMapsAPI);