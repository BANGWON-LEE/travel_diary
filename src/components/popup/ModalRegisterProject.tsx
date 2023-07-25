/* eslint-disable no-alert */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import { bounds, map } from 'leaflet';
// import { bounds } from 'leaflet';
// import { map } from 'leaflet';
// import { length } from 'assert';
// import { map } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';

import closeBtn from '../../asset/close-button.png';
import locBtn from '../../asset/loc.png';
import env from '../../env';
import SelectedPlace from './SelectedPlace';

interface ModalType {
  modalStatus: boolean;
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

declare global {
  interface Window {
    kakao: any;
    naver: any;
  }
}

const ModalRegisterProject = (props: ModalType) => {
  const { modalStatus, setModalStatus } = props;

  const latitude = '37.5233511349545';
  const longitude = '127.037425209409';

  const [map, setMap] = useState<any>();

  const mapScript = document.createElement('script');
  mapScript.async = true;
  mapScript.type = 'text/javascript';
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${env.apiKey}&libraries=services&autoload=false`;

  const [choicePlace, setChoicePlace] = useState<any[]>();
  const [locData, setLocData] = useState<any[]>([]);

  useEffect(() => {
    // 팝업창을 열었을 때, 처음으로 보이는 위치

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps?.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
        };
        setMap(new window.kakao.maps.Map(container, options));
      });
    };

    if (modalStatus === true) {
      mapScript.addEventListener('load', onLoadKakaoMap);
    }
    if (modalStatus === false) {
      mapScript.removeEventListener('load', onLoadKakaoMap);
      mapScript.removeEventListener('load', map);
      setLocData([]);
    }
  }, [modalStatus]);

  const [keyword, setKeyword] = useState<String>('');
  const [searchStatus, setSearchStatus] = useState<Boolean>(false);

  const searchLoc = () => {
    setChoicePlace(undefined);
    setSearchStatus(true);
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchStatus === false) {
      return;
    }
    if (searchStatus === true) {
      let markers: any = [];
      setLocData([]);

      // 장소 검색 객체를 생성합니다
      const services = window.kakao?.maps?.services;
      const ps = window.kakao?.maps?.services?.Places();
      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다

      // 키워드 검색을 요청하는 함수입니다

      // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다

      // 검색결과 목록의 자식 Element를 제거하는 함수입니다
      const removeAllChildNods = (el: any) => {
        while (el?.hasChildNodes()) {
          el.removeChild(el.lastChild);
        }
      };

      // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
      // 인포윈도우에 장소명을 표시합니다
      let infowindow: any;

      // 지도 위에 표시되고 있는 마커를 모두 제거합니다
      const removeMarker = () => {
        for (let i = 0; i < markers.length; i += 1) {
          markers[i].setMap(null);
        }
        markers = [];
      };

      // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
      const addMarker = (position: any, idx: any) => {
        const imageSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; // 마커 이미지 url, 스프라이트 이미지를 씁니다
        const imageSize = new window.kakao.maps.Size(36, 37); // 마커 이미지의 크기
        const imgOptions = {
          spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        };
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions,
        );
        const marker = new window.kakao.maps.Marker({
          position, // 마커의 위치
          image: markerImage,
        });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker); // 배열에 생성된 마커를 추가합니다

        return marker;
      };

      // 검색결과 항목을 Element로 반환하는 함수입니다
      const getListItem = (index: any, places: any) => {
        const el = document.createElement('li');

        setLocData((prevState) =>
          [...prevState, places].length > 15
            ? [...prevState, places].slice(-15)
            : [...prevState, places],
        );
        // setLocData((prevState) => [...prevState, places]);

        el.className = 'item';

        return el;
      };

      const makeOverListener = (place: any, markerParams: any, marker: any) => {
        return function () {
          infowindow = new window.kakao.maps.InfoWindow({
            content: marker,
          });

          infowindow?.open(place, markerParams);
        };
      };

      // infowindow를 닫는 클로저를 만드는 함수입니다
      const makeOutListener = () => {
        return function () {
          infowindow?.close();
        };
      };

      // 검색 결과 목록과 마커를 표출하는 함수입니다
      const displayPlaces = (places: any) => {
        const listEl = document.getElementById('placesList');
        const menuEl = document.getElementById('menu_wrap');
        const fragment = document.createDocumentFragment();
        const bounds = new window.kakao.maps.LatLngBounds();

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for (let i = 0; i < places.length; i += 1) {
          // 마커를 생성하고 지도에 표시합니다
          const placePosition = new window.kakao.maps.LatLng(
            places[i].y,
            places[i].x,
          );

          // setLocData(locData.concat(places[i]));
          const itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
          // itemEl = getListItem(i, places[i])
          console.log('item', itemEl);
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(placePosition);

          const global = window;
          // marker = addMarker(placePosition, i),
          const marker: any = addMarker(placePosition, i);

          // 마커와 검색결과 항목에 mouseover 했을때
          // 해당 장소에 인포윈도우에 장소명을 표시합니다
          // mouseout 했을 때는 인포윈도우를 닫습니다
          (function (markerParams, title) {
            console.log('마커', title);
            global.kakao.maps?.event.addListener(
              markerParams,
              'mouseover',
              makeOverListener(map, markerParams, title),
              // console.log('마우스오바'),
            );

            global.kakao.maps?.event.addListener(
              markerParams,
              'mouseout',
              makeOutListener(),
            );

            itemEl.onmouseover = function () {
              makeOverListener(map, markerParams, title);
            };

            itemEl.onmouseout = function () {
              makeOutListener();
            };
          })(marker, places[i].place_name);

          fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        listEl?.appendChild(fragment);
        if (menuEl !== null) {
          menuEl.scrollTop = 0;
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      };

      // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
      const displayPagination = (pagination: any) => {
        const paginationEl = document.getElementById('pagination');
        const fragment = document.createDocumentFragment();

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl?.hasChildNodes()) {
          if (paginationEl.lastChild !== null) {
            paginationEl.removeChild(paginationEl.lastChild);
          }
        }
        for (let i = 1; i <= Number(paginationEl?.lastChild); i += 1) {
          const el = document.createElement('a');
          el.href = '#';

          el.innerHTML = String(i);

          if (i !== pagination.current) {
            el.onclick = (function (index) {
              return function () {
                pagination.gotoPage(index);
              };
            })(i);
          } else {
            el.className = 'on';
          }

          fragment.appendChild(el);
        }
        paginationEl?.appendChild(fragment);
      };

      const placesSearchCB = (data: any, status: any, pagination: any) => {
        if (status === window.kakao.maps?.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면
          // 검색 목록과 마커를 표출합니다
          if (choicePlace === undefined) {
            displayPlaces(data);
          }

          // 페이지 번호를 표출합니다
          displayPagination(pagination);
        } else if (status === window.kakao.maps?.services.Status.ZERO_RESULT) {
          alert('검색 결과가 존재하지 않습니다.');
        } else if (status === window.kakao.maps?.services.Status.ERROR) {
          alert('검색 결과 중 오류가 발생했습니다.');
        }
      };

      const searchPlaces = () => {
        if (!keyword.replace(/^\s+|\s+$/g, '')) {
          alert('키워드를 입력해주세요!');
          return false;
        }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps?.keywordSearch?.();
        services?.keywordSearch(keyword, placesSearchCB);

        return true;
      };

      // infowindow를 여는 함수

      if (choicePlace !== undefined && searchStatus === true) {
        displayPlaces(choicePlace);
        setSearchStatus(false);
      }

      searchPlaces();
    }

    if (searchStatus === false) {
      // 모달 팝업 요소 제거
      mapScript.removeEventListener('load', map);
    }

    if (searchStatus === true) {
      mapScript.addEventListener('load', map);
    }

    setSearchStatus(false);
  }, [searchStatus, choicePlace, modalStatus]);

  const handleClickLoc = (place: object[]) => {
    const placeArray: object[] = [];
    placeArray.push(place);
    setSearchStatus(true);
    setChoicePlace(placeArray);
  };

  const placeNameLimit = (text: string) => {
    const maxLength = 15;
    if (text.length <= maxLength) {
      return text; // 글자 수가 제한을 초과하지 않으면 그대로 반환
    }
    return `${text.substring(0, maxLength)}...`; // 글자 수가 제한을 초과하면 "..."을 추가하여 반환
  };

  interface PlaceType {
    place_name: string;
  }

  const [placeStore, setPlaceStore] = useState<any[]>([]);

  const getPlace = (place: PlaceType) => {
    // console.log('ㅌㅌㅌ', typeof myPlace);
    setPlaceStore((prevState) => [...prevState, place]);
  };

  console.log('dfdf', typeof placeStore);

  return (
    <Modal open={modalStatus} onClose={setModalStatus}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          // width: 400,
          // bgcolor: "#FFFFFF",
          // border: "2px solid",
          boxShadow: 24,
          width: 980,
          // overflow:'auto',
          backgroundColor: '#FFFFFF',
          borderRadius: 5,
        }}
      >
        <div className="modal_background">
          <div className="modal_background_top">
            <div className="modal_background_top_block">
              <button
                type="button"
                className="modal_background_top_block_btn"
                onClick={() => setModalStatus(false)}
              >
                <img src={closeBtn} alt="close" />
              </button>
            </div>
          </div>
          <div className="modal_background_map_block">
            <div className="map_wrap" ref={modalRef}>
              <div
                id="map"
                className="modal_background_map_block_ground"
                style={{
                  width: '100%',
                  height: '43.05vh',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              />
              <div id="menu_wrap" className="bg_white">
                <div className="option">
                  <div className="option_block">
                    <input
                      type="text"
                      className="loc_search"
                      onChange={(event) => {
                        setKeyword(event.target.value);
                      }}
                      size={15}
                    />
                    <button
                      type="button"
                      className="btn-loc_search"
                      onClick={() => searchLoc()}
                    >
                      검색
                    </button>
                  </div>
                </div>
                <SelectedPlace
                  placeStore={placeStore}
                  setPlaceStore={setPlaceStore}
                />
                <ul id="loc_list" className="places_list">
                  {locData.length > 0 ? (
                    locData.map((data, index) => (
                      <li key={Number(index)} className="item">
                        <span className="item_place-name">
                          <button type="button" onClick={() => getPlace(data)}>
                            {placeNameLimit(data.place_name)}
                          </button>
                        </span>
                        <span className="item_addr-name">
                          {data.address_name}
                        </span>
                        <span className="item_phone-num">
                          {data.phone === '' ? '연락처 없음' : data.phone}
                        </span>
                        <span className="item_loc">
                          <button
                            type="button"
                            className="loc-btn"
                            onClick={() => handleClickLoc(data)}
                          >
                            <img src={locBtn} alt="지역검색" />
                          </button>
                        </span>
                      </li>
                    ))
                  ) : (
                    <p className="empty-list">장소를 검색해주세요.</p>
                  )}
                </ul>
                <div id="pagination" className="page-list" />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalRegisterProject;
