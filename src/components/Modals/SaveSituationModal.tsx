import useSituations from '@/store/situations';
import useTtsBoard from '@/store/ttsBoard';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';

type Props = {
  open: boolean;
  handleClose: () => void;
  style: any;

  children?: React.ReactNode;
};

function SaveSituationModal({ open, handleClose, style, children }: Props) {
  const [situationFormData, setSituationFormData] = useState({
    name: '',
    description: '',
  });

  const [_, { saveSituation }] = useSituations();
  const [symbols, __] = useTtsBoard();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Box>
        <Box sx={{ ...style, width: 400 }} bgcolor={'background.paper'} margin={'auto'} p={3}>
          <Typography id="server-modal-title" variant="h6" component="h2">
            Server-side modal
          </Typography>
          <Typography id="server-modal-description" sx={{ pt: 2 }}>
            If you disable JavaScript, you will still see me.
          </Typography>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="Name"
              label="Nama Situasi"
              variant="outlined"
              onChange={(v) =>
                setSituationFormData((state) => {
                  return {
                    ...state,
                    name: v.target.value,
                  };
                })
              }
            />
            <TextField
              id="Description"
              label="Deskripsi Situasi"
              variant="outlined"
              onChange={(v) =>
                setSituationFormData((state) => {
                  return {
                    ...state,
                    description: v.target.value,
                  };
                })
              }
            />
            <Button
              variant="contained"
              onClick={() => {
                saveSituation({
                  name: situationFormData.name,
                  description: situationFormData.description,
                  symbols: symbols,
                });
                handleClose();
              }}
            >
              Save
            </Button>
          </Box>
          {children}
        </Box>
      </Box>
    </Modal>
  );
}

export default SaveSituationModal;