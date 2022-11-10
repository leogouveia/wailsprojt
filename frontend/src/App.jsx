import {useState} from 'react';
import './App.css';
import { GetRandomImageUrl, GetBreedList, GetImageUrlsByBreed } from "../wailsjs/go/main/App";
import { useEffect } from 'react';

function App() {
    const [randomImageUrl, setRandomImageUrl] = useState('');
    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('');
    const [photos, setPhotos] = useState([]);
    const [showRandomPhoto, setShowRandomPhoto] = useState(false);
    const [showBreedPhotos, setShowBreedPhotos] = useState(false);



    async function getRandomImageUrl() {

        setShowRandomPhoto(false);
        setShowBreedPhotos(false);
        try {
            const result = await GetRandomImageUrl();
            setRandomImageUrl(result);
            setShowRandomPhoto(true);
        } catch (error) {
            alert(error);
        }
    }

    function getBreedList() {
        
        GetBreedList().then((result) => (setBreeds(result) || setSelectedBreed(result[0])))
    }

    function getImageUrlsByBreed() {
        setShowRandomPhoto(false);
        setShowBreedPhotos(false);
        GetImageUrlsByBreed(selectedBreed).then((result) => (setPhotos(() => {
            setShowBreedPhotos(true);
            return result
        })))
        
    }
    function handleSetSelectedBreed(event) {
        setSelectedBreed(event.target.value);
    }
    useEffect(() => {
        getBreedList();
    }, []);

    return (
        <div id="App">
            <h3>Dogs API</h3>

            <div>
                <button className="btn" onClick={() => getRandomImageUrl()}>
                    Fetch a dog randomly
                </button>
                Click on down arrow to select a breed
                <select value={selectedBreed} onChange={handleSetSelectedBreed}>
                    {breeds.map((breed, ix) => (
                        <option key={ix} value={breed}>{breed}</option>
                    ))}
                </select>
                <button className="btn" onClick={() => getImageUrlsByBreed()}>
                    Fetch by this breed
                </button>
            </div>

            <br />
           
            {showRandomPhoto && (
                <img id="random-photo" src={randomImageUrl} alt="No dog found" />
            )}

            {showBreedPhotos && photos?.map((photo, ix) => (
                <img key={ix} className="breed-photos" src={photo} alt="No dog found" />
            ))}
        </div>
    )
}

export default App
