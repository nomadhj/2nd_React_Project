import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';

const NaverMaps = ({ detailList }) => {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId="4y7dwiag1m"
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <NaverMap
        id="react-naver-maps-introduction"
        style={{ width: '100%', height: '260px', marginTop: '30px' }}
        defaultCenter={{
          lat: detailList.job_detail?.company_latitude,
          lng: detailList.job_detail?.company_longitude,
        }}
        defaultZoom={16}
      >
        <Marker
          position={{
            lat: detailList.job_detail?.company_latitude,
            lng: detailList.job_detail?.company_longitude,
          }}
          animation={1}
        />
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );
};

export default NaverMaps;
