import { useEffect, useState} from 'react';
import './style.css'
import api from '../../services/api'

function Home(){
    const [albums, setAlbums] = useState([]);
    const [track, setTrack] = useState('');
    const [albumId, setAlbumId] = useState('');
    const [NameAlbum, setNameAlbum] = useState('');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);


    async function getAlbums(){
        try{
            const response = await api.get('/albums');
            setAlbums(response.data);
        } catch (error){
            console.error('Erro ao buscar álbuns:', error);
        }
    }

    async function postTrack(){
        if (!albumId || !track) {
            console.error('Álbum ou faixa não selecionado.');
            return;
        }

        try{
            const response = await api.post(`/albums/${albumId}/tracks`, {name: track});
            setTrack('');
            getAlbums();
        }catch (error){
            console.error('Erro ao adicionar nova faixa:', error);
        }

    }

    async function postAlbum(){
        if (!NameAlbum) {
            console.error('Álbum não selecionado.');
            return; 
        }
        try{
            const response = await api.post('/albums', { name: NameAlbum });
            console.log('Album adicionado:', response.data);
            setNameAlbum('')
            getAlbums();
        } catch (error){
            console.error('Erro ao adicionar novo album:', error);
        }
    }

    async function deleteAlbum(albumId){
        try{
            const response = await api.delete(`/albums/${albumId}`);
            getAlbums()
        } catch (error) {
            console.error(`Erro ao deletar o album: ${albumId}`, error);
        }
    }

    async function deleteTrack(trackId){
        try{
            const response = await api.delete(`/tracks/${trackId}`);
            getAlbums();
        } catch (error){
            console.error('Erro ao deletar faixa:', error);
        }
    }

    async function search(){
        if (query.trim() === '') {
            await getAlbums();
        } else {
            try{
                const response = await api.get(`/albums?name=${query}`);
                setAlbums(response.data);
            } catch (error){
                console.error('Erro ao buscar:', error);
            }
        }
    }


    useEffect(() => {
        getAlbums();
      }, []);


    return(
        <div className='container'>
            <h1 className='title' >Discografia de Tião Carreiro e Pardinho</h1>
            
            <form>
                <h1>Cadastrar Álbum</h1>
                <input placeholder='Digite o novo álbum' faixa='album' type='text' value={NameAlbum} onChange={(e) => setNameAlbum(e.target.value)}/>
                <button type='button' onClick={postAlbum}>Cadastrar</button>
            </form>

            <form>
                <h1>Cadastrar Faixa</h1>
                <select id="Album" name="album" onChange={(e) => setAlbumId(e.target.value)}>
                    {albums.map((album) => (
                        <option key={album.id} value={album.id}>
                        {album.name}
                        </option>
                    ))}
                </select>
                <input placeholder='Digite a nova faixa' faixa='track' type='text' value={track} onChange={(e) => setTrack(e.target.value)}/>
                <button type='button' onClick={() => postTrack()}>Cadastrar</button>
            </form>

            <div className='Search'>
                <input placeholder="Procurar faixa ou álbum" type="text" value={query}  onChange={(e) => setQuery(e.target.value)} />
                <button type="button" onClick={search} className='SearchButton'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed">
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                </button>
            </div>

            {albums.map((album) => (
                <div key={album.id} className='Album'>
                    <div className='AlbumHeader'>
                        <p>Album: <span>{album.name}</span></p>
                        <button onClick={() => deleteAlbum(album.id)} className='DeleteButtonAlbum'>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAPpJREFUOE/tldERgjAQRHN0kKQB6AQrUSsRKtFOxEqkgSQdcM46wABeCMOMf/AFc9zLsrkspP5wUYoZQiild7TWTaw3CgWMmZ8ri7bGmEKqR6HOuTsRXZj5sWwkolwpVRLRSVIchXrvoRKNhda6nYKdczciqpLQEELedd1taIZK3EeUwud8WbPWXtEzKt3gYWpPR4+nUPgEtefeyyrLstcaiZnxZbAICpvBph9PU35NF4n5noR6798AYXwGi5i5stbWB1Sc5cPT+Xgv57SPvhaDjaOMA6KU+j7vHqm1E7UZuicDjDGzDRejr7dATHwhW+tlpiZ/J6lokuofF9QqJTVagd4AAAAASUVORK5CYII=" />
                        </button>
                    </div>
                    <div className='AlbumTracks'>
                        {album.tracks.map(track => (
                            <div key={track.id} className='Track'>
                                <p>Faixas: <span>{track.name}</span></p>
                                <button onClick={() => deleteTrack(track.id)} className='DeleteButtonTrack'>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAAPpJREFUOE/tldERgjAQRHN0kKQB6AQrUSsRKtFOxEqkgSQdcM46wABeCMOMf/AFc9zLsrkspP5wUYoZQiild7TWTaw3CgWMmZ8ri7bGmEKqR6HOuTsRXZj5sWwkolwpVRLRSVIchXrvoRKNhda6nYKdczciqpLQEELedd1taIZK3EeUwud8WbPWXtEzKt3gYWpPR4+nUPgEtefeyyrLstcaiZnxZbAICpvBph9PU35NF4n5noR6798AYXwGi5i5stbWB1Sc5cPT+Xgv57SPvhaDjaOMA6KU+j7vHqm1E7UZuicDjDGzDRejr7dATHwhW+tlpiZ/J6lokuofF9QqJTVagd4AAAAASUVORK5CYII=" />
                                </button>
                            </div>   
                        ))}
                    </div>

                    
                    
                </div>
            ))}
        </div>
    )
}

export default Home;