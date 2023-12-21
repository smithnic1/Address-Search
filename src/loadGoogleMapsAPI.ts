function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.JS_GOOGLE_MAPS_API}`;
    document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', loadGoogleMapsAPI);