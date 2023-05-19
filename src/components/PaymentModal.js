import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '@/img/logo-white.png'
import Image from 'next/image';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:'90%',
  bgcolor: 'background.paper',
  border: '2px solid rgba(0,0,0,0.3)',
  boxShadow: 24,
  borderRadius: '8px',
  pt: 2,
  px: 4,
  pb: 3,
};

export default function PaymentUI(props) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: '60%'}}>
          <div style={{display: 'flex',justifyContent: 'space-between',height:'64px'}}>
            <Image alt="logo"  src={Logo} width={84} height={18} />
            <span>🛡️ Payment secured by Pesapal Ltd</span>
            <span onClick={() => {
                handleClose()
            }}>
                <CloseIcon style={{cursor:'pointer'}} />
                </span>
          </div>  
          <iframe src={props.paymentURI} title="paymentProcessing" style={{width:'100%',height:'80%'}} />
          </Box>
      </Modal>
    </div>
  );
}