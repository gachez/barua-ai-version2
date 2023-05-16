import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';
import Copy from '@/img/copy.png';
import Image from 'next/image';
import EmailDetails from './EmailDetails';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'rgb(17, 24, 39)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EmailModal(props) {
  const [open, setOpen] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false)
  const [isFormReady, setIsFormReady] = React.useState(false);
  const [showFormAlert, setShowFormAlert] = React.useState(false)

  function closeAlert(delay=3500){
    setTimeout(() => { 
      setShowAlert(false) 
      setShowFormAlert(false)
    }, delay)
  }

  async function copyTextFromTextarea() {
    const textarea = document.getElementById('contentForm');
    try {
      await navigator.clipboard.writeText(textarea.value);
      textarea.select()
    } catch (error) {
      console.error('Error copying text:', error);
    }
  }
  
  React.useEffect(() => {
    setIsFormReady(true);
  }, [])
  
  return (
    <div>
      <Modal
        open={true}
        onClose={function(event, reason) {
            
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
            <EmailDetails selectedEmail={props.selectedEmail} type="email" />
            <button type="button" onClick={() => {
                props.setShowModal(false)
            }} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 relative right-0 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Close</button>
        </Box>
      </Modal>
    </div>
  );
}
