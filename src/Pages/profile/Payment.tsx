import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Model from 'src/components/model';
import { ApiPost } from 'src/helpers/API/ApiData';
import { SuccessToast } from 'src/helpers/Toast';
import { userProfile } from 'src/redux/reducer/profileUpdateSlice';

const Payment = ({ total, postid, type }: any) => {

  const [modal, setModal] = React.useState<boolean>(false);
  const [flag, setFlag] = React.useState<any>('');
  const [navigate, setNavigate] = React.useState<any>('');
  const profileData = useSelector(userProfile);

  function loadAsync(url: any, callback: any) {
    let s = document.createElement('script');
    s.setAttribute('src', url);
    s.onload = callback;
    document.head.insertBefore(s, document.head.firstElementChild);
  }

  const paypal = React.useRef() as any;
  const history = useHistory();
  window.console.log('tyopeee', type, postid, total);

  useEffect(() => {
    loadAsync(
      'https://www.paypal.com/sdk/js?client-id=ASoz1twMSa7OKJGxHTdM4ukuxbUw2NWqQMM2ecZByYEypgbKVgL93dNZ8-XCkMQBiZWQe2VkVh7FlA5y&currency=USD&disable-funding=credit,card',
      function () {
        (window as any).paypal
          .Buttons({
            style: {
              layout: 'vertical',
              color: 'blue',
              shape: 'rect',
              label: 'paypal',
              height: 36
            },

            createOrder: function (data: any, actions: any) {
              window.console.log('total payment', total);
              // This function sets up the details of the transaction, including the amount and line item details.
              return actions.order.create({
                purchase_units: [
                  {
                    //  item_list : items,
                    amount: {
                      value: total
                      // parseInt(price*10)*0.1
                    }
                  }
                ]
              });
            },
            onApprove: async (data: any, actions: any) => {
              window.console.log('dataaa', data);
              const order = await actions.order.capture();
              window.console.log('total order', order);
              let body = {
                paymentURL: order?.links[0]?.href,
                postId: postid,
                licenseType: type,
                price: +total
              };

              window.console.log('body', body);

              await ApiPost('/paypal/purchase_post', body).then((res: any) => {
                window.console.log('ressssss', res);

                // SuccessToast(res?.message);
                setModal(true)
                setFlag('success')
                setNavigate('productdetails')

              });
            },
            onError: (ree: any) => {
              window.console.log('ree', ree);
              setModal(true)
              setFlag('error')
            }
          })
          .render(paypal.current);
      }
    );
  }, []);

  return (
    <div>
      <div style={{ marginTop: '-44px' }} ref={paypal}></div>
      {
        modal &&
        <Model modal={modal} setModal={setModal} text={`Congratulations, ${profileData?.name}`} flag={flag} setFlag={setFlag} postid={postid} navigate={navigate} />
      }
    </div>
  );
};

export default Payment;
