import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModalRegisterProject from "../components/ModalRegisterProject";



const MainPage :  React.FC  = ()  => {

    const [modalStatus, setModalStatus] = useState<boolean>(false);


    return(
        <div className="main_background">
            <ModalRegisterProject modalStatus={modalStatus} setModalStatus={setModalStatus} />
            <div className="main_top">
                <div className="main_top_block">
                    <h1 className="main_top_block_title">Travel Plans</h1>
                </div>
            </div>
            <div className="main_bottom">
                <div className="main_bottom_top_area">
                    <div className="main_bottom_top_area_block">
                        <button className="main_bottom_top_area_block_btn" onClick={() => setModalStatus(true)}>
                            프로젝트 생성
                        </button>
                    </div>
                </div>
                <div className="main_bottom_area">
                    <div className="main_bottom_area_project">
                        <div className="main_bottom_area_project_title_block">
                            <p className="main_bottom_area_project_title_block_text">힐링 여행 계획</p>
                            <div className="main_bottom_area_project_title_block_loc">국내</div>
                        </div>
                        <div className="main_bottom_area_project_content_block">
                            <p className="main_bottom_area_project_content_block_date">2023-02-18 ~ 2023-02-20</p>
                            <p className="main_bottom_area_project_content_block_detail_loc">부산,김해</p>
                        </div>
                    </div>
                    <div className="main_bottom_area_project">
                        
                    </div>
                    <div className="main_bottom_area_project">
                        
                    </div>
                </div>
            </div>
        </div>
    )

}


export default MainPage;