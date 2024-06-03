import React, { useEffect } from 'react'
import { ApiPost } from 'src/helpers/API/ApiData';
import { AiOutlineMinus } from 'react-icons/ai';



const index = () => {
  const [data, setData] = React.useState([])
  useEffect(() => {
    const body = {
      "search":"",
      "page":1,
      "limit":1000
    }
    ApiPost("/frequently_question_pagination" ,body).then((res : any) => {
      setData(res?.data?.frequentlyQuestionData)
  })
  .catch
  }, []);
  return (
    <div className="main">
    <div className="primary-content-area section-medium content-padding">
            <div className="page-title text-center">
                <h2>Frequently <span className="gradient-text">Asked Questions</span></h2>
            </div>
            <div className="accordion">
            {data?.map((e : any ,i:any) => {
              return (
               
                <div className="accordion-card question">
        <div className="card-header questionHeader cursor-pointer"  data-bs-toggle="collapse" data-bs-target={`#collapseOne${i}`} aria-expanded="true" aria-controls={`collapseOne${i}`} >
          <div className=' card-button'>     
             <div className="card-title">{e?.question}</div>
             <div className="icon-box"> 
             <svg id={`collapseOne${i}`} className="crumina-icon plus-icon show" style={{left:"-11px"}}>
             <AiOutlineMinus />
                                </svg>
                                <svg className="crumina-icon minus-icon">
                                   <AiOutlineMinus />
                                </svg>
                            </div>
          </div>
        </div>
        <div className="answerShow">
        <div id={`collapseOne${i}`} className="accordion-collapse collapse answerBody">
        <div className="card-info answerInfo">{e?.answer}</div>
        </div>
        </div>
      </div>
     
              )
            })
            }
             </div>
        </div>
        </div>
  )
}

export default index