import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   InfoWindow,
//   useJsApiLoader
// } from "@react-google-maps/api";

import React, { Component } from 'react';
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';

// import {Map as GoogleMapReact, Marker}  from 'google-maps-react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import Styles from './maps.module.css'
import "@reach/combobox/styles.css";
import Slider from './slider'

// const libraries = ["places"];
// const mapContainerStyle = {

//   height: "270px",
//   width: "800px",
//   // position: 'flex',
//   // zIndex: '-1',
//   borderColor: 'red',
//   border: '10px'
// };
// const options = {
//   disableDefaultUI: true,
//   zoomControl: true,
//   streetViewControl:false,
//   zoomControlOptions: false,
//   zoomControl: false,
  
// };
// const center = {
//   lat: 43.6532,
//   lng: -79.3832,
// };

// const container = {
//   marginTop: '10%',
//   marginRight: '28%',
//   marginLeft: '28%',
//   marginBottom: '-80%',
//   // height: "590px",
//   // width: "750px",
//   border: '2px solid grey'
// };
// export default function App(props) {
//   // const { isLoaded, loadError } = useLoadScript({
//   //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   //   libraries,
//   // });
//   // TODO: Nandu update below
//   let Location = props.Location;
//   let setLocation = props.setLocation;
//   const [markers, setMarkers] = React.useState([]);
//   const [selected, setSelected] = React.useState(true);

//   // const onMapClick = React.useCallback((e) => {
//   //   debugger;
//   //   setMarkers([
//   //     ...markers,
//   //     {
//   //       lat: e.latLng.lat(),
//   //       lng: e.latLng.lng(),
//   //       time: new Date(),
//   //     },
//   //   ]);

//   // }, []);

//   const onMapClick = (e) => {
//     debugger;
//     setMarkers([
//       ...markers,
//       {
//         key:'key'+e.lat.toString(),
//         lat: e.lat,
//         lng: e.lng,
//         time: new Date(),
//       },
//     ]);

//   }

//   const mapRef = React.useRef();
//   const onMapLoad = React.useCallback((map) => {
//     mapRef.current = map;
//   }, []);

//   const panTo = React.useCallback(({ lat, lng }) => {
//     mapRef.current.panTo({ lat, lng });
//     mapRef.current.setZoom(14);
//   }, []);

//   // if (loadError) return "Error";
//   // if (!isLoaded) return "Loading...";
//   return (
//    //hard coded the search and address, not useing material ui 
//     <div style={{height:800,width:1000, overflow:'hidden'}}>
//        <CloseOutlinedIcon style={{ height: 40, width: 40 }} className={Styles.cross} onClick={props.close}/>
//        <div className={Styles.topT}>
//         <h1 className={Styles.wantSearchText}>Where do you want to search?</h1>
//         <h1 className={Styles.addressText}>Address, City Or Province</h1>
//       </div>
    
      
//       <Search panTo={panTo} />
      
//       <GoogleMapReact
//         id="map"
//         mapContainerStyle={mapContainerStyle}
      
//         zoom={9}
//         center={center}
//         options={options}
//         onClick={onMapClick}
//         onLoad={onMapLoad}
//       >
//         {markers.map(marker => (
//           <Marker
//             {...marker}
//             onRightClick={() => console.log('marker click')}
//           />
//         ))}
//         {/* {selected ? (
//           <InfoWindow
//             position={{ lat: selected.lat, lng: selected.lng }}
//             onCloseClick={() => {
//               setSelected(null);
//             }}
//           >
//             <div>
//               <h2>
//                 <span role="img" aria-label="bear">
                
//                 </span>{" "}
//                 Alert
//               </h2>
//               <p>Spotted {formatRelative(selected.time, new Date())}</p>
//             </div> 
//           </InfoWindow>
//         ) : null} */}
//       </GoogleMapReact>
//       <div >
//         <h1 className={Styles.bottomL}></h1>
//         <div className={Styles.slider}>
//           <Slider close={props.close}/>
//         </div>
//       </div>
//     </div>
//   );
// }


function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    
    <div className={Styles.search} >
    
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
      
          <ComboboxList style={{zIndex:1000000, background:'white'}}>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} style={{zIndex:1000000}}/>
              ))}
          </ComboboxList>
      </Combobox>
    
    </div>
  );
}



const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  // onMapClick = (e) => {
  //     debugger;
  //     setMarkers([
  //       ...markers,
  //       {
  //         key:'key'+e.lat.toString(),
  //         lat: e.lat,
  //         lng: e.lng,
  //         time: new Date(),
  //       },
  //     ]);
  //   }

  render() {
    return (
      <div style={{height:800,width:1000, overflow:'hidden'}}>
       <CloseOutlinedIcon style={{ height: 40, width: 40 }} className={Styles.cross} onClick={this.props.close}/>
       <div className={Styles.topT}>
        <h1 className={Styles.wantSearchText}>Where do you want to search?</h1>
        <h1 className={Styles.addressText}>Address, City Or Province</h1>
       </div>
    
      
      <Search panTo={this.props.panTo} />
      
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: 43.8532,
            lng: -79.3832,
          }
        }
        // onClick={onMapClick}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Kenyatta International Convention Centre'}
        />
{/* //        {markers.map(marker => (
//           <Marker
//             {...marker}
//             onRightClick={() => console.log('marker click')}
//           />
//         ))} */}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
      <div >
         <h1 className={Styles.bottomL}></h1>
         <div className={Styles.slider}>
           <Slider close={this.props.close}/>
         </div>
       </div>
     </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBQbOVpM2UKKRF82lw8OVr2KhKKysfjZSU'
})(MapContainer);