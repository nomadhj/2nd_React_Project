import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const DetailMap = () => {
  const [address, setAdress] = useState('');

  const renderMap = coordinates => {
    // eslint-disable-next-line no-undef
    if (!google) {
      alert('지도를 로드하는데 실패했습니다. 다시 시도하세요.');
      return;
    }
    // eslint-disable-next-line no-undef
    const map = new google.maps.Map(document.getElementById('map'), {
      center: coordinates,
      zoom: 15,
      styles: GOOGLEMAP_CUSTOM_STYLE,
    });
    // eslint-disable-next-line no-undef
    new google.maps.Marker({
      position: coordinates,
      map: map,
    });
  };

  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('현재 브라우저에서 지원되지 않는 기능입니다.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async successResult => {
        const coordinates = {
          lat: successResult.coords.latitude + (Math.random() - 0.5) / 10,
          lng: successResult.coords.longitude + (Math.random() - 0.5) / 10,
        };
        const result = await getAddressFromCoords(coordinates);
        setAdress(result);
        renderMap(coordinates);
      },
      error => {
        alert('위치를 확인할 수 없습니다. 다시 시도해 주세요.');
      }
    );
  }, []);

  const getAddressFromCoords = async coords => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${process.env.REACT_APP_API_KEY}`
    );
    if (!response.ok) {
      throw new Error('데이터를 가져오는데 실패했습니다.');
    }
    const data = await response.json();
    if (data.error_message) {
      throw new Error(data.error_message);
    }

    const address = data.results[0].formatted_address;
    return address;
  };

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  return (
    <>
      <Map />
      <MapDescription>
        <Title>근무지역</Title>
        <span>{address}</span>
      </MapDescription>
    </>
  );
};

const MapDescription = styled.div`
  margin-top: 20px;

  span {
    margin-right: 20px;
    font-weight: 600;
  }
`;

const Title = styled.span`
  width: 70px;
  color: #999;
  font-weight: 700;
`;

const Map = styled.div.attrs(() => {
  return { id: 'map' };
})`
  width: 30rem;
  height: 25rem;
  border: 1px solid #eee;
`;

const GOOGLEMAP_CUSTOM_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

export default DetailMap;
