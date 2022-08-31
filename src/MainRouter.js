import { Routes, Route } from 'react-router-dom';
import JobList from './pages/joblist/JobList';
import JobDetail from './pages/jobdetail/JobDetail';
import Mypage from './pages/mypage/Mypage';
import Search from './components/nav/components/Search';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import Protected from './components/Protected';

const MainRouter = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<JobList />}>
          <Route path="/*" element={<JobList />} />
        </Route>
        <Route path="/jobdetail/:job_id" element={<JobDetail />} />
        <Route
          path="/mypage"
          element={
            <Protected>
              <Mypage />
            </Protected>
          }
        />
        <Route path="/Search" element={<Search />} />
      </Routes>
      <Footer />
    </>
  );
};

export default MainRouter;
