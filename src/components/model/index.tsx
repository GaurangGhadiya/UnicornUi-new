import { Dialog, DialogContent, makeStyles } from '@material-ui/core';
import React from 'react';
import { Row } from 'react-bootstrap';
import { CgClose } from 'react-icons/cg';
import { useHistory } from 'react-router-dom';
import star from '../../assets/Image/star.png';
import errorImage from '../../assets/Image/false.png';

const useStyles = makeStyles((theme) => ({
  paperScrollPaper: {
    minWidth: '450px'
  }
}));

export default function Model({
  modal,
  setModal,
  setFlag,
  text,
  flag,
  postid,
  navigate
}: any) {
  const history = useHistory();
  const classes = useStyles();

  window.console.log(
    'modal, setModal, setFlag, text, flag, postid, navigate',
    modal,
    setModal,
    setFlag,
    text,
    flag,
    postid,
    navigate
  );

  const closeModal = () => {
    if (flag !== 'error') {
      if (navigate === 'productdetails') {
        history.push(`/productdetail/${postid}`);
      } else {
        history.push('/dashboard');
      }
    }
    setModal(false);
    setFlag('');
  };
  return (
    <div>
      <Dialog
        maxWidth="md"
        classes={{ paper: classes.paperScrollPaper }}
        open={modal}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className="curveImage" id="style-1">
          {/* <Row style={{ direction: 'rtl' }}>
            <div className="cursor-pointer">
              <CgClose onClick={closeModal} />
            </div>
          </Row> */}
          <div className="text-center">
            <img src={flag === 'error' ? errorImage : star} width={100} />
            {flag === 'error' ? (
              <>
                <h6 className="my-3">Opps!</h6>

                <p>Something went wrong</p>
              </>
            ) : (
              <>
                <h6 className="my-3"> Thank you for your contribution !!</h6>

                <p className="m-0">
                  You have successfully subscribed to our premium plan.
                </p>
                <p>
                  {`Now you can use all the features of the ${text?.subscriptionType} premium plan.`}
                </p>
              </>
            )}
          </div>
          <div className="d-flex">
            {/* <button
              className="btn btn-fullwidth btn-dark mb-3 saved  "
              type="button"
              // onClick={() => setModal(false)}
            >
              Done
            </button> */}
            <button
              className="btn btn-fullwidth gradient-background mb-3  d-flex justify-content-center "
              type="button"
              onClick={closeModal}
              // onClick={() => postDetete(productId)}
            >
              Done
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
