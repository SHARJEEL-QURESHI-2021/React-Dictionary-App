import './Style.css';
import Swal from 'sweetalert2';

const Dictionary = () => {

    const show = () => {
        const inp = document.getElementById('inp');
        const word = document.getElementById('word');
        const system = document.getElementById('system');
        const phonetics = document.getElementById('phonetic');
        const synonym = document.getElementById('synonyms');
        const antonym = document.getElementById('antonyms');
        const firstDef = document.getElementById('firstDef');
        const secondDef = document.getElementById('secondDef');
        const thirdDef = document.getElementById('thirdDef');

        if (inp.value === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Filled Input First',
            });
            return;
        }

        const data = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inp.value}`)

        data
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((values) => {
                console.log(values);

                if (!values || !values[0] || !values[0].meanings) {
                    // Handle the case where the API response structure is unexpected
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'An error occurred while fetching the data. Please try again later.',
                    });
                    return;
                }

                word.innerHTML = " " + inp.value;
                system.innerHTML = " " + (values[0].meanings[0]?.partOfSpeech || 'N/A');
                phonetics.innerHTML = " " + (values[0]?.phonetic || 'N/A');
                synonym.innerHTML = " " + (values[0].meanings[0]?.synonyms || 'N/A');
                antonym.innerHTML = " " + (values[0].meanings[0]?.antonyms || 'N/A');
                firstDef.innerHTML = " " + (values[0].meanings[0]?.definitions[1]?.definition || 'N/A');
                secondDef.innerHTML = " " + (values[0].meanings[1]?.definitions[0]?.definition || 'N/A');
                thirdDef.innerHTML = " " + (values[0].meanings[0]?.definitions[0]?.definition || 'N/A');
            })
            .catch((error) => {
                console.error('Dictionary Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error occurred while fetching the data. Please try again later.',
                });
            });

    };


    return (
        <div className='main'>
            <h1>Dictionary App</h1>
            <div className="other-1">
                <input type="text" placeholder='Enter Your Word...' id='inp' />
                <button id='btn' onClick={show}>Generate</button>
            </div>
            <div className='other-2'>
                <h2>Your Word:
                    <span id='word'></span>
                </h2>
                <h2>Part Of Speech:
                    <span id='system'></span>
                </h2>
                <h2>Phonetic:
                    <span id='phonetic'></span>
                </h2>
                <h2>Synonyms:
                    <span id='synonyms'></span>
                </h2>
                <h2>Antonyms:
                    <span id='antonyms'></span>
                </h2>
                <p>First Definiton:
                    <span id='firstDef'></span>
                </p>
                <p>Second Definiton:
                    <span id='secondDef'></span>
                </p>
                <p>Third Definiton:
                    <span id='thirdDef'></span>
                </p>
            </div>
        </div>
    )
}

export default Dictionary