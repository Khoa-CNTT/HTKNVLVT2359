import React from 'react'
import moment from 'moment';
const Job = (props) => {
    const handleSplitTime = (time) => {
        return moment(new Date(+time)).fromNow();
    }
    return (
        <>
            <div style={{flexWrap:'nowrap' , marginTop:'14px'}} class="job-items">
                <div class="company-img">
                    <a href="#"><img src={props.data.userPostData.userCompanyData.thumbnail} alt="" style={{ width: "65px", height: "65px" }} /></a>
                </div>
                <div style={{marginTop:'10px'}} class="job-tittle job-tittle2">
                    <a href="#">
                        <h5 style={{fontSize:'17px'}} >{props.data.postDetailData.name}</h5>
                    </a>
                    <ul className='my-font'>
                        <li style={{fontSize:'12px' , marginRight:'15px'}} ><img style={{marginBottom:'6px',marginRight:'10px',width:'15px',height:'15px'}} src='/assets/img/icon/vector-position.png' alt='icon' />{props.data.postDetailData.jobLevelPostData.value}</li>
                        <li style={{fontSize:'12px' , marginRight:'15px'}}><i class="fas fa-map-marker-alt"></i>{props.data.postDetailData.provincePostData.value}</li>
                        <li style={{fontSize:'12px' }}>{handleSplitTime(props.data.timePost)}</li>
                    </ul>
                </div>
            </div>
            {/* <div class="items-link items-link2 f-right">
                <a className='my-font' href="job_details.html">{props.data.postDetailData.workTypePostData.value}</a>
                <span style={{ position: 'absolute', right: '70px' }}>{handleSplitTime(props.data.timePost)}</span>
            </div> */}

        </>
    )
}

export default Job
