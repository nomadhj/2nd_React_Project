import { Routes, Route } from 'react-router-dom';
import JobList from './pages/joblist/JobList';
import JobDetail from './pages/jobdetail/JobDetail';
import LikePage from './pages/likePage/LikePage';
import Resume from './pages/resume/Resume';
import Mypage from './pages/mypage/Mypage';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import Search from './components/nav/components/Search';

const Router = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/likePage" element={<LikePage />} />
        <Route path="/jobdetail/:job_id" element={<JobDetail />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Router;
