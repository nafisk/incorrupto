import Navbar from '@/components/navbar';
import ArticleTable from '@/components/AnalysisTable';
import AnalysisCharts from '@/components/AnalysisCharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Analysis() {
  const [url, setUrl] = useState('');
  const [articleData, setArticleData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showYoutube, setShowYoutube] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem('user')) {
      console.log('User is logged in');
      setIsLoggedIn(true);
    } else {
      console.log('User is not logged in');
    }

    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const handleAnalysis = e => {
    e.preventDefault();

    // check if url is for a youtube video
    if (url.includes('youtube.com')) {
      // const data = { email, password };

      axios
        .post(
          'http://127.0.0.1:5000/submit-video-link',
          { videoLink: url, userID: user.id },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .then(response => {
          console.log('Video analysis:', response.data);
          setArticleData(response.data);
          setShowYoutube(true);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    } else {
      axios
        .post(
          'http://127.0.0.1:5000/submit-article-link',
          { articleLink: url },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .then(response => {
          console.log('Article analysis:', response.data);
          setArticleData(response.data);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div className='w-full mt-5'>
        <div className='max-w-[1175px] mx-auto text-sm'>
          <div className='my-5'>
            <ArticleTable handleAnalysis={handleAnalysis} setUrl={setUrl} />
          </div>
          {isLoggedIn && (
            <AnalysisCharts
              articleData={articleData}
              showYoutube={showYoutube}
              url={url}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Analysis;
