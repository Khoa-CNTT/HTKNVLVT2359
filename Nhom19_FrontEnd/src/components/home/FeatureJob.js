import React from 'react'
import moment from 'moment'

const FeatureJob = (props) => {
    const handleSplitTime = (time) => {
        return moment(new Date(+time)).fromNow();
    }
    return (
        <>
            <div style={{width:'412px' , height : '166.45px' , backgroundColor : 'rgba(226, 235, 248)' , borderRadius : '30px'}} class="single-job-items mb-30">
                <div style={{flexWrap:'nowrap' , marginTop:'15px'}} class="job-items">
                    <div class="company-img">
                        <a href="job_details.html"><img src={props.data.userPostData.userCompanyData.thumbnail} alt="" style={{ width: "65px", height: "65px" }} /></a>
                    </div>
                    <div style={{marginTop:'10px'}} class="job-tittle">
                        <a href="job_details.html"><h4 style={{fontSize:'17px'}} >{props.data.postDetailData.name}</h4></a>
                        <ul>
                            <li style={{fontSize:'12px' , marginRight:'15px'}} ><img style={{marginBottom:'6px',marginRight:'10px',width:'15px',height:'15px'}} src='/assets/img/icon/vector-position.png' alt='icon' />{props.data.postDetailData.jobLevelPostData.value}</li>
                            <li style={{fontSize:'12px' , marginRight:'15px'}}><i style={{width:'12px',height:'12px'}} class="fas fa-map-marker-alt"></i>{props.data.postDetailData.provincePostData.value}</li>
                            <li style={{fontSize:'12px'}}>{handleSplitTime(props.data.timePost)}</li>
                        </ul>
                    </div>
                </div>
                {/* <div class="items-link items-link2 f-right">
                    <a href="job_details.html">{props.data.postDetailData.workTypePostData.value}</a>
                    <span style={{ position: 'absolute', right: '70px' }}>{handleSplitTime(props.data.timePost)}</span>
                </div> */}
            </div>
        </>
    )
}

export default FeatureJob
