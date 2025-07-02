import {useEffect, useState} from 'react';
import CreateArea from "../components/CreateArea.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Note from "../components/Note.jsx";
import {Toaster} from "react-hot-toast";
import axios from "axios";

function HomePage(props) {
  const [notes,setNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState("");

  const fetchNotes = async (sortOrder) => {
      const res = await axios.get(`http://localhost:3000/api/notes?sort=${sortOrder}`);
      setNotes(res.data.data);
  }

  useEffect(() => {
    fetchNotes("");
  }, []);

  return (
    <div>
      <Header />
      <CreateArea fetchNotes={fetchNotes} sortOrder={sortOrder}/>

      <select onChange={(e) => {
        setSortOrder(e.target.value);
        fetchNotes(e.target.value)
      }}>
        <option value="">Latest to oldest</option>
        <option value="ascending">Likes: low to high</option>
        <option value="descending">Likes: high to low</option>
      </select>
      <button onClick={() => fetchNotes("")}>Reset sorting</button>
      <Toaster/>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map(note => (
            <Note key={note.id} note={note} fetchNotes={fetchNotes} sortOrder={sortOrder}/>
          ))}
        </div>

      <Footer />
    </div>
  );
}

export default HomePage;