import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

interface Props {

    containerStyle: {
        width: string;
        height: string;
    }

    center: {
        lat: number;
        lng: number;
    }

    options?: {
        disableDefaultUI: boolean
    }
}


export default function Map({center, containerStyle, options}: Props) {    

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA9OXdQ3M00P_bNsxZ9SjRLzE15q0naPvE"
    });

    return (
        <>
            {isLoaded && <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                options={options}
                >
                    <InfoWindow 
                        position={center}
                    >
                        <div className="border border-gray-500 p-3 rounded">
                            <h1>Compre aqui!</h1>
                        </div>
                    
                    </InfoWindow>
                </GoogleMap>
            }
        </>
    );
} 