import { useEffect, useState } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import pictureAPI from './components/Services';
import Loader from 'components/Loader';
import ErrorView from 'components/Error';
import Button from 'components/Button';
import s from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [total_results, setTotal_Results] = useState(false);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setData([]);
    setTotal_Results(false);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus(Status.PENDING);

    pictureAPI
      .fetchPictures(query, page)
      .then(({ hits, total }) => {
        setData(prevData => [...prevData, ...hits]);
        setStatus(hits.length !== 0 ? Status.RESOLVED : Status.REJECTED);
        setTotal_Results(total);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
  }, [query, page]);

  const nextPage = () => {
    if (total_results > data.length) {
      setPage(prevPage => prevPage + 1);
      setTotal_Results(false);
    }
    return;
  };

  const togleModal = (largeImageURL, tag) => {
    setShowModal(!showModal);
    setLargeImage(largeImageURL ? largeImageURL : '');
    setTags(tag ? tag : '');
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleFormSubmit} />

      {status === 'idle' && (
        <div className={s.idle_message}>Please, enter search query.</div>
      )}

      {status === 'pending' && <Loader />}

      {status === 'resolved' && (
        <ImageGallery openModal={togleModal} data={data} />
      )}

      {total_results > data.length && <Button loadMore={nextPage} />}

      {status === 'rejected' && <ErrorView />}

      {showModal && (
        <Modal onClose={togleModal} largeImage={largeImage} tag={tags} />
      )}
    </div>
  );
}
