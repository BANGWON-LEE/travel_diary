import { useState, useEffect } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "../styles/modal.scss";

import closeBtn from "../asset/close-button.png";
import locBtn from "../asset/loc.png"
import env from "../env";

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

const ModalRegisterProject = ({ modalStatus, setModalStatus }: ModalType) => {
  const latitude = 37.5233511349545;
  const longitude = 127.037425209409;

  const [map, setMap] = useState<any>();



  useEffect(() => {
    // 팝업창을 열었을 때, 처음으로 보이는 위치

    // if(modalStatus === true){

    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.type = "text/javascript";
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${env.apiKey}&libraries=services&autoload=false`;

    document.head.appendChild(mapScript);

    console.log("kakao", window.kakao);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
        };
        setMap(new window.kakao.maps.Map(container, options));
        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude
        );
      });
    };

    if (modalStatus === true) {
      return mapScript.addEventListener("load", onLoadKakaoMap);
    } else if (modalStatus === false) {
      return mapScript.removeEventListener("load", onLoadKakaoMap);
    }
  }, [modalStatus]);

  // 지도를 생성합니다

  // 키워드로 장소를 검색합니다

  const [keyword, setKeyword] = useState<String>("");
  const [searchStatus, setSearchStatus] = useState<Boolean>(false);

  useEffect(() => {
    if (searchStatus === false) {
      return;
    }

    let markers: any = [];

    // 장소 검색 객체를 생성합니다
    //  let map = window.kakao?.maps.Map(mapContainer, mapOption);
    let services = window.kakao?.maps?.services;
    let ps = window.kakao?.maps?.services.Places();
    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    let infowindow: any;
    console.log("info", infowindow);
    // var infowindow = window.kakao.maps.InfoWindow({zIndex:1})

    searchPlaces();

    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces() {
      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        alert("키워드를 입력해주세요!");
        return false;
      }

      // console.log('infoWindow',  window.kakao?.maps?.services)

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps?.keywordSearch?.();
      services.keywordSearch(keyword, placesSearchCB);
      // console.log('vv',   services.keywordSearch(keyword, placesSearchCB))
    }
    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    
    function placesSearchCB(data: any, status: any, pagination: any) {
      console.log("check", pagination);

      if (status === window.kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el: any) {
      while (el?.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(map: any, place: any, marker: any) {
      return function () {
        // displayInfowindow(marker)
        infowindow = new window.kakao.maps.InfoWindow({
          // map: map, // 인포윈도우가 표시될 지도
          // position : marker,
          content: place.place_name,
        });
        infowindow?.open(map, marker);
      };
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places: any) {
      let listEl = document.getElementById("placesList"),
        menuEl = document.getElementById("menu_wrap"),
        fragment = document.createDocumentFragment(),
        bounds = new window.kakao.maps.LatLngBounds();

      // 검색 결과 목록에 추가된 항목들을 제거합니다
      removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        let placePosition = new window.kakao.maps.LatLng(
            places[i].y,
            places[i].x
          ),
          // marker = addMarker(placePosition, i),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
        // itemEl = getListItem(i, places[i]);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker, title) {
          window.kakao.maps.event.addListener(
            marker,
            "mouseover",
            makeOverListener(map, places[i], marker)
          );

          window.kakao.maps.event.addListener(
            marker,
            "mouseout",
            makeOutListener()
          );

          itemEl.onmouseover = function () {
            displayInfowindow(map, places[i], marker);
          };

          itemEl.onmouseout = function () {
            infowindow?.close();
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
    }

    // infowindow를 여는 함수
    function makeOverListener(map: any, place: any, marker: any) {
      return function () {
        // infowindow = new window.kakao.maps.InfoWindow({
        //   // map: map, // 인포윈도우가 표시될 지도
        //   // position : marker,
        //   content: place.place_name,
        // });
        infowindow = new window.kakao.maps.InfoWindow({
          content: place.place_name,
        });
        infowindow?.open(map, marker);
      };
    }

    // infowindow를 닫는 클로저를 만드는 함수입니다
    function makeOutListener() {
      return function () {
        infowindow?.close();
      };
    }

 
  
    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index: any, places: any){

   
      const handleClickLoc = (event: any) => {
        const example = event.currentTarget.getAttribute('loc-x')
    console.log("콘솔", example);
  }
      let el = document.createElement("li"),
      

        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '<div class="info">' +
          "   <h5>" +
          Number(index + 1) +
          ". " +
          places.place_name +
          "</h5>";

      if (places.road_address_name) {
        itemStr +=
          "    <span>" +
          places.road_address_name +
          "</span>" +
          '   <span class="jibun gray">' +
          places.address_name +
          "</span>";
      } else {
        itemStr += "    <span>" + places.address_name + "</span>";
      }

      itemStr += 
        '<span class="tel">' 
          + places.phone + 
        "</span>" 
        +`<span><button onClick='${handleClickLoc}' loc-x='${places.x}'><img src=${locBtn} /></button></span>`
      + "</div>";

      el.innerHTML = itemStr;
      el.className = "item";

   

      return el;

      
    }



    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position: any, idx: any) {
      let imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new window.kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new window.kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination: any) {
      
      let paginationEl = document.getElementById("pagination"),
      fragment = document.createDocumentFragment(),
      i;
      
      console.log('pa', paginationEl?.hasChildNodes())
      // 기존에 추가된 페이지번호를 삭제합니다
      while (paginationEl?.hasChildNodes()) {
        if (paginationEl.lastChild !== null) {
          paginationEl.removeChild(paginationEl.lastChild);
        }
      }
      for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        
        el.innerHTML = String(i);

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl?.appendChild(fragment);
}


    setSearchStatus(false);
  }, [searchStatus]);



  return (
    <Modal open={modalStatus} onClose={setModalStatus}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // width: 400,
          // bgcolor: "#FFFFFF",
          // border: "2px solid",
          boxShadow: 24,
          width: 980,
          // overflow:'auto',
          backgroundColor: "#FFFFFF",
          borderRadius: 5,
        }}
      >
        <div className="modal_background">
          <div className="modal_background_top">
            <div className="modal_background_top_block">
              <button
                className="modal_background_top_block_btn"
                onClick={() => setModalStatus(false)}
              >
                <img src={closeBtn} alt="close" />
              </button>
            </div>
          </div>
          <div className="modal_background_map_block">
            <div className="map_wrap">
              <div
                id="map"
                className="modal_background_map_block_ground"
                style={{
                  width: "100%",
                  height: "43.05vh",
                  position: "relative",
                  overflow: "hidden",
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
                      className="btn-loc_search"
                      onClick={() => setSearchStatus(true)}
                    >
                      검색
                    </button>
                  </div>
                </div>
                {/* <hr /> */}
                {searchStatus === true ?
                <ul id="placesList" className="places_list"></ul>
                  :
                <ul id="placesList" className="places_list">
                  <p className="empty-list">
                    장소를 검색해주세요.
                  </p>
                </ul>
              }     
                <div id="pagination" className="page-list"></div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalRegisterProject;
