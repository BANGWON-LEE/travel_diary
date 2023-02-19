import { useState, useEffect } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "../styles/modal.scss"

import closeBtn from "../asset/close-button.png"

interface ModalType {
    modalStatus : boolean        
    setModalStatus : React.Dispatch<React.SetStateAction<boolean>>
}

declare global {
    interface Window {
      kakao: any;
      naver: any;
    }
  }
  

const ModalRegisterProject  = ({modalStatus, setModalStatus}:ModalType) => {



    useEffect(() => {
                // 팝업창을 열었을 때, 처음으로 보이는 위치
        const latitude = 37.5233511349545;
        const longitude = 127.037425209409;

        // if(modalStatus === true){

        const mapScript = document.createElement("script");
    
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=722876bb31cadcc3a9874a090b0c17cc&libraries=services&autoload=false`;
    
        document.head.appendChild(mapScript);
        
    
        console.log('kakao', window.kakao )
     
        const onLoadKakaoMap = () => {
        window.kakao.maps.load(() => {
            const container = document.getElementById("map");
            const options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            };
            const map = new window.kakao.maps.Map(container, options);
            const markerPosition = new window.kakao.maps.LatLng(
            latitude,
            longitude
            );
           
        });
        };
        if(modalStatus === true) {
           return mapScript.addEventListener("load", onLoadKakaoMap);
        } else if (modalStatus === false) {
        return mapScript.removeEventListener("load", onLoadKakaoMap);
        }
        
    }, [modalStatus]);


    return(
        <Modal
            open={modalStatus}
            onClose={setModalStatus}
        >
            <Box sx={{
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
            }}>
                <div className="modal_background">
                    <div className="modal_background_top">
                        <div className="modal_background_top_block">
                            <button className="modal_background_top_block_btn" onClick={() =>setModalStatus(false)}>
                                <img src={closeBtn} alt="close" />
                            </button>
                        </div>
                    </div>
                    <div className="modal_background_map_block">
                        <div id="map" className="modal_background_map_block_ground" style={{ width: "100%", height: "43.05vh" }} />
                    </div>
                </div>
            </Box>
        </Modal>
    )

}

export default ModalRegisterProject;