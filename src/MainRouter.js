import { Routes, Route } from 'react-router-dom';
import JobList from './pages/joblist/JobList';
import JobDetail from './pages/jobdetail/JobDetail';
import Mypage from './pages/mypage/Mypage';
import Search from './components/nav/components/Search';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';

const MainRouter = () => {
  return (
    // 로그인 되어 있지 않을 때 경로로 접근하는 것을 금지해야 함
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<JobList />}>
          <Route path="/*" element={<JobList />} />
        </Route>
        <Route path="/jobdetail/:job_id" element={<JobDetail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
      <Footer />
    </>
  );
};

export default MainRouter;
