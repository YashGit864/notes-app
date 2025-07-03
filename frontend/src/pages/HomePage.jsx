import {useEffect, useState} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import CreateArea from "../components/CreateArea.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Note from "../components/Note.jsx";
import BasicPagination from "../components/BasicPagination.jsx";
import {Toaster} from "react-hot-toast";
import axios from "axios";

function HomePage(props) {
  const [totalCount, setTotalCount] = useState(0);
  const [notes, setNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState("created_at DESC");

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [limit, setLimit] = useState(parseInt(queryParams.get('limit')) || 3);
  const [offset, setOffset] = useState(parseInt(queryParams.get('offset')) || 0);

  const fetchNotes = async () => {
    const res = await axios.get(`http://localhost:3000/api/notes`, {
      params: {
        sortOrder: sortOrder,
        offset: offset,
        limit: limit
      }
    });
    setNotes(res.data.data);
    setTotalCount(res.data.count);
  }

  const updateLimit = (newLimit) => {
    const params = new URLSearchParams(location.search);
    setLimit(newLimit);
    setOffset(0);
    params.set('limit', newLimit.toString());
    params.set('offset', '0');
    navigate(`${location.pathname}?${params.toString()}`);
  }

  const updateOffset = (newOffset) => {
    const params = new URLSearchParams(location.search);
    params.set('offset', newOffset);
    setOffset(newOffset);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  useEffect(() => {
    fetchNotes();
  }, [limit, offset, sortOrder]);

  return (
    <div>
      <Toaster/>
      <Header/>
      <div className='home'>
        <CreateArea fetchNotes={fetchNotes} sortOrder={sortOrder}/>

        <div className='container'>
          <select onChange={(e) => {
            setSortOrder(e.target.value);
          }}>
            <option value="created_at DESC">Latest to oldest</option>
            <option value="likes ASC">Likes: low to high</option>
            <option value="likes DESC">Likes: high to low</option>
          </select>
          <button onClick={() => setSortOrder("created_at DESC")}>Reset sorting</button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map(note => (
            <Note key={note.id} note={note} fetchNotes={fetchNotes} sortOrder={sortOrder}/>
          ))}
        </div>

      </div>
      <BasicPagination offset={offset} limit={limit} totalCount={totalCount} setOffset={updateOffset} setLimit={updateLimit}/>
      <Footer/>
    </div>
  );
}

export default HomePage;